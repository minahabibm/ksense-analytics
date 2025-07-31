import { PatientApiResponse, Patient, AssessmentResult } from "@/utils/types";
import { ApiError } from "./ApiError";

const API_URL = process.env.NEXT_PUBLIC_EXTERNAL_API_URL!;
const API_KEY = process.env.NEXT_PUBLIC_EXTERNAL_API_KEY!;

const PAGE_LIMIT = 5;
const MAX_RETRIES = 5;
const BASE_RETRY_DELAY_MS = 1000;

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

async function handleRetry(
  error: ApiError,
  retries: number,
  page: number,
): Promise<number> {
  if (retries >= MAX_RETRIES) {
    throw ApiError.MaxRetriesExceeded();
  }

  retries++;
  let waitTime: number;

  switch (error.code) {
    case "RateLimitExceeded":
      waitTime = error.retryAfterMs ?? BASE_RETRY_DELAY_MS;
      console.warn(
        `Rate limit hit on page ${page}. Retrying in ${waitTime}ms (retry #${retries})`,
      );
      break;

    case "ServerError":
      waitTime = retries * BASE_RETRY_DELAY_MS;
      console.warn(
        `Server error on page ${page}. Retrying in ${waitTime}ms (retry #${retries})`,
      );
      break;

    default:
      console.error(`Unexpected error on page ${page}:`, error);
      throw error;
  }

  await delay(waitTime);
  return retries;
}

async function fetchPage(page: number): Promise<PatientApiResponse> {
  const url = `${API_URL}/patients?page=${page}&limit=${PAGE_LIMIT}`;
  const response = await fetch(url, {
    headers: {
      "x-api-key": API_KEY,
      Accept: "application/json",
    },
  });

  if (response.status === 429) {
    const errorBody = await response.json().catch(() => null);
    const retryAfterSeconds = (errorBody?.retry_after ?? 2) + 1;
    const retryAfterMs = retryAfterSeconds * 1000;
    throw ApiError.RateLimitExceeded(retryAfterMs);
  }

  if (
    response.status === 500 ||
    response.status === 502 ||
    response.status === 503
  ) {
    throw ApiError.ServerError();
  }

  if (!response.ok) {
    throw ApiError.HttpError(response.status);
  }

  return response.json();
}

export async function fetchAllValidPatients(): Promise<Patient[]> {
  const allPatients: Patient[] = [];
  let page = 1;
  let retries = 0;

  while (true) {
    try {
      const data = await fetchPage(page);

      if (!Array.isArray(data.data) || data.data.length === 0) {
        if (retries < MAX_RETRIES) {
          console.warn(
            `Empty or invalid data on page ${page}, retrying... (attempt ${retries + 1})`,
          );
          retries++;
          continue;
        } else {
          throw new Error(
            `Max retries reached for page ${page}. Data is still missing or invalid.`,
          );
        }
      }

      allPatients.push(...data.data);

      if (!data.pagination.hasNext || data.pagination.totalPages < page) break;

      page++;
      retries = 0; // reset retries on successful fetch
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        retries = await handleRetry(error, retries, page);
        continue;
      }
      console.error(`Unexpected error on page ${page}:`, error);
      throw new Error("Unknown non-ApiError thrown during fetch");
    }
  }

  return allPatients;
}

export async function submitResults(
  highRiskPatients: string[],
  feverPatients: string[],
  dataQualityIssues: string[],
): Promise<AssessmentResult> {
  const url = `${API_URL}/submit-assessment`;
  const payload = {
    high_risk_patients: highRiskPatients,
    fever_patients: feverPatients,
    data_quality_issues: dataQualityIssues,
  };
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Submission failed: ${response.status} ${errorText}`);
  }

  const data: AssessmentResult = await response.json();
  return data;
}

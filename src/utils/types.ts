// Date only, e.g. "2024-01-15"
export type ISODateOnlyString = string & { __brand: "ISODateOnlyString" };

// Full datetime, e.g. "2025-07-15T23:01:05.059Z"
export type ISODateTimeString = string & { __brand: "ISODateTimeString" };

export type PatientFetcherProps = {
  onPatientFetched: (patients: Patient[]) => void;
};

export type PatientList = {
  cards: Patient[];
};

export type InvalidDataReport = {
  bpInvalidPatients: Patient[];
  tempInvalidPatients: Patient[];
  ageInvalidPatients: Patient[];
};

export type ScoredPatient = Patient & {
  riskScore: number;
  scores: { bpScore: number; tempScore: number; ageScore: number };
};

export type AlertLists = {
  highRiskPatients: string[];
  feverPatients: string[];
  dataQualityIssues: string[];
};

export interface PatientApiResponse {
  data: Patient[];
  pagination: Pagination;
  metadata: Metadata;
}

export interface Patient {
  patient_id: string;
  name: string;
  age: number;
  gender: "M" | "F" | string; // string added for flexibility
  blood_pressure: string; // e.g. "120/80"
  temperature: number; // e.g. 98.6
  visit_date: ISODateOnlyString; // ISO date string, e.g. "2024-01-15"
  diagnosis: string;
  medications: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface Metadata {
  timestamp: ISODateTimeString; // ISO timestamp string
  version: string; // e.g. "v1.0"
  requestId: string;
}

export interface RiskScoringProps {
  patients: Patient[];
  onAlertsGenerated: (alerts: AlertLists) => void;
}

export interface SubmitAssessmentButtonProps {
  highRiskPatients: string[];
  feverPatients: string[];
  dataQualityIssues: string[];
}

export interface AssessmentResult {
  success: boolean;
  message: string;
  results: {
    score: number;
    percentage: number;
    status: string;
    breakdown: {
      high_risk: {
        score: number;
        max: number;
        correct: number;
        submitted: number;
        matches: number;
      };
      fever: {
        score: number;
        max: number;
        correct: number;
        submitted: number;
        matches: number;
      };
      data_quality: {
        score: number;
        max: number;
        correct: number;
        submitted: number;
        matches: number;
      };
    };
    feedback: {
      strengths: string[];
      issues: string[];
    };
    attempt_number: number;
    remaining_attempts: number;
    is_personal_best: boolean;
    can_resubmit: boolean;
  };
}

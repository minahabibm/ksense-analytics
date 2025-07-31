"use client";

import React, { useState } from "react";
import { fetchAllValidPatients } from "@/utils/apiClient";
import type { Patient, PatientFetcherProps } from "@/utils/types";

export default function PatientFetcher({
  onPatientFetched,
}: PatientFetcherProps) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasFetched, setHasFetched] = useState(false);

  const handleFetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAllValidPatients();
      setPatients(data);

      if (data.length > 0) {
        onPatientFetched(data); // Call the callback with the first patient
        setHasFetched(true);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const buttonAvailabilty = loading || hasFetched;

  return (
    <div>
      <button
        onClick={handleFetch}
        disabled={buttonAvailabilty}
        className={`px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition ${
          buttonAvailabilty ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Fetching..." : hasFetched ? "Fetched" : "Fetch Data"}
      </button>

      {error && (
        <p style={{ color: "red", marginTop: 12 }}>
          Failed to fetch patients: {error}
        </p>
      )}
    </div>
  );
}

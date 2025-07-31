"use client";

import React, { useState } from "react";
import SubmissionModal from "./SubmissionModal";
import { submitResults } from "@/utils/apiClient";
import { AssessmentResult, SubmitAssessmentButtonProps } from "@/utils/types";

export default function SubmitButton({
  highRiskPatients,
  feverPatients,
  dataQualityIssues,
}: SubmitAssessmentButtonProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setStatusMessage(null);
    setResult(null);

    try {
      const response = await submitResults(
        highRiskPatients,
        feverPatients,
        dataQualityIssues,
      );

      setResult(response);
      console.log("Submission response:", response);
      setStatusMessage("✅ Assessment submitted successfully!");
      setShowModal(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setStatusMessage(`❌ Error submitting: ${error.message}`);
      } else {
        setStatusMessage("❌ An unknown error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={() => {
          if (result) {
            setShowModal(true);
          } else {
            handleSubmit();
          }
        }}
        disabled={isSubmitting}
        style={{ padding: "8px 16px", fontSize: 16 }}
        className="px-6 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 transition"
      >
        {isSubmitting
          ? "Submitting..."
          : result
            ? "Show Submission"
            : "Submit Assessment"}
      </button>

      {statusMessage && <p className="text-sm">{statusMessage}</p>}

      {showModal && result && (
        <SubmissionModal result={result} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}

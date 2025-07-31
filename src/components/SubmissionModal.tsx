import React from "react";
import { AssessmentResult } from "@/utils/types";

interface SubmissionModalProps {
  result: AssessmentResult;
  onClose: () => void;
}

export default function SubmissionModal({
  result,
  onClose,
}: SubmissionModalProps) {
  const r = result.results;

  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black bg-opacity-40"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-2xl font-bold text-gray-500 hover:text-gray-800"
          aria-label="Close modal"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4">
          Assessment Submission Results
        </h2>

        <div className="space-y-2">
          <p>
            <strong>Status:</strong> {r.status}
          </p>
          <p>
            <strong>Score:</strong> {r.score} ({r.percentage}%)
          </p>
          <p>
            <strong>Attempt:</strong> #{r.attempt_number}
          </p>
          <p>
            <strong>Remaining Attempts:</strong> {r.remaining_attempts}
          </p>
          <p>
            <strong>Personal Best:</strong> {r.is_personal_best ? "Yes" : "No"}
          </p>
          <p>
            <strong>Can Resubmit:</strong> {r.can_resubmit ? "Yes" : "No"}
          </p>
        </div>

        <hr className="my-4" />

        <h3 className="text-lg font-semibold mb-2">Breakdown</h3>
        {["high_risk", "fever", "data_quality"].map((key) => {
          const breakdown = r.breakdown[key as keyof typeof r.breakdown];
          return (
            <div key={key} className="mb-3 p-3 border rounded bg-gray-50">
              <h4 className="font-medium capitalize text-gray-700">
                {key.replace("_", " ")}
              </h4>
              <ul className="text-sm list-disc pl-5 text-gray-800">
                <li>
                  Score: {breakdown.score} / {breakdown.max}
                </li>
                <li>Correct: {breakdown.correct}</li>
                <li>Submitted: {breakdown.submitted}</li>
                <li>Matches: {breakdown.matches}</li>
              </ul>
            </div>
          );
        })}

        <hr className="my-4" />

        <h3 className="text-lg font-semibold mb-2">Feedback</h3>
        <div className="flex flex-col gap-2">
          <div className="bg-green-100 p-3 rounded">
            <h4 className="font-medium text-green-700 mb-1">Strengths</h4>
            <ul className="text-sm list-disc pl-5 text-green-900">
              {r.feedback.strengths.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-yellow-100 p-3 rounded">
            <h4 className="font-medium text-yellow-700 mb-1">Issues</h4>
            <ul className="text-sm list-disc pl-5 text-yellow-900">
              {r.feedback.issues.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

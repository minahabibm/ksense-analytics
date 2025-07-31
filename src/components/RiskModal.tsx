import React from "react";
import type {
  ScoredPatient,
  InvalidDataReport,
  AlertLists,
} from "@/utils/types";

type Props = {
  scoredPatients: ScoredPatient[];
  alerts: AlertLists | null;
  invalidDataReport: InvalidDataReport | null;
  onClose: () => void;
};

export default function RiskAlerts({
  scoredPatients,
  alerts,
  invalidDataReport,
  onClose,
}: Props) {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 animate-fade-in border border-yellow-400 relative">
        {/* Title */}
        <h2 className="text-2xl font-bold text-yellow-700 mb-6 flex items-center gap-2">
          ⚠️ Risk Assessment Summary
        </h2>

        {/* Risk Scored Patients */}
        <div className="mb-5">
          <h3 className="text-md font-semibold text-yellow-600">
            Risk Scored Patients
          </h3>
          <ul className="list-disc list-inside text-sm text-gray-800 space-y-1 mt-1">
            {scoredPatients.map((p) => (
              <li key={p.patient_id}>
                <span className="font-medium">ID:</span> {p.patient_id},{" "}
                <span className="font-medium">Risk Score:</span> {p.riskScore}
              </li>
            ))}
          </ul>
        </div>

        {/* Alerts */}
        {alerts && (
          <div className="mb-5">
            <h3 className="text-md font-semibold text-red-700">Alerts</h3>
            <ul className="list-disc list-inside text-sm text-gray-800 space-y-1 mt-1">
              <li>
                <strong>High-Risk Patients:</strong>{" "}
                {alerts.highRiskPatients.length > 0
                  ? alerts.highRiskPatients.join(", ")
                  : "None"}
              </li>
              <li>
                <strong>Fever Patients:</strong>{" "}
                {alerts.feverPatients.length > 0
                  ? alerts.feverPatients.join(", ")
                  : "None"}
              </li>
              <li>
                <strong>Data Quality Issues:</strong>{" "}
                {alerts.dataQualityIssues.length > 0
                  ? alerts.dataQualityIssues.join(", ")
                  : "None"}
              </li>
            </ul>
          </div>
        )}

        {/* Invalid Data */}
        {invalidDataReport && (
          <div className="mb-5">
            <h3 className="text-md font-semibold text-gray-700">
              Invalid Data Report
            </h3>
            <ul className="list-disc list-inside text-sm text-gray-800 space-y-1 mt-1">
              <li>
                <strong>Invalid BP:</strong>{" "}
                {invalidDataReport.bpInvalidPatients
                  .map((p) => p.patient_id)
                  .join(", ") || "None"}
              </li>
              <li>
                <strong>Invalid Temp:</strong>{" "}
                {invalidDataReport.tempInvalidPatients
                  .map((p) => p.patient_id)
                  .join(", ") || "None"}
              </li>
              <li>
                <strong>Invalid Age:</strong>{" "}
                {invalidDataReport.ageInvalidPatients
                  .map((p) => p.patient_id)
                  .join(", ") || "None"}
              </li>
            </ul>
          </div>
        )}

        <div className="flex justify-center items-center mt-6">
          <button
            onClick={onClose}
            className="bg-yellow-600 text-white px-6 py-2 rounded hover:bg-yellow-700 transition"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

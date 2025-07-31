import React from "react";
import type { Patient } from "@/utils/types";

export default function Card({ patient }: { patient: Patient }) {
  return (
    <div className="w-64 p-6 m-10 rounded-xl shadow-md border border-gray-200 bg-blue-50 flex flex-col select-none cursor-pointer hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {patient?.name || "Unknown"}
        </h2>
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            patient.gender === "M"
              ? "bg-blue-200 text-blue-800"
              : patient.gender === "F"
                ? "bg-pink-200 text-pink-800"
                : "bg-gray-200 text-gray-700"
          }`}
        >
          {patient?.gender || "?"}
        </span>
      </div>

      <div className="text-sm text-gray-700 mb-5 space-y-1">
        <p>
          <span className="font-medium">Age:</span> {patient?.age ?? "N/A"}
        </p>
        <p>
          <span className="font-medium">BP:</span>{" "}
          {patient?.blood_pressure || "N/A"}
        </p>
        <p>
          <span className="font-medium">Temp:</span>{" "}
          {typeof patient?.temperature === "number"
            ? `${patient.temperature.toFixed(1)}°F`
            : "N/A"}
        </p>
        <p>
          <span className="font-medium">Visit:</span>{" "}
          {patient?.visit_date
            ? new Date(patient.visit_date).toLocaleDateString()
            : "N/A"}
        </p>
      </div>

      <div className="flex flex-col gap-3 text-gray-800 text-sm">
        <div>
          <h3 className="font-semibold text-sm mb-1">Diagnosis</h3>
          <p className="leading-snug break-words whitespace-pre-wrap">
            {patient?.diagnosis || "N/A"}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-sm mb-1">Medications</h3>
          <p className="leading-snug break-words whitespace-pre-wrap">
            {patient?.medications || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}

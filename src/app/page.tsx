"use client";

import React, { useState } from "react";
import PatientFetcher from "@/components/PatientFetcher";
import RiskScoring from "@/components/RiskScoring";
import SubmitButton from "@/components/SubmitButton";
import { Patient, AlertLists } from "@/utils/types";
import PatientList from "@/components/PatientList";

export default function Home() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [alerts, setAlerts] = useState<AlertLists | null>(null);

  return (
    <div className="h-screen flex flex-col items-center justify-start overflow-y-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Patient Risk Scoring Dashboard
      </h1>

      <div className="flex space-x-4 mb-8">
        <PatientFetcher onPatientFetched={setPatients} />
        <RiskScoring patients={patients} onAlertsGenerated={setAlerts} />
        {alerts && (
          <>
            <SubmitButton
              highRiskPatients={alerts.highRiskPatients}
              feverPatients={alerts.feverPatients}
              dataQualityIssues={alerts.dataQualityIssues}
            />
          </>
        )}
      </div>

      <div className="flex-grow flex items-center justify-center  w-full">
        {patients.length > 0 && <PatientList cards={patients} />}
      </div>
    </div>
  );
}
// <div className="p-8 max-w-5xl mx-auto h-screen flex flex-col items-center justify-center overflow-y-auto scrollbar-hide">
//   <h1 className="text-3xl font-bold mb-8 text-center">
//     Patient Risk Scoring Dashboard
//   </h1>

//   <div className="flex space-x-4 mb-8">
//     <PatientFetcher onPatientFetched={setPatients} />
//     <RiskScoring patients={patients} onAlertsGenerated={setAlerts} />
//     {alerts && (
//       <SubmitButton
//         highRiskPatients={alerts.highRiskPatients}
//         feverPatients={alerts.feverPatients}
//         dataQualityIssues={alerts.dataQualityIssues}
//       />
//     )}
//   </div>

//   <div className="flex-grow flex items-center justify-center w-full">
//     {patients.length > 0 && (
//       <PatientList cards={patients} />
//     )}
//   </div>
// </div>

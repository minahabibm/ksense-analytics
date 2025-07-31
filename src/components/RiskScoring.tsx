"use client";

import React, { useState } from "react";
import RiskModal from "./RiskModal";
import { scoreBP, scoreTemp, scoreAge } from "@/utils/scoring";
import { isValidBP, isValidTemp, isValidAge } from "@/utils/validating";
import type {
  RiskScoringProps,
  ScoredPatient,
  InvalidDataReport,
  AlertLists,
} from "@/utils/types";

export default function RiskScoring({
  patients,
  onAlertsGenerated,
}: RiskScoringProps) {
  const [scoredPatients, setScoredPatients] = useState<ScoredPatient[]>([]);
  const [invalidDataReport, setInvalidDataReport] =
    useState<InvalidDataReport | null>(null);
  const [alerts, setAlerts] = useState<AlertLists | null>(null);
  const [scored, setScored] = useState(false);
  const [showModal, setShowModal] = useState(false);

  function handleScore() {
    const report: InvalidDataReport = {
      bpInvalidPatients: [],
      tempInvalidPatients: [],
      ageInvalidPatients: [],
    };

    const alertList: AlertLists = {
      highRiskPatients: [],
      feverPatients: [],
      dataQualityIssues: [],
    };

    const scored = patients.map((p) => {
      const bpValid = isValidBP(p.blood_pressure);
      const tempValid = isValidTemp(p.temperature);
      const ageValid = isValidAge(p.age);

      if (!bpValid) report.bpInvalidPatients.push(p);
      if (!tempValid) report.tempInvalidPatients.push(p);
      if (!ageValid) report.ageInvalidPatients.push(p);
      if (!bpValid || !tempValid || !ageValid)
        alertList.dataQualityIssues.push(p.patient_id);

      const bpScore = bpValid ? scoreBP(p.blood_pressure) : 0;
      const tempScore = tempValid ? scoreTemp(p.temperature) : 0;
      const ageScore = ageValid ? scoreAge(p.age) : 0;
      const totalRisk = bpScore + tempScore + ageScore;

      if (totalRisk >= 4) alertList.highRiskPatients.push(p.patient_id);

      if (tempValid && p.temperature! >= 99.6)
        alertList.feverPatients.push(p.patient_id);

      return {
        ...p,
        riskScore: totalRisk,
        scores: { bpScore, tempScore, ageScore },
      };
    });

    setScoredPatients(scored);
    setInvalidDataReport(report);
    setAlerts(alertList);
    onAlertsGenerated(alertList);
    setScored(true);
  }

  return (
    <div>
      <button
        className={`px-6 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition ${patients.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={patients.length === 0}
        onClick={() => {
          if (!scored) {
            handleScore();
            setShowModal(true);
          } else {
            setShowModal(true);
          }
        }}
      >
        {scored ? "Show Results" : "Calculate Risk Scores"}
      </button>

      {showModal && (
        <RiskModal
          scoredPatients={scoredPatients}
          alerts={alerts}
          invalidDataReport={invalidDataReport}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

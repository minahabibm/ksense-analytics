export function scoreBP(bp: string): number {
  if (!bp || typeof bp !== "string") return 0;

  const [sysStr, diaStr] = bp.split("/");
  const systolic = parseInt(sysStr);
  const diastolic = parseInt(diaStr);

  if (isNaN(systolic) || isNaN(diastolic)) return 0;

  let sysScore = 0;
  if (systolic >= 140) sysScore = 3;
  else if (systolic >= 130) sysScore = 2;
  else if (systolic >= 120) sysScore = 1;
  else sysScore = 0;

  let diaScore = 0;
  if (diastolic >= 90) diaScore = 3;
  else if (diastolic >= 80) diaScore = 2;
  else diaScore = 0;

  return Math.max(sysScore, diaScore);
}

export function scoreTemp(temp: number): number {
  if (isNaN(temp)) return 0;
  if (temp >= 101.0) return 2;
  if (temp >= 99.6) return 1;
  return 0;
}

export function scoreAge(age: number): number {
  if (isNaN(age)) return 0;
  if (age > 65) return 2;
  if (age >= 40) return 1;
  return 0;
}

export function totalRiskScore(bp: string, temp: number, age: number): number {
  return scoreBP(bp) + scoreTemp(temp) + scoreAge(age);
}

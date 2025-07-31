export function isValidBP(bp: string): boolean {
  if (!bp || bp == null || typeof bp !== "string" || !bp.trim()) return false;
  const match = bp.match(/^(\d{2,3})\/(\d{2,3})$/);
  if (!match) return false;
  const systolic = Number(match[1]);
  const diastolic = Number(match[2]);
  return !isNaN(systolic) && !isNaN(diastolic);
}

export function isValidTemp(temp: unknown): boolean {
  return typeof temp === "number" && !isNaN(temp);
}

export function isValidAge(age: unknown): boolean {
  return typeof age === "number" && !isNaN(age);
}

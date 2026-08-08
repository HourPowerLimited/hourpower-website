export type StageStatus = "pass" | "fail" | "pending" | "n/a";

export type Stage =
  | "Purchased"
  | "Intake & Inspection"
  | "Capacity Test"
  | "Health Test"
  | "CE Certification"
  | "Ready for Dispatch"
  | "Quarantine";

export const STAGES: Stage[] = [
  "Purchased",
  "Intake & Inspection",
  "Capacity Test",
  "Health Test",
  "CE Certification",
  "Ready for Dispatch",
  "Quarantine",
];

export const APPROVERS = ["Aoife Ryan", "Ciarán Walsh", "Niamh O'Brien", "Seán Doyle"];

export type BatteryUnit = {
  serial: string;
  supplier: string;
  stage: Stage;
  capacityTest: StageStatus;
  healthTest: StageStatus;
  ceCert: StageStatus;
  customer: string;
};

export const INITIAL_BATTERIES: BatteryUnit[] = [
  { serial: "BAT-0001", supplier: "Renault Recycling EU",     stage: "Ready for Dispatch",  capacityTest: "pass",    healthTest: "pass",    ceCert: "pass",    customer: "Brennan Residence" },
  { serial: "BAT-0002", supplier: "Renault Recycling EU",     stage: "Ready for Dispatch",  capacityTest: "pass",    healthTest: "pass",    ceCert: "pass",    customer: "Murphy Farm" },
  { serial: "BAT-0003", supplier: "VW Group Remarketing",     stage: "CE Certification",    capacityTest: "pass",    healthTest: "pass",    ceCert: "pending", customer: "Murphy Farm" },
  { serial: "BAT-0004", supplier: "VW Group Remarketing",     stage: "Health Test",         capacityTest: "pass",    healthTest: "pending", ceCert: "n/a",     customer: "Fitzgerald Commercial" },
  { serial: "BAT-0005", supplier: "Nissan Battery Recovery",  stage: "Capacity Test",       capacityTest: "pending", healthTest: "n/a",     ceCert: "n/a",     customer: "Unassigned" },
  { serial: "BAT-0006", supplier: "Nissan Battery Recovery",  stage: "Intake & Inspection", capacityTest: "n/a",     healthTest: "n/a",     ceCert: "n/a",     customer: "Unassigned" },
  { serial: "BAT-0007", supplier: "Renault Recycling EU",     stage: "Quarantine",          capacityTest: "pass",    healthTest: "fail",    ceCert: "n/a",     customer: "Unassigned" },
  { serial: "BAT-0008", supplier: "VW Group Remarketing",     stage: "Purchased",           capacityTest: "n/a",     healthTest: "n/a",     ceCert: "n/a",     customer: "Unassigned" },
];

export function nextStages(current: Stage): Stage[] {
  if (current === "Quarantine" || current === "Ready for Dispatch") return [];
  const idx = STAGES.indexOf(current);
  const forward = STAGES.slice(idx + 1).filter((s) => s !== "Quarantine");
  return [...forward, "Quarantine"];
}

export function qrUrl(serial: string) {
  return `https://hourpower.ie/inventory?serial=${serial}`;
}

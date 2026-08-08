import { BatteryUnit, StageStatus } from "@/lib/inventory";
import QRImage from "./QRImage";
import { qrUrl } from "@/lib/inventory";

const statusLabel: Record<StageStatus, string> = {
  pass: "✓",
  fail: "✗",
  pending: "…",
  "n/a": "—",
};

const statusColor: Record<StageStatus, string> = {
  pass: "text-emerald-400",
  fail: "text-red-400",
  pending: "text-amber-400",
  "n/a": "text-gray-600",
};

export default function InventoryCard({ unit }: { unit: BatteryUnit }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col gap-3 text-sm">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-white">{unit.serial}</span>
        <span className="text-xs text-gray-500">{unit.customer}</span>
      </div>

      <p className="text-xs text-gray-400">{unit.supplier}</p>

      <div className="flex gap-3 text-xs">
        {(["capacityTest", "healthTest", "ceCert"] as const).map((key) => {
          const labels = { capacityTest: "Cap", healthTest: "Health", ceCert: "CE" };
          return (
            <span key={key} className="flex items-center gap-1">
              <span className="text-gray-500">{labels[key]}</span>
              <span className={`font-bold ${statusColor[unit[key]]}`}>{statusLabel[unit[key]]}</span>
            </span>
          );
        })}
      </div>

      <div className="flex justify-center pt-1">
        <QRImage value={qrUrl(unit.serial)} size={96} />
      </div>
    </div>
  );
}

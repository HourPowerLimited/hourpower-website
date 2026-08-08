type Battery = {
  id: string;
  status: "Online" | "Degraded" | "Offline";
  soh: number;
  soc: number;
  tempC: number;
  cycles: number;
  sohTrend: number[];
};

const statusStyles: Record<Battery["status"], string> = {
  Online: "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30",
  Degraded: "bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/30",
  Offline: "bg-red-500/15 text-red-400 ring-1 ring-red-500/30",
};

function Sparkline({ values }: { values: number[] }) {
  const w = 120, h = 32, pad = 2;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const pts = values.map((v, i) => {
    const x = pad + (i / (values.length - 1)) * (w - pad * 2);
    const y = pad + (1 - (v - min) / range) * (h - pad * 2);
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-8" preserveAspectRatio="none">
      <polyline points={pts} fill="none" stroke="#34d399" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-gray-500 uppercase tracking-wider">{label}</span>
      <span className="text-sm font-semibold text-white">{value}</span>
    </div>
  );
}

export default function BatteryCard({ battery }: { battery: Battery }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-white">{battery.id}</span>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[battery.status]}`}>
          {battery.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Stat label="State of Health" value={`${battery.soh}%`} />
        <Stat label="State of Charge" value={`${battery.soc}%`} />
        <Stat label="Temperature" value={`${battery.tempC}°C`} />
        <Stat label="Charge Cycles" value={battery.cycles.toLocaleString()} />
      </div>

      <div>
        <span className="text-xs text-gray-500 uppercase tracking-wider">SoH Trend</span>
        <div className="mt-1">
          <Sparkline values={battery.sohTrend} />
        </div>
      </div>
    </div>
  );
}

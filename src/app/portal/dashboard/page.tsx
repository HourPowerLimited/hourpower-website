"use client";

import BatteryCard from "@/components/BatteryCard";

const batteries = [
  {
    id: "Battery Pack A",
    status: "Online" as const,
    soh: 94,
    soc: 78,
    tempC: 28,
    cycles: 312,
    sohTrend: [98, 97, 97, 96, 95, 95, 94, 94],
  },
  {
    id: "Battery Pack B",
    status: "Degraded" as const,
    soh: 81,
    soc: 55,
    tempC: 34,
    cycles: 489,
    sohTrend: [92, 90, 88, 87, 85, 83, 82, 81],
  },
  {
    id: "Battery Pack C",
    status: "Online" as const,
    soh: 97,
    soc: 91,
    tempC: 26,
    cycles: 187,
    sohTrend: [99, 99, 98, 98, 98, 97, 97, 97],
  },
];

const summary = [
  { label: "Total Capacity", value: "45.6 kWh" },
  { label: "System Uptime", value: "99.4%" },
  { label: "Last Sync", value: "2 min ago" },
  { label: "Overall Health", value: "91%" },
];

export default function Dashboard() {
  return (
    <div className="flex-1 flex flex-col">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <span className="text-lg font-bold tracking-tight text-white">
          Hour<span className="text-emerald-400">Power</span>
          <span className="ml-3 text-sm font-normal text-gray-400">Battery Portal</span>
        </span>
        <span className="text-xs text-gray-500">demo@hourpower.co.uk</span>
      </header>

      <main className="flex-1 px-4 py-8 max-w-6xl mx-auto w-full flex flex-col gap-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {summary.map((s) => (
            <div key={s.label} className="bg-gray-900 border border-gray-800 rounded-2xl px-5 py-4">
              <p className="text-xs text-gray-500 uppercase tracking-wider">{s.label}</p>
              <p className="mt-1 text-2xl font-bold text-white">{s.value}</p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Battery Packs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {batteries.map((b) => (
              <BatteryCard key={b.id} battery={b} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

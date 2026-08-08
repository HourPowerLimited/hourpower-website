"use client";

import CustomerCard from "@/components/CustomerCard";

const customers = [
  {
    name: "Brennan Residence",
    address: "Galway, IE",
    status: "All OK" as const,
    hwVersion: "HW-2.1",
    fwVersion: "FW-1.4.2",
    lastSeen: "1 min ago",
    batteries: [
      { id: "Pack A", status: "Online" as const, soh: 94, soc: 78, tempC: 28, cycles: 312 },
      { id: "Pack B", status: "Online" as const, soh: 91, soc: 65, tempC: 27, cycles: 298 },
    ],
  },
  {
    name: "Murphy Farm",
    address: "Cork, IE",
    status: "Warning" as const,
    hwVersion: "HW-2.0",
    fwVersion: "FW-1.3.9",
    lastSeen: "4 min ago",
    batteries: [
      { id: "Pack A", status: "Online" as const, soh: 89, soc: 72, tempC: 31, cycles: 401 },
      { id: "Pack B", status: "Degraded" as const, soh: 74, soc: 55, tempC: 38, cycles: 512 },
      { id: "Pack C", status: "Online" as const, soh: 92, soc: 80, tempC: 29, cycles: 367 },
    ],
  },
  {
    name: "Fitzgerald Commercial",
    address: "Dublin, IE",
    status: "All OK" as const,
    hwVersion: "HW-2.1",
    fwVersion: "FW-1.4.2",
    lastSeen: "2 min ago",
    batteries: [
      { id: "Pack A", status: "Online" as const, soh: 96, soc: 88, tempC: 25, cycles: 201 },
      { id: "Pack B", status: "Online" as const, soh: 95, soc: 84, tempC: 26, cycles: 198 },
      { id: "Pack C", status: "Online" as const, soh: 97, soc: 91, tempC: 24, cycles: 187 },
      { id: "Pack D", status: "Online" as const, soh: 93, soc: 79, tempC: 27, cycles: 223 },
    ],
  },
  {
    name: "O'Brien Residence",
    address: "Limerick, IE",
    status: "Critical" as const,
    hwVersion: "HW-1.9",
    fwVersion: "FW-1.2.1",
    lastSeen: "18 min ago",
    batteries: [
      { id: "Pack A", status: "Offline" as const, soh: 61, soc: 12, tempC: 44, cycles: 731 },
      { id: "Pack B", status: "Degraded" as const, soh: 69, soc: 34, tempC: 41, cycles: 698 },
    ],
  },
];

const warnings = customers.filter((c) => c.status === "Warning").length;
const critical = customers.filter((c) => c.status === "Critical").length;

const summary = [
  { label: "Total Deployments", value: customers.length.toString() },
  { label: "Warnings", value: warnings.toString(), highlight: warnings > 0 ? "text-amber-400" : undefined },
  { label: "Critical", value: critical.toString(), highlight: critical > 0 ? "text-red-400" : undefined },
];

export default function AdminDashboard() {
  return (
    <div className="flex-1 flex flex-col">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <span className="text-lg font-bold tracking-tight text-white">
          Hour<span className="text-amber-400">Power</span>
          <span className="ml-3 text-sm font-normal text-gray-400">Operator Panel</span>
        </span>
        <span className="text-xs text-gray-500">admin@hourpower.ie</span>
      </header>

      <main className="flex-1 px-4 py-8 max-w-6xl mx-auto w-full flex flex-col gap-8">
        <div className="grid grid-cols-3 gap-4">
          {summary.map((s) => (
            <div key={s.label} className="bg-gray-900 border border-gray-800 rounded-2xl px-5 py-4">
              <p className="text-xs text-gray-500 uppercase tracking-wider">{s.label}</p>
              <p className={`mt-1 text-2xl font-bold ${s.highlight ?? "text-white"}`}>{s.value}</p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Customer Deployments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {customers.map((c) => (
              <CustomerCard key={c.name} customer={c} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

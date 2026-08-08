"use client";

import { useState } from "react";

type BatteryUnit = {
  id: string;
  status: "Online" | "Degraded" | "Offline";
  soh: number;
  soc: number;
  tempC: number;
  cycles: number;
};

type Customer = {
  name: string;
  address: string;
  status: "All OK" | "Warning" | "Critical";
  hwVersion: string;
  fwVersion: string;
  lastSeen: string;
  batteries: BatteryUnit[];
};

const statusStyles: Record<Customer["status"], string> = {
  "All OK": "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30",
  Warning: "bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/30",
  Critical: "bg-red-500/15 text-red-400 ring-1 ring-red-500/30",
};

const batteryStatusDot: Record<BatteryUnit["status"], string> = {
  Online: "bg-emerald-400",
  Degraded: "bg-amber-400",
  Offline: "bg-red-400",
};

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-gray-500 uppercase tracking-wider">{label}</span>
      <span className="text-sm font-semibold text-white">{value}</span>
    </div>
  );
}

export default function CustomerCard({ customer }: { customer: Customer }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col gap-4 cursor-pointer hover:border-gray-700 transition-colors"
      onClick={() => setExpanded((v) => !v)}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-white">{customer.name}</p>
          <p className="text-xs text-gray-400 mt-0.5">{customer.address}</p>
        </div>
        <span className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[customer.status]}`}>
          {customer.status}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Stat label="Hardware" value={customer.hwVersion} />
        <Stat label="Firmware" value={customer.fwVersion} />
        <Stat label="Last Seen" value={customer.lastSeen} />
      </div>

      <div className="flex flex-wrap gap-2">
        {customer.batteries.map((b) => (
          <div key={b.id} className="flex items-center gap-1.5 bg-gray-800 rounded-lg px-2.5 py-1">
            <span className={`w-2 h-2 rounded-full shrink-0 ${batteryStatusDot[b.status]}`} />
            <span className="text-xs text-gray-300">{b.id}</span>
            <span className="text-xs text-gray-500">{b.soh}% SoH</span>
          </div>
        ))}
      </div>

      {expanded && (
        <div className="border-t border-gray-800 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {customer.batteries.map((b) => (
            <div key={b.id} className="bg-gray-800 rounded-xl p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-white">{b.id}</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  b.status === "Online" ? "bg-emerald-500/15 text-emerald-400" :
                  b.status === "Degraded" ? "bg-amber-500/15 text-amber-400" :
                  "bg-red-500/15 text-red-400"
                }`}>{b.status}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Stat label="SoH" value={`${b.soh}%`} />
                <Stat label="SoC" value={`${b.soc}%`} />
                <Stat label="Temp" value={`${b.tempC}°C`} />
                <Stat label="Cycles" value={b.cycles.toLocaleString()} />
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-600 text-right">{expanded ? "Click to collapse ↑" : "Click to expand ↓"}</p>
    </div>
  );
}

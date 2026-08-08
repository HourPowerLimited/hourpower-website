"use client";

import { useState } from "react";
import { STAGES, INITIAL_BATTERIES, BatteryUnit, Stage } from "@/lib/inventory";
import InventoryCard from "@/components/InventoryCard";
import AddBatteryModal from "@/components/AddBatteryModal";
import ScanUpdateModal from "@/components/ScanUpdateModal";

function padSerial(n: number) {
  return `HP-${String(n).padStart(4, "0")}`;
}

export default function InventoryBoard() {
  const [batteries, setBatteries] = useState<BatteryUnit[]>(INITIAL_BATTERIES);
  const [showAdd, setShowAdd] = useState(false);
  const [showScan, setShowScan] = useState(false);

  const maxNum = batteries.reduce((max, b) => {
    const n = parseInt(b.serial.replace("HP-", ""), 10);
    return n > max ? n : max;
  }, 0);

  const nextSerial = padSerial(maxNum + 1);

  function handleAdd(unit: BatteryUnit) {
    setBatteries((prev) => [...prev, unit]);
    setShowAdd(false);
  }

  function handleUpdate(serial: string, stage: Stage) {
    setBatteries((prev) => prev.map((b) => b.serial === serial ? { ...b, stage } : b));
    setShowScan(false);
  }

  return (
    <div className="flex-1 flex flex-col">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between gap-4">
        <span className="text-lg font-bold tracking-tight text-white shrink-0">
          Hour<span className="text-teal-400">Power</span>
          <span className="ml-3 text-sm font-normal text-gray-400">Inventory</span>
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setShowScan(true)}
            className="bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-lg px-4 py-2 transition-colors"
          >
            Scan QR
          </button>
          <button
            onClick={() => setShowAdd(true)}
            className="bg-teal-500 hover:bg-teal-400 text-gray-950 text-sm font-semibold rounded-lg px-4 py-2 transition-colors"
          >
            + Add Battery
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col gap-6 px-4 py-6 overflow-x-auto">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 max-w-3xl">
          <h2 className="text-sm font-semibold text-teal-400 uppercase tracking-wider mb-2">How it works</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Each battery unit is assigned a unique serial number when it enters the pipeline. A QR code is generated, printed, and physically affixed to the unit — allowing any team member to instantly identify and update it at any stage using a phone camera. Units progress from <span className="text-white">Purchased</span> through intake, testing, and certification before reaching <span className="text-white">Ready for Dispatch</span>. Any unit that fails a test is moved to <span className="text-red-400">Quarantine</span> and removed from the active pipeline.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:overflow-x-auto pb-4">
          {STAGES.map((stage) => {
            const units = batteries.filter((b) => b.stage === stage);
            const isQuarantine = stage === "Quarantine";
            return (
              <div key={stage} className="lg:w-52 lg:shrink-0 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h3 className={`text-xs font-semibold uppercase tracking-wider ${isQuarantine ? "text-red-400" : "text-gray-400"}`}>
                    {stage}
                  </h3>
                  <span className="text-xs text-gray-600">{units.length}</span>
                </div>
                <div className="flex flex-col gap-2">
                  {units.length === 0 ? (
                    <div className="border border-dashed border-gray-800 rounded-xl h-16 flex items-center justify-center">
                      <span className="text-xs text-gray-700">Empty</span>
                    </div>
                  ) : (
                    units.map((u) => <InventoryCard key={u.serial} unit={u} />)
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {showAdd && (
        <AddBatteryModal
          nextSerial={nextSerial}
          onConfirm={handleAdd}
          onClose={() => setShowAdd(false)}
        />
      )}

      {showScan && (
        <ScanUpdateModal
          batteries={batteries}
          onUpdate={handleUpdate}
          onClose={() => setShowScan(false)}
        />
      )}
    </div>
  );
}

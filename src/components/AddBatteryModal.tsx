"use client";

import { useState } from "react";
import QRImage from "./QRImage";
import { qrUrl, BatteryUnit } from "@/lib/inventory";

type Props = {
  nextSerial: string;
  onConfirm: (unit: BatteryUnit) => void;
  onClose: () => void;
};

export default function AddBatteryModal({ nextSerial, onConfirm, onClose }: Props) {
  const [supplier, setSupplier] = useState("");

  function handlePrint() {
    window.print();
  }

  function handleConfirm() {
    onConfirm({
      serial: nextSerial,
      supplier: supplier || "Unknown",
      stage: "Purchased",
      capacityTest: "n/a",
      healthTest: "n/a",
      ceCert: "n/a",
      customer: "Unassigned",
    });
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-sm flex flex-col gap-5">
        <h2 className="text-lg font-semibold text-white">Add Battery</h2>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-gray-400 uppercase tracking-wider">Serial Number</label>
          <p className="text-white font-mono font-semibold">{nextSerial}</p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-gray-400 uppercase tracking-wider">Supplier</label>
          <input
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            placeholder="e.g. Renault Recycling EU"
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Print-only label */}
        <div className="print:block hidden" id="print-label">
          <div className="flex flex-col items-center gap-2 p-4">
            <QRImage value={qrUrl(nextSerial)} size={160} />
            <p className="font-mono font-bold text-lg text-black">{nextSerial}</p>
            <p className="text-xs text-gray-700 text-center">Print and affix this label to the battery unit before proceeding.</p>
          </div>
        </div>

        <div className="print:hidden flex flex-col items-center gap-3">
          <QRImage value={qrUrl(nextSerial)} size={140} />
          <p className="text-xs text-gray-400 text-center">Print and affix this label to the battery unit before proceeding.</p>
          <button onClick={handlePrint} className="text-xs text-teal-400 underline">Print label</button>
        </div>

        <div className="flex gap-3 print:hidden">
          <button onClick={onClose} className="flex-1 bg-gray-800 hover:bg-gray-700 text-white rounded-lg py-2.5 text-sm transition-colors">
            Cancel
          </button>
          <button onClick={handleConfirm} className="flex-1 bg-teal-500 hover:bg-teal-400 text-gray-950 font-semibold rounded-lg py-2.5 text-sm transition-colors">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

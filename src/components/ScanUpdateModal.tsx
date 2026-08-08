"use client";

import { useEffect, useRef, useState } from "react";
import { BatteryUnit, APPROVERS, nextStages, Stage } from "@/lib/inventory";

type Props = {
  batteries: BatteryUnit[];
  onUpdate: (serial: string, stage: Stage, approver: string) => void;
  onClose: () => void;
};

type ScanState = "scanning" | "found" | "unsupported" | "notfound";

function isBarcodeDetectorSupported() {
  return "BarcodeDetector" in window;
}

export default function ScanUpdateModal({ batteries, onUpdate, onClose }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scanState, setScanState] = useState<ScanState>(
    () => (typeof window !== "undefined" && !isBarcodeDetectorSupported() ? "unsupported" : "scanning")
  );
  const [found, setFound] = useState<BatteryUnit | null>(null);
  const [nextStage, setNextStage] = useState<Stage | "">("");
  const [approver, setApprover] = useState("");
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (scanState === "unsupported") return;

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch(() => setScanState("unsupported"));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const detector = new (window as any).BarcodeDetector({ formats: ["qr_code"] });
    let active = true;

    async function scan() {
      if (!active || !videoRef.current) return;
      try {
        const results = await detector.detect(videoRef.current);
        for (const r of results) {
          const match = r.rawValue.match(/serial=(HP-\d+)/);
          if (match) {
            const unit = batteries.find((b) => b.serial === match[1]);
            stopStream();
            if (unit) {
              setFound(unit);
              setScanState("found");
            } else {
              setScanState("notfound");
            }
            return;
          }
        }
      } catch {}
      if (active) setTimeout(scan, 300);
    }

    scan();
    return () => { active = false; stopStream(); };
  }, [batteries]); // eslint-disable-line react-hooks/exhaustive-deps

  function stopStream() {
    streamRef.current?.getTracks().forEach((t) => t.stop());
  }

  function handleConfirm() {
    if (found && nextStage && approver) {
      onUpdate(found.serial, nextStage as Stage, approver);
    }
  }

  const options = found ? nextStages(found.stage) : [];

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-sm flex flex-col gap-5">
        <h2 className="text-lg font-semibold text-white">Scan Battery QR</h2>

        {scanState === "scanning" && (
          <div className="flex flex-col gap-3">
            <video ref={videoRef} autoPlay playsInline className="w-full rounded-xl bg-black aspect-square object-cover" />
            <p className="text-xs text-gray-400 text-center">Point camera at a battery QR code</p>
          </div>
        )}

        {scanState === "unsupported" && (
          <p className="text-sm text-amber-400">Camera or QR scanning not supported on this browser. Try Chrome on Android or Safari on iOS 17+.</p>
        )}

        {scanState === "notfound" && (
          <p className="text-sm text-red-400">QR code scanned but serial not found in inventory.</p>
        )}

        {scanState === "found" && found && (
          <div className="flex flex-col gap-4">
            <div className="bg-gray-800 rounded-xl p-4 flex flex-col gap-1">
              <p className="font-mono font-semibold text-white">{found.serial}</p>
              <p className="text-xs text-gray-400">{found.supplier}</p>
              <p className="text-xs text-teal-400 mt-1">Current stage: {found.stage}</p>
            </div>

            {options.length === 0 ? (
              <p className="text-sm text-gray-400">No further stages available for this unit.</p>
            ) : (
              <>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-400 uppercase tracking-wider">Move to stage</label>
                  <select
                    value={nextStage}
                    onChange={(e) => setNextStage(e.target.value as Stage)}
                    className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select stage…</option>
                    {options.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-400 uppercase tracking-wider">Approved by</label>
                  <select
                    value={approver}
                    onChange={(e) => setApprover(e.target.value)}
                    className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select approver…</option>
                    {APPROVERS.map((a) => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
              </>
            )}
          </div>
        )}

        <div className="flex gap-3">
          <button onClick={() => { stopStream(); onClose(); }} className="flex-1 bg-gray-800 hover:bg-gray-700 text-white rounded-lg py-2.5 text-sm transition-colors">
            Cancel
          </button>
          {scanState === "found" && options.length > 0 && (
            <button
              onClick={handleConfirm}
              disabled={!nextStage || !approver}
              className="flex-1 bg-teal-500 hover:bg-teal-400 disabled:opacity-40 text-gray-950 font-semibold rounded-lg py-2.5 text-sm transition-colors"
            >
              Confirm
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

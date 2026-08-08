"use client";

import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function InventoryLogin() {
  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    router.push("/inventory/board");
  }

  return (
    <div className="flex-1 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="text-2xl font-bold tracking-tight text-white">Hour<span className="text-teal-400">Power</span></span>
          <p className="mt-1 text-sm text-gray-400">Inventory Manager</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 border border-gray-800 rounded-2xl p-8 flex flex-col gap-5 shadow-xl"
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Email</label>
            <input
              type="email"
              defaultValue="inventory_manager@hourpower.ie"
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Password</label>
            <input
              type="password"
              defaultValue="mockpassword"
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <button
            type="submit"
            className="mt-2 bg-teal-500 hover:bg-teal-400 text-gray-950 font-semibold rounded-lg py-2.5 text-sm transition-colors"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

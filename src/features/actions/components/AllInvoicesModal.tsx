"use client";

import React from "react";
import { X, FileText, AlertCircle, AlertTriangle } from "lucide-react";
import { useGlobalStore } from "../../../store/useGlobalStore";

/* Mock Data for 8-10 rows */
const extendedInvoicesData = [
  { id: "INV-2023-0891", date: "10.05.2023", amount: "6.200.000 TL", daysDelay: "-668 Gün", statusText: "Kritik Gecikme", statusType: "critical" },
  { id: "INV-2023-0942", date: "21.06.2023", amount: "5.466.794 TL", daysDelay: "-626 Gün", statusText: "Kritik Gecikme", statusType: "critical" },
  { id: "INV-2024-0105", date: "15.01.2024", amount: "7.000.000 TL", daysDelay: "-419 Gün", statusText: "Ağır Gecikme", statusType: "severe" },
  { id: "INV-2024-0220", date: "20.02.2024", amount: "2.100.000 TL", daysDelay: "-383 Gün", statusText: "Ağır Gecikme", statusType: "severe" },
  { id: "INV-2024-0415", date: "15.04.2024", amount: "1.500.000 TL", daysDelay: "-330 Gün", statusText: "Ağır Gecikme", statusType: "severe" },
  { id: "INV-2024-0610", date: "10.06.2024", amount: "850.000 TL", daysDelay: "-274 Gün", statusText: "Ağır Gecikme", statusType: "severe" },
  { id: "INV-2024-0805", date: "05.08.2024", amount: "3.200.000 TL", daysDelay: "-218 Gün", statusText: "Ağır Gecikme", statusType: "severe" },
  { id: "INV-2024-1002", date: "02.10.2024", amount: "4.650.000 TL", daysDelay: "-160 Gün", statusText: "Orta Gecikme", statusType: "severe" },
  { id: "INV-2024-1201", date: "01.12.2024", amount: "1.100.000 TL", daysDelay: "-100 Gün", statusText: "Orta Gecikme", statusType: "severe" },
];

export default function AllInvoicesModal() {
  const setInvoiceModalOpen = useGlobalStore((state) => state.setInvoiceModalOpen);

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-3xl max-h-[80vh] bg-zinc-950 border border-zinc-800 rounded-3xl flex flex-col overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-800/60 bg-zinc-900/40 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <FileText size={20} className="text-indigo-400" />
            </div>
            <h2 className="text-xl font-bold text-zinc-100 tracking-tight">
              Tüm Açık Faturalar
            </h2>
          </div>
          <button
            onClick={() => setInvoiceModalOpen(false)}
            className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-zinc-950/50">
          <div className="rounded-xl border border-zinc-800/60 overflow-hidden">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead className="bg-zinc-900 sticky top-0 z-10 shadow-[0_1px_0_0_#27272a]">
                <tr>
                  <th className="px-4 py-4 text-xs font-semibold text-zinc-400 whitespace-nowrap">Fatura No</th>
                  <th className="px-4 py-4 text-xs font-semibold text-zinc-400 whitespace-nowrap">Fatura Tarihi</th>
                  <th className="px-4 py-4 text-xs font-semibold text-zinc-400 whitespace-nowrap text-right">Tutar (TL)</th>
                  <th className="px-4 py-4 text-xs font-semibold text-zinc-400 whitespace-nowrap text-right">Kalan/Geçen Gün</th>
                  <th className="px-4 py-4 text-xs font-semibold text-zinc-400 whitespace-nowrap">Durum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {extendedInvoicesData.map((invoice, idx) => (
                  <tr key={idx} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="px-4 py-3">
                      <span className="text-sm font-semibold text-zinc-200">
                        {invoice.id}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-zinc-400 font-medium">
                        {invoice.date}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-sm font-mono text-zinc-300 font-semibold">
                        {invoice.amount}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={`text-sm font-bold ${invoice.statusType === 'critical' ? 'text-red-400' : 'text-orange-400'}`}>
                        {invoice.daysDelay}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {invoice.statusType === "critical" ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 border border-red-500/20 px-2 py-0.5 text-xs font-semibold text-red-400">
                          <AlertCircle size={12} className="text-red-500" />
                          {invoice.statusText}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 text-xs font-semibold text-orange-400">
                          <AlertTriangle size={12} className="text-orange-500" />
                          {invoice.statusText}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid
} from "recharts";
import { FileText, BarChart3, AlertCircle, AlertTriangle } from "lucide-react";
import { useGlobalStore } from "../../../store/useGlobalStore";

/* ═══════════════════════════════════════════════════════════
   Mock Data
   ═══════════════════════════════════════════════════════════ */
const probabilityData = [
  { name: "0-7 Gün", val: 5, color: "#10b981" },
  { name: "8-15 Gün", val: 10, color: "#34d399" },
  { name: "16-30 Gün", val: 15, color: "#fbbf24" },
  { name: "31-60 Gün", val: 20, color: "#f97316" },
  { name: "60+ Gün", val: 25, color: "#ef4444" },
  { name: "Batık (Unpaid)", val: 25, color: "#7f1d1d" },
];

const invoicesData = [
  {
    id: "INV-2023-0891",
    date: "10.05.2023",
    amount: "6.200.000 TL",
    daysDelay: "-668 Gün",
    statusText: "Kritik Gecikme",
    statusType: "critical", // red
  },
  {
    id: "INV-2023-0942",
    date: "21.06.2023",
    amount: "5.466.794 TL",
    daysDelay: "-626 Gün",
    statusText: "Kritik Gecikme",
    statusType: "critical", // red
  },
  {
    id: "INV-2024-0105",
    date: "15.01.2024",
    amount: "7.000.000 TL",
    daysDelay: "-419 Gün",
    statusText: "Ağır Gecikme",
    statusType: "severe", // orange
  },
];

/* ═══════════════════════════════════════════════════════════
   Custom Tooltip for Chart
   ═══════════════════════════════════════════════════════════ */
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-zinc-950/90 backdrop-blur-md border border-zinc-800 p-4 rounded-xl shadow-2xl">
        <p className="text-zinc-400 text-xs font-semibold mb-2 uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-bold" style={{ color: data.color }}>
          %{data.val} <span className="text-sm font-medium text-zinc-500 tracking-normal">İhtimal</span>
        </p>
      </div>
    );
  }
  return null;
};

/* ═══════════════════════════════════════════════════════════
   Component
   ═══════════════════════════════════════════════════════════ */
export default function Module1AnalysisPanel() {
  const setInvoiceModalOpen = useGlobalStore((state) => state.setInvoiceModalOpen);

  return (
    <div className="flex flex-col gap-6 w-full h-full">

      {/* ═══════════════════════════════════════
         BLOK A: Ödeme Olasılık Dağılımı
         ═══════════════════════════════════════ */}
      <div className="bg-zinc-900/40 border border-zinc-800/50 p-5 rounded-2xl flex flex-col shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 size={18} className="text-blue-400" />
          <h3 className="text-sm font-bold text-zinc-100 tracking-wide">
            Modül 1: Ödeme Olasılık Dağılımı (AI Tahmini)
          </h3>
        </div>

        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={probabilityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" opacity={0.5} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#71717a", fontSize: 11 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#71717a", fontSize: 11 }}
                tickFormatter={(value) => `%${value}`}
              />
              <Tooltip cursor={{ fill: "#27272a", opacity: 0.4 }} content={<CustomTooltip />} />
              <Bar dataKey="val" radius={[6, 6, 0, 0]} maxBarSize={50}>
                {probabilityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ═══════════════════════════════════════
         BLOK B: Açık Faturalar ve Gecikme Durumu
         ═══════════════════════════════════════ */}
      <div className="bg-zinc-900/40 border border-zinc-800/50 p-5 rounded-2xl flex flex-col shadow-sm flex-1">
        <div className="flex items-center gap-2 mb-4">
          <FileText size={18} className="text-indigo-400" />
          <h3 className="text-sm font-bold text-zinc-100 tracking-wide">
            Riskli Açık Faturalar
          </h3>
        </div>

        <div className="overflow-x-auto custom-scrollbar flex-1 rounded-xl border border-zinc-800/60 bg-zinc-950/30">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead className="bg-zinc-900 shadow-[0_1px_0_0_#27272a]">
              <tr>
                <th className="px-4 py-3 text-xs font-semibold text-zinc-400 whitespace-nowrap">Fatura No</th>
                <th className="px-4 py-3 text-xs font-semibold text-zinc-400 whitespace-nowrap">Fatura Tarihi</th>
                <th className="px-4 py-3 text-xs font-semibold text-zinc-400 whitespace-nowrap text-right">Tutar (TL)</th>
                <th className="px-4 py-3 text-xs font-semibold text-zinc-400 whitespace-nowrap text-right">Kalan/Geçen Gün</th>
                <th className="px-4 py-3 text-xs font-semibold text-zinc-400 whitespace-nowrap">Durum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {invoicesData.slice(0, 2).map((invoice, idx) => (
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

        {/* Button to open Modal */}
        <button
          onClick={() => setInvoiceModalOpen(true)}
          className="w-full mt-4 py-2 bg-zinc-800/50 hover:bg-zinc-800 text-sm text-zinc-300 rounded-xl transition-colors shrink-0"
        >
          Tüm Faturaları Gör
        </button>
      </div>

    </div>
  );
}

"use client";

import React from "react";
import { Database, MessageSquare, Smartphone, Mail, Zap } from "lucide-react";
import { settingsData } from "../../data/mockData";

/* ═══════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════ */
export type IntegrationItem = (typeof settingsData.integrations)[number];

/* ═══════════════════════════════════════════════════════════
   Icon Map
   ═══════════════════════════════════════════════════════════ */
export const INTEGRATION_ICON_MAP: Record<string, React.ReactNode> = {
  Database: <Database size={22} className="text-blue-400" />,
  MessageSquare: <MessageSquare size={22} className="text-purple-400" />,
  Smartphone: <Smartphone size={22} className="text-emerald-400" />,
  Mail: <Mail size={22} className="text-amber-400" />,
};

/* ═══════════════════════════════════════════════════════════
   IntegrationsTab — Bağlı Entegrasyonlar & Ekle Butonu
   ═══════════════════════════════════════════════════════════ */
interface IntegrationsTabProps {
  onOpenModal: (item: IntegrationItem) => void;
  onOpenCatalog: () => void;
}

export function IntegrationsTab({ onOpenModal, onOpenCatalog }: IntegrationsTabProps) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-lg font-semibold text-zinc-100 mb-1">Entegrasyonlar</h2>
        <p className="text-xs text-zinc-500 mb-6">Bağlı servislerinizi yönetin ve yeni entegrasyonlar kurun</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {settingsData.integrations.map((item) => (
          <div
            key={item.id}
            className="group relative rounded-2xl border border-zinc-800/60 bg-zinc-900/50 p-5 flex items-center gap-4 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/80 hover:shadow-lg"
          >
            {/* Icon */}
            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-zinc-800/80 border border-zinc-700/50 shrink-0 transition-transform duration-300 group-hover:scale-105">
              {INTEGRATION_ICON_MAP[item.icon] || <Zap size={22} className="text-zinc-400" />}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-zinc-200">{item.name}</h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                {item.status === "connected" ? "Son senkronizasyon: 2 dk önce" : "Henüz bağlanmadı"}
              </p>
            </div>

            {/* Action Button — opens modal */}
            <button
              onClick={() => onOpenModal(item)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-2 shrink-0 cursor-pointer ${
                item.status === "connected"
                  ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                  : "bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20"
              }`}
            >
              {item.status === "connected" ? "Ayarlar" : "+ Bağlan"}
            </button>
          </div>
        ))}
      </div>

      {/* Add new integration hint */}
      <button
        onClick={onOpenCatalog}
        className="w-full py-4 border-2 border-dashed border-zinc-800 rounded-2xl flex items-center justify-center text-sm font-bold text-zinc-500 hover:text-zinc-300 hover:border-zinc-600 hover:bg-zinc-800/30 transition-all cursor-pointer"
      >
        + Yeni Entegrasyon Ekle
      </button>
    </div>
  );
}

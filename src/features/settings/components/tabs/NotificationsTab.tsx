"use client";

import React from "react";
import { Check } from "lucide-react";
import { showToast } from "../../../../components/ui/Toast";

/* ═══════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════ */
export interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

/* ═══════════════════════════════════════════════════════════
   NotificationsTab — Bildirim Tercihleri & Toggle Switch'ler
   ═══════════════════════════════════════════════════════════ */
interface NotificationsTabProps {
  notifications: NotificationSetting[];
  toggleNotification: (id: string) => void;
}

export function NotificationsTab({ notifications, toggleNotification }: NotificationsTabProps) {
  const handleSave = () => {
    showToast("Bildirim tercihleri kaydedildi.", "success");
  };
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-lg font-semibold text-zinc-100 mb-1">Bildirim Tercihleri</h2>
        <p className="text-xs text-zinc-500 mb-6">Almak istediğiniz bildirimleri seçin</p>
      </div>

      <div className="space-y-3">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className="flex items-center justify-between p-4 rounded-xl border border-zinc-800/50 bg-zinc-900/40 hover:bg-zinc-900/60 hover:border-zinc-700/60 transition-all duration-200"
          >
            <div className="flex-1 min-w-0 mr-4">
              <h3 className="text-sm font-medium text-zinc-200">{notif.label}</h3>
              <p className="text-xs text-zinc-500 mt-0.5">{notif.description}</p>
            </div>

            {/* Toggle Switch */}
            <button
              onClick={() => toggleNotification(notif.id)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 transition-colors duration-200 ease-in-out focus:outline-none ${
                notif.enabled
                  ? "bg-blue-600 border-blue-600"
                  : "bg-zinc-700 border-zinc-700"
              }`}
              role="switch"
              aria-checked={notif.enabled}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out ${
                  notif.enabled ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-4">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all duration-200 shadow-[0_0_20px_rgba(59,130,246,0.25)] hover:shadow-[0_0_30px_rgba(59,130,246,0.35)]"
        >
          <Check size={16} />
          Tercihleri Kaydet
        </button>
      </div>
    </div>
  );
}

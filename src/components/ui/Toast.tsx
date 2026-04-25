"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   Toast Types & State
   ═══════════════════════════════════════════════════════════ */
export type ToastType = "success" | "error" | "info";

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

/* Singleton event bus — no context/provider needed */
type ToastListener = (t: ToastMessage) => void;
const listeners: ToastListener[] = [];

export function showToast(message: string, type: ToastType = "success") {
  const toast: ToastMessage = {
    id: Math.random().toString(36).slice(2),
    message,
    type,
  };
  listeners.forEach((fn) => fn(toast));
}

/* ═══════════════════════════════════════════════════════════
   ToastContainer — mount once in layout or B2BDashboardView
   ═══════════════════════════════════════════════════════════ */
export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const handler: ToastListener = (t) => {
      setToasts((prev) => [...prev, t]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((x) => x.id !== t.id));
      }, 3500);
    };
    listeners.push(handler);
    return () => {
      const idx = listeners.indexOf(handler);
      if (idx !== -1) listeners.splice(idx, 1);
    };
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <Toast key={t.id} toast={t} onDismiss={(id) => setToasts((prev) => prev.filter((x) => x.id !== id))} />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Single Toast Item
   ═══════════════════════════════════════════════════════════ */
const ICON = {
  success: <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />,
  error:   <XCircle     size={16} className="text-red-400 shrink-0" />,
  info:    <Info        size={16} className="text-blue-400 shrink-0" />,
};

const BORDER = {
  success: "border-emerald-500/30",
  error:   "border-red-500/30",
  info:    "border-blue-500/30",
};

function Toast({
  toast,
  onDismiss,
}: {
  toast: ToastMessage;
  onDismiss: (id: string) => void;
}) {
  return (
    <div
      className={`pointer-events-auto flex items-center gap-3 pl-4 pr-3 py-3 rounded-xl bg-zinc-900 border ${BORDER[toast.type]} shadow-2xl shadow-black/40 min-w-[260px] max-w-sm animate-fadeIn`}
    >
      {ICON[toast.type]}
      <p className="flex-1 text-sm font-medium text-zinc-200">{toast.message}</p>
      <button
        onClick={() => onDismiss(toast.id)}
        className="text-zinc-500 hover:text-zinc-300 transition-colors"
      >
        <X size={14} />
      </button>
    </div>
  );
}

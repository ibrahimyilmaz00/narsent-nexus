"use client";

import React from "react";
import { Check, ChevronDown } from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   Step Indicator (5 adım)
   ═══════════════════════════════════════════════════════════ */
export function StepIndicator({ current, total }: { current: number; total: number }) {
  const labels = [
    "ERP & Sektör",
    "Satış Portföy",
    "ERP Röntgen",
    "Operasyon",
    "Özet & Başlat",
  ];

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3 mb-12">
      {Array.from({ length: total }, (_, i) => i + 1).map((num, i) => (
        <React.Fragment key={num}>
          <div className="flex items-center gap-2">
            <div
              className={`
                flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full text-xs font-bold
                transition-all duration-500 ease-out shrink-0
                ${current === num
                  ? "bg-white text-zinc-950 scale-110 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  : current > num
                    ? "bg-transparent text-emerald-400 ring-1 ring-emerald-500/40"
                    : "bg-transparent text-zinc-600 ring-1 ring-zinc-700"
                }
              `}
            >
              {current > num ? <Check size={13} strokeWidth={3} /> : num}
            </div>
            <span
              className={`text-[12px] font-medium hidden lg:inline transition-colors duration-300 ${current === num ? "text-zinc-100" : "text-zinc-500"
                }`}
            >
              {labels[i]}
            </span>
          </div>
          {i < total - 1 && (
            <div
              className={`h-px w-6 sm:w-10 transition-colors duration-500 ${current > num ? "bg-emerald-500/30" : "bg-zinc-800"
                }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Selection Card
   ═══════════════════════════════════════════════════════════ */
export function SelectionCard({
  active,
  disabled,
  onClick,
  icon,
  title,
  subtitle,
  layout = "vertical",
}: {
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  layout?: "vertical" | "horizontal";
}) {
  const isVertical = layout === "vertical";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        group relative flex ${isVertical ? "flex-col items-center text-center" : "items-center text-left"} gap-3 ${isVertical ? "p-5" : "p-4 sm:p-5"} rounded-xl
        transition-all duration-300 ease-out
        ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
        ${active
          ? "bg-white/[0.06] ring-2 ring-blue-500 shadow-[0_0_24px_rgba(59,130,246,0.12)]"
          : "bg-white/[0.03] border border-zinc-800 hover:border-zinc-600 hover:bg-white/[0.05]"
        }
      `}
    >
      {active && (
        <div className="absolute top-2.5 right-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500">
          <Check size={11} className="text-white" strokeWidth={3} />
        </div>
      )}
      <div
        className={`shrink-0 transition-colors duration-300 ${active ? "text-blue-400" : "text-zinc-500 group-hover:text-zinc-300"
          }`}
      >
        {icon}
      </div>
      <div className={`space-y-0.5 ${!isVertical ? "pr-7" : ""}`}>
        <span
          className={`block font-semibold text-sm ${active ? "text-zinc-50" : "text-zinc-200"
            }`}
        >
          {title}
        </span>
        <span className="block text-[11px] text-zinc-400 leading-snug">
          {subtitle}
        </span>
      </div>
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════
   Input Field (White UI)
   ═══════════════════════════════════════════════════════════ */
export function InputField({
  label,
  icon,
  value,
  onChange,
  placeholder,
  suffix,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  suffix?: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-white/[0.03] p-5 space-y-3">
      <label className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-blue-400/80">{icon}</span>
          <span className="text-sm font-medium text-zinc-200">{label}</span>
        </div>
        {value && suffix && (
          <span className="text-xs text-blue-400 font-mono tabular-nums">
            {Number(value).toLocaleString("tr-TR")} {suffix}
          </span>
        )}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg bg-white/[0.04] border border-zinc-700 px-4 py-3 text-zinc-50 text-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/40
                   placeholder-zinc-500 transition-all duration-200"
        placeholder={placeholder}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Select Field (Dropdown)
   ═══════════════════════════════════════════════════════════ */
export function SelectField({
  label,
  icon,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-white/[0.03] p-5 space-y-3">
      <label className="flex items-center gap-2.5">
        <span className="text-blue-400/80">{icon}</span>
        <span className="text-sm font-medium text-zinc-200">{label}</span>
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full appearance-none rounded-lg bg-white/[0.04] border border-zinc-700 px-4 py-3 text-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/40
                     transition-all duration-200 cursor-pointer pr-10
                     ${value ? 'text-zinc-50' : 'text-zinc-500'}`}
        >
          <option value="" disabled className="bg-zinc-900 text-zinc-500">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-zinc-900 text-zinc-100">
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Section Header
   ═══════════════════════════════════════════════════════════ */
export function SectionHeader({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 pt-2 pb-1">
      <span className="text-zinc-500">{icon}</span>
      <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
        {label}
      </span>
      <div className="h-px flex-1 bg-zinc-800/60" />
    </div>
  );
}

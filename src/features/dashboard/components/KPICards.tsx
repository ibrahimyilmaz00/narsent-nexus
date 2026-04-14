"use client";

import {
  TrendingUp,
  Droplets,
  Hourglass,
  Coins,
  ArrowUpRight,
  Info,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════ */
interface KPICardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: {
    label: string;
    type: "up" | "down" | "neutral";
  };
  subtext?: {
    label: string;
    color: "blue" | "orange" | "red" | "green";
  };
  badge?: {
    label: string;
  };
}

/* ═══════════════════════════════════════════════════════════
   Single KPI Card
   ═══════════════════════════════════════════════════════════ */
function KPICard({ title, value, icon, trend, subtext, badge }: KPICardProps) {
  const subtextColors = {
    blue: "text-blue-400",
    orange: "text-orange-400",
    red: "text-red-400",
    green: "text-emerald-400",
  };

  const subtextIconColors = {
    blue: "text-blue-400/70",
    orange: "text-orange-400/70",
    red: "text-red-400/70",
    green: "text-emerald-400/70",
  };

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-zinc-800/50
                 bg-zinc-900/40 backdrop-blur-sm p-5 sm:p-6
                 transition-all duration-300 ease-out
                 hover:border-zinc-700/80 hover:bg-zinc-900/60
                 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
    >
      {/* Subtle glow on hover */}
      <div
        className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full
                    bg-white/[0.03] blur-3xl transition-opacity duration-500
                    opacity-0 group-hover:opacity-100"
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl
                        bg-white/[0.05] text-zinc-400 transition-colors duration-300
                        group-hover:text-zinc-200 group-hover:bg-white/[0.08]"
          >
            {icon}
          </div>
          <span className="text-[13px] font-medium text-zinc-400 leading-tight">
            {title}
          </span>
        </div>
      </div>

      {/* Value */}
      <p className="text-2xl sm:text-[28px] font-bold text-zinc-50 tracking-tight leading-none mb-3">
        {value}
      </p>

      {/* Subtext Logic Wrapper */}
      <div className="mt-1 flex items-center gap-1.5 h-6">
        {trend && (
          <div className="flex items-center gap-1">
            {trend.type === "up" && (
              <ArrowUpRight size={14} className="text-emerald-400" strokeWidth={2.5} />
            )}
            <span
              className={`text-xs font-semibold ${
                trend.type === "up"
                  ? "text-emerald-400"
                  : trend.type === "down"
                  ? "text-red-400"
                  : "text-zinc-400"
              }`}
            >
              {trend.label}
            </span>
          </div>
        )}

        {subtext && !trend && (
          <div className="flex items-center gap-1.5">
            <Info size={13} className={subtextIconColors[subtext.color]} strokeWidth={2} />
            <span className={`text-xs font-medium ${subtextColors[subtext.color]}`}>
              {subtext.label}
            </span>
          </div>
        )}

        {/* Critical Badge Request: "🚨 Teşhis: Yüksek Sabit Gider" */}
        {badge && (
          <span
            className="inline-flex items-center gap-1.5 rounded-full
                       bg-red-500/15 border border-red-500/30
                       px-3 py-1 text-[11px] font-semibold text-red-300
                       shadow-[0_0_15px_rgba(239,68,68,0.15)]
                       animate-pulse"
          >
            {badge.label}
          </span>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   KPI Cards Grid (4 cards)
   ═══════════════════════════════════════════════════════════ */
export default function KPICards() {
  const cards: KPICardProps[] = [
    {
      title: "12 Haftalık Nakit Tahmini",
      value: "79.900.000 TL",
      icon: <TrendingUp size={18} strokeWidth={1.5} />,
      trend: {
        label: "+%79.4 (ilk 4 haftaya göre)",
        type: "up",
      },
    },
    {
      title: "Haftalık Net Nakit",
      value: "290.200 TL",
      icon: <Droplets size={18} strokeWidth={1.5} />,
      subtext: {
        label: "Likidite Durumu: Stabil",
        color: "blue",
      },
    },
    {
      title: "Nakit Ömrü (Cash Runway)",
      value: "12 Gün",
      icon: <Hourglass size={18} strokeWidth={1.5} />,
      badge: {
        label: "🚨 Teşhis: Yüksek Sabit Gider",
      },
    },
    {
      title: "Toplam Kurtarılabilir",
      value: "65.809.249 TL",
      icon: <Coins size={18} strokeWidth={1.5} />,
      subtext: {
        label: "Geç Ödeme Oranı: %54.9",
        color: "orange",
      },
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <KPICard key={index} {...card} />
      ))}
    </div>
  );
}

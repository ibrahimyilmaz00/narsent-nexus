"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Rocket,
  Check,
  Server,
  Database,
  Cpu,
  Globe,
  Factory,
  Building2,
  Flame,
  Radio,
  GraduationCap,
  TrendingUp,
  Users,
  CalendarClock,
  AlertTriangle,
  Clock,
  Banknote,
  BarChart3,
  Wallet,
  Package,
  Landmark,
  ShieldAlert,
  Target,
  Brain,
  Sparkles,
  Store,
  CreditCard,
  HandCoins,
  Receipt,
  UserPlus,
  Percent,
  ChevronDown,
  Truck,
  Boxes,
  RefreshCw,
  CircleDollarSign,
  TriangleAlert,
  FileText,
  Zap,
  Gauge,
  Shield,
  Wifi,
  Smartphone,
  Monitor,
  BookOpen,
} from "lucide-react";

import { useGlobalStore } from "../../store/useGlobalStore";

/* ═══════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════ */
type ERPOption = "sap" | "logo" | "mikro" | "api" | null;
type SectorOption =
  | "kobi"
  | "kurumsal"
  | "enerji"
  | "telekom"
  | "egitim"
  | null;

/* ═══════════════════════════════════════════════════════════
   Step Indicator  (5 adım)
   ═══════════════════════════════════════════════════════════ */
function StepIndicator({ current, total }: { current: number; total: number }) {
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
            {/* Circle */}
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
              {current > num ? (
                <Check size={13} strokeWidth={3} />
              ) : (
                num
              )}
            </div>
            {/* Label (hidden on mobile for space) */}
            <span
              className={`text-[12px] font-medium hidden lg:inline transition-colors duration-300 ${current === num ? "text-zinc-100" : "text-zinc-500"
                }`}
            >
              {labels[i]}
            </span>
          </div>
          {/* Connector line */}
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
   Reusable: Selection Card
   ═══════════════════════════════════════════════════════════ */
function SelectionCard({
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
        className={`shrink-0 transition-colors duration-300 ${active
            ? "text-blue-400"
            : "text-zinc-500 group-hover:text-zinc-300"
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
   Reusable: Input Field (White UI)
   ═══════════════════════════════════════════════════════════ */
function InputField({
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
   Reusable: Select Field (Dropdown)
   ═══════════════════════════════════════════════════════════ */
function SelectField({
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
   Reusable: Section Header (Alt Başlık)
   ═══════════════════════════════════════════════════════════ */
function SectionHeader({ icon, label }: { icon: React.ReactNode; label: string }) {
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

/* ═══════════════════════════════════════════════════════════
   STEP 1 — ERP & Sektör Seçimi
   ═══════════════════════════════════════════════════════════ */
function Step1({
  erp,
  onErp,
  sector,
  onSector,
}: {
  erp: ERPOption;
  onErp: (v: ERPOption) => void;
  sector: SectorOption;
  onSector: (v: SectorOption) => void;
}) {
  const erpCards: {
    id: ERPOption;
    name: string;
    desc: string;
    icon: React.ReactNode;
  }[] = [
      { id: "sap", name: "SAP", desc: "ECC / S4HANA", icon: <Server size={22} strokeWidth={1.5} /> },
      { id: "logo", name: "Logo", desc: "Tiger / Go / J-Guar", icon: <Database size={22} strokeWidth={1.5} /> },
      { id: "mikro", name: "Mikro", desc: "Mikro Yazılım", icon: <Cpu size={22} strokeWidth={1.5} /> },
      { id: "api", name: "Özel API", desc: "REST / GraphQL", icon: <Globe size={22} strokeWidth={1.5} /> },
    ];

  const sectorCards: {
    id: SectorOption;
    name: string;
    desc: string;
    icon: React.ReactNode;
    enabled: boolean;
  }[] = [
      { id: "kobi", name: "KOBİ (Üretim & Ticaret)", desc: "Üretim, ticaret ve hizmet sektörü", icon: <Factory size={20} strokeWidth={1.5} />, enabled: true },
      { id: "kurumsal", name: "Kurumsal (Enterprise & Holding)", desc: "Büyük ölçekli holding ve grup yapıları", icon: <Building2 size={20} strokeWidth={1.5} />, enabled: true },
      { id: "enerji", name: "Enerji & Ağır Sanayi", desc: "Enerji dağıtım ve sanayi", icon: <Flame size={20} strokeWidth={1.5} />, enabled: true },
      { id: "telekom", name: "Telekomünikasyon & Teknoloji", desc: "Telekom, veri merkezi ve dijital hizmetler", icon: <Radio size={20} strokeWidth={1.5} />, enabled: true },
      { id: "egitim", name: "Eğitim & Hizmet", desc: "Eğitim kurumları, kurs ve danışmanlık", icon: <GraduationCap size={20} strokeWidth={1.5} />, enabled: true },
    ];

  return (
    <div className="space-y-10">
      {/* Title */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-50 tracking-tight">
          Altyapınızı Tanımlayın
        </h2>
        <p className="text-sm text-zinc-300 max-w-lg mx-auto leading-relaxed">
          Horizon karar motoru, ERP sisteminize bağlanarak sektörel adaptörünüzü devreye alacaktır.
        </p>
      </div>

      {/* ERP Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="h-px flex-1 bg-zinc-800" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-zinc-400">
            ERP Altyapınız
          </span>
          <div className="h-px flex-1 bg-zinc-800" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {erpCards.map((c) => (
            <SelectionCard
              key={c.id}
              active={erp === c.id}
              onClick={() => onErp(c.id)}
              icon={c.icon}
              title={c.name}
              subtitle={c.desc}
              layout="vertical"
            />
          ))}
        </div>
      </div>

      {/* Sector Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="h-px flex-1 bg-zinc-800" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-zinc-400">
            Faaliyet Sektörünüz
          </span>
          <div className="h-px flex-1 bg-zinc-800" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {sectorCards.map((c) => (
            <SelectionCard
              key={c.id}
              active={sector === c.id}
              disabled={!c.enabled}
              onClick={() => c.enabled && onSector(c.id)}
              icon={c.icon}
              title={c.name}
              subtitle={c.enabled ? c.desc : "Yakında aktif olacak"}
              layout="horizontal"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   STEP 2 — Satış ve Cari Portföy (Beyaz UI - Kullanıcı Girdisi)
   ═══════════════════════════════════════════════════════════ */
function Step2({
  sector,
  values,
  onChange,
}: {
  sector: SectorOption;
  values: Record<string, string>;
  onChange: (field: string, value: string) => void;
}) {
  if (sector === "kurumsal") {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-50 tracking-tight">
            Konsolide Ölçek ve Müşteri Portföyü
          </h2>
          <p className="text-sm text-zinc-300 max-w-lg mx-auto leading-relaxed">
            Grup bazlı konsolide verilerinizi girin. Horizon, holding yapınıza özel analiz üretecektir.
          </p>
        </div>

        {/* ─── Konsolide Ölçek ─── */}
        <SectionHeader icon={<Building2 size={13} strokeWidth={1.5} />} label="Konsolide Ölçek" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Yıllık Konsolide Ciro (TL)"
            icon={<Banknote size={16} strokeWidth={1.5} />}
            value={values.entCiro ?? ""}
            onChange={(v) => onChange("entCiro", v)}
            placeholder="Örn: 500000000"
            suffix="TL"
          />
          <InputField
            label="Grup Şirketi / Aktif Şube Sayısı"
            icon={<Building2 size={16} strokeWidth={1.5} />}
            value={values.entSube ?? ""}
            onChange={(v) => onChange("entSube", v)}
            placeholder="Örn: 12"
            suffix="Şirket"
          />
        </div>

        {/* ─── Bayi & Müşteri Portföyü ─── */}
        <SectionHeader icon={<Store size={13} strokeWidth={1.5} />} label="Bayi & Müşteri Portföyü" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Aktif Ticari Müşteri / Bayi Sayısı"
            icon={<Store size={16} strokeWidth={1.5} />}
            value={values.entBayi ?? ""}
            onChange={(v) => onChange("entBayi", v)}
            placeholder="Örn: 1200"
            suffix="Bayi"
          />
          <InputField
            label="Riskli Bayi / Müşteri Segmenti Oranı (%)"
            icon={<ShieldAlert size={16} strokeWidth={1.5} />}
            value={values.entRiskliBayi ?? ""}
            onChange={(v) => onChange("entRiskliBayi", v)}
            placeholder="Örn: 12"
            suffix="%"
          />
        </div>

        {/* ─── Tahsilat Koşulları ─── */}
        <SectionHeader icon={<Target size={13} strokeWidth={1.5} />} label="Tahsilat Koşulları" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Hedeflenen Ortalama Tahsilat Vadesi (DSO Target - Gün)"
            icon={<Target size={16} strokeWidth={1.5} />}
            value={values.entDso ?? ""}
            onChange={(v) => onChange("entDso", v)}
            placeholder="Örn: 45"
            suffix="Gün"
          />
          <InputField
            label="Ortalama Tahsilat Vadesi / DSO Target (Sektörel standart vade - Gün)"
            icon={<CalendarClock size={16} strokeWidth={1.5} />}
            value={values.entSektorelVade ?? ""}
            onChange={(v) => onChange("entSektorelVade", v)}
            placeholder="Örn: 55"
            suffix="Gün"
          />
          <InputField
            label="Tahsilat Mix'i (Örn: %60 DBS, %40 Açık Hesap)"
            icon={<Percent size={16} strokeWidth={1.5} />}
            value={values.entTahsilatMix ?? ""}
            onChange={(v) => onChange("entTahsilatMix", v)}
            placeholder="Örn: 60"
            suffix="% DBS"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            label="Dinamik İskonto Kullanımı"
            icon={<TrendingUp size={16} strokeWidth={1.5} />}
            value={values.entIskonto ?? ""}
            onChange={(v) => onChange("entIskonto", v)}
            placeholder="Durum seçin"
            options={[
              { value: "aktif", label: "Aktif" },
              { value: "pasif", label: "Pasif" },
            ]}
          />
        </div>
      </div>
    );
  }

  if (sector === "enerji") {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-50 tracking-tight">
            Ticari Abone Portföyü ve Satış Koşulları
          </h2>
          <p className="text-sm text-zinc-300 max-w-lg mx-auto leading-relaxed">
            Şebeke ölçeğinizi ve ticari abone portföyünüzü tanımlayın. Horizon, enerji piyasasına özel analiz üretecektir.
          </p>
        </div>

        {/* ─── Hizmet & Hacim ─── */}
        <SectionHeader icon={<Zap size={13} strokeWidth={1.5} />} label="Hizmet & Dağıtım Hacmi" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            label="Hizmet Türü"
            icon={<Flame size={16} strokeWidth={1.5} />}
            value={values.enHizmetTuru ?? ""}
            onChange={(v) => onChange("enHizmetTuru", v)}
            placeholder="Hizmet türü seçin"
            options={[
              { value: "elektrik", label: "Elektrik Dağıtım" },
              { value: "dogalgaz", label: "Doğalgaz Dağıtım" },
              { value: "ikisi", label: "İkisi Birlikte" },
            ]}
          />
          <InputField
            label="Yıllık Toplam Dağıtım Hacmi (MWh / m³)"
            icon={<Gauge size={16} strokeWidth={1.5} />}
            value={values.enDagitimHacmi ?? ""}
            onChange={(v) => onChange("enDagitimHacmi", v)}
            placeholder="Örn: 5000000"
            suffix="MWh"
          />
        </div>

        {/* ─── Abone Portföyü ─── */}
        <SectionHeader icon={<Users size={13} strokeWidth={1.5} />} label="Abone Portföyü" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Aktif Ticari / Sanayi (B2B) Abone Sayısı"
            icon={<Factory size={16} strokeWidth={1.5} />}
            value={values.enAboneSayisi ?? ""}
            onChange={(v) => onChange("enAboneSayisi", v)}
            placeholder="Örn: 2400"
            suffix="Abone"
          />
          <InputField
            label="Resmi Ödeme Vadesi (Gün)"
            icon={<CalendarClock size={16} strokeWidth={1.5} />}
            value={values.enOdemeVadesi ?? ""}
            onChange={(v) => onChange("enOdemeVadesi", v)}
            placeholder="Örn: 30"
            suffix="Gün"
          />
        </div>

        {/* ─── Tahsilat & Güvence ─── */}
        <SectionHeader icon={<Shield size={13} strokeWidth={1.5} />} label="Tahsilat & Güvence" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Teminatlı / Açık Hesap Oranı (%)"
            icon={<Percent size={16} strokeWidth={1.5} />}
            value={values.enTeminatOran ?? ""}
            onChange={(v) => onChange("enTeminatOran", v)}
            placeholder="Örn: 70 (Teminatlı %)"
            suffix="%"
          />
          <SelectField
            label="En Çok Kullanılan Tahsilat Kanalı"
            icon={<CreditCard size={16} strokeWidth={1.5} />}
            value={values.enTahsilatKanal ?? ""}
            onChange={(v) => onChange("enTahsilatKanal", v)}
            placeholder="Kanal seçin"
            options={[
              { value: "dbs", label: "DBS" },
              { value: "otomatik", label: "Otomatik Ödeme" },
              { value: "gise_eft", label: "Gişe / EFT" },
            ]}
          />
          <InputField
            label="Kayıp-Kaçak Oranı Hedefi (%)"
            icon={<TriangleAlert size={16} strokeWidth={1.5} />}
            value={values.enKayipKacak ?? ""}
            onChange={(v) => onChange("enKayipKacak", v)}
            placeholder="Örn: 8"
            suffix="%"
          />
        </div>
      </div>
    );
  }

  if (sector === "telekom") {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-50 tracking-tight">
            Kurumsal Abonelik (B2B) ve Tekrarlayan Gelir (MRR)
          </h2>
          <p className="text-sm text-zinc-300 max-w-lg mx-auto leading-relaxed">
            Telco gelir modelinizi ve kurumsal abone portföyünüzü tanımlayın. Horizon, churn ve tahsilat risklerini analiz edecektir.
          </p>
        </div>

        {/* ─── Gelir Modeli ─── */}
        <SectionHeader icon={<Wifi size={13} strokeWidth={1.5} />} label="Gelir Modeli" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Aylık Tekrarlayan Gelir (MRR - TL)"
            icon={<Banknote size={16} strokeWidth={1.5} />}
            value={values.tcMrr ?? ""}
            onChange={(v) => onChange("tcMrr", v)}
            placeholder="Örn: 12000000"
            suffix="TL"
          />
          <InputField
            label="Aktif Kurumsal (B2B) Abone Sayısı"
            icon={<Building2 size={16} strokeWidth={1.5} />}
            value={values.tcAboneSayisi ?? ""}
            onChange={(v) => onChange("tcAboneSayisi", v)}
            placeholder="Örn: 4500"
            suffix="Abone"
          />
        </div>

        {/* ─── Sözleşme & Cihaz ─── */}
        <SectionHeader icon={<Smartphone size={13} strokeWidth={1.5} />} label="Sözleşme & Cihaz" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Cihaz / Donanım Finansman Payı (%)"
            icon={<Smartphone size={16} strokeWidth={1.5} />}
            value={values.tcCihazPay ?? ""}
            onChange={(v) => onChange("tcCihazPay", v)}
            placeholder="Örn: 25"
            suffix="%"
          />
          <InputField
            label="Taahhüt / Sözleşme Yenileme Ortalama Süresi (Ay)"
            icon={<CalendarClock size={16} strokeWidth={1.5} />}
            value={values.tcTaahhutSure ?? ""}
            onChange={(v) => onChange("tcTaahhutSure", v)}
            placeholder="Örn: 24"
            suffix="Ay"
          />
        </div>

        {/* ─── Tahsilat Koşulları ─── */}
        <SectionHeader icon={<CalendarClock size={13} strokeWidth={1.5} />} label="Tahsilat Koşulları" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Ortalama Tahsilat Vadesi (Gün)"
            icon={<Target size={16} strokeWidth={1.5} />}
            value={values.tcTahsilatVade ?? ""}
            onChange={(v) => onChange("tcTahsilatVade", v)}
            placeholder="Örn: 35"
            suffix="Gün"
          />
          <SelectField
            label="En Çok Kullanılan Tahsilat Kanalı"
            icon={<CreditCard size={16} strokeWidth={1.5} />}
            value={values.tcTahsilatKanal ?? ""}
            onChange={(v) => onChange("tcTahsilatKanal", v)}
            placeholder="Kanal seçin"
            options={[
              { value: "dbs", label: "DBS" },
              { value: "otomatik", label: "Otomatik Ödeme" },
              { value: "havale", label: "Havale / EFT" },
            ]}
          />
        </div>
      </div>
    );
  }

  if (sector === "egitim") {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-50 tracking-tight">
            Öğrenci Portföyü ve Taksit Yapısı
          </h2>
          <p className="text-sm text-zinc-300 max-w-lg mx-auto leading-relaxed">
            Kayıt cirosunu, taksit yapınızı ve öğrenci portföyünüzü tanımlayın. Horizon, taksit risklerini ve drop-out sinyallerini analiz edecektir.
          </p>
        </div>

        {/* ─── Şube Bilgisi ─── */}
        <SectionHeader icon={<Building2 size={13} strokeWidth={1.5} />} label="Şube Bilgisi" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Şube Sayısı (Tek şube veya franchise/zincir)"
            icon={<Building2 size={16} strokeWidth={1.5} />}
            value={values.edSubeSayisi ?? ""}
            onChange={(v) => onChange("edSubeSayisi", v)}
            placeholder="Örn: 3"
            suffix="Şube"
          />
        </div>

        {/* ─── Kayıt & Ciro ─── */}
        <SectionHeader icon={<GraduationCap size={13} strokeWidth={1.5} />} label="Kayıt & Ciro" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Yıllık Toplam Kayıt Ciro Hedefi (TL)"
            icon={<Banknote size={16} strokeWidth={1.5} />}
            value={values.edCiro ?? ""}
            onChange={(v) => onChange("edCiro", v)}
            placeholder="Örn: 8000000"
            suffix="TL"
          />
          <InputField
            label="Aktif Öğrenci / Danışan Sayısı"
            icon={<Users size={16} strokeWidth={1.5} />}
            value={values.edOgrenciSayisi ?? ""}
            onChange={(v) => onChange("edOgrenciSayisi", v)}
            placeholder="Örn: 1200"
            suffix="Öğrenci"
          />
        </div>

        {/* ─── Taksit Yapısı ─── */}
        <SectionHeader icon={<CalendarClock size={13} strokeWidth={1.5} />} label="Taksit Yapısı" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Ortalama Taksit Sayısı (Ay)"
            icon={<CalendarClock size={16} strokeWidth={1.5} />}
            value={values.edTaksitSayisi ?? ""}
            onChange={(v) => onChange("edTaksitSayisi", v)}
            placeholder="Örn: 9"
            suffix="Ay"
          />
          <InputField
            label="Kayıt Anı Peşinat Oranı (%)"
            icon={<Percent size={16} strokeWidth={1.5} />}
            value={values.edPesinat ?? ""}
            onChange={(v) => onChange("edPesinat", v)}
            placeholder="Örn: 20"
            suffix="%"
          />
        </div>

        {/* ─── Segment & Ödeme ─── */}
        <SectionHeader icon={<BookOpen size={13} strokeWidth={1.5} />} label="Segment & Ödeme" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="B2C (Bireysel) / B2B (Kurumsal) Öğrenci Dağılımı"
            icon={<Users size={16} strokeWidth={1.5} />}
            value={values.edB2cOran ?? ""}
            onChange={(v) => onChange("edB2cOran", v)}
            placeholder="Örn: 80 (B2C %)"
            suffix="% B2C"
          />
          <SelectField
            label="En Çok Kullanılan Ödeme Kanalı"
            icon={<CreditCard size={16} strokeWidth={1.5} />}
            value={values.edOdemeKanal ?? ""}
            onChange={(v) => onChange("edOdemeKanal", v)}
            placeholder="Kanal seçin"
            options={[
              { value: "kredi_karti", label: "Kredi Kartı / Mail-Order" },
              { value: "senet", label: "Senet / Elden Taksit" },
              { value: "pesin", label: "Peşin / Havale" },
            ]}
          />
        </div>
      </div>
    );
  }

  /* ── KOBİ (Default) ── */
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-50 tracking-tight">
          Şirket, Satış ve Müşteri Portföyü
        </h2>
        <p className="text-sm text-zinc-300 max-w-lg mx-auto leading-relaxed">
          Tahsilat modellemesi ve nakit akışı projeksiyonu için şirket verilerinizi girin.
        </p>
      </div>

      {/* ─── Ciro & Hacim ─── */}
      <SectionHeader icon={<TrendingUp size={13} strokeWidth={1.5} />} label="Ciro & Hacim" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Yıllık Ciro Hedefi / Gerçekleşen (TL)"
          icon={<Banknote size={16} strokeWidth={1.5} />}
          value={values.ciro ?? ""}
          onChange={(v) => onChange("ciro", v)}
          placeholder="Örn: 60000000"
          suffix="TL"
        />
        <InputField
          label="Aylık Ortalama Fatura Sayısı"
          icon={<Receipt size={16} strokeWidth={1.5} />}
          value={values.faturaSayisi ?? ""}
          onChange={(v) => onChange("faturaSayisi", v)}
          placeholder="Örn: 320"
          suffix="Adet"
        />
      </div>

      {/* ─── Müşteri Portföyü ─── */}
      <SectionHeader icon={<Users size={13} strokeWidth={1.5} />} label="Müşteri Portföyü" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Aktif Müşteri Sayısı"
          icon={<Users size={16} strokeWidth={1.5} />}
          value={values.musteriSayisi ?? ""}
          onChange={(v) => onChange("musteriSayisi", v)}
          placeholder="Örn: 85"
          suffix="Müşteri"
        />
        <InputField
          label="Yeni Müşteri Edinme Hızı (Aylık Ort.)"
          icon={<UserPlus size={16} strokeWidth={1.5} />}
          value={values.yeniMusteri ?? ""}
          onChange={(v) => onChange("yeniMusteri", v)}
          placeholder="Örn: 8"
          suffix="Müşteri/Ay"
        />
      </div>

      {/* ─── Satış Koşulları ─── */}
      <SectionHeader icon={<CalendarClock size={13} strokeWidth={1.5} />} label="Satış Koşulları" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Ortalama Satış Vadesi / Hedef DSO (Gün)"
          icon={<CalendarClock size={16} strokeWidth={1.5} />}
          value={values.vade ?? ""}
          onChange={(v) => onChange("vade", v)}
          placeholder="Örn: 60"
          suffix="Gün"
        />
        <InputField
          label="Peşin / Vadeli Satış Oranı (%)"
          icon={<Percent size={16} strokeWidth={1.5} />}
          value={values.pesinOran ?? ""}
          onChange={(v) => onChange("pesinOran", v)}
          placeholder="Örn: 30 (Peşin %)"
          suffix="%"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField
          label="En Çok Kullanılan Ödeme Aracı"
          icon={<CreditCard size={16} strokeWidth={1.5} />}
          value={values.odemeAraci ?? ""}
          onChange={(v) => onChange("odemeAraci", v)}
          placeholder="Ödeme aracı seçin"
          options={[
            { value: "havale", label: "Havale / EFT" },
            { value: "cek_senet", label: "Çek / Senet" },
            { value: "kredi_karti", label: "Kredi Kartı" },
            { value: "dbs", label: "DBS (Doğrudan Borçlandırma)" },
          ]}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   STEP 3 — ERP Röntgen (Read-Only - Kırmızı UI)
   ═══════════════════════════════════════════════════════════ */
function Step3({ sector }: { sector: SectorOption }) {
  const kobiFindings = [
    {
      label: "Müşteri Yoğunlaşma Riski",
      value: "%40",
      detail: "Cironun %40'ı sadece 2 müşteriden geliyor",
      icon: <AlertTriangle size={18} strokeWidth={1.5} />,
    },
    {
      label: "Gerçekleşen Ortalama Gecikme",
      value: "+18 Gün",
      detail: "Sözleşme vadesinin ortalama 18 gün üzerinde tahsilat",
      icon: <Clock size={18} strokeWidth={1.5} />,
    },
    {
      label: "Vadesi Geçmiş Tahsil Edilemeyen Alacak",
      value: "1.250.000 TL",
      detail: "90 günü aşmış tahsil edilememiş toplam alacak",
      icon: <ShieldAlert size={18} strokeWidth={1.5} />,
    },
  ];

  const enterpriseFindings = [
    {
      label: "Bayi Yoğunlaşma Riski",
      value: "%45",
      detail: "İlk 20 bayi cironun %45'ini oluşturuyor",
      icon: <AlertTriangle size={18} strokeWidth={1.5} />,
    },
    {
      label: "İhtilaflı / Gecikmiş Fatura Hacmi",
      value: "42.500.000 TL",
      detail: "Aktif ihtilaflı ve vadesi geçmiş toplam fatura tutarı",
      icon: <ShieldAlert size={18} strokeWidth={1.5} />,
    },
    {
      label: "Sektörel Sapma: Ortalama Tahsilat Gecikmesi",
      value: "+22 Gün",
      detail: "Sektör ortalamasının 22 gün üzerinde tahsilat süresi",
      icon: <Clock size={18} strokeWidth={1.5} />,
    },
  ];

  const enerjiFindings = [
    {
      label: "Abone Yoğunlaşma Riski",
      value: "%35",
      detail: "Cironun %35'i sadece 5 sanayi abonesinde toplanmış",
      icon: <AlertTriangle size={18} strokeWidth={1.5} />,
    },
    {
      label: "Piyasa Ödeme Sapması (Negatif Makas)",
      value: "-12 Gün",
      detail: "Müşteri tahsilatından 12 gün önce EPİAŞ ödemesi yapılıyor",
      icon: <Clock size={18} strokeWidth={1.5} />,
    },
    {
      label: "Margin Call (Teminat) Riski",
      value: "%85",
      detail: "Mevcut teminatlar yaklaşan fatura yükünü karşılamıyor",
      icon: <ShieldAlert size={18} strokeWidth={1.5} />,
    },
  ];

  const telcoFindings = [
    {
      label: "Riskli Konsantrasyon",
      value: "%20 Yavaşlama",
      detail: "Enterprise segmentindeki 12 ana hesapta ödeme hızı son 2 ayda %20 yavaşladı",
      icon: <AlertTriangle size={18} strokeWidth={1.5} />,
    },
    {
      label: "Churn (Müşteri Kaybı) Sinyali",
      value: "%75",
      detail: "Gecikme trendi, bu hesapların %75 ihtimalle rakip operatöre geçiş hazırlığında olduğunu gösteriyor",
      icon: <ShieldAlert size={18} strokeWidth={1.5} />,
    },
    {
      label: "İhtilaflı Bakiye (Data Aşımı & Tarife İtirazı)",
      value: "2.400.000 TL",
      detail: "Data aşımı ve tarife itirazı kaynaklı bekleyen tahsilat",
      icon: <Clock size={18} strokeWidth={1.5} />,
    },
  ];

  const egitimFindings = [
    {
      label: "Taksit Gecikme Sinyali",
      value: "%15 Kronik",
      detail: "Elden taksitli (senetli) satışların %15'inde 20 günü aşan kronik gecikmeler var",
      icon: <AlertTriangle size={18} strokeWidth={1.5} />,
    },
    {
      label: "Drop-out (Terk) Riski",
      value: "42 Öğrenci",
      detail: "Devamsızlık verileriyle eşleşen 42 öğrencide kursu bırakma ve taksit iptali riski yüksek",
      icon: <ShieldAlert size={18} strokeWidth={1.5} />,
    },
    {
      label: "Vadesi Geçmiş Tahsil Edilemeyen Taksit / Senet",
      value: "380.000 TL",
      detail: "Tahsil edilemeyen vadesi geçmiş taksit ve senet toplamı",
      icon: <Clock size={18} strokeWidth={1.5} />,
    },
  ];

  const findings = sector === "egitim"
    ? egitimFindings
    : sector === "telekom"
      ? telcoFindings
      : sector === "enerji"
        ? enerjiFindings
        : sector === "kurumsal"
          ? enterpriseFindings
          : kobiFindings;
  const title = sector === "egitim"
    ? "Narsent Tahsilat ve Drop-out (Terk) Analizi"
    : sector === "telekom"
      ? "Narsent Telco Churn & Tahsilat Risk Analizi"
      : sector === "enerji"
        ? "Narsent Enerji & Piyasa Risk Analizi"
        : sector === "kurumsal"
          ? "Narsent Konsolide Risk Analizi"
          : "Narsent ERP Analizi";
  const subtitle = sector === "egitim"
    ? "Eğitim yönetim sistemi verilerinizden otomatik hesaplanan taksit ve terk riski tespiti. Bu veriler salt okunurdur."
    : sector === "telekom"
      ? "Telco abone ve tahsilat verilerinizden otomatik hesaplanan churn ve risk tespiti. Bu veriler salt okunurdur."
      : sector === "enerji"
        ? "Enerji piyasası ve şebeke verilerinizden otomatik hesaplanan risk tespiti. Bu veriler salt okunurdur."
        : sector === "kurumsal"
          ? "Grup bazlı ERP verilerinizden otomatik hesaplanan konsolide risk tespiti. Bu veriler salt okunurdur."
          : "ERP verilerinizden otomatik olarak hesaplanan mevcut durum tespiti. Bu veriler salt okunurdur.";

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-50 tracking-tight">
          {title}
        </h2>
        <p className="text-sm text-zinc-300 max-w-lg mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 mb-2">
          <BarChart3 size={14} className="text-red-400" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-red-400">
            Sistem Tarafından Tespit Edilen Riskler
          </span>
        </div>

        {findings.map((f) => (
          <div
            key={f.label}
            className="rounded-xl border border-red-500/25 bg-red-950/20 p-5 flex items-start gap-4"
          >
            <div className="shrink-0 mt-0.5 text-red-400">{f.icon}</div>
            <div className="flex-1 space-y-1.5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-sm font-semibold text-red-300">
                  {f.label}
                </span>
                <span className="text-lg font-bold text-red-400 tabular-nums">
                  {f.value}
                </span>
              </div>
              <p className="text-[13px] text-red-300/70 leading-relaxed">
                {f.detail}
              </p>
            </div>
          </div>
        ))}

        {/* Read-only badge */}
        <div className="flex items-center justify-center gap-2 pt-2">
          <div className="h-1.5 w-1.5 rounded-full bg-red-500/60 animate-pulse" />
          <span className="text-[11px] text-zinc-400 font-medium uppercase tracking-wider">
            Salt Okunur — {sector === "egitim" ? "Eğitim Yönetim Verisi" : sector === "telekom" ? "Telco Abone Verisi" : sector === "enerji" ? "Enerji Piyasa Verisi" : sector === "kurumsal" ? "Konsolide ERP Verisi" : "ERP Verisi"}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   STEP 4 — Operasyon & Likidite (Beyaz UI - Kullanıcı Girdisi)
   ═══════════════════════════════════════════════════════════ */
function Step4({
  sector,
  values,
  onChange,
}: {
  sector: SectorOption;
  values: Record<string, string>;
  onChange: (field: string, value: string) => void;
}) {
  if (sector === "kurumsal") {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-50 tracking-tight">
            Grup Likiditesi ve Tedarik Zinciri
          </h2>
          <p className="text-sm text-zinc-300 max-w-lg mx-auto leading-relaxed">
            Konsolide gider yapınızı, tedarik zincirinizi ve finansman imkanlarınızı belirleyin.
          </p>
        </div>

        {/* ─── Tedarik Zinciri ─── */}
        <SectionHeader icon={<Truck size={13} strokeWidth={1.5} />} label="Tedarik Zinciri" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Stratejik Tedarikçi Sayısı"
            icon={<Store size={16} strokeWidth={1.5} />}
            value={values.entTedarikci ?? ""}
            onChange={(v) => onChange("entTedarikci", v)}
            placeholder="Örn: 85"
            suffix="Tedarikçi"
          />
          <InputField
            label="Tedarikçi Ödeme Vadesi (DPO - Gün)"
            icon={<HandCoins size={16} strokeWidth={1.5} />}
            value={values.entDpo ?? ""}
            onChange={(v) => onChange("entDpo", v)}
            placeholder="Örn: 60"
            suffix="Gün"
          />
        </div>

        {/* ─── Konsolide Giderler ─── */}
        <SectionHeader icon={<BarChart3 size={13} strokeWidth={1.5} />} label="Konsolide Giderler" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Konsolide Aylık Personel ve OpEx Gideri (TL)"
            icon={<Wallet size={16} strokeWidth={1.5} />}
            value={values.entOpex ?? ""}
            onChange={(v) => onChange("entOpex", v)}
            placeholder="Örn: 18000000"
            suffix="TL"
          />
          <InputField
            label="Aylık Banka Kredisi ve Tahvil Ödemeleri (TL)"
            icon={<CreditCard size={16} strokeWidth={1.5} />}
            value={values.entKrediOdeme ?? ""}
            onChange={(v) => onChange("entKrediOdeme", v)}
            placeholder="Örn: 8500000"
            suffix="TL"
          />
        </div>

        {/* ─── Stok & Varlık Yapısı ─── */}
        <SectionHeader icon={<Boxes size={13} strokeWidth={1.5} />} label="Stok & Varlık Yapısı" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Konsolide Toplam Stok / Atıl Varlık Değeri (TL)"
            icon={<Package size={16} strokeWidth={1.5} />}
            value={values.entStok ?? ""}
            onChange={(v) => onChange("entStok", v)}
            placeholder="Örn: 120000000"
            suffix="TL"
          />
          <InputField
            label="Konsolide Stok Devir Hızı (Gün)"
            icon={<RefreshCw size={16} strokeWidth={1.5} />}
            value={values.entStokDevir ?? ""}
            onChange={(v) => onChange("entStokDevir", v)}
            placeholder="Örn: 42"
            suffix="Gün"
          />
        </div>

        {/* ─── Nakit & Finansman ─── */}
        <SectionHeader icon={<Landmark size={13} strokeWidth={1.5} />} label="Nakit & Finansman" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Konsolide Banka Mevcudu (Hazır Nakit - TL)"
            icon={<Landmark size={16} strokeWidth={1.5} />}
            value={values.entNakit ?? ""}
            onChange={(v) => onChange("entNakit", v)}
            placeholder="Örn: 45000000"
            suffix="TL"
          />
          <InputField
            label="Kullanılabilir Revolving / Hazır Kredi Limitleri (TL)"
            icon={<CreditCard size={16} strokeWidth={1.5} />}
            value={values.entKredi ?? ""}
            onChange={(v) => onChange("entKredi", v)}
            placeholder="Örn: 75000000"
            suffix="TL"
          />
        </div>
      </div>
    );
  }

  if (sector === "enerji") {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-50 tracking-tight">
            Piyasa Takas (EPİAŞ) ve Likidite Pozisyonu
          </h2>
          <p className="text-sm text-zinc-300 max-w-lg mx-auto leading-relaxed">
            Enerji piyasası yükümlülüklerinizi ve likidite pozisyonunuzu tanımlayın.
          </p>
        </div>

        {/* ─── Piyasa Yükümlülükleri ─── */}
        <SectionHeader icon={<Zap size={13} strokeWidth={1.5} />} label="Piyasa Yükümlülükleri" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Aylık Piyasa Takas Hacmi (EPİAŞ / DGPYS - TL)"
            icon={<BarChart3 size={16} strokeWidth={1.5} />}
            value={values.enTakasHacmi ?? ""}
            onChange={(v) => onChange("enTakasHacmi", v)}
            placeholder="Örn: 85000000"
            suffix="TL"
          />
          <InputField
            label="Aylık Bakım, Altyapı ve Sistem Kullanım Bedeli (TL)"
            icon={<Wallet size={16} strokeWidth={1.5} />}
            value={values.enBakimBedeli ?? ""}
            onChange={(v) => onChange("enBakimBedeli", v)}
            placeholder="Örn: 12000000"
            suffix="TL"
          />
        </div>

        {/* ─── Nakit & Teminat ─── */}
        <SectionHeader icon={<Landmark size={13} strokeWidth={1.5} />} label="Nakit & Teminat" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Kullanılabilir Hazır Nakit ve Serbest Limitler (TL)"
            icon={<Landmark size={16} strokeWidth={1.5} />}
            value={values.enHazirNakit ?? ""}
            onChange={(v) => onChange("enHazirNakit", v)}
            placeholder="Örn: 25000000"
            suffix="TL"
          />
          <InputField
            label="Bloke / Rehinli Teminatlar (EPİAŞ Teminatı - TL)"
            icon={<Shield size={16} strokeWidth={1.5} />}
            value={values.enBlokeTeminat ?? ""}
            onChange={(v) => onChange("enBlokeTeminat", v)}
            placeholder="Örn: 18000000"
            suffix="TL"
          />
        </div>

        {/* ─── Finansman ─── */}
        <SectionHeader icon={<CreditCard size={13} strokeWidth={1.5} />} label="Finansman" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Aylık Finansman Maliyetleri (Kredi taksitleri ve limit maliyetleri - TL)"
            icon={<CreditCard size={16} strokeWidth={1.5} />}
            value={values.enFinansmanMaliyet ?? ""}
            onChange={(v) => onChange("enFinansmanMaliyet", v)}
            placeholder="Örn: 5000000"
            suffix="TL"
          />
          <InputField
            label="Karşılıksız / Protesto Edilen Teminat Hacmi (TL)"
            icon={<TriangleAlert size={16} strokeWidth={1.5} />}
            value={values.enProtestoHacmi ?? ""}
            onChange={(v) => onChange("enProtestoHacmi", v)}
            placeholder="Örn: 3500000"
            suffix="TL"
          />
        </div>
      </div>
    );
  }

  if (sector === "telekom") {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-50 tracking-tight">
            Veri Merkezi, Altyapı ve Lisans Giderleri
          </h2>
          <p className="text-sm text-zinc-300 max-w-lg mx-auto leading-relaxed">
            Telco altyapı maliyetlerinizi ve likidite pozisyonunuzu tanımlayın.
          </p>
        </div>

        {/* ─── Altyapı Giderleri (Detaylı OPEX Kırılımı) ─── */}
        <SectionHeader icon={<Monitor size={13} strokeWidth={1.5} />} label="Altyapı & OPEX Kırılımı" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Donanım Stok Değeri (Akıllı telefon, modem, router envanteri - TL)"
            icon={<Smartphone size={16} strokeWidth={1.5} />}
            value={values.tcDonanim ?? ""}
            onChange={(v) => onChange("tcDonanim", v)}
            placeholder="Örn: 22000000"
            suffix="TL"
          />
          <InputField
            label="Enerji ve Veri Merkezi Giderleri (Data center/baz istasyonu bakım - TL)"
            icon={<Monitor size={16} strokeWidth={1.5} />}
            value={values.tcVeriMerkezi ?? ""}
            onChange={(v) => onChange("tcVeriMerkezi", v)}
            placeholder="Örn: 8500000"
            suffix="TL"
          />
          <InputField
            label="Lisans ve Frekans Bedelleri (Devlete ödenen yıllık/aylık imtiyaz - TL)"
            icon={<Shield size={16} strokeWidth={1.5} />}
            value={values.tcLisans ?? ""}
            onChange={(v) => onChange("tcLisans", v)}
            placeholder="Örn: 3200000"
            suffix="TL"
          />
          <InputField
            label="Personel ve Saha Giderleri (Operasyonel maliyet toplamı - TL)"
            icon={<Users size={16} strokeWidth={1.5} />}
            value={values.tcPersonel ?? ""}
            onChange={(v) => onChange("tcPersonel", v)}
            placeholder="Örn: 6800000"
            suffix="TL"
          />
        </div>

        {/* ─── Interconnect & Tedarik ─── */}
        <SectionHeader icon={<Wifi size={13} strokeWidth={1.5} />} label="Interconnect & Tedarik" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Interconnect ve Yurt Dışı Partner Ödemeleri (TL)"
            icon={<Wifi size={16} strokeWidth={1.5} />}
            value={values.tcInterconnect ?? ""}
            onChange={(v) => onChange("tcInterconnect", v)}
            placeholder="Örn: 4200000"
            suffix="TL"
          />
          <InputField
            label="Donanım (Cihaz) Tedarikçi Vadesi (DPO - Gün)"
            icon={<HandCoins size={16} strokeWidth={1.5} />}
            value={values.tcDpo ?? ""}
            onChange={(v) => onChange("tcDpo", v)}
            placeholder="Örn: 90"
            suffix="Gün"
          />
        </div>

        {/* ─── Yatırım & Likidite ─── */}
        <SectionHeader icon={<Landmark size={13} strokeWidth={1.5} />} label="Yatırım & Likidite" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Bekleyen Olağanüstü Yatırım (5G/Fiber Capex - TL)"
            icon={<Zap size={16} strokeWidth={1.5} />}
            value={values.tcCapex ?? ""}
            onChange={(v) => onChange("tcCapex", v)}
            placeholder="Örn: 45000000"
            suffix="TL"
          />
          <InputField
            label="Kullanılabilir Hazır Nakit ve Kredi Limitleri (TL)"
            icon={<Landmark size={16} strokeWidth={1.5} />}
            value={values.tcNakit ?? ""}
            onChange={(v) => onChange("tcNakit", v)}
            placeholder="Örn: 30000000"
            suffix="TL"
          />
        </div>
      </div>
    );
  }

  if (sector === "egitim") {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-50 tracking-tight">
            Operasyonel Giderler ve Şube Verimliliği
          </h2>
          <p className="text-sm text-zinc-300 max-w-lg mx-auto leading-relaxed">
            Şube gider yapınızı ve nakit pozisyonunuzu tanımlayın.
          </p>
        </div>

        {/* ─── Personel & Kira ─── */}
        <SectionHeader icon={<Users size={13} strokeWidth={1.5} />} label="Personel & Kira" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Aylık Eğitmen ve Personel Maaş Yükü (TL)"
            icon={<Wallet size={16} strokeWidth={1.5} />}
            value={values.edMaas ?? ""}
            onChange={(v) => onChange("edMaas", v)}
            placeholder="Örn: 450000"
            suffix="TL"
          />
          <InputField
            label="Kira ve Enerji Sabit Giderleri (TL)"
            icon={<Landmark size={16} strokeWidth={1.5} />}
            value={values.edKira ?? ""}
            onChange={(v) => onChange("edKira", v)}
            placeholder="Örn: 120000"
            suffix="TL"
          />
        </div>

        {/* ─── Pazarlama & Materyal ─── */}
        <SectionHeader icon={<TrendingUp size={13} strokeWidth={1.5} />} label="Pazarlama & Materyal" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Aylık Pazarlama / Reklam Harcaması (TL)"
            icon={<TrendingUp size={16} strokeWidth={1.5} />}
            value={values.edPazarlama ?? ""}
            onChange={(v) => onChange("edPazarlama", v)}
            placeholder="Örn: 85000"
            suffix="TL"
          />
          <InputField
            label="Dış Hizmet ve Materyal (Kitap) Giderleri (TL)"
            icon={<BookOpen size={16} strokeWidth={1.5} />}
            value={values.edMateryal ?? ""}
            onChange={(v) => onChange("edMateryal", v)}
            placeholder="Örn: 35000"
            suffix="TL"
          />
        </div>

        {/* ─── Doluluk & Nakit ─── */}
        <SectionHeader icon={<Landmark size={13} strokeWidth={1.5} />} label="Doluluk & Nakit" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Şube / Sınıf Doluluk Oranı (%)"
            icon={<BarChart3 size={16} strokeWidth={1.5} />}
            value={values.edDoluluk ?? ""}
            onChange={(v) => onChange("edDoluluk", v)}
            placeholder="Örn: 72"
            suffix="%"
          />
          <InputField
            label="Mevcut Kasa ve Banka Hazır Nakit (TL)"
            icon={<Landmark size={16} strokeWidth={1.5} />}
            value={values.edNakit ?? ""}
            onChange={(v) => onChange("edNakit", v)}
            placeholder="Örn: 180000"
            suffix="TL"
          />
        </div>
      </div>
    );
  }

  /* ── KOBİ (Default) ── */
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-50 tracking-tight">
          Tedarik, Operasyon ve Likidite
        </h2>
        <p className="text-sm text-zinc-300 max-w-lg mx-auto leading-relaxed">
          Nakit akışı simülasyonu için gider yapınızı, tedarik zincirinizi ve varlık dengenizi tanımlayın.
        </p>
      </div>

      {/* ─── Tedarik Zinciri ─── */}
      <SectionHeader icon={<Truck size={13} strokeWidth={1.5} />} label="Tedarik Zinciri" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Aktif Tedarikçi Sayısı"
          icon={<Store size={16} strokeWidth={1.5} />}
          value={values.tedarikciSayisi ?? ""}
          onChange={(v) => onChange("tedarikciSayisi", v)}
          placeholder="Örn: 45"
          suffix="Tedarikçi"
        />
        <InputField
          label="Aylık Toplam Alış / Hammadde Gideri (TL)"
          icon={<HandCoins size={16} strokeWidth={1.5} />}
          value={values.alisGideri ?? ""}
          onChange={(v) => onChange("alisGideri", v)}
          placeholder="Örn: 3500000"
          suffix="TL"
        />
        <InputField
          label="Tedarikçi Ödeme Vadesi / Hedef DPO (Gün)"
          icon={<CalendarClock size={16} strokeWidth={1.5} />}
          value={values.dpo ?? ""}
          onChange={(v) => onChange("dpo", v)}
          placeholder="Örn: 45"
          suffix="Gün"
        />
      </div>

      {/* ─── Sabit Giderler ─── */}
      <SectionHeader icon={<BarChart3 size={13} strokeWidth={1.5} />} label="Sabit Giderler" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Aylık Sabit Giderler (Maaş, Kira vb. - TL)"
          icon={<Wallet size={16} strokeWidth={1.5} />}
          value={values.opex ?? ""}
          onChange={(v) => onChange("opex", v)}
          placeholder="Örn: 850000"
          suffix="TL"
        />
        <InputField
          label="Aylık Kredi / Finansman Ödemeleri (TL)"
          icon={<CreditCard size={16} strokeWidth={1.5} />}
          value={values.krediOdeme ?? ""}
          onChange={(v) => onChange("krediOdeme", v)}
          placeholder="Örn: 120000"
          suffix="TL"
        />
      </div>

      {/* ─── Stok Yapısı ─── */}
      <SectionHeader icon={<Boxes size={13} strokeWidth={1.5} />} label="Stok Yapısı" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Toplam Stok Değeri (TL)"
          icon={<Package size={16} strokeWidth={1.5} />}
          value={values.stok ?? ""}
          onChange={(v) => onChange("stok", v)}
          placeholder="Örn: 2500000"
          suffix="TL"
        />
        <InputField
          label="Stok Devir Hızı (Ortalama Gün)"
          icon={<RefreshCw size={16} strokeWidth={1.5} />}
          value={values.stokDevir ?? ""}
          onChange={(v) => onChange("stokDevir", v)}
          placeholder="Örn: 35"
          suffix="Gün"
        />
      </div>

      {/* ─── Nakit & Likidite ─── */}
      <SectionHeader icon={<Landmark size={13} strokeWidth={1.5} />} label="Nakit & Likidite" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Banka ve Kasa Toplam Mevcudu (TL)"
          icon={<Landmark size={16} strokeWidth={1.5} />}
          value={values.nakit ?? ""}
          onChange={(v) => onChange("nakit", v)}
          placeholder="Örn: 600000"
          suffix="TL"
        />
        <InputField
          label="Beklenen Olağanüstü Giderler (3 Ay - TL)"
          icon={<TriangleAlert size={16} strokeWidth={1.5} />}
          value={values.olaganustuGider ?? ""}
          onChange={(v) => onChange("olaganustuGider", v)}
          placeholder="Örn: 200000"
          suffix="TL"
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   STEP 5 — Narsent Sistem Özeti & Başlat
   ═══════════════════════════════════════════════════════════ */
function Step5({ sector, onLaunch }: { sector: SectorOption; onLaunch: () => void }) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-50 tracking-tight">
          Sistem Özeti
        </h2>
        <p className="text-sm text-zinc-300 max-w-lg mx-auto leading-relaxed">
          Narsent Horizon, verilerinizi analiz etti. İşte ilk tespitler ve hedefler.
        </p>
      </div>

      {/* ═══ Eğitim Dashboard ═══ */}
      {sector === "egitim" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Left — Mevsimsel Nakit Açığı (Red) */}
          <div className="rounded-2xl border border-red-500/25 bg-red-950/20 p-6 space-y-4 flex flex-col">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/15">
                <GraduationCap size={16} className="text-red-400" strokeWidth={2} />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-red-400">
                Mevsimsel Nakit Açığı
              </span>
            </div>
            <div className="flex-1 space-y-3">
              <p className="text-[15px] font-semibold text-red-300 leading-relaxed">
                Taksit gecikmeleri ve yazın düşen kayıtlar nedeniyle Temmuz ayında eğitmen maaşları için
              </p>
              <p className="text-3xl font-bold text-red-400 tabular-nums tracking-tight">
                80.000 TL
              </p>
              <p className="text-sm text-red-300/80 leading-relaxed">
                nakit açığı riski tespit edildi
              </p>
            </div>
            <div className="flex items-center gap-1.5 pt-1">
              <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[11px] text-red-400/70 font-medium">
                Kritik Uyarı
              </span>
            </div>
          </div>

          {/* Right — AI Goal (Blue) */}
          <div className="rounded-2xl border border-blue-500/25 bg-blue-950/15 p-6 space-y-4 flex flex-col">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/15">
                <Brain size={16} className="text-blue-400" strokeWidth={2} />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-blue-400">
                Horizon AI Hedefi
              </span>
            </div>
            <div className="flex-1 space-y-3">
              <p className="text-[15px] font-semibold text-blue-200 leading-relaxed">
                Hangi öğrencinin taksitini aksatacağını önceden tahmin edip tahsilatı hızlandırmak
              </p>
              <p className="text-3xl font-bold text-blue-400 tabular-nums tracking-tight">
                %95 İsabet
              </p>
              <p className="text-sm text-blue-300/80 leading-relaxed">
                ile yaz dönemi nakit akışını güvenceye almak
              </p>
            </div>
            <div className="flex items-center gap-1.5 pt-1">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[11px] text-blue-400/70 font-medium">
                Eğitim AI Motorları Hazır
              </span>
            </div>
          </div>
        </div>
      ) : sector === "telekom" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Left — Churn Risk (Red) */}
          <div className="rounded-2xl border border-red-500/25 bg-red-950/20 p-6 space-y-4 flex flex-col">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/15">
                <Wifi size={16} className="text-red-400" strokeWidth={2} />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-red-400">
                Churn Risk Sinyali
              </span>
            </div>
            <div className="flex-1 space-y-3">
              <p className="text-[15px] font-semibold text-red-300 leading-relaxed">
                Ödeme davranışı bozulan 12 kurumsal müşterinin kaybedilmesi durumunda yıllık
              </p>
              <p className="text-3xl font-bold text-red-400 tabular-nums tracking-tight">
                28.800.000 TL
              </p>
              <p className="text-sm text-red-300/80 leading-relaxed">
                MRR kaybı yaşanacak
              </p>
            </div>
            <div className="flex items-center gap-1.5 pt-1">
              <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[11px] text-red-400/70 font-medium">
                Kritik Uyarı
              </span>
            </div>
          </div>

          {/* Right — AI Goal (Blue) */}
          <div className="rounded-2xl border border-blue-500/25 bg-blue-950/15 p-6 space-y-4 flex flex-col">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/15">
                <Brain size={16} className="text-blue-400" strokeWidth={2} />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-blue-400">
                Horizon AI Hedefi
              </span>
            </div>
            <div className="flex-1 space-y-3">
              <p className="text-[15px] font-semibold text-blue-200 leading-relaxed">
                Tahsilat verilerindeki mikro gecikme sinyallerini yakalayarak müşteri kaybını (Churn) engellemek
              </p>
              <p className="text-3xl font-bold text-blue-400 tabular-nums tracking-tight">
                %15 Engelleme
              </p>
              <p className="text-sm text-blue-300/80 leading-relaxed">
                ve cihaz finansman riskini minimize etmek
              </p>
            </div>
            <div className="flex items-center gap-1.5 pt-1">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[11px] text-blue-400/70 font-medium">
                Telco AI Motorları Hazır
              </span>
            </div>
          </div>
        </div>
      ) : sector === "enerji" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Left — EPİAŞ Risk Signal (Red) */}
          <div className="rounded-2xl border border-red-500/25 bg-red-950/20 p-6 space-y-4 flex flex-col">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/15">
                <Zap size={16} className="text-red-400" strokeWidth={2} />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-red-400">
                EPİAŞ Nakit Açığı Sinyali
              </span>
            </div>
            <div className="flex-1 space-y-3">
              <p className="text-[15px] font-semibold text-red-300 leading-relaxed">
                Tarihsel gecikme trendine göre ayın 15&apos;indeki
              </p>
              <p className="text-3xl font-bold text-red-400 tabular-nums tracking-tight">
                10.000.000 TL
              </p>
              <p className="text-sm text-red-300/80 leading-relaxed">
                EPİAŞ ödemesinde nakit açığı riski tespit edildi
              </p>
            </div>
            <div className="flex items-center gap-1.5 pt-1">
              <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[11px] text-red-400/70 font-medium">
                Kritik Uyarı
              </span>
            </div>
          </div>

          {/* Right — AI Goal (Blue) */}
          <div className="rounded-2xl border border-blue-500/25 bg-blue-950/15 p-6 space-y-4 flex flex-col">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/15">
                <Brain size={16} className="text-blue-400" strokeWidth={2} />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-blue-400">
                Horizon AI Hedefi
              </span>
            </div>
            <div className="flex-1 space-y-3">
              <p className="text-[15px] font-semibold text-blue-200 leading-relaxed">
                Ticari abonelerin ödeme davranışlarını analiz edip nakit açığını 15 gün önceden tahmin etmek
              </p>
              <p className="text-3xl font-bold text-blue-400 tabular-nums tracking-tight">
                %85 İsabet
              </p>
              <p className="text-sm text-blue-300/80 leading-relaxed">
                ve Teminat Yeterliliğini sağlamak
              </p>
            </div>
            <div className="flex items-center gap-1.5 pt-1">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[11px] text-blue-400/70 font-medium">
                Enerji AI Motorları Hazır
              </span>
            </div>
          </div>
        </div>
      ) : sector === "kurumsal" ? (
        <>
          {/* Split: Left — Risk Signals (Red) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* LEFT COLUMN - Red Risk Signals */}
            <div className="space-y-4">
              {/* Risk Card 1 - Atıl Nakit */}
              <div className="rounded-2xl border border-red-500/25 bg-red-950/20 p-5 space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-500/15">
                    <Landmark size={14} className="text-red-400" strokeWidth={2} />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-red-400">
                    Atıl Nakit Tespiti
                  </span>
                </div>
                <p className="text-[14px] font-semibold text-red-300 leading-relaxed">
                  15 farklı banka hesabında toplam
                </p>
                <p className="text-2xl font-bold text-red-400 tabular-nums tracking-tight">
                  25.000.000 TL
                </p>
                <p className="text-[13px] text-red-300/70 leading-relaxed">
                  Atıl Nakit Tespit Edildi
                </p>
                <div className="flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[11px] text-red-400/70 font-medium">Kritik Uyarı</span>
                </div>
              </div>

              {/* Risk Card 2 - Bayi Risk */}
              <div className="rounded-2xl border border-red-500/25 bg-red-950/20 p-5 space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-500/15">
                    <ShieldAlert size={14} className="text-red-400" strokeWidth={2} />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-red-400">
                    Bayi Risk Sinyali
                  </span>
                </div>
                <p className="text-[14px] font-semibold text-red-300 leading-relaxed">
                  4 bayide gözlemlenen %15 yavaşlama
                </p>
                <p className="text-2xl font-bold text-red-400 tabular-nums tracking-tight">
                  40.000.000 TL Risk
                </p>
                <div className="flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[11px] text-red-400/70 font-medium">Yüksek Risk</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - AI Goal (Blue) */}
            <div className="rounded-2xl border border-blue-500/25 bg-blue-950/15 p-6 space-y-4 flex flex-col">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/15">
                  <Brain size={16} className="text-blue-400" strokeWidth={2} />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-blue-400">
                  Horizon AI Hedefi
                </span>
              </div>
              <div className="flex-1 space-y-4">
                <p className="text-[15px] font-semibold text-blue-200 leading-relaxed">
                  Atıl nakdi yatırıma yönlendirmek ve DSO-DPO makasını daraltmak
                </p>
                <p className="text-3xl font-bold text-blue-400 tabular-nums tracking-tight">
                  %12 Artış
                </p>
                <p className="text-sm text-blue-300/80 leading-relaxed">
                  Özkaynak verimliliğinde hedeflenen iyileşme
                </p>
              </div>
              <div className="flex items-center gap-1.5 pt-1">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[11px] text-blue-400/70 font-medium">
                  Enterprise AI Motorları Hazır
                </span>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* ═══ KOBİ Dashboard (Original) ═══ */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Left — Risk Signal (Red) */}
          <div className="rounded-2xl border border-red-500/25 bg-red-950/20 p-6 space-y-4 flex flex-col">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/15">
                <ShieldAlert size={16} className="text-red-400" strokeWidth={2} />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-red-400">
                Tespit Edilen Nakit Açığı Sinyali
              </span>
            </div>
            <div className="flex-1 space-y-3">
              <p className="text-[15px] font-semibold text-red-300 leading-relaxed">
                Gelecek Ay Maaş Ödemelerinde
              </p>
              <p className="text-3xl font-bold text-red-400 tabular-nums tracking-tight">
                120.000 TL
              </p>
              <p className="text-sm text-red-300/80 leading-relaxed">
                Açık Riski Tespit Edildi
              </p>
            </div>
            <div className="flex items-center gap-1.5 pt-1">
              <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[11px] text-red-400/70 font-medium">
                Kritik Uyarı
              </span>
            </div>
          </div>

          {/* Right — AI Goal (Blue/White) */}
          <div className="rounded-2xl border border-blue-500/25 bg-blue-950/15 p-6 space-y-4 flex flex-col">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/15">
                <Brain size={16} className="text-blue-400" strokeWidth={2} />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-blue-400">
                Horizon AI Hedefi
              </span>
            </div>
            <div className="flex-1 space-y-3">
              <p className="text-[15px] font-semibold text-blue-200 leading-relaxed">
                DSO&apos;yu 15 gün öne çekmek
              </p>
              <p className="text-3xl font-bold text-blue-400 tabular-nums tracking-tight">
                %85 İsabet
              </p>
              <p className="text-sm text-blue-300/80 leading-relaxed">
                ile riski tahmin etmek
              </p>
            </div>
            <div className="flex items-center gap-1.5 pt-1">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[11px] text-blue-400/70 font-medium">
                AI Motorları Hazır
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Launch Button (Shared) */}
      <button
        onClick={onLaunch}
        className="group relative w-full flex items-center justify-center gap-3 py-4 px-8
                   rounded-2xl text-base font-bold text-zinc-950 bg-white
                   shadow-[0_0_40px_rgba(255,255,255,0.15)]
                   hover:shadow-[0_0_60px_rgba(255,255,255,0.25)]
                   hover:bg-zinc-100
                   active:scale-[0.98]
                   transition-all duration-300 cursor-pointer"
      >
        {/* Glow background */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-white/0 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none" />
        <Sparkles size={18} className="text-zinc-950 relative z-10" strokeWidth={2} />
        <span className="relative z-10">Narsent Nexus&apos;u Başlat</span>
        <Rocket size={18} className="text-zinc-950 relative z-10" strokeWidth={2} />
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN WIZARD
   ═══════════════════════════════════════════════════════════ */
export default function OnboardingWizard() {
  const TOTAL_STEPS = 5;
  const [step, setStep] = useState(1);
  const setSegmentMode = useGlobalStore((state) => state.setSegmentMode);

  /* — Step 1 state — */
  const [selectedERP, setSelectedERP] = useState<ERPOption>(null);
  const [selectedSector, setSelectedSector] = useState<SectorOption>(null);

  /* — Unified form values (covers KOBİ, Enterprise and Enerji) — */
  const [formValues, setFormValues] = useState<Record<string, string>>({});

  const handleFormChange = (field: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleLaunch = () => {
    console.log("🚀 Narsent Nexus Başlatıldı!", {
      erp: selectedERP,
      sector: selectedSector,
      formValues,
    });
    setSegmentMode("b2b");
  };

  /* Navigation guard — KOBİ, Kurumsal, Enerji or Telekom unlocks step 1 */
  const canGoNext = (): boolean => {
    switch (step) {
      case 1:
        return selectedERP !== null && (selectedSector === "kobi" || selectedSector === "kurumsal" || selectedSector === "enerji" || selectedSector === "telekom" || selectedSector === "egitim");
      case 2:
        return true;
      case 3:
        return true;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const next = () => {
    if (canGoNext() && step < TOTAL_STEPS) setStep((s) => s + 1);
  };
  const back = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div
        className="relative rounded-2xl border border-zinc-800 bg-zinc-950/80 backdrop-blur-2xl
                    shadow-[0_0_80px_rgba(0,0,0,0.5)] p-6 sm:p-10 overflow-hidden"
      >
        {/* Subtle ambient glow */}
        <div className="pointer-events-none absolute -top-48 -right-48 h-96 w-96 rounded-full bg-blue-600/[0.03] blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-48 -left-48 h-96 w-96 rounded-full bg-indigo-600/[0.02] blur-[120px]" />

        {/* Step indicator */}
        <StepIndicator current={step} total={TOTAL_STEPS} />

        {/* Content */}
        <div key={step} className="animate-fadeIn min-h-[400px]">
          {step === 1 && (
            <Step1
              erp={selectedERP}
              onErp={setSelectedERP}
              sector={selectedSector}
              onSector={setSelectedSector}
            />
          )}
          {step === 2 && (
            <Step2
              sector={selectedSector}
              values={formValues}
              onChange={handleFormChange}
            />
          )}
          {step === 3 && <Step3 sector={selectedSector} />}
          {step === 4 && (
            <Step4
              sector={selectedSector}
              values={formValues}
              onChange={handleFormChange}
            />
          )}
          {step === 5 && <Step5 sector={selectedSector} onLaunch={handleLaunch} />}
        </div>

        {/* Navigation bar */}
        {step < TOTAL_STEPS && (
          <div className="mt-10 flex items-center justify-between">
            {step > 1 ? (
              <button
                onClick={back}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium
                           text-zinc-300 hover:text-zinc-50 border border-zinc-800
                           hover:border-zinc-600 transition-all duration-200 cursor-pointer"
              >
                <ArrowLeft size={15} />
                Geri
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={next}
              disabled={!canGoNext()}
              className={`
                flex items-center gap-2 px-7 py-2.5 rounded-xl text-sm font-semibold
                transition-all duration-200
                ${canGoNext()
                  ? "bg-white text-zinc-950 hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.1)] cursor-pointer"
                  : "bg-zinc-900 text-zinc-600 cursor-not-allowed border border-zinc-800"
                }
              `}
            >
              İleri
              <ArrowRight size={15} />
            </button>
          </div>
        )}

        {/* Step 5 has its own back button */}
        {step === TOTAL_STEPS && (
          <div className="mt-6 flex justify-start">
            <button
              onClick={back}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium
                         text-zinc-300 hover:text-zinc-50 border border-zinc-800
                         hover:border-zinc-600 transition-all duration-200 cursor-pointer"
            >
              <ArrowLeft size={15} />
              Geri
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

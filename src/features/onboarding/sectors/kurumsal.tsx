"use client";

import React from "react";
import {
  TrendingUp,
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
  Store,
  CreditCard,
  HandCoins,
  Percent,
  Truck,
  Boxes,
  RefreshCw,
  Building2,
} from "lucide-react";

import { InputField, SelectField, SectionHeader } from "../shared";
import type { SectorFormProps, Step3Data } from "../types";
import { num, fmtTL, clamp } from "./insightHelpers";

/* ── Step 2 ─────────────────────────────────────────────────────── */

export const Step2: React.FC<SectorFormProps> = ({ values, onChange }) => (
  <div className="space-y-6">
    <div className="text-center space-y-2">
      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-50 tracking-tight">
        Konsolide Ölçek ve Müşteri Portföyü
      </h2>
      <p className="text-sm text-zinc-300 max-w-lg mx-auto leading-relaxed">
        Grup bazlı konsolide verilerinizi girin. Horizon, holding yapınıza özel analiz üretecektir.
      </p>
    </div>

    <SectionHeader icon={<Building2 size={13} strokeWidth={1.5} />} label="Konsolide Ölçek" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField label="Yıllık Konsolide Ciro (TL)" icon={<Banknote size={16} strokeWidth={1.5} />} value={values.entCiro ?? ""} onChange={(v) => onChange("entCiro", v)} placeholder="Örn: 500000000" suffix="TL" />
      <InputField label="Grup Şirketi / Aktif Şube Sayısı" icon={<Building2 size={16} strokeWidth={1.5} />} value={values.entSube ?? ""} onChange={(v) => onChange("entSube", v)} placeholder="Örn: 12" suffix="Şirket" />
    </div>

    <SectionHeader icon={<Store size={13} strokeWidth={1.5} />} label="Bayi & Müşteri Portföyü" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField label="Aktif Ticari Müşteri / Bayi Sayısı" icon={<Store size={16} strokeWidth={1.5} />} value={values.entBayi ?? ""} onChange={(v) => onChange("entBayi", v)} placeholder="Örn: 1200" suffix="Bayi" />
      <InputField label="Riskli Bayi / Müşteri Segmenti Oranı (%)" icon={<ShieldAlert size={16} strokeWidth={1.5} />} value={values.entRiskliBayi ?? ""} onChange={(v) => onChange("entRiskliBayi", v)} placeholder="Örn: 12" suffix="%" />
    </div>

    <SectionHeader icon={<Target size={13} strokeWidth={1.5} />} label="Tahsilat Koşulları" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField label="Hedeflenen Ortalama Tahsilat Vadesi (DSO Target - Gün)" icon={<Target size={16} strokeWidth={1.5} />} value={values.entDso ?? ""} onChange={(v) => onChange("entDso", v)} placeholder="Örn: 45" suffix="Gün" />
      <InputField label="Ortalama Tahsilat Vadesi / DSO Target (Sektörel standart vade - Gün)" icon={<CalendarClock size={16} strokeWidth={1.5} />} value={values.entSektorelVade ?? ""} onChange={(v) => onChange("entSektorelVade", v)} placeholder="Örn: 55" suffix="Gün" />
      <InputField label="Tahsilat Mix'i (Örn: %60 DBS, %40 Açık Hesap)" icon={<Percent size={16} strokeWidth={1.5} />} value={values.entTahsilatMix ?? ""} onChange={(v) => onChange("entTahsilatMix", v)} placeholder="Örn: 60" suffix="% DBS" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <SelectField label="Dinamik İskonto Kullanımı" icon={<TrendingUp size={16} strokeWidth={1.5} />} value={values.entIskonto ?? ""} onChange={(v) => onChange("entIskonto", v)} placeholder="Durum seçin" options={[{ value: "aktif", label: "Aktif" }, { value: "pasif", label: "Pasif" }]} />
    </div>
  </div>
);

/* ── Step 3 — dynamic insights from Step 2 inputs ──────────────── */

export function computeStep3(values: Record<string, string>): Step3Data {
  const entCiro = num(values, "entCiro", 500_000_000);
  const entBayi = num(values, "entBayi", 1200);
  const entRiskliBayi = num(values, "entRiskliBayi", 12);
  const entDso = num(values, "entDso", 45);
  const entSektorelVade = num(values, "entSektorelVade", 55);

  const yogunlasma = clamp(Math.round(entRiskliBayi * 2 + 2000 / entBayi), 10, 70);
  const ihtilafli = entCiro * (entRiskliBayi / 100) * 0.35;
  const sapma = clamp(Math.round(entSektorelVade - entDso + 15), 5, 40);

  return {
    title: "Narsent Konsolide Risk Analizi",
    subtitle: "Grup bazlı ERP verilerinizden otomatik hesaplanan konsolide risk tespiti. Bu veriler salt okunurdur.",
    badge: "Konsolide ERP Verisi",
    findings: [
      {
        label: "Bayi Yoğunlaşma Riski",
        value: `%${yogunlasma}`,
        detail: `İlk 20 bayi cironun %${yogunlasma}'${yogunlasma > 10 ? "ini" : "ini"} oluşturuyor`,
        icon: <AlertTriangle size={18} strokeWidth={1.5} />,
      },
      {
        label: "İhtilaflı / Gecikmiş Fatura Hacmi",
        value: fmtTL(ihtilafli),
        detail: "Aktif ihtilaflı ve vadesi geçmiş toplam fatura tutarı",
        icon: <ShieldAlert size={18} strokeWidth={1.5} />,
      },
      {
        label: "Sektörel Sapma: Ortalama Tahsilat Gecikmesi",
        value: `+${sapma} Gün`,
        detail: `Sektör ortalamasının ${sapma} gün üzerinde tahsilat süresi`,
        icon: <Clock size={18} strokeWidth={1.5} />,
      },
    ],
  };
}

/* ── Step 4 ─────────────────────────────────────────────────────── */

export const Step4: React.FC<SectorFormProps> = ({ values, onChange }) => (
  <div className="space-y-6">
    <div className="text-center space-y-2">
      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-50 tracking-tight">
        Grup Likiditesi ve Tedarik Zinciri
      </h2>
      <p className="text-sm text-zinc-300 max-w-lg mx-auto leading-relaxed">
        Konsolide gider yapınızı, tedarik zincirinizi ve finansman imkanlarınızı belirleyin.
      </p>
    </div>

    <SectionHeader icon={<Truck size={13} strokeWidth={1.5} />} label="Tedarik Zinciri" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField label="Stratejik Tedarikçi Sayısı" icon={<Store size={16} strokeWidth={1.5} />} value={values.entTedarikci ?? ""} onChange={(v) => onChange("entTedarikci", v)} placeholder="Örn: 85" suffix="Tedarikçi" />
      <InputField label="Tedarikçi Ödeme Vadesi (DPO - Gün)" icon={<HandCoins size={16} strokeWidth={1.5} />} value={values.entDpo ?? ""} onChange={(v) => onChange("entDpo", v)} placeholder="Örn: 60" suffix="Gün" />
    </div>

    <SectionHeader icon={<BarChart3 size={13} strokeWidth={1.5} />} label="Konsolide Giderler" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField label="Konsolide Aylık Personel ve OpEx Gideri (TL)" icon={<Wallet size={16} strokeWidth={1.5} />} value={values.entOpex ?? ""} onChange={(v) => onChange("entOpex", v)} placeholder="Örn: 18000000" suffix="TL" />
      <InputField label="Aylık Banka Kredisi ve Tahvil Ödemeleri (TL)" icon={<CreditCard size={16} strokeWidth={1.5} />} value={values.entKrediOdeme ?? ""} onChange={(v) => onChange("entKrediOdeme", v)} placeholder="Örn: 8500000" suffix="TL" />
    </div>

    <SectionHeader icon={<Boxes size={13} strokeWidth={1.5} />} label="Stok & Varlık Yapısı" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField label="Konsolide Toplam Stok / Atıl Varlık Değeri (TL)" icon={<Package size={16} strokeWidth={1.5} />} value={values.entStok ?? ""} onChange={(v) => onChange("entStok", v)} placeholder="Örn: 120000000" suffix="TL" />
      <InputField label="Konsolide Stok Devir Hızı (Gün)" icon={<RefreshCw size={16} strokeWidth={1.5} />} value={values.entStokDevir ?? ""} onChange={(v) => onChange("entStokDevir", v)} placeholder="Örn: 42" suffix="Gün" />
    </div>

    <SectionHeader icon={<Landmark size={13} strokeWidth={1.5} />} label="Nakit & Finansman" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField label="Konsolide Banka Mevcudu (Hazır Nakit - TL)" icon={<Landmark size={16} strokeWidth={1.5} />} value={values.entNakit ?? ""} onChange={(v) => onChange("entNakit", v)} placeholder="Örn: 45000000" suffix="TL" />
      <InputField label="Kullanılabilir Revolving / Hazır Kredi Limitleri (TL)" icon={<CreditCard size={16} strokeWidth={1.5} />} value={values.entKredi ?? ""} onChange={(v) => onChange("entKredi", v)} placeholder="Örn: 75000000" suffix="TL" />
    </div>
  </div>
);

/* ── Step 5 — dynamic dashboard from Step 2+4 inputs ───────────── */

export const Step5Dashboard: React.FC<{ values: Record<string, string> }> = ({ values }) => {
  const entCiro = num(values, "entCiro", 500_000_000);
  const entNakit = num(values, "entNakit", 45_000_000);
  const entRiskliBayi = num(values, "entRiskliBayi", 12);
  const entSube = num(values, "entSube", 12);

  const atilNakit = entNakit * 0.55;
  const bayiRisk = entCiro * (entRiskliBayi / 100) * 0.3;
  const verimlilikArtis = clamp(Math.round(8 + entSube * 0.5), 8, 20);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-4">
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
            {entSube} farklı banka hesabında toplam
          </p>
          <p className="text-2xl font-bold text-red-400 tabular-nums tracking-tight">
            {fmtTL(atilNakit)}
          </p>
          <p className="text-[13px] text-red-300/70 leading-relaxed">Atıl Nakit Tespit Edildi</p>
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[11px] text-red-400/70 font-medium">Kritik Uyarı</span>
          </div>
        </div>

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
            Riskli bayilerde gözlemlenen %{entRiskliBayi} yavaşlama
          </p>
          <p className="text-2xl font-bold text-red-400 tabular-nums tracking-tight">
            {fmtTL(bayiRisk)} Risk
          </p>
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[11px] text-red-400/70 font-medium">Yüksek Risk</span>
          </div>
        </div>
      </div>

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
            %{verimlilikArtis} Artış
          </p>
          <p className="text-sm text-blue-300/80 leading-relaxed">
            Özkaynak verimliliğinde hedeflenen iyileşme
          </p>
        </div>
        <div className="flex items-center gap-1.5 pt-1">
          <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[11px] text-blue-400/70 font-medium">Enterprise AI Motorları Hazır</span>
        </div>
      </div>
    </div>
  );
};

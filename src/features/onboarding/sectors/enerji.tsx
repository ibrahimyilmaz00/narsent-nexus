"use client";

import React from "react";
import {
  CalendarClock,
  AlertTriangle,
  Clock,
  Banknote,
  BarChart3,
  Wallet,
  Landmark,
  ShieldAlert,
  Brain,
  CreditCard,
  Percent,
  TriangleAlert,
  Flame,
  Zap,
  Gauge,
  Shield,
  Factory,
  Users,
} from "lucide-react";

import { InputField, SelectField, SectionHeader } from "../shared";
import type { SectorFormProps, Step3Data } from "../types";
import { num, fmtTL, clamp } from "./insightHelpers";

/* ── Step 2 ─────────────────────────────────────────────────────── */

export const Step2: React.FC<SectorFormProps> = ({ values, onChange }) => (
  <div className="space-y-6">
    <div className="text-center space-y-2">
      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-50 tracking-tight">
        Ticari Abone Portföyü ve Satış Koşulları
      </h2>
      <p className="text-sm text-zinc-300 max-w-lg mx-auto leading-relaxed">
        Şebeke ölçeğinizi ve ticari abone portföyünüzü tanımlayın. Horizon, enerji piyasasına özel analiz üretecektir.
      </p>
    </div>

    <SectionHeader icon={<Zap size={13} strokeWidth={1.5} />} label="Hizmet & Dağıtım Hacmi" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <SelectField label="Hizmet Türü" icon={<Flame size={16} strokeWidth={1.5} />} value={values.enHizmetTuru ?? ""} onChange={(v) => onChange("enHizmetTuru", v)} placeholder="Hizmet türü seçin" options={[{ value: "elektrik", label: "Elektrik Dağıtım" }, { value: "dogalgaz", label: "Doğalgaz Dağıtım" }, { value: "ikisi", label: "İkisi Birlikte" }]} />
      <InputField label="Yıllık Toplam Dağıtım Hacmi (MWh / m³)" icon={<Gauge size={16} strokeWidth={1.5} />} value={values.enDagitimHacmi ?? ""} onChange={(v) => onChange("enDagitimHacmi", v)} placeholder="Örn: 5000000" suffix="MWh" />
    </div>

    <SectionHeader icon={<Users size={13} strokeWidth={1.5} />} label="Abone Portföyü" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField label="Aktif Ticari / Sanayi (B2B) Abone Sayısı" icon={<Factory size={16} strokeWidth={1.5} />} value={values.enAboneSayisi ?? ""} onChange={(v) => onChange("enAboneSayisi", v)} placeholder="Örn: 2400" suffix="Abone" />
      <InputField label="Resmi Ödeme Vadesi (Gün)" icon={<CalendarClock size={16} strokeWidth={1.5} />} value={values.enOdemeVadesi ?? ""} onChange={(v) => onChange("enOdemeVadesi", v)} placeholder="Örn: 30" suffix="Gün" />
    </div>

    <SectionHeader icon={<Shield size={13} strokeWidth={1.5} />} label="Tahsilat & Güvence" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField label="Teminatlı / Açık Hesap Oranı (%)" icon={<Percent size={16} strokeWidth={1.5} />} value={values.enTeminatOran ?? ""} onChange={(v) => onChange("enTeminatOran", v)} placeholder="Örn: 70 (Teminatlı %)" suffix="%" />
      <SelectField label="En Çok Kullanılan Tahsilat Kanalı" icon={<CreditCard size={16} strokeWidth={1.5} />} value={values.enTahsilatKanal ?? ""} onChange={(v) => onChange("enTahsilatKanal", v)} placeholder="Kanal seçin" options={[{ value: "dbs", label: "DBS" }, { value: "otomatik", label: "Otomatik Ödeme" }, { value: "gise_eft", label: "Gişe / EFT" }]} />
      <InputField label="Kayıp-Kaçak Oranı Hedefi (%)" icon={<TriangleAlert size={16} strokeWidth={1.5} />} value={values.enKayipKacak ?? ""} onChange={(v) => onChange("enKayipKacak", v)} placeholder="Örn: 8" suffix="%" />
    </div>
  </div>
);

/* ── Step 3 — dynamic insights from Step 2 inputs ──────────────── */

export function computeStep3(values: Record<string, string>): Step3Data {
  const enAboneSayisi = num(values, "enAboneSayisi", 2400);
  const enOdemeVadesi = num(values, "enOdemeVadesi", 30);
  const enTeminatOran = num(values, "enTeminatOran", 70);
  const enKayipKacak = num(values, "enKayipKacak", 8);

  const yogunlasma = clamp(Math.round(3500 / enAboneSayisi + (100 - enTeminatOran) * 0.2), 10, 70);
  const negatifMakas = clamp(Math.round(enOdemeVadesi * 0.4), 5, 30);
  const marginCall = clamp(Math.round(100 - enTeminatOran + enKayipKacak * 2), 40, 95);

  return {
    title: "Narsent Enerji & Piyasa Risk Analizi",
    subtitle: "Enerji piyasası ve şebeke verilerinizden otomatik hesaplanan risk tespiti. Bu veriler salt okunurdur.",
    badge: "Enerji Piyasa Verisi",
    findings: [
      {
        label: "Abone Yoğunlaşma Riski",
        value: `%${yogunlasma}`,
        detail: `Cironun %${yogunlasma}'i sadece ${clamp(Math.round(enAboneSayisi * 0.002), 3, 15)} sanayi abonesinde toplanmış`,
        icon: <AlertTriangle size={18} strokeWidth={1.5} />,
      },
      {
        label: "Piyasa Ödeme Sapması (Negatif Makas)",
        value: `-${negatifMakas} Gün`,
        detail: `Müşteri tahsilatından ${negatifMakas} gün önce EPİAŞ ödemesi yapılıyor`,
        icon: <Clock size={18} strokeWidth={1.5} />,
      },
      {
        label: "Margin Call (Teminat) Riski",
        value: `%${marginCall}`,
        detail: "Mevcut teminatlar yaklaşan fatura yükünü karşılamıyor",
        icon: <ShieldAlert size={18} strokeWidth={1.5} />,
      },
    ],
  };
}

/* ── Step 4 ─────────────────────────────────────────────────────── */

export const Step4: React.FC<SectorFormProps> = ({ values, onChange }) => (
  <div className="space-y-6">
    <div className="text-center space-y-2">
      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-50 tracking-tight">
        Piyasa Takas (EPİAŞ) ve Likidite Pozisyonu
      </h2>
      <p className="text-sm text-zinc-300 max-w-lg mx-auto leading-relaxed">
        Enerji piyasası yükümlülüklerinizi ve likidite pozisyonunuzu tanımlayın.
      </p>
    </div>

    <SectionHeader icon={<Zap size={13} strokeWidth={1.5} />} label="Piyasa Yükümlülükleri" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField label="Aylık Piyasa Takas Hacmi (EPİAŞ / DGPYS - TL)" icon={<BarChart3 size={16} strokeWidth={1.5} />} value={values.enTakasHacmi ?? ""} onChange={(v) => onChange("enTakasHacmi", v)} placeholder="Örn: 85000000" suffix="TL" />
      <InputField label="Aylık Bakım, Altyapı ve Sistem Kullanım Bedeli (TL)" icon={<Wallet size={16} strokeWidth={1.5} />} value={values.enBakimBedeli ?? ""} onChange={(v) => onChange("enBakimBedeli", v)} placeholder="Örn: 12000000" suffix="TL" />
    </div>

    <SectionHeader icon={<Landmark size={13} strokeWidth={1.5} />} label="Nakit & Teminat" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField label="Kullanılabilir Hazır Nakit ve Serbest Limitler (TL)" icon={<Landmark size={16} strokeWidth={1.5} />} value={values.enHazirNakit ?? ""} onChange={(v) => onChange("enHazirNakit", v)} placeholder="Örn: 25000000" suffix="TL" />
      <InputField label="Bloke / Rehinli Teminatlar (EPİAŞ Teminatı - TL)" icon={<Shield size={16} strokeWidth={1.5} />} value={values.enBlokeTeminat ?? ""} onChange={(v) => onChange("enBlokeTeminat", v)} placeholder="Örn: 18000000" suffix="TL" />
    </div>

    <SectionHeader icon={<CreditCard size={13} strokeWidth={1.5} />} label="Finansman" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField label="Aylık Finansman Maliyetleri (Kredi taksitleri ve limit maliyetleri - TL)" icon={<CreditCard size={16} strokeWidth={1.5} />} value={values.enFinansmanMaliyet ?? ""} onChange={(v) => onChange("enFinansmanMaliyet", v)} placeholder="Örn: 5000000" suffix="TL" />
      <InputField label="Karşılıksız / Protesto Edilen Teminat Hacmi (TL)" icon={<TriangleAlert size={16} strokeWidth={1.5} />} value={values.enProtestoHacmi ?? ""} onChange={(v) => onChange("enProtestoHacmi", v)} placeholder="Örn: 3500000" suffix="TL" />
    </div>
  </div>
);

/* ── Step 5 — dynamic dashboard from Step 2+4 inputs ───────────── */

export const Step5Dashboard: React.FC<{ values: Record<string, string> }> = ({ values }) => {
  const enTakasHacmi = num(values, "enTakasHacmi", 85_000_000);
  const enHazirNakit = num(values, "enHazirNakit", 25_000_000);
  const enOdemeVadesi = num(values, "enOdemeVadesi", 30);
  const enAboneSayisi = num(values, "enAboneSayisi", 2400);

  const nakitAcigi = Math.max(enTakasHacmi - enHazirNakit * 0.6, enTakasHacmi * 0.1);
  const tahminGun = clamp(Math.round(enOdemeVadesi * 0.5), 7, 30);
  const aiIsabet = clamp(Math.round(75 + enAboneSayisi * 0.003), 78, 92);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            {fmtTL(nakitAcigi)}
          </p>
          <p className="text-sm text-red-300/80 leading-relaxed">
            EPİAŞ ödemesinde nakit açığı riski tespit edildi
          </p>
        </div>
        <div className="flex items-center gap-1.5 pt-1">
          <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[11px] text-red-400/70 font-medium">Kritik Uyarı</span>
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
        <div className="flex-1 space-y-3">
          <p className="text-[15px] font-semibold text-blue-200 leading-relaxed">
            Ticari abonelerin ödeme davranışlarını analiz edip nakit açığını {tahminGun} gün önceden tahmin etmek
          </p>
          <p className="text-3xl font-bold text-blue-400 tabular-nums tracking-tight">
            %{aiIsabet} İsabet
          </p>
          <p className="text-sm text-blue-300/80 leading-relaxed">
            ve Teminat Yeterliliğini sağlamak
          </p>
        </div>
        <div className="flex items-center gap-1.5 pt-1">
          <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[11px] text-blue-400/70 font-medium">Enerji AI Motorları Hazır</span>
        </div>
      </div>
    </div>
  );
};

"use client";

import React from "react";
import {
  TrendingUp,
  Users,
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
  GraduationCap,
  BookOpen,
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
        Öğrenci Portföyü ve Taksit Yapısı
      </h2>
      <p className="text-sm text-zinc-300 max-w-lg mx-auto leading-relaxed">
        Kayıt cirosunu, taksit yapınızı ve öğrenci portföyünüzü tanımlayın. Horizon, taksit risklerini ve drop-out sinyallerini analiz edecektir.
      </p>
    </div>

    <SectionHeader icon={<Building2 size={13} strokeWidth={1.5} />} label="Şube Bilgisi" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField label="Şube Sayısı (Tek şube veya franchise/zincir)" icon={<Building2 size={16} strokeWidth={1.5} />} value={values.edSubeSayisi ?? ""} onChange={(v) => onChange("edSubeSayisi", v)} placeholder="Örn: 3" suffix="Şube" />
    </div>

    <SectionHeader icon={<GraduationCap size={13} strokeWidth={1.5} />} label="Kayıt & Ciro" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField label="Yıllık Toplam Kayıt Ciro Hedefi (TL)" icon={<Banknote size={16} strokeWidth={1.5} />} value={values.edCiro ?? ""} onChange={(v) => onChange("edCiro", v)} placeholder="Örn: 8000000" suffix="TL" />
      <InputField label="Aktif Öğrenci / Danışan Sayısı" icon={<Users size={16} strokeWidth={1.5} />} value={values.edOgrenciSayisi ?? ""} onChange={(v) => onChange("edOgrenciSayisi", v)} placeholder="Örn: 1200" suffix="Öğrenci" />
    </div>

    <SectionHeader icon={<CalendarClock size={13} strokeWidth={1.5} />} label="Taksit Yapısı" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField label="Ortalama Taksit Sayısı (Ay)" icon={<CalendarClock size={16} strokeWidth={1.5} />} value={values.edTaksitSayisi ?? ""} onChange={(v) => onChange("edTaksitSayisi", v)} placeholder="Örn: 9" suffix="Ay" />
      <InputField label="Kayıt Anı Peşinat Oranı (%)" icon={<Percent size={16} strokeWidth={1.5} />} value={values.edPesinat ?? ""} onChange={(v) => onChange("edPesinat", v)} placeholder="Örn: 20" suffix="%" />
    </div>

    <SectionHeader icon={<BookOpen size={13} strokeWidth={1.5} />} label="Segment & Ödeme" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField label="B2C (Bireysel) / B2B (Kurumsal) Öğrenci Dağılımı" icon={<Users size={16} strokeWidth={1.5} />} value={values.edB2cOran ?? ""} onChange={(v) => onChange("edB2cOran", v)} placeholder="Örn: 80 (B2C %)" suffix="% B2C" />
      <SelectField label="En Çok Kullanılan Ödeme Kanalı" icon={<CreditCard size={16} strokeWidth={1.5} />} value={values.edOdemeKanal ?? ""} onChange={(v) => onChange("edOdemeKanal", v)} placeholder="Kanal seçin" options={[{ value: "kredi_karti", label: "Kredi Kartı / Mail-Order" }, { value: "senet", label: "Senet / Elden Taksit" }, { value: "pesin", label: "Peşin / Havale" }]} />
    </div>
  </div>
);

/* ── Step 3 — dynamic insights from Step 2 inputs ──────────────── */

export function computeStep3(values: Record<string, string>): Step3Data {
  const edCiro = num(values, "edCiro", 8_000_000);
  const edOgrenciSayisi = num(values, "edOgrenciSayisi", 1200);
  const edPesinat = num(values, "edPesinat", 20);
  const edTaksitSayisi = num(values, "edTaksitSayisi", 9);
  const edB2cOran = num(values, "edB2cOran", 80);

  const kronikGecikme = clamp(Math.round(25 - edPesinat * 0.3), 5, 35);
  const dropoutRisk = clamp(
    Math.round(edOgrenciSayisi * (edTaksitSayisi / 12) * (edB2cOran / 100) * 0.1),
    5,
    Math.round(edOgrenciSayisi * 0.15),
  );
  const vadesGecmis = edCiro * (1 - edPesinat / 100) * 0.06;

  return {
    title: "Narsent Tahsilat ve Drop-out (Terk) Analizi",
    subtitle: "Eğitim yönetim sistemi verilerinizden otomatik hesaplanan taksit ve terk riski tespiti. Bu veriler salt okunurdur.",
    badge: "Eğitim Yönetim Verisi",
    findings: [
      {
        label: "Taksit Gecikme Sinyali",
        value: `%${kronikGecikme} Kronik`,
        detail: `Elden taksitli (senetli) satışların %${kronikGecikme}'inde 20 günü aşan kronik gecikmeler var`,
        icon: <AlertTriangle size={18} strokeWidth={1.5} />,
      },
      {
        label: "Drop-out (Terk) Riski",
        value: `${dropoutRisk} Öğrenci`,
        detail: `Devamsızlık verileriyle eşleşen ${dropoutRisk} öğrencide kursu bırakma ve taksit iptali riski yüksek`,
        icon: <ShieldAlert size={18} strokeWidth={1.5} />,
      },
      {
        label: "Vadesi Geçmiş Tahsil Edilemeyen Taksit / Senet",
        value: fmtTL(vadesGecmis),
        detail: "Tahsil edilemeyen vadesi geçmiş taksit ve senet toplamı",
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
        Operasyonel Giderler ve Şube Verimliliği
      </h2>
      <p className="text-sm text-zinc-300 max-w-lg mx-auto leading-relaxed">
        Şube gider yapınızı ve nakit pozisyonunuzu tanımlayın.
      </p>
    </div>

    <SectionHeader icon={<Users size={13} strokeWidth={1.5} />} label="Personel & Kira" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField label="Aylık Eğitmen ve Personel Maaş Yükü (TL)" icon={<Wallet size={16} strokeWidth={1.5} />} value={values.edMaas ?? ""} onChange={(v) => onChange("edMaas", v)} placeholder="Örn: 450000" suffix="TL" />
      <InputField label="Kira ve Enerji Sabit Giderleri (TL)" icon={<Landmark size={16} strokeWidth={1.5} />} value={values.edKira ?? ""} onChange={(v) => onChange("edKira", v)} placeholder="Örn: 120000" suffix="TL" />
    </div>

    <SectionHeader icon={<TrendingUp size={13} strokeWidth={1.5} />} label="Pazarlama & Materyal" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField label="Aylık Pazarlama / Reklam Harcaması (TL)" icon={<TrendingUp size={16} strokeWidth={1.5} />} value={values.edPazarlama ?? ""} onChange={(v) => onChange("edPazarlama", v)} placeholder="Örn: 85000" suffix="TL" />
      <InputField label="Dış Hizmet ve Materyal (Kitap) Giderleri (TL)" icon={<BookOpen size={16} strokeWidth={1.5} />} value={values.edMateryal ?? ""} onChange={(v) => onChange("edMateryal", v)} placeholder="Örn: 35000" suffix="TL" />
    </div>

    <SectionHeader icon={<Landmark size={13} strokeWidth={1.5} />} label="Doluluk & Nakit" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField label="Şube / Sınıf Doluluk Oranı (%)" icon={<BarChart3 size={16} strokeWidth={1.5} />} value={values.edDoluluk ?? ""} onChange={(v) => onChange("edDoluluk", v)} placeholder="Örn: 72" suffix="%" />
      <InputField label="Mevcut Kasa ve Banka Hazır Nakit (TL)" icon={<Landmark size={16} strokeWidth={1.5} />} value={values.edNakit ?? ""} onChange={(v) => onChange("edNakit", v)} placeholder="Örn: 180000" suffix="TL" />
    </div>
  </div>
);

/* ── Step 5 — dynamic dashboard from Step 2+4 inputs ───────────── */

export const Step5Dashboard: React.FC<{ values: Record<string, string> }> = ({ values }) => {
  const edMaas = num(values, "edMaas", 450_000);
  const edKira = num(values, "edKira", 120_000);
  const edNakit = num(values, "edNakit", 180_000);
  const edOgrenciSayisi = num(values, "edOgrenciSayisi", 1200);

  const nakitAcigi = Math.max(edMaas + edKira - edNakit * 0.3, edMaas * 0.15);
  const aiIsabet = clamp(Math.round(85 + edOgrenciSayisi * 0.005), 88, 97);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            {fmtTL(nakitAcigi)}
          </p>
          <p className="text-sm text-red-300/80 leading-relaxed">
            nakit açığı riski tespit edildi
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
            Hangi öğrencinin taksitini aksatacağını önceden tahmin edip tahsilatı hızlandırmak
          </p>
          <p className="text-3xl font-bold text-blue-400 tabular-nums tracking-tight">
            %{aiIsabet} İsabet
          </p>
          <p className="text-sm text-blue-300/80 leading-relaxed">
            ile yaz dönemi nakit akışını güvenceye almak
          </p>
        </div>
        <div className="flex items-center gap-1.5 pt-1">
          <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[11px] text-blue-400/70 font-medium">Eğitim AI Motorları Hazır</span>
        </div>
      </div>
    </div>
  );
};

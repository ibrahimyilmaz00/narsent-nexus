"use client";

import React from "react";
import {
  TrendingUp,
  Users,
  CalendarClock,
  AlertTriangle,
  Clock,
  Banknote,
  Wallet,
  Package,
  Landmark,
  ShieldAlert,
  Brain,
  CreditCard,
  HandCoins,
  Receipt,
  UserPlus,
  Percent,
  Truck,
  Boxes,
  RefreshCw,
  TriangleAlert,
  BarChart3,
  Store,
} from "lucide-react";

import { InputField, SelectField, SectionHeader } from "../shared";
import type { SectorFormProps, Step3Data } from "../types";
import { num, fmtTL, clamp } from "./insightHelpers";

/* ── Step 2 ─────────────────────────────────────────────────────── */

export const Step2: React.FC<SectorFormProps> = ({ values, onChange }) => (
  <div className="space-y-6">
    <div className="text-center space-y-2">
      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-50 tracking-tight">
        Şirket, Satış ve Müşteri Portföyü
      </h2>
      <p className="text-sm text-zinc-300 max-w-lg mx-auto leading-relaxed">
        Tahsilat modellemesi ve nakit akışı projeksiyonu için şirket verilerinizi girin.
      </p>
    </div>

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

/* ── Step 3 — dynamic insights from Step 2 inputs ──────────────── */

export function computeStep3(values: Record<string, string>): Step3Data {
  const ciro = num(values, "ciro", 60_000_000);
  const musteriSayisi = num(values, "musteriSayisi", 85);
  const vade = num(values, "vade", 60);
  const pesinOran = num(values, "pesinOran", 30);

  const yogunlasma = clamp(Math.round(5000 / (musteriSayisi * (pesinOran / 100 + 0.5))), 10, 65);
  const gecikme = clamp(Math.round(vade * 0.3), 5, 45);
  const vadesGecmis = ciro * (1 - pesinOran / 100) * 0.08;

  return {
    title: "Narsent ERP Analizi",
    subtitle:
      "ERP verilerinizden otomatik olarak hesaplanan mevcut durum tespiti. Bu veriler salt okunurdur.",
    badge: "ERP Verisi",
    findings: [
      {
        label: "Müşteri Yoğunlaşma Riski",
        value: `%${yogunlasma}`,
        detail: `Cironun %${yogunlasma}'${yogunlasma > 10 ? "ı" : "i"} az sayıda müşteride toplanmış`,
        icon: <AlertTriangle size={18} strokeWidth={1.5} />,
      },
      {
        label: "Gerçekleşen Ortalama Gecikme",
        value: `+${gecikme} Gün`,
        detail: `Sözleşme vadesinin ortalama ${gecikme} gün üzerinde tahsilat`,
        icon: <Clock size={18} strokeWidth={1.5} />,
      },
      {
        label: "Vadesi Geçmiş Tahsil Edilemeyen Alacak",
        value: fmtTL(vadesGecmis),
        detail: "90 günü aşmış tahsil edilememiş toplam alacak",
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
        Tedarik, Operasyon ve Likidite
      </h2>
      <p className="text-sm text-zinc-300 max-w-lg mx-auto leading-relaxed">
        Nakit akışı simülasyonu için gider yapınızı, tedarik zincirinizi ve varlık dengenizi tanımlayın.
      </p>
    </div>

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

/* ── Step 5 — dynamic dashboard from Step 2+4 inputs ───────────── */

export const Step5Dashboard: React.FC<{ values: Record<string, string> }> = ({ values }) => {
  const opex = num(values, "opex", 850_000);
  const krediOdeme = num(values, "krediOdeme", 120_000);
  const nakit = num(values, "nakit", 600_000);
  const vade = num(values, "vade", 60);
  const musteriSayisi = num(values, "musteriSayisi", 85);
  const faturaSayisi = num(values, "faturaSayisi", 320);

  const nakitAcigi = Math.max(opex + krediOdeme - nakit * 0.5, opex * 0.1);
  const dsoKisaltma = clamp(Math.round(vade * 0.25), 5, 30);
  const aiIsabet = clamp(Math.round(70 + musteriSayisi * 0.1 + faturaSayisi * 0.02), 75, 95);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            {fmtTL(nakitAcigi)}
          </p>
          <p className="text-sm text-red-300/80 leading-relaxed">
            Açık Riski Tespit Edildi
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
            DSO&apos;yu {dsoKisaltma} gün öne çekmek
          </p>
          <p className="text-3xl font-bold text-blue-400 tabular-nums tracking-tight">
            %{aiIsabet} İsabet
          </p>
          <p className="text-sm text-blue-300/80 leading-relaxed">
            ile riski tahmin etmek
          </p>
        </div>
        <div className="flex items-center gap-1.5 pt-1">
          <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[11px] text-blue-400/70 font-medium">AI Motorları Hazır</span>
        </div>
      </div>
    </div>
  );
};

"use client";

import React from "react";
import {
  CalendarClock,
  AlertTriangle,
  Clock,
  Banknote,
  Landmark,
  ShieldAlert,
  Target,
  Brain,
  CreditCard,
  HandCoins,
  Building2,
  Zap,
  Shield,
  Wifi,
  Smartphone,
  Monitor,
  Users,
} from "lucide-react";

import { InputField, SelectField, SectionHeader } from "../shared";
import type { SectorFormProps, Step3Data } from "../types";

export const Step2: React.FC<SectorFormProps> = ({ values, onChange }) => (
  <div className="space-y-6">
    <div className="text-center space-y-2">
      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-50 tracking-tight">
        Kurumsal Abonelik (B2B) ve Tekrarlayan Gelir (MRR)
      </h2>
      <p className="text-sm text-zinc-300 max-w-lg mx-auto leading-relaxed">
        Telco gelir modelinizi ve kurumsal abone portföyünüzü tanımlayın. Horizon, churn ve tahsilat risklerini analiz edecektir.
      </p>
    </div>

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

export const step3: Step3Data = {
  title: "Narsent Telco Churn & Tahsilat Risk Analizi",
  subtitle:
    "Telco abone ve tahsilat verilerinizden otomatik hesaplanan churn ve risk tespiti. Bu veriler salt okunurdur.",
  badge: "Telco Abone Verisi",
  findings: [
    {
      label: "Riskli Konsantrasyon",
      value: "%20 Yavaşlama",
      detail:
        "Enterprise segmentindeki 12 ana hesapta ödeme hızı son 2 ayda %20 yavaşladı",
      icon: <AlertTriangle size={18} strokeWidth={1.5} />,
    },
    {
      label: "Churn (Müşteri Kaybı) Sinyali",
      value: "%75",
      detail:
        "Gecikme trendi, bu hesapların %75 ihtimalle rakip operatöre geçiş hazırlığında olduğunu gösteriyor",
      icon: <ShieldAlert size={18} strokeWidth={1.5} />,
    },
    {
      label: "İhtilaflı Bakiye (Data Aşımı & Tarife İtirazı)",
      value: "2.400.000 TL",
      detail: "Data aşımı ve tarife itirazı kaynaklı bekleyen tahsilat",
      icon: <Clock size={18} strokeWidth={1.5} />,
    },
  ],
};

export const Step4: React.FC<SectorFormProps> = ({ values, onChange }) => (
  <div className="space-y-6">
    <div className="text-center space-y-2">
      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-50 tracking-tight">
        Veri Merkezi, Altyapı ve Lisans Giderleri
      </h2>
      <p className="text-sm text-zinc-300 max-w-lg mx-auto leading-relaxed">
        Telco altyapı maliyetlerinizi ve likidite pozisyonunuzu tanımlayın.
      </p>
    </div>

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

export const Step5Dashboard: React.FC = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        <span className="text-[11px] text-blue-400/70 font-medium">Telco AI Motorları Hazır</span>
      </div>
    </div>
  </div>
);

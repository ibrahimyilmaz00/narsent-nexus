"use client";

import React from "react";
import {
  Server,
  Database,
  Cpu,
  Globe,
  Factory,
  Building2,
  Flame,
  Radio,
  GraduationCap,
  Mail,
  Briefcase,
  User,
} from "lucide-react";

import { SelectionCard, TextInputField, SectionHeader } from "../shared";
import type { ERPOption, SectorOption } from "../types";

export function Step1({
  erp,
  onErp,
  sector,
  onSector,
  email,
  onEmail,
  sirketAdi,
  onSirketAdi,
  rol,
  onRol,
}: {
  erp: ERPOption;
  onErp: (v: ERPOption) => void;
  sector: SectorOption;
  onSector: (v: SectorOption) => void;
  email: string;
  onEmail: (v: string) => void;
  sirketAdi: string;
  onSirketAdi: (v: string) => void;
  rol: string;
  onRol: (v: string) => void;
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
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-50 tracking-tight">
          Altyapınızı Tanımlayın
        </h2>
        <p className="text-sm text-zinc-300 max-w-lg mx-auto leading-relaxed">
          Horizon karar motoru, ERP sisteminize bağlanarak sektörel adaptörünüzü devreye alacaktır.
        </p>
      </div>

      <div className="space-y-4">
        <SectionHeader icon={<User size={13} strokeWidth={1.5} />} label="Firma Bilgileri" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInputField
            label="E-posta Adresi"
            icon={<Mail size={16} strokeWidth={1.5} />}
            value={email}
            onChange={onEmail}
            placeholder="ornek@sirket.com"
            type="email"
          />
          <TextInputField
            label="Şirket Adı"
            icon={<Briefcase size={16} strokeWidth={1.5} />}
            value={sirketAdi}
            onChange={onSirketAdi}
            placeholder="Şirket Adı A.Ş."
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInputField
            label="Rolünüz"
            icon={<User size={16} strokeWidth={1.5} />}
            value={rol}
            onChange={onRol}
            placeholder="CFO, Finans Müdürü, vb."
          />
        </div>
      </div>

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

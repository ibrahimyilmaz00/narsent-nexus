"use client";

import React, { useState } from "react";
import { Lightbulb, Activity, CheckCircle2, Circle, Clock, ShieldAlert, MessageSquare, Mail, Kanban } from "lucide-react";
import { useGlobalStore } from "../../../store/useGlobalStore";
import OmnichannelActionModal from "./OmnichannelActionModal";

export default function HorizonActionPanel() {
  const openActionModal = useGlobalStore((state) => state.openActionModal);
  const [distributionModalOpen, setDistributionModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6 w-full h-full">

      {/* ═══════════════════════════════════════
         Acil Eylem Komutu
         ═══════════════════════════════════════ */}
      <div className="flex flex-col rounded-2xl bg-zinc-900/80 border border-zinc-800 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Activity size={18} className="text-red-400" />
          <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-wide">
            Acil Aksiyon <span className="text-red-400">(BUGÜN)</span>
          </h3>
        </div>
        <p className="text-zinc-300 text-sm font-medium leading-relaxed">
          Hesap yöneticisini BUGÜN ara; 668 günlük gecikme ve 18.6M TL açık pozisyon gerekçesiyle acil görüşme talep et ve 3 taksitli yapılandırma (0 faiz, 30-60-90 gün) teklifini sun.
        </p>
        <button
          onClick={() => setDistributionModalOpen(true)}
          className="mt-4 w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors shadow-lg shadow-emerald-500/20 active:scale-[0.98] flex items-center justify-center gap-2"
        >
          🚀 Aksiyonu Başlat (ERP'ye İlet)
        </button>
      </div>

      {/* ═══════════════════════════════════════
         AI Finansal Rasyoneli (XAI)
         ═══════════════════════════════════════ */}
      <div>
        <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
          <ShieldAlert size={14} />
          AI Rasyoneli ve Kök Neden
        </h4>
        <p className="text-zinc-400 text-sm leading-relaxed font-medium bg-zinc-900/40 p-4 rounded-xl border border-zinc-800/50">
          Her hafta hareketsiz geçen süre <span className="text-red-400 font-bold">93.334 TL</span> finansman maliyeti yaratıyor. Asıl risk: 668 günlük gecikmiş hesap, 90 gün daha izlenirse batık kategorisine geçiş olasılığı <span className="text-zinc-200 font-bold">%62&apos;ye yükseliyor</span>; o noktada geri kazanım <span className="text-orange-400 font-bold">%15&apos;e düşer</span>.
        </p>
      </div>

      {/* ═══════════════════════════════════════
         İlişki ve Strateji Notu
         ═══════════════════════════════════════ */}
      <div className="flex items-start gap-3 bg-purple-500/10 border border-purple-500/30 p-4 rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.05)]">
        <div className="flex-shrink-0 mt-0.5">
          <Lightbulb size={20} className="text-purple-400" />
        </div>
        <p className="text-purple-400 text-sm font-medium leading-relaxed">
          Müşteri risk skoru düşük (0.241). Gecikmeye rağmen ilişki değeri yüksek; yapılandırma teklifini reddetse bile hukuki süreçten önce ikinci bir görüşme yapılmalıdır.
        </p>
      </div>

      {/* ═══════════════════════════════════════
         Uygulama Adımları (Stepper)
         ═══════════════════════════════════════ */}
      <div>
        <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">
          Beklenen İcra Süreci
        </h4>
        <div className="flex flex-col gap-3">
          {/* Adım 1 */}
          <div className="flex items-center justify-between bg-zinc-900/30 border border-zinc-800/50 p-3 rounded-xl transition-colors hover:bg-zinc-900/60">
            <div className="flex items-center gap-3">
              <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
              <span className="text-sm font-semibold text-zinc-200">Görüşme Talep Et <span className="text-zinc-500 font-normal">(Bugün)</span></span>
            </div>
            <button
              onClick={() => openActionModal('step_1')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-700/50 text-xs font-medium text-zinc-300 hover:bg-zinc-800 transition-colors"
            >
              <MessageSquare size={14} className="text-blue-400" />
              Ekibe Bildir
            </button>
          </div>
          {/* Adım 2 */}
          <div className="flex items-center justify-between bg-zinc-900/30 border border-zinc-800/50 p-3 rounded-xl transition-colors hover:bg-zinc-900/60">
            <div className="flex items-center gap-3">
              <Circle size={18} className="text-zinc-600 shrink-0" />
              <span className="text-sm font-medium text-zinc-400">Yapılandırma Teklifi Sun <span className="text-zinc-600 font-normal">(48 Saat İçinde)</span></span>
            </div>
            <button
              onClick={() => openActionModal('step_2')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-700/50 text-xs font-medium text-zinc-300 hover:bg-zinc-800 transition-colors"
            >
              <Mail size={14} className="text-purple-400" />
              Taslak Oluştur
            </button>
          </div>
          {/* Adım 3 */}
          <div className="flex items-center justify-between bg-zinc-900/30 border border-zinc-800/50 p-3 rounded-xl transition-colors hover:bg-zinc-900/60">
            <div className="flex items-center gap-3">
              <Circle size={18} className="text-zinc-600 shrink-0" />
              <span className="text-sm font-medium text-zinc-400">Taahhüt Yoksa Limiti Düşür <span className="text-zinc-600 font-normal">(7. Gün)</span></span>
            </div>
            <button
              onClick={() => openActionModal('step_3')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-700/50 text-xs font-medium text-zinc-300 hover:bg-zinc-800 transition-colors"
            >
              <Kanban size={14} className="text-blue-500" />
              Task Aç
            </button>
          </div>
          {/* Adım 4 */}
          <div className="flex items-center justify-between bg-zinc-900/30 border border-zinc-800/50 p-3 rounded-xl transition-colors hover:bg-zinc-900/60">
            <div className="flex items-center gap-3">
              <Circle size={18} className="text-zinc-600 shrink-0" />
              <span className="text-sm font-medium text-zinc-400">Yanıt Alınamazsa Hukuki Takip <span className="text-zinc-600 font-normal">(21. Gün)</span></span>
            </div>
            <button
              onClick={() => openActionModal('step_4')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-700/50 text-xs font-medium text-zinc-300 hover:bg-zinc-800 transition-colors"
            >
              <Kanban size={14} className="text-blue-500" />
              Task Aç
            </button>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
         Eskalasyon Zaman Çizelgesi (Timeline)
         ═══════════════════════════════════════ */}
      <div className="mt-2">
        <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Clock size={14} />
          Eskalasyon Matrisi
        </h4>
        <div className="border-l-2 border-zinc-800 ml-3 pl-4 flex flex-col gap-6 relative">

          {/* Timeline Node 1 */}
          <div className="relative">
            <div className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-zinc-600 outline outline-4 outline-zinc-950" />
            <span className="text-xs font-bold text-zinc-300 block mb-1">Gün 7</span>
            <p className="text-xs text-zinc-500 font-medium">Yazılı taahhüt yoksa kredi limiti %50 düşürülür.</p>
          </div>

          {/* Timeline Node 2 */}
          <div className="relative">
            <div className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-zinc-600 outline outline-4 outline-zinc-950" />
            <span className="text-xs font-bold text-zinc-300 block mb-1">Gün 14</span>
            <p className="text-xs text-zinc-500 font-medium">Ödeme yoksa noter ihtarı + sevkiyat durdurulur.</p>
          </div>

          {/* Timeline Node 3 */}
          <div className="relative">
            <div className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-zinc-600 outline outline-4 outline-zinc-950" />
            <span className="text-xs font-bold text-zinc-300 block mb-1">Gün 21</span>
            <p className="text-xs text-zinc-500 font-medium">Hukuki icra dosyası açılır; tüm siparişler bloklanır.</p>
          </div>

        </div>
      </div>

      {distributionModalOpen && (
        <OmnichannelActionModal
          isOpen={true}
          onClose={() => setDistributionModalOpen(false)}
          accountId="0095"
          accountName="Demirören Yapı A.Ş."
          exposure="18.666.794 TL"
          aiInstruction="Hesap yöneticisini BUGÜN ara; 668 günlük gecikme ve 18.6M TL açık pozisyon gerekçesiyle acil görüşme talep et ve 3 taksitli yapılandırma (0 faiz, 30-60-90 gün) teklifini sun."
        />
      )}

    </div>
  );
}

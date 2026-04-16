"use client";

import React from "react";
import { Check } from "lucide-react";

export default function ActiveOperationPanel() {
  return (
    <div className="space-y-6">
      {/* Ana Operasyon Paneli */}
      <div className="bg-blue-900/10 border border-blue-500/20 p-6 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
          <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider">Devam Eden Operasyon Süreci</h3>
        </div>

        <p className="text-sm text-zinc-300 leading-relaxed mb-6">
          Sistem (AI) tarafından önerilen aksiyon planı ilgili <span className="text-white font-bold">Operasyon Rolü</span> tarafından onaylanmış ve yürürlüğe alınmıştır. Süreç SLA limitleri dahilinde takip edilmektedir.
        </p>

        {/* Operasyon Durum Analizi */}
        <div className="space-y-3 mb-6">
          <div className="p-3 bg-zinc-950/50 border border-zinc-800 rounded-xl flex justify-between items-center">
            <span className="text-xs text-zinc-500 uppercase font-medium tracking-tight">Uygulanan Aksiyon (AI Onaylı)</span>
            <span className="text-sm font-bold text-blue-300">Yapılandırma Teklifi Sunumu</span>
          </div>
          <div className="p-3 bg-zinc-950/50 border border-zinc-800 rounded-xl flex justify-between items-center">
            <span className="text-xs text-zinc-500 uppercase font-medium tracking-tight">Hedeflenen Kurtarım</span>
            <span className="text-sm font-bold text-emerald-400">12.133.416 TL</span>
          </div>
          <div className="p-3 bg-blue-500/5 border border-blue-500/10 rounded-xl flex justify-between items-center">
            <span className="text-xs text-blue-500/70 uppercase font-medium tracking-tight">SLA / Aşama Durumu</span>
            <span className="text-sm font-bold text-blue-400">Gün 7 / Taahhüt Beklentisi</span>
          </div>
        </div>

        {/* YENİ: Eskalasyon Adımları (Task Checklist) */}
        <div className="mb-6">
          <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">Eskalasyon Adımları (Görevler)</h4>
          <div className="space-y-2">
            {/* Adım 1: Tamamlanmış (Mavi) */}
            <div className="flex items-center gap-3 p-2.5 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                <Check size={10} className="text-white" />
              </div>
              <span className="text-xs font-semibold text-blue-400">1. İlk Görüşme &amp; Yapılandırma Teklifi Sunumu</span>
            </div>

            {/* Adım 2: Bekleyen (Aktif Sıradaki Görev) */}
            <div className="flex items-center gap-3 p-2.5 border border-zinc-700 bg-zinc-800/50 rounded-lg">
              <div className="w-4 h-4 rounded-full border-2 border-zinc-500 shrink-0"></div>
              <span className="text-xs font-medium text-zinc-300">2. Yazılı Taahhüt Yoksa Kredi Limitini %50 Düşür</span>
            </div>

            {/* Adım 3: Bekleyen */}
            <div className="flex items-center gap-3 p-2.5 border border-zinc-800/50 bg-zinc-900/30 rounded-lg opacity-60">
              <div className="w-4 h-4 rounded-full border border-zinc-700 shrink-0"></div>
              <span className="text-xs font-medium text-zinc-500">3. İhtarname Gönderimi &amp; Sevkiyat Durdurma</span>
            </div>

            {/* Adım 4: Bekleyen */}
            <div className="flex items-center gap-3 p-2.5 border border-zinc-800/50 bg-zinc-900/30 rounded-lg opacity-60">
              <div className="w-4 h-4 rounded-full border border-zinc-700 shrink-0"></div>
              <span className="text-xs font-medium text-zinc-500">4. Hukuki İcra Dosyası Açılışı</span>
            </div>
          </div>
        </div>

        {/* YENİ: Tahsilat Bildirimi ve Operasyonel Butonlar */}
        <div className="p-4 border border-emerald-500/20 rounded-xl bg-emerald-500/5 mb-3">
          <span className="block text-[10px] font-bold text-emerald-500/70 uppercase tracking-widest mb-3">Tahsilat Bildirimi</span>

          {/* Kısmi Tahsilat Input Alanı */}
          <div className="flex gap-2 mb-3">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm font-medium">₺</span>
              <input
                type="text"
                placeholder="Kısmi tutar girin..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2 pl-8 pr-3 text-sm text-white focus:outline-none focus:border-emerald-500/50 placeholder:text-zinc-600"
              />
            </div>
            <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold rounded-lg border border-zinc-700 transition-colors">
              Kısmi Ekle
            </button>
          </div>

          {/* Tamamı Kapat Butonu */}
          <button className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-bold transition-all shadow-lg shadow-emerald-900/20 flex justify-center items-center gap-2">
            <Check size={16} /> Tümünü Tahsil Et &amp; Dosyayı Kapat
          </button>
        </div>

        {/* Eskale Et Butonu */}
        <button className="w-full py-3 bg-zinc-900 hover:bg-red-900/20 text-zinc-400 hover:text-red-400 rounded-xl text-sm font-bold transition-all border border-zinc-800 hover:border-red-500/30">
          Aksiyon Başarısız (Süreci Eskale Et)
        </button>
      </div>

      {/* Sistem Logları (İç Operasyon İzi) */}
      <div className="p-5 border border-zinc-800 rounded-2xl bg-zinc-900/20">
        <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Sistem İzi (Operasyon Kayıtları)</h4>
        <div className="space-y-4 border-l border-zinc-800 ml-1 pl-4">
          <div className="text-[11px] text-zinc-400">
            <span className="block text-zinc-300 font-semibold mb-1">14.04.2026 - 09:00</span>
            AI Motoru tarafından &quot;Yapılandırma Teklifi Sunumu&quot; aksiyonu önerildi.
          </div>
          <div className="text-[11px] text-blue-400/80">
            <span className="block text-blue-400 font-semibold mb-1">14.04.2026 - 11:30</span>
            İlgili Operasyon Rolü aksiyonu onayladı ve süreci başlattı. SLA sayacı aktif.
          </div>
        </div>
      </div>
    </div>
  );
}

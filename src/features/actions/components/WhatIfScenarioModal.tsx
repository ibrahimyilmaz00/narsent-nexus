"use client";

import React, { useState } from "react";
import { X, ArrowRight, TrendingUp, Info, CheckCircle2 } from "lucide-react";
import { useGlobalStore } from "../../../store/useGlobalStore";

export default function WhatIfScenarioModal() {
  const setWhatIfModalOpen = useGlobalStore((state) => state.setWhatIfModalOpen);

  // State for UI interactivity
  const [strategy, setStrategy] = useState("Yapılandırma Teklifi");
  const [term, setTerm] = useState(3);
  const [discount, setDiscount] = useState(-5);
  const [upfrontPct, setUpfrontPct] = useState(20);

  const baseAmount = 18666794;
  const baseProb = 42;

  // --- DİNAMİK HESAPLAMALAR ---
  const finalAmount = baseAmount * (1 + (discount / 100));
  const upfrontCash = finalAmount * (upfrontPct / 100);
  const monthlyInstallment = term > 0 ? (finalAmount - upfrontCash) / term : 0;

  // AI Olasılık Simülasyonu (Mock Logic)
  let simulatedProb = baseProb;
  if (strategy === "Yapılandırma Teklifi") simulatedProb += 15;
  else if (strategy === "Hukuki İcra") simulatedProb -= 10;
  else if (strategy === "Agresif Bekleyiş") simulatedProb -= 5;

  simulatedProb = simulatedProb + (Math.abs(discount) * 1.2) - (term * 0.8) + (upfrontPct * 0.3);
  const finalProb = Math.min(Math.max(Math.round(simulatedProb), 5), 99);

  return (
    <div className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-zinc-950 border border-zinc-800 rounded-3xl p-6 shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 shrink-0 border-b border-zinc-800/50 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-zinc-50 tracking-tight">Senaryo Motoru (What-If)</h2>
            <p className="text-sm font-medium text-zinc-500 mt-1">
              Demirören Yapı A.Ş. • 18.6M Açık Pozisyon
            </p>
          </div>
          <button 
            onClick={() => setWhatIfModalOpen(false)}
            className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 rounded-xl transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar min-h-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* ═══════════════════════════════════════
               SOL KOLON: Senaryo Parametreleri (INPUTS)
               ═══════════════════════════════════════ */}
            <div className="flex flex-col gap-8">
              
              {/* Aksiyon Stratejisi */}
              <div>
                <label className="text-sm font-semibold text-zinc-300 block mb-3 uppercase tracking-wider">
                  Aksiyon Stratejisi
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button 
                    onClick={() => setStrategy("Agresif Bekleyiş")}
                    className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                      strategy === "Agresif Bekleyiş" 
                        ? "bg-blue-500/10 border-blue-500/30 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.1)]" 
                        : "bg-zinc-900/50 border-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300"
                    }`}
                  >
                    Agresif Bekleyiş
                  </button>
                  <button 
                    onClick={() => setStrategy("Yapılandırma Teklifi")}
                    className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                      strategy === "Yapılandırma Teklifi" 
                        ? "bg-purple-500/10 border-purple-500/30 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.1)]" 
                        : "bg-zinc-900/50 border-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300"
                    }`}
                  >
                    Yapılandırma Teklifi
                  </button>
                  <button 
                    onClick={() => setStrategy("Hukuki İcra")}
                    className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                      strategy === "Hukuki İcra" 
                        ? "bg-red-500/10 border-red-500/30 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.1)]" 
                        : "bg-zinc-900/50 border-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300"
                    }`}
                  >
                    Hukuki İcra
                  </button>
                </div>
              </div>

              {/* Taksitlendirme Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
                    Vade YayıLımı
                  </label>
                  <span className="text-sm font-bold text-zinc-100 bg-zinc-800 px-3 py-1 rounded-lg">
                    {term} Ay
                  </span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="12" 
                  value={term}
                  onChange={(e) => setTerm(parseInt(e.target.value))}
                  className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <div className="flex justify-between text-xs text-zinc-500 font-medium mt-2">
                  <span>1 Ay</span>
                  <span>6 Ay</span>
                  <span>12 Ay</span>
                </div>
              </div>

              {/* İskonto / Ceza Oranı Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
                    Uygulanan İskonto / Ceza
                  </label>
                  <span className={`text-sm font-bold px-3 py-1 rounded-lg ${
                    discount < 0 ? "text-emerald-400 bg-emerald-500/10" : discount > 0 ? "text-red-400 bg-red-500/10" : "text-zinc-100 bg-zinc-800"
                  }`}>
                    {discount > 0 ? "+" : ""}{discount}%
                  </span>
                </div>
                <input 
                  type="range" 
                  min="-20" 
                  max="20" 
                  value={discount}
                  onChange={(e) => setDiscount(parseInt(e.target.value))}
                  className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-xs text-zinc-500 font-medium mt-2">
                  <span>-%20 (İskonto)</span>
                  <span>0%</span>
                  <span>+%20 (Gecikme Faizi)</span>
                </div>
              </div>

              {/* YENİ: Peşinat Oranı Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
                    Peşinat Oranı
                  </label>
                  <span className="text-sm font-bold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-lg">
                    %{upfrontPct}
                  </span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={upfrontPct}
                  onChange={(e) => setUpfrontPct(parseInt(e.target.value))}
                  className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-xs text-zinc-500 font-medium mt-2">
                  <span>%0</span>
                  <span>%50</span>
                  <span>%100</span>
                </div>
              </div>
            </div>

            {/* ═══════════════════════════════════════
               SAĞ KOLON: Simülasyon Sonuçları (OUTPUTS)
               ═══════════════════════════════════════ */}
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800/50 flex flex-col gap-6 shadow-inner relative overflow-hidden">
              {/* Background glowing effect */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-3xl rounded-full pointer-events-none" />

              <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-widest border-b border-zinc-800 pb-3">
                Simülasyon Çıktısı
              </h3>

              {/* Beklenen Tahsilat */}
              <div>
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">Yeni Beklenen Tahsilat</p>
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-extrabold text-emerald-400 tracking-tight">{new Intl.NumberFormat('tr-TR').format(Math.round(finalAmount))} TL</span>
                  <span className="text-lg font-bold text-zinc-600 line-through mb-1">{new Intl.NumberFormat('tr-TR').format(baseAmount)} TL</span>
                </div>
              </div>

              {/* Tahsilat Olasılığı */}
              <div className="bg-zinc-950/50 rounded-xl p-4 border border-zinc-800/60 mt-2">
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">ÖNGÖRÜLEN OLASILIK (SİMÜLASYON)</p>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-zinc-400">%{baseProb}</span>
                  <div className="flex items-center text-emerald-400 gap-2">
                    <ArrowRight size={20} className="opacity-50" />
                    <ArrowRight size={20} />
                    <ArrowRight size={20} className="opacity-50" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-extrabold text-emerald-400">%{finalProb}</span>
                    <TrendingUp size={24} className="text-emerald-400 animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Nakit Akışına Etkisi Alert */}
              <div className="mt-auto bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl flex items-start gap-4">
                <div className="mt-0.5">
                  <Info size={20} className="text-blue-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-blue-400 mb-1">Nakit Akışına Etkisi</h4>
                  <p className="text-sm font-medium text-blue-300/80 leading-relaxed">
                    Önümüzdeki hafta şirket kasasına <span className="text-blue-300 font-bold">+{new Intl.NumberFormat('tr-TR').format(Math.round(upfrontCash))} TL</span> (Peşinat) nakit girişi öngörülmektedir. Kalan bakiye aylık <span className="text-blue-300 font-bold">{new Intl.NumberFormat('tr-TR').format(Math.round(monthlyInstallment))} TL</span> taksitlerle <span className="text-blue-300 font-bold">{term}</span> ay içinde tahsil edilecektir.
                  </p>
                </div>
              </div>
              
            </div>

          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-zinc-800/50 shrink-0">
          <button 
            onClick={() => setWhatIfModalOpen(false)}
            className="px-6 py-3 rounded-xl font-semibold text-zinc-300 hover:bg-zinc-900 border border-zinc-700 hover:border-zinc-600 transition-colors"
          >
            İptal
          </button>
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all active:scale-[0.98]">
            <CheckCircle2 size={18} />
            Senaryoyu ERP'ye İşle / Teklif Gönder
          </button>
        </div>

      </div>
    </div>
  );
}

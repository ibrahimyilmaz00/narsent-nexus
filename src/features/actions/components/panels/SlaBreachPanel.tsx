"use client";

import React, { useState } from "react";

export default function SlaBreachPanel() {
  const [activeDelayedTask, setActiveDelayedTask] = useState(0);

  // Demirören Yapı A.Ş. (ID: 0095) Gerçek AI Eskalasyon Verileri
  const demirorenDelayedTasks = [
    {
      id: 0,
      title: "1. İlk Görüşme & Yapılandırma Teklifi Sunumu",
      isDelayed: true,
      instruction: "Hesap 0095 yöneticisi aranarak 18.666.794 TL açık pozisyon için acil görüşme talep edilmeli. 668 günlük gecikme sebebiyle sıfır faizli 3 taksitli yapılandırma teklifi resmi olarak iletilmeli.",
      impact: "İlk temas kurulmadığı için haftalık 93.334 TL finansman maliyeti doğuyor."
    },
    {
      id: 1,
      title: "2. Yazılı Taahhüt Yoksa Kredi Limitini %50 Düşür",
      isDelayed: false,
      instruction: "Gün 7: İlk temastan sonuç alınamaz ve yazılı protokol imzalanmazsa, ERP üzerinden Demirören Yapı A.Ş.'nin açık hesap kredi limiti manuel müdahale ile %50 oranında düşürülmeli.",
      impact: "Limit düşürülmezse risk büyümeye devam edecek."
    },
    {
      id: 2,
      title: "3. İhtarname Gönderimi & Sevkiyat Durdurma",
      isDelayed: false,
      instruction: "Gün 14: Ödeme planına uyulmaması durumunda noter kanalıyla resmi ihtarname çekilmeli ve depodan Demirören'e yapılan tüm aktif sevkiyatlar anında bloklanmalı.",
      impact: "Yasal faiz işletilemiyor ve ürün çıkışı riski sürüyor."
    },
    {
      id: 3,
      title: "4. Hukuki İcra Dosyası Açılışı",
      isDelayed: false,
      instruction: "Gün 21 (Final): Yanıt alınamaması halinde tüm siparişler iptal edilmeli ve tahsilat süreci için hukuki icra dosyası (Avukatlık Departmanı) resmi olarak başlatılmalı.",
      impact: "Tahsilat kabiliyeti %15'in altına düşme tehlikesi taşıyor."
    }
  ];

  return (
    <div className="space-y-6">

      {/* SABİT ALARM KUTUSU */}
      <div className="bg-amber-900/10 border border-amber-500/30 p-6 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></div>
          <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">İç Operasyon Gecikmesi (SLA İhlali)</h3>
        </div>
        <p className="text-sm text-zinc-300 leading-relaxed mb-4">
          Bu iş emri için atanan <span className="text-white font-bold">Operasyon Rolü</span> SLA sürelerini ihlal etmiştir. Sistem süreci denetim kuyruğuna almıştır.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-zinc-950/50 border border-zinc-800 rounded-xl flex flex-col justify-center">
            <span className="text-xs text-zinc-500 uppercase font-medium tracking-tight mb-1">Gecikme Süresi</span>
            <span className="text-sm font-bold text-amber-500">SLA +12 Saat</span>
          </div>
          <div className="p-3 bg-red-500/5 border border-red-500/10 rounded-xl flex flex-col justify-center">
            <span className="text-xs text-red-500/70 uppercase font-medium tracking-tight mb-1">Risk Maliyeti</span>
            <span className="text-sm font-bold text-red-400">12.450 TL / Hafta</span>
          </div>
        </div>
      </div>

      {/* İNTERAKTİF TASK LİSTESİ */}
      <div className="bg-zinc-950/50 p-5 rounded-2xl border border-zinc-800">
        <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Geciken / Bekleyen İşlem Adımları</h4>
        <div className="space-y-2 mb-6">
          {demirorenDelayedTasks.map((task, index) => (
            <div
              key={task.id}
              onClick={() => setActiveDelayedTask(index)}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${activeDelayedTask === index
                ? (task.isDelayed ? 'bg-amber-500/10 border border-amber-500/30' : 'bg-zinc-800/80 border border-zinc-600')
                : 'border border-zinc-800/50 bg-zinc-900/30 opacity-60 hover:opacity-100 hover:border-zinc-700'
                }`}
            >
              <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${activeDelayedTask === index ? (task.isDelayed ? 'border-2 border-amber-500' : 'border-2 border-zinc-400') : 'border border-zinc-600'}`}>
                {activeDelayedTask === index && <div className={`w-1.5 h-1.5 rounded-full ${task.isDelayed ? 'bg-amber-500' : 'bg-zinc-400'}`}></div>}
              </div>
              <span className={`text-xs font-semibold ${activeDelayedTask === index ? (task.isDelayed ? 'text-amber-400' : 'text-zinc-200') : 'text-zinc-400'}`}>
                {task.title} {task.isDelayed && <span className="text-[10px] bg-amber-500/20 text-amber-500 px-1.5 py-0.5 rounded ml-2">GECİKTİ</span>}
              </span>
            </div>
          ))}
        </div>

        {/* TIKLANAN TASKIN DETAYLARI */}
        <div className="p-4 border border-zinc-700/50 rounded-xl bg-zinc-900/50">
          <h5 className="text-[10px] font-bold text-emerald-500/80 uppercase tracking-widest mb-2 flex items-center gap-2">
            AI Sistem Talimatı
          </h5>
          <p className="text-sm text-zinc-300 leading-relaxed font-medium mb-4">
            {demirorenDelayedTasks[activeDelayedTask].instruction}
          </p>
          <div className="flex justify-between items-center pt-3 border-t border-zinc-800/80">
            <span className="text-xs text-zinc-500 font-medium">Sistem Etkisi:</span>
            <span className="text-xs font-bold text-red-400">{demirorenDelayedTasks[activeDelayedTask].impact}</span>
          </div>
        </div>
      </div>

    </div>
  );
}

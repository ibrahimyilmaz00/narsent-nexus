"use client";

import React, { useState } from "react";

export default function CanceledOrderPanel() {
  const [showCanceledTasks, setShowCanceledTasks] = useState(false);

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

      {/* SABİT İPTAL ALARM KUTUSU */}
      <div className="bg-red-900/10 border border-red-500/30 p-6 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <h3 className="text-sm font-bold text-red-500 uppercase tracking-wider">İş Emri İptal Edildi (Manuel Red)</h3>
        </div>
        <p className="text-sm text-zinc-300 leading-relaxed mb-4">
          Sistem (AI) tarafından üretilen operasyonel iş emri, yetkili <span className="text-white font-bold">Müdahale Rolü</span> tarafından reddedilmiş ve yürürlükten kaldırılmıştır. Bu dosya için otomasyon durdurulmuştur.
        </p>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-zinc-950/50 border border-zinc-800 rounded-xl flex flex-col justify-center">
            <span className="text-xs text-zinc-500 uppercase font-medium tracking-tight mb-1">Müdahale Yetki Kaynağı</span>
            <span className="text-sm font-bold text-red-400">L3 - Risk Komitesi</span>
          </div>
          <div className="p-3 bg-zinc-950/50 border border-zinc-800 rounded-xl flex flex-col justify-center">
            <span className="text-xs text-zinc-500 uppercase font-medium tracking-tight mb-1">İptal Edilen AI Önerisi</span>
            <span className="text-sm font-semibold text-zinc-500 line-through decoration-red-500/50">Yapılandırma Teklifi Sun</span>
          </div>
        </div>
      </div>

      {/* İPTAL GEREKÇESİ (YÖNETİCİ NOTU) */}
      <div className="bg-zinc-950/50 p-6 rounded-2xl border border-red-500/20 relative">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500/50 rounded-l-2xl"></div>
        <h4 className="text-[10px] font-bold text-red-400/80 uppercase tracking-widest mb-3 flex items-center gap-2">
          İptal Gerekçesi / Yönetici Notu
        </h4>
        <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl">
          <p className="text-sm text-zinc-300 italic leading-relaxed">
            &quot;Bu müşteri holdingimizin stratejik partnerleri arasındadır. Otomatik limit düşürme veya sert ihtarname çekme işlemleri ticari ilişkimize zarar verecektir. Süreci otomasyondan çıkarın, C-Level düzeyinde bizzat ben yöneteceğim. İş emrini kapatın.&quot;
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-zinc-800/50 pt-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-xs text-zinc-400 font-bold border border-zinc-700">MD</div>
            <span className="text-xs font-medium text-zinc-400">İşlemi Yapan: Mehmet Demir (Risk Direktörü)</span>
          </div>
          <span className="text-xs text-zinc-500">12.04.2026 - 15:45</span>
        </div>
      </div>

      {/* KİLİTLİ EKRAN BİLGİLENDİRMESİ & TASK GÖSTER BUTONU */}
      <div className="p-5 border border-zinc-800 rounded-xl bg-zinc-900/30 flex flex-col items-center justify-center text-center">
        <div className="flex items-center gap-2 text-zinc-500 mb-4">
          <span>🔒</span>
          <span className="text-xs font-medium">Bu iş emri kapatıldığı için yeni aksiyon alınamaz. Sadece okunabilir (Read-only) arşiv kaydıdır.</span>
        </div>
        <button
          onClick={() => setShowCanceledTasks(!showCanceledTasks)}
          className="px-5 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold rounded-lg transition-colors border border-zinc-700 shadow-sm"
        >
          {showCanceledTasks ? 'Orijinal AI Planını Gizle' : 'İptal Edilen Orijinal AI Planını Göster'}
        </button>
      </div>

      {/* İPTAL EDİLEN GÖREVLERİN LİSTESİ (Açılır/Kapanır) */}
      {showCanceledTasks && (
        <div className="bg-zinc-950/50 p-6 rounded-2xl border border-red-500/20 mt-4">
          <h4 className="text-[10px] font-bold text-red-500/70 uppercase tracking-widest mb-4 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500/50"></div>
            Uygulanmayan (İptal Edilen) Sistem Talimatları
          </h4>
          <div className="space-y-3">
            {demirorenDelayedTasks.map((task) => (
              <div key={task.id} className="p-4 border border-zinc-800/50 bg-zinc-900/40 rounded-xl opacity-75">
                <span className="text-xs font-bold text-zinc-400 block mb-2">{task.title}</span>
                <p className="text-sm text-zinc-500 line-through decoration-red-500/30 leading-relaxed">
                  {task.instruction}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

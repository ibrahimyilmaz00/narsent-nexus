"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle, Send, MessageCircle, Mail, MessageSquare, Kanban, Smartphone, ListTodo } from "lucide-react";
import { useGlobalStore } from "../../../store/useGlobalStore";

const CHANNELS = [
  { id: "whatsapp", label: "WhatsApp", icon: MessageCircle },
  { id: "gmail", label: "Gmail", icon: Mail },
  { id: "outlook", label: "Outlook", icon: Mail },
  { id: "slack", label: "Slack", icon: MessageSquare },
  { id: "teams", label: "Teams", icon: MessageSquare },
  { id: "jira", label: "Jira", icon: ListTodo },
  { id: "trello", label: "Trello", icon: Kanban },
  { id: "sms", label: "SMS", icon: Smartphone },
];

const templates: Record<string, { subject: string; message: string }> = {
  step_1: {
    subject: "İVEDİ: Hesap 0095 (Demirören) - 18.6M TL Yapılandırma Görüşmesi",
    message: "HESAP: 0095 (Demirören Yapı A.Ş.)\nAÇIK POZİSYON: 18.666.794 TL\nGECİKME: 668 Gün\n\n📌 ACİL AKSİYON (BUGÜN):\nHesap 0095 yöneticisini BUGÜN ara; acil görüşme talep et ve 3 taksitli yapılandırma (0 faiz, 30-60-90 gün) teklifini sun.\n\n⚠️ FİNANSAL RİSK:\nHer hafta hareketsiz geçen süre 93.334 TL finansman maliyeti yaratıyor."
  },
  step_2: {
    subject: "RESMİ TEKLİF: Hesap 0095 - 3 Taksitli Yapılandırma Protokolü",
    message: "HESAP: 0095 (Demirören Yapı A.Ş.)\n\n📌 AKSİYON (48 SAAT İÇİNDE):\nHesap 0095 için 3 taksitli yapılandırma teklifini resmi olarak ilet ve yazılı taahhüt iste.\n\n⚠️ KRİTİK UYARI:\nBu teklif son dostane çözüm adımıdır. Yazılı taahhüt gelmezse (7. Gün) kredi limiti otomatik düşürülecektir."
  },
  step_3: {
    subject: "SİSTEM UYARISI: Hesap 0095 - Kredi Limiti İndirimi (%50)",
    message: "HESAP: 0095 (Demirören Yapı A.Ş.)\n\n📌 AKSİYON (7. GÜN ESKALASYONU):\nYapılandırma teklifine yazılı taahhüt alınamadığı için ERP üzerinden Hesap 0095'in mevcut kredi limitini an itibarıyla %50 düşür.\n\n⚠️ SIRADAKİ ADIM (14. GÜN):\nEğer limit düşümüne rağmen ödeme gelmezse resmi noter ihtarı çekilecek ve sevkiyatlar durdurulacaktır."
  },
  step_4: {
    subject: "HUKUKİ İŞLEM: Hesap 0095 - İcra Süreci Başlatma Talebi",
    message: "HESAP: 0095 (Demirören Yapı A.Ş.)\n\n📌 AKSİYON (21. GÜN FİNAL ESKALASYONU):\nTüm uzlaşma yolları tükenmiştir. Yanıt alınamadığı için hesabı hukuki takip kuyruğunda icra dosyasına sevk et ve tüm siparişleri/sevkiyatları ERP üzerinden BLOKLA.\n\n✅ BEKLENEN KURTARIM:\nBatık statüsüne geçiş sebebiyle kurtarım oranının %15 seviyelerine düşme riski vardır. Hukuk departmanı ivedi işlem yapmalıdır."
  }
};

export default function OmnichannelActionModal() {
  const isActionModalOpen = useGlobalStore((state) => state.isActionModalOpen);
  const activeActionId = useGlobalStore((state) => state.activeActionId);
  const closeActionModal = useGlobalStore((state) => state.closeActionModal);

  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    if (activeActionId && templates[activeActionId]) {
      setSubject(templates[activeActionId].subject);
      setMessage(templates[activeActionId].message);
    }
  }, [activeActionId]);

  if (!isActionModalOpen) return null;

  const toggleChannel = (id: string) => {
    setSelectedChannels((prev) => 
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleSend = () => {
    setIsSent(true);
  };

  const handleClose = () => {
    setIsSent(false);
    setSelectedChannels([]);
    setSubject("");
    setMessage("");
    closeActionModal();
  };

  return (
    <div className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* State B: Success */}
        {isSent ? (
          <div className="flex flex-col h-[500px]">
            <div className="flex justify-end p-6 shrink-0">
              <button 
                onClick={handleClose}
                className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 rounded-xl transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center pb-20">
              <div className="h-32 w-32 rounded-full bg-emerald-500/10 border-4 border-emerald-500/20 flex items-center justify-center mb-8 relative">
                <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full" />
                <CheckCircle size={64} className="text-emerald-500 relative z-10" />
              </div>
              <h2 className="text-3xl font-bold text-zinc-50 tracking-tight mb-4">
                Dağıtım Senkronizasyonu Başarılı
              </h2>
              <p className="text-zinc-400 text-lg max-w-lg">
                Aksiyon bildirimleri ve görevler seçtiğiniz kanallara (API üzerinden) başarıyla iletildi.
              </p>
            </div>
          </div>
        ) : (
          /* State A: Form */
          <>
            {/* Header */}
            <div className="flex items-center justify-between shrink-0 p-6 border-b border-zinc-800/50">
              <h2 className="text-2xl font-bold text-zinc-50 tracking-tight">Aksiyon Dağıtım Merkezi</h2>
              <button 
                onClick={handleClose}
                className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 rounded-xl transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto custom-scrollbar min-h-0 p-6 flex flex-col gap-8">
              
              {/* Kanal Seçimi */}
              <div>
                <label className="text-sm font-semibold text-zinc-300 block mb-3 uppercase tracking-wider">
                  Dağıtım Kanalları
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {CHANNELS.map((channel) => {
                    const isSelected = selectedChannels.includes(channel.id);
                    const Icon = channel.icon;
                    return (
                      <button
                        key={channel.id}
                        onClick={() => toggleChannel(channel.id)}
                        className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-emerald-500/10 border-transparent text-emerald-400 ring-2 ring-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                            : "bg-zinc-900/50 border-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300"
                        }`}
                      >
                        <Icon size={24} strokeWidth={1.5} />
                        <span className="text-sm font-medium">{channel.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mesaj İçeriği */}
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-sm font-semibold text-zinc-300 block mb-2 uppercase tracking-wider">
                    Konu / Başlık
                  </label>
                  <input 
                    type="text" 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Örn: 18.6M TL Bakiye Yapılandırması"
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-200 focus:outline-none focus:border-zinc-700/50 focus:ring-1 focus:ring-zinc-700"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-zinc-300 block mb-2 uppercase tracking-wider">
                    Aksiyon Detayı / Mesaj
                  </label>
                  <textarea 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Gönderilecek detaylı açıklama..."
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-zinc-300 focus:outline-none focus:border-zinc-700/50 focus:ring-1 focus:ring-zinc-700 min-h-[250px] resize-none leading-relaxed"
                  />
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="flex items-center justify-between shrink-0 p-6 border-t border-zinc-800/50 bg-zinc-950">
              <div className="text-sm font-medium text-zinc-400">
                <span className="text-zinc-200 font-bold">{selectedChannels.length}</span> Kanal Seçildi
              </div>
              <button 
                onClick={handleSend}
                disabled={selectedChannels.length === 0}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
              >
                <Send size={18} />
                Dağıtımı Başlat
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

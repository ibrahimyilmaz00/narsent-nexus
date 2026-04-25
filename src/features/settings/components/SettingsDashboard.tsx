"use client";

import React, { useState } from "react";
import {
  Building2,
  Link as LinkIcon,
  Users,
  Bell,
  MessageSquare,
  Smartphone,
  ChevronRight,
  X,
} from "lucide-react";
import { settingsData } from "../data/mockData";
import { showToast } from "../../../components/ui/Toast";

/* ── Tab Components ── */
import { WorkspaceTab } from "./tabs/WorkspaceTab";
import { IntegrationsTab, IntegrationItem, INTEGRATION_ICON_MAP } from "./tabs/IntegrationsTab";
import { TeamTab } from "./tabs/TeamTab";
import { NotificationsTab, NotificationSetting } from "./tabs/NotificationsTab";

/* ═══════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════ */
type TabId = "workspace" | "integrations" | "team" | "notifications";

/* ═══════════════════════════════════════════════════════════
   Tab Definition
   ═══════════════════════════════════════════════════════════ */
const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: "workspace",     label: "Workspace & Görünüm", icon: <Building2  size={18} /> },
  { id: "integrations",  label: "Entegrasyonlar",      icon: <LinkIcon   size={18} /> },
  { id: "team",          label: "Ekip",                icon: <Users      size={18} /> },
  { id: "notifications", label: "Bildirimler",          icon: <Bell       size={18} /> },
];

/* ═══════════════════════════════════════════════════════════
   SettingsDashboard — Ana Orkestratör
   ═══════════════════════════════════════════════════════════ */
export function SettingsDashboard() {
  /* ── Tab State ── */
  const [activeTab, setActiveTab] = useState<TabId>("workspace");

  /* ── Integration Modal State ── */
  const [modalOpen,   setModalOpen]         = useState(false);
  const [selectedInt, setSelectedInt]       = useState<IntegrationItem | null>(null);
  const [catalogOpen, setCatalogModalOpen]  = useState(false);

  /* ── Notifications State ── */
  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    { id: "daily_report",       label: "Günlük Rapor",              description: "Her gün saat 09:00'da özet rapor gönderilir",              enabled: true  },
    { id: "critical_alert",     label: "Kritik Tahsilat Uyarısı",   description: "Yüksek riskli tahsilat eşiği aşıldığında anlık bildirim",  enabled: true  },
    { id: "sla_warning",        label: "SLA Zaman Aşımı",           description: "Görev SLA süresinin %80'ine ulaştığında uyarı",            enabled: false },
    { id: "new_action",         label: "Yeni Aksiyon Ataması",      description: "Size yeni bir aksiyon atandığında bildirim",               enabled: true  },
    { id: "weekly_digest",      label: "Haftalık Performans Özeti", description: "Her Pazartesi ekip performans raporunu alın",               enabled: false },
    { id: "integration_status", label: "Entegrasyon Durumu",        description: "Bağlı servislerde bağlantı kopması olduğunda uyarı",       enabled: true  },
  ]);

  const toggleNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, enabled: !n.enabled } : n))
    );
  };

  /* ── Katalog → API Modal Akışı ── */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddIntegration = (newIntegration: any) => {
    setCatalogModalOpen(false);
    setSelectedInt({ ...newIntegration, status: "disconnected" });
    setModalOpen(true);
  };

  /* ── Entegrasyon Modal Aksiyonları ── */
  const handleDisconnect = () => {
    setModalOpen(false);
    showToast(`${selectedInt?.name} entegrasyonu bağlantısı kesildi.`, "info");
  };

  const handleSaveSettings = () => {
    setModalOpen(false);
    showToast("API ayarları başarıyla kaydedildi.", "success");
  };

  const handleConnect = () => {
    setModalOpen(false);
    showToast(`${selectedInt?.name} bağlantı talebi gönderildi.`, "success");
  };

  return (
    <div className="h-full flex flex-col pt-2 animate-fadeIn">
      {/* ── Page Header ── */}
      <header className="mb-8 shrink-0">
        <div className="flex items-center gap-3 mb-1">
          <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/10">
            <Building2 size={20} className="text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-50 tracking-tight">
              Ayarlar
            </h1>
            <p className="text-sm text-zinc-500">
              Workspace, entegrasyon ve bildirim tercihlerinizi yönetin
            </p>
          </div>
        </div>
      </header>

      {/* ── Layout: Tabs Sidebar + Content ── */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        {/* ── Vertical Tabs ── */}
        <nav className="lg:w-60 shrink-0 flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.08)]"
                  : "bg-transparent text-zinc-400 hover:bg-zinc-900/60 hover:text-zinc-200 border-transparent"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {activeTab === tab.id && (
                <ChevronRight size={14} className="ml-auto hidden lg:block text-blue-500/60" />
              )}
            </button>
          ))}
        </nav>

        {/* ── Content Panel ── */}
        <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 sm:p-8 min-h-[500px]">
            {activeTab === "workspace" && <WorkspaceTab />}
            {activeTab === "integrations" && (
              <IntegrationsTab
                onOpenModal={(item) => { setSelectedInt(item); setModalOpen(true); }}
                onOpenCatalog={() => setCatalogModalOpen(true)}
              />
            )}
            {activeTab === "team" && <TeamTab />}
            {activeTab === "notifications" && (
              <NotificationsTab notifications={notifications} toggleNotification={toggleNotification} />
            )}
          </div>
        </div>
      </div>

      {/* ═══ ENTEGRASYON YÖNETİM MODALI ═══ */}
      {modalOpen && selectedInt && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-[#09090b] border border-zinc-800 w-full max-w-md rounded-3xl p-6 shadow-2xl relative animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button onClick={() => setModalOpen(false)} className="absolute top-6 right-6 text-zinc-500 hover:text-zinc-300 transition-colors">
              <X size={20} />
            </button>

            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0">
                {INTEGRATION_ICON_MAP[selectedInt.icon] || <LinkIcon size={24} className="text-zinc-400" />}
              </div>
              <div>
                <h2 className="text-lg font-black text-zinc-100">{selectedInt.name} Yapılandırması</h2>
                <p className="text-xs text-zinc-500">
                  {selectedInt.status === "connected"
                    ? "Sistem aktif ve veri alıyor."
                    : "Sistemi bağlamak için API bilgilerini girin."}
                </p>
              </div>
            </div>

            {/* Fields */}
            <div className="space-y-4 mb-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">API Anahtarı (Key)</label>
                <input
                  type="password"
                  placeholder={selectedInt.status === "connected" ? "••••••••••••••••" : "API Key giriniz"}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Endpoint URL</label>
                <input
                  type="text"
                  placeholder="https://api.ornek.com/v1"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-zinc-800/80">
              {selectedInt.status === "connected" ? (
                <>
                  <button
                    onClick={handleDisconnect}
                    className="text-xs font-bold text-red-400 hover:text-red-300 px-4 py-2 bg-red-400/10 rounded-lg transition-colors"
                  >
                    Bağlantıyı Kes
                  </button>
                  <button
                    onClick={handleSaveSettings}
                    className="text-xs font-bold text-zinc-900 bg-zinc-100 hover:bg-white px-6 py-2.5 rounded-lg transition-colors"
                  >
                    Ayarları Kaydet
                  </button>
                </>
              ) : (
                <button
                  onClick={handleConnect}
                  className="w-full text-sm font-bold text-zinc-100 bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl transition-colors shadow-[0_0_20px_rgba(59,130,246,0.25)]"
                >
                  Sistemi Bağla
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ═══ YENİ ENTEGRASYON EKLEME KATALOĞU (MODAL) ═══ */}
      {catalogOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setCatalogModalOpen(false)}
        >
          <div
            className="bg-[#09090b] border border-zinc-800 w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl relative animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setCatalogModalOpen(false)} className="absolute top-6 right-6 text-zinc-500 hover:text-zinc-300 transition-colors">
              <X size={20} />
            </button>

            <div className="mb-6">
              <h2 className="text-xl font-black text-zinc-100">Entegrasyon Kataloğu</h2>
              <p className="text-sm text-zinc-500 mt-1">Narsenti&apos;yi şirketinizin mevcut altyapısına bağlayın.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
              {/* SAP Business One */}
              <div className="p-4 border border-zinc-800 rounded-2xl bg-zinc-900/30 flex items-center justify-between group hover:border-zinc-700 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-900/20 text-blue-500 flex items-center justify-center"><Building2 size={18} /></div>
                  <div>
                    <div className="text-sm font-bold text-zinc-200">SAP Business One</div>
                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5">ERP &amp; Finans</div>
                  </div>
                </div>
                <button
                  onClick={() => handleAddIntegration({ id: "sap", name: "SAP Business One", icon: "Database" })}
                  className="text-xs font-bold text-zinc-400 bg-zinc-800 px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-zinc-700 hover:text-zinc-100"
                >
                  Ekle
                </button>
              </div>

              {/* Mikro Yazılım */}
              <div className="p-4 border border-zinc-800 rounded-2xl bg-zinc-900/30 flex items-center justify-between group hover:border-zinc-700 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-900/20 text-emerald-500 flex items-center justify-center"><Building2 size={18} /></div>
                  <div>
                    <div className="text-sm font-bold text-zinc-200">Mikro Yazılım</div>
                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5">Muhasebe</div>
                  </div>
                </div>
                <button
                  onClick={() => handleAddIntegration({ id: "mikro", name: "Mikro Yazılım", icon: "Database" })}
                  className="text-xs font-bold text-zinc-400 bg-zinc-800 px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-zinc-700 hover:text-zinc-100"
                >
                  Ekle
                </button>
              </div>

              {/* Microsoft Teams */}
              <div className="p-4 border border-zinc-800 rounded-2xl bg-zinc-900/30 flex items-center justify-between group hover:border-zinc-700 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-900/20 text-indigo-500 flex items-center justify-center"><MessageSquare size={18} /></div>
                  <div>
                    <div className="text-sm font-bold text-zinc-200">Microsoft Teams</div>
                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5">İletişim</div>
                  </div>
                </div>
                <button
                  onClick={() => handleAddIntegration({ id: "teams", name: "Microsoft Teams", icon: "MessageSquare" })}
                  className="text-xs font-bold text-zinc-400 bg-zinc-800 px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-zinc-700 hover:text-zinc-100"
                >
                  Ekle
                </button>
              </div>

              {/* Twilio */}
              <div className="p-4 border border-zinc-800 rounded-2xl bg-zinc-900/30 flex items-center justify-between group hover:border-zinc-700 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-rose-900/20 text-rose-500 flex items-center justify-center"><Smartphone size={18} /></div>
                  <div>
                    <div className="text-sm font-bold text-zinc-200">Twilio</div>
                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5">SMS &amp; Çağrı</div>
                  </div>
                </div>
                <button
                  onClick={() => handleAddIntegration({ id: "twilio", name: "Twilio", icon: "Smartphone" })}
                  className="text-xs font-bold text-zinc-400 bg-zinc-800 px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-zinc-700 hover:text-zinc-100"
                >
                  Ekle
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

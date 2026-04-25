"use client";

import React, { useRef } from "react";
import { Sun, Moon, Globe, Check, Upload } from "lucide-react";
import { settingsData } from "../../data/mockData";
import { showToast } from "../../../../components/ui/Toast";

/* ═══════════════════════════════════════════════════════════
   WorkspaceTab — Şirket Bilgileri, Para Birimi, Tema & Dil
   Props removed: theme/setTheme/language/setLanguage no longer
   needed as the Appearance section is now static (MVP).
   ═══════════════════════════════════════════════════════════ */
export function WorkspaceTab() {
  const ws = settingsData.workspace;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    showToast("Değişiklikler başarıyla kaydedildi.", "success");
  };

  const handleLogoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      showToast(`"${file.name}" yüklendi.`, "success");
    }
  };

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* ── Company Info ── */}
      <section>
        <h2 className="text-lg font-semibold text-zinc-100 mb-1">Şirket Bilgileri</h2>
        <p className="text-xs text-zinc-500 mb-6">Workspace&apos;e ait kurumsal bilgiler</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Şirket Adı</label>
            <input
              type="text"
              defaultValue={ws.name}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Varsayılan Para Birimi</label>
            <select className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-blue-500 transition-colors appearance-none">
              <option>Türk Lirası (TRY)</option>
              <option>US Dollar (USD)</option>
              <option>Euro (EUR)</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Zaman Dilimi</label>
            <select className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-blue-500 transition-colors appearance-none">
              <option>(GMT+03:00) İstanbul</option>
              <option>(GMT+00:00) London</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Logo</label>
            {/* Real file input hidden behind styled trigger */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              type="button"
              onClick={handleLogoClick}
              className="w-full h-[46px] border border-dashed border-zinc-700 rounded-xl flex items-center justify-center gap-2 text-sm text-zinc-500 cursor-pointer hover:bg-zinc-800/50 hover:text-zinc-300 hover:border-zinc-600 transition-colors"
            >
              <Upload size={14} />
              Logo Yükle
            </button>
          </div>
        </div>
      </section>

      {/* GÖRÜNÜM VE DİL ALANI */}
      <div className="space-y-4 pt-6 mt-2 border-t border-zinc-800/80">
        <div className="mb-4">
          <h3 className="text-sm font-bold text-zinc-200">Görünüm ve Bölgesel Ayarlar</h3>
          <p className="text-xs text-zinc-500 mt-1">Platformun dil ve tema tercihlerini yönetin.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* TEMA SEÇİMİ */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <Sun size={14} /> Tema Seçimi
            </label>
            <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 p-1.5 rounded-xl">
              {/* AKTİF KOYU TEMA */}
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-zinc-800 text-zinc-100 text-sm font-bold shadow-sm border border-zinc-700/50">
                <Moon size={16} /> Koyu
              </button>
              {/* PASİF AÇIK TEMA (TOOLTIP İLE) */}
              <div className="flex-1 relative group cursor-not-allowed">
                <button disabled className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-zinc-600 text-sm font-bold cursor-not-allowed transition-colors">
                  <Sun size={16} /> Açık
                </button>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[10px] font-black tracking-widest px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl shadow-blue-500/20">
                  YAKINDA!
                </div>
              </div>
            </div>
          </div>

          {/* DİL SEÇİMİ */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <Globe size={14} /> Dil (Language)
            </label>
            <select className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-blue-500 appearance-none cursor-pointer">
              <option>Türkçe (TR)</option>
              <option>English (EN) - Beta</option>
            </select>
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end pt-2">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all duration-200 shadow-[0_0_20px_rgba(59,130,246,0.25)] hover:shadow-[0_0_30px_rgba(59,130,246,0.35)]"
        >
          <Check size={16} />
          Değişiklikleri Kaydet
        </button>
      </div>
    </div>
  );
}

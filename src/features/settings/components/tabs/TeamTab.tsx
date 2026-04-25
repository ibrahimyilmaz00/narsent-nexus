"use client";

import React, { useState } from "react";
import { Users, UserPlus, X, Mail, Shield, AlertCircle } from "lucide-react";
import { settingsData } from "../../data/mockData";
import { showToast } from "../../../../components/ui/Toast";

/* ═══════════════════════════════════════════════════════════
   TeamTab — Ekip Üyeleri Tablosu & Davet Butonu
   ═══════════════════════════════════════════════════════════ */
type TeamMember = (typeof settingsData.team)[number];

export function TeamTab() {
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<TeamMember | null>(null);

  const handleSendInvite = () => {
    setInviteModalOpen(false);
    showToast("Davet e-postası başarıyla gönderildi.", "success");
  };

  const handleSaveUser = () => {
    setEditingUser(null);
    showToast("Kullanıcı bilgileri güncellendi.", "success");
  };

  const handleDeleteUser = () => {
    if (!window.confirm(`"${editingUser?.name}" adlı kullanıcıyı silmek istediğinizden emin misiniz?`)) return;
    setEditingUser(null);
    showToast("Kullanıcı silindi.", "info");
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-zinc-100 mb-1">Ekip Üyeleri</h2>
          <p className="text-xs text-zinc-500">Çalışma alanınızdaki kullanıcıları yönetin</p>
        </div>
        <button
          onClick={() => setInviteModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all duration-200 shadow-[0_0_20px_rgba(59,130,246,0.25)] hover:shadow-[0_0_30px_rgba(59,130,246,0.35)]"
        >
          <UserPlus size={16} />
          Kullanıcı Davet Et
        </button>
      </div>

      {/* Team Table */}
      <div className="rounded-xl border border-zinc-800/60 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-zinc-900/80 border-b border-zinc-800/60">
              <th className="text-left px-5 py-3.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Kullanıcı</th>
              <th className="text-left px-5 py-3.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Rol</th>
              <th className="text-left px-5 py-3.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Durum</th>
              <th className="text-right px-5 py-3.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/40">
            {settingsData.team.map((member) => (
              <tr key={member.id} className="hover:bg-zinc-800/20 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="flex items-center justify-center h-9 w-9 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 border border-blue-500/20 shrink-0">
                      <span className="text-xs font-bold text-blue-300">
                        {member.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-100">{member.name}</p>
                      <p className="text-xs text-zinc-500">{member.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1.5">
                    <Shield size={13} className="text-zinc-500" />
                    <span className="text-sm text-zinc-300">{member.role}</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${
                    member.status === "active"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-zinc-800 text-zinc-400 border border-zinc-700"
                  }`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${
                      member.status === "active" ? "bg-emerald-400" : "bg-zinc-500"
                    }`} />
                    {member.status === "active" ? "Aktif" : "Deaktif"}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <button
                    onClick={() => setEditingUser(member)}
                    className="text-xs text-zinc-500 hover:text-zinc-200 transition-colors font-medium"
                  >
                    Düzenle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="flex items-center gap-4 px-4 py-3 rounded-xl bg-zinc-900/60 border border-zinc-800/40">
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <Users size={14} />
          <span>Toplam <strong className="text-zinc-300">{settingsData.team.length}</strong> kullanıcı</span>
        </div>
        <div className="h-3 w-px bg-zinc-800" />
        <div className="text-xs text-zinc-500">
          <strong className="text-emerald-400">{settingsData.team.filter((m) => m.status === "active").length}</strong> aktif
        </div>
      </div>

      {/* ═══ KULLANICI DAVET MODALI ═══ */}
      {inviteModalOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setInviteModalOpen(false)}
        >
          <div
            className="bg-[#09090b] border border-zinc-800 w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl relative animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setInviteModalOpen(false)} className="absolute top-6 right-6 text-zinc-500 hover:text-zinc-300 transition-colors">
              <X size={20} />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                <UserPlus size={24} />
              </div>
              <div>
                <h2 className="text-lg font-black text-zinc-100">Ekip Arkadaşı Davet Et</h2>
                <p className="text-xs text-zinc-500">Çalışma alanınıza yeni bir kullanıcı ekleyin.</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2"><Mail size={14} /> E-Posta Adresi</label>
                <input type="email" placeholder="ornek@sirket.com" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-blue-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2"><Shield size={14} /> Kullanıcı Rolü</label>
                <select className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-blue-500 appearance-none transition-colors">
                  <option value="user">Tahsilat Uzmanı (Standart Erişim)</option>
                  <option value="sales">Satış Temsilcisi (Standart Erişim)</option>
                  <option value="admin">Yönetici (Tam Erişim)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800/80">
              <button onClick={() => setInviteModalOpen(false)} className="px-5 py-2.5 rounded-xl text-sm font-bold text-zinc-400 hover:text-zinc-300 transition-colors">İptal</button>
              <button onClick={handleSendInvite} className="px-6 py-2.5 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white transition-colors shadow-lg shadow-blue-500/20">Davetiye Gönder</button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ KULLANICI DÜZENLEME MODALI ═══ */}
      {editingUser && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setEditingUser(null)}
        >
          <div
            className="bg-[#09090b] border border-zinc-800 w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl relative animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setEditingUser(null)} className="absolute top-6 right-6 text-zinc-500 hover:text-zinc-300 transition-colors">
              <X size={20} />
            </button>

            <div className="mb-6">
              <h2 className="text-lg font-black text-zinc-100">Kullanıcıyı Düzenle</h2>
              <p className="text-xs text-zinc-500 mt-1">{editingUser.name} adlı kullanıcının yetki ve durumunu yönetin.</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">E-Posta (Değiştirilemez)</label>
                <input type="text" disabled defaultValue={editingUser.email} className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-500 cursor-not-allowed" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Rol</label>
                <select defaultValue={editingUser.role === 'Yönetici' ? 'admin' : 'user'} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-blue-500 appearance-none transition-colors">
                  <option value="admin">Yönetici</option>
                  <option value="user">Tahsilat Uzmanı</option>
                  <option value="sales">Satış Temsilcisi</option>
                </select>
              </div>
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Hesap Durumu</label>
                <div className="flex items-center gap-4 bg-zinc-900/50 border border-zinc-800 p-3 rounded-xl">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="status" defaultChecked={editingUser.status === 'active'} className="accent-emerald-500" />
                    <span className="text-sm font-medium text-zinc-300">Aktif</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="status" defaultChecked={editingUser.status !== 'active'} className="accent-red-500" />
                    <span className="text-sm font-medium text-zinc-300">Pasif (Erişimi Kes)</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-zinc-800/80">
              <button onClick={handleDeleteUser} className="text-xs font-bold text-red-400 hover:text-red-300 px-4 py-2 bg-red-400/10 rounded-lg transition-colors flex items-center gap-2">
                <AlertCircle size={14} /> Kullanıcıyı Sil
              </button>
              <div className="flex gap-2">
                <button onClick={() => setEditingUser(null)} className="px-4 py-2 rounded-lg text-sm font-bold text-zinc-400 hover:text-zinc-300 transition-colors">İptal</button>
                <button onClick={handleSaveUser} className="px-4 py-2 rounded-lg text-sm font-bold bg-zinc-100 hover:bg-white text-zinc-900 transition-colors">Kaydet</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

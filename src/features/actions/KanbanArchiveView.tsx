import React, { useState } from 'react';
import { Filter, X, Flame, CheckCircle, ArrowRight, ShieldAlert, AlertTriangle, Clock, FileText, Phone } from 'lucide-react';
import { useGlobalStore } from '../../store/useGlobalStore';

const mockOrders = [
  {
    id: '0095',
    company: 'Demirören Yapı A.Ş.',
    exposure: '18.666.794 TL',
    delay: '668 Gün',
    risk: 'Düşük (0.241)',
    action: 'Yapılandırma Teklifi Sunuldu',
    status: 'Bekliyor',
    filterCategory: 'bekleyen'
  },
  {
    id: '0378',
    company: 'Kalyon İnşaat',
    exposure: '7.250.000 TL',
    delay: '120 Gün',
    risk: 'Orta (0.482)',
    action: 'Müzakere Devam Ediyor',
    status: 'İşlemde',
    filterCategory: 'aktif'
  },
  {
    id: '0412',
    company: 'Tekfen Lojistik',
    exposure: '3.400.000 TL',
    delay: '45 Gün',
    risk: 'Yüksek (0.812)',
    action: '7. Gün Taahhüt İhlali',
    status: 'SLA Aşımı',
    filterCategory: 'zaman_asimi'
  },
  {
    id: '0899',
    company: 'Limak Enerji',
    exposure: '12.100.000 TL',
    delay: '890 Gün',
    risk: 'Kritik (0.950)',
    action: 'Yapılandırma Reddedildi',
    status: 'Reddedildi / Hukuk',
    filterCategory: 'riskli'
  }
];

export default function KanbanArchiveView() {
  const { setCurrentView, setSelectedAccountId, setSelectedOrderStatus } = useGlobalStore();
  const [activeFilter, setActiveFilter] = useState('bekleyen');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  const filteredOrders = activeFilter === 'tum'
    ? mockOrders
    : mockOrders.filter(order => order.filterCategory === activeFilter);

  return (
    <div className="w-full h-full min-h-screen bg-zinc-950 p-8 text-white">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">İş Emri ve İcra Arşivi</h1>
          <p className="text-zinc-400 mt-2">İş emirlerinin durum bazlı detaylı takip listesi.</p>
        </div>
        
        {/* HIZLI FİLTRELER VE DETAYLI ARAMA */}
        <div className="flex items-center">
          <div className="flex bg-zinc-900/50 p-1 rounded-lg border border-zinc-800">
            {[
              { id: 'bekleyen', label: 'Bekleyenler' },
              { id: 'aktif', label: 'Aktif Operasyonlar' },
              { id: 'zaman_asimi', label: 'Zaman Aşımına Uğrayanlar' },
              { id: 'riskli', label: 'Riskli & Reddedilenler' },
              { id: 'tum', label: 'Tüm Arşiv' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeFilter === f.id 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 shadow-sm' 
                    : 'text-zinc-400 hover:text-zinc-200 border border-transparent'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* DETAYLI FİLTRE BUTONU */}
          <button onClick={() => setIsFilterOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg border border-zinc-700 transition-colors text-sm font-medium ml-4">
            <Filter size={16} />
            Detaylı Filtrele
          </button>
        </div>
      </div>
      
      {/* LİSTE / TABLO GÖRÜNÜMÜ */}
      <div className="w-full bg-zinc-900/40 border border-zinc-800 rounded-2xl overflow-hidden mt-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-400">
            <thead className="bg-zinc-900/80 text-xs uppercase font-semibold text-zinc-500 border-b border-zinc-800">
              <tr>
                <th className="px-6 py-4">Hesap / Kurum</th>
                <th className="px-6 py-4">Açık Pozisyon</th>
                <th className="px-6 py-4">Gecikme</th>
                <th className="px-6 py-4">Risk Seviyesi</th>
                <th className="px-6 py-4">Mevcut Aşama / Aksiyon</th>
                <th className="px-6 py-4 text-right">Durum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className="hover:bg-zinc-800/40 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4 font-medium text-zinc-200">
                    {order.company}
                    <div className="text-xs text-zinc-500 font-normal mt-0.5">ID: {order.id}</div>
                  </td>
                  <td className="px-6 py-4 text-zinc-300">{order.exposure}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md ${order.filterCategory === 'riskli' ? 'text-red-400 bg-red-400/10' : 'text-amber-400 bg-amber-400/10'}`}>
                      {order.delay}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-md">{order.risk}</span>
                  </td>
                  <td className="px-6 py-4 text-zinc-300">{order.action}</td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-zinc-300 bg-zinc-800 border border-zinc-700 px-3 py-1.5 rounded-lg text-xs font-medium">
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* BOŞ DURUM VEYA SAYFALAMA ALANI */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-900/20 text-center text-xs text-zinc-500">
          Sistemde listelenecek başka kayıt bulunmamaktadır.
        </div>
      </div>
      {/* SAĞ PANEL: İŞ EMRİ DETAY ÇEKMECESİ */}
      {selectedOrder && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            onClick={() => setSelectedOrder(null)}
          />

          {/* Geniş Detay Paneli */}
          <div className="fixed top-0 right-0 h-full w-[600px] bg-zinc-950 border-l border-zinc-800 z-50 shadow-2xl flex flex-col transform transition-transform">

            {/* Panel Header */}
            <div className="flex items-start justify-between p-6 border-b border-zinc-800 bg-zinc-900/20">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-bold px-2 py-1 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                    ID: {selectedOrder.id}
                  </span>
                  <span className="text-xs font-medium px-2 py-1 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                    {selectedOrder.status}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white mt-2">{selectedOrder.company}</h2>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-zinc-400 hover:text-white transition-colors bg-zinc-900 p-2 rounded-lg border border-zinc-800">
                <X size={20} />
              </button>
            </div>

            {/* Panel Body (Dinamik Senaryolar) */}
            <div className="flex-1 p-6 overflow-y-auto space-y-8">

              {/* ORTAK ALAN: Finansal Özet */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl flex flex-col justify-center">
                  <span className="text-xs text-zinc-500 font-semibold mb-1 uppercase">Açık Pozisyon</span>
                  <span className="text-2xl font-bold text-white">{selectedOrder.exposure}</span>
                </div>
                <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl flex flex-col justify-center">
                  <span className="text-xs text-zinc-500 font-semibold mb-1 uppercase">Risk Skoru</span>
                  <span className="text-2xl font-bold text-zinc-300">{selectedOrder.risk}</span>
                </div>
              </div>

              {/* SENARYO 1: BEKLEYENLER */}
              {selectedOrder.filterCategory === 'bekleyen' && (
                <>
                  <div className="bg-red-500/5 border border-red-500/20 p-5 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <Flame size={18} className="text-red-400" />
                      <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider">Kritik Finansal Risk</h3>
                    </div>
                    <p className="text-sm text-red-200/80 leading-relaxed font-medium">Her hafta hareketsiz geçen süre 93.334 TL finansman maliyeti yaratıyor. Hemen aksiyon alınmalıdır.</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-5 flex items-center gap-2"><ArrowRight size={16} /> Önerilen Eskalasyon Yolu</h3>
                    <div className="border-l-2 border-zinc-800 ml-3 pl-5 space-y-6">
                      <div className="relative">
                        <span className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-zinc-950"></span>
                        <p className="text-sm text-zinc-300 leading-relaxed"><span className="font-bold text-white">Adım 1:</span> Bugün Hesap 0095 yöneticisini ara; acil görüşme talep et ve 3 taksitli yapılandırma teklifi sun.</p>
                      </div>
                      <div className="relative">
                        <span className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-zinc-700 ring-4 ring-zinc-950"></span>
                        <p className="text-sm text-zinc-400 leading-relaxed"><span className="font-bold text-zinc-300">Gün 7:</span> Yazılı taahhüt yoksa kredi limitini %50 düşür.</p>
                      </div>
                      <div className="relative">
                        <span className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-zinc-700 ring-4 ring-zinc-950"></span>
                        <p className="text-sm text-zinc-400 leading-relaxed"><span className="font-bold text-zinc-300">Gün 14:</span> Ödeme yoksa noter ihtarı gönder ve sevkiyatı durdur.</p>
                      </div>
                      <div className="relative">
                        <span className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-red-500/50 ring-4 ring-zinc-950"></span>
                        <p className="text-sm text-zinc-400 leading-relaxed"><span className="font-bold text-red-400">Gün 21 (Final):</span> Yanıt yoksa hukuki icra dosyası aç; tüm siparişleri blokla.</p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* SENARYO 2: AKTİF OPERASYON (İŞLEMDE) */}
              {selectedOrder.filterCategory === 'aktif' && (
                <>
                  <div className="bg-blue-500/5 border border-blue-500/20 p-5 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <Phone size={18} className="text-blue-400" />
                      <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider">Müzakere Özeti</h3>
                    </div>
                    <p className="text-sm text-blue-200/80 leading-relaxed font-medium mb-4">CFO ile 12 Nisan&apos;da görüşüldü. Mevcut ekonomik daralma sebebiyle 3 taksitli plan yerine %5 iskontolu peşin ödeme talep ediliyor. Yönetim onayı bekleniyor.</p>
                    <div className="grid grid-cols-2 gap-4 mt-4 border-t border-blue-500/10 pt-4">
                      <div><span className="block text-xs text-blue-400/70 mb-1">Müşteri Teklifi</span><span className="font-bold text-blue-100">%5 İskonto (Peşin)</span></div>
                      <div><span className="block text-xs text-blue-400/70 mb-1">Bizim Teklifimiz</span><span className="font-bold text-blue-100">0 Faiz (3 Taksit)</span></div>
                    </div>
                  </div>

                  {/* Müşteri Karşı Teklifinin Finansal Etkisi */}
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="border border-zinc-800 rounded-lg p-4 bg-zinc-900/30">
                      <span className="block text-xs text-zinc-500 mb-1">Teklif İskonto Maliyeti (%5)</span>
                      <span className="font-medium text-red-400">-362.500 TL</span>
                    </div>
                    <div className="border border-emerald-500/20 rounded-lg p-4 bg-emerald-500/5">
                      <span className="block text-xs text-emerald-500 mb-1">Net Kasaya Girecek (Peşin)</span>
                      <span className="font-bold text-emerald-400">6.887.500 TL</span>
                    </div>
                  </div>

                  {/* Müzakere ve Temas İzi (Timeline) */}
                  <div className="mt-4">
                    <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4 border-b border-zinc-800 pb-2">Temas & Müzakere İzi</h4>
                    <div className="space-y-4 pl-2 border-l-2 border-zinc-800 ml-2">
                      <div className="relative">
                        <span className="absolute -left-[13px] top-1 w-2 h-2 rounded-full bg-zinc-600"></span>
                        <p className="text-xs text-zinc-400"><span className="text-zinc-300 font-medium">10 Nisan 14:30</span> - Karar alıcı ile ilk telefon teması sağlandı. Durum tespiti yapıldı.</p>
                      </div>
                      <div className="relative">
                        <span className="absolute -left-[13px] top-1 w-2 h-2 rounded-full bg-zinc-600"></span>
                        <p className="text-xs text-zinc-400"><span className="text-zinc-300 font-medium">11 Nisan 09:00</span> - AI Önerisi (3 Taksitli Yapılandırma) resmi protokol taslağı olarak iletildi.</p>
                      </div>
                      <div className="relative">
                        <span className="absolute -left-[13px] top-1 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></span>
                        <p className="text-xs text-blue-300/80"><span className="text-blue-400 font-medium">12 Nisan 11:45</span> - Müşteri %5 peşin iskonto karşı teklifi iletti. Karar bekleniyor.</p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* SENARYO 3: ZAMAN AŞIMI (SLA İHLALİ - İÇ OPERASYON) */}
              {selectedOrder.filterCategory === 'zaman_asimi' && (
                <>
                  {/* Uyarı Kutusu */}
                  <div className="bg-amber-500/5 border border-amber-500/20 p-5 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock size={18} className="text-amber-400" />
                      <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">İç Operasyon Gecikmesi (SLA Aşımı)</h3>
                    </div>
                    <p className="text-sm text-amber-200/80 leading-relaxed font-medium">Bu iş emri için personele atanan 48 saatlik &quot;Aksiyon Alma&quot; süresi dolmuştur. İşlem yapılmadığı için sistem tarafından otomatik olarak üst yönetime raporlanmıştır.</p>
                  </div>

                  {/* Detay Grid'i */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-zinc-800 rounded-lg p-4 bg-zinc-900/30">
                      <span className="block text-xs text-zinc-500 mb-1">Atanan Operasyon Rolü</span>
                      <span className="font-medium text-zinc-300 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span> Kıdemli Tahsilat Uzmanı
                      </span>
                    </div>
                    <div className="border border-zinc-800 rounded-lg p-4 bg-zinc-900/30">
                      <span className="block text-xs text-zinc-500 mb-1">Gecikme Maliyeti (Tahmini)</span>
                      <span className="font-medium text-amber-400">12.450 TL / Hafta</span>
                    </div>
                  </div>

                  {/* Sistem Logları */}
                  <div>
                    <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4 border-b border-zinc-800 pb-2">Sistem İzi (Audit Log)</h4>
                    <div className="space-y-4 pl-2 border-l-2 border-zinc-800 ml-2">
                      <div className="relative">
                        <span className="absolute -left-[13px] top-1 w-2 h-2 rounded-full bg-zinc-600"></span>
                        <p className="text-xs text-zinc-400"><span className="text-zinc-300 font-medium">12 Nisan 09:00</span> - AI tarafından iş emri oluşturuldu.</p>
                      </div>
                      <div className="relative">
                        <span className="absolute -left-[13px] top-1 w-2 h-2 rounded-full bg-zinc-600"></span>
                        <p className="text-xs text-zinc-400"><span className="text-zinc-300 font-medium">12 Nisan 09:15</span> - Görev ilgili Operasyon Rolüne atandı.</p>
                      </div>
                      <div className="relative">
                        <span className="absolute -left-[13px] top-1 w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"></span>
                        <p className="text-xs text-amber-500/80"><span className="text-amber-400 font-medium">14 Nisan 09:15</span> - 48 Saatlik SLA aşıldı. Zaman Aşımı kuyruğuna alındı.</p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* SENARYO 4: REDDEDİLEN İŞ EMİRLERİ (İÇ İPTAL) */}
              {selectedOrder.filterCategory === 'riskli' && (
                <>
                  {/* Uyarı Kutusu */}
                  <div className="bg-red-500/10 border border-red-500/30 p-5 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle size={18} className="text-red-500" />
                      <h3 className="text-sm font-bold text-red-500 uppercase tracking-wider">İş Emri Reddedildi (İptal)</h3>
                    </div>
                    <p className="text-sm text-red-200/90 leading-relaxed font-medium mb-4">Sistem (AI) tarafından önerilen aksiyon, yetkili yönetici tarafından manuel olarak reddedilmiş ve iş emri iptal edilmiştir.</p>
                  </div>

                  {/* Detay Grid'i */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-zinc-800 rounded-lg p-4 bg-zinc-900/30">
                      <span className="block text-xs text-zinc-500 mb-1">Müdahale Yetki Kaynağı</span>
                      <span className="font-medium text-zinc-300">L3 - Risk Komitesi Kararı</span>
                    </div>
                    <div className="border border-zinc-800 rounded-lg p-4 bg-zinc-900/30">
                      <span className="block text-xs text-zinc-500 mb-1">İptal Edilen AI Önerisi</span>
                      <span className="font-medium text-zinc-400 line-through decoration-red-500/50">Yapılandırma Teklifi Sun</span>
                    </div>
                  </div>

                  {/* İptal Gerekçesi ve Loglar */}
                  <div className="border border-dashed border-red-500/30 rounded-xl p-5 bg-zinc-950">
                    <h4 className="text-zinc-300 font-semibold flex items-center gap-2 mb-2"><FileText size={16} /> Yönetici Notu / Red Gerekçesi</h4>
                    <p className="text-sm text-zinc-500 italic">&quot;Bu müşteri stratejik partnerimizdir. Otomatik limit düşürme veya sert yapılandırma yerine süreci bizzat ben yöneteceğim. İş emrini kapatın.&quot;</p>
                  </div>
                </>
              )}

            </div>

            {/* Panel Footer (Operasyon Butonları) */}
            <div className="p-6 border-t border-zinc-800 bg-zinc-950/80 flex justify-between items-center">
              <button
                onClick={() => {
                  setSelectedAccountId(selectedOrder.id);
                  setSelectedOrderStatus(selectedOrder.filterCategory);
                  setSelectedOrder(null);
                  setCurrentView('account-profile');
                }}
                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors underline underline-offset-4"
              >
                Tüm Detayları Gör
              </button>
              <div className="flex gap-3">
                <button onClick={() => setSelectedOrder(null)} className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-lg border border-zinc-700 transition-colors font-medium text-sm">
                  Kapat
                </button>
                <button className="flex items-center gap-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors font-medium text-sm shadow-lg shadow-emerald-900/20">
                  <CheckCircle size={16} /> Aksiyonu Başlat
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* SAĞ PANEL: DETAYLI FİLTRE DRAWER */}
      {isFilterOpen && (
        <>
          {/* Arkaplan Karartması (Backdrop) */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            onClick={() => setIsFilterOpen(false)}
          />
          
          {/* Panel */}
          <div className="fixed top-0 right-0 h-full w-96 bg-zinc-950 border-l border-zinc-800 z-50 shadow-2xl flex flex-col transform transition-transform">
            {/* Panel Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-800">
              <h2 className="text-lg font-semibold text-zinc-100 flex items-center gap-2">
                <Filter size={18} /> Detaylı Filtreleme
              </h2>
              <button onClick={() => setIsFilterOpen(false)} className="text-zinc-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Panel Body (Filtre Seçenekleri) */}
            <div className="flex-1 p-6 space-y-6 overflow-y-auto text-sm text-zinc-300">
              {/* Risk Seviyesi */}
              <div>
                <label className="block text-xs font-semibold text-zinc-500 uppercase mb-3">Risk Seviyesi</label>
                <div className="space-y-2">
                  {['Düşük Risk (0.0 - 0.3)', 'Orta Risk (0.3 - 0.6)', 'Yüksek Risk (0.6+)'].map((risk, i) => (
                    <label key={i} className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-emerald-500 focus:ring-emerald-500/20 focus:ring-offset-zinc-950" />
                      <span className="group-hover:text-white transition-colors">{risk}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Gecikme Süresi */}
              <div>
                <label className="block text-xs font-semibold text-zinc-500 uppercase mb-3">Gecikme Süresi (Gün)</label>
                <div className="flex items-center gap-2">
                  <input type="number" placeholder="Min" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50" />
                  <span className="text-zinc-600">-</span>
                  <input type="number" placeholder="Max" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50" />
                </div>
              </div>

              {/* Açık Pozisyon Tutarı */}
              <div>
                <label className="block text-xs font-semibold text-zinc-500 uppercase mb-3">Açık Pozisyon (TL)</label>
                <div className="flex items-center gap-2">
                  <input type="number" placeholder="Min TL" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50" />
                  <span className="text-zinc-600">-</span>
                  <input type="number" placeholder="Max TL" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50" />
                </div>
              </div>
            </div>

            {/* Panel Footer (Butonlar) */}
            <div className="p-6 border-t border-zinc-800 flex gap-3 bg-zinc-950/50">
              <button className="flex-1 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-lg border border-zinc-700 transition-colors font-medium">Temizle</button>
              <button className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors font-medium">Uygula</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

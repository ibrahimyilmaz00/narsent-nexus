import React, { useState, useRef } from 'react';
import { ListChecks, X, Send, ShieldAlert, ArrowRight, ChevronDown, ChevronUp, Loader2, CheckCircle } from 'lucide-react';
import { dashboardData } from '../data/mockData';

interface BatchDeploymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  checkedSteps: string[];
  onDeploy: () => void;
}

export const BatchDeploymentModal: React.FC<BatchDeploymentModalProps> = ({ isOpen, onClose, checkedSteps, onDeploy }) => {
  const [expandedStepId, setExpandedStepId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null); // YENİ: Sayacı tutacak referans

  if (!isOpen) return null;

  const affectedAccountIds = [...new Set(checkedSteps.map(id => id.split('-')[0]))];
  const affectedAccounts = dashboardData.accounts.filter(acc => affectedAccountIds.includes(acc.id));

  const toggleExpand = (id: string) => {
    setExpandedStepId(prev => prev === id ? null : id);
  };

  // YENİ: Gerçekçi Yükleme ve Başarı Akışı
  const handleDeployProcess = () => {
    setIsProcessing(true);
    
    // 1.5 saniye yapay işlem süresi (Backend simülasyonu)
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      // YENİ: Sayacı timerRef içine alıyoruz ki iptal edebilelim
      timerRef.current = setTimeout(() => {
        setIsSuccess(false); // Bir sonraki açılış için resetle
        onDeploy(); // Üst component'e haber ver
        onClose(); // Modalı kapat
      }, 2500);
      
    }, 1500);
  };

  // YENİ: Başarı ekranında geri sayımı iptal etme fonksiyonu
  const handleCancelSuccess = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current); // Zamanlayıcıyı durdur
    }
    setIsSuccess(false); // Başarı ekranını kapat, onay ekranına geri dön
  };

  const handleClose = () => {
    if (isProcessing) return; // İşlem sürerken kapatmayı engelle
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 sm:p-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] relative">
        
        {/* BAŞARI DURUMU (SUCCESS STATE) */}
        {isSuccess ? (
          <div className="p-12 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-300">
            <div className="w-24 h-24 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-6 relative">
              <div className="absolute inset-0 border-4 border-emerald-500/30 rounded-full animate-ping"></div>
              <CheckCircle size={48} className="relative z-10" />
            </div>
            <h3 className="text-2xl font-black text-zinc-100 mb-3 tracking-tight">Operasyon Başlatıldı!</h3>
            <p className="text-sm text-zinc-400 mb-8 max-w-md">
              Seçilen <strong className="text-zinc-200">{checkedSteps.length}</strong> iş emri onaylandı ve ilgili departmanların Kanban panosuna başarıyla iletildi.
            </p>
            <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden max-w-xs mb-5">
              <div className="bg-emerald-500 h-full w-full animate-[shrink_2.5s_linear_forwards]" style={{ animation: "shrink 2.5s linear forwards" }}></div>
            </div>
            
            {/* YENİ: Yönlendirme ve İptal Et (Undo) Alanı */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest">Yönlendiriliyorsunuz...</span>
              <span className="text-zinc-700 text-xs">•</span>
              <button 
                onClick={handleCancelSuccess}
                className="text-[10px] text-zinc-400 hover:text-red-400 uppercase tracking-widest font-bold transition-colors border-b border-transparent hover:border-red-400 pb-0.5 cursor-pointer z-20 relative"
              >
                İptal Et (Geri Al)
              </button>
            </div>
          </div>
        ) : (
          /* NORMAL DURUM (ÖZET EKRANI) */
          <>
            {/* Header */}
            <div className="p-6 border-b border-zinc-800/80 bg-zinc-900/30 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-500/10 rounded-xl">
                  <ListChecks size={20} className="text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-zinc-100">Toplu Operasyon Onayı</h3>
                  <p className="text-xs text-zinc-400">Aşağıdaki iş emirleri doğrudan departmanların Kanban panolarına iletilecektir.</p>
                </div>
              </div>
              <button onClick={handleClose} disabled={isProcessing} className="p-2 text-zinc-500 hover:text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg transition-colors disabled:opacity-50">
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto custom-scrollbar flex-1 bg-zinc-950">
              
              {/* Özet Kartları */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl">
                  <div className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Seçilen İş Emri</div>
                  <div className="text-2xl font-black text-blue-400">{checkedSteps.length} <span className="text-sm font-medium text-zinc-500">Adet</span></div>
                </div>
                <div className="bg-emerald-950/20 border border-emerald-900/30 p-4 rounded-xl">
                  <div className="text-xs text-emerald-500/70 font-bold uppercase tracking-widest mb-1">Etkilenen Hesap</div>
                  <div className="text-2xl font-black text-emerald-400">{affectedAccountIds.length} <span className="text-sm font-medium text-emerald-500/50">Firma</span></div>
                </div>
              </div>

              <div className="space-y-4">
                {/* Dinamik Hesap ve Görev Listesi */}
                {affectedAccounts.map(account => (
                  <div key={account.id} className="p-4 bg-zinc-900/30 border border-zinc-800 rounded-xl mb-4">
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-800/50">
                      <div className="flex items-center gap-2">
                        <div className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase border ${
                          account.tier === 1 ? 'text-red-400 bg-red-500/10 border-red-500/20' : 
                          account.tier === 2 ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' : 
                          'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                        }`}>
                          TIER {account.tier}
                        </div>
                        <h4 className="text-sm font-bold text-zinc-200">Hesap {account.id} ({account.name})</h4>
                      </div>
                      <div className="text-xs font-bold text-zinc-500 hidden sm:block">{account.exposure} Risk</div>
                    </div>
                    
                    <ul className="space-y-2.5">
                      {account.steps?.filter(step => checkedSteps.includes(step.id)).map(step => (
                        <li key={step.id} className="bg-zinc-950/80 rounded-lg border border-zinc-800/50 overflow-hidden">
                          
                          {/* Tıklanabilir Başlık Alanı */}
                          <div 
                            onClick={() => toggleExpand(step.id)}
                            className="p-3 flex items-center justify-between hover:bg-zinc-900/80 transition-colors cursor-pointer"
                          >
                            <div className="flex items-center gap-2.5 pr-2">
                              <ArrowRight size={12} className="text-blue-500 shrink-0" />
                              <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">{step.day}</span>
                              <span className="text-xs text-zinc-300 font-medium">{step.title}</span>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                              <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded uppercase hidden sm:block">Dağıtıma Hazır</span>
                              {expandedStepId === step.id ? <ChevronUp size={14} className="text-zinc-500"/> : <ChevronDown size={14} className="text-zinc-500"/>}
                            </div>
                          </div>

                          {/* Detay İçeriği (Accordion) */}
                          {expandedStepId === step.id && (
                            <div className="p-3 bg-zinc-900/30 border-t border-zinc-800/50">
                              <div className="text-[11px] text-zinc-400 leading-relaxed italic border-l-2 border-blue-500/30 pl-3 py-1">
                                "{step.aiInstruction}"
                              </div>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* YENİ: İNTERAKTİF FOOTER */}
            <div className="p-5 border-t border-zinc-800 bg-zinc-900/50 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 text-xs text-amber-500/80 bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20">
                <ShieldAlert size={14} /> Bu işlem geri alınamaz.
              </div>
              <div className="flex items-center gap-3">
                <button onClick={handleClose} disabled={isProcessing} className="px-5 py-2.5 text-sm font-medium text-zinc-400 hover:text-white transition-colors disabled:opacity-50">
                  İptal
                </button>
                <button 
                  onClick={handleDeployProcess} 
                  disabled={isProcessing || checkedSteps.length === 0} 
                  className="w-[200px] py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-900/50 disabled:text-emerald-500/50 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-900/20 transition-all flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <><Loader2 size={16} className="animate-spin" /> Şifreleniyor...</>
                  ) : (
                    <><Send size={16} /> Operasyonu Başlat</>
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

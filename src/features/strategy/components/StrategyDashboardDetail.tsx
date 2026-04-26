import React, { useState } from 'react';
import OmnichannelActionModal from '../../actions/components/OmnichannelActionModal';
import { dashboardData } from '../data/mockData';
import { Send, Target, Layers, Sparkles, X, ChevronDown, ChevronUp, ArrowLeft, Activity, AlertTriangle, TrendingUp, Wallet, PieChart, Scale, ShieldAlert, CheckCircle2, Circle, EyeOff, Play, Eye, CheckSquare, Square, Settings2, SlidersHorizontal, Cpu, Link, CalendarClock, LineChart, Zap, Flame, Users, FileStack, BrainCircuit, HeartHandshake, TrendingDown, Filter, LayoutGrid, Info, ListChecks } from 'lucide-react';
import { BatchDeploymentModal } from './BatchDeploymentModal';

interface Props {
  reportId: string;
  onBack: () => void;
}

export const StrategyDashboardDetail = ({ reportId, onBack }: Props) => {
  const [expandedAccount, setExpandedAccount] = useState<string | null>(null);
  const [drawerScenarioId, setDrawerScenarioId] = useState<number | null>(null);
  const [previewStepId, setPreviewStepId] = useState<string | null>(null);

  // Hangi adımların (taskların) seçili olduğunu tutan state
  const [checkedSteps, setCheckedSteps] = useState<string[]>(['0095-s1', '0095-s2', '0095-s3', '0095-s4', '0095-s5']);

  // Modal yönetimi (Artık hesabın tamamı için değil, spesifik bir ADIM için açılacak)
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [selectedStepForAction, setSelectedStepForAction] = useState<any>(null);
  const [activeAccountContext, setActiveAccountContext] = useState<any>(null); // Modala hesap bilgisini geçmek için
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);

  const toggleStep = (stepId: string) => {
    setCheckedSteps(prev => prev.includes(stepId) ? prev.filter(id => id !== stepId) : [...prev, stepId]);
  };
  return (
    <>
      <div className="w-full min-h-screen bg-zinc-950 p-6 sm:p-8 animate-in fade-in slide-in-from-right-4 duration-300">

        {/* NAVİGASYON VE BAŞLIK */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-zinc-800/50 pb-6">
          <div>
            <button onClick={onBack} className="flex items-center gap-2 text-zinc-400 hover:text-white mb-4 transition-colors text-xs font-bold uppercase tracking-wider">
              <ArrowLeft size={14} /> Rapor Arşivine Dön
            </button>
            <h1 className="text-2xl font-bold text-zinc-50 tracking-tight flex items-center gap-3">
              <PieChart className="text-blue-500" size={24} />
              Portföy Optimizasyon Raporu
            </h1>
          </div>
          <div className="flex items-center gap-3 bg-zinc-900/50 border border-zinc-800 px-4 py-2 rounded-xl">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-xs text-zinc-400 font-medium">İşlem Kodu: <span className="text-zinc-200">{reportId}</span></span>
          </div>
        </div>

        {/* AI YÖNETİCİ ÖZETİ (Executive Summary) */}
        <div className="mb-8 relative overflow-hidden rounded-2xl bg-indigo-900/10 border border-indigo-500/20 p-6 sm:p-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          <div className="flex items-start gap-4 relative z-10">
            <div className="p-3 bg-indigo-500/20 rounded-xl shrink-0">
              <Sparkles className="text-indigo-400" size={24} />
            </div>
            <div>
              <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3">Yönetici Özeti (AI Insight)</h3>
              <p className="text-zinc-200 leading-relaxed font-medium text-sm sm:text-base">
                {dashboardData.executiveSummary}
              </p>
            </div>
          </div>
        </div>

        {/* GÖRSELLEŞTİRİLMİŞ KPI KARTLARI (4'LÜ GRID) */}
        <div className="mb-10">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Portföy Nabzı & Likidite</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Metrik 1: Portfolio Risk (Barlı) */}
            <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-xl flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-zinc-400">Kompozit Risk Skoru</span>
                <Activity size={16} className="text-amber-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-3">{dashboardData.metrics.portfolioRisk}</div>
              <div className="w-full bg-zinc-950 rounded-full h-1.5 border border-zinc-800/50">
                <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: `${dashboardData.metrics.portfolioRisk * 100}%` }}></div>
              </div>
            </div>

            {/* Metrik 2: Geç Ödeme Oranı (Barlı) */}
            <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-xl flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-zinc-400">Geç Ödeme Oranı</span>
                <AlertTriangle size={16} className="text-red-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-3">%{dashboardData.metrics.latePaymentPct}</div>
              <div className="w-full bg-zinc-950 rounded-full h-1.5 border border-zinc-800/50">
                <div className="bg-red-500 h-1.5 rounded-full" style={{ width: `${dashboardData.metrics.latePaymentPct}%` }}></div>
              </div>
            </div>

            {/* Metrik 3: Toplam Risk vs Tahmin */}
            <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-xl flex flex-col justify-between lg:col-span-2 relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none"><Wallet size={120} className="-mr-10 -mb-10" /></div>
              <div className="flex items-center justify-between mb-4 relative z-10">
                <span className="text-xs font-medium text-zinc-400">Açık Pozisyon vs 12H Tahmin</span>
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1"><TrendingUp size={14} /> {dashboardData.metrics.trend}</span>
              </div>
              <div className="flex items-end gap-6 relative z-10">
                <div>
                  <div className="text-2xl font-bold text-white mb-1">{dashboardData.metrics.forecast12w}</div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest">12 Haftalık Nakit Girişi</div>
                </div>
                <div className="h-10 w-px bg-zinc-800 hidden sm:block"></div>
                <div className="hidden sm:block">
                  <div className="text-lg font-bold text-zinc-400 mb-1">{dashboardData.metrics.totalExposure}</div>
                  <div className="text-[10px] text-zinc-600 uppercase tracking-widest">Toplam Açık Risk</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* SENARYO ANALİZİ VE AKSİYON MEKANİZMASI */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <Scale size={16} /> Stratejik Senaryo Karşılaştırması
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {dashboardData.scenarios.map((scenario) => (
              <div key={scenario.id} className={`flex flex-col p-6 rounded-2xl border ${scenario.isRecommended ? 'bg-blue-900/10 border-blue-500/40 relative overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.1)]' : 'bg-zinc-900/30 border-zinc-800'}`}>

                {scenario.isRecommended && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-bl-lg uppercase tracking-wider flex items-center gap-1">
                    <Sparkles size={12} /> AI Önerisi
                  </div>
                )}

                <h4 className={`text-lg font-bold mb-2 ${scenario.isRecommended ? 'text-blue-400' : 'text-zinc-300'}`}>{scenario.name}</h4>
                <p className="text-sm text-zinc-400 leading-relaxed mb-6 flex-1">{scenario.description}</p>

                {/* Metrikler */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center p-3 bg-zinc-950/50 rounded-lg border border-zinc-800/50">
                    <span className="text-xs text-zinc-500 font-medium">Beklenen Kurtarım</span>
                    <span className="text-sm font-bold text-emerald-400">{scenario.expected_recovery_tl}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-zinc-950/50 rounded-lg border border-zinc-800/50">
                    <span className="text-xs text-zinc-500 font-medium">Hedef Süre</span>
                    <span className="text-sm font-bold text-zinc-300">{scenario.timeframe}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-950/20 rounded-lg border border-red-900/30">
                    <span className="text-xs text-red-500/70 font-medium flex items-center gap-1"><ShieldAlert size={12} /> Müşteri Kaybı Riski</span>
                    <div className="text-right">
                      <div className="text-sm font-bold text-red-400">{scenario.client_loss_risk}</div>
                      <div className="text-[10px] text-zinc-500 mt-0.5">{scenario.cost}</div>
                    </div>
                  </div>
                </div>

                {/* AKSİYON BUTONLARI */}
                <div className="space-y-2">
                  <button
                    onClick={() => setDrawerScenarioId(scenario.id)}
                    className="w-full py-3 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-xl text-sm font-bold transition-all border border-zinc-700 flex justify-center items-center gap-2"
                  >
                    <Eye size={16} /> Operasyon Planını İncele
                  </button>
                  {scenario.isRecommended ? (
                    <button className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-900/20 flex justify-center items-center gap-2 group">
                      <Play size={16} className="fill-current group-hover:scale-110 transition-transform" />
                      Stratejiyi Onayla ve İş Emirlerini Dağıt
                    </button>
                  ) : (
                    <button className="w-full py-3.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 rounded-xl text-sm font-bold transition-all border border-zinc-700">
                      Bu Senaryoyu Seç
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FİNANSAL ETKİ VE OPERASYONEL YÜK (ROI & INACTION COST) */}
        <div className="mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* Sol: Eylemsizlik Maliyeti (Kanama) */}
            <div className="bg-red-950/20 border border-red-900/50 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 opacity-10 text-red-500"><Flame size={120} /></div>
              <div className="flex items-center gap-3 mb-2 relative z-10">
                <div className="p-2 bg-red-500/20 rounded-lg"><Flame size={18} className="text-red-400" /></div>
                <h4 className="text-sm font-bold text-red-400 uppercase tracking-widest">Haftalık İnaksiyon Maliyeti</h4>
              </div>
              <p className="text-xs text-red-300/70 mb-4 relative z-10">Sistemdeki önerilen aksiyonların alınmaması durumunda, portföyün her hafta uğradığı finansman yükü kaybı.</p>
              <div className="text-3xl sm:text-4xl font-black text-red-400 mb-1 relative z-10">{dashboardData.impactAnalysis.inactionCostWeekly}</div>
              <div className="text-xs font-bold text-red-500 bg-red-950 px-2 py-1 rounded inline-block relative z-10 border border-red-900/50">Acil Müdahale Öneriliyor</div>
            </div>

            {/* Sağ: Operasyonel Dağılım ve Fatura Yükü */}
            <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-zinc-200 flex items-center gap-2"><Users size={16} className="text-blue-400" /> Departman İş Yükü Dağılımı</h4>
                <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-400 bg-zinc-950 px-2 py-1 rounded border border-zinc-800">
                  <FileStack size={12} className="text-indigo-400" /> {dashboardData.impactAnalysis.totalInvoicesAffected} Fatura
                </div>
              </div>

              <div className="space-y-3">
                {dashboardData.impactAnalysis.departmentLoad.map((dept, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-zinc-950/50 rounded-xl border border-zinc-800/50">
                    <div>
                      <div className="text-sm font-bold text-zinc-200">{dept.dept}</div>
                      <div className="text-[10px] text-zinc-500 uppercase tracking-widest">{dept.label}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-black text-blue-400">{dept.taskCount}</span>
                      <span className="text-[10px] font-bold text-zinc-600 uppercase">İş Emri</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* STRATEJİK RİSK VE KURTARIM HUNİSİ */}
        <div className="mb-10 p-8 bg-zinc-900/20 border border-zinc-800/80 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5"><Filter size={200} /></div>

          <div className="flex flex-col lg:flex-row gap-12 relative z-10">

            {/* SOL: KURTARIM HUNİSİ (WATERFALL) */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-8">
                <div className="p-2 bg-blue-500/10 rounded-lg"><Filter size={18} className="text-blue-400" /></div>
                <h4 className="text-sm font-bold text-zinc-200 uppercase tracking-widest">Risk & Kurtarım Hunisi (Waterfall)</h4>
              </div>

              <div className="space-y-8">
                {dashboardData.recoveryAnalysis.funnel.map((item, idx) => (
                  <div key={idx} className="relative">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-xs font-bold text-zinc-400 uppercase">{item.label}</span>
                      <span className="text-lg font-black text-zinc-200">{item.value}</span>
                    </div>
                    <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all duration-1000 delay-300`}
                        style={{ width: item.width }}
                      ></div>
                    </div>
                    {idx < 2 && (
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-zinc-700">
                        <ChevronDown size={16} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* SAĞ: RİSK MATRİSİ (ACTION MAP) */}
            <div className="w-full lg:w-[400px]">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-amber-500/10 rounded-lg"><LayoutGrid size={18} className="text-amber-400" /></div>
                  <h4 className="text-sm font-bold text-zinc-200 uppercase tracking-widest">Portföy Aksiyon Haritası</h4>
                </div>
                <Info size={14} className="text-zinc-600" />
              </div>

              {/* Simple Bubble Chart Representation */}
              <div className="h-[220px] w-full border-l border-b border-zinc-800 relative flex items-end justify-start p-4">
                <span className="absolute -left-8 top-1/2 -rotate-90 text-[10px] font-bold text-zinc-600 uppercase tracking-tighter text-center">Açık Pozisyon (M)</span>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-zinc-600 uppercase tracking-tighter">Gecikme Süresi (Gün)</span>

                {dashboardData.recoveryAnalysis.matrix.map((point) => (
                  <div
                    key={point.id}
                    className={`absolute rounded-full border flex items-center justify-center text-[8px] font-black transition-all hover:scale-125 cursor-help ${point.risk > 0.4 ? 'bg-red-500/20 border-red-500/50 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.2)]' :
                        point.risk > 0.3 ? 'bg-amber-500/20 border-amber-500/50 text-amber-400' :
                          'bg-blue-500/20 border-blue-500/50 text-blue-400'
                      }`}
                    style={{
                      left: `${((point.x - 600) / 300) * 80 + 10}%`,
                      bottom: `${((point.y - 8) / 12) * 80 + 10}%`,
                      width: `${point.risk * 80}px`,
                      height: `${point.risk * 80}px`
                    }}
                  >
                    {point.label}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* DERİN ANALİZ VE SİSTEM LOGLARI */}
        <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <LineChart size={16} /> Sistem Analizi & Finansal Projeksiyon
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

            {/* AI Tetikleyici Logu (Neden Çalıştı?) */}
            <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -right-4 -top-4 opacity-5"><Cpu size={100} /></div>
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-blue-500/10 rounded-lg"><Zap size={16} className="text-blue-400" /></div>
                  <h4 className="text-sm font-bold text-zinc-200">AI Tetikleyici Koşul</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-zinc-800/50 pb-2">
                    <span className="text-xs text-zinc-500 font-medium">Kural Seti</span>
                    <span className="text-xs font-bold text-blue-400">{dashboardData.pipelineDetails.triggerLog}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-zinc-800/50 pb-2">
                    <span className="text-xs text-zinc-500 font-medium">AI Güven Skoru</span>
                    <span className="text-xs font-bold text-zinc-300">{dashboardData.pipelineDetails.confidence}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-zinc-500 font-medium">Aciliyet Durumu</span>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded uppercase">{dashboardData.pipelineDetails.urgency}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Nakit Akış Projeksiyonu (1H, 1A, 3A) */}
            <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute -right-4 -top-4 opacity-5"><CalendarClock size={100} /></div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-emerald-500/10 rounded-lg"><Wallet size={16} className="text-emerald-400" /></div>
                <h4 className="text-sm font-bold text-zinc-200">Net Nakit Projeksiyonu</h4>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-zinc-950/50 p-2.5 rounded-lg border border-zinc-800/50">
                  <span className="text-xs text-zinc-500 font-medium">Haftalık Beklenti</span>
                  <span className="text-sm font-bold text-emerald-400">{dashboardData.pipelineDetails.cashFlow.weekly}</span>
                </div>
                <div className="flex justify-between items-center bg-zinc-950/50 p-2.5 rounded-lg border border-zinc-800/50">
                  <span className="text-xs text-zinc-500 font-medium">1 Aylık (M) Beklenti</span>
                  <span className="text-sm font-bold text-emerald-400">{dashboardData.pipelineDetails.cashFlow.monthly}</span>
                </div>
                <div className="flex justify-between items-center bg-zinc-950/50 p-2.5 rounded-lg border border-zinc-800/50">
                  <span className="text-xs text-zinc-500 font-medium">3 Aylık (3M) Beklenti</span>
                  <span className="text-sm font-bold text-emerald-400">{dashboardData.pipelineDetails.cashFlow.quarterly}</span>
                </div>
              </div>
            </div>

            {/* Portföy Uç Değerleri (Weakest vs Strongest) */}
            <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute -right-4 -top-4 opacity-5"><Link size={100} /></div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-amber-500/10 rounded-lg"><AlertTriangle size={16} className="text-amber-400" /></div>
                <h4 className="text-sm font-bold text-zinc-200">Portföy Uç Değerleri</h4>
              </div>
              <div className="flex flex-col gap-4 h-[calc(100%-40px)] justify-center">
                <div>
                  <div className="text-xs text-zinc-500 uppercase tracking-widest mb-1">En Zayıf Kurtarım Potansiyeli</div>
                  <div className="text-xl font-bold text-red-400">{dashboardData.pipelineDetails.weakestLink}</div>
                </div>
                <div className="w-full h-px bg-zinc-800/50"></div>
                <div>
                  <div className="text-xs text-zinc-500 uppercase tracking-widest mb-1">En Güçlü Kurtarım Potansiyeli</div>
                  <div className="text-xl font-bold text-blue-400">{dashboardData.pipelineDetails.strongestLink}</div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* SAĞDAN AÇILIR ÇEKMECE (DRAWER) - OPERASYON PLANI */}
      {drawerScenarioId !== null && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-in fade-in duration-200"
            onClick={() => { setDrawerScenarioId(null); setExpandedAccount(null); }}
          />

          {/* Drawer Panel */}
          <div className="fixed top-0 right-0 h-full w-full max-w-2xl bg-zinc-950 border-l border-zinc-800 z-50 flex flex-col animate-in slide-in-from-right duration-300">

            {/* Drawer Header */}
            <div className="sticky top-0 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800 p-6 flex items-center justify-between z-10">
              <div>
                <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
                  <Layers size={20} className="text-blue-500" />
                  Senaryo {drawerScenarioId} — Operasyon Planı
                </h2>
                <p className="text-xs text-zinc-500 mt-1">Onay verildiğinde aşağıdaki hesaplar için otomatik iş emirleri oluşturulacaktır.</p>
              </div>
              <button
                onClick={() => { setDrawerScenarioId(null); setExpandedAccount(null); }}
                className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Drawer Body — Hesap Listesi */}
            <div className="p-6 space-y-4 flex-1 overflow-y-auto">
              {dashboardData.accounts.map((account) => (
                <div key={account.id} className="bg-zinc-900/40 border border-zinc-800 rounded-xl overflow-hidden transition-all hover:border-zinc-700">
                  {/* Ana Kart Görünümü */}
                  <div
                    onClick={() => setExpandedAccount(expandedAccount === account.id ? null : account.id)}
                    className="p-5 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`flex flex-col items-center justify-center w-11 h-11 rounded-lg border ${account.tier === 1 ? 'bg-red-500/10 border-red-500/30 text-red-400' :
                          account.tier === 2 ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' :
                            'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                        }`}>
                        <span className="text-[9px] font-bold uppercase opacity-80">Kademe</span>
                        <span className="text-base font-black leading-none">{account.tier}</span>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm font-bold text-zinc-200">Hesap {account.id}</h4>
                          <span className="px-1.5 py-0.5 bg-zinc-800 text-zinc-400 text-[9px] font-bold rounded">{account.riskBucket}</span>
                          <span className="text-[11px] text-red-400 font-medium">{account.overdue} Gün</span>
                        </div>
                        <div className="text-xs text-blue-400 font-medium flex items-center gap-1">
                          <Target size={12} /> {account.actionType}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-5">
                      <div className="text-right hidden sm:block">
                        <div className="text-[10px] text-zinc-500 font-medium mb-0.5">Pozisyon</div>
                        <div className="text-xs font-bold text-zinc-300">{account.exposure}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-emerald-500/70 font-medium mb-0.5">Kurtarım</div>
                        <div className="text-xs font-bold text-emerald-400">{account.expectedRecovery}</div>
                      </div>
                      <div className="text-zinc-500">
                        {expandedAccount === account.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </div>
                    </div>
                  </div>

                  {/* ESKALASYON ADIMLARI VE GEREKÇELER */}
                  {expandedAccount === account.id && (
                    <div className="bg-zinc-950/90 p-4 sm:p-5">

                      {/* STRATEJİK GEREKÇE VE İLİŞKİ NOTU (AI REASONING) */}
                      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-3">
                        {/* Finansal Gerekçe */}
                        <div className="bg-red-950/20 border border-red-900/30 p-4 rounded-xl">
                          <div className="flex items-center gap-1.5 mb-2.5">
                            <TrendingDown size={14} className="text-red-400" />
                            <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest">Finansal Gerekçe</span>
                          </div>
                          <p className="text-xs text-zinc-300 leading-relaxed font-medium">
                            {account.financialRationale || "Bu hesap için inaksiyon maliyeti kritik eşiktedir."}
                          </p>
                        </div>

                        {/* İlişki Notu */}
                        <div className="bg-blue-950/20 border border-blue-900/30 p-4 rounded-xl">
                          <div className="flex items-center gap-1.5 mb-2.5">
                            <HeartHandshake size={14} className="text-blue-400" />
                            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Ticari İlişki Notu</span>
                          </div>
                          <p className="text-xs text-zinc-300 leading-relaxed font-medium">
                            {account.relationshipNote || "Hesap geçmişi ve ticari değer göz önüne alınarak iletişim kurulmalıdır."}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-4 mt-2">
                        <BrainCircuit size={14} className="text-zinc-400" />
                        <h5 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Tavsiye Edilen Operasyon Adımları</h5>
                      </div>

                      {/* Görev Listesi (Mevcut kodun aynen kalacak) */}
                      <div className="space-y-2.5 mb-6">
                        {account.steps?.map((step: any) => {
                          const isChecked = checkedSteps.includes(step.id);
                          const isPreviewOpen = previewStepId === step.id;

                          return (
                            <div key={step.id} className={`flex flex-col p-3 sm:p-4 rounded-xl border transition-all duration-300 ${isChecked ? 'bg-zinc-900/60 border-blue-500/30' : 'bg-zinc-950/50 border-zinc-800/30 opacity-60'}`}>

                              {/* Üst Kısım: Yuvarlak Checkbox, Başlık ve Butonlar */}
                              <div className="flex items-center justify-between gap-3">

                                <div className="flex items-start gap-3 sm:gap-4 flex-1">
                                  {/* Yuvarlak Görev Onay İkonu */}
                                  <button onClick={(e) => { e.stopPropagation(); toggleStep(step.id); }} className="mt-0.5 transition-colors shrink-0 outline-none">
                                    {isChecked ? <CheckCircle2 size={20} className="text-blue-500" /> : <Circle size={20} className="text-zinc-600 hover:text-zinc-400" />}
                                  </button>

                                  <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-blue-400 mb-0.5">{step.day}</span>
                                    <span className={`text-xs sm:text-sm font-medium ${isChecked ? 'text-zinc-200' : 'text-zinc-400'}`}>
                                      {step.title}
                                    </span>
                                  </div>
                                </div>

                                {/* Sağ Taraf: Aksiyon Butonları */}
                                <div className="flex items-center gap-2 shrink-0">

                                  {/* İçeriği (Taslağı) Gör Butonu */}
                                  <button
                                    onClick={(e) => { e.stopPropagation(); setPreviewStepId(isPreviewOpen ? null : step.id); }}
                                    className={`p-2 rounded-lg transition-colors border ${isPreviewOpen ? 'bg-indigo-500/20 border-indigo-500/30 text-indigo-400' : 'bg-zinc-900 border-zinc-800/50 text-zinc-400 hover:text-white'}`}
                                    title="AI İçerik Taslağını İncele"
                                  >
                                    {isPreviewOpen ? <EyeOff size={14} /> : <Eye size={14} />}
                                  </button>

                                  {/* Kanal Seçim Modalı (Aksiyon Dağıtım) Butonu */}
                                  <button
                                    disabled={!isChecked}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      setActiveAccountContext(account);
                                      setSelectedStepForAction(step);
                                      setIsActionModalOpen(true);
                                    }}
                                    className={`p-2 rounded-lg transition-colors border ${isChecked ? 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-blue-500 hover:text-white hover:border-blue-400' : 'bg-zinc-900 border-zinc-800/50 text-zinc-600 cursor-not-allowed'}`}
                                    title="Gönderim Kanalını Ayarla (Omnichannel)"
                                  >
                                    <SlidersHorizontal size={14} />
                                  </button>
                                </div>
                              </div>

                              {/* Alt Kısım: AI İçerik Önizleme (Genişletildiğinde Açılır) */}
                              {isPreviewOpen && (
                                <div className="mt-4 pl-9 pr-1 pb-1 animate-in fade-in slide-in-from-top-2 duration-200">
                                  <div className="p-4 bg-indigo-950/20 border border-indigo-500/20 rounded-xl relative">
                                    <div className="absolute -top-2.5 left-4 text-[9px] font-bold text-indigo-400 bg-zinc-950 px-2 py-0.5 border border-indigo-500/20 rounded-full flex items-center gap-1">
                                      <Sparkles size={10} /> Üretilen İçerik / Sistem Komutu
                                    </div>
                                    <p className="text-[11px] sm:text-xs text-zinc-300 font-medium leading-relaxed italic mt-1">
                                      "{step.aiInstruction}"
                                    </p>
                                  </div>
                                </div>
                              )}

                            </div>
                          );
                        })}
                      </div>

                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* DRAWER FOOTER: TOPLU DAĞITIM BUTONU */}
            <div className="p-5 border-t border-zinc-800 bg-zinc-950/95 backdrop-blur shadow-[0_-10px_30px_rgba(0,0,0,0.5)] z-20">
              <div className="flex items-center justify-between gap-4">
                <div className="hidden sm:block">
                  <div className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Operasyon Özeti</div>
                  <div className="text-sm font-medium text-zinc-300">
                    Toplam <span className="text-blue-400 font-bold">{checkedSteps.length}</span> adet iş emri dağıtıma hazır.
                  </div>
                </div>
                <button 
                  disabled={checkedSteps.length === 0}
                  onClick={() => setIsBatchModalOpen(true)}
                  className="flex-1 sm:flex-none px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2"
                >
                  <Send size={16} />
                  {checkedSteps.length > 0 ? `Seçili İş Emirlerini Dağıt (${checkedSteps.length})` : "İş Emri Seçilmedi"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* SPESİFİK ADIM İÇİN AKSİYON DAĞITIM MODALI */}
      {isActionModalOpen && selectedStepForAction && activeAccountContext && (
        <div className="relative z-[99999]">
          <OmnichannelActionModal
            isOpen={isActionModalOpen}
            onClose={() => setIsActionModalOpen(false)}
            accountId={activeAccountContext.id}
            accountName={activeAccountContext.name}
            exposure={activeAccountContext.exposure}
            aiInstruction={selectedStepForAction.aiInstruction} // Hesabın genel talimatı değil, seçili adımın özel talimatı gidiyor!
          />
        </div>
      )}
      {/* HARİCİ BİLEŞEN: TOPLU DAĞITIM MODALI */}
      <BatchDeploymentModal 
        isOpen={isBatchModalOpen}
        onClose={() => setIsBatchModalOpen(false)}
        checkedSteps={checkedSteps}
        onDeploy={() => alert("İş emirleri Kanban'a başarıyla iletildi!")}
      />
    </>
  );
};

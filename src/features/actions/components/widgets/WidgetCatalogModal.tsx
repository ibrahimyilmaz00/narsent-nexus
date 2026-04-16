"use client";

import React, { useState, useEffect } from "react";
import { 
  X, 
  ShieldAlert, 
  TrendingUp, 
  TrendingDown,
  Activity, 
  Target, 
  Clock, 
  DollarSign, 
  PieChart,
  BarChart2,
  LineChart,
  Layout,
  Radar,
  AreaChart,
  Layers,
  AlertCircle,
  Users,
  AlertTriangle,
  Calendar,
  Database,
  Info,
  ShieldCheck,
  AlertOctagon,
  Wallet,
  Flag,
  Crosshair,
  Briefcase,
  GitCompare,
  Flame
} from "lucide-react";
import { useGlobalStore } from "../../../../store/useGlobalStore";

const MODULES = [
  { id: 'module1', name: 'Modül 1: Tahsilat Riski', icon: ShieldAlert },
  { id: 'module2', name: 'Modül 2: Nakit Akışı', icon: TrendingUp },
  { id: 'module3', name: 'Modül 3: Likidite Etkisi', icon: Activity },
  { id: 'module4', name: 'Modül 4: İş Emirleri Analitiği', icon: Briefcase },
];

const METRICS: Record<string, { id: string; name: string; icon: any }[]> = {
  'module1': [
    { id: 'risk_distribution', name: 'Risk Skoru Dağılımı', icon: Target },
    { id: 'bucket_breakdown', name: 'Geç Ödeme Olasılığı (Buckets)', icon: Clock },
    { id: 'on_time_vs_late_pct', name: 'Zamanında Ödeme vs Gecikme Oranı', icon: PieChart },
    { id: 'delay_gap', name: 'Vade Aşım Farkı (Delay Gap)', icon: AlertCircle },
    { id: 'Predicted_DaysToPay', name: 'Tahmini Ödeme Günü (DTP) Analizi', icon: Activity },
    { id: 'top_late_accounts', name: 'En Çok Geciktiren Hesaplar (Top Late)', icon: TrendingDown },
    { id: 'top_risky_accounts', name: 'En Riskli Hesaplar (Top Risky)', icon: ShieldAlert },
    { id: 'High_Risk_Count', name: 'Yüksek Riskli Fatura Hacmi', icon: AlertTriangle },
    { id: 'PaymentProbability_distribution', name: 'Detaylı Olasılık Eğrisi (0-60+ Gün)', icon: TrendingUp },
    { id: 'Days_Term', name: 'Ortalama Vade (Days Term) Dağılımı', icon: Calendar },
    { id: 'tier_counts', name: 'Veri Kaynağı Güvenilirliği (Source)', icon: Database },
    { id: 'Expected_Payment_Date', name: 'Tahmini Ödeme Tarihi Projeksiyonu', icon: Clock },
    { id: 'exposure_analysis_tl', name: 'Açık Tutar ve Vade Analizi (TL)', icon: DollarSign },
    // client-side derived: AccountId + TransactionTotalAmount groupby
    { id: 'concentration_risk_new', name: 'Müşteri Yoğunlaşma Riski (Konsantrasyon)', icon: PieChart },
    { id: 'xai_params', name: 'XAI Risk Faktörleri Analizi', icon: Target },
  ],
  'module2': [
    { id: 'forecast', name: '12 Haftalık Nakit Giriş Trendi', icon: TrendingUp },
    { id: 'forecast_interval', name: 'İyimser vs Kötümser Senaryo Eğrisi', icon: Activity },
    { id: 'horizon_aggregates', name: 'Vade Bazlı Projeksiyon (1H, 1A, 3A)', icon: BarChart2 },
    { id: 'total_forecast', name: 'Toplam Beklenen Nakit (12 Hf)', icon: DollarSign },
    { id: 'historical_4w_comparison', name: 'Tarihsel Trend vs Gelecek Kıyaslaması', icon: Target },
    { id: 'tier_confidence', name: 'Tahmin Güven Skoru Analizi', icon: ShieldCheck },
    { id: 'weekly_min_max_forecast', name: 'Dip ve Zirve Hafta Analizi', icon: Activity },
    { id: 'interval_width', name: 'Tahmin Sapma Aralığı (Varyans)', icon: Layers },
    { id: 'min_confidence', name: 'Model Kesinlik Sınırı (Min Confidence)', icon: Target },
    { id: 'input_rows', name: 'İşlenen Fatura Hacmi (Data Input)', icon: Database },
  ],
  'module3': [
    { id: 'Net_Cash_Position', name: 'Ufuk Bazlı Net Nakit (W/1M/3M)', icon: DollarSign },
    { id: 'Cash_Deficit_Prob', name: 'Nakit Açığı İhtimali (Deficit Prob)', icon: Activity },
    { id: 'Net_Cash_percentiles', name: 'Monte Carlo Nakit Senaryoları (P10-P90)', icon: Layers },
    { id: 'Cash_Out_breakdown', name: 'Gider Kırılımı (OpEx vs COGS)', icon: PieChart },
    { id: 'Cash_At_Risk', name: 'Riske Atılan Nakit (VaR - %95/%99)', icon: AlertOctagon },
    { id: 'overall_risk_flag', name: 'Konsolide Risk Durum Bayrağı', icon: ShieldAlert },
    { id: 'root_cause', name: 'Kök Neden Analizi (Root Cause)', icon: Target },
    { id: 'AR_Recovery_Uplift', name: 'Tahsilat İyileşme Potansiyeli (AR Uplift)', icon: TrendingUp },
    { id: 'delay_shift_factor', name: 'Makro Gecikme Etkisi (Delay Shift)', icon: Clock },
    { id: 'uncertainty_multiplier', name: 'Belirsizlik Çarpanı (Uncertainty)', icon: AlertCircle },
    { id: 'expense_timing', name: 'Gider Zamanlaması (Expense Timing)', icon: Calendar },
    { id: 'revenue_base_weekly', name: 'Haftalık Temel Gelir (Revenue Base)', icon: BarChart2 },
    { id: 'portfolio_risk_score', name: 'Portföy Risk Skoru Etkisi', icon: Users },
    { id: 'at_risk_amount', name: 'Tehlikedeki Toplam Tutar (At Risk)', icon: AlertTriangle },
    { id: 'Forecast_Confidence', name: 'Simülasyon Güven Skoru', icon: ShieldCheck },
  ],
  'module4': [
    { id: 'm4_priority_tier', name: 'İş Emri Öncelik (Tier) Dağılımı', icon: Flame },
    { id: 'm4_action_type', name: 'Aksiyon Tipi (Action Type) Dağılımı', icon: Activity },
    { id: 'm4_weekly_cost', name: 'Hesap Bazı Haftalık İnaksiyon Maliyeti', icon: DollarSign },
    { id: 'm4_exposure_vs_recovery', name: 'Açık Tutar vs Beklenen Kurtarım', icon: GitCompare },
    { id: 'm4_risk_vs_delay', name: 'Hesap Risk Skoru ve Gecikme Analizi', icon: Crosshair },
    { id: 'm4_invoice_count', name: 'İş Emri Fatura Yoğunluğu (Count)', icon: Database },
    { id: 'm4_priority_raw', name: 'Ham Öncelik Skoru (Priority Raw) Sıralaması', icon: Layers },
    { id: 'm4_recovery_rate', name: 'Hesap Bazı Kurtarma Oranı (%)', icon: TrendingUp },
    { id: 'm4_total_exposure', name: 'Portföy Toplam Açık Pozisyonu', icon: Briefcase },
    { id: 'm4_forecast_total', name: 'Tahmini Portföy Nakit Girişi (12H / Ort)', icon: LineChart },
    { id: 'm4_weakest_strongest', name: 'En Zayıf vs En Güçlü Tahsilat Beklentisi', icon: GitCompare },
    { id: 'm4_portfolio_risk', name: 'Portföy Ağırlıklı Risk ve Geç Ödeme (%)', icon: ShieldAlert },
    { id: 'm4_net_cash_horizon', name: 'Portföy Net Nakit Ufku (Hafta/Ay/3Ay)', icon: Wallet },
    { id: 'm4_confidence_urgency', name: 'Pipeline AI Güven Skoru ve Aciliyet', icon: ShieldCheck },
    { id: 'm4_overall_flag', name: 'Genel Portföy Sağlık Bayrağı', icon: Flag },
    { id: 'm4_scenario_recovery', name: 'Senaryo Bazı Beklenen Kurtarma (Kademeli vs Agresif)', icon: BarChart2 },
    { id: 'm4_churn_risk', name: 'Senaryo Bazı Müşteri Kaybı (Churn) Riski', icon: Users },
    { id: 'm4_discount_vs_legal', name: 'İskonto Maliyeti vs Hukuki İcra Maliyeti', icon: AlertTriangle },
  ]
};

// Metrik → desteklenen grafik türleri uyumluluk haritası
const CHART_COMPATIBILITY: Record<string, string[]> = {
  // --- MODÜL 1: TAHSİLAT RİSKİ (Eksiksiz JSON Şeması) ---
  'risk_distribution': ['Pie Chart', 'Bar Chart'],
  'bucket_breakdown': ['Pie Chart', 'Bar Chart'],
  'on_time_vs_late_pct': ['Pie Chart'],
  'delay_gap': ['KPI Card', 'Line Chart'],
  'Predicted_DaysToPay': ['Bar Chart', 'Line Chart'],
  'top_late_accounts': ['Bar Chart'],
  'top_risky_accounts': ['Bar Chart', 'Radar Chart'],
  'High_Risk_Count': ['KPI Card', 'Bar Chart'],
  'PaymentProbability_distribution': ['Line Chart', 'Area Chart'],
  'Days_Term': ['Bar Chart'],
  'tier_counts': ['Pie Chart'],
  'Expected_Payment_Date': ['Line Chart'],
  'exposure_analysis_tl': ['Bar Chart', 'Line Chart'],
  'concentration_risk_new': ['Pie Chart', 'Bar Chart'],
  'xai_params': ['Radar Chart', 'Bar Chart'],

  // --- MODÜL 2: NAKİT AKIŞI TAHMİNİ (Eksiksiz JSON Şeması) ---
  'forecast': ['Line Chart', 'Bar Chart'],
  'forecast_interval': ['Area Chart', 'Line Chart'],
  'horizon_aggregates': ['Bar Chart'],
  'total_forecast': ['KPI Card'],
  'historical_4w_comparison': ['Bar Chart', 'KPI Card'],
  'tier_confidence': ['Line Chart', 'Radar Chart'],
  'weekly_min_max_forecast': ['Bar Chart'],
  'interval_width': ['Bar Chart', 'KPI Card'],
  'min_confidence': ['KPI Card'],
  'input_rows': ['KPI Card'],

  // --- MODÜL 3: LİKİDİTE ETKİSİ (Eksiksiz JSON Şeması) ---
  'Net_Cash_Position': ['Bar Chart', 'Line Chart'],
  'Cash_Deficit_Prob': ['Bar Chart', 'Pie Chart', 'KPI Card'],
  'Net_Cash_percentiles': ['Area Chart', 'Line Chart'],
  'Cash_Out_breakdown': ['Pie Chart', 'Bar Chart'],
  'Cash_At_Risk': ['Bar Chart', 'KPI Card'],
  'overall_risk_flag': ['KPI Card'],
  'root_cause': ['Pie Chart', 'Bar Chart'],
  'AR_Recovery_Uplift': ['Bar Chart', 'KPI Card'],
  'delay_shift_factor': ['KPI Card', 'Line Chart'],
  'uncertainty_multiplier': ['KPI Card', 'Radar Chart'],
  'expense_timing': ['Pie Chart'],
  'revenue_base_weekly': ['Line Chart', 'KPI Card'],
  'portfolio_risk_score': ['Radar Chart', 'Bar Chart'],
  'at_risk_amount': ['KPI Card', 'Bar Chart'],
  'Forecast_Confidence': ['KPI Card'],

  // --- MODÜL 4: İŞ EMİRLERİ ANALİTİĞİ VE STRATEJİ (Action Engine) ---
  'm4_priority_tier': ['Pie Chart', 'Bar Chart'],
  'm4_action_type': ['Bar Chart', 'Pie Chart'],
  'm4_weekly_cost': ['Bar Chart', 'Line Chart'],
  'm4_exposure_vs_recovery': ['Area Chart', 'Bar Chart'],
  'm4_risk_vs_delay': ['Bar Chart'],
  'm4_invoice_count': ['Pie Chart', 'Bar Chart'],
  'm4_priority_raw': ['Bar Chart'],
  'm4_recovery_rate': ['Line Chart', 'Bar Chart'],
  'm4_total_exposure': ['KPI Card', 'Bar Chart'],
  'm4_forecast_total': ['KPI Card', 'Line Chart'],
  'm4_weakest_strongest': ['Bar Chart'],
  'm4_portfolio_risk': ['Radar Chart', 'KPI Card'],
  'm4_net_cash_horizon': ['Bar Chart', 'Area Chart'],
  'm4_confidence_urgency': ['KPI Card', 'Radar Chart'],
  'm4_overall_flag': ['KPI Card'],
  'm4_scenario_recovery': ['Bar Chart', 'Area Chart'],
  'm4_churn_risk': ['Line Chart', 'Bar Chart'],
  'm4_discount_vs_legal': ['Pie Chart', 'Bar Chart'],
};

const CHART_TYPES = [
  { id: 'Pie Chart', name: 'Pie Chart', subtitle: '(Pasta Grafiği)', icon: PieChart, colorClass: 'text-purple-400' },
  { id: 'Bar Chart', name: 'Bar Chart', subtitle: '(Sütun Grafiği)', icon: BarChart2, colorClass: 'text-emerald-400' },
  { id: 'Line Chart', name: 'Line Chart', subtitle: '(Çizgi Grafiği)', icon: LineChart, colorClass: 'text-blue-400' },
  { id: 'KPI Card', name: 'KPI Kartı', subtitle: '(Özet Metrik)', icon: Layout, colorClass: 'text-orange-400' },
  { id: 'Radar Chart', name: 'Radar Chart', subtitle: '(Örümcek Ağı)', icon: Radar, colorClass: 'text-pink-400' },
  { id: 'Area Chart', name: 'Area Chart', subtitle: '(Alan Grafiği)', icon: AreaChart, colorClass: 'text-cyan-400' },
];

export default function WidgetCatalogModal() {
  const setWidgetModalOpen = useGlobalStore((state) => state.setWidgetModalOpen);
  const addWidget = useGlobalStore((state) => state.addWidget);

  // States
  const [selectedModule, setSelectedModule] = useState('module1');
  const [selectedMetric, setSelectedMetric] = useState('bucket_breakdown');
  const [selectedChart, setSelectedChart] = useState('Pie Chart');

  // Auto-correct: metrik değiştiğinde, seçili grafik uyumsuzsa ilk uyumlu grafiğe geç
  useEffect(() => {
    const compatible = CHART_COMPATIBILITY[selectedMetric];
    if (compatible && !compatible.includes(selectedChart)) {
      setSelectedChart(compatible[0]);
    }
  }, [selectedMetric, selectedChart]);

  const handleModuleSelect = (modId: string) => {
    setSelectedModule(modId);
    // Auto select first metric of new module
    const metricsForMod = METRICS[modId];
    if (metricsForMod && metricsForMod.length > 0) {
      setSelectedMetric(metricsForMod[0].id);
    }
  };

  const handleAddWidget = () => {
    // Generate readable title
    const modObj = MODULES.find(m => m.id === selectedModule);
    const metObj = METRICS[selectedModule]?.find(m => m.id === selectedMetric);
    const title = `${modObj?.name} - ${metObj?.name}`;

    addWidget({
      id: Date.now().toString(),
      module: selectedModule,
      metric: selectedMetric,
      chartType: selectedChart,
      title: title
    });
    setWidgetModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      
      {/* İç Panel */}
      <div className="w-full max-w-6xl h-[85vh] bg-zinc-950 border border-zinc-800 rounded-3xl flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-zinc-800 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-zinc-100 tracking-tight">Widget Kataloğu</h2>
            <p className="text-sm font-medium text-zinc-500 mt-1">Derin analiz için modül ve metrik seçin</p>
          </div>
          <button 
            onClick={() => setWidgetModalOpen(false)}
            className="p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Gövde (3 Kolonlu Grid) */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-800 overflow-hidden">
          
          {/* Kolon 1: Modül ve Kategori */}
          <div className="p-6 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">1. Veri Kaynağı</h3>
            
            <div className="flex flex-col gap-2">
              {MODULES.map((item) => {
                const isActive = item.id === selectedModule;
                const Icon = item.icon;
                return (
                  <button 
                    key={item.id}
                    onClick={() => handleModuleSelect(item.id)}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all text-left group ${
                      isActive 
                      ? 'border-2 border-blue-500 bg-zinc-900 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)] ring-2 ring-blue-500/20 ring-offset-2 ring-offset-zinc-950' 
                      : 'border border-zinc-800/60 bg-zinc-900/40 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <Icon size={20} className="shrink-0" />
                    <span className="text-sm font-semibold">{item.name}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Kolon 2: Analiz Metriği */}
          <div className="p-6 flex flex-col gap-4 overflow-y-auto custom-scrollbar bg-zinc-950/50">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">2. Analiz Metriği</h3>
            
            {(selectedModule === 'module2' || selectedModule === 'module3' || selectedModule === 'module4') && (
              <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <p className="text-xs text-blue-300/80 leading-relaxed">
                  {selectedModule === 'module4' ? (
                    <><strong className="text-blue-300 font-medium">Action Engine:</strong> Bu modül, tüm iş emirleri ve stratejik senaryo verilerini (Horizon Action Engine JSON) analiz eder.</>  
                  ) : (
                    <><strong className="text-blue-300 font-medium">Konsolide Veri:</strong> Bu modül tekil müşteri bazında değil, şirketinizin genel finansal projeksiyonunu ve nakit akışını gösterir.</>
                  )}
                </p>
              </div>
            )}

            <div className="flex flex-col gap-2">
              {METRICS[selectedModule]?.map((item) => {
                const isActive = item.id === selectedMetric;
                const Icon = item.icon;
                return (
                  <button 
                    key={item.id}
                    onClick={() => setSelectedMetric(item.id)}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all text-left group ${
                      isActive
                      ? 'border-2 border-blue-500 bg-zinc-900 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)] ring-2 ring-blue-500/20 ring-offset-2 ring-offset-zinc-950'
                      : 'border border-zinc-800/60 bg-zinc-900/40 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <Icon size={20} className={`shrink-0 ${isActive ? 'text-blue-400' : 'group-hover:text-zinc-300'}`} />
                    <span className="text-sm font-semibold">{item.name}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Kolon 3: Grafik Türü */}
          <div className="p-6 flex flex-col gap-4 overflow-y-auto custom-scrollbar bg-zinc-950/80">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">3. Grafik Türü</h3>
            
            <div className="grid grid-cols-2 gap-3">
              {CHART_TYPES.map((item) => {
                const compatible = CHART_COMPATIBILITY[selectedMetric] ?? [];
                const isChartSupported = compatible.includes(item.id);
                const isActive = item.id === selectedChart;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => isChartSupported && setSelectedChart(item.id)}
                    className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl transition-all text-center ${
                      !isChartSupported
                      ? 'pointer-events-none opacity-30 grayscale blur-[0.5px] border border-zinc-800/60 bg-zinc-900/40 text-zinc-400'
                      : isActive
                        ? 'border-2 border-blue-500 bg-zinc-900 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)] ring-2 ring-blue-500/20 ring-offset-2 ring-offset-zinc-950'
                        : 'border border-zinc-800/60 bg-zinc-900/40 text-zinc-400 hover:bg-zinc-900 hover:border-zinc-700 hover:text-zinc-300 group'
                    }`}
                  >
                    <Icon size={24} className={`${isActive && isChartSupported ? item.colorClass : isChartSupported ? `group-hover:${item.colorClass} transition-colors` : ''}`} />
                    <span className="text-xs font-semibold text-zinc-200">
                      {item.name}
                      <br/>
                      <span className="text-[10px] font-normal opacity-70">{item.subtitle}</span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

        </div>

        {/* Alt Bilgi ve Aksiyon (Footer) */}
        <div className="p-6 border-t border-zinc-800 bg-zinc-900/30 shrink-0 flex justify-end items-center gap-4">
          <button 
            onClick={() => setWidgetModalOpen(false)}
            className="px-6 py-2.5 rounded-lg border border-zinc-700 text-sm font-semibold text-zinc-300 hover:bg-zinc-800 transition-colors"
          >
            İptal
          </button>
          <button 
            onClick={handleAddWidget}
            className="px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
          >
            Widget Ekle
          </button>
        </div>

      </div>
    </div>
  );
}

export const performanceStats = {
  roiChart: [
    { month: 'Ocak', standard: 4.2, horizon: 4.2 },
    { month: 'Şubat', standard: 4.5, horizon: 4.8 },
    { month: 'Mart', standard: 4.1, horizon: 5.9 },
    { month: 'Nisan', standard: 4.4, horizon: 8.2 },
    { month: 'Mayıs', standard: 4.3, horizon: 12.4 },
    { month: 'Haziran', standard: 4.6, horizon: 15.8 },
  ],
  // YENİ: Strateji Dağılımı
  strategyDistribution: [
    { name: 'İskonto / Erken Ödeme', value: 45, color: '#3b82f6' },
    { name: 'Yapılandırma & Taksit', value: 35, color: '#10b981' },
    { name: 'Hukuki İhtar & Süreç', value: 20, color: '#f59e0b' }
  ],
  // YENİ: Nakit Akışı Takvimi
  cashFlowTimeline: [
    { range: '0-7 Gün', amount: '12.5M', percent: 44, color: 'bg-emerald-500' },
    { range: '8-15 Gün', amount: '9.2M', percent: 32, color: 'bg-blue-500' },
    { range: '15+ Gün', amount: '6.7M', percent: 24, color: 'bg-zinc-600' }
  ],
  impactMetrics: {
    targetRecovery: "65.8M TL",
    actualRecovery: "28.4M TL",
    inactionCostSaved: "1.2M TL",
    recoveryRate: 43.2
  }
};

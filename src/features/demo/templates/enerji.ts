import type { DemoTemplate } from "../demoTypes";
import { makeCalendar, makeLiquidity, probabilityPalette, riskMatrixBase } from "./shared";

export const enerjiTemplate: DemoTemplate = {
  sector: "enerji",
  baselineVolume: 1_020_000_000,
  baselineNakit: 25_000_000,
  baselineOpex: 17_000_000,
  baselineVade: 30,
  baselineMusteri: 2400,
  baselinePesin: 70,
  baselineRisk: 14,
  kpis: [
    { id: "cashForecast12w", title: "12 Haftalık Takas Net Pozisyonu", baselineAmount: 86_500_000, format: "tl", trend: { label: "+%7.8 (EPİAŞ projeksiyonu)", type: "up" }, scale: true },
    { id: "weeklyNetCash", title: "Haftalık EPİAŞ Net Akışı", baselineAmount: 1_950_000, format: "tl", subtext: { label: "Takas Makası: -9 Gün", color: "red" }, scale: true },
    { id: "cashRunway", title: "Teminat Yeterlilik Süresi", baselineAmount: 8, format: "days", badge: { label: "🚨 Margin Call Riski: %85" }, scale: false },
    { id: "totalRecoverable", title: "Abone Tahsilat Havuzu", baselineAmount: 42_800_000, format: "tl", subtext: { label: "Kayıp-Kaçak Oranı: %6.4", color: "orange" }, scale: true },
  ],
  charts: {
    liquidity: makeLiquidity([86, 92, 88, 95, 90, 98, 94, 102, 97, 105, 99, 108], 14),
    waterfall: [
      { name: "Açılış Teminat", value: [0, 180], isTotal: true },
      { name: "Abone Tahsilatı", value: [180, 265] },
      { name: "İkili Anlaşma", value: [265, 320] },
      { name: "EPİAŞ Takas", value: [320, 220] },
      { name: "Sistem Kullanım", value: [220, 175] },
      { name: "Kapanış Teminat", value: [0, 175], isTotal: true },
    ],
    riskMatrix: riskMatrixBase,
    concentration: [
      { name: "Sanayi OSB", value: 140, fullMark: 150 },
      { name: "Ticarethane", value: 95, fullMark: 150 },
      { name: "Mesken", value: 78, fullMark: 150 },
      { name: "Tarımsal Sulama", value: 45, fullMark: 150 },
      { name: "Aydınlatma", value: 30, fullMark: 150 },
      { name: "İkili Anlaşma", value: 115, fullMark: 150 },
    ],
    calendar: makeCalendar(["14", "15", "21", "22"]),
  },
  topOffenders: [
    { id: 1, name: "Kocaeli Metal İşleme OSB", score: 94, amount: 8_450_000 },
    { id: 2, name: "Bursa Dokuma Sanayi A.Ş.", score: 89, amount: 5_900_000 },
    { id: 3, name: "Ege Seramik Fabrikası", score: 86, amount: 4_250_000 },
    { id: 4, name: "Anadolu Çimento Tesisi", score: 81, amount: 3_180_000 },
    { id: 5, name: "Trakya Cam Üretim", score: 77, amount: 2_450_000 },
  ],
  workOrders: [
    { id: "e1", customerName: "Kocaeli Metal İşleme OSB", urgency: "KRİTİK", amount: 8_450_000, costOfInactionMonthly: 285_000, aiSuggestion: "Teminat mektubunu %40 artır, kesinti bildirimi hazırla (EPDK 44. md)." },
    { id: "e2", customerName: "Bursa Dokuma Sanayi A.Ş.", urgency: "KRİTİK", amount: 5_900_000, costOfInactionMonthly: 192_000, aiSuggestion: "Ön ödemeli tarifeye geçir, serbest tüketici sözleşmesini yenile." },
    { id: "e3", customerName: "Ege Seramik Fabrikası", urgency: "YÜKSEK", amount: 4_250_000, costOfInactionMonthly: 98_000, aiSuggestion: "İkili anlaşma fiyatını spota endeksle, haftalık takas eşleştirmesi aç." },
    { id: "e4", customerName: "Anadolu Çimento Tesisi", urgency: "ORTA", amount: 3_180_000, costOfInactionMonthly: 42_000, aiSuggestion: "Reaktif ceza iadesini mahsup et, ödeme vadesini 10 gün öne çek." },
    { id: "e5", customerName: "Trakya Cam Üretim", urgency: "ORTA", amount: 2_450_000, costOfInactionMonthly: 28_500, aiSuggestion: "Kayıp-kaçak denetim ziyareti planla, sayaç okuma periyodunu kısalt." },
  ],
  strategy: {
    runs: [
      { id: "20260404_1849", date: "04 Nisan 2026 - 18:49", urgency: "YÜKSEK", status: "RED", portfolioRisk: 0.58, totalExposure: 42_800_000, accountsFlagged: 9, isLatest: true },
      { id: "20260328_0900", date: "28 Mart 2026 - 09:00", urgency: "ORTA", status: "YELLOW", portfolioRisk: 0.48, totalExposure: 38_500_000, accountsFlagged: 7, isLatest: false },
      { id: "20260321_0900", date: "21 Mart 2026 - 09:00", urgency: "ORTA", status: "YELLOW", portfolioRisk: 0.45, totalExposure: 35_100_000, accountsFlagged: 6, isLatest: false },
    ],
    detail: {
      executiveSummary: "Enerji portföyündeki en kritik sinyal Kocaeli Metal İşleme OSB'deki 8.450.000 TL açık pozisyondur. EPDK 44. madde kesinti bildirimi + teminat artırımı ile 18.200.000 TL kurtarım potansiyeli. EPİAŞ takas makası -9 gün; margin call riski %85.",
      metrics: { totalExposure: 42_800_000, forecast12w: 86_500_000, weeklyAvg: 7_208_000, netCashWeekly: 1_950_000, portfolioRisk: 0.58, latePaymentPct: 38.5, trend: "%8 Artış" },
      impactAnalysis: {
        inactionCostWeekly: 285_000,
        totalInvoicesAffected: 2400,
        departmentLoad: [
          { dept: "Piyasa Takas Birimi", taskCount: 5, label: "EPİAŞ Operasyon Uzmanı" },
          { dept: "Abone İşlemleri", taskCount: 3, label: "Saha Tahsilat Ekibi" },
        ],
      },
      recoveryAnalysis: {
        funnel: [
          { label: "Vadesi Geçmiş Abone Pozisyonu", value: 24_230_000, color: "bg-amber-500", width: "100%" },
          { label: "AI Hedeflenen Kurtarım", value: 18_200_000, color: "bg-emerald-500", width: "75%" },
          { label: "Kayıp-Kaçak + Protesto Riski", value: 6_030_000, color: "bg-red-500", width: "25%" },
        ],
        matrix: [
          { id: "E01", x: 120, y: 8.45, risk: 0.58, label: "Kocaeli OSB" },
          { id: "E02", x: 95, y: 5.9, risk: 0.42, label: "Bursa Dokuma" },
          { id: "E03", x: 72, y: 4.25, risk: 0.38, label: "Ege Seramik" },
          { id: "E04", x: 60, y: 3.18, risk: 0.28, label: "Çimento" },
        ],
      },
      scenarios: [
        { id: 1, isRecommended: true, name: "Senaryo 1: Kademeli Teminat Artırımı", description: "EPİAŞ teminatı %40 artırılır, kritik OSB'lerde kesinti bildirimi hazırlanır. Margin call riski %35'e iner.", expectedRecovery: 18_200_000, timeframe: "14-21 gün", clientLossRisk: "%5-10", cost: "Teminat Maliyeti: 820.000 TL" },
        { id: 2, isRecommended: false, name: "Senaryo 2: Toplu Kesinti Bildirimi", description: "Tüm vadesi geçmiş abonelere eş zamanlı kesinti bildirimi. Hızlı tahsilat ama EPDK şikayet riski.", expectedRecovery: 16_850_000, timeframe: "7-14 gün", clientLossRisk: "%25-35", cost: "EPDK Uyum Maliyeti: 325.000 TL" },
      ],
      pipelineDetails: { triggerLog: "Modül 1 → Risk 0.58 + Modül 3 → RED (Margin Call)", confidence: "%94", urgency: "YÜKSEK", timestamp: "2026-04-04T18:49:00", weakestLink: 920_000, strongestLink: 8_450_000, cashFlow: { weekly: 1_950_000, monthly: 8_450_000, quarterly: 26_500_000 } },
      accounts: [
        { id: "E-OSB-01", name: "Kocaeli Metal İşleme OSB", tier: 1, exposure: 8_450_000, riskBucket: "High Risk", overdue: 75, expectedRecovery: 6_500_000, actionType: "TEMİNAT ARTIRIMI", aiInstruction: "OSB yönetim müdürünü bugün ara; EPDK 44. madde kapsamında 7 günlük bildirim süreci başlat.", financialRationale: "Aylık 285.000 TL finansman yükü; margin call riski %85.", relationshipNote: "Büyük sanayi abonesi; kesinti yerine ön ödemeli tarifeye geçiş önerilmeli.", steps: [{ id: "E-OSB-01-s1", day: "Gün 1", title: "Yönetim müdürü görüşmesi", aiInstruction: "EPDK 44. maddeyi hatırlat, 7 gün ultimatum ver." }, { id: "E-OSB-01-s2", day: "Gün 3", title: "Teminat mektubu talebi", aiInstruction: "Mevcut teminatı %40 artırma talebini yaz." }, { id: "E-OSB-01-s3", day: "Gün 7", title: "Kesinti bildirimi gönder", aiInstruction: "Resmi kesinti bildirimini tebliğ ettir." }] },
        { id: "E-OSB-02", name: "Bursa Dokuma Sanayi A.Ş.", tier: 1, exposure: 5_900_000, riskBucket: "High Risk", overdue: 62, expectedRecovery: 4_720_000, actionType: "ÖN ÖDEMELİ GEÇİŞ", aiInstruction: "Serbest tüketici sözleşmesini yenile, ön ödemeli tarife sun.", financialRationale: "Aylık 192.000 TL kayıp; abone kaybı halinde yıllık 2.3M TL ciro düşer.", relationshipNote: "Dokuma sezonu öncesi hassas; ilişki koruma önceliği.", steps: [{ id: "E-OSB-02-s1", day: "Gün 1", title: "Ön ödemeli tarife sunumu", aiInstruction: "Finansman departmanıyla toplantı iste." }] },
      ],
    },
  },
  kanban: [
    { id: "E-OSB-01", company: "Kocaeli Metal İşleme OSB", exposure: 8_450_000, delay: "75 Gün", risk: "Yüksek (0.58)", action: "EPDK 44. Md Kesinti Süreci", status: "Bekliyor", filterCategory: "bekleyen" },
    { id: "E-OSB-02", company: "Bursa Dokuma Sanayi A.Ş.", exposure: 5_900_000, delay: "62 Gün", risk: "Yüksek (0.42)", action: "Ön Ödemeli Tarife Müzakeresi", status: "İşlemde", filterCategory: "aktif" },
    { id: "E-ISG-03", company: "Ege Seramik Fabrikası", exposure: 4_250_000, delay: "48 Gün", risk: "Orta (0.38)", action: "İkili Anlaşma Revizyonu", status: "SLA Aşımı", filterCategory: "zaman_asimi" },
    { id: "E-CIM-04", company: "Anadolu Çimento Tesisi", exposure: 3_180_000, delay: "95 Gün", risk: "Kritik (0.85)", action: "Teminat Protesto", status: "Reddedildi / Hukuk", filterCategory: "riskli" },
  ],
  accountProfile: {
    id: "E-OSB-01",
    name: "Kocaeli Metal İşleme OSB",
    exposure: 8_450_000,
    expectedRecovery: 6_500_000,
    weeklyInactionCost: 65_800,
    delayDays: 75,
    riskScore: 0.58,
    riskBucket: "Yüksek Risk",
    assignedRole: "EPİAŞ Operasyon Uzmanı",
    module1: {
      probability: [
        { name: probabilityPalette[0].name, val: 4, color: probabilityPalette[0].color },
        { name: probabilityPalette[1].name, val: 8, color: probabilityPalette[1].color },
        { name: probabilityPalette[2].name, val: 18, color: probabilityPalette[2].color },
        { name: probabilityPalette[3].name, val: 28, color: probabilityPalette[3].color },
        { name: probabilityPalette[4].name, val: 27, color: probabilityPalette[4].color },
        { name: probabilityPalette[5].name, val: 15, color: probabilityPalette[5].color },
      ],
      invoices: [
        { id: "FTR-2026-1245", date: "12.01.2026", amount: 3_850_000, daysDelay: "-75 Gün", statusText: "EPDK Sürecinde", statusType: "critical" },
        { id: "FTR-2025-9842", date: "15.12.2025", amount: 2_800_000, daysDelay: "-103 Gün", statusText: "Kesinti Tebliği", statusType: "critical" },
        { id: "FTR-2025-8715", date: "28.11.2025", amount: 1_800_000, daysDelay: "-120 Gün", statusText: "Ağır Gecikme", statusType: "severe" },
      ],
    },
    module3: { cashGapBefore: 62, cashGapAfter: 78, runwayBefore: 8, runwayAfter: 4, gapDeltaPct: 16, runwayDeltaDays: 4 },
  },
};

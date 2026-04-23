import type { DemoTemplate } from "../demoTypes";
import { makeCalendar, makeLiquidity, probabilityPalette, riskMatrixBase } from "./shared";

export const kurumsalTemplate: DemoTemplate = {
  sector: "kurumsal",
  baselineVolume: 2_000_000_000,
  baselineNakit: 45_000_000,
  baselineOpex: 26_500_000,
  baselineVade: 45,
  baselineMusteri: 1200,
  baselinePesin: 60,
  baselineRisk: 12,
  kpis: [
    { id: "cashForecast12w", title: "12 Haftalık Konsolide Nakit Tahmini", baselineAmount: 620_000_000, format: "tl", trend: { label: "+%18.2 (QoQ)", type: "up" }, scale: true },
    { id: "weeklyNetCash", title: "Haftalık Net Nakit Akışı", baselineAmount: 9_800_000, format: "tl", subtext: { label: "Likidite Durumu: Stabil", color: "blue" }, scale: true },
    { id: "cashRunway", title: "Working Capital Runway", baselineAmount: 64, format: "days", subtext: { label: "DSO 52g / DPO 38g", color: "blue" }, scale: false },
    { id: "totalRecoverable", title: "Tahsilat Risk Havuzu", baselineAmount: 124_500_000, format: "tl", badge: { label: "🚨 Bayi Yoğunlaşma: %31" }, scale: true },
  ],
  charts: {
    liquidity: makeLiquidity([620, 640, 635, 655, 648, 680, 672, 700, 692, 720, 712, 745], 38),
    waterfall: [
      { name: "Açılış Pozisyonu", value: [0, 4200], isTotal: true },
      { name: "Bayi Tahsilatı", value: [4200, 5800] },
      { name: "İhracat Gelirleri", value: [5800, 6600] },
      { name: "Tedarikçi Ödemesi", value: [6600, 5400] },
      { name: "Kredi / Sendikasyon", value: [5400, 4850] },
      { name: "Kapanış", value: [0, 4850], isTotal: true },
    ],
    riskMatrix: riskMatrixBase,
    concentration: [
      { name: "Anadolu Bayi", value: 135, fullMark: 150 },
      { name: "Marmara Bayi", value: 120, fullMark: 150 },
      { name: "Zincir Market", value: 110, fullMark: 150 },
      { name: "İhracat", value: 85, fullMark: 150 },
      { name: "Kurumsal B2B", value: 95, fullMark: 150 },
      { name: "E-Ticaret", value: 60, fullMark: 150 },
    ],
    calendar: makeCalendar(["15", "19", "24"]),
  },
  topOffenders: [
    { id: 1, name: "Demirören Yapı A.Ş.", score: 92, amount: 14_250_000 },
    { id: 2, name: "Global Tekstil Sanayi A.Ş.", score: 88, amount: 9_100_000 },
    { id: 3, name: "Apex Lojistik Ltd.", score: 85, amount: 6_850_000 },
    { id: 4, name: "Mega Gıda Dağıtım A.Ş.", score: 79, amount: 4_940_000 },
    { id: 5, name: "Çelik Motor Sanayi", score: 76, amount: 3_820_000 },
  ],
  workOrders: [
    { id: "c1", customerName: "Demirören Yapı A.Ş.", urgency: "KRİTİK", amount: 14_250_000, costOfInactionMonthly: 450_000, aiSuggestion: "Teminat mektubu limitini %25 artır, sözleşme vadesini 15 gün kısalt." },
    { id: "c2", customerName: "Global Tekstil Sanayi A.Ş.", urgency: "KRİTİK", amount: 9_100_000, costOfInactionMonthly: 293_000, aiSuggestion: "DBS migrasyonu başlat, açık hesap faaliyetini dondur." },
    { id: "c3", customerName: "Apex Lojistik Ltd.", urgency: "YÜKSEK", amount: 6_850_000, costOfInactionMonthly: 145_000, aiSuggestion: "Kredi limitini %20 daralt, gecikme faiz işlet ve ek kefalet iste." },
    { id: "c4", customerName: "Mega Gıda Dağıtım A.Ş.", urgency: "ORTA", amount: 4_940_000, costOfInactionMonthly: 38_000, aiSuggestion: "Dinamik iskonto programı ile erken ödemeye teşvik et." },
    { id: "c5", customerName: "Çelik Motor Sanayi", urgency: "ORTA", amount: 3_820_000, costOfInactionMonthly: 26_500, aiSuggestion: "Bayi skor kartı güncelle, çeyreklik sözleşme revizyonuna al." },
  ],
  strategy: {
    runs: [
      { id: "20260404_1849", date: "04 Nisan 2026 - 18:49", urgency: "DÜŞÜK", status: "GREEN", portfolioRisk: 0.36, totalExposure: 352_935_694, accountsFlagged: 6, isLatest: true },
      { id: "20260328_0900", date: "28 Mart 2026 - 09:00", urgency: "ORTA", status: "YELLOW", portfolioRisk: 0.41, totalExposure: 381_120_500, accountsFlagged: 9, isLatest: false },
      { id: "20260321_0900", date: "21 Mart 2026 - 09:00", urgency: "YÜKSEK", status: "RED", portfolioRisk: 0.58, totalExposure: 410_500_000, accountsFlagged: 14, isLatest: false },
    ],
    detail: {
      executiveSummary: "Portföyün en kritik risk sinyali Demirören Yapı A.Ş. hesabında 14.250.000 TL tutarındaki açık pozisyondur. AI önerisi Formal Demand + DBS geçişi ile konsolide 21.600.000 TL kurtarım potansiyeli sunuyor. Haftalık 457.308 TL inaksiyon maliyeti birikiyor.",
      metrics: { totalExposure: 352_935_694, forecast12w: 620_000_000, weeklyAvg: 51_666_000, netCashWeekly: 9_800_000, portfolioRisk: 0.363, latePaymentPct: 54.9, trend: "%18 Artış" },
      impactAnalysis: {
        inactionCostWeekly: 457_308,
        totalInvoicesAffected: 16_833,
        departmentLoad: [
          { dept: "Tahsilat Birimi", taskCount: 4, label: "Kıdemli Uzman / Koordinatör" },
          { dept: "Satış Operasyonları", taskCount: 2, label: "Müşteri Başarı Uzmanı" },
        ],
      },
      recoveryAnalysis: {
        funnel: [
          { label: "Yönetilen Riskli Pozisyon", value: 91_400_000, color: "bg-amber-500", width: "100%" },
          { label: "AI Hedeflenen Kurtarım", value: 65_800_000, color: "bg-emerald-500", width: "72%" },
          { label: "Beklenen Risk Payı (Kayıp)", value: 25_600_000, color: "bg-red-500", width: "28%" },
        ],
        matrix: [
          { id: "0095", x: 668, y: 18.6, risk: 0.24, label: "Demirören" },
          { id: "0378", x: 831, y: 14.5, risk: 0.35, label: "Ağaoğlu" },
          { id: "0015", x: 735, y: 18.1, risk: 0.18, label: "Kalyon" },
          { id: "0086", x: 877, y: 17.0, risk: 0.20, label: "Limak" },
          { id: "0156", x: 829, y: 12.7, risk: 0.31, label: "Rönesans" },
          { id: "0190", x: 792, y: 10.2, risk: 0.45, label: "Cengiz" },
        ],
      },
      scenarios: [
        { id: 1, isRecommended: true, name: "Senaryo 1: Kademeli Tahsilat", description: "Her hesap kendi tier'ına göre kalibre edilmiş müdahale alır. Hukuki süreç otomatik eskalasyon yolunun sonunda devreye girer.", expectedRecovery: 65_809_249, timeframe: "30-60 gün", clientLossRisk: "%5-10", cost: "İskonto Maliyeti: 2.286.545 TL" },
        { id: 2, isRecommended: false, name: "Senaryo 2: Eşzamanlı Agresif Tahsilat", description: "Tüm hesaplarda aynı anda kredi dondurma + noter ihtarı. Hızlı nakit ama kalıcı ilişki hasarı.", expectedRecovery: 62_194_016, timeframe: "15-30 gün", clientLossRisk: "%25-40", cost: "Hukuki Maliyet: 457.309 TL" },
      ],
      pipelineDetails: { triggerLog: "Modül 1 → Risk 0.363 + Modül 3 → GREEN", confidence: "%11", urgency: "DÜŞÜK", timestamp: "2026-04-04T18:49:00", weakestLink: 892_773, strongestLink: 7_918_815, cashFlow: { weekly: 9_800_000, monthly: 42_500_000, quarterly: 128_000_000 } },
      accounts: [
        { id: "0095", name: "Demirören Yapı A.Ş.", tier: 1, exposure: 18_666_794, riskBucket: "Low Risk", overdue: 668, expectedRecovery: 12_133_416, actionType: "FORMAL DEMAND", aiInstruction: "Hesap 0095 yöneticisini BUGÜN ara; 668 günlük gecikme gerekçesiyle yapılandırma sun.", financialRationale: "Her hafta hareketsiz geçen 93.334 TL finansman maliyeti yaratıyor — 90 gün daha beklenmesi 1.213.342 TL ek yük demek.", relationshipNote: "Risk skoru düşük (0.241). Ticari ilişki değeri yüksek; yapılandırma reddedilse bile ikinci görüşme şart.", steps: [{ id: "0095-s1", day: "Gün 1", title: "Acil görüşme talep et", aiInstruction: "Yöneticiyi ara ve görüş." }, { id: "0095-s2", day: "Gün 3", title: "Taahhütname al", aiInstruction: "E-posta ile taahhütname ilet." }, { id: "0095-s3", day: "Gün 7", title: "Limiti %50 düşür", aiInstruction: "ERP limit düşümü." }] },
        { id: "0378", name: "Ağaoğlu Grup", tier: 1, exposure: 14_588_572, riskBucket: "Low Risk", overdue: 831, expectedRecovery: 9_482_572, actionType: "FORMAL DEMAND", aiInstruction: "831 günlük gecikme gerekçesiyle acil görüşme talep et.", financialRationale: "Kronik gecikme rejimi; her gün 17.545 TL finansman yükü.", relationshipNote: "Stratejik grup; doğrudan hukuki süreç imaj zararı yaratır.", steps: [{ id: "0378-s1", day: "Gün 1", title: "Acil görüşme talep et", aiInstruction: "Telefonda yapılandırma sun." }] },
        { id: "0015", name: "Kalyon İnşaat", tier: 2, exposure: 18_105_081, riskBucket: "Low Risk", overdue: 735, expectedRecovery: 12_311_455, actionType: "BLOCK & RESTRUCTURE", aiInstruction: "ERP'de yeni vadeli satış girişlerini bloklan; %20 peşin zorunlu yapılandırma.", financialRationale: "735 gün gecikmede batık oranı %48 eşiğine yaklaşıyor.", relationshipNote: "Proje bazlı çalışan bayi; vade revizyonu ile ilişki kurtarılabilir.", steps: [{ id: "0015-s1", day: "Gün 1", title: "Satışları blokla", aiInstruction: "ERP'de hesabı durdur." }] },
        { id: "0086", name: "Limak Holding", tier: 2, exposure: 17_036_870, riskBucket: "Low Risk", overdue: 877, expectedRecovery: 11_585_072, actionType: "BLOCK & RESTRUCTURE", aiInstruction: "ERP'de yeni vadeli satışları blokla ve resmi yapılandırma gönder.", financialRationale: "877 gün — batık yazım ihtimali %62.", relationshipNote: "Yatırım portföyü geniş; çoklu hesap yönetimi gerekli.", steps: [{ id: "0086-s1", day: "Gün 1", title: "Satışları blokla", aiInstruction: "ERP engeli koy." }] },
        { id: "0156", name: "Rönesans Holding", tier: 3, exposure: 12_785_663, riskBucket: "Low Risk", overdue: 829, expectedRecovery: 11_251_383, actionType: "PROACTIVE OUTREACH", aiInstruction: "Bu hafta değer görüşmesi yap; %1.5 erken ödeme iskontosu.", financialRationale: "Kurtarım potansiyeli yüksek (%88); iskonto maliyeti ihmal edilebilir.", relationshipNote: "İlişki sağlıklı; değer görüşmesi ile çözülür.", steps: [{ id: "0156-s1", day: "Gün 1", title: "İskonto teklifi sun", aiInstruction: "15 gün geçerli iskonto maili at." }] },
        { id: "0190", name: "Cengiz Holding", tier: 3, exposure: 10_278_808, riskBucket: "Medium Risk", overdue: 792, expectedRecovery: 9_045_351, actionType: "PROACTIVE OUTREACH", aiInstruction: "Bu hafta değer görüşmesi yap; %1.5 erken ödeme iskontosu.", financialRationale: "Tier 3 — müşteri başarı yaklaşımıyla hızlı çözüm olası.", relationshipNote: "Altyapı projeleri ile bağlı; zincir etki riski düşük.", steps: [{ id: "0190-s1", day: "Gün 1", title: "İskonto teklifi sun", aiInstruction: "Müşteri başarı görüşmesi yap." }] },
      ],
    },
  },
  kanban: [
    { id: "0095", company: "Demirören Yapı A.Ş.", exposure: 18_666_794, delay: "668 Gün", risk: "Düşük (0.241)", action: "Yapılandırma Teklifi Sunuldu", status: "Bekliyor", filterCategory: "bekleyen" },
    { id: "0378", company: "Ağaoğlu Grup", exposure: 14_588_572, delay: "831 Gün", risk: "Düşük (0.350)", action: "Müzakere Devam Ediyor", status: "İşlemde", filterCategory: "aktif" },
    { id: "0412", company: "Tekfen Lojistik", exposure: 3_400_000, delay: "45 Gün", risk: "Yüksek (0.812)", action: "7. Gün Taahhüt İhlali", status: "SLA Aşımı", filterCategory: "zaman_asimi" },
    { id: "0899", company: "Limak Holding", exposure: 17_036_870, delay: "877 Gün", risk: "Kritik (0.950)", action: "Yapılandırma Reddedildi", status: "Reddedildi / Hukuk", filterCategory: "riskli" },
  ],
  accountProfile: {
    id: "0095",
    name: "Demirören Yapı A.Ş.",
    exposure: 18_666_794,
    expectedRecovery: 12_133_416,
    weeklyInactionCost: 93_334,
    delayDays: 668,
    riskScore: 0.241,
    riskBucket: "Düşük Risk",
    assignedRole: "Kıdemli Tahsilat Uzmanı",
    module1: {
      probability: [
        { name: probabilityPalette[0].name, val: 5, color: probabilityPalette[0].color },
        { name: probabilityPalette[1].name, val: 10, color: probabilityPalette[1].color },
        { name: probabilityPalette[2].name, val: 15, color: probabilityPalette[2].color },
        { name: probabilityPalette[3].name, val: 20, color: probabilityPalette[3].color },
        { name: probabilityPalette[4].name, val: 25, color: probabilityPalette[4].color },
        { name: probabilityPalette[5].name, val: 25, color: probabilityPalette[5].color },
      ],
      invoices: [
        { id: "INV-2023-0891", date: "10.05.2023", amount: 6_200_000, daysDelay: "-668 Gün", statusText: "Kritik Gecikme", statusType: "critical" },
        { id: "INV-2023-0942", date: "21.06.2023", amount: 5_466_794, daysDelay: "-626 Gün", statusText: "Kritik Gecikme", statusType: "critical" },
        { id: "INV-2024-0105", date: "15.01.2024", amount: 7_000_000, daysDelay: "-419 Gün", statusText: "Ağır Gecikme", statusType: "severe" },
      ],
    },
    module3: { cashGapBefore: 42, cashGapAfter: 58, runwayBefore: 12, runwayAfter: 8, gapDeltaPct: 16, runwayDeltaDays: 4 },
  },
};

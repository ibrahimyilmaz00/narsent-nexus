import type { DemoTemplate } from "../demoTypes";
import { makeCalendar, makeLiquidity, probabilityPalette, riskMatrixBase } from "./shared";

export const egitimTemplate: DemoTemplate = {
  sector: "egitim",
  baselineVolume: 80_000_000,
  baselineNakit: 2_000_000,
  baselineOpex: 690_000,
  baselineVade: 270,
  baselineMusteri: 1200,
  baselinePesin: 20,
  baselineRisk: 28,
  kpis: [
    { id: "cashForecast12w", title: "Dönem Sonu Tahsilat Tahmini", baselineAmount: 24_800_000, format: "tl", trend: { label: "+%22 (Kayıt pik dönemi)", type: "up" }, scale: true },
    { id: "weeklyNetCash", title: "Haftalık Net Tahsilat", baselineAmount: 520_000, format: "tl", subtext: { label: "Likidite: Mevsimsel Dalgalı", color: "orange" }, scale: true },
    { id: "cashRunway", title: "Maaş Ödemesi Güvencesi", baselineAmount: 28, format: "days", badge: { label: "🚨 Eylül Maaş Baskısı" }, scale: false },
    { id: "totalRecoverable", title: "Vadesi Gelen Taksit Havuzu", baselineAmount: 14_250_000, format: "tl", subtext: { label: "Taksit Temerrüdü: %11.3", color: "orange" }, scale: true },
  ],
  charts: {
    liquidity: makeLiquidity([24, 22, 20, 19, 18, 21, 26, 32, 38, 42, 45, 48], 5),
    waterfall: [
      { name: "Dönem Açılış", value: [0, 220], isTotal: true },
      { name: "Peşinat Tahsilatı", value: [220, 310] },
      { name: "Taksit Girişi", value: [310, 380] },
      { name: "Öğretmen Maaşı", value: [380, 250] },
      { name: "Servis / Yemek", value: [250, 195] },
      { name: "Dönem Kapanış", value: [0, 195], isTotal: true },
    ],
    riskMatrix: riskMatrixBase,
    concentration: [
      { name: "Anaokulu", value: 55, fullMark: 150 },
      { name: "İlkokul", value: 120, fullMark: 150 },
      { name: "Ortaokul", value: 110, fullMark: 150 },
      { name: "Lise", value: 135, fullMark: 150 },
      { name: "Etüt / Kurs", value: 45, fullMark: 150 },
      { name: "Yurt", value: 70, fullMark: 150 },
    ],
    calendar: makeCalendar(["15", "20", "25"]),
  },
  topOffenders: [
    { id: 1, name: "Kampüs A — Lise (47 taksit gecikmesi)", score: 89, amount: 1_850_000 },
    { id: 2, name: "Kampüs B — İlkokul Velileri", score: 84, amount: 1_240_000 },
    { id: 3, name: "Yurt Grubu — Anadolu Şubesi", score: 80, amount: 820_000 },
    { id: 4, name: "Kampüs C — Ortaokul Grubu", score: 76, amount: 560_000 },
    { id: 5, name: "Etüt Merkezi — Merkez Şube", score: 72, amount: 310_000 },
  ],
  workOrders: [
    { id: "d1", customerName: "Kampüs A — Lise Veli Grubu", urgency: "KRİTİK", amount: 1_850_000, costOfInactionMonthly: 58_000, aiSuggestion: "Kayıt yenileme önkoşuluna bağla, senet karşılığı yapılandırma öner." },
    { id: "d2", customerName: "Kampüs B — İlkokul Veli Grubu", urgency: "KRİTİK", amount: 1_240_000, costOfInactionMonthly: 36_000, aiSuggestion: "Kardeş iskontosu revizyonu, 3 taksit birleştirme kampanyası." },
    { id: "d3", customerName: "Yurt Grubu — Anadolu Şubesi", urgency: "YÜKSEK", amount: 820_000, costOfInactionMonthly: 18_500, aiSuggestion: "Burs değerlendirme komisyonuna yönlendir, geç ödeme faizi işlet." },
    { id: "d4", customerName: "Kampüs C — Ortaokul Grubu", urgency: "ORTA", amount: 560_000, costOfInactionMonthly: 8_400, aiSuggestion: "Otomatik talimat (DBS) geçişi için veli aramaları planla." },
    { id: "d5", customerName: "Etüt Merkezi — Merkez Şube", urgency: "ORTA", amount: 310_000, costOfInactionMonthly: 4_100, aiSuggestion: "Yaz dönemi paket iskontosu, erken kayıt indirimi kampanyası aç." },
  ],
  strategy: {
    runs: [
      { id: "20260404_1849", date: "04 Nisan 2026 - 18:49", urgency: "ORTA", status: "YELLOW", portfolioRisk: 0.45, totalExposure: 14_250_000, accountsFlagged: 8, isLatest: true },
      { id: "20260328_0900", date: "28 Mart 2026 - 09:00", urgency: "ORTA", status: "YELLOW", portfolioRisk: 0.42, totalExposure: 12_800_000, accountsFlagged: 7, isLatest: false },
      { id: "20260321_0900", date: "21 Mart 2026 - 09:00", urgency: "DÜŞÜK", status: "GREEN", portfolioRisk: 0.32, totalExposure: 10_200_000, accountsFlagged: 5, isLatest: false },
    ],
    detail: {
      executiveSummary: "Eğitim portföyünde en kritik sinyal Kampüs A Lise veli grubunda 1.850.000 TL taksit gecikmesidir. Kayıt yenileme önkoşulu + senet karşılığı yapılandırma ile 5.470.000 TL kurtarım mümkün. Drop-out riski 42 öğrencide tespit edildi.",
      metrics: { totalExposure: 14_250_000, forecast12w: 24_800_000, weeklyAvg: 2_066_000, netCashWeekly: 520_000, portfolioRisk: 0.45, latePaymentPct: 11.3, trend: "%22 Artış" },
      impactAnalysis: {
        inactionCostWeekly: 58_000,
        totalInvoicesAffected: 1200,
        departmentLoad: [
          { dept: "Veli İletişim Birimi", taskCount: 4, label: "Rehberlik Koordinatörü" },
          { dept: "Mali İşler", taskCount: 2, label: "Tahsilat Sorumlusu" },
        ],
      },
      recoveryAnalysis: {
        funnel: [
          { label: "Vadesi Gelen Taksit Pozisyonu", value: 7_800_000, color: "bg-amber-500", width: "100%" },
          { label: "AI Hedeflenen Kurtarım", value: 5_470_000, color: "bg-emerald-500", width: "70%" },
          { label: "Drop-out + Temerrüt Riski", value: 2_330_000, color: "bg-red-500", width: "30%" },
        ],
        matrix: [
          { id: "D01", x: 75, y: 1.85, risk: 0.45, label: "Kampüs A" },
          { id: "D02", x: 55, y: 1.24, risk: 0.32, label: "Kampüs B" },
          { id: "D03", x: 45, y: 0.82, risk: 0.28, label: "Yurt Grubu" },
          { id: "D04", x: 38, y: 0.56, risk: 0.22, label: "Kampüs C" },
        ],
      },
      scenarios: [
        { id: 1, isRecommended: true, name: "Senaryo 1: Kayıt Yenileme Önkoşulu", description: "Vadesi geçmiş taksitler kayıt yenileme önkoşuluna bağlanır, senet karşılığı yapılandırma sunulur. Drop-out riski %40'tan %12'ye iner.", expectedRecovery: 5_470_000, timeframe: "21-30 gün", clientLossRisk: "%10-15", cost: "İskonto Maliyeti: 180.000 TL" },
        { id: 2, isRecommended: false, name: "Senaryo 2: Agresif Senet Protesto", description: "Tüm vadesi geçmiş senetler protesto edilir. Hızlı nakit ama veli şikayeti ve kayıt kaybı büyük.", expectedRecovery: 4_980_000, timeframe: "15-20 gün", clientLossRisk: "%35-50", cost: "Hukuki Maliyet: 95.000 TL" },
      ],
      pipelineDetails: { triggerLog: "Modül 1 → Drop-out 0.45 + Modül 3 → YELLOW", confidence: "%78", urgency: "ORTA", timestamp: "2026-04-04T18:49:00", weakestLink: 185_000, strongestLink: 1_850_000, cashFlow: { weekly: 520_000, monthly: 2_250_000, quarterly: 6_750_000 } },
      accounts: [
        { id: "D-LISE-A", name: "Kampüs A — Lise Veli Grubu", tier: 1, exposure: 1_850_000, riskBucket: "High Risk", overdue: 75, expectedRecovery: 1_295_000, actionType: "KAYIT YENİLEME ÖNKOŞULU", aiInstruction: "Rehberlik koordinatörüne bugün ilet; kayıt yenileme önkoşulu bildirimi yap.", financialRationale: "Aylık 58.000 TL kayıp; 42 öğrencide drop-out riski tespit edildi.", relationshipNote: "Lise 12. sınıf veli grubu hassas; mezuniyet öncesi çözüm kritik.", steps: [{ id: "D-LISE-A-s1", day: "Gün 1", title: "Rehberlik koordinatörü bilgilendirme", aiInstruction: "Veli toplantısı planla." }, { id: "D-LISE-A-s2", day: "Gün 3", title: "Veli WhatsApp kampanyası", aiInstruction: "Kayıt önkoşul bildirimi gönder." }, { id: "D-LISE-A-s3", day: "Gün 7", title: "Senet yapılandırma sunumu", aiInstruction: "3 taksit senet opsiyonu ilet." }] },
        { id: "D-ILK-B", name: "Kampüs B — İlkokul Veli Grubu", tier: 2, exposure: 1_240_000, riskBucket: "Medium Risk", overdue: 62, expectedRecovery: 880_000, actionType: "KARDEŞ İSKONTOSU", aiInstruction: "Kardeş iskontosu revizyonu ile taksit birleştirme önerisi sun.", financialRationale: "Aylık 36.000 TL yük; kardeş iskonto mekanizması velilerde pozitif karşılanıyor.", relationshipNote: "İlkokul velileri uzun vadeli; ilişki koruma önceliği yüksek.", steps: [{ id: "D-ILK-B-s1", day: "Gün 1", title: "Kardeş iskonto teklifi", aiInstruction: "Email kampanyası başlat." }] },
      ],
    },
  },
  kanban: [
    { id: "D-LISE-A", company: "Kampüs A — Lise Veli Grubu", exposure: 1_850_000, delay: "75 Gün", risk: "Yüksek (0.45)", action: "Kayıt Yenileme Önkoşulu", status: "Bekliyor", filterCategory: "bekleyen" },
    { id: "D-ILK-B", company: "Kampüs B — İlkokul Velileri", exposure: 1_240_000, delay: "62 Gün", risk: "Orta (0.32)", action: "Kardeş İskonto Müzakeresi", status: "İşlemde", filterCategory: "aktif" },
    { id: "D-YURT-C", company: "Yurt Grubu — Anadolu Şubesi", exposure: 820_000, delay: "48 Gün", risk: "Orta (0.28)", action: "Burs Komisyon Değerlendirmesi", status: "SLA Aşımı", filterCategory: "zaman_asimi" },
    { id: "D-ETUT-D", company: "Etüt Merkezi — Merkez Şube", exposure: 310_000, delay: "105 Gün", risk: "Kritik (0.82)", action: "Senet Protesto", status: "Reddedildi / Hukuk", filterCategory: "riskli" },
  ],
  accountProfile: {
    id: "D-LISE-A",
    name: "Kampüs A — Lise Veli Grubu",
    exposure: 1_850_000,
    expectedRecovery: 1_295_000,
    weeklyInactionCost: 13_500,
    delayDays: 75,
    riskScore: 0.45,
    riskBucket: "Yüksek Risk",
    assignedRole: "Rehberlik Koordinatörü",
    module1: {
      probability: [
        { name: probabilityPalette[0].name, val: 6, color: probabilityPalette[0].color },
        { name: probabilityPalette[1].name, val: 14, color: probabilityPalette[1].color },
        { name: probabilityPalette[2].name, val: 22, color: probabilityPalette[2].color },
        { name: probabilityPalette[3].name, val: 26, color: probabilityPalette[3].color },
        { name: probabilityPalette[4].name, val: 20, color: probabilityPalette[4].color },
        { name: probabilityPalette[5].name, val: 12, color: probabilityPalette[5].color },
      ],
      invoices: [
        { id: "TK-2026-0412", date: "10.01.2026", amount: 720_000, daysDelay: "-75 Gün", statusText: "Drop-out Risk", statusType: "critical" },
        { id: "TK-2026-0388", date: "28.12.2025", amount: 640_000, daysDelay: "-95 Gün", statusText: "Kronik Gecikme", statusType: "critical" },
        { id: "TK-2025-0345", date: "15.12.2025", amount: 490_000, daysDelay: "-108 Gün", statusText: "Ağır Gecikme", statusType: "severe" },
      ],
    },
    module3: { cashGapBefore: 45, cashGapAfter: 62, runwayBefore: 28, runwayAfter: 19, gapDeltaPct: 17, runwayDeltaDays: 9 },
  },
};

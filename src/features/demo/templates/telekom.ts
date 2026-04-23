import type { DemoTemplate } from "../demoTypes";
import { makeCalendar, makeLiquidity, probabilityPalette, riskMatrixBase } from "./shared";

export const telekomTemplate: DemoTemplate = {
  sector: "telekom",
  baselineVolume: 2_160_000_000,
  baselineNakit: 30_000_000,
  baselineOpex: 22_700_000,
  baselineVade: 35,
  baselineMusteri: 4500,
  baselinePesin: 75,
  baselineRisk: 4.2,
  kpis: [
    { id: "cashForecast12w", title: "12 Haftalık MRR Projeksiyonu", baselineAmount: 52_000_000, format: "tl", trend: { label: "+%4.2 (Churn düzeltilmiş)", type: "up" }, scale: true },
    { id: "weeklyNetCash", title: "Haftalık ARPU Net Akışı", baselineAmount: 1_240_000, format: "tl", subtext: { label: "Tahsilat Başarısı: %93.6", color: "green" }, scale: true },
    { id: "cashRunway", title: "Taahhüt Bakiye Ömrü", baselineAmount: 42, format: "days", badge: { label: "🚨 Cihaz Sübvansiyon Yükü" }, scale: false },
    { id: "totalRecoverable", title: "Churn Risk Havuzu", baselineAmount: 18_600_000, format: "tl", subtext: { label: "90+ Gün Kesme: %2.8", color: "orange" }, scale: true },
  ],
  charts: {
    liquidity: makeLiquidity([52, 53, 51, 54, 52, 56, 54, 58, 56, 60, 58, 62], 6),
    waterfall: [
      { name: "Açılış MRR", value: [0, 450], isTotal: true },
      { name: "Yeni Abonelik", value: [450, 580] },
      { name: "Üst Paket (ARPU↑)", value: [580, 640] },
      { name: "Churn / İptal", value: [640, 520] },
      { name: "Interconnect Ödeme", value: [520, 470] },
      { name: "Kapanış MRR", value: [0, 470], isTotal: true },
    ],
    riskMatrix: riskMatrixBase,
    concentration: [
      { name: "Kurumsal Hat", value: 125, fullMark: 150 },
      { name: "Bireysel Postpaid", value: 145, fullMark: 150 },
      { name: "Prepaid", value: 75, fullMark: 150 },
      { name: "M2M / IoT", value: 60, fullMark: 150 },
      { name: "Fiber Ev", value: 95, fullMark: 150 },
      { name: "Veri Merkezi", value: 85, fullMark: 150 },
    ],
    calendar: makeCalendar(["16", "18", "25"]),
  },
  topOffenders: [
    { id: 1, name: "NexusCorp Kurumsal Hat (2.4k abone)", score: 91, amount: 3_850_000 },
    { id: 2, name: "Zirve Holding VPN Hizmeti", score: 86, amount: 2_100_000 },
    { id: 3, name: "MetroLine Toplu Prepaid", score: 82, amount: 1_480_000 },
    { id: 4, name: "Başkent Üniversitesi Fiber", score: 78, amount: 920_000 },
    { id: 5, name: "GoldStar M2M Filo Çözümü", score: 74, amount: 640_000 },
  ],
  workOrders: [
    { id: "t1", customerName: "NexusCorp Kurumsal Hat", urgency: "KRİTİK", amount: 3_850_000, costOfInactionMonthly: 118_000, aiSuggestion: "Taahhüt yenilemeden önce hat pasifleştirme eşiğini 10 güne çek." },
    { id: "t2", customerName: "Zirve Holding VPN Hizmeti", urgency: "KRİTİK", amount: 2_100_000, costOfInactionMonthly: 64_000, aiSuggestion: "SLA ceza klozunu devreye al, cihaz geri alım sürecini başlat." },
    { id: "t3", customerName: "MetroLine Toplu Prepaid", urgency: "YÜKSEK", amount: 1_480_000, costOfInactionMonthly: 32_500, aiSuggestion: "Otomatik yükleme zorunluluğu, fatura birleştirme opsiyonunu kapat." },
    { id: "t4", customerName: "Başkent Üniversitesi Fiber", urgency: "ORTA", amount: 920_000, costOfInactionMonthly: 14_500, aiSuggestion: "Yıllık ön ödeme iskontosu öner (%8), 2 yıllık taahhüt bağla." },
    { id: "t5", customerName: "GoldStar M2M Filo Çözümü", urgency: "ORTA", amount: 640_000, costOfInactionMonthly: 8_200, aiSuggestion: "Cihaz başı ARPU eşiğini artır, inaktif SIM iptali başlat." },
  ],
  strategy: {
    runs: [
      { id: "20260404_1849", date: "04 Nisan 2026 - 18:49", urgency: "ORTA", status: "YELLOW", portfolioRisk: 0.38, totalExposure: 18_600_000, accountsFlagged: 12, isLatest: true },
      { id: "20260328_0900", date: "28 Mart 2026 - 09:00", urgency: "ORTA", status: "YELLOW", portfolioRisk: 0.35, totalExposure: 17_200_000, accountsFlagged: 10, isLatest: false },
      { id: "20260321_0900", date: "21 Mart 2026 - 09:00", urgency: "DÜŞÜK", status: "GREEN", portfolioRisk: 0.28, totalExposure: 14_800_000, accountsFlagged: 7, isLatest: false },
    ],
    detail: {
      executiveSummary: "Telco portföyünde en kritik sinyal NexusCorp Kurumsal Hat hesabında 3.850.000 TL açık pozisyondur. Hat pasifleştirme + taahhüt yenileme ile 8.990.000 TL MRR koruması mümkün. Churn riski %75; 12 kurumsal hesap rakibe geçiş hazırlığında.",
      metrics: { totalExposure: 18_600_000, forecast12w: 52_000_000, weeklyAvg: 4_333_000, netCashWeekly: 1_240_000, portfolioRisk: 0.38, latePaymentPct: 2.8, trend: "%4 Artış" },
      impactAnalysis: {
        inactionCostWeekly: 118_000,
        totalInvoicesAffected: 4500,
        departmentLoad: [
          { dept: "Kurumsal Tahsilat", taskCount: 4, label: "Enterprise Hesap Yöneticisi" },
          { dept: "Churn Önleme Ekibi", taskCount: 3, label: "Müşteri Başarı Uzmanı" },
        ],
      },
      recoveryAnalysis: {
        funnel: [
          { label: "Churn Risk Pozisyonu", value: 12_300_000, color: "bg-amber-500", width: "100%" },
          { label: "AI Hedeflenen Koruma", value: 8_990_000, color: "bg-emerald-500", width: "73%" },
          { label: "Beklenen Churn Kaybı", value: 3_310_000, color: "bg-red-500", width: "27%" },
        ],
        matrix: [
          { id: "T01", x: 90, y: 3.85, risk: 0.38, label: "NexusCorp" },
          { id: "T02", x: 75, y: 2.1, risk: 0.32, label: "Zirve" },
          { id: "T03", x: 60, y: 1.48, risk: 0.25, label: "MetroLine" },
          { id: "T04", x: 45, y: 0.92, risk: 0.18, label: "Başkent" },
        ],
      },
      scenarios: [
        { id: 1, isRecommended: true, name: "Senaryo 1: Taahhüt Yenileme Önerisi", description: "Risk altındaki kurumsal hatlara özel indirimli yenileme paketleri sunulur. Churn %75'ten %28'e düşer.", expectedRecovery: 8_990_000, timeframe: "21-30 gün", clientLossRisk: "%8-15", cost: "İndirim Maliyeti: 485.000 TL" },
        { id: 2, isRecommended: false, name: "Senaryo 2: Agresif Hat Kesme", description: "Tüm geciken kurumsal hatlar 15 gün içinde pasifleştirilir. Nakit hızlı ama MRR kaybı büyük.", expectedRecovery: 7_840_000, timeframe: "15-20 gün", clientLossRisk: "%55-70", cost: "Cihaz Geri Alım: 320.000 TL" },
      ],
      pipelineDetails: { triggerLog: "Modül 1 → Churn 0.38 + Modül 3 → YELLOW", confidence: "%87", urgency: "ORTA", timestamp: "2026-04-04T18:49:00", weakestLink: 320_000, strongestLink: 3_850_000, cashFlow: { weekly: 1_240_000, monthly: 5_370_000, quarterly: 16_100_000 } },
      accounts: [
        { id: "T-CORP-01", name: "NexusCorp Kurumsal Hat", tier: 1, exposure: 3_850_000, riskBucket: "High Risk", overdue: 45, expectedRecovery: 2_800_000, actionType: "TAAHHÜT YENİLEME", aiInstruction: "Hesap yöneticisini bugün ara; yıllık %12 indirimli yenileme paketi sun.", financialRationale: "Aylık 118.000 TL MRR kaybı; hat kaybı halinde yıllık 1.4M TL.", relationshipNote: "2.4K aboneli kurumsal hat; rakibe geçerse referans domino etkisi.", steps: [{ id: "T-CORP-01-s1", day: "Gün 1", title: "Hesap yöneticisi araması", aiInstruction: "Taahhüt yenileme paketini sun." }, { id: "T-CORP-01-s2", day: "Gün 5", title: "Cihaz yenileme teklifi", aiInstruction: "Sübvansiyonlu cihaz paketiyle birleştir." }] },
        { id: "T-VPN-02", name: "Zirve Holding VPN Hizmeti", tier: 2, exposure: 2_100_000, riskBucket: "Medium Risk", overdue: 38, expectedRecovery: 1_680_000, actionType: "SLA DEVREYE AL", aiInstruction: "SLA ceza klozunu işleme al, cihaz geri alım bilgilendirmesi yap.", financialRationale: "Aylık 64.000 TL kayıp; enterprise segmentinde imaj riski.", relationshipNote: "VPN hizmeti iş kritik; çözümü müzakere öncelikli.", steps: [{ id: "T-VPN-02-s1", day: "Gün 1", title: "SLA ceza bildirimi", aiInstruction: "Resmi SLA ihlal yazısı gönder." }] },
      ],
    },
  },
  kanban: [
    { id: "T-CORP-01", company: "NexusCorp Kurumsal Hat", exposure: 3_850_000, delay: "45 Gün", risk: "Yüksek (0.38)", action: "Taahhüt Yenileme Sunuldu", status: "Bekliyor", filterCategory: "bekleyen" },
    { id: "T-VPN-02", company: "Zirve Holding VPN", exposure: 2_100_000, delay: "38 Gün", risk: "Orta (0.32)", action: "SLA Müzakeresi", status: "İşlemde", filterCategory: "aktif" },
    { id: "T-MPR-03", company: "MetroLine Toplu Prepaid", exposure: 1_480_000, delay: "28 Gün", risk: "Orta (0.25)", action: "Otomatik Yükleme Aktif Değil", status: "SLA Aşımı", filterCategory: "zaman_asimi" },
    { id: "T-M2M-04", company: "GoldStar M2M Filo", exposure: 640_000, delay: "120 Gün", risk: "Kritik (0.88)", action: "Hat Kesildi / Hukuk", status: "Reddedildi / Hukuk", filterCategory: "riskli" },
  ],
  accountProfile: {
    id: "T-CORP-01",
    name: "NexusCorp Kurumsal Hat",
    exposure: 3_850_000,
    expectedRecovery: 2_800_000,
    weeklyInactionCost: 27_500,
    delayDays: 45,
    riskScore: 0.38,
    riskBucket: "Yüksek Risk",
    assignedRole: "Enterprise Hesap Yöneticisi",
    module1: {
      probability: [
        { name: probabilityPalette[0].name, val: 15, color: probabilityPalette[0].color },
        { name: probabilityPalette[1].name, val: 22, color: probabilityPalette[1].color },
        { name: probabilityPalette[2].name, val: 28, color: probabilityPalette[2].color },
        { name: probabilityPalette[3].name, val: 18, color: probabilityPalette[3].color },
        { name: probabilityPalette[4].name, val: 10, color: probabilityPalette[4].color },
        { name: probabilityPalette[5].name, val: 7, color: probabilityPalette[5].color },
      ],
      invoices: [
        { id: "TLC-2026-0412", date: "10.03.2026", amount: 1_450_000, daysDelay: "-45 Gün", statusText: "Churn Risk Alarm", statusType: "critical" },
        { id: "TLC-2026-0388", date: "28.02.2026", amount: 1_280_000, daysDelay: "-55 Gün", statusText: "Ödeme Davranış Bozukluğu", statusType: "severe" },
        { id: "TLC-2026-0345", date: "15.02.2026", amount: 1_120_000, daysDelay: "-68 Gün", statusText: "Hat Pasifleştirme Eşiği", statusType: "severe" },
      ],
    },
    module3: { cashGapBefore: 28, cashGapAfter: 38, runwayBefore: 42, runwayAfter: 34, gapDeltaPct: 10, runwayDeltaDays: 8 },
  },
};

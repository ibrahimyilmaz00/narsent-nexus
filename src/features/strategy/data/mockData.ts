export const dashboardData = {
  executiveSummary: "Portföyün en kritik risk sinyali şu anda 10.278.808 TL tutarındaki Hesap 0190'da görülmektedir. Önerilen acil eylem, Formal Demand Plus Restructuring yöntemiyle Hesap 0095 ve Hesap 0378'e odaklanarak 21.615.988 TL'lik bir kurtarma potansiyeli sunmaktadır. Beklenen finansal etki haftalık 457.308 TL'lik inaksiyon maliyetinin azaltılmasıdır.",
  metrics: { totalExposure: "352.935.694 TL", forecast12w: "79.969.438 TL", weeklyAvg: "6.664.120 TL", netCashWeekly: "290.203 TL", portfolioRisk: 0.363, latePaymentPct: 54.9, trend: "%79.4 Artış" },
  impactAnalysis: {
    inactionCostWeekly: "457.308 TL",
    totalInvoicesAffected: 16833,
    departmentLoad: [
      { dept: "Tahsilat Birimi", taskCount: 4, label: "Kıdemli Uzman / Koordinatör" },
      { dept: "Satış Operasyonları", taskCount: 2, label: "Müşteri Başarı Uzmanı" }
    ]
  },
  recoveryAnalysis: {
    funnel: [
      { label: "Yönetilen Riskli Pozisyon", value: "91.4M TL", color: "bg-amber-500", width: "100%" },
      { label: "AI Hedeflenen Kurtarım", value: "65.8M TL", color: "bg-emerald-500", width: "72%" },
      { label: "Beklenen Risk Payı (Kayıp)", value: "25.6M TL", color: "bg-red-500", width: "28%" }
    ],
    matrix: [
      { id: "0095", x: 668, y: 18.6, risk: 0.24, label: "0095" },
      { id: "0378", x: 831, y: 14.5, risk: 0.35, label: "0378" },
      { id: "0015", x: 735, y: 18.1, risk: 0.18, label: "0015" },
      { id: "0086", x: 877, y: 17.0, risk: 0.20, label: "0086" },
      { id: "0156", x: 829, y: 12.7, risk: 0.31, label: "0156" },
      { id: "0190", x: 792, y: 10.2, risk: 0.45, label: "0190" }
    ]
  },
  scenarios: [
    { id: 1, isRecommended: true, name: "Senaryo 1: Kademeli Tahsilat", description: "Her hesap kendi Risk Kademesine (Segmentine) göre kalibre edilmiş müdahale alır. Hukuki süreç otomatik eskalasyon yolunun sonunda devreye girer.", expected_recovery_tl: "65.809.249 TL", timeframe: "30-60 gün", client_loss_risk: "%5-10", cost: "İskonto Maliyeti: 2.286.545 TL" },
    { id: 2, isRecommended: false, name: "Senaryo 2: Eşzamanlı Agresif Tahsilat", description: "Tüm hesaplarda aynı anda kredi dondurma + noter ihtarı. Hızlı nakit ama kalıcı ilişki hasarı.", expected_recovery_tl: "62.194.016 TL", timeframe: "15-30 gün", client_loss_risk: "%25-40", cost: "Hukuki Maliyet: 457.309 TL" }
  ],
  pipelineDetails: {
    triggerLog: "Modül 1 → Risk 0.363 + Modül 3 → DÜŞÜK RİSK", confidence: "%11", urgency: "DÜŞÜK", timestamp: "2026-04-04T18:49:00", weakestLink: "892.773 TL", strongestLink: "7.918.815 TL",
    cashFlow: { weekly: "290.203 TL", monthly: "5.940.041 TL", quarterly: "54.880.817 TL" }
  },
  accounts: [
    { 
      id: "0095", name: "Demirören Yapı A.Ş.", tier: 1, exposure: "18.666.794 TL", riskBucket: "Düşük Risk", overdue: 668, expectedRecovery: "12.133.416 TL", actionType: "RESMİ İHTAR", 
      aiInstruction: "Hesap 0095 yöneticisini BUGÜN ara; 668 günlük gecikme gerekçesiyle yapılandırma sun.", 
      financialRationale: "Her hafta hareketsiz geçen 93.334 TL finansman maliyeti yaratıyor — 90 gün daha beklenmesi 1.213.342 TL ek yük demek. 668 günlük gecikmiş hesap, 90 gün daha izlenirse batık kategorisine geçiş olasılığı %62'ye yükseliyor; o noktada geri kazanım %15'e düşer.",
      relationshipNote: "Risk skoru düşük (0.241). 668 günlük gecikmeye rağmen ticari ilişki değeri yüksek; yapılandırma teklifini reddettiği takdirde bile hukuki süreçten önce kesinlikle ikinci bir görüşme yapılmalıdır.",
      steps: [{ id: "s1-1", day: "Gün 1", title: "Acil görüşme talep et.", aiInstruction: "Yöneticiyi ara ve görüş." }, { id: "s1-2", day: "Gün 3", title: "Taahhütname al.", aiInstruction: "E-posta ile taahhütname ilet." }, { id: "s1-3", day: "Gün 7", title: "Limiti %50 düşür.", aiInstruction: "ERP limit düşümü." }] 
    },
    { id: "0378", name: "Ağaoğlu Grup", tier: 1, exposure: "14.588.572 TL", riskBucket: "Düşük Risk", overdue: 831, expectedRecovery: "9.482.572 TL", actionType: "RESMİ İHTAR", aiInstruction: "Hesap 0378 yöneticisini BUGÜN ara; 831 günlük gecikme gerekçesiyle acil görüşme talep et.", steps: [{ id: "s2-1", day: "Gün 1", title: "Acil görüşme talep et.", aiInstruction: "Telefonda yapılandırma sun." }] },
    { id: "0015", name: "Kalyon İnşaat", tier: 2, exposure: "18.105.081 TL", riskBucket: "Düşük Risk", overdue: 735, expectedRecovery: "12.311.455 TL", actionType: "BLOKE VE YAPILANDIRMA", aiInstruction: "ERP'de yeni vadeli satış girişlerini BUGÜN blokla; %20 peşin zorunlu yapılandırma gönder.", steps: [{ id: "s3-1", day: "Gün 1", title: "Satışları blokla.", aiInstruction: "ERP'de hesabı durdur." }] },
    { id: "0086", name: "Limak Holding", tier: 2, exposure: "17.036.870 TL", riskBucket: "Düşük Risk", overdue: 877, expectedRecovery: "11.585.072 TL", actionType: "BLOKE VE YAPILANDIRMA", aiInstruction: "ERP'de yeni vadeli satışları blokla ve resmi yapılandırma teklifi gönder.", steps: [{ id: "s4-1", day: "Gün 1", title: "Satışları blokla.", aiInstruction: "ERP engeli koy." }] },
    { id: "0156", name: "Rönesans Holding", tier: 3, exposure: "12.785.663 TL", riskBucket: "Düşük Risk", overdue: 829, expectedRecovery: "11.251.383 TL", actionType: "PROAKTİF İLETİŞİM", aiInstruction: "Bu hafta değer görüşmesi yap; %1.5 erken ödeme iskontosu teklif et.", steps: [{ id: "s5-1", day: "Gün 1", title: "İskonto teklifi sun.", aiInstruction: "15 gün geçerli iskonto maili at." }] },
    { id: "0190", name: "Cengiz Holding", tier: 3, exposure: "10.278.808 TL", riskBucket: "Orta Risk", overdue: 792, expectedRecovery: "9.045.351 TL", actionType: "PROAKTİF İLETİŞİM", aiInstruction: "Bu hafta değer görüşmesi yap; %1.5 erken ödeme iskontosu teklif et.", steps: [{ id: "s6-1", day: "Gün 1", title: "İskonto teklifi sun.", aiInstruction: "Müşteri başarı görüşmesi yap." }] }
  ]
};

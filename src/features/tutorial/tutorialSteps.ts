export type ViewMode = 'dashboard' | 'actions' | 'account-profile' | 'kanban-archive' | 'horizon_strategy' | 'performance';

export interface TutorialStep {
  id: string;
  selector?: string;
  title: string;
  description: string;
  buttonText: string;
  side?: 'auto' | 'right' | 'bottom' | 'top' | 'left';
  navigateTo?: ViewMode;
  forceSidebar?: boolean;
  openDrawer?: boolean;
  closeDrawer?: boolean;
  openWidgetModal?: boolean;
  closeWidgetModal?: boolean;
  autoAddDemoWidgets?: boolean;
  noOverlay?: boolean;
  openOmnichannelModal?: boolean;
  closeOmnichannelModal?: boolean;
  autoSelectChannels?: boolean;
  clickOmnichannelSend?: boolean;
  fixedPosition?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'bottom-center';
  frameOnly?: boolean;
  triggerWidgetAdd?: boolean;
  triggerClick?: string;   // fires on ENTERING the step (350ms delay)
  advanceClick?: string;   // fires when user presses the advance button (before navigation)
  backOverrides?: {
    navigateTo?: ViewMode;
    forceSidebar?: boolean;
    openDrawer?: boolean;
    closeDrawer?: boolean;
    openWidgetModal?: boolean;
    closeWidgetModal?: boolean;
    openOmnichannelModal?: boolean;
    closeOmnichannelModal?: boolean;
    triggerClick?: string;
  };
}

export const tutorialSteps: TutorialStep[] = [
  // ── Makro Kokpit ─────────────────────────────────────────────
  {
    id: 'welcome',
    title: 'Narsent Nexus',
    description:
      'B2B finansal operasyonlarınızı gerçek zamanlı izleyen, yapay zeka destekli aksiyon önerileri sunan bir karar kokpiti. Birlikte bir tur atalım.',
    buttonText: 'Başlayalım',
  },
  {
    id: 'kpi-cards',
    selector: '[data-tutorial="kpi-cards"]',
    title: 'Temel Finansal Göstergeler',
    description:
      '90 günlük nakit projeksiyonu, haftalık net akış, portföy nakit ufku ve tahsil edilebilir toplam — anlık güncellenen dört kritik metrik.',
    buttonText: 'Devam',
    side: 'bottom',
  },
  {
    id: 'liquidity-chart',
    selector: '[data-tutorial="liquidity-chart"]',
    title: 'Likidite Projeksiyonu',
    description:
      'Tahsilat-ödeme dengesini çift eksenli grafikte izleyin. Kümülatif nakit pozisyonunuz dönemin kritik dönüm noktalarını gösterir.',
    buttonText: 'Devam',
    side: 'bottom',
  },
  {
    id: 'risk-matrix',
    selector: '[data-tutorial="risk-matrix"]',
    title: 'Risk Göç Matrisi',
    description:
      'Müşterilerinizin bu dönem hangi risk kategorisine geçtiğini görün. Portföy sağlığının en doğrudan ölçüsü.',
    buttonText: 'Devam',
    side: 'left',
  },
  {
    id: 'analytics-grid',
    selector: '[data-tutorial="analytics-grid"]',
    title: 'Analitik Panel',
    description:
      'Finansal etki dağılımı, sektörel konsantrasyon, likidite darboğaz takvimi ve en riskli müşteri listesi — tek ekranda dört mercek.',
    buttonText: 'Devam',
    side: 'top',
  },
  // ── Sidebar geçişi ────────────────────────────────────────────
  {
    id: 'sidebar-nav',
    selector: '[data-tutorial="sidebar"]',
    title: 'Horizon Karar Motoru',
    description:
      'Makro Kokpit\'te gördüğünüz risk sinyallerini somut aksiyon planına dönüştürmek için Horizon Karar Motoru\'nu açıyoruz.',
    buttonText: 'Gelecek Aksiyonlar →',
    side: 'right',
    forceSidebar: true,
  },
  // ── Gelecek Aksiyonlar ────────────────────────────────────────
  {
    id: 'actions-welcome',
    title: 'Gelecek Aksiyonlar',
    description:
      'Yapay zekanın önceliklendirdiği tahsilat görevleri ve risk müdahaleleri. Her kalem potansiyel finansal etkisiyle birlikte önünüze gelir.',
    buttonText: 'Göster',
    navigateTo: 'actions',
    forceSidebar: false,
  },
  {
    id: 'actions-header',
    selector: '[data-tutorial="actions-header"]',
    title: 'İş Emirleri & Gelecek Aksiyonlar',
    description:
      'Tüm aksiyon kalemleri; müşteri adı, vadesi geçen tutar, risk skoru ve öneri türüyle birlikte listelenir. Filtreler ve önceliklendirme buradan yönetilir.',
    buttonText: 'Devam',
    side: 'bottom',
  },
  {
    id: 'action-table',
    selector: '[data-tutorial="action-table"]',
    title: 'Aksiyon Tablosu',
    description:
      'Her satır tıklanabilir — müşteri profiline geçiş, AI önerisi okuma ve göreve dönüştürme işlemleri doğrudan buradan başlar. İlk aksiyona bakalım.',
    buttonText: 'İncele →',
    side: 'top',
    closeDrawer: true,
  },
  // ── Aksiyon Drawer ────────────────────────────────────────────
  {
    id: 'drawer-header',
    selector: '[data-tutorial="drawer-header"]',
    title: 'Aksiyon Detay Paneli',
    description:
      'Müşteri bazlı aksiyon kartı: güven skoru, kritik uyarılar ve AI tarafından oluşturulan müdahale önerisi tek ekranda görüntülenir.',
    buttonText: 'Devam',
    side: 'left',
    openDrawer: true,
  },
  {
    id: 'drawer-ai-command',
    selector: '[data-tutorial="drawer-ai-command"]',
    title: 'Önerilen Aksiyon Komutu',
    description:
      'Yapay zeka, müşterinin ödeme geçmişini ve piyasa sinyallerini sentezleyerek en yüksek başarı ihtimali olan müdahaleyi belirler.',
    buttonText: 'Devam',
    side: 'left',
  },
  {
    id: 'drawer-execution',
    selector: '[data-tutorial="drawer-execution"]',
    title: 'Otomatik İcra Senaryosu',
    description:
      'Aksiyon onaylanır onaylanmaz 3 aşamalı icra başlar: ilk gün bildirim, 7. gün limit kısıtı, 14. gün hukuki süreç — her adım izlenebilir.',
    buttonText: 'Devam',
    side: 'left',
  },
  {
    id: 'drawer-footer',
    selector: '[data-tutorial="drawer-footer"]',
    title: 'Karar Paneli',
    description:
      'Onayla, revize et, ertele ya da reddet — her karar kayıt altına alınır ve portföy genelinde öğrenme döngüsüne dahil edilir. Şimdi müşteri profiline geçelim.',
    buttonText: 'Detaylı İncele →',
    side: 'top',
    backOverrides: {
      navigateTo: 'actions',
      openDrawer: true,
    },
  },
  // ── Müşteri Profil Sayfası ────────────────────────────────────
  {
    id: 'profile-welcome',
    title: 'Müşteri Profil Sayfası',
    description:
      'Her müşteri için tam karar odası: risk metrikleri, açık pozisyonlar, yapay zeka tavsiyeleri ve icra planı tek ekranda.',
    buttonText: 'Keşfet',
    navigateTo: 'account-profile',
    closeDrawer: true,
  },
  {
    id: 'profile-header',
    selector: '[data-tutorial="profile-header"]',
    title: 'Müşteri Kimliği & Risk Durumu',
    description:
      'Firma adı, hesap ID\'si, risk skoru, gecikme günü ve atanan sorumlu — anlık güncellenen durum bilgileri.',
    buttonText: 'Devam',
    side: 'bottom',
  },
  {
    id: 'profile-financials',
    selector: '[data-tutorial="profile-financials"]',
    title: 'Finansal Özet',
    description:
      'Açık pozisyon, beklenen kurtarım ve haftalık inaksiyon maliyeti — karar anında ihtiyaç duyulan üç kritik finansal gösterge.',
    buttonText: 'Devam',
    side: 'bottom',
  },
  {
    id: 'profile-modules',
    selector: '[data-tutorial="profile-modules"]',
    title: 'Analiz Modülleri',
    description:
      'Modül 1 tahsilat riskini, Modül 3 likidite etkisini modelliyor. Her modül yapay zeka çıktılarını yorumlanabilir finansal sinyallere dönüştürür.',
    buttonText: 'Devam',
    side: 'right',
  },
  // ── Widget Sistemi ────────────────────────────────────────────
  {
    id: 'profile-widgets',
    selector: '[data-tutorial="profile-widgets"]',
    title: 'Kişisel Widget Paneli',
    description:
      'Ekranın alt kısmını dilediğiniz analizlerle kişiselleştirebilirsiniz. Modül, metrik ve grafik türü seçerek özel widgetlar oluşturabilirsiniz. Şimdi kataloğu açalım.',
    buttonText: 'Kataloğu Aç',
    side: 'top',
    backOverrides: {
      closeWidgetModal: true,
    },
  },
  {
    id: 'widget-catalog',
    title: 'Widget Kataloğu',
    description:
      'Modülü, metriği ve grafik türünü seçin — widget anında oluşturulur. Katalogda seçim yapmak zorunda değilsiniz; "Widget Ekle"ye basın, sistem ilk seçimi eklesin.',
    buttonText: 'Widget Ekle',
    noOverlay: true,
    openWidgetModal: true,
    fixedPosition: 'bottom-center',
    triggerWidgetAdd: true,
  },
  {
    id: 'profile-widgets-result',
    selector: '[data-tutorial="profile-widgets"]',
    title: 'Widgetlar Oluşturuldu',
    description:
      'Seçilen analizler panele eklendi. "Yeni Ekle" butonuyla istediğiniz sayıda widget ekleyebilir, mevcut olanları silebilirsiniz.',
    buttonText: 'Devam',
    side: 'top',
    closeWidgetModal: true,
    autoAddDemoWidgets: true,
  },
  // ── Acil Aksiyon & AI Rasyoneli ──────────────────────────────
  {
    id: 'acil-aksiyon',
    selector: '[data-tutorial="acil-aksiyon"]',
    title: 'Acil Aksiyon Komutu',
    description:
      'Yapay zeka, müşteri geçmişini ve piyasa sinyallerini sentezleyerek bugün uygulanması gereken tek bir aksiyon komutunu belirler. "Aksiyonu Başlat" ile doğrudan ERP\'ye iletilebilir.',
    buttonText: 'Devam',
    fixedPosition: 'bottom-left',
  },
  {
    id: 'ai-rasyonel',
    selector: '[data-tutorial="ai-rasyonel"]',
    title: 'AI Rasyoneli & Strateji Notu',
    description:
      'Kök neden analizi ve ilişki stratejisi: neden bu müşteri, neden şimdi, nasıl bir yaklaşım? Her karar açıklanabilir yapay zeka çıktısına dayanır.',
    buttonText: 'Devam',
    fixedPosition: 'bottom-left',
  },
  // ── İcra Süreci ───────────────────────────────────────────────
  {
    id: 'icra-sureci',
    selector: '[data-tutorial="icra-sureci"]',
    title: 'Beklenen İcra Süreci',
    description:
      'Her adım izlenebilir ve görevlendirilebilir. Birinci adım aktif, sonrakiler sırayla devreye girer. "Görevi Aç" ile ekibe dağıtım başlatıyoruz.',
    buttonText: 'Görevi Aç →',
    fixedPosition: 'bottom-left',
    backOverrides: {
      closeOmnichannelModal: true,
    },
  },
  // ── Aksiyon Dağıtım Merkezi ───────────────────────────────────
  {
    id: 'omni-channels',
    selector: '[data-tutorial="omni-channels"]',
    title: 'Dağıtım Kanalları',
    description:
      'WhatsApp, Slack, Jira, e-posta ve daha fazlası — bir aksiyon aynı anda birden fazla kanala iletilebilir. Ekip üyelerine, yöneticilere veya sistemlere anında ulaşın.',
    buttonText: 'Devam',
    openOmnichannelModal: true,
    autoSelectChannels: true,
    fixedPosition: 'bottom-right',
    frameOnly: true,
  },
  {
    id: 'omni-message',
    selector: '[data-tutorial="omni-message"]',
    title: 'AI Tarafından Oluşturulan Mesaj',
    description:
      'Sistem uyarısı, hesap bilgileri, gecikme detayı ve finansal gerekçe — mesaj içeriği yapay zeka tarafından otomatik olarak derlenir. Gerekirse düzenlenebilir.',
    buttonText: 'Dağıtımı Başlat',
    fixedPosition: 'bottom-right',
    frameOnly: true,
    backOverrides: {
      openOmnichannelModal: true,
    },
  },
  {
    id: 'omni-success',
    title: 'Dağıtım Tamamlandı',
    description:
      'Aksiyon bildirimleri ve görevler seçilen kanallara başarıyla iletildi. Süreç kayıt altına alındı ve portföy öğrenme döngüsüne dahil edildi.',
    buttonText: 'Devam',
    noOverlay: true,
    clickOmnichannelSend: true,
    fixedPosition: 'bottom-right',
    backOverrides: {
      openOmnichannelModal: true,
    },
  },
  // ── Eskalasyon ─────────────────────────────────────────────────
  {
    id: 'eskalasyon',
    selector: '[data-tutorial="eskalasyon"]',
    title: 'Eskalasyon Matrisi',
    description:
      'AI\'nin öngördüğü zaman çizelgesi: her güne özel talimat ve beklenen etki. Yanıt alınamazsa süreç otomatik olarak bir sonraki eskalasyon aşamasına geçer.',
    buttonText: 'Devam',
    fixedPosition: 'bottom-left',
    closeOmnichannelModal: true,
  },
  // ── Horizon Strategy ──────────────────────────────────────────
  {
    id: 'sidebar-to-horizon',
    selector: '[data-tutorial="sidebar"]',
    title: 'Horizon Strategy',
    description:
      'AI tarafından dönemsel olarak üretilen portföy optimizasyon raporları Horizon Strategy modülünde toplanır. Oraya geçiyoruz.',
    buttonText: 'Horizon Strategy →',
    side: 'right',
    forceSidebar: true,
    backOverrides: {
      navigateTo: 'account-profile',
      forceSidebar: true,
    },
  },
  {
    id: 'horizon-welcome',
    title: 'Strateji Motoru (Pipeline) Arşivi',
    description:
      'Her pipeline koşusu, tüm portföyünüzü tarayarak dönemsel bir optimizasyon raporu üretir. Açık pozisyon toplamı, işlem gören firma sayısı ve risk skoru buradan izlenir.',
    buttonText: 'Devam',
    noOverlay: true,
    navigateTo: 'horizon_strategy',
    forceSidebar: false,
  },
  {
    id: 'horizon-runs-list',
    selector: '[data-tutorial="horizon-runs"]',
    title: 'Pipeline Koşu Arşivi',
    description:
      'Geçmiş ve güncel koşular burada listelenir. Her satır tıklanabilir; koşunun ürettiği optimizasyon raporuna doğrudan erişilir. En güncel raporu açıyoruz.',
    buttonText: 'Raporu Aç →',
    side: 'top',
    advanceClick: '[data-tutorial="horizon-run-first"]',
  },
  // ── Portföy Optimizasyon Raporu ───────────────────────────────
  {
    id: 'horizon-detail-header',
    selector: '[data-tutorial="horizon-header"]',
    title: 'Portföy Optimizasyon Raporu',
    description:
      'Pipeline ID, üretim tarihi ve genel portföy durumu başlık bölümünde özetlenir. Her rapor bağımsızdır; geçmiş koşularla kıyaslama yapılabilir.',
    buttonText: 'Devam',
    side: 'bottom',
  },
  {
    id: 'horizon-executive',
    selector: '[data-tutorial="horizon-executive"]',
    title: 'Yönetici Özeti (AI Insight)',
    description:
      'Yapay zeka tüm portföyü okuyarak en kritik sinyali tek paragrafta özetler. Hangi hesap, hangi risk, hangi eylem — yönetim için özet.',
    buttonText: 'Devam',
    side: 'bottom',
  },
  {
    id: 'horizon-kpis',
    selector: '[data-tutorial="horizon-kpis"]',
    title: 'Portföy Nabzı & Likidite',
    description:
      'Kompozit risk skoru, geç ödeme oranı, 12 haftalık nakit tahmini ve toplam açık risk — portföyün anlık sağlık göstergeleri.',
    buttonText: 'Devam',
    side: 'bottom',
  },
  {
    id: 'horizon-scenarios',
    selector: '[data-tutorial="horizon-scenarios"]',
    title: 'Stratejik Senaryo Karşılaştırması',
    description:
      'Yapay zeka iki farklı aksiyon stratejisi üretir: beklenen kurtarım tutarı, hedef süre ve müşteri kaybı riski yan yana gösterilir. AI önerisi olan Senaryo 1\'in operasyon planına bakıyoruz.',
    buttonText: 'Senaryo 1\'i İncele →',
    side: 'top',
    advanceClick: '[data-tutorial="horizon-scenario1-incele"]',
    backOverrides: {
      triggerClick: '[data-tutorial="horizon-drawer-close"]',
    },
  },
  // ── Operasyon Planı Drawer ────────────────────────────────────
  {
    id: 'horizon-drawer-intro',
    selector: '[data-tutorial="horizon-drawer-header"]',
    title: 'Operasyon Planı',
    description:
      'Senaryo 1\'e ait hesap listesi: tier sıralaması, açık pozisyon ve beklenen kurtarım tutarı. Onay verildiğinde bu hesaplar için otomatik iş emirleri oluşturulur.',
    buttonText: 'Devam',
    fixedPosition: 'bottom-left',
  },
  {
    id: 'horizon-account-expand',
    selector: '[data-tutorial="horizon-drawer-body"]',
    title: 'Hesap Detayları',
    description:
      'Her hesap genişletilebilir: finansal gerekçe, ticari ilişki notu ve AI tarafından önerilen operasyon adımları görüntülenir.',
    buttonText: 'Devam',
    fixedPosition: 'bottom-left',
    triggerClick: '[data-tutorial="horizon-account-expand"]',
  },
  {
    id: 'horizon-step-check',
    selector: '[data-tutorial="horizon-drawer-body"]',
    title: 'Operasyon Adımlarını Onayla',
    description:
      'Her adımı onaylayarak iş emirleri listesine ekleyebilirsiniz. Onaylanan adımlar "Seçili İş Emirlerini Dağıt" butonu ile toplu gönderilir.',
    buttonText: 'Devam',
    fixedPosition: 'bottom-left',
    triggerClick: '[data-tutorial="horizon-step-check"]',
  },
  {
    id: 'horizon-step-eye',
    selector: '[data-tutorial="horizon-drawer-body"]',
    title: 'AI İçerik Önizlemesi',
    description:
      'Göz ikonuna tıklayarak adım için AI\'nin ürettiği sistem komutunu ve mesaj taslağını görebilirsiniz. Gönderim öncesi içerik incelenip düzenlenebilir.',
    buttonText: 'Devam',
    fixedPosition: 'bottom-left',
    triggerClick: '[data-tutorial="horizon-step-eye"]',
  },
  {
    id: 'horizon-step-gear',
    selector: '[data-tutorial="horizon-drawer-body"]',
    title: 'Kanal Seçimi & Dağıtım',
    description:
      'Ayar ikonuna tıklayarak bu adım için dağıtım kanallarını seçebilirsiniz — WhatsApp, e-posta, Slack veya Jira. Kanal bazlı görev ataması buradan yapılır.',
    buttonText: 'Devam',
    fixedPosition: 'bottom-left',
    triggerClick: '[data-tutorial="horizon-step-gear"]',
    noOverlay: true,
  },
  {
    id: 'horizon-deploy-footer',
    selector: '[data-tutorial="horizon-drawer-deploy"]',
    title: 'Toplu İş Emri Dağıtımı',
    description:
      'Seçilen görevler toplu olarak dağıtılır. Her onaylı adım sisteme iletilir, Kanban arşivine düşer ve departman bazında izlenmeye başlar.',
    buttonText: 'Devam →',
    fixedPosition: 'bottom-left',
    triggerClick: '[data-tutorial="omni-modal-x"]',
    advanceClick: '[data-tutorial="horizon-drawer-close"]',
  },
  // ── Raporun Geri Kalanı ───────────────────────────────────────
  {
    id: 'horizon-impact',
    selector: '[data-tutorial="horizon-impact"]',
    title: 'Finansal Etki & Operasyonel Yük',
    description:
      'Haftalık inaksiyon maliyeti ve departman iş yükü dağılımı: aksiyonsuz geçen her haftanın portföye olan finansal yükü burada görülür.',
    buttonText: 'Devam',
    fixedPosition: 'bottom-left',
  },
  {
    id: 'horizon-waterfall',
    selector: '[data-tutorial="horizon-waterfall"]',
    title: 'Risk & Kurtarım Hunisi',
    description:
      'Toplam açık pozisyondan başlayarak kurtarılabilir tutara kadar finansal yolculuk görselleştirilir. Portföy aksiyon haritası ise hesapları risk ve gecikme ekseninde konumlandırır.',
    buttonText: 'Devam',
    fixedPosition: 'bottom-left',
  },
  {
    id: 'horizon-system',
    selector: '[data-tutorial="horizon-system"]',
    title: 'Sistem Analizi & Finansal Projeksiyon',
    description:
      'AI tetikleyici logu, net nakit projeksiyonu ve portföy uç değerleri — raporun teknik alt yapısını ve önümüzdeki 3 aya dair tahminleri gösterir.',
    buttonText: 'Devam',
    fixedPosition: 'bottom-left',
  },
  {
    id: 'demo-complete',
    title: 'Demo Tamamlandı',
    description:
      'Makro Kokpit\'ten başlayıp Gelecek Aksiyonlar\'a, Müşteri Profili\'nden Horizon Strategy\'ye kadar Narsent Nexus\'un tüm temel modüllerini gördünüz. Sistemi artık kendi portföyünüzle kullanmaya başlayabilirsiniz.',
    buttonText: 'Başlayalım',
  },
];

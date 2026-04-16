# Modül 1-2-3 Çıktı & Format Referansı (DF + Summary + XAI)

## Context

Payment prediction pipeline'ındaki Modül 1-2-3'ün tüm çıktıları (DataFrame'ler, summary dict'leri ve XAI blokları) — hem insan-okur liste biçiminde hem de makine-okur JSON biçiminde. Bu dosya [NARS/collections/payment_prediction_model/payment_prediction.py](NARS/collections/payment_prediction_model/payment_prediction.py), [tools/xai_explainer.py](NARS/collections/payment_prediction_model/tools/xai_explainer.py), [tools/module1_derived_metrics.py](NARS/collections/payment_prediction_model/tools/module1_derived_metrics.py) ve `documentation/MODULE{1,2,3}_SUMMARY.md` dosyalarından çıkarılan **gerçek** çıktı sözleşmesini yansıtır.

Pipeline ana giriş noktası: [payment_prediction.py:349-356](NARS/collections/payment_prediction_model/payment_prediction.py#L349-L356)

```python
return (
    module1_outputs_df,     # DataFrame  — per-invoice
    module1_summary,        # dict       — target metadata + portfolio özeti + xai
    module2_forecasts,      # DataFrame  — 12 haftalık forecast
    module3_outputs_df,     # DataFrame  — horizon bazlı (W/M/3M)
    module3_summary,        # dict       — overall flag + risk drivers + assumptions + xai
    module2_xai,            # dict       — Modül 2 XAI bloğu (summary içinde değil, ayrı)
)
```

**Not:** Modül 1 ve Modül 3'ün XAI'leri ilgili summary dict'in içinde `"xai"` anahtarı altında saklanır. Modül 2'nin XAI'si ise AYRI bir dönüş değeri olarak verilir (pipeline `module2_forecasts` bir DataFrame olduğu için summary'ye gömülmez).

---

# 📦 MODÜL 1 — Payment Behavior & Credit Risk

## 1A. `module1_outputs_df` (DataFrame) — Fatura başına bir satır

### Liste formatı — kolonlar

**Identifier / kontekst (cross-module FE'den gelir):**
- `AccountId` — müşteri kodu
- `ProductId` — ürün kodu
- `TransactionDate` — fatura tarihi
- `TransactionTotalAmount` — fatura tutarı (TL)
- `Days_Term` — ödeme vadesi (gün)
- `_TransactionSequenceID` — internal sıra anahtarı

**Ham tahminler ([module1_derived_metrics.py:87-120](NARS/collections/payment_prediction_model/tools/module1_derived_metrics.py#L87-L120)):**
- `Predicted_DaysToPay` — LightGBM regresör çıktısı (sürekli, gün)
- `Predicted_PaymentTimingBucket` — en olası bucket adı (str)
- `PaymentProbability_0-7_days`
- `PaymentProbability_8-15_days`
- `PaymentProbability_16-30_days`
- `PaymentProbability_31-60_days`
- `PaymentProbability_60+_days`
- `PaymentProbability_Unpaid`
- `DaysToPay_Source` — `ACTUAL_LEDGER` | `DSO_PROXY` | `GLOBAL_MEDIAN` (Tier 1/2/3)

**Türetilmiş satır metrikleri ([module1_derived_metrics.py:198-340](NARS/collections/payment_prediction_model/tools/module1_derived_metrics.py#L198-L340)):**
- `Expected_Payment_Date` — `TransactionDate + Predicted_DaysToPay`
- `Days_Remaining` — `Expected_Payment_Date − today` (negatif = gecikmiş)
- `IsLate` — nullable bool (paid late? NA=henüz ödenmemiş)
- `OnTimeLikelihood` — P(0-7)+P(8-15)+P(16-30), vadeye göre düzeltilmiş
- `RiskScore_derived` — P(31-60)+P(60+)+P(Unpaid)
- `AccountRiskScore_derived` — hesap bazlı 5-faktör ağırlıklı skor (aynı hesap için tüm faturalarda aynı değer)

### JSON şeması

```json
{
  "module1_outputs_df": {
    "type": "pandas.DataFrame",
    "granularity": "one row per invoice",
    "columns": {
      "AccountId": "str",
      "ProductId": "str",
      "TransactionDate": "datetime64[ns]",
      "TransactionTotalAmount": "float64  (TRY)",
      "Days_Term": "int  (payment terms in days)",
      "Predicted_DaysToPay": "float64  (LightGBM regressor)",
      "Predicted_PaymentTimingBucket": "str  (argmax bucket name)",
      "PaymentProbability_0-7_days":   "float64  [0,1]",
      "PaymentProbability_8-15_days":  "float64  [0,1]",
      "PaymentProbability_16-30_days": "float64  [0,1]",
      "PaymentProbability_31-60_days": "float64  [0,1]",
      "PaymentProbability_60+_days":   "float64  [0,1]",
      "PaymentProbability_Unpaid":     "float64  [0,1]",
      "DaysToPay_Source": "enum{ACTUAL_LEDGER,DSO_PROXY,GLOBAL_MEDIAN}",
      "Expected_Payment_Date": "datetime64[ns]",
      "Days_Remaining": "int  (negative = overdue)",
      "IsLate": "Int64  (nullable: 1=paid late, 0=on time, NA=unpaid)",
      "OnTimeLikelihood": "float64  [0,1]",
      "RiskScore_derived": "float64  [0,1]",
      "AccountRiskScore_derived": "float64  [0,1]  (5-factor weighted)"
    }
  }
}
```

## 1B. `module1_summary` (dict) — Target metadata + Portfolio + XAI

### Liste formatı

**Target engineering metadata (module1_targets.py):**
- `dtp_clip_p1`, `dtp_clip_p99` — outlier sınırları
- `bucket_label_encoder` — sınıf→index map
- `bucket_counts` — her bucket'taki örnek sayısı
- `tier_counts` — `{ACTUAL_LEDGER: N, DSO_PROXY: N, GLOBAL_MEDIAN: N}`

**Portfolio-level ([module1_derived_metrics.py:560-597](NARS/collections/payment_prediction_model/tools/module1_derived_metrics.py#L560-L597)):**
- `Late_Payment_Percentage` — % geç ödenmiş fatura
- `Late_Payment_Count` — geç ödeme sayısı
- `On_Time_Payment_Percentage` — % zamanında
- `Avg_Risk_Score` — portföy ort. risk
- `High_Risk_Count` — `RiskScore_derived > 0.7` sayısı
- `Avg_Predicted_DaysToPay`
- `Median_Predicted_DaysToPay`

**XAI bloğu** (`summary["xai"]`, bkz. 1C)

### JSON şeması

```json
{
  "module1_summary": {
    "dtp_clip_p1": "float",
    "dtp_clip_p99": "float",
    "bucket_label_encoder": {"0-7_days": 0, "8-15_days": 1, "16-30_days": 2, "31-60_days": 3, "60+_days": 4, "Unpaid": 5},
    "bucket_counts": {"0-7_days": "int", "...": "..."},
    "tier_counts": {"ACTUAL_LEDGER": "int", "DSO_PROXY": "int", "GLOBAL_MEDIAN": "int"},

    "Late_Payment_Percentage": "float  [0,100]",
    "Late_Payment_Count": "int",
    "On_Time_Payment_Percentage": "float  [0,100]",
    "Avg_Risk_Score": "float  [0,1]",
    "High_Risk_Count": "int",
    "Avg_Predicted_DaysToPay": "float",
    "Median_Predicted_DaysToPay": "float",

    "xai": "<Module1 XAI dict — see 1C>"
  }
}
```

## 1C. Modül 1 XAI — `module1_summary["xai"]`

Üretim: [xai_explainer.py:32-173](NARS/collections/payment_prediction_model/tools/xai_explainer.py#L32-L173)

### Liste formatı

**Top-level keys:** `code`, `message_tr`, `message_en`, `message` (= message_tr, backward-compat), `details` (liste), `params` (dict)

**`code` olası değerleri:** `M1_HIGH_RISK` (avg_risk>0.5) | `M1_MODERATE_RISK` (avg_risk>0.3 veya late_pct>30) | `M1_SAFE`

**`details` satırları (konsol çıktı blokları):**
- "─── PORTFÖY ÖZETİ / PORTFOLIO SUMMARY ───"
- "─── RİSK DAĞILIMI / RISK DISTRIBUTION ───"
- "─── ÖDEME TAHMİN DAĞILIMI / PAYMENT BUCKET DISTRIBUTION ───" (bar grafikli)
- "─── GEÇ ÖDEME YAPAN MÜŞTERİLER / LATE-PAYING ACCOUNTS ───" (top 5)
- "─── EN RİSKLİ MÜŞTERİLER / HIGHEST-RISK ACCOUNTS ───" (top 5)

**`params` alt alanları:** `avg_risk_score`, `late_payment_pct`, `late_payment_count`, `on_time_pct`, `high_risk_count`, `avg_dtp`, `median_dtp`, `avg_terms`, `delay_gap`, `total_invoices`, `risk_distribution`, `top_late_accounts`, `top_risky_accounts`, `bucket_breakdown`

### JSON şeması

```json
{
  "module1_xai": {
    "code": "enum{M1_HIGH_RISK, M1_MODERATE_RISK, M1_SAFE}",
    "message_tr": "str",
    "message_en": "str",
    "message": "str  (alias of message_tr)",
    "details": ["str", "..."],
    "params": {
      "avg_risk_score":    "float  [0,1]",
      "late_payment_pct":  "float  [0,100]",
      "late_payment_count":"int",
      "on_time_pct":       "float  [0,100]",
      "high_risk_count":   "int",
      "avg_dtp":           "float  (days)",
      "median_dtp":        "float  (days)",
      "avg_terms":         "float  (days)",
      "delay_gap":         "float  (avg_dtp - avg_terms)",
      "total_invoices":    "int",
      "risk_distribution": {
        "<band_name>": {"count": "int", "pct": "float", "avg_risk": "float"}
      },
      "top_late_accounts": [
        {"account_id":"str","late_count":"int","total_count":"int","late_rate_pct":"float","avg_dtp":"float","avg_risk":"float","total_amount":"float"}
      ],
      "top_risky_accounts": [
        {"account_id":"str","account_risk":"float","invoice_count":"int","avg_dtp":"float","total_amount":"float"}
      ],
      "bucket_breakdown": [["<bucket_name>","<pct float>"]]
    }
  }
}
```

---

# 📦 MODÜL 2 — Cash-In Forecaster v2

## 2A. `module2_forecasts` (DataFrame) — Hafta başına bir satır

### Liste formatı — kolonlar (12 satır, `step = 1..12`)

- `step` — hafta numarası (int, 1-12)
- `forecast` — beklenen nakit giriş (TL)
- `forecast_lower` — 95% CI alt sınır
- `forecast_upper` — 95% CI üst sınır
- `tier_confidence` — fatura destek oranı [0,1] (`amount_covered / expected`)
- `interval_width` — `upper − lower`

### JSON şeması

```json
{
  "module2_forecasts": {
    "type": "pandas.DataFrame",
    "granularity": "one row per future week (12 rows)",
    "columns": {
      "step":            "int  (1..12)",
      "forecast":        "float  (TRY, expected cash-in)",
      "forecast_lower":  "float  (95% CI lower)",
      "forecast_upper":  "float  (95% CI upper)",
      "tier_confidence": "float  [0,1]  (invoice-backing ratio)",
      "interval_width":  "float  (upper - lower)"
    },
    "horizon_aggregates_returned_in_result_dict": {
      "W":  {"expected":"float","std":"float","lower_95":"float","upper_95":"float"},
      "1M": {"expected":"float","std":"float","lower_95":"float","upper_95":"float"},
      "3M": {"expected":"float","std":"float","lower_95":"float","upper_95":"float"}
    }
  }
}
```

**Not:** `W` = Hafta 0, `1M` = Hafta 0-3, `3M` = Hafta 0-11. Bu agregatlar `Module2Forecaster.fit_and_forecast()`'un dönüş dict'inde ayrı anahtarlar olarak bulunur; `module2_forecasts` DataFrame'inin içinde değil.

## 2B. Modül 2 summary yok — yerine `module2_xai` (ayrı dönüş)

Modül 2 ayrı bir `summary` dict döndürmez. Yalnızca `fit_summary` metadata'sı üretilir ve doğrudan `module2_xai` üretiminde girdi olarak kullanılır. Pipeline son kullanıcıya `module2_xai` tuple'ın 6. elemanı olarak iletilir ([payment_prediction.py:321](NARS/collections/payment_prediction_model/payment_prediction.py#L321)).

**`fit_summary` alanları (internal):** `input_rows`, `total_weighted_cash_in`, `total_invoice_amount`, calibration_ratios, new_invoice_coverage_curve, payment_profile.

## 2C. Modül 2 XAI — `module2_xai`

Üretim: [xai_explainer.py:349-530](NARS/collections/payment_prediction_model/tools/xai_explainer.py#L349-L530)

### Liste formatı

**`code` olası değerleri:** `M2_DECLINING_TREND` (trend<-10%) | `M2_RISING_TREND` (trend>+10%) | `M2_LOW_CONFIDENCE` (avg_conf<0.70) | `M2_HIGH_UNCERTAINTY` (interval>40%) | `M2_STABLE`

**`details` satırları:**
- "─── TAHMİN ÖZETİ / FORECAST SUMMARY ───"  (toplam, alt/üst sınır, haftalık ort, min/max haftalar)
- "─── TREND ANALİZİ / TREND ANALYSIS ───"  (son 4 hafta karşılaştırması)
- "─── TAHMİN KAYNAĞI / FORECAST SOURCE ───"  (Fatura destekli / Karma / Run-rate hafta sayıları)
- "─── HAFTALIK TAHMİN TABLOSU / WEEKLY FORECAST TABLE ───"  (12 satır tablo)
- "─── VERİ META / DATA METADATA ───"

**`params` alt alanları:** `total_forecast`, `total_lower`, `total_upper`, `avg_weekly_forecast`, `min_week_forecast`, `max_week_forecast`, `min_week_step`, `max_week_step`, `forecast_steps`, `historical_4w_avg`, `historical_4w_total`, `trend_pct`, `avg_confidence`, `min_confidence`, `avg_interval_width_pct`, `input_rows`

### JSON şeması

```json
{
  "module2_xai": {
    "code": "enum{M2_DECLINING_TREND, M2_RISING_TREND, M2_LOW_CONFIDENCE, M2_HIGH_UNCERTAINTY, M2_STABLE}",
    "message_tr": "str",
    "message_en": "str",
    "message":    "str  (alias of message_tr)",
    "details":    ["str", "..."],
    "params": {
      "total_forecast":          "float  (TRY, sum over 12 weeks)",
      "total_lower":             "float",
      "total_upper":             "float",
      "avg_weekly_forecast":     "float",
      "min_week_forecast":       "float",
      "max_week_forecast":       "float",
      "min_week_step":           "int  (1..12)",
      "max_week_step":           "int  (1..12)",
      "forecast_steps":          "int  (=12)",
      "historical_4w_avg":       "float  (last 4 weeks mean)",
      "historical_4w_total":     "float  (last 4 weeks sum)",
      "trend_pct":               "float  (forecast vs historical % change)",
      "avg_confidence":          "float  [0,1]",
      "min_confidence":          "float  [0,1]",
      "avg_interval_width_pct":  "float  ((upper-lower)/forecast %)",
      "input_rows":              "int"
    }
  }
}
```

---

# 📦 MODÜL 3 — Cash Position & Liquidity Risk

## 3A. `module3_outputs_df` (DataFrame) — Horizon başına bir satır

### Liste formatı — index = `{W, M, 3M}`

**Cash-In:**
- `Cash_In_Expected` — simülasyon ortalaması
- `Cash_In_P10`, `Cash_In_P25`, `Cash_In_P50`, `Cash_In_P75`, `Cash_In_P90` — cash-in persentilleri

**Cash-Out:**
- `Cash_Out_OpEx` — sabit veya orantılı OpEx
- `Cash_Out_COGS` — değişken COGS
- `Cash_Out_Total` — simüle ort. toplam çıkış

**Net position:**
- `Net_Cash_Position` — Cash_In − Cash_Out ortalaması
- `Net_Cash_P10`, `Net_Cash_P25`, `Net_Cash_P50`, `Net_Cash_P75`, `Net_Cash_P90`

**Risk metrikleri:**
- `Cash_Deficit_Prob` — P(Net<0), [0,1]
- `Risk_Status_Flag` — `GREEN` / `YELLOW` / `RED` / `CRITICAL`
- `Cash_At_Risk_95` — E[net] − P5[net]
- `Cash_At_Risk_99` — E[net] − P1[net]
- `Forecast_Confidence` — kombine güven skoru
- `Delay_Risk_Adjustment` — uygulanan gecikme kayma faktörü
- `AR_Recovery_Uplift` — stokastik AR tahsilat katkısı

### JSON şeması

```json
{
  "module3_outputs_df": {
    "type": "pandas.DataFrame",
    "granularity": "one row per horizon",
    "index": ["W", "M", "3M"],
    "columns": {
      "Cash_In_Expected":      "float  (TRY, MC mean)",
      "Cash_In_P10":           "float",
      "Cash_In_P25":           "float",
      "Cash_In_P50":           "float",
      "Cash_In_P75":           "float",
      "Cash_In_P90":           "float",
      "Cash_Out_OpEx":         "float  (fixed or proportional)",
      "Cash_Out_COGS":         "float  (variable)",
      "Cash_Out_Total":        "float",
      "Net_Cash_Position":     "float  (Cash_In - Cash_Out mean)",
      "Net_Cash_P10":          "float",
      "Net_Cash_P25":          "float",
      "Net_Cash_P50":          "float",
      "Net_Cash_P75":          "float",
      "Net_Cash_P90":          "float",
      "Cash_Deficit_Prob":     "float  [0,1]  (P(net<0))",
      "Risk_Status_Flag":      "enum{GREEN,YELLOW,RED,CRITICAL}",
      "Cash_At_Risk_95":       "float  (E[net] - P5[net])",
      "Cash_At_Risk_99":       "float  (E[net] - P1[net])",
      "Forecast_Confidence":   "float  [0,1]",
      "Delay_Risk_Adjustment": "float  [0,0.5]",
      "AR_Recovery_Uplift":    "float  (TRY, mean stochastic recovery)"
    }
  }
}
```

**Flag eşikleri:** GREEN: deficit<10% | YELLOW: 10-30% | RED: 30-60% | CRITICAL: ≥60%

## 3B. `module3_summary` (dict)

### Liste formatı

**Top-level:**
- `overall_risk_flag` — `GREEN` / `YELLOW` / `RED` / `CRITICAL` (tüm horizon'lardaki en kötü)
- `risk_assessment` — açıklayıcı metin

**`risk_drivers` alt-dict:**
- `portfolio_risk_score` — Modül 1'den amount-weighted
- `late_payment_pct`
- `avg_days_late`
- `delay_shift_factor` — `clip(late*0.5 + risk*0.3, 0, 0.5)`
- `uncertainty_multiplier` — `clip(1 + risk*0.8 + late*0.4, 1.0, 2.0)`
- `at_risk_amount`
- `ar_recovery_by_horizon` — `{W, M, 3M}`

**`assumptions` alt-dict:**
- `opex_ratio` — orantılı mod katsayısı
- `fixed_monthly_opex` — sabit OpEx (TL/ay)
- `opex_mode` — `"fixed"` | `"proportional"`
- `expense_timing` — `"even"` | `"payroll_heavy"`
- `cogs_ratio_effective` — gerçek uygulanan COGS oranı
- `cogs_ratio_source` — `"data_driven"` | `"proxy"`
- `cogs_product_coverage` — veri kapsama oranı [0,1]
- `revenue_base_weekly` — haftalık gelir bazı (TL)
- `n_simulations` — MC adet (default 5000)

**`horizons` alt-dict:** `{W: {...}, M: {...}, 3M: {...}}` — her horizon için detay

**`xai` — bkz. 3C**

### JSON şeması

```json
{
  "module3_summary": {
    "overall_risk_flag": "enum{GREEN,YELLOW,RED,CRITICAL}",
    "risk_assessment":   "str",
    "risk_drivers": {
      "portfolio_risk_score":   "float  [0,1]",
      "late_payment_pct":       "float  [0,1]",
      "avg_days_late":          "float  (days)",
      "delay_shift_factor":     "float  [0,0.5]",
      "uncertainty_multiplier": "float  [1.0,2.0]",
      "at_risk_amount":         "float  (TRY)",
      "ar_recovery_by_horizon": {"W":"float","M":"float","3M":"float"}
    },
    "assumptions": {
      "opex_ratio":            "float  [0,1]",
      "fixed_monthly_opex":    "float  (TRY/month, 0 = not set)",
      "opex_mode":             "enum{fixed,proportional}",
      "expense_timing":        "enum{even,payroll_heavy}",
      "cogs_ratio_effective":  "float  [0.05,0.95]",
      "cogs_ratio_source":     "enum{data_driven,proxy}",
      "cogs_product_coverage": "float  [0,1]",
      "revenue_base_weekly":   "float  (TRY)",
      "n_simulations":         "int  (default 5000)"
    },
    "horizons": {
      "W":  {"cash_in":"float","cash_out":"float","net":"float","deficit_prob":"float","flag":"str"},
      "M":  {"cash_in":"float","cash_out":"float","net":"float","deficit_prob":"float","flag":"str"},
      "3M": {"cash_in":"float","cash_out":"float","net":"float","deficit_prob":"float","flag":"str"}
    },
    "xai": "<Module3 XAI dict — see 3C>"
  }
}
```

## 3C. Modül 3 XAI — `module3_summary["xai"]`

Üretim: [xai_explainer.py:567-754](NARS/collections/payment_prediction_model/tools/xai_explainer.py#L567-L754)

### Liste formatı

**`code` şeması:** `M3_SAFE` | `M3_WARNING_{root}` | `M3_RISK_{root}` | `M3_CRITICAL_{root}`
Burada `{root}` = root cause code: `NONE`, `HIGH_BURN_RATE`, `REVENUE_SHORTFALL`, `MIXED`, `PAYMENT_DELAY`, `HIGH_UNCERTAINTY`, `BORDERLINE`

**`details` blokları:**
- "─── GENEL DURUM / OVERALL STATUS ───"  (flag emoji + overall assessment)
- "─── UFUK BAZLI DETAY / HORIZON BREAKDOWN ───"  (W/M/3M tablo: Cash-In, Cash-Out, Net, Açık Prob, Durum)
- "─── NAKİT AKIŞ ORANLARI / CASH FLOW RATIOS ───"  (Giriş/Çıkış oranı + Net Marj %)
- "─── RİSK FAKTÖRLERİ / RISK DRIVERS ───"
- "─── KÖK NEDEN / ROOT CAUSE ───"  (sadece root_cause != "none" ise)
- "─── VARSAYIMLAR / ASSUMPTIONS ───"

**`params` alt alanları:** `overall_flag`, `root_cause`, `portfolio_risk_score`, `late_payment_pct`, `avg_days_late`, `delay_shift_factor`, `uncertainty_multiplier`, `opex_ratio`, `opex_mode`, `fixed_monthly_opex`, `expense_timing`, `cogs_ratio`, `revenue_base_weekly`, `n_simulations`, + her horizon için `cash_in_{W,M,3M}`, `cash_out_{W,M,3M}`, `net_position_{W,M,3M}`, `deficit_prob_{W,M,3M}`, `flag_{W,M,3M}`

### JSON şeması

```json
{
  "module3_xai": {
    "code": "M3_(SAFE|WARNING_<ROOT>|RISK_<ROOT>|CRITICAL_<ROOT>)",
    "root_cause_enum": ["none","high_burn_rate","revenue_shortfall","mixed","payment_delay","high_uncertainty","borderline"],
    "message_tr": "str",
    "message_en": "str",
    "message":    "str",
    "details":    ["str", "..."],
    "params": {
      "overall_flag":           "enum{GREEN,YELLOW,RED,CRITICAL}",
      "root_cause":             "str",
      "portfolio_risk_score":   "float  [0,1]",
      "late_payment_pct":       "float  [0,100]",
      "avg_days_late":          "float",
      "delay_shift_factor":     "float",
      "uncertainty_multiplier": "float",
      "opex_ratio":             "float",
      "opex_mode":              "enum{fixed,proportional}",
      "fixed_monthly_opex":     "float",
      "expense_timing":         "enum{even,payroll_heavy}",
      "cogs_ratio":             "float",
      "revenue_base_weekly":    "float",
      "n_simulations":          "int",

      "cash_in_W":       "float", "cash_out_W":       "float", "net_position_W":   "float", "deficit_prob_W":   "float", "flag_W":   "str",
      "cash_in_M":       "float", "cash_out_M":       "float", "net_position_M":   "float", "deficit_prob_M":   "float", "flag_M":   "str",
      "cash_in_3M":      "float", "cash_out_3M":      "float", "net_position_3M":  "float", "deficit_prob_3M":  "float", "flag_3M":  "str"
    }
  }
}
```

---

# 🔗 Modüller Arası Veri Akışı

| Modül 1 çıktısı | Tüketici | Kullanım |
|---|---|---|
| `Predicted_DaysToPay` | M2 | Fallback haftalık atama |
| `PaymentProbability_*` (6 kolon) | M2 | Olasılık → hafta mapping (ana mekanizma) |
| `AccountRiskScore_derived` | M2 | `risk_dampener = 1 - risk` |
| `DaysToPay_Source` | M2 | Tier güven ağırlığı (1.0 / 0.85 / 0.70) |
| `IsLate`, `RiskScore_derived`, `Avg_Risk_Score`, `Late_Payment_Percentage` | M3 | Delay shift & uncertainty multiplier |

| Modül 2 çıktısı | Tüketici | Kullanım |
|---|---|---|
| `forecast`, `forecast_lower`, `forecast_upper` | M3 | Log-normal MC cash-in sampling |
| `tier_confidence` | M3 | Forecast_Confidence bileşeni |

---

# ✅ Özet

- **3 DataFrame:** `module1_outputs_df` (fatura), `module2_forecasts` (hafta), `module3_outputs_df` (horizon)
- **2 summary dict:** `module1_summary`, `module3_summary` (her ikisi de içlerinde gömülü `xai` bloğu taşır)
- **3 XAI bloğu:** M1 ve M3 ilgili summary içinde; M2 ise pipeline tuple'ının 6. ayrı elemanı olarak döner
- Tüm XAI blokları aynı standard şemayı paylaşır: `{code, message_tr, message_en, message, details, params}`

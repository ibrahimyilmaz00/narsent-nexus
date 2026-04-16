# Demo Backend Yapisi

## Genel Bakis

Demo branch'inde onboarding wizard'indan gelen kullanici verilerini Supabase (PostgreSQL) veritabanina kaydediyoruz. Kullanici ERP ve sektor secip, sektore ozel sorulari yanitladiktan sonra tum veriler tek bir tabloda saklanir.

## Mimari

```
Kullanici (Browser)
    |
    v
OnboardingWizard.tsx  (React client component - Zustand state)
    |
    v
actions.ts            (Next.js Server Actions - sunucu tarafinda calisir)
    |
    v
server.ts             (Supabase client - service_role key ile)
    |
    v
Supabase PostgreSQL   (onboarding_sessions tablosu)
```

- **API route yok** -- Next.js Server Actions kullaniyoruz. `'use server'` direktifi ile isaretlenen fonksiyonlar sunucu tarafinda calisir, browser'dan dogrudan cagirilir.
- **ORM yok** -- Supabase JS client (`@supabase/supabase-js`) dogrudan PostgreSQL sorgulari yapar.

## Dosya Yapisi

```
.env.local                              # Supabase credentials (git'e gitmez)
src/
  lib/
    supabase/
      server.ts                         # Server-side Supabase client
      client.ts                         # Browser client (ileride kullanilacak)
    database.types.ts                   # TypeScript tip tanimlari
  features/
    onboarding/
      actions.ts                        # Server Actions: createOnboardingSession, completeOnboarding
      OnboardingWizard.tsx              # Ana wizard - actions'lari cagirir
```

## Veri Akisi

### 1. Session Olusturma (Step 1 -> Step 2 gecisi)

Kullanici ERP ve sektor secip "Ileri" dediginde:

```
OnboardingWizard.tsx -> createOnboardingSession(erp, sector)
                        -> Supabase INSERT -> onboarding_sessions tablosu
                        -> { id: "uuid" } doner
                        -> sessionId state'e kaydedilir
```

Tabloda `status: 'draft'` olan bir satir olusur. Sadece `erp` ve `sector` dolu, form alanlari NULL.

### 2. Tamamlama (Step 5 - "Baslat" butonu)

Kullanici wizard'i tamamlayip "Baslat" dediginde:

```
OnboardingWizard.tsx -> completeOnboarding(sessionId, formValues)
                        -> FIELD_MAP ile camelCase -> snake_case donusumu
                        -> Supabase UPDATE -> ilgili kolonlari doldurur + status: 'completed'
```

## Veritabani Tablosu: `onboarding_sessions`

Tek tablo, tum sektorlerin form alanlari ayri kolonlar olarak tutulur. Secilen sektorun alanlari dolu, digerleri NULL kalir.

### Ortak Kolonlar

| Kolon | Tip | Aciklama |
|-------|-----|----------|
| id | UUID (PK) | Otomatik olusturulur |
| erp | TEXT | 'sap' / 'logo' / 'mikro' / 'api' |
| sector | TEXT | 'kobi' / 'kurumsal' / 'enerji' / 'telekom' / 'egitim' |
| status | TEXT | 'draft' veya 'completed' |
| user_id | UUID | Simdilik NULL (auth eklenince dolar) |
| created_at | TIMESTAMPTZ | Olusturulma zamani |
| updated_at | TIMESTAMPTZ | Son guncelleme (trigger ile otomatik) |

### Sektor Kolonlari (toplam 72 alan)

Tum form alanlari TEXT tipinde. Asagida her sektorun kullaniciya gorunen soru etiketi ve karsilik gelen veritabani kolon adi listelenmistir.

#### KOBI - Uretim & Ticaret (16 alan)

| Kullanicinin Gordugu | DB Kolonu |
|----------------------|-----------|
| Yillik Ciro Hedefi / Gerceklesen (TL) | `ciro` |
| Aylik Ortalama Fatura Sayisi | `fatura_sayisi` |
| Aktif Musteri Sayisi | `musteri_sayisi` |
| Yeni Musteri Edinme Hizi (Aylik Ort.) | `yeni_musteri` |
| Ortalama Satis Vadesi / Hedef DSO (Gun) | `vade` |
| Pesin / Vadeli Satis Orani (%) | `pesin_oran` |
| En Cok Kullanilan Odeme Araci | `odeme_araci` |
| Aktif Tedarikci Sayisi | `tedarikci_sayisi` |
| Aylik Toplam Alis / Hammadde Gideri (TL) | `alis_gideri` |
| Tedarikci Odeme Vadesi / Hedef DPO (Gun) | `dpo` |
| Aylik Sabit Giderler (Maas, Kira vb. - TL) | `opex` |
| Aylik Kredi / Finansman Odemeleri (TL) | `kredi_odeme` |
| Toplam Stok Degeri (TL) | `stok` |
| Stok Devir Hizi (Ortalama Gun) | `stok_devir` |
| Banka ve Kasa Toplam Mevcudu (TL) | `nakit` |
| Beklenen Olaganustu Giderler (3 Ay - TL) | `olaganustu_gider` |

#### Kurumsal - Enterprise & Holding (16 alan)

| Kullanicinin Gordugu | DB Kolonu |
|----------------------|-----------|
| Yillik Konsolide Ciro (TL) | `ent_ciro` |
| Grup Sirketi / Aktif Sube Sayisi | `ent_sube` |
| Aktif Ticari Musteri / Bayi Sayisi | `ent_bayi` |
| Riskli Bayi / Musteri Segmenti Orani (%) | `ent_riskli_bayi` |
| Hedeflenen Ortalama Tahsilat Vadesi (DSO Target - Gun) | `ent_dso` |
| Ortalama Tahsilat Vadesi / DSO Target (Sektorel standart vade - Gun) | `ent_sektorel_vade` |
| Tahsilat Mix'i (Orn: %60 DBS, %40 Acik Hesap) | `ent_tahsilat_mix` |
| Dinamik Iskonto Kullanimi | `ent_iskonto` |
| Stratejik Tedarikci Sayisi | `ent_tedarikci` |
| Tedarikci Odeme Vadesi (DPO - Gun) | `ent_dpo` |
| Konsolide Aylik Personel ve OpEx Gideri (TL) | `ent_opex` |
| Aylik Banka Kredisi ve Tahvil Odemeleri (TL) | `ent_kredi_odeme` |
| Konsolide Toplam Stok / Atil Varlik Degeri (TL) | `ent_stok` |
| Konsolide Stok Devir Hizi (Gun) | `ent_stok_devir` |
| Konsolide Banka Mevcudu (Hazir Nakit - TL) | `ent_nakit` |
| Kullanilabilir Revolving / Hazir Kredi Limitleri (TL) | `ent_kredi` |

#### Enerji - Enerji & Agir Sanayi (13 alan)

| Kullanicinin Gordugu | DB Kolonu |
|----------------------|-----------|
| Hizmet Turu | `en_hizmet_turu` |
| Yillik Toplam Dagitim Hacmi (MWh / m3) | `en_dagitim_hacmi` |
| Aktif Ticari / Sanayi (B2B) Abone Sayisi | `en_abone_sayisi` |
| Resmi Odeme Vadesi (Gun) | `en_odeme_vadesi` |
| Teminatli / Acik Hesap Orani (%) | `en_teminat_oran` |
| En Cok Kullanilan Tahsilat Kanali | `en_tahsilat_kanal` |
| Kayip-Kacak Orani Hedefi (%) | `en_kayip_kacak` |
| Aylik Piyasa Takas Hacmi (EPIAS / DGPYS - TL) | `en_takas_hacmi` |
| Aylik Bakim, Altyapi ve Sistem Kullanim Bedeli (TL) | `en_bakim_bedeli` |
| Kullanilabilir Hazir Nakit ve Serbest Limitler (TL) | `en_hazir_nakit` |
| Bloke / Rehinli Teminatlar (EPIAS Teminati - TL) | `en_bloke_teminat` |
| Aylik Finansman Maliyetleri (TL) | `en_finansman_maliyet` |
| Karsilliksiz / Protesto Edilen Teminat Hacmi (TL) | `en_protesto_hacmi` |

#### Telekom - Telekomunikasyon & Teknoloji (14 alan)

| Kullanicinin Gordugu | DB Kolonu |
|----------------------|-----------|
| Aylik Tekrarlayan Gelir (MRR - TL) | `tc_mrr` |
| Aktif Kurumsal (B2B) Abone Sayisi | `tc_abone_sayisi` |
| Cihaz / Donanim Finansman Payi (%) | `tc_cihaz_pay` |
| Taahhut / Sozlesme Yenileme Ortalama Suresi (Ay) | `tc_taahhut_sure` |
| Ortalama Tahsilat Vadesi (Gun) | `tc_tahsilat_vade` |
| En Cok Kullanilan Tahsilat Kanali | `tc_tahsilat_kanal` |
| Donanim Stok Degeri (TL) | `tc_donanim` |
| Enerji ve Veri Merkezi Giderleri (TL) | `tc_veri_merkezi` |
| Lisans ve Frekans Bedelleri (TL) | `tc_lisans` |
| Personel ve Saha Giderleri (TL) | `tc_personel` |
| Interconnect ve Yurt Disi Partner Odemeleri (TL) | `tc_interconnect` |
| Donanim (Cihaz) Tedarikci Vadesi (DPO - Gun) | `tc_dpo` |
| Bekleyen Olaganustu Yatirim (5G/Fiber Capex - TL) | `tc_capex` |
| Kullanilabilir Hazir Nakit ve Kredi Limitleri (TL) | `tc_nakit` |

#### Egitim - Egitim & Hizmet (13 alan)

| Kullanicinin Gordugu | DB Kolonu |
|----------------------|-----------|
| Sube Sayisi | `ed_sube_sayisi` |
| Yillik Toplam Kayit Ciro Hedefi (TL) | `ed_ciro` |
| Aktif Ogrenci / Danisan Sayisi | `ed_ogrenci_sayisi` |
| Ortalama Taksit Sayisi (Ay) | `ed_taksit_sayisi` |
| Kayit Ani Pesinat Orani (%) | `ed_pesinat` |
| B2C (Bireysel) / B2B (Kurumsal) Ogrenci Dagilimi | `ed_b2c_oran` |
| En Cok Kullanilan Odeme Kanali | `ed_odeme_kanal` |
| Aylik Egitmen ve Personel Maas Yuku (TL) | `ed_maas` |
| Kira ve Enerji Sabit Giderleri (TL) | `ed_kira` |
| Aylik Pazarlama / Reklam Harcamasi (TL) | `ed_pazarlama` |
| Dis Hizmet ve Materyal (Kitap) Giderleri (TL) | `ed_materyal` |
| Sube / Sinif Doluluk Orani (%) | `ed_doluluk` |
| Mevcut Kasa ve Banka Hazir Nakit (TL) | `ed_nakit` |

## Field Mapping (camelCase -> snake_case)

Frontend camelCase kullanir (`faturaSayisi`), veritabani snake_case kullanir (`fatura_sayisi`). Donusum `actions.ts` icindeki `FIELD_MAP` objesi ile yapilir. Frontend'e dokunmaya gerek kalmaz.

```
Frontend: { faturaSayisi: "320", ciro: "60000000" }
    |  FIELD_MAP donusumu
    v
Database: { fatura_sayisi: "320", ciro: "60000000" }
```

## Environment Variables

`.env.local` dosyasinda 3 deger gerekli:

```
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-public-key>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
```

Bu degerler Supabase Dashboard > Settings > API sayfasindan alinir. `.env.local` `.gitignore`'da oldugu icin repoya girmez.

## RLS (Row Level Security)

Demo asamasinda permissive policy aktif -- herkes okuyup yazabilir:

```sql
CREATE POLICY "allow_all_for_demo"
    ON onboarding_sessions FOR ALL
    USING (true) WITH CHECK (true);
```

Auth eklendikten sonra kullanici bazli kisitlama yapilacak.

## Supabase Dashboard'da Kontrol

1. [supabase.com](https://supabase.com) > projeye git
2. Sol menuden **Table Editor** > `onboarding_sessions`
3. Her satir bir onboarding oturumunu temsil eder
4. Secilen sektorun kolonlari dolu, digerlerinin NULL oldugunu gorebilirsin

## Gelecek Adimlar

- [ ] Authentication (Supabase Auth) entegrasyonu
- [ ] Ornek veri setleri olusturma ve sektor cevaplarina gore olcekleme
- [ ] Olceklenmis veri setlerini `generated_datasets` tablosunda saklama
- [ ] Form alanlarini TEXT'ten NUMERIC'e donusturme (raporlama icin)

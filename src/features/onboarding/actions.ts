'use server'

import { createServerSupabaseClient } from '@/src/lib/supabase/server'

const FIELD_MAP: Record<string, string> = {
  // KOBİ
  ciro: 'ciro', faturaSayisi: 'fatura_sayisi', musteriSayisi: 'musteri_sayisi',
  yeniMusteri: 'yeni_musteri', vade: 'vade', pesinOran: 'pesin_oran',
  odemeAraci: 'odeme_araci', tedarikciSayisi: 'tedarikci_sayisi',
  alisGideri: 'alis_gideri', dpo: 'dpo', opex: 'opex',
  krediOdeme: 'kredi_odeme', stok: 'stok', stokDevir: 'stok_devir',
  nakit: 'nakit', olaganustuGider: 'olaganustu_gider',
  // Kurumsal
  entCiro: 'ent_ciro', entSube: 'ent_sube', entBayi: 'ent_bayi',
  entRiskliBayi: 'ent_riskli_bayi', entDso: 'ent_dso',
  entSektorelVade: 'ent_sektorel_vade', entTahsilatMix: 'ent_tahsilat_mix',
  entIskonto: 'ent_iskonto', entTedarikci: 'ent_tedarikci', entDpo: 'ent_dpo',
  entOpex: 'ent_opex', entKrediOdeme: 'ent_kredi_odeme', entStok: 'ent_stok',
  entStokDevir: 'ent_stok_devir', entNakit: 'ent_nakit', entKredi: 'ent_kredi',
  // Enerji
  enHizmetTuru: 'en_hizmet_turu', enDagitimHacmi: 'en_dagitim_hacmi',
  enAboneSayisi: 'en_abone_sayisi', enOdemeVadesi: 'en_odeme_vadesi',
  enTeminatOran: 'en_teminat_oran', enTahsilatKanal: 'en_tahsilat_kanal',
  enKayipKacak: 'en_kayip_kacak', enTakasHacmi: 'en_takas_hacmi',
  enBakimBedeli: 'en_bakim_bedeli', enHazirNakit: 'en_hazir_nakit',
  enBlokeTeminat: 'en_bloke_teminat', enFinansmanMaliyet: 'en_finansman_maliyet',
  enProtestoHacmi: 'en_protesto_hacmi',
  // Telekom
  tcMrr: 'tc_mrr', tcAboneSayisi: 'tc_abone_sayisi', tcCihazPay: 'tc_cihaz_pay',
  tcTaahhutSure: 'tc_taahhut_sure', tcTahsilatVade: 'tc_tahsilat_vade',
  tcTahsilatKanal: 'tc_tahsilat_kanal', tcDonanim: 'tc_donanim',
  tcVeriMerkezi: 'tc_veri_merkezi', tcLisans: 'tc_lisans',
  tcPersonel: 'tc_personel', tcInterconnect: 'tc_interconnect',
  tcDpo: 'tc_dpo', tcCapex: 'tc_capex', tcNakit: 'tc_nakit',
  // Eğitim
  edSubeSayisi: 'ed_sube_sayisi', edCiro: 'ed_ciro',
  edOgrenciSayisi: 'ed_ogrenci_sayisi', edTaksitSayisi: 'ed_taksit_sayisi',
  edPesinat: 'ed_pesinat', edB2cOran: 'ed_b2c_oran',
  edOdemeKanal: 'ed_odeme_kanal', edMaas: 'ed_maas', edKira: 'ed_kira',
  edPazarlama: 'ed_pazarlama', edMateryal: 'ed_materyal',
  edDoluluk: 'ed_doluluk', edNakit: 'ed_nakit',
}

function mapFormValuesToColumns(formValues: Record<string, string>): Record<string, string> {
  const mapped: Record<string, string> = {}
  for (const [key, value] of Object.entries(formValues)) {
    const column = FIELD_MAP[key]
    if (column && value !== '') {
      mapped[column] = value
    }
  }
  return mapped
}

export async function createOnboardingSession(
  erp: string,
  sector: string
): Promise<{ id: string } | { error: string }> {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from('onboarding_sessions')
    .insert({ erp, sector, status: 'draft', user_id: null })
    .select('id')
    .single()

  if (error) return { error: error.message }
  return { id: data.id }
}

export async function completeOnboarding(
  sessionId: string,
  formValues: Record<string, string>
): Promise<{ success: boolean; error?: string }> {
  const supabase = createServerSupabaseClient()
  const columns = mapFormValuesToColumns(formValues)
  const { error } = await supabase
    .from('onboarding_sessions')
    .update({ ...columns, status: 'completed' })
    .eq('id', sessionId)

  if (error) return { success: false, error: error.message }
  return { success: true }
}

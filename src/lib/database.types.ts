export type ERPOption = 'sap' | 'logo' | 'mikro' | 'api'
export type SectorOption = 'kobi' | 'kurumsal' | 'enerji' | 'telekom' | 'egitim'
export type SessionStatus = 'draft' | 'completed'

export interface OnboardingSession {
  id: string
  erp: ERPOption
  sector: SectorOption
  form_values: Record<string, string>
  status: SessionStatus
  user_id: string | null
  created_at: string
  updated_at: string
}

export interface Database {
  public: {
    Tables: {
      onboarding_sessions: {
        Row: OnboardingSession
        Insert: Omit<OnboardingSession, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<OnboardingSession, 'id' | 'created_at' | 'updated_at'>>
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
  }
}

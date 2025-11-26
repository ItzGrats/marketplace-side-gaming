export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      orders: {
        Row: {
          id: string
          user_id: string
          booster_id: string | null
          game: string
          current_rank: string
          desired_rank: string
          budget: number
          urgency: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          booster_id?: string | null
          game: string
          current_rank: string
          desired_rank: string
          budget: number
          urgency?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          booster_id?: string | null
          game?: string
          current_rank?: string
          desired_rank?: string
          budget?: number
          urgency?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          name: string
          role: string
          created_at: string
        }
        Insert: {
          id: string
          email: string
          name: string
          role?: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          role?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
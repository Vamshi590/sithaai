export type Tone = 'professional' | 'friendly' | 'warm'

export interface Clinic {
  id: string
  user_id: string
  name: string
  location: string | null
  tone: Tone
  departments: string[] | null
  ig_user_id: string | null
  whatsapp_number: string | null
}

export interface Post {
  id: string
  clinic_id: string
  caption: string
  hashtags: string[]
  image_url: string
  slide_urls: string[] | null
  post_type: string
  status: 'draft' | 'posted'
  ig_post_id: string | null
  created_at: string
}

export interface Doctor {
  id: string
  clinic_id: string
  name: string
  department: string | null
  qualification: string | null
  image_url: string | null
}

export interface Plan {
  plan_name: string | null
  messages_used: number
  monthly_msg_limit: number
  remaining: number
  quota_reset_at: string | null
}

export interface MessageTemplate {
  id: string
  clinic_id: string | null
  name: string
  body: string
  variables: string[]
  wa_template_name: string
  status: 'pending_approval' | 'approved' | 'rejected'
  created_at: string
}

export interface ContactList {
  id: string
  name: string
  contact_count: number
  created_at: string
}

export interface Campaign {
  id: string
  name: string
  status: 'pending' | 'sending' | 'completed' | 'failed'
  total_count: number
  sent_count: number
  failed_count: number
  created_at: string
  completed_at: string | null
  message_templates: { name: string } | null
}

export interface CampaignDetail extends Campaign {
  variable_values: Record<string, string>
  contact_lists: { name: string } | null
  message_templates: { name: string; body: string }
}

export interface CampaignMessage {
  id: string
  phone_number: string
  status: 'queued' | 'sent' | 'delivered' | 'failed'
  wa_message_id: string | null
  error_message: string | null
  sent_at: string | null
  delivered_at: string | null
  contacts: { name: string | null } | null
}

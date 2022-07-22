export type Status = 'active' | 'inactive'

export interface User {
  id: string
  fullname: string
  email: string
  phone: string
  status: Status
  created_at: string
  iban: string
}

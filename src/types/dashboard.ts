export type LevelType = 'starter' | 'master' | 'legend'

export interface Level {
  id: LevelType
  name: string
  commissionRate: number
  salesRequired: number
}

export interface Goal {
  id: string
  amount: number
  currentAmount: number
  month: string
  year: number
  achieved: boolean
}

export interface Promotion {
  id: string
  title: string
  subtitle: string
  imageUrl: string
  bonusAmount: number
  originalPrice: number
  finalPrice: number
  validFrom: string
  validTo: string
  monthlyPayments: {
    months: number
    amount: number
  }[]
}

export type ClientStatus = 'prequalification' | 'documentation' | 'approval' | 'financing'

export interface Client {
  id: string
  name: string
  status: ClientStatus
  statusLabel: string
  lastAccessed: string
  startedAt: string
  message?: string
  phone?: string
}

export interface DashboardActivity {
  currentLevel: LevelType
  goal: Goal
  earnedCommissions: number
  accumulatedSales: number
}

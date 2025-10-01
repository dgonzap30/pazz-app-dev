import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { LevelBadge } from '@/components/dashboard/LevelBadge'
import { GoalProgressCard } from '@/components/dashboard/GoalProgressCard'
import { PromotionCard } from '@/components/dashboard/PromotionCard'
import { ClientAttentionItem } from '@/components/dashboard/ClientAttentionItem'
import { GoalModal } from '@/components/dashboard/GoalModal'
import { PromotionModal } from '@/components/dashboard/PromotionModal'
import { ClientDetailModal } from '@/components/dashboard/ClientDetailModal'
import { LevelModal } from '@/components/dashboard/LevelModal'
import type { Goal, Promotion, Client, LevelType } from '@/types/dashboard'

interface DashboardOutletContext {
  setHeaderRightElement?: (element: React.ReactNode) => void
}

const STUB_CURRENT_LEVEL: LevelType = 'starter'
const STUB_ACCUMULATED_SALES = 4020000

const STUB_GOAL: Goal = {
  id: '1',
  amount: 25000,
  currentAmount: 20000,
  month: 'Octubre',
  year: 2025,
  achieved: false,
}

const STUB_PAST_GOALS: Goal[] = [
  {
    id: '2',
    amount: 25000,
    currentAmount: 26500,
    month: 'Mayo',
    year: 2025,
    achieved: true,
  },
  {
    id: '3',
    amount: 20000,
    currentAmount: 15000,
    month: 'Abril',
    year: 2025,
    achieved: false,
  },
  {
    id: '4',
    amount: 15000,
    currentAmount: 14500,
    month: 'Marzo',
    year: 2025,
    achieved: false,
  },
]

const STUB_PROMOTIONS: Promotion[] = [
  {
    id: '1',
    title: 'BMW Serie 4',
    subtitle: 'Gran Coupé 2025',
    imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
    bonusAmount: 100000,
    originalPrice: 1245000,
    finalPrice: 1145000,
    validFrom: '01/08/2025',
    validTo: '30/08/2025',
    monthlyPayments: [
      { months: 48, amount: 45000 },
      { months: 36, amount: 47120 },
      { months: 24, amount: 49785 },
    ],
  },
]

const STUB_CLIENTS: Client[] = [
  {
    id: '1',
    name: 'Pedro Juan Gutiérrez González',
    status: 'prequalification',
    statusLabel: 'Precalificación sin concluir',
    lastAccessed: '14/08/2025',
    startedAt: '12/08/2025',
    phone: '5215598772310',
    message:
      'Hola Pedro, vi que iniciaste tu precalificación pero no la has completado. ¿Te gustaría que te ayude a terminarla? Estoy aquí para resolver cualquier duda que tengas.',
  },
  {
    id: '2',
    name: 'Zilia Sánchez Domínguez',
    status: 'prequalification',
    statusLabel: 'Precalificación sin concluir',
    lastAccessed: '13/08/2025',
    startedAt: '10/08/2025',
    phone: '5215512345678',
    message:
      'Hola Zilia, noté que comenzaste tu precalificación hace unos días. ¿Puedo ayudarte a completarla?',
  },
  {
    id: '3',
    name: 'Servando Cabrera Moreno',
    status: 'documentation',
    statusLabel: 'Documentación sin concluir',
    lastAccessed: '15/08/2025',
    startedAt: '08/08/2025',
    phone: '5215587654321',
    message:
      'Hola Servando, veo que falta completar tu documentación. ¿En qué puedo apoyarte para avanzar?',
  },
]

export default function Dashboard() {
  const { setHeaderRightElement } = useOutletContext<DashboardOutletContext>()
  const [goalModalOpen, setGoalModalOpen] = useState(false)
  const [promotionModalOpen, setPromotionModalOpen] = useState(false)
  const [clientModalOpen, setClientModalOpen] = useState(false)
  const [levelModalOpen, setLevelModalOpen] = useState(false)
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)

  React.useEffect(() => {
    setHeaderRightElement?.(
      <LevelBadge level={STUB_CURRENT_LEVEL} onClick={() => setLevelModalOpen(true)} />
    )
    return () => setHeaderRightElement?.(null)
  }, [setHeaderRightElement])

  const handlePromotionClick = (promotion: Promotion) => {
    setSelectedPromotion(promotion)
    setPromotionModalOpen(true)
  }

  const handleClientClick = (client: Client) => {
    setSelectedClient(client)
    setClientModalOpen(true)
  }

  return (
    <div className="space-y-6 pb-6 pt-4">
      <GoalProgressCard
        goal={STUB_GOAL}
        earnedCommissions={20000}
        onGoalClick={() => setGoalModalOpen(true)}
      />

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Promociones vigentes</h2>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {STUB_PROMOTIONS.map((promotion) => (
            <PromotionCard
              key={promotion.id}
              promotion={promotion}
              onClick={() => handlePromotionClick(promotion)}
            />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Clientes que requieren atención</h2>
        <div className="space-y-2">
          {STUB_CLIENTS.map((client) => (
            <ClientAttentionItem
              key={client.id}
              client={client}
              onClick={() => handleClientClick(client)}
            />
          ))}
        </div>
      </div>

      <GoalModal
        open={goalModalOpen}
        onOpenChange={setGoalModalOpen}
        currentGoal={STUB_GOAL}
        pastGoals={STUB_PAST_GOALS}
      />

      <PromotionModal
        open={promotionModalOpen}
        onOpenChange={setPromotionModalOpen}
        promotion={selectedPromotion}
      />

      <ClientDetailModal
        open={clientModalOpen}
        onOpenChange={setClientModalOpen}
        client={selectedClient}
      />

      <LevelModal
        open={levelModalOpen}
        onOpenChange={setLevelModalOpen}
        currentLevel={STUB_CURRENT_LEVEL}
        accumulatedSales={STUB_ACCUMULATED_SALES}
      />
    </div>
  )
}

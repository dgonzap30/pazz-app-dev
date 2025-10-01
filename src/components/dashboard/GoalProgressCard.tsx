import type React from 'react'
import { ChevronRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card'
import { ProgressBar } from '@/ui/progress-bar'
import { formatCurrency } from '@/core/utils/formatters'
import type { Goal } from '@/types/dashboard'

interface GoalProgressCardProps {
  goal: Goal
  earnedCommissions: number
  onGoalClick?: () => void
}

export const GoalProgressCard: React.FC<GoalProgressCardProps> = ({
  goal,
  earnedCommissions,
  onGoalClick,
}) => {
  const remaining = Math.max(goal.amount - goal.currentAmount, 0)

  return (
    <Card variant="interactive" onClick={onGoalClick} className="cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Mi actividad</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onGoalClick?.()
          }}
          className="w-full text-left space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Meta</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold">{formatCurrency(goal.amount)}</div>
        </button>

        <div className="space-y-2">
          <div className="text-sm text-slate-600">Comisiones ganadas</div>
          <div className="text-xl font-bold">{formatCurrency(earnedCommissions)}</div>
          <ProgressBar value={goal.currentAmount} max={goal.amount} />
          <div className="text-sm text-slate-600">
            Faltan {formatCurrency(remaining)} para alcanzar tu meta.
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

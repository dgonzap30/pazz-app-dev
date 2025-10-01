import type React from 'react'
import { useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription } from '@/ui/modal'
import { Button } from '@/ui/button'
import { ProgressBar } from '@/ui/progress-bar'
import { formatCurrency } from '@/core/utils/formatters'
import type { Goal } from '@/types/dashboard'

interface GoalModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentGoal: Goal
  pastGoals?: Goal[]
  onSaveGoal?: (amount: number) => void
}

export const GoalModal: React.FC<GoalModalProps> = ({
  open,
  onOpenChange,
  currentGoal,
  pastGoals = [],
  onSaveGoal,
}) => {
  const [newGoalAmount, setNewGoalAmount] = useState(currentGoal.amount)

  const handleSave = () => {
    onSaveGoal?.(newGoalAmount)
    onOpenChange(false)
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent className="max-w-md">
        <ModalHeader>
          <ModalTitle>Mi meta mensual</ModalTitle>
          <ModalDescription>
            Configura tu meta de comisiones para este mes y consulta tu historial de metas anteriores
          </ModalDescription>
        </ModalHeader>

        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-sm text-slate-600">
              Establece una meta para este mes ingresando las ganancias que te gustaría obtener.
            </p>
            <div className="text-center">
              <input
                type="number"
                value={newGoalAmount}
                onChange={(e) => setNewGoalAmount(Number(e.target.value))}
                className="text-3xl font-bold text-center border-none outline-none w-full"
                placeholder="$ 25,000"
              />
            </div>
            <input
              type="range"
              min="10000"
              max="100000"
              step="1000"
              value={newGoalAmount}
              onChange={(e) => setNewGoalAmount(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <Button onClick={handleSave} className="w-full">
            Guardar meta
          </Button>

          {pastGoals.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-base">Metas pasadas</h3>
              <div className="space-y-3">
                {pastGoals.map((goal) => {
                  const remaining = Math.max(goal.amount - goal.currentAmount, 0)

                  return (
                    <div key={goal.id} className="space-y-2 p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{goal.month}</span>
                        <span className="font-bold">{formatCurrency(goal.amount)}</span>
                      </div>
                      <ProgressBar value={goal.currentAmount} max={goal.amount} />
                      <p className="text-xs text-slate-600">
                        {goal.achieved
                          ? `Superaste tu meta por ${formatCurrency(goal.currentAmount - goal.amount)}.`
                          : `Faltaron ${formatCurrency(remaining)} para alcanzar tu meta.`}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </ModalContent>
    </Modal>
  )
}

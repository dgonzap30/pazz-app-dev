import type React from 'react'
import { Star } from 'lucide-react'
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription } from '@/ui/modal'
import { ProgressBar } from '@/ui/progress-bar'
import { formatCurrency, formatPercentage } from '@/core/utils/formatters'
import type { Level, LevelType } from '@/types/dashboard'
import { cn } from '@/core'

interface LevelModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentLevel: LevelType
  accumulatedSales: number
}

const LEVELS: Level[] = [
  { id: 'starter', name: 'Starter', commissionRate: 2.0, salesRequired: 0 },
  { id: 'master', name: 'Master', commissionRate: 2.5, salesRequired: 4020000 },
  { id: 'legend', name: 'Legend', commissionRate: 3.0, salesRequired: 8000000 },
]

export const LevelModal: React.FC<LevelModalProps> = ({
  open,
  onOpenChange,
  currentLevel,
  accumulatedSales,
}) => {
  const currentLevelData = LEVELS.find((l) => l.id === currentLevel)
  const nextLevel = LEVELS[LEVELS.findIndex((l) => l.id === currentLevel) + 1]
  const remaining = nextLevel ? nextLevel.salesRequired - accumulatedSales : 0

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent className="max-w-md">
        <ModalHeader>
          <ModalTitle>Mi nivel actual</ModalTitle>
          <ModalDescription>
            Progreso de tu nivel actual, ventas acumuladas y comisiones disponibles por nivel
          </ModalDescription>
        </ModalHeader>

        <div className="space-y-6">
          <div className="p-4 bg-slate-50 rounded-lg space-y-3">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              <span className="font-semibold text-lg">{currentLevelData?.name}</span>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">Ventas acumuladas</p>
              <p className="text-xl font-bold">{formatCurrency(accumulatedSales)}</p>
            </div>
            {nextLevel && (
              <>
                <ProgressBar value={accumulatedSales} max={nextLevel.salesRequired} />
                <p className="text-sm text-slate-600">
                  Faltan {formatCurrency(remaining)} para subir de nivel.
                </p>
              </>
            )}
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Niveles y comisiones disponibles.</h3>
            <div className="grid grid-cols-3 gap-2">
              {LEVELS.map((level) => (
                <button
                  key={level.id}
                  className={cn(
                    'p-3 rounded-lg border-2 transition-all',
                    currentLevel === level.id
                      ? 'border-primary bg-primary/5'
                      : 'border-slate-200 bg-white'
                  )}
                >
                  <Star
                    className={cn(
                      'w-6 h-6 mx-auto mb-2',
                      currentLevel === level.id ? 'text-primary' : 'text-slate-300'
                    )}
                  />
                  <p className="font-semibold text-sm mb-1">{level.name}</p>
                  <p className="text-xs text-slate-600">
                    {formatPercentage(level.commissionRate)} Comisión
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-slate-50 rounded-lg">
              <h4 className="font-semibold text-sm mb-2">¿Cuándo cambio de nivel?</h4>
              <p className="text-sm text-slate-600">
                Tu nivel se actualiza automáticamente cuando alcanzas el monto de ventas acumuladas
                requerido para el siguiente nivel.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg">
              <h4 className="font-semibold text-sm mb-2">¿Puedo perder mi nivel?</h4>
              <p className="text-sm text-slate-600">
                No. Una vez que alcances un nivel, este se mantiene de forma permanente. Tu
                progreso siempre avanza hacia adelante.
              </p>
            </div>
          </div>
        </div>
      </ModalContent>
    </Modal>
  )
}

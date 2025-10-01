import type React from 'react'
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription } from '@/ui/modal'
import { Button } from '@/ui/button'
import { formatCurrency } from '@/core/utils/formatters'
import type { Promotion } from '@/types/dashboard'

interface PromotionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  promotion: Promotion | null
}

export const PromotionModal: React.FC<PromotionModalProps> = ({
  open,
  onOpenChange,
  promotion,
}) => {
  if (!promotion) return null

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent className="max-w-md">
        <ModalHeader>
          <ModalTitle>
            {promotion.title}
            <p className="text-sm font-normal text-slate-600 mt-1">{promotion.subtitle}</p>
          </ModalTitle>
          <ModalDescription>
            Detalles de la promoción vigente, precios con bono aplicado y opciones de financiamiento
          </ModalDescription>
        </ModalHeader>

        <div className="space-y-6">
          <div className="aspect-video w-full overflow-hidden rounded-lg bg-slate-100">
            <img
              src={promotion.imageUrl}
              alt={promotion.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-slate-50 rounded-lg">
              <h3 className="font-semibold text-sm mb-2">Promoción</h3>
              <p className="text-sm text-slate-600 mb-3">
                Vigencia del {promotion.validFrom} al {promotion.validTo}
              </p>
              <p className="text-sm text-slate-700">
                Obtén un bono de {formatCurrency(promotion.bonusAmount)} al precalificarte este mes
                de octubre.
              </p>
            </div>

            <div className="space-y-2 p-4 border border-slate-200 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Precio antes del bono:</span>
                <span className="text-sm line-through text-slate-500">
                  {formatCurrency(promotion.originalPrice)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">Precio después del bono:</span>
                <span className="text-xl font-bold text-primary">
                  {formatCurrency(promotion.finalPrice)}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-sm">Renta mensual con promoción aplicada</h3>
              <div className="grid grid-cols-3 gap-2">
                {promotion.monthlyPayments.map((payment) => (
                  <div key={payment.months} className="p-3 bg-slate-50 rounded-lg text-center">
                    <div className="text-xs text-slate-600 mb-1">{payment.months} Meses</div>
                    <div className="font-bold text-sm">{formatCurrency(payment.amount)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Button className="w-full">Ver cotización</Button>
        </div>
      </ModalContent>
    </Modal>
  )
}

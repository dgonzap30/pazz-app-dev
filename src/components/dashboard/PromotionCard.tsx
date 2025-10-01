import type React from 'react'
import { Card, CardContent } from '@/ui/card'
import { formatCurrency } from '@/core/utils/formatters'
import type { Promotion } from '@/types/dashboard'

interface PromotionCardProps {
  promotion: Promotion
  onClick?: () => void
}

export const PromotionCard: React.FC<PromotionCardProps> = ({ promotion, onClick }) => {
  return (
    <Card
      variant="interactive"
      onClick={onClick}
      className="cursor-pointer min-w-[280px] max-w-sm"
    >
      <CardContent className="p-0">
        <div className="aspect-video w-full overflow-hidden rounded-t-lg bg-slate-100">
          <img
            src={promotion.imageUrl}
            alt={promotion.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-base">{promotion.title}</h3>
          <p className="text-sm text-slate-600">{promotion.subtitle}</p>
          <div className="pt-2">
            <p className="text-lg font-bold text-primary">
              Bono de {formatCurrency(promotion.bonusAmount)}
            </p>
            <p className="text-xs text-slate-500">
              Vigencia del {promotion.validFrom} al {promotion.validTo}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

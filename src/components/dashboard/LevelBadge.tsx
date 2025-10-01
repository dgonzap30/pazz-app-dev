import type React from 'react'
import { Star } from 'lucide-react'
import { Badge } from '@/ui/badge'
import type { LevelType } from '@/types/dashboard'

interface LevelBadgeProps {
  level: LevelType
  onClick?: () => void
}

const levelConfig: Record<LevelType, { label: string; icon: React.ReactNode }> = {
  starter: { label: 'Starter', icon: <Star className="w-3 h-3" /> },
  master: { label: 'Master', icon: <Star className="w-3 h-3" /> },
  legend: { label: 'Legend', icon: <Star className="w-3 h-3" /> },
}

export const LevelBadge: React.FC<LevelBadgeProps> = ({ level, onClick }) => {
  const config = levelConfig[level]

  return (
    <button
      onClick={onClick}
      className="transition-transform hover:scale-105 active:scale-95"
      aria-label={`Nivel actual: ${config.label}`}
    >
      <Badge variant="default" className="flex items-center gap-1.5">
        {config.icon}
        {config.label}
      </Badge>
    </button>
  )
}

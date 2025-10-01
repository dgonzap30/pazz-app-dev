import type React from 'react'
import { ChevronRight } from 'lucide-react'
import { Badge } from '@/ui/badge'
import { Card, CardContent } from '@/ui/card'
import type { Client } from '@/types/dashboard'

interface ClientAttentionItemProps {
  client: Client
  onClick?: () => void
}

export const ClientAttentionItem: React.FC<ClientAttentionItemProps> = ({ client, onClick }) => {
  return (
    <Card variant="interactive" onClick={onClick} className="cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-base truncate">{client.name}</h3>
              <Badge variant="warning" size="sm">
                {client.statusLabel === 'Precalificación sin concluir'
                  ? '!'
                  : client.statusLabel === 'Documentación sin concluir'
                    ? '!'
                    : '!'}
              </Badge>
            </div>
            <p className="text-sm text-slate-600">{client.statusLabel}</p>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0 ml-2" />
        </div>
      </CardContent>
    </Card>
  )
}

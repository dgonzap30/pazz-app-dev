import type React from 'react'
import { Copy } from 'lucide-react'
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription } from '@/ui/modal'
import { Button } from '@/ui/button'
import type { Client } from '@/types/dashboard'

interface ClientDetailModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  client: Client | null
}

export const ClientDetailModal: React.FC<ClientDetailModalProps> = ({
  open,
  onOpenChange,
  client,
}) => {
  if (!client) return null

  const handleCopyMessage = () => {
    if (client.message) {
      navigator.clipboard.writeText(client.message)
    }
  }

  const handleWhatsApp = () => {
    if (client.phone) {
      const message = encodeURIComponent(client.message || '')
      window.open(`https://wa.me/${client.phone}?text=${message}`, '_blank')
    }
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent className="max-w-md">
        <ModalHeader>
          <ModalTitle>Cliente que requiere atención</ModalTitle>
          <ModalDescription>
            Información del cliente y mensaje sugerido para dar seguimiento por WhatsApp
          </ModalDescription>
        </ModalHeader>

        <div className="space-y-4">
          <div className="space-y-3">
            <div className="p-3 bg-slate-50 rounded-lg">
              <p className="text-xs text-slate-600 mb-1">Nombre del cliente:</p>
              <p className="font-semibold">{client.name}</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg">
              <p className="text-xs text-slate-600 mb-1">Etapa del proceso en la que se encuentra:</p>
              <p className="font-semibold">{client.statusLabel}</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg">
              <p className="text-xs text-slate-600 mb-1">Inició la precalificación:</p>
              <p className="font-semibold">{client.startedAt}</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg">
              <p className="text-xs text-slate-600 mb-1">Último acceso a la precalificación:</p>
              <p className="font-semibold">{client.lastAccessed}</p>
            </div>
          </div>

          {client.message && (
            <div className="space-y-2">
              <p className="text-sm font-semibold">Mensaje para compartir con el cliente:</p>
              <div className="p-3 bg-slate-50 rounded-lg text-sm text-slate-700 leading-relaxed">
                {client.message}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Button variant="outline" onClick={handleCopyMessage} className="w-full">
              <Copy className="w-4 h-4" />
              Copiar mensaje
            </Button>
            <Button onClick={handleWhatsApp} className="w-full bg-success hover:bg-success-dark">
              Enviar por: WhatsApp
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  )
}

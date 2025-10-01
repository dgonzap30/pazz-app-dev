import React from 'react';
import { Bell } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu';

export const NotificationDropdown: React.FC = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="Notificaciones"
          className="
            flex items-center justify-center w-11 h-11 min-w-[44px]
            text-slate-600 hover:text-slate-900 hover:bg-white/50
            transition-all duration-150 ease-out
            focus-visible:ring-2 focus-visible:ring-[#FF7A00] focus-visible:ring-opacity-40 
            focus-visible:outline-none rounded-lg
          "
        >
          <Bell className="w-6 h-6" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        sideOffset={8} 
        className="w-80 max-h-96 overflow-y-auto p-0"
      >
        <div className="px-4 py-3 border-b border-slate-100">
          <h3 className="text-lg font-semibold text-slate-900">Actividad Reciente</h3>
        </div>
        <div className="p-6 text-center text-slate-600">
          <p>Las notificaciones estarán disponibles próximamente</p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
import React from 'react';
import { cn } from '@/core/index';
import { Rocket } from 'lucide-react';

interface ComingSoonProps {
  feature: string;
  className?: string;
}

export const ComingSoon: React.FC<ComingSoonProps> = ({ 
  feature, 
  className 
}) => {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center min-h-[60vh] px-4",
      className
    )}>
      <div className="text-center space-y-6 max-w-md">
        {/* Icon with brand color */}
        <div className="mx-auto w-20 h-20 rounded-full bg-brand-orange/10 flex items-center justify-center">
          <Rocket className="w-10 h-10 text-brand-orange" />
        </div>
        
        {/* Main message */}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-slate-900">
            {feature} próximamente
          </h2>
          <p className="text-slate-600">
            Estamos trabajando en esta función para brindarte la mejor experiencia posible.
          </p>
        </div>
        
        {/* Visual indicator */}
        <div className="flex justify-center gap-1.5 pt-4">
          <div className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-brand-orange/60 animate-pulse delay-150" />
          <div className="w-2 h-2 rounded-full bg-brand-orange/30 animate-pulse delay-300" />
        </div>
      </div>
    </div>
  );
};


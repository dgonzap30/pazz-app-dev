import * as React from 'react';
import { cn } from './utils';

interface IconInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  rightIcon?: React.ReactNode;
}

const IconInput = React.forwardRef<HTMLInputElement, IconInputProps>(
  ({ className, icon, iconPosition = 'left', rightIcon, ...props }, ref) => {
    const hasLeftIcon = icon && iconPosition === 'left';
    const hasRightIcon = rightIcon || (icon && iconPosition === 'right');
    
    return (
      <div className="relative">
        {hasLeftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {icon}
          </div>
        )}
        
        <input
          ref={ref}
          className={cn(
            // Base styles
            'flex h-11 min-h-[44px] w-full rounded-lg border border-gray-200 bg-white text-sm ring-offset-background',
            // Padding based on icons
            hasLeftIcon ? 'pl-10' : 'pl-4',
            hasRightIcon ? 'pr-10' : 'pr-4',
            // Vertical padding
            'py-2',
            // Interactive states
            'placeholder:text-gray-400',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'transition-all duration-300 hover:border-gray-300',
            // File input styles
            'file:border-0 file:bg-transparent file:text-sm file:font-medium',
            className
          )}
          {...props}
        />
        
        {hasRightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {iconPosition === 'right' ? icon : rightIcon}
          </div>
        )}
      </div>
    );
  }
);

IconInput.displayName = 'IconInput';

export { IconInput };
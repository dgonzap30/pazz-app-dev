/**
 * Avatar Component
 * A circular image or icon container for user avatars
 */

import * as React from 'react';
import { cn } from '@/core/utils/cn';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: React.ReactNode;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, fallback, children, ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false);

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100',
          className
        )}
        {...props}
      >
        {src && !imageError ? (
          <img
            src={src}
            alt={alt}
            className="aspect-square h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-orange-100 text-orange-600">
            {children || fallback || (
              <span className="text-xs font-medium">
                {alt?.charAt(0)?.toUpperCase() || '?'}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

// Fallback component for compatibility
const AvatarFallback = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center bg-orange-100 text-orange-600',
      className
    )}
    {...props}
  >
    {children}
  </div>
));

AvatarFallback.displayName = 'AvatarFallback';

export { Avatar, AvatarFallback };
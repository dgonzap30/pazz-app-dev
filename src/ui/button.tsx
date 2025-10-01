
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "./utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-primary text-white shadow-md hover:bg-primary-dark hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all",
        destructive: "bg-danger text-white shadow-md hover:bg-danger-dark hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all",
        outline: "border-2 border-primary bg-white text-primary shadow-sm hover:bg-primary hover:text-white hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all",
        secondary: "bg-slate-600 text-white shadow-md hover:bg-slate-700 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all",
        ghost: "text-slate-700 hover:bg-slate-100 hover:text-slate-900 hover:shadow-sm active:bg-slate-200 transition-all"
      },
      size: {
        sm: "h-11 px-3 text-xs min-h-[44px]",
        default: "h-11 px-4 py-2 text-sm min-h-[44px]",
        lg: "h-12 px-8 text-base min-h-[48px]"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant,
    size,
    asChild = false,
    isLoading = false,
    children,
    icon,
    iconPosition = 'left',
    ...props
  }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    const content = (
      <>
        {icon && iconPosition === 'left' && (
          <span className={cn(children ? 'mr-2' : '')}>
            {icon}
          </span>
        )}
        {isLoading ? (
          <span className="flex items-center">
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
            Loading...
          </span>
        ) : (
          children
        )}
        {icon && iconPosition === 'right' && (
          <span className={cn(children ? 'ml-2' : '')}>
            {icon}
          </span>
        )}
      </>
    )

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {content}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

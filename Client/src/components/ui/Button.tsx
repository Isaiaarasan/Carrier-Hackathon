import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'
import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { Loader2 } from 'lucide-react'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-primary-500 hover:bg-primary-600 text-white focus:ring-primary-400',
        secondary: 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-secondary dark:text-gray-100 focus:ring-gray-300',
        ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 focus:ring-gray-300',
        destructive: 'bg-danger hover:bg-red-600 text-white focus:ring-red-400',
        outline: 'border border-border dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-secondary dark:text-gray-100 focus:ring-gray-300',
        success: 'bg-success hover:bg-green-600 text-white focus:ring-green-400',
      },
      size: {
        sm: 'text-xs px-3 py-1.5 h-8',
        md: 'text-sm px-4 py-2.5 h-10',
        lg: 'text-sm px-6 py-3 h-12',
        icon: 'h-9 w-9 p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {isLoading && <Loader2 size={14} className="animate-spin" />}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }

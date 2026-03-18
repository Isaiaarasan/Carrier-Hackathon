import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'
import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { Loader2 } from 'lucide-react'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-semibold rounded-2xl transition-all duration-200 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed select-none',
  {
    variants: {
      variant: {
        primary:     '',
        secondary:   '',
        ghost:       '',
        destructive: '',
        outline:     '',
        success:     '',
      },
      size: {
        sm:   'text-xs px-3.5 py-2 h-8',
        md:   'text-sm px-5 py-2.5 h-10',
        lg:   'text-sm px-7 py-3.5 h-12',
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

// These are reactive to the CSS variable for --primary, etc.
function getVariantStyle(v: string): React.CSSProperties {
  switch (v) {
    case 'primary':
      return {
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)',
        color: '#fff',
        boxShadow: '0 4px 15px rgba(var(--primary-rgb), 0.35)',
      }
    case 'secondary':
      return {
        background: 'var(--bg-surface-2)',
        color: 'var(--text-primary)',
        border: '1px solid var(--border-color)',
      }
    case 'ghost':
      return {
        background: 'transparent',
        color: 'var(--text-muted)',
      }
    case 'destructive':
      return {
        background: 'rgba(239,35,60,0.1)',
        color: 'var(--danger)',
        border: '1px solid rgba(239,35,60,0.2)',
      }
    case 'outline':
      return {
        background: 'transparent',
        color: 'var(--text-primary)',
        border: '1px solid var(--border-strong)',
      }
    case 'success':
      return {
        background: 'rgba(6,214,160,0.1)',
        color: 'var(--success)',
        border: '1px solid rgba(6,214,160,0.25)',
      }
    default:
      return {}
  }
}

function getHoverStyle(v: string): React.CSSProperties {
  switch (v) {
    case 'primary':     return { background: 'linear-gradient(135deg, var(--primary-hover) 0%, var(--primary) 100%)', boxShadow: '0 6px 25px rgba(var(--primary-rgb), 0.55)', transform: 'translateY(-1px)' }
    case 'secondary':   return { background: 'var(--bg-surface-3)', borderColor: 'var(--border-strong)' }
    case 'ghost':       return { background: 'rgba(124,58,237,0.08)', color: 'var(--primary)' }
    case 'destructive': return { background: 'rgba(239,35,60,0.18)' }
    case 'outline':     return { background: 'rgba(124,58,237,0.06)' }
    case 'success':     return { background: 'rgba(6,214,160,0.18)' }
    default:            return {}
  }
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size, isLoading, children, disabled, style, ...props }, ref) => {
    const v = (variant as string) || 'primary'
    const baseStyle = getVariantStyle(v)
    const hoverStyle = getHoverStyle(v)

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(buttonVariants({ variant, size }), className)}
        style={{ ...baseStyle, ...style }}
        onMouseEnter={e => {
          if (disabled || isLoading) return
          Object.assign((e.currentTarget as HTMLButtonElement).style, hoverStyle)
        }}
        onMouseLeave={e => {
          Object.assign((e.currentTarget as HTMLButtonElement).style, { ...baseStyle, ...(style || {}) })
        }}
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

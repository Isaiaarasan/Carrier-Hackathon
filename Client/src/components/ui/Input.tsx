import { cn } from '../../utils/cn'
import { type InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  prefixIcon?: React.ReactNode
  hint?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, prefixIcon, hint, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-xs font-semibold uppercase tracking-wider"
            style={{ color: 'rgba(167,139,250,0.7)' }}>
            {label}
          </label>
        )}
        <div className="relative">
          {prefixIcon && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2"
              style={{ color: 'rgba(124,58,237,0.6)' }}>
              {prefixIcon}
            </span>
          )}
          <input
            ref={ref}
            className={cn(
              'input-base',
              prefixIcon && 'pl-11',
              error && '!border-red-500/50 !ring-red-500/20',
              className
            )}
            {...props}
          />
        </div>
        {hint && !error && <p className="text-xs" style={{ color: 'rgba(248,248,255,0.3)' }}>{hint}</p>}
        {error && (
          <p className="text-xs flex items-center gap-1" style={{ color: '#EF233C' }}>
            <span>⚠</span> {error}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }

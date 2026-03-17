import { cn } from '../../utils/cn'
import { type InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  prefixIcon?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, prefixIcon, className, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-sm font-medium text-secondary dark:text-gray-200">
            {label}
          </label>
        )}
        <div className="relative">
          {prefixIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
              {prefixIcon}
            </span>
          )}
          <input
            ref={ref}
            className={cn(
              'input-base',
              prefixIcon && 'pl-10',
              error && 'border-danger focus:ring-danger',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-danger">{error}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }

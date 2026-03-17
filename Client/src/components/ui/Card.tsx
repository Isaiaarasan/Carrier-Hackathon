import { cn } from '../../utils/cn'
import { type HTMLAttributes } from 'react'

type CardProps = HTMLAttributes<HTMLDivElement>

export function Card({ className, style, ...props }: CardProps) {
  return (
    <div
      className={cn('rounded-3xl transition-all duration-300', className)}
      style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--card-shadow)',
        ...style,
      }}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }: CardProps) {
  return (
    <div className={cn('px-6 pt-6 pb-4 flex items-center justify-between', className)} {...props} />
  )
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('text-sm font-semibold tracking-wide', className)}
      style={{ color: 'var(--text-secondary)' }}
      {...props}
    />
  )
}

export function CardBody({ className, ...props }: CardProps) {
  return <div className={cn('px-6 pb-6', className)} {...props} />
}

export function CardFooter({ className, style, ...props }: CardProps) {
  return (
    <div
      className={cn('px-6 py-4 flex items-center gap-3', className)}
      style={{ borderTop: '1px solid var(--border-color)', ...style }}
      {...props}
    />
  )
}

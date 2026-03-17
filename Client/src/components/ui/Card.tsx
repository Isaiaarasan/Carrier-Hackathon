import { cn } from '../../utils/cn'
import { type HTMLAttributes } from 'react'

type CardProps = HTMLAttributes<HTMLDivElement>

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-800 rounded-2xl border border-border dark:border-gray-700 shadow-card transition-all duration-200',
        className
      )}
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
    <h3 className={cn('text-sm font-semibold text-secondary dark:text-white', className)} {...props} />
  )
}

export function CardBody({ className, ...props }: CardProps) {
  return <div className={cn('px-6 pb-6', className)} {...props} />
}

export function CardFooter({ className, ...props }: CardProps) {
  return (
    <div
      className={cn('px-6 py-4 border-t border-border dark:border-gray-700 flex items-center gap-3', className)}
      {...props}
    />
  )
}

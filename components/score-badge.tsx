import { cn } from '@/lib/utils'

type ScoreBadgeProps = {
  score: number
  size?: 'sm' | 'lg'
  className?: string
}

export function ScoreBadge({ score, size = 'sm', className }: ScoreBadgeProps) {
  const tone =
    score >= 9
      ? 'bg-neon text-neon-foreground'
      : score >= 7.5
        ? 'bg-neon/20 text-neon border border-neon/40'
        : 'bg-pink/20 text-pink border border-pink/40'

  return (
    <span
      className={cn(
        'inline-flex items-baseline gap-0.5 font-display font-extrabold leading-none tabular-nums',
        size === 'sm' ? 'rounded-sm px-2 py-1 text-sm' : 'rounded-md px-3 py-2 text-2xl',
        tone,
        className,
      )}
    >
      {score.toFixed(1)}
      <span className={cn('font-semibold opacity-70', size === 'sm' ? 'text-[10px]' : 'text-xs')}>
        /10
      </span>
    </span>
  )
}

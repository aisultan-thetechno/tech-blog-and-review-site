import { cn } from '@/lib/utils'

type AdSlotProps = {
  /** Width in px, e.g. 728 */
  width: number
  /** Height in px, e.g. 90 */
  height: number
  label?: string
  className?: string
}

/*
  <AdSlot /> is a styled placeholder for an ad unit. In production, replace the
  inner content with your ad network's script/iframe (e.g. Google AdSense).
  Common sizes: 728x90 (leaderboard), 300x250 (medium rectangle).
*/
export function AdSlot({ width, height, label = 'Advertisement', className }: AdSlotProps) {
  return (
    <div className={cn('flex w-full justify-center', className)}>
      <div
        role="complementary"
        aria-label="Advertisement"
        className="relative flex items-center justify-center overflow-hidden border border-dashed border-border bg-secondary/40"
        style={{ width: '100%', maxWidth: width, aspectRatio: `${width} / ${height}` }}
      >
        <span className="absolute left-2 top-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
        <span className="font-mono text-xs text-muted-foreground/70">
          {width} × {height}
        </span>
      </div>
    </div>
  )
}

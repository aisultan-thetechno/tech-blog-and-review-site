import { Check, X } from 'lucide-react'
import { ScoreBadge } from '@/components/score-badge'
import type { Article } from '@/lib/data'

export function VerdictBox({ article }: { article: Article }) {
  if (!article.isReview || typeof article.score !== 'number') return null

  return (
    <aside className="my-8 overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between gap-4 border-b border-border bg-secondary/40 px-6 py-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            The Verdict
          </p>
          <h3 className="font-display text-xl font-black tracking-tight">{article.verdict}</h3>
        </div>
        <ScoreBadge score={article.score} size="lg" />
      </div>

      <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2">
        {article.pros && article.pros.length > 0 && (
          <div>
            <h4 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neon">
              <Check className="size-4" /> The Good
            </h4>
            <ul className="flex flex-col gap-2">
              {article.pros.map((p) => (
                <li key={p} className="flex gap-2 text-sm text-foreground/90">
                  <Check className="mt-0.5 size-4 shrink-0 text-neon" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        )}
        {article.cons && article.cons.length > 0 && (
          <div>
            <h4 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-pink">
              <X className="size-4" /> The Bad
            </h4>
            <ul className="flex flex-col gap-2">
              {article.cons.map((c) => (
                <li key={c} className="flex gap-2 text-sm text-foreground/90">
                  <X className="mt-0.5 size-4 shrink-0 text-pink" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {article.specs && article.specs.length > 0 && (
        <div className="border-t border-border px-6 py-5">
          <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Key Specs
          </h4>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
            {article.specs.map((s) => (
              <div key={s.label} className="flex justify-between gap-4 border-b border-border/60 py-1.5">
                <dt className="text-sm text-muted-foreground">{s.label}</dt>
                <dd className="text-sm font-semibold">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </aside>
  )
}

'use client'

import { useApp } from '@/components/app-provider'
import { ScoreBadge } from '@/components/score-badge'
import { SectionHeading } from '@/components/latest-news'
import type { Article } from '@/lib/data'

export function ReviewCards({ articles }: { articles: Article[] }) {
  const { openArticle } = useApp()

  return (
    <section aria-labelledby="reviews-heading">
      <div className="flex items-center justify-between">
        <SectionHeading id="reviews-heading" title="Reviews" accent="pink" />
        <button className="text-sm font-semibold text-muted-foreground transition-colors hover:text-pink">
          View all
        </button>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {articles.map((a) => (
          <button
            key={a.id}
            onClick={() => openArticle(a.id)}
            className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card text-left transition-colors hover:border-pink/50"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <img
                src={a.image || '/placeholder.svg'}
                alt={a.title}
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {typeof a.score === 'number' && (
                <div className="absolute right-3 top-3">
                  <ScoreBadge score={a.score} />
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col p-4">
              <span
                className={`text-[10px] font-bold uppercase tracking-widest ${
                  a.accent === 'neon' ? 'text-neon' : 'text-pink'
                }`}
              >
                {a.category}
              </span>
              <h3 className="mt-1.5 flex-1 font-display text-base font-extrabold leading-tight tracking-tight text-balance transition-colors group-hover:text-pink">
                {a.title}
              </h3>
              {a.verdict && (
                <span className="mt-3 inline-flex w-fit items-center rounded-sm border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                  {a.verdict}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}

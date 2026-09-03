'use client'

import { Clock } from 'lucide-react'
import { useApp } from '@/components/app-provider'
import type { Article } from '@/lib/data'

export function LatestNews({ articles }: { articles: Article[] }) {
  const { openArticle } = useApp()

  return (
    <section aria-labelledby="latest-heading">
      <SectionHeading id="latest-heading" title="Latest" accent="neon" />
      <div className="mt-5 flex flex-col divide-y divide-border">
        {articles.map((a, i) => (
          <button
            key={a.id}
            onClick={() => openArticle(a.id)}
            className="group flex items-center gap-4 py-4 text-left"
          >
            <span className="w-6 shrink-0 font-display text-lg font-black tabular-nums text-muted-foreground/40">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="min-w-0 flex-1">
              <span
                className={`text-[10px] font-bold uppercase tracking-widest ${
                  a.accent === 'neon' ? 'text-neon' : 'text-pink'
                }`}
              >
                {a.category}
              </span>
              <h3 className="mt-0.5 truncate font-semibold transition-colors group-hover:text-neon sm:text-lg">
                {a.title}
              </h3>
              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                <span>{a.author}</span>
                <span aria-hidden>•</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="size-3" />
                  {a.readTime}
                </span>
              </div>
            </div>
            <div className="hidden size-16 shrink-0 overflow-hidden rounded-md sm:block">
              <img
                src={a.image || '/placeholder.svg'}
                alt=""
                className="size-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}

export function SectionHeading({
  id,
  title,
  accent = 'neon',
}: {
  id?: string
  title: string
  accent?: 'neon' | 'pink'
}) {
  return (
    <div className="flex items-center gap-3">
      <span className={`h-6 w-1.5 rounded-full ${accent === 'neon' ? 'bg-neon' : 'bg-pink'}`} />
      <h2 id={id} className="font-display text-2xl font-black uppercase tracking-tight">
        {title}
      </h2>
    </div>
  )
}

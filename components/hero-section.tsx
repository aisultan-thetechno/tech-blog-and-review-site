'use client'

import { ArrowRight, Clock } from 'lucide-react'
import { useApp } from '@/components/app-provider'
import type { Article } from '@/lib/data'

export function HeroSection({ article, secondary }: { article: Article; secondary: Article[] }) {
  const { openArticle } = useApp()

  return (
    <section className="grid grid-cols-1 gap-4 lg:grid-cols-3" aria-label="Featured stories">
      {/* Main feature */}
      <button
        onClick={() => openArticle(article.id)}
        className="group relative col-span-1 overflow-hidden rounded-xl border border-border text-left lg:col-span-2"
      >
        <div className="aspect-[16/10] w-full overflow-hidden sm:aspect-[16/9]">
          <img
            src={article.image || '/placeholder.svg'}
            alt={article.title}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
          <span
            className={`mb-3 inline-block rounded-sm px-2 py-1 font-mono text-[11px] font-bold uppercase tracking-widest ${
              article.accent === 'neon'
                ? 'bg-neon text-neon-foreground'
                : 'bg-pink text-pink-foreground'
            }`}
          >
            {article.category}
          </span>
          <h1 className="max-w-2xl font-display text-2xl font-black leading-[1.05] tracking-tight text-balance text-white sm:text-4xl lg:text-5xl">
            {article.title}
          </h1>
          <p className="mt-3 hidden max-w-xl text-sm text-white/70 sm:block">{article.excerpt}</p>
          <div className="mt-4 flex items-center gap-3 text-xs text-white/60">
            <span>{article.author}</span>
            <span aria-hidden>•</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3" /> {article.readTime}
            </span>
          </div>
        </div>
      </button>

      {/* Secondary features */}
      <div className="flex flex-col gap-4">
        {secondary.map((a) => (
          <button
            key={a.id}
            onClick={() => openArticle(a.id)}
            className="group flex flex-1 flex-col justify-between overflow-hidden rounded-xl border border-border bg-card p-4 text-left transition-colors hover:border-neon/50"
          >
            <div>
              <span
                className={`text-[11px] font-bold uppercase tracking-widest ${
                  a.accent === 'neon' ? 'text-neon' : 'text-pink'
                }`}
              >
                {a.category}
              </span>
              <h2 className="mt-2 font-display text-lg font-extrabold leading-tight tracking-tight text-balance transition-colors group-hover:text-neon">
                {a.title}
              </h2>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <span>{a.readTime}</span>
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}

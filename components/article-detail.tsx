'use client'

import { ArrowLeft, Bookmark, Clock, Share2 } from 'lucide-react'
import { AdSlot } from '@/components/ad-slot'
import { useApp } from '@/components/app-provider'
import { CommentsSection } from '@/components/comments-section'
import { VerdictBox } from '@/components/verdict-box'
import { YouTubeEmbed } from '@/components/youtube-embed'
import { articles, type Article } from '@/lib/data'

export function ArticleDetail({ article }: { article: Article }) {
  const { goHome, openArticle } = useApp()
  const related = articles.filter((a) => a.id !== article.id).slice(0, 3)

  return (
    <article className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
      <button
        onClick={goHome}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-neon"
      >
        <ArrowLeft className="size-4" /> Back to home
      </button>

      {/* Header */}
      <header>
        <span
          className={`inline-block rounded-sm px-2 py-1 font-mono text-[11px] font-bold uppercase tracking-widest ${
            article.accent === 'neon' ? 'bg-neon text-neon-foreground' : 'bg-pink text-pink-foreground'
          }`}
        >
          {article.category}
        </span>
        <h1 className="mt-4 font-display text-3xl font-black leading-[1.05] tracking-tight text-balance sm:text-5xl">
          {article.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
          {article.subtitle}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-border py-4">
          <div className="flex items-center gap-3">
            <span
              className="flex size-10 items-center justify-center rounded-full text-sm font-bold text-black"
              style={{ backgroundColor: article.authorColor }}
              aria-hidden
            >
              {article.author.charAt(0)}
            </span>
            <div>
              <p className="text-sm font-semibold">{article.author}</p>
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                {article.date}
                <span aria-hidden>•</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="size-3" /> {article.readTime}
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <IconAction label="Share article">
              <Share2 className="size-4" />
            </IconAction>
            <IconAction label="Save article">
              <Bookmark className="size-4" />
            </IconAction>
          </div>
        </div>
      </header>

      {/* Hero image */}
      <div className="mt-8 overflow-hidden rounded-xl border border-border">
        <img
          src={article.image || '/placeholder.svg'}
          alt={article.title}
          className="aspect-[16/9] w-full object-cover"
        />
      </div>

      {/* Body */}
      <div className="mt-8">
        {article.body.map((block, i) => {
          if (block.type === 'h2') {
            return (
              <h2
                key={i}
                className="mt-8 mb-3 font-display text-2xl font-extrabold tracking-tight text-balance"
              >
                {block.text}
              </h2>
            )
          }
          if (block.type === 'quote') {
            return (
              <blockquote
                key={i}
                className="my-8 border-l-4 border-neon pl-5 font-display text-xl font-bold leading-snug text-balance"
              >
                {block.text}
              </blockquote>
            )
          }
          return (
            <p key={i} className="mb-5 text-[1.05rem] leading-relaxed text-foreground/90">
              {block.text}
            </p>
          )
        })}
      </div>

      {/* YouTube review video */}
      {article.youtubeUrl && (
        <YouTubeEmbed url={article.youtubeUrl} title={`${article.title} — hands-on`} />
      )}

      {/* Verdict for reviews */}
      <VerdictBox article={article} />

      {/* In-article ad */}
      <AdSlot width={728} height={90} className="my-10" />

      {/* Comments */}
      <CommentsSection initial={article.comments} />

      {/* Related */}
      <section aria-labelledby="related-heading" className="mt-14 border-t border-border pt-8">
        <h2 id="related-heading" className="mb-5 font-display text-2xl font-black uppercase tracking-tight">
          Read next
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {related.map((a) => (
            <button
              key={a.id}
              onClick={() => openArticle(a.id)}
              className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card text-left transition-colors hover:border-neon/50"
            >
              <div className="aspect-[16/9] w-full overflow-hidden">
                <img
                  src={a.image || '/placeholder.svg'}
                  alt=""
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-3">
                <span
                  className={`text-[10px] font-bold uppercase tracking-widest ${
                    a.accent === 'neon' ? 'text-neon' : 'text-pink'
                  }`}
                >
                  {a.category}
                </span>
                <h3 className="mt-1 text-sm font-semibold leading-snug transition-colors group-hover:text-neon">
                  {a.title}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </section>
    </article>
  )
}

function IconAction({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <button
      aria-label={label}
      className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-neon/50 hover:text-neon"
    >
      {children}
    </button>
  )
}

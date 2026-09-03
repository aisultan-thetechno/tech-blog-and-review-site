import { AdSlot } from '@/components/ad-slot'
import { HeroSection } from '@/components/hero-section'
import { LatestNews } from '@/components/latest-news'
import { ReviewCards } from '@/components/review-cards'
import { articles } from '@/lib/data'

export function HomeView() {
  const [feature, ...rest] = articles
  const secondary = rest.slice(0, 2)
  const latest = articles.slice(1, 5)
  const reviews = articles.filter((a) => a.isReview).slice(0, 4)

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      {/* Leaderboard ad */}
      <AdSlot width={728} height={90} className="mb-8" />

      <HeroSection article={feature} secondary={secondary} />

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <LatestNews articles={latest} />
        </div>
        {/* Sticky sidebar with rectangle ad */}
        <aside className="flex flex-col gap-6">
          <div className="lg:sticky lg:top-20">
            <AdSlot width={300} height={250} />
            <div className="mt-6 rounded-xl border border-border bg-card p-5">
              <h3 className="font-display text-lg font-black uppercase tracking-tight">Trending</h3>
              <ol className="mt-4 flex flex-col gap-4">
                {articles.slice(0, 4).map((a, i) => (
                  <li key={a.id} className="flex gap-3">
                    <span className="font-display text-xl font-black tabular-nums text-pink">
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium leading-snug text-foreground/90">
                      {a.title}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </aside>
      </div>

      <div className="mt-14">
        <ReviewCards articles={reviews} />
      </div>

      {/* Mid-content leaderboard */}
      <AdSlot width={728} height={90} className="mt-14" />
    </div>
  )
}

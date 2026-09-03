'use client'

import { Play } from 'lucide-react'
import { useState } from 'react'

function parseYouTubeId(url: string): string | null {
  try {
    const u = new URL(url)
    if (u.hostname === 'youtu.be') return u.pathname.slice(1) || null
    if (u.pathname.startsWith('/shorts/')) return u.pathname.split('/')[2] ?? null
    if (u.pathname.startsWith('/embed/')) return u.pathname.split('/')[2] ?? null
    return u.searchParams.get('v')
  } catch {
    return null
  }
}

/*
  Click-to-play facade: shows the video thumbnail and only loads the YouTube
  iframe after the user clicks. This keeps the article page fast (no heavy
  third-party iframe on initial load) while still embedding the review video.
  Uses youtube-nocookie.com for privacy-enhanced mode.
*/
export function YouTubeEmbed({ url, title }: { url: string; title: string }) {
  const [playing, setPlaying] = useState(false)
  const id = parseYouTubeId(url)

  if (!id) return null

  return (
    <figure className="my-8 overflow-hidden rounded-xl border border-border bg-black">
      <div className="relative aspect-video w-full">
        {playing ? (
          <iframe
            className="absolute inset-0 size-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <button
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 size-full"
            aria-label={`Play video: ${title}`}
          >
            <img
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt=""
              className="size-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
            />
            <span className="absolute inset-0 bg-black/20" />
            <span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-pink text-pink-foreground shadow-lg transition-transform group-hover:scale-110">
              <Play className="size-7 translate-x-0.5" fill="currentColor" />
            </span>
          </button>
        )}
      </div>
      <figcaption className="px-4 py-2.5 font-mono text-xs uppercase tracking-wide text-muted-foreground">
        Watch: {title}
      </figcaption>
    </figure>
  )
}

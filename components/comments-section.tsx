'use client'

import { ChevronUp, MessageSquare } from 'lucide-react'
import { useState } from 'react'
import { useApp } from '@/components/app-provider'
import { Button } from '@/components/ui/button'
import type { Comment } from '@/lib/data'

export function CommentsSection({ initial }: { initial: Comment[] }) {
  const { user, setAuthModalOpen } = useApp()
  const [comments, setComments] = useState<Comment[]>(initial)
  const [draft, setDraft] = useState('')
  const [voted, setVoted] = useState<Record<string, boolean>>({})

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!draft.trim() || !user) return
    setComments((prev) => [
      {
        id: `local-${Date.now()}`,
        author: user,
        avatarColor: 'oklch(0.85 0.17 195)',
        timeAgo: 'just now',
        body: draft.trim(),
        upvotes: 0,
      },
      ...prev,
    ])
    setDraft('')
  }

  const upvote = (id: string) => {
    if (voted[id]) return
    setComments((prev) => prev.map((c) => (c.id === id ? { ...c, upvotes: c.upvotes + 1 } : c)))
    setVoted((v) => ({ ...v, [id]: true }))
  }

  return (
    <section aria-labelledby="comments-heading" className="mt-12 border-t border-border pt-8">
      <h2 id="comments-heading" className="flex items-center gap-2 font-display text-2xl font-black tracking-tight">
        <MessageSquare className="size-6 text-neon" />
        Discussion
        <span className="text-muted-foreground">({comments.length})</span>
      </h2>

      {/* Composer */}
      {user ? (
        <form onSubmit={submit} className="mt-6 flex flex-col gap-3">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Add to the discussion…"
            rows={3}
            aria-label="Write a comment"
            className="w-full resize-none rounded-lg border border-border bg-card p-4 text-sm outline-none focus:border-neon/60"
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={!draft.trim()}
              className="bg-neon font-bold text-neon-foreground hover:bg-neon/85"
            >
              Post comment
            </Button>
          </div>
        </form>
      ) : (
        <div className="mt-6 flex flex-col items-start gap-3 rounded-lg border border-dashed border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Sign in to join the discussion and upvote comments.
          </p>
          <Button
            onClick={() => setAuthModalOpen(true)}
            className="bg-neon font-bold text-neon-foreground hover:bg-neon/85"
          >
            Sign in to comment
          </Button>
        </div>
      )}

      {/* List */}
      <ul className="mt-8 flex flex-col gap-6">
        {comments.map((c) => (
          <li key={c.id} className="flex gap-3">
            <span
              className="flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-black"
              style={{ backgroundColor: c.avatarColor }}
              aria-hidden
            >
              {c.author.charAt(0).toUpperCase()}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">{c.author}</span>
                <span className="text-xs text-muted-foreground">{c.timeAgo}</span>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-foreground/90">{c.body}</p>
              <button
                onClick={() => upvote(c.id)}
                disabled={voted[c.id]}
                className={`mt-2 inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors ${
                  voted[c.id]
                    ? 'border-neon/50 bg-neon/10 text-neon'
                    : 'border-border text-muted-foreground hover:border-neon/50 hover:text-neon'
                }`}
              >
                <ChevronUp className="size-3.5" />
                {c.upvotes}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

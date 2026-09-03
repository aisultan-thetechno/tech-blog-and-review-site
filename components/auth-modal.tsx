'use client'

import { Lock, Mail, X, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useApp } from '@/components/app-provider'
import { Button } from '@/components/ui/button'

export function AuthModal() {
  const { authModalOpen, setAuthModalOpen, signIn } = useApp()
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (!authModalOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAuthModalOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [authModalOpen, setAuthModalOpen])

  if (!authModalOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const name = email.split('@')[0] || 'reader'
    signIn(name)
    setEmail('')
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Authentication"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => setAuthModalOpen(false)}
      />
      <div className="relative w-full max-w-md overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-1.5 font-display text-lg font-black tracking-tight">
            <Zap className="size-4 text-neon" fill="currentColor" />
            CIRCUIT
          </div>
          <Button variant="ghost" size="icon-sm" onClick={() => setAuthModalOpen(false)} aria-label="Close">
            <X />
          </Button>
        </div>

        <div className="px-6 py-6">
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-balance">
            {mode === 'signin' ? 'Welcome back' : 'Join CIRCUIT'}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === 'signin'
              ? 'Sign in to comment, upvote and save articles.'
              : 'Create an account to join the conversation.'}
          </p>

          <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Email
              </span>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="h-11 w-full rounded-md border border-border bg-secondary/40 pl-9 pr-3 text-sm outline-none focus:border-neon/60"
                />
              </div>
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Password
              </span>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="h-11 w-full rounded-md border border-border bg-secondary/40 pl-9 pr-3 text-sm outline-none focus:border-neon/60"
                />
              </div>
            </label>
            <Button
              type="submit"
              className="mt-2 h-11 bg-neon font-bold text-neon-foreground hover:bg-neon/85"
            >
              {mode === 'signin' ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
              className="font-semibold text-neon hover:underline"
            >
              {mode === 'signin' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

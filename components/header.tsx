'use client'

import { LogOut, Menu, Moon, Search, Sun, X, Zap } from 'lucide-react'
import { useState } from 'react'
import { useApp } from '@/components/app-provider'
import { Button } from '@/components/ui/button'
import { CATEGORIES } from '@/lib/data'

export function Header() {
  const { theme, toggleTheme, user, signOut, setAuthModalOpen, goHome } = useApp()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeCat, setActiveCat] = useState<string>('News')

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        {/* Logo */}
        <button
          onClick={goHome}
          className="flex shrink-0 items-center gap-1.5 font-display text-xl font-black tracking-tight"
          aria-label="CIRCUIT home"
        >
          <Zap className="size-5 text-neon" fill="currentColor" />
          CIRCUIT
        </button>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Categories">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCat(cat)
                goHome()
              }}
              className={`relative px-3 py-2 text-sm font-semibold uppercase tracking-wide transition-colors ${
                activeCat === cat ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat}
              {activeCat === cat && (
                <span className="absolute inset-x-3 bottom-1 h-0.5 bg-neon" />
              )}
            </button>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search reviews…"
              aria-label="Search"
              className="h-9 w-40 rounded-md border border-border bg-secondary/40 pl-8 pr-3 text-sm outline-none transition-all placeholder:text-muted-foreground focus:w-56 focus:border-neon/60"
            />
          </div>

          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun /> : <Moon />}
          </Button>

          {/* Auth */}
          {user ? (
            <div className="flex items-center gap-2">
              <span
                className="hidden size-8 items-center justify-center rounded-full bg-neon text-sm font-bold text-neon-foreground sm:flex"
                aria-hidden
              >
                {user.charAt(0).toUpperCase()}
              </span>
              <Button variant="outline" size="sm" onClick={signOut}>
                <LogOut /> Sign out
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              onClick={() => setAuthModalOpen(true)}
              className="bg-neon font-semibold text-neon-foreground hover:bg-neon/85"
            >
              Sign In
            </Button>
          )}

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="border-t border-border bg-background px-4 py-3 lg:hidden" aria-label="Categories">
          <div className="flex flex-col">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCat(cat)
                  goHome()
                  setMobileOpen(false)
                }}
                className={`py-2 text-left text-sm font-semibold uppercase tracking-wide ${
                  activeCat === cat ? 'text-neon' : 'text-muted-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}

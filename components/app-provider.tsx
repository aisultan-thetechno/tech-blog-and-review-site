'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

type View = { name: 'home' } | { name: 'article'; id: string }
type Theme = 'dark' | 'light'

type AppState = {
  theme: Theme
  toggleTheme: () => void
  user: string | null
  signIn: (name: string) => void
  signOut: () => void
  authModalOpen: boolean
  setAuthModalOpen: (open: boolean) => void
  view: View
  openArticle: (id: string) => void
  goHome: () => void
}

const AppContext = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')
  const [user, setUser] = useState<string | null>(null)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [view, setView] = useState<View>({ name: 'home' })

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    root.classList.toggle('light', theme === 'light')
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  const openArticle = useCallback((id: string) => {
    setView({ name: 'article', id })
    window.scrollTo({ top: 0 })
  }, [])

  const goHome = useCallback(() => {
    setView({ name: 'home' })
    window.scrollTo({ top: 0 })
  }, [])

  const value = useMemo<AppState>(
    () => ({
      theme,
      toggleTheme,
      user,
      signIn: (name: string) => {
        setUser(name)
        setAuthModalOpen(false)
      },
      signOut: () => setUser(null),
      authModalOpen,
      setAuthModalOpen,
      view,
      openArticle,
      goHome,
    }),
    [theme, toggleTheme, user, authModalOpen, view, openArticle, goHome],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

'use client'

import { AppProvider, useApp } from '@/components/app-provider'
import { ArticleDetail } from '@/components/article-detail'
import { AuthModal } from '@/components/auth-modal'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { HomeView } from '@/components/home-view'
import { getArticle } from '@/lib/data'

function Screen() {
  const { view } = useApp()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {view.name === 'home' ? <HomeView /> : <ArticleDetail article={getArticle(view.id)} />}
      </main>
      <Footer />
      <AuthModal />
    </div>
  )
}

export default function Page() {
  return (
    <AppProvider>
      <Screen />
    </AppProvider>
  )
}

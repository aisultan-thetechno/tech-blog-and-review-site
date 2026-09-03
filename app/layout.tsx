import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Archivo, Inter } from 'next/font/google'
import { AnalyticsScripts } from '@/components/analytics-scripts'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  weight: ['600', '700', '800', '900'],
  display: 'swap',
})

/*
  Open Graph metadata is configured below. These tags render into <head> so
  crawlers (Google, X, Facebook) can build rich previews for each article.
  For a real /article/[id] route you would export generateMetadata() per page.
*/
export const metadata: Metadata = {
  title: 'CIRCUIT — Tech Blog & Reviews',
  description:
    'Breaking tech news, in-depth gadget reviews and hardware deep dives. Smartphones, PC hardware, laptops and the future of technology.',
  generator: 'v0.app',
  keywords: ['tech news', 'gadget reviews', 'smartphones', 'PC hardware', 'laptops'],
  openGraph: {
    title: 'CIRCUIT — Tech Blog & Reviews',
    description: 'Breaking tech news, in-depth gadget reviews and hardware deep dives.',
    type: 'website',
    siteName: 'CIRCUIT',
    images: [{ url: '/images/hero-ai-phone.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CIRCUIT — Tech Blog & Reviews',
    description: 'Breaking tech news, in-depth gadget reviews and hardware deep dives.',
    images: ['/images/hero-ai-phone.png'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark bg-background ${inter.variable} ${archivo.variable}`}>
      <head>
        <AnalyticsScripts
          gaMeasurementId="G-XXXXXXXXXX"
          yandexCounterId="00000000"
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

'use client'

import { BarChart3, Search as SearchIcon, ShieldCheck, Zap } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

const linkGroups = [
  { title: 'Sections', links: ['News', 'Reviews', 'Smartphones', 'PC Hardware', 'Laptops'] },
  { title: 'Company', links: ['About', 'Editorial Team', 'Careers', 'Contact', 'Advertise'] },
  { title: 'Resources', links: ['Buying Guides', 'Best of 2026', 'Deals', 'Newsletter', 'RSS Feed'] },
  { title: 'Legal', links: ['Privacy Policy', 'Terms of Use', 'Cookie Settings', 'Ethics Policy'] },
]

export function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  return (
    <footer className="mt-16 border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        {/* Newsletter */}
        <div className="flex flex-col gap-6 border-b border-border pb-10 md:flex-row md:items-center md:justify-between">
          <div className="max-w-md">
            <h3 className="font-display text-2xl font-extrabold tracking-tight text-balance">
              The best of tech, in your inbox
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Join 250,000+ readers getting our daily briefing on the gadgets and news that matter.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setSubscribed(true)
              setEmail('')
            }}
            className="flex w-full max-w-md gap-2"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              aria-label="Email address"
              className="h-11 flex-1 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-neon/60"
            />
            <Button type="submit" className="h-11 bg-neon font-bold text-neon-foreground hover:bg-neon/85">
              Subscribe
            </Button>
          </form>
        </div>
        {subscribed && (
          <p className="mt-3 text-sm text-neon">Thanks — check your inbox to confirm your subscription.</p>
        )}

        {/* Link grid */}
        <div className="grid grid-cols-2 gap-8 py-10 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <div className="flex items-center gap-1.5 font-display text-xl font-black tracking-tight">
              <Zap className="size-5 text-neon" fill="currentColor" />
              CIRCUIT
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Independent tech journalism. Reviews you can trust, news you can use.
            </p>
          </div>
          {linkGroups.map((group) => (
            <div key={group.title}>
              <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                {group.title}
              </h4>
              <ul className="flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-foreground/80 transition-colors hover:text-neon">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} CIRCUIT Media. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Badge icon={<BarChart3 className="size-3" />} label="GA4 Connected" />
            <Badge icon={<SearchIcon className="size-3" />} label="SEO Optimized" />
            <Badge icon={<ShieldCheck className="size-3" />} label="Yandex Metrika" />
          </div>
        </div>
      </div>
    </footer>
  )
}

function Badge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
      {icon}
      {label}
    </span>
  )
}

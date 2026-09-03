export type Comment = {
  id: string
  author: string
  avatarColor: string
  timeAgo: string
  body: string
  upvotes: number
}

export type Article = {
  id: string
  category: string
  accent: 'neon' | 'pink'
  title: string
  subtitle: string
  excerpt: string
  image: string
  author: string
  authorColor: string
  date: string
  readTime: string
  isReview: boolean
  score?: number
  verdict?: string
  pros?: string[]
  cons?: string[]
  specs?: { label: string; value: string }[]
  youtubeUrl?: string
  body: { type: 'p' | 'h2' | 'quote'; text: string }[]
  comments: Comment[]
}

export const CATEGORIES = ['News', 'Reviews', 'Smartphones', 'PC Hardware', 'Laptops'] as const

export const articles: Article[] = [
  {
    id: 'foldable-future',
    category: 'Smartphones',
    accent: 'neon',
    title: 'The foldable future is finally here — and it actually works',
    subtitle:
      'After a decade of broken hinges and creased displays, the new generation of folding phones has crossed the line from novelty to necessity.',
    excerpt:
      'We spent three weeks living with the most ambitious foldable yet. The verdict? The compromises are shrinking fast, and the magic is real.',
    image: '/images/hero-ai-phone.png',
    author: 'Maya Chen',
    authorColor: 'oklch(0.7 0.15 195)',
    date: 'March 3, 2026',
    readTime: '9 min read',
    isReview: false,
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    body: [
      {
        type: 'p',
        text: 'For years, foldable phones were a punchline — expensive, fragile experiments that felt more like tech demos than tools. That era is over. The latest wave of devices has quietly solved the problems that made early adopters wince.',
      },
      {
        type: 'h2',
        text: 'A hinge you stop thinking about',
      },
      {
        type: 'p',
        text: 'The single biggest leap is mechanical. The new hinge assembly folds completely flat with no visible gap, and the crease — while still technically present — has become nearly invisible in daily use. You stop noticing it within a day.',
      },
      {
        type: 'quote',
        text: 'This is the first foldable I would recommend to someone who is not a gadget obsessive. That is a genuine milestone.',
      },
      {
        type: 'p',
        text: 'Battery life, historically the Achilles heel of these devices, now comfortably clears a full day of heavy use. Combine that with a bright outdoor-legible inner display and you have a phone that finally justifies its price tag.',
      },
    ],
    comments: [
      {
        id: 'c1',
        author: 'gadgetgeek',
        avatarColor: 'oklch(0.66 0.25 8)',
        timeAgo: '2h ago',
        body: 'Finally! I have been waiting for the crease problem to get solved. Might actually upgrade this year.',
        upvotes: 42,
      },
      {
        id: 'c2',
        author: 'skeptic_sam',
        avatarColor: 'oklch(0.7 0.15 195)',
        timeAgo: '4h ago',
        body: 'Still too expensive for me but the progress is undeniable. Great write-up.',
        upvotes: 18,
      },
    ],
  },
  {
    id: 'iphone-review',
    category: 'Smartphones',
    accent: 'pink',
    title: 'iPhone 17 Pro review: the most refined phone Apple has ever shipped',
    subtitle: 'A titanium powerhouse that plays it safe in all the right ways.',
    excerpt:
      'Apple’s latest flagship is less a reinvention and more a masterclass in refinement. The camera system alone makes it worth the upgrade.',
    image: '/images/review-iphone.png',
    author: 'Diego Alvarez',
    authorColor: 'oklch(0.66 0.25 8)',
    date: 'March 1, 2026',
    readTime: '12 min read',
    isReview: true,
    score: 9.0,
    verdict: 'Editor’s Choice',
    youtubeUrl: 'https://www.youtube.com/shorts/aqz-KE-bpKQ',
    pros: [
      'Best-in-class camera system',
      'Exceptional battery life',
      'Gorgeous titanium build',
      'Blazing fast A19 Pro chip',
    ],
    cons: ['Very expensive', 'Slow charging speeds', 'Minimal design changes'],
    specs: [
      { label: 'Display', value: '6.3" LTPO OLED, 120Hz' },
      { label: 'Chip', value: 'A19 Pro' },
      { label: 'Storage', value: '256GB – 1TB' },
      { label: 'Battery', value: '4,200 mAh' },
      { label: 'Weight', value: '199 g' },
    ],
    body: [
      {
        type: 'p',
        text: 'The iPhone 17 Pro will not surprise you. And that, in a strange way, is exactly the point. Apple has spent this cycle sanding down every rough edge of last year’s model until what remains is almost frictionless.',
      },
      { type: 'h2', text: 'The camera is the story' },
      {
        type: 'p',
        text: 'The new 48-megapixel telephoto sensor is the standout upgrade. Low-light shots that would have been mush a generation ago now come out crisp and color-accurate. This is the closest a phone has come to replacing a dedicated camera.',
      },
      {
        type: 'quote',
        text: 'If you take photos seriously, this is the phone to beat in 2026. Full stop.',
      },
    ],
    comments: [
      {
        id: 'c1',
        author: 'photodan',
        avatarColor: 'oklch(0.7 0.15 195)',
        timeAgo: '1h ago',
        body: 'The telephoto samples are unreal. Coming from a 15 Pro, is it worth it?',
        upvotes: 31,
      },
    ],
  },
  {
    id: 'rtx-review',
    category: 'PC Hardware',
    accent: 'neon',
    title: 'RTX 5090 review: absurd power, absurd price',
    subtitle: 'The fastest consumer GPU ever made asks a very serious question about diminishing returns.',
    excerpt:
      'Nvidia’s new flagship delivers frame rates that border on ridiculous — but you’ll pay dearly for the privilege of never dropping below 4K/120.',
    image: '/images/review-gpu.png',
    author: 'Priya Raman',
    authorColor: 'oklch(0.7 0.15 195)',
    date: 'Feb 27, 2026',
    readTime: '15 min read',
    isReview: true,
    score: 8.5,
    verdict: 'Highly Recommended',
    youtubeUrl: 'https://youtu.be/dQw4w9WgXcQ',
    pros: ['Untouchable raw performance', 'Excellent ray tracing', 'Quiet cooling solution'],
    cons: ['Eye-watering price', 'Massive power draw', 'Requires a huge case'],
    specs: [
      { label: 'CUDA Cores', value: '21,760' },
      { label: 'VRAM', value: '32GB GDDR7' },
      { label: 'TDP', value: '575W' },
      { label: 'Boost Clock', value: '2.9 GHz' },
    ],
    body: [
      {
        type: 'p',
        text: 'There is fast, and then there is the RTX 5090. In every benchmark we threw at it, Nvidia’s new halo card didn’t just win — it lapped the field. But raw numbers only tell half the story.',
      },
      { type: 'h2', text: 'Who is this actually for?' },
      {
        type: 'p',
        text: 'At this price, the 5090 is a statement piece as much as a component. For 4K enthusiasts and content creators, it is transformative. For everyone else, the value proposition gets murky fast.',
      },
    ],
    comments: [
      {
        id: 'c1',
        author: 'framechaser',
        avatarColor: 'oklch(0.66 0.25 8)',
        timeAgo: '3h ago',
        body: '575W TDP is wild. My power bill is scared.',
        upvotes: 57,
      },
    ],
  },
  {
    id: 'macbook-review',
    category: 'Laptops',
    accent: 'pink',
    title: 'MacBook Pro M5 Max review: the creative workhorse gets scary good',
    subtitle: 'Silent, cool, and outrageously fast — this is the laptop to beat.',
    excerpt:
      'Apple’s M5 Max turns the MacBook Pro into a portable workstation that laughs at heavy workloads while sipping battery.',
    image: '/images/review-laptop.png',
    author: 'Sofia Lindqvist',
    authorColor: 'oklch(0.66 0.25 8)',
    date: 'Feb 24, 2026',
    readTime: '11 min read',
    isReview: true,
    score: 9.3,
    verdict: 'Editor’s Choice',
    pros: ['Incredible battery life', 'Silent under load', 'Stunning display', 'Best-in-class trackpad'],
    cons: ['Premium pricing', 'Limited port selection', 'Still no touchscreen'],
    specs: [
      { label: 'Chip', value: 'M5 Max (16-core)' },
      { label: 'Display', value: '16.2" Liquid Retina XDR' },
      { label: 'RAM', value: 'Up to 128GB' },
      { label: 'Battery', value: 'Up to 24 hours' },
    ],
    body: [
      {
        type: 'p',
        text: 'The MacBook Pro has been the default recommendation for creative professionals for years. The M5 Max cements that lead so thoroughly that the competition feels like it is playing a different sport.',
      },
      { type: 'h2', text: 'Performance without the noise' },
      {
        type: 'p',
        text: 'We rendered 8K timelines and compiled massive codebases without the fans ever becoming audible. The machine stays cool, quiet, and composed.',
      },
    ],
    comments: [],
  },
  {
    id: 'keyboard-review',
    category: 'PC Hardware',
    accent: 'neon',
    title: 'This $199 mechanical keyboard punches way above its weight',
    subtitle: 'Gasket mounting, hot-swap switches and a sound profile that costs twice as much elsewhere.',
    excerpt:
      'The enthusiast keyboard market has trickled down to the mainstream, and this board is the proof. Thocky, premium, and shockingly affordable.',
    image: '/images/review-keyboard.png',
    author: 'Marcus Webb',
    authorColor: 'oklch(0.7 0.15 195)',
    date: 'Feb 20, 2026',
    readTime: '8 min read',
    isReview: true,
    score: 8.8,
    verdict: 'Best Value',
    pros: ['Premium typing feel', 'Hot-swappable switches', 'Great value', 'Solid build quality'],
    cons: ['No wireless option', 'Keycaps are just okay'],
    specs: [
      { label: 'Layout', value: '75% (84 keys)' },
      { label: 'Mount', value: 'Gasket' },
      { label: 'Switches', value: 'Hot-swap (5-pin)' },
      { label: 'Connection', value: 'USB-C wired' },
    ],
    body: [
      {
        type: 'p',
        text: 'Not long ago, a keyboard that sounded and felt this good would have cost you a custom group-buy and months of waiting. Now it ships in a box for under two hundred dollars.',
      },
    ],
    comments: [],
  },
]

export function getArticle(id: string) {
  return articles.find((a) => a.id === id) ?? articles[0]
}

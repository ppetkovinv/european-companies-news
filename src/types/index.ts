export interface Country {
  code: string
  name: string
  flag: string
  currency: string
  exchange: string
}

export interface Company {
  id: string
  name: string
  ticker: string
  isin: string
  sector: string
  country: string
  marketCap: number
  price: number
  change: number
  changePercent: number
  description?: string
  website?: string
}

export interface NewsArticle {
  id: string
  title: string
  description: string
  url: string
  source: string
  publishedAt: string
  author?: string
  company?: string
  country?: string
  sector?: string
  imageUrl?: string
}

export interface MarketData {
  country: string
  index: string
  value: number
  change: number
  changePercent: number
  lastUpdate: string
}

export interface User {
  id: string
  email: string
  name?: string
  watchlist: string[]
  preferences: {
    countries: string[]
    sectors: string[]
    notifications: boolean
  }
}
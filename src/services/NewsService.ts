import Parser from 'rss-parser'
import { NewsArticle } from '@/types'

const parser = new Parser({
  customFields: {
    item: ['media:content', 'media:thumbnail']
  }
})

// RSS Feed sources for European financial news
const RSS_SOURCES = {
  general: [
    'https://feeds.finance.yahoo.com/rss/2.0/headline',
    'https://www.reuters.com/arc/outboundfeeds/rss/category/business/',
    'https://feeds.bloomberg.com/business/news.rss'
  ],
  germany: [
    'https://www.boerse.de/rss/nachrichten-marktberichte',
    'https://www.finanzen.net/rss/news'
  ],
  france: [
    'https://www.boursorama.com/rss/actualites/economie-politique',
    'https://feeds.feedburner.com/LesEchosActualitesFinance'
  ],
  italy: [
    'https://feeds.bloomberg.com/markets/news.rss',
    'https://www.milanofinanza.it/rss'
  ],
  netherlands: [
    'https://feeds.feedburner.com/financieelnieuws',
    'https://www.nrc.nl/rss/economie/'
  ],
  spain: [
    'https://e00-expansion.uecdn.es/rss/mercados.xml',
    'https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/economia/portada'
  ]
}

export class NewsService {
  private static instance: NewsService
  private cache: Map<string, { data: NewsArticle[], timestamp: number }> = new Map()
  private readonly CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

  static getInstance(): NewsService {
    if (!NewsService.instance) {
      NewsService.instance = new NewsService()
    }
    return NewsService.instance
  }

  async fetchRSSFeed(url: string): Promise<unknown[]> {
    try {
      const feed = await parser.parseURL(url)
      return feed.items || []
    } catch (error) {
      console.error(`Error fetching RSS feed ${url}:`, error)
      return []
    }
  }

  async aggregateNews(country?: string): Promise<NewsArticle[]> {
    const cacheKey = country || 'general'
    const cached = this.cache.get(cacheKey)
    
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data
    }

    try {
      let feedUrls = RSS_SOURCES.general
      
      if (country) {
        const countryFeeds = RSS_SOURCES[country as keyof typeof RSS_SOURCES]
        if (countryFeeds) {
          feedUrls = [...RSS_SOURCES.general, ...countryFeeds]
        }
      }

      const allNewsPromises = feedUrls.map(url => this.fetchRSSFeed(url))
      const allNewsArrays = await Promise.all(allNewsPromises)
      
      const allNews = allNewsArrays.flat()
      const processedNews = this.processAndDeduplicateNews(allNews, country)
      
      this.cache.set(cacheKey, { data: processedNews, timestamp: Date.now() })
      return processedNews
    } catch (error) {
      console.error('Error aggregating news:', error)
      return []
    }
  }

  private processAndDeduplicateNews(rawNews: unknown[], country?: string): NewsArticle[] {
    const seenTitles = new Set<string>()
    const processedNews: NewsArticle[] = []

    for (const item of rawNews) {
      const newsItem = item as Record<string, unknown>
      if (!newsItem.title || seenTitles.has(newsItem.title as string)) {
        continue
      }

      // Extract company names from title/description (basic implementation)
      const company = this.extractCompanyName((newsItem.title as string) + ' ' + (newsItem.description as string || ''))
      const sector = this.extractSector((newsItem.title as string) + ' ' + (newsItem.description as string || ''))

      const article: NewsArticle = {
        id: this.generateId((newsItem.title as string) + (newsItem.pubDate as string)),
        title: newsItem.title as string,
        description: this.cleanDescription((newsItem.description as string) || (newsItem.summary as string) || ''),
        url: (newsItem.link as string) || (newsItem.url as string) || '',
        source: this.extractSource(newsItem),
        publishedAt: (newsItem.pubDate as string) || (newsItem.date as string) || new Date().toISOString(),
        author: (newsItem.author as string) || (newsItem.creator as string),
        company,
        country,
        sector,
        imageUrl: this.extractImageUrl(newsItem)
      }

      seenTitles.add(newsItem.title as string)
      processedNews.push(article)
    }

    // Sort by publication date (newest first)
    return processedNews
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 50) // Limit to 50 most recent articles
  }

  private extractSource(item: Record<string, unknown>): string {
    if (item.source) return item.source as string
    if (item.link) {
      const url = new URL(item.link as string)
      return url.hostname.replace('www.', '')
    }
    return 'Unknown'
  }

  private extractCompanyName(text: string): string | undefined {
    // Simple company extraction - in production this would be more sophisticated
    const companies = ['SAP', 'Siemens', 'ASML', 'LVMH', 'TotalEnergies', 'Deutsche Bank', 'BNP Paribas', 'Unilever', 'Shell', 'Santander']
    const foundCompany = companies.find(company => 
      text.toUpperCase().includes(company.toUpperCase())
    )
    return foundCompany
  }

  private extractSector(text: string): string | undefined {
    const sectorKeywords = {
      'Technology': ['tech', 'software', 'AI', 'digital', 'startup'],
      'Banking': ['bank', 'financial', 'finance', 'lending', 'credit'],
      'Energy': ['energy', 'oil', 'gas', 'renewable', 'solar', 'wind'],
      'Automotive': ['car', 'auto', 'vehicle', 'electric vehicle', 'EV'],
      'Healthcare': ['health', 'pharma', 'medical', 'drug', 'treatment'],
    }

    for (const [sector, keywords] of Object.entries(sectorKeywords)) {
      if (keywords.some(keyword => text.toLowerCase().includes(keyword))) {
        return sector
      }
    }
    return undefined
  }

  private extractImageUrl(item: Record<string, unknown>): string | undefined {
    const mediaContent = item['media:content'] as Record<string, unknown>
    const mediaThumbnail = item['media:thumbnail'] as Record<string, unknown>
    const enclosure = item.enclosure as Record<string, unknown>
    
    if (mediaContent && mediaContent['$'] && (mediaContent['$'] as Record<string, unknown>).url) {
      return (mediaContent['$'] as Record<string, unknown>).url as string
    }
    if (mediaThumbnail && mediaThumbnail['$'] && (mediaThumbnail['$'] as Record<string, unknown>).url) {
      return (mediaThumbnail['$'] as Record<string, unknown>).url as string
    }
    if (enclosure && enclosure.url) {
      return enclosure.url as string
    }
    return undefined
  }

  private cleanDescription(description: string): string {
    // Remove HTML tags and clean up description
    return description
      .replace(/<[^>]*>/g, '')
      .replace(/&[a-zA-Z0-9#]+;/g, ' ')
      .trim()
      .substring(0, 200) + (description.length > 200 ? '...' : '')
  }

  private generateId(input: string): string {
    let hash = 0
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36)
  }

  // Get news filtered by various criteria
  async getFilteredNews(filters: {
    country?: string
    sector?: string
    company?: string
    limit?: number
  }): Promise<NewsArticle[]> {
    const allNews = await this.aggregateNews(filters.country)
    
    let filteredNews = allNews

    if (filters.sector) {
      filteredNews = filteredNews.filter(article => 
        article.sector?.toLowerCase() === filters.sector?.toLowerCase()
      )
    }

    if (filters.company) {
      filteredNews = filteredNews.filter(article => 
        article.company?.toLowerCase().includes(filters.company?.toLowerCase() || '') ||
        article.title.toLowerCase().includes(filters.company?.toLowerCase() || '') ||
        article.description.toLowerCase().includes(filters.company?.toLowerCase() || '')
      )
    }

    return filteredNews.slice(0, filters.limit || 20)
  }
}
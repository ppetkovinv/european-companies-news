"use client"

import React, { useState, useEffect } from "react"
import { countries, sectors } from "@/data/constants"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Building2, Calendar, ExternalLink, TrendingUp } from "lucide-react"
import { formatRelativeTime } from "@/lib/utils"

interface SearchResult {
  type: 'company' | 'news'
  id: string
  title: string
  description: string
  url?: string
  source?: string
  publishedAt?: string
  sector?: string
  country?: string
  ticker?: string
  price?: number
  change?: number
}

// Sample search results - in production this would come from Elasticsearch or similar
const sampleResults: SearchResult[] = [
  {
    type: 'company',
    id: '1',
    title: 'SAP SE',
    description: 'German multinational software corporation that makes enterprise software to manage business operations and customer relations.',
    sector: 'Technology',
    country: 'DE',
    ticker: 'SAP',
    price: 123.45,
    change: 1.9
  },
  {
    type: 'news',
    id: '2',
    title: 'SAP Announces New AI Platform for Enterprise Customers',
    description: 'The German software giant unveiled its latest artificial intelligence platform designed to help enterprises streamline their operations.',
    source: 'Reuters',
    publishedAt: '2024-01-15T10:30:00Z',
    sector: 'Technology',
    country: 'DE',
    url: 'https://example.com/news/sap-ai-platform'
  },
  {
    type: 'company',
    id: '3',
    title: 'ASML Holding N.V.',
    description: 'Dutch company and the leading supplier of photolithography systems for the semiconductor industry.',
    sector: 'Technology',
    country: 'NL',
    ticker: 'ASML',
    price: 712.50,
    change: 2.18
  },
  {
    type: 'news',
    id: '4',
    title: 'European Banking Sector Shows Resilience in Q4 2024',
    description: 'Major European banks report strong quarterly results despite challenging macroeconomic conditions.',
    source: 'Financial Times',
    publishedAt: '2024-01-14T14:20:00Z',
    sector: 'Banking',
    url: 'https://example.com/news/european-banking-q4'
  }
]

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [filters, setFilters] = useState({
    type: 'all' as 'all' | 'company' | 'news',
    country: 'all',
    sector: 'all'
  })

  const handleSearch = React.useCallback(() => {
    if (!searchTerm.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)
    
    // Simulate API call delay
    setTimeout(() => {
      let filteredResults = sampleResults.filter(result => 
        result.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        result.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (result.ticker && result.ticker.toLowerCase().includes(searchTerm.toLowerCase()))
      )

      // Apply filters
      if (filters.type !== 'all') {
        filteredResults = filteredResults.filter(result => result.type === filters.type)
      }

      if (filters.country !== 'all') {
        filteredResults = filteredResults.filter(result => result.country === filters.country)
      }

      if (filters.sector !== 'all') {
        filteredResults = filteredResults.filter(result => result.sector === filters.sector)
      }

      setResults(filteredResults)
      setIsLoading(false)
    }, 500)
  }, [searchTerm, filters])

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchTerm) {
        handleSearch()
      } else {
        setResults([])
      }
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [searchTerm, filters, handleSearch])

  const getCountryFlag = (code: string) => {
    return countries.find(c => c.code === code)?.flag || ""
  }

  const getCountryName = (code: string) => {
    return countries.find(c => c.code === code)?.name || code
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Search className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-foreground mb-4">Search European Markets</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Find companies, news, and market insights across Europe
          </p>
          
          {/* Main Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search companies, news, sectors..."
              className="w-full pl-12 pr-4 py-4 text-lg border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Content Type</label>
                <select 
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  value={filters.type}
                  onChange={(e) => setFilters({...filters, type: e.target.value as 'all' | 'company' | 'news'})}
                >
                  <option value="all">All Results</option>
                  <option value="company">Companies</option>
                  <option value="news">News</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Country</label>
                <select 
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  value={filters.country}
                  onChange={(e) => setFilters({...filters, country: e.target.value})}
                >
                  <option value="all">All Countries</option>
                  {countries.map(country => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Sector</label>
                <select 
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  value={filters.sector}
                  onChange={(e) => setFilters({...filters, sector: e.target.value})}
                >
                  <option value="all">All Sectors</option>
                  {sectors.map(sector => (
                    <option key={sector} value={sector}>
                      {sector}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  onClick={() => setFilters({type: 'all', country: 'all', sector: 'all'})}
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        {searchTerm && (
          <div className="mb-4">
            <p className="text-muted-foreground">
              {isLoading ? 'Searching...' : `Found ${results.length} results for "${searchTerm}"`}
            </p>
          </div>
        )}

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}

        {!isLoading && results.length > 0 && (
          <div className="space-y-4">
            {results.map((result) => (
              <Card key={result.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={result.type === 'company' ? 'default' : 'secondary'}>
                          {result.type === 'company' ? (
                            <>
                              <Building2 className="mr-1 h-3 w-3" />
                              Company
                            </>
                          ) : (
                            <>
                              <Calendar className="mr-1 h-3 w-3" />
                              News
                            </>
                          )}
                        </Badge>
                        
                        {result.sector && (
                          <Badge variant="outline">{result.sector}</Badge>
                        )}
                        
                        {result.country && (
                          <Badge variant="outline">
                            {getCountryFlag(result.country)} {getCountryName(result.country)}
                          </Badge>
                        )}
                      </div>
                      
                      <CardTitle className="text-lg leading-tight hover:text-blue-600 cursor-pointer">
                        {result.title}
                        {result.ticker && (
                          <span className="text-sm font-normal text-muted-foreground ml-2">
                            ({result.ticker})
                          </span>
                        )}
                      </CardTitle>
                    </div>
                    
                    {result.url && (
                      <ExternalLink className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground" />
                    )}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed mb-3">
                    {result.description}
                  </CardDescription>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {result.source && (
                        <span>Source: {result.source}</span>
                      )}
                      
                      {result.publishedAt && (
                        <span>{formatRelativeTime(result.publishedAt)}</span>
                      )}
                    </div>
                    
                    {result.type === 'company' && result.price && (
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">€{result.price.toFixed(2)}</span>
                        {result.change && (
                          <div className={`flex items-center text-sm ${
                            result.change >= 0 ? "text-green-600" : "text-red-600"
                          }`}>
                            <TrendingUp className="mr-1 h-3 w-3" />
                            {result.change >= 0 ? "+" : ""}{result.change.toFixed(2)}%
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!isLoading && searchTerm && results.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground">
                Try different keywords or adjust your filters.
              </p>
            </CardContent>
          </Card>
        )}

        {!searchTerm && (
          <Card className="text-center py-12">
            <CardContent>
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Start Your Search</h3>
              <p className="text-muted-foreground">
                Enter a company name, ticker symbol, or search term to get started.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
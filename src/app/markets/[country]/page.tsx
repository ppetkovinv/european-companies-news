import { notFound } from "next/navigation"
import { countries } from "@/data/constants"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Building2, ExternalLink } from "lucide-react"

interface PageProps {
  params: {
    country: string
  }
}

// Sample data - in a real app this would come from APIs
const getCountryData = (countryCode: string) => {
  const country = countries.find(c => c.code.toLowerCase() === countryCode.toLowerCase())
  if (!country) return null

  const sampleNews = [
    {
      id: "1",
      title: `${country.name} Manufacturing Sector Shows Resilience`,
      description: `Industrial production in ${country.name} exceeded expectations, showing strong growth despite global challenges.`,
      source: "Reuters",
      publishedAt: "2024-01-15T14:30:00Z",
      company: "Siemens AG",
      sector: "Industrials"
    },
    {
      id: "2", 
      title: `Banking Sector Update: ${country.name} Banks Report Strong Q4`,
      description: `Major banks in ${country.name} report improved lending activity and reduced provisions for bad loans.`,
      source: "Financial Times",
      publishedAt: "2024-01-15T11:45:00Z",
      company: "Deutsche Bank",
      sector: "Banking"
    },
    {
      id: "3",
      title: `Technology Investment Surge in ${country.name}`,
      description: `Venture capital investments in ${country.name} tech startups reach record highs this quarter.`,
      source: "TechCrunch",
      publishedAt: "2024-01-15T09:20:00Z",
      sector: "Technology"
    }
  ]

  const sampleCompanies = [
    {
      id: "1",
      name: "SAP SE",
      ticker: "SAP",
      sector: "Technology", 
      marketCap: 147500000000,
      price: 123.45,
      change: 2.34,
      changePercent: 1.9
    },
    {
      id: "2",
      name: "Siemens AG",
      ticker: "SIE",
      sector: "Industrials",
      marketCap: 125800000000,
      price: 156.78,
      change: -1.23,
      changePercent: -0.78
    },
    {
      id: "3", 
      name: "ASML Holding",
      ticker: "ASML",
      sector: "Technology",
      marketCap: 289400000000,
      price: 712.50,
      change: 15.20,
      changePercent: 2.18
    }
  ]

  return {
    country,
    news: sampleNews,
    companies: sampleCompanies,
    marketIndex: {
      name: country.code === "DE" ? "DAX" : country.code === "FR" ? "CAC 40" : country.code === "IT" ? "FTSE MIB" : country.code === "NL" ? "AEX" : "IBEX 35",
      value: Math.random() * 10000 + 5000,
      change: (Math.random() - 0.5) * 4,
      volume: Math.random() * 1000000000
    }
  }
}

export async function generateStaticParams() {
  return countries.map((country) => ({
    country: country.code.toLowerCase(),
  }))
}

export default function CountryMarketPage({ params }: PageProps) {
  const data = getCountryData(params.country)
  
  if (!data) {
    notFound()
  }

  const { country, news, companies, marketIndex } = data

  const formatMarketCap = (value: number) => {
    if (value >= 1e9) return `€${(value / 1e9).toFixed(1)}B`
    if (value >= 1e6) return `€${(value / 1e6).toFixed(1)}M`
    return `€${value.toLocaleString()}`
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-6xl">{country.flag}</span>
            <div>
              <h1 className="text-4xl font-bold text-foreground">{country.name} Market</h1>
              <p className="text-xl text-muted-foreground">{country.exchange}</p>
            </div>
          </div>
          
          {/* Market Index */}
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {marketIndex.name}
                <Badge variant="outline">{country.currency}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">
                {marketIndex.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </div>
              <div className={`flex items-center text-sm ${
                marketIndex.change >= 0 ? "text-green-600" : "text-red-600"
              }`}>
                {marketIndex.change >= 0 ? (
                  <TrendingUp className="mr-1 h-4 w-4" />
                ) : (
                  <TrendingDown className="mr-1 h-4 w-4" />
                )}
                {marketIndex.change >= 0 ? "+" : ""}{marketIndex.change.toFixed(2)} ({marketIndex.change >= 0 ? "+" : ""}{((marketIndex.change / marketIndex.value) * 100).toFixed(2)}%)
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Volume: {marketIndex.volume.toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Latest News */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Latest News</h2>
                <Button variant="outline">View All</Button>
              </div>
              
              <div className="space-y-4">
                {news.map((article) => (
                  <Card key={article.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary">{article.source}</Badge>
                            {article.sector && (
                              <Badge variant="outline">{article.sector}</Badge>
                            )}
                            <span className="text-sm text-muted-foreground">
                              {new Date(article.publishedAt).toLocaleString()}
                            </span>
                          </div>
                          <CardTitle className="text-lg leading-tight hover:text-blue-600 cursor-pointer">
                            {article.title}
                          </CardTitle>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm leading-relaxed">
                        {article.description}
                      </CardDescription>
                      {article.company && (
                        <div className="mt-3">
                          <Badge variant="outline" className="text-xs">
                            <Building2 className="mr-1 h-3 w-3" />
                            {article.company}
                          </Badge>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Companies */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Top Companies
                </CardTitle>
                <CardDescription>
                  Leading companies by market cap
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {companies.map((company) => (
                  <div key={company.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent cursor-pointer">
                    <div className="flex-1">
                      <div className="font-semibold text-sm">{company.name}</div>
                      <div className="text-xs text-muted-foreground">{company.ticker} • {company.sector}</div>
                      <div className="text-xs text-muted-foreground">{formatMarketCap(company.marketCap)}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">€{company.price.toFixed(2)}</div>
                      <div className={`text-xs ${
                        company.change >= 0 ? "text-green-600" : "text-red-600"
                      }`}>
                        {company.change >= 0 ? "+" : ""}{company.change.toFixed(2)} ({company.changePercent >= 0 ? "+" : ""}{company.changePercent.toFixed(2)}%)
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Market Info */}
            <Card>
              <CardHeader>
                <CardTitle>Market Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Exchange</span>
                  <span className="text-sm font-medium">{country.exchange}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Currency</span>
                  <span className="text-sm font-medium">{country.currency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Trading Hours</span>
                  <span className="text-sm font-medium">9:00 - 17:30 CET</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Listed Companies</span>
                  <span className="text-sm font-medium">450+</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
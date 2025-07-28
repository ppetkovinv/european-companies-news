import Link from "next/link"
import { countries } from "@/data/constants"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Globe, Building2, Search } from "lucide-react"

export default function HomePage() {
  const featuredNews = [
    {
      id: "1",
      title: "European Markets Show Strong Growth in Q4",
      description: "Major European stock indices closed higher as investors showed renewed confidence in the region's economic recovery.",
      source: "Reuters",
      publishedAt: "2024-01-15T10:30:00Z",
      country: "EU"
    },
    {
      id: "2", 
      title: "German Tech Giant Announces Major Acquisition",
      description: "SAP announces acquisition of AI startup for €2.3 billion, marking largest tech deal in Germany this year.",
      source: "Financial Times",
      publishedAt: "2024-01-15T08:15:00Z",
      country: "DE"
    },
    {
      id: "3",
      title: "French Energy Sector Sees Investment Surge", 
      description: "TotalEnergies leads renewable energy investments with new €5 billion solar initiative across Europe.",
      source: "MarketWatch",
      publishedAt: "2024-01-15T06:45:00Z",
      country: "FR"
    }
  ]

  const marketData = [
    { country: "Germany", index: "DAX", value: 16842.5, change: 2.3 },
    { country: "France", index: "CAC 40", value: 7524.1, change: 1.8 },
    { country: "Italy", index: "FTSE MIB", value: 29456.2, change: -0.5 },
    { country: "Netherlands", index: "AEX", value: 812.4, change: 1.2 },
    { country: "Spain", index: "IBEX 35", value: 10234.7, change: 0.8 }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-950 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            European Companies News
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Your comprehensive source for news, analysis, and insights on public European companies across major markets
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/search">
                <Search className="mr-2 h-5 w-5" />
                Explore Companies
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="#markets">
                <Globe className="mr-2 h-5 w-5" />
                View Markets
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured News */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Breaking News</h2>
            <Button variant="outline" asChild>
              <Link href="/news">View All News</Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredNews.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{article.source}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <CardTitle className="text-lg leading-tight">{article.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {article.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Market Overview */}
      <section id="markets" className="bg-muted py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Market Overview</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {marketData.map((market) => (
              <Card key={market.country}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{market.index}</CardTitle>
                  <CardDescription>{market.country}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-1">
                    {market.value.toLocaleString()}
                  </div>
                  <div className={`flex items-center text-sm ${
                    market.change >= 0 ? "text-green-600" : "text-red-600"
                  }`}>
                    <TrendingUp className="mr-1 h-4 w-4" />
                    {market.change >= 0 ? "+" : ""}{market.change}%
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Country Markets */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Explore Markets</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {countries.map((country) => (
              <Link key={country.code} href={`/markets/${country.code.toLowerCase()}`}>
                <Card className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
                  <CardHeader className="text-center">
                    <div className="text-4xl mb-2">{country.flag}</div>
                    <CardTitle className="text-xl">{country.name}</CardTitle>
                    <CardDescription>{country.exchange}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Badge variant="outline">{country.currency}</Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Platform Features</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Company Profiles</h3>
              <p className="text-muted-foreground">
                Comprehensive profiles with financial data, news, and analysis for European public companies
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Data</h3>
              <p className="text-muted-foreground">
                Live market data, stock prices, and financial metrics updated in real-time
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Advanced Search</h3>
              <p className="text-muted-foreground">
                Powerful search and filtering capabilities across companies, sectors, and news
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
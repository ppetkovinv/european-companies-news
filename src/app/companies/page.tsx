"use client"

import React, { useState } from "react"
import { countries, sectors } from "@/data/constants"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, TrendingUp, TrendingDown, Search, Filter } from "lucide-react"

// Sample company data - in production this would come from a database
const sampleCompanies = [
  {
    id: "1",
    name: "SAP SE",
    ticker: "SAP",
    isin: "DE0007164600",
    sector: "Technology",
    country: "DE",
    marketCap: 147500000000,
    price: 123.45,
    change: 2.34,
    changePercent: 1.9,
    description: "German multinational software corporation that makes enterprise software to manage business operations and customer relations.",
    website: "https://www.sap.com"
  },
  {
    id: "2", 
    name: "ASML Holding N.V.",
    ticker: "ASML",
    isin: "NL0010273215",
    sector: "Technology",
    country: "NL",
    marketCap: 289400000000,
    price: 712.50,
    change: 15.20,
    changePercent: 2.18,
    description: "Dutch company and the leading supplier of photolithography systems for the semiconductor industry.",
    website: "https://www.asml.com"
  },
  {
    id: "3",
    name: "LVMH Moët Hennessy Louis Vuitton",
    ticker: "MC",
    isin: "FR0000121014", 
    sector: "Consumer Goods",
    country: "FR",
    marketCap: 325600000000,
    price: 689.20,
    change: -8.30,
    changePercent: -1.19,
    description: "French multinational luxury goods conglomerate headquartered in Paris.",
    website: "https://www.lvmh.com"
  },
  {
    id: "4",
    name: "Siemens AG",
    ticker: "SIE",
    isin: "DE0007236101",
    sector: "Industrials", 
    country: "DE",
    marketCap: 125800000000,
    price: 156.78,
    change: -1.23,
    changePercent: -0.78,
    description: "German multinational conglomerate focused on industry, energy, healthcare and infrastructure.",
    website: "https://www.siemens.com"
  },
  {
    id: "5",
    name: "Unilever PLC",
    ticker: "UNA",
    isin: "GB00B10RZP78",
    sector: "Consumer Goods",
    country: "NL", 
    marketCap: 118900000000,
    price: 44.85,
    change: 0.95,
    changePercent: 2.16,
    description: "British-Dutch transnational consumer goods company with products sold in over 190 countries.",
    website: "https://www.unilever.com"
  },
  {
    id: "6",
    name: "Banco Santander",
    ticker: "SAN",
    isin: "ES0113900J37",
    sector: "Banking",
    country: "ES",
    marketCap: 52400000000,
    price: 3.24,
    change: 0.08,
    changePercent: 2.53,
    description: "Spanish multinational commercial bank and financial services company based in Madrid.",
    website: "https://www.santander.com"
  }
]

export default function CompaniesPage() {
  const [filteredCompanies, setFilteredCompanies] = useState(sampleCompanies)
  const [selectedCountry, setSelectedCountry] = useState<string>("all")
  const [selectedSector, setSelectedSector] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")

  const formatMarketCap = (value: number) => {
    if (value >= 1e9) return `€${(value / 1e9).toFixed(1)}B`
    if (value >= 1e6) return `€${(value / 1e6).toFixed(1)}M` 
    return `€${value.toLocaleString()}`
  }

  const getCountryName = (code: string) => {
    return countries.find(c => c.code === code)?.name || code
  }

  const getCountryFlag = (code: string) => {
    return countries.find(c => c.code === code)?.flag || ""
  }

  const handleFilterChange = React.useCallback(() => {
    let filtered = sampleCompanies

    if (selectedCountry !== "all") {
      filtered = filtered.filter(company => company.country === selectedCountry)
    }

    if (selectedSector !== "all") {
      filtered = filtered.filter(company => company.sector === selectedSector)
    }

    if (searchTerm) {
      filtered = filtered.filter(company => 
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.ticker.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredCompanies(filtered)
  }, [selectedCountry, selectedSector, searchTerm])

  // Apply filters whenever dependencies change
  React.useEffect(() => {
    handleFilterChange()
  }, [handleFilterChange])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <Building2 className="h-12 w-12 text-blue-600" />
            <div>
              <h1 className="text-4xl font-bold text-foreground">European Companies</h1>
              <p className="text-xl text-muted-foreground">Discover and track public companies across major European markets</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              {/* Search */}
              <div>
                <label className="text-sm font-medium mb-2 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Company name or ticker..."
                    className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Country Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Country</label>
                <select 
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                >
                  <option value="all">All Countries</option>
                  {countries.map(country => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sector Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Sector</label>
                <select 
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
                >
                  <option value="all">All Sectors</option>
                  {sectors.map(sector => (
                    <option key={sector} value={sector}>
                      {sector}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSelectedCountry("all")
                    setSelectedSector("all")
                    setSearchTerm("")
                  }}
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            Showing {filteredCompanies.length} companies
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <select className="px-3 py-1 border border-input rounded bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
              <option>Market Cap</option>
              <option>Name</option>
              <option>Performance</option>
            </select>
          </div>
        </div>

        {/* Companies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <Card key={company.id} className="hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg leading-tight">{company.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {company.ticker} • {getCountryFlag(company.country)} {getCountryName(company.country)}
                    </CardDescription>
                  </div>
                  <Badge variant="outline">{company.sector}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Market Cap</span>
                    <span className="font-semibold">{formatMarketCap(company.marketCap)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Price</span>
                    <div className="text-right">
                      <div className="font-semibold">€{company.price.toFixed(2)}</div>
                      <div className={`text-xs flex items-center ${
                        company.change >= 0 ? "text-green-600" : "text-red-600"
                      }`}>
                        {company.change >= 0 ? (
                          <TrendingUp className="mr-1 h-3 w-3" />
                        ) : (
                          <TrendingDown className="mr-1 h-3 w-3" />
                        )}
                        {company.change >= 0 ? "+" : ""}{company.change.toFixed(2)} ({company.changePercent >= 0 ? "+" : ""}{company.changePercent.toFixed(2)}%)
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {company.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-muted-foreground">ISIN: {company.isin}</span>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No companies found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
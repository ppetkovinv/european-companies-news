"use client"

import Link from "next/link"
import { useState } from "react"
import { countries } from "@/data/constants"
import { Button } from "@/components/ui/button"
import { Search, Menu, X } from "lucide-react"

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="border-b bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">EU</span>
              </div>
              <span className="font-bold text-xl">European Companies News</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-blue-600 transition-colors">
              Home
            </Link>
            
            <div className="relative group">
              <button className="text-foreground hover:text-blue-600 transition-colors">
                Markets
              </button>
              <div className="absolute top-full left-0 mt-1 w-48 bg-background border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {countries.map((country) => (
                  <Link
                    key={country.code}
                    href={`/markets/${country.code.toLowerCase()}`}
                    className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    {country.flag} {country.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/companies" className="text-foreground hover:text-blue-600 transition-colors">
              Companies
            </Link>
            
            <Link href="/search" className="text-foreground hover:text-blue-600 transition-colors">
              Search
            </Link>
          </div>

          {/* Search and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <Link 
                href="/" 
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-blue-600 hover:bg-accent"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              
              <div className="px-3 py-2">
                <div className="text-base font-medium text-foreground mb-2">Markets</div>
                {countries.map((country) => (
                  <Link
                    key={country.code}
                    href={`/markets/${country.code.toLowerCase()}`}
                    className="block px-4 py-1 text-sm text-muted-foreground hover:text-blue-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {country.flag} {country.name}
                  </Link>
                ))}
              </div>
              
              <Link 
                href="/companies" 
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-blue-600 hover:bg-accent"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Companies
              </Link>
              
              <Link 
                href="/search" 
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-blue-600 hover:bg-accent"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Search
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
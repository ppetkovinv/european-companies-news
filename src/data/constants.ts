import { Country } from "@/types"

export const countries: Country[] = [
  {
    code: "DE",
    name: "Germany",
    flag: "🇩🇪",
    currency: "EUR",
    exchange: "Deutsche Börse"
  },
  {
    code: "FR",
    name: "France", 
    flag: "🇫🇷",
    currency: "EUR",
    exchange: "Euronext Paris"
  },
  {
    code: "IT",
    name: "Italy",
    flag: "🇮🇹", 
    currency: "EUR",
    exchange: "Borsa Italiana"
  },
  {
    code: "NL",
    name: "Netherlands",
    flag: "🇳🇱",
    currency: "EUR", 
    exchange: "Euronext Amsterdam"
  },
  {
    code: "ES",
    name: "Spain",
    flag: "🇪🇸",
    currency: "EUR",
    exchange: "Bolsa de Madrid"
  }
]

export const sectors = [
  "Technology",
  "Banking", 
  "Energy",
  "Automotive",
  "Healthcare",
  "Consumer Goods",
  "Telecommunications",
  "Industrials",
  "Real Estate",
  "Utilities"
]
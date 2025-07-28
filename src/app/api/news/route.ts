import { NextRequest, NextResponse } from 'next/server'
import { NewsService } from '@/services/NewsService'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const country = searchParams.get('country')
    const sector = searchParams.get('sector') 
    const company = searchParams.get('company')
    const limit = searchParams.get('limit')

    const newsService = NewsService.getInstance()
    
    const news = await newsService.getFilteredNews({
      country: country || undefined,
      sector: sector || undefined,
      company: company || undefined,
      limit: limit ? parseInt(limit) : undefined
    })

    return NextResponse.json({ 
      success: true, 
      data: news,
      count: news.length 
    })
  } catch (error) {
    console.error('Error fetching news:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch news' },
      { status: 500 }
    )
  }
}
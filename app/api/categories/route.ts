import { NextRequest, NextResponse } from 'next/server'
import { getCategories, createCategory } from '@/lib/store'

export async function GET() {
  return NextResponse.json(getCategories())
}

export async function POST(req: NextRequest) {
  const data = await req.json()
  const category = createCategory({
    ...data,
    count: Number(data.count) || 0,
  })
  return NextResponse.json(category, { status: 201 })
}

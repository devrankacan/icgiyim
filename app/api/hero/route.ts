import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getHeroSlides, updateHeroSlides } from '@/lib/store'

export async function GET() {
  return NextResponse.json(getHeroSlides())
}

export async function PUT(req: NextRequest) {
  const slides = await req.json()
  const updated = updateHeroSlides(slides)
  revalidatePath('/', 'layout')
  return NextResponse.json(updated)
}

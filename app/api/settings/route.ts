import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getBanners, updateBanners } from '@/lib/store'

export async function GET() {
  return NextResponse.json({ banners: getBanners() })
}

export async function PUT(req: NextRequest) {
  const data = await req.json()
  const banners = updateBanners(data.banners ?? data)
  revalidatePath('/', 'layout')
  return NextResponse.json({ banners })
}

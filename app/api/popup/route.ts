import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getPopup, updatePopup } from '@/lib/store'

export async function GET() {
  return NextResponse.json(getPopup())
}

export async function PUT(req: NextRequest) {
  const data = await req.json()
  const updated = updatePopup({ ...data, delay: Number(data.delay) ?? 1 })
  revalidatePath('/', 'layout')
  return NextResponse.json(updated)
}

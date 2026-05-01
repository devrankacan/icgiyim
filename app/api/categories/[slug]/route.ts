import { NextRequest, NextResponse } from 'next/server'
import { getCategoryBySlug, updateCategory, deleteCategory } from '@/lib/store'

export async function GET(_: NextRequest, { params }: { params: { slug: string } }) {
  const category = getCategoryBySlug(params.slug)
  if (!category) return NextResponse.json({ error: 'Bulunamadı' }, { status: 404 })
  return NextResponse.json(category)
}

export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
  const data = await req.json()
  const updated = updateCategory(params.slug, { ...data, count: Number(data.count) || 0 })
  if (!updated) return NextResponse.json({ error: 'Bulunamadı' }, { status: 404 })
  return NextResponse.json(updated)
}

export async function DELETE(_: NextRequest, { params }: { params: { slug: string } }) {
  const ok = deleteCategory(params.slug)
  if (!ok) return NextResponse.json({ error: 'Bulunamadı' }, { status: 404 })
  return NextResponse.json({ success: true })
}

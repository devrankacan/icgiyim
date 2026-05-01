import { NextRequest, NextResponse } from 'next/server'
import { getProductById, updateProduct, deleteProduct } from '@/lib/store'

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const product = getProductById(params.id)
  if (!product) return NextResponse.json({ error: 'Bulunamadı' }, { status: 404 })
  return NextResponse.json(product)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const data = await req.json()

  const updates: Record<string, unknown> = { ...data }

  if (data.details !== undefined)
    updates.details = Array.isArray(data.details) ? data.details : data.details.split('\n').filter(Boolean)

  if (data.sizes !== undefined)
    updates.sizes = Array.isArray(data.sizes) ? data.sizes : data.sizes.split(',').map((s: string) => s.trim()).filter(Boolean)

  if (data.colors !== undefined)
    updates.colors = Array.isArray(data.colors) ? data.colors : data.colors.split(',').map((s: string) => s.trim()).filter(Boolean)

  if (data.price !== undefined)
    updates.price = Number(data.price)

  if (data.originalPrice !== undefined)
    updates.originalPrice = data.originalPrice ? Number(data.originalPrice) : undefined

  const updated = updateProduct(params.id, updates)
  if (!updated) return NextResponse.json({ error: 'Bulunamadı' }, { status: 404 })
  return NextResponse.json(updated)
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const ok = deleteProduct(params.id)
  if (!ok) return NextResponse.json({ error: 'Bulunamadı' }, { status: 404 })
  return NextResponse.json({ success: true })
}

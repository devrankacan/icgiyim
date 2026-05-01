import { NextRequest, NextResponse } from 'next/server'
import { getProductById, updateProduct, deleteProduct } from '@/lib/store'

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const product = getProductById(params.id)
  if (!product) return NextResponse.json({ error: 'Bulunamadı' }, { status: 404 })
  return NextResponse.json(product)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const data = await req.json()
  const updated = updateProduct(params.id, {
    ...data,
    details: Array.isArray(data.details) ? data.details : data.details.split('\n').filter(Boolean),
    sizes: Array.isArray(data.sizes) ? data.sizes : data.sizes.split(',').map((s: string) => s.trim()).filter(Boolean),
    colors: Array.isArray(data.colors) ? data.colors : data.colors.split(',').map((s: string) => s.trim()).filter(Boolean),
    price: Number(data.price),
    originalPrice: data.originalPrice ? Number(data.originalPrice) : undefined,
  })
  if (!updated) return NextResponse.json({ error: 'Bulunamadı' }, { status: 404 })
  return NextResponse.json(updated)
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const ok = deleteProduct(params.id)
  if (!ok) return NextResponse.json({ error: 'Bulunamadı' }, { status: 404 })
  return NextResponse.json({ success: true })
}

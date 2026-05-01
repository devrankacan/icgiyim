import { NextRequest, NextResponse } from 'next/server'
import { getProducts, createProduct } from '@/lib/store'

export async function GET() {
  return NextResponse.json(getProducts())
}

export async function POST(req: NextRequest) {
  const data = await req.json()
  const product = createProduct({
    ...data,
    details: Array.isArray(data.details) ? data.details : data.details.split('\n').filter(Boolean),
    sizes: Array.isArray(data.sizes) ? data.sizes : data.sizes.split(',').map((s: string) => s.trim()).filter(Boolean),
    colors: Array.isArray(data.colors) ? data.colors : data.colors.split(',').map((s: string) => s.trim()).filter(Boolean),
    price: Number(data.price),
    originalPrice: data.originalPrice ? Number(data.originalPrice) : undefined,
  })
  return NextResponse.json(product, { status: 201 })
}

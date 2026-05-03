import { notFound } from 'next/navigation'
import { headers } from 'next/headers'
import { getProductById, getProducts } from '@/lib/data'
import ProductDetail from './ProductDetail'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = getProductById(params.id)
  if (!product) return {}
  return {
    title: `${product.name} | Aura Homewears`,
    description: product.description,
  }
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  headers()
  const product = getProductById(params.id)
  if (!product) notFound()

  const products = getProducts()
  const related = products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4)

  return <ProductDetail product={product} related={related} />
}

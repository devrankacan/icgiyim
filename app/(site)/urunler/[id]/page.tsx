import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Heart, Share2, Shield, Truck, RotateCcw } from 'lucide-react'
import { headers } from 'next/headers'
import { getProductById, getProducts } from '@/lib/data'
import ProductCard from '@/components/ProductCard'

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

  return (
    <div className="pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <nav className="flex items-center gap-2 text-xs text-muted">
          <Link href="/" className="hover:text-accent transition-colors duration-200">Ana Sayfa</Link>
          <ChevronRight size={12} />
          <Link href="/urunler" className="hover:text-accent transition-colors duration-200">Ürünler</Link>
          <ChevronRight size={12} />
          <Link href={`/kategoriler/${product.categorySlug}`} className="hover:text-accent transition-colors duration-200">{product.category}</Link>
          <ChevronRight size={12} />
          <span className="text-primary-color">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="space-y-4">
            <div className="aspect-[3/4] w-full overflow-hidden">
              {product.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className={`w-full h-full ${product.gradient}`} />
              )}
            </div>
            {product.images && product.images.length > 0 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.slice(0, 4).map((img, i) => (
                  <div key={i} className={`aspect-square overflow-hidden cursor-pointer ${i !== 0 ? 'opacity-60 hover:opacity-100 transition-opacity duration-200' : ''}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="text-xs text-accent tracking-[0.3em] uppercase mb-3">{product.category}</p>
            <h1 className="font-serif text-4xl md:text-5xl font-medium text-primary-color mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-medium text-primary-color">{product.price.toLocaleString('tr-TR')}₺</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted line-through">{product.originalPrice.toLocaleString('tr-TR')}₺</span>
                  <span className="text-xs text-white bg-accent px-2 py-1">
                    %{Math.round((1 - product.price / product.originalPrice) * 100)} İndirim
                  </span>
                </>
              )}
            </div>

            <div className="w-full h-px bg-[var(--border)] mb-6" />
            <p className="text-sm text-secondary leading-relaxed mb-8">{product.description}</p>

            <div className="mb-6">
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-primary-color mb-3">
                Renk: <span className="text-accent">{product.colors[0]}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button key={color} className="px-4 py-2 text-xs border border-[var(--border)] text-secondary hover:border-accent hover:text-accent transition-all duration-200">
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-primary-color">Beden</p>
                <Link href="/beden-rehberi" className="text-xs text-accent underline underline-offset-2">Beden Rehberi</Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button key={size} className="px-4 py-2 text-xs border border-[var(--border)] text-secondary hover:border-accent hover:text-accent transition-all duration-200">
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 mb-8">
              <button className="btn-primary flex-1">Sepete Ekle</button>
              <button className="w-12 h-12 border border-[var(--border)] flex items-center justify-center hover:border-accent transition-colors duration-200" aria-label="Favorilere Ekle">
                <Heart size={18} className="text-secondary" />
              </button>
              <button className="w-12 h-12 border border-[var(--border)] flex items-center justify-center hover:border-accent transition-colors duration-200" aria-label="Paylaş">
                <Share2 size={18} className="text-secondary" />
              </button>
            </div>

            <div className="space-y-3 border border-[var(--border)] p-5">
              {[
                { icon: Truck, text: '500₺ üzeri siparişlerde ücretsiz kargo' },
                { icon: RotateCcw, text: '14 gün koşulsuz iade garantisi' },
                { icon: Shield, text: 'Güvenli ve gizli paketleme' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <item.icon size={16} className="text-accent shrink-0" />
                  <span className="text-xs text-secondary">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-xs font-medium tracking-[0.2em] uppercase text-primary-color mb-4">Ürün Detayları</h3>
              <ul className="space-y-2">
                {product.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-2 text-sm text-secondary">
                    <span className="text-accent mt-1.5">–</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-24">
            <div className="text-center mb-12">
              <p className="text-xs text-accent tracking-[0.4em] uppercase mb-3">Bunlar da İlginizi Çekebilir</p>
              <h2 className="section-title">İlgili Ürünler</h2>
              <div className="divider" />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

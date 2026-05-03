import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { getCategoryBySlug, getProductsByCategory, getCategories } from '@/lib/data'
import ProductCard from '@/components/ProductCard'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const category = getCategoryBySlug(params.slug)
  if (!category) return {}
  return {
    title: `${category.name} | Aura Homewears`,
    description: category.description,
  }
}

export default function KategoriPage({ params }: { params: { slug: string } }) {
  const category = getCategoryBySlug(params.slug)
  if (!category) notFound()

  const categories = getCategories()
  const categoryProducts = getProductsByCategory(params.slug)

  return (
    <div className="pt-28 pb-24">
      <div className={`relative ${category.image ? '' : category.gradient} py-28 mb-12`}>
        {category.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={category.image} alt={category.name} className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <nav className="flex items-center justify-center gap-2 text-xs text-gray-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors duration-200">Ana Sayfa</Link>
            <ChevronRight size={12} />
            <Link href="/urunler" className="hover:text-white transition-colors duration-200">Ürünler</Link>
            <ChevronRight size={12} />
            <span className="text-white">{category.name}</span>
          </nav>
          <h1 className="font-serif text-5xl md:text-6xl font-medium text-white mb-4">{category.name}</h1>
          <p className="text-gray-300 text-sm">{category.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {categoryProducts.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm text-muted">{categoryProducts.length} ürün</p>
              <select className="text-sm text-secondary bg-transparent border border-[var(--border)] px-4 py-2 focus:outline-none focus:border-accent">
                <option>Önerilen</option>
                <option>Fiyat: Artan</option>
                <option>Fiyat: Azalan</option>
              </select>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-24">
            <h2 className="font-serif text-2xl text-primary-color mb-4">Bu kategoride ürün bulunamadı</h2>
            <p className="text-secondary text-sm mb-8">Diğer kategorileri keşfedin.</p>
            <Link href="/urunler" className="btn-primary">Tüm Ürünler</Link>
          </div>
        )}

        <div className="mt-20">
          <div className="text-center mb-10">
            <p className="text-xs text-accent tracking-[0.4em] uppercase mb-3">Diğer Koleksiyonlar</p>
            <h2 className="section-title">Kategoriler</h2>
            <div className="divider" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories
              .filter((c) => c.slug !== params.slug)
              .map((cat) => (
                <Link key={cat.slug} href={`/kategoriler/${cat.slug}`} className="group relative overflow-hidden h-32">
                  {cat.image
                    // eslint-disable-next-line @next/next/no-img-element
                    ? <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    : <div className={`${cat.gradient} w-full h-full transition-transform duration-500 group-hover:scale-105`} />
                  }
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="font-serif text-white text-sm font-medium">{cat.name}</span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

import ProductCard from '@/components/ProductCard'
import { products, categories } from '@/lib/data'
import Link from 'next/link'

export const metadata = {
  title: 'Tüm Ürünler | Aura Homewears',
  description: 'Premium fantezi iç giyim koleksiyonumuzu keşfedin.',
}

export default function UrunlerPage() {
  return (
    <div className="pt-32 pb-24">
      {/* Header */}
      <div className="bg-[var(--bg-subtle)] border-b border-[var(--border)] py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs text-accent tracking-[0.4em] uppercase mb-3">Koleksiyon</p>
          <h1 className="section-title mb-3">Tüm Ürünler</h1>
          <div className="divider" />
          <p className="text-sm text-secondary mt-4">{products.length} ürün listeleniyor</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar */}
          <aside className="w-full lg:w-56 shrink-0">
            <div className="sticky top-28">
              <h3 className="text-xs font-medium tracking-[0.3em] uppercase text-primary-color mb-4">Kategoriler</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/urunler"
                    className="text-sm text-accent font-medium flex items-center justify-between"
                  >
                    Tümü
                    <span className="text-xs text-muted">{products.length}</span>
                  </Link>
                </li>
                {categories.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/kategoriler/${cat.slug}`}
                      className="text-sm text-secondary hover:text-accent transition-colors duration-200 flex items-center justify-between"
                    >
                      {cat.name}
                      <span className="text-xs text-muted">{cat.count}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <h3 className="text-xs font-medium tracking-[0.3em] uppercase text-primary-color mb-4">Filtrele</h3>
                <div className="space-y-3">
                  {['Yeni Gelenler', 'Çok Satanlar', 'İndirimli'].map((f) => (
                    <label key={f} className="flex items-center gap-2 cursor-pointer group">
                      <span className="w-4 h-4 border border-[var(--border)] group-hover:border-accent transition-colors duration-200 flex items-center justify-center shrink-0" />
                      <span className="text-sm text-secondary group-hover:text-accent transition-colors duration-200">{f}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-xs font-medium tracking-[0.3em] uppercase text-primary-color mb-4">Beden</h3>
                <div className="flex flex-wrap gap-2">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <button
                      key={size}
                      className="px-3 py-1.5 text-xs border border-[var(--border)] text-secondary hover:border-accent hover:text-accent transition-all duration-200"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-xs font-medium tracking-[0.3em] uppercase text-primary-color mb-4">Fiyat Aralığı</h3>
                <div className="space-y-2">
                  {[
                    '0₺ – 300₺',
                    '300₺ – 600₺',
                    '600₺ – 900₺',
                    '900₺+',
                  ].map((range) => (
                    <label key={range} className="flex items-center gap-2 cursor-pointer group">
                      <span className="w-4 h-4 border border-[var(--border)] group-hover:border-accent transition-colors duration-200 flex items-center justify-center shrink-0" />
                      <span className="text-sm text-secondary group-hover:text-accent transition-colors duration-200">{range}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort Bar */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--border)]">
              <p className="text-sm text-muted">{products.length} ürün</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted">Sırala:</span>
                <select className="text-sm text-secondary bg-transparent border-none focus:outline-none cursor-pointer">
                  <option>Önerilen</option>
                  <option>Fiyat: Artan</option>
                  <option>Fiyat: Azalan</option>
                  <option>Yeni Gelenler</option>
                  <option>En Çok Satan</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

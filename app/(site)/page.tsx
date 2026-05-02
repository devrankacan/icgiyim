import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Star, Shield, Truck, RotateCcw } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import { getProducts, getCategories } from '@/lib/data'

export const dynamic = 'force-dynamic'

export default function HomePage() {
  const products = getProducts()
  const categories = getCategories()
  const featuredProducts = products.filter((p) => p.isBestseller || p.isNew).slice(0, 4)
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4)

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0 category-gradient-1" />
        <div className="absolute inset-0 hero-overlay" />

        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)' }}
        />
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #C9967A 0%, transparent 70%)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-40 md:pt-48">
          <div className="max-w-2xl">
            <p className="text-xs text-accent tracking-[0.4em] uppercase font-sans mb-6 animate-fade-in">
              Yeni Koleksiyon — İlkbahar 2024
            </p>
            <h1 className="font-serif text-5xl md:text-7xl font-medium text-white leading-[1.1] mb-6 animate-slide-up">
              Kendinizi<br />
              <em>Özel</em> Hissedin
            </h1>
            <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-10 max-w-lg animate-slide-up font-sans">
              Her kadının hak ettiği zarafet ve özgüven. Premium fantezi iç giyim koleksiyonumuzla tanışın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
              <Link href="/urunler" className="btn-primary">
                Koleksiyonu Keşfet
              </Link>
              <Link href="/kategoriler/setler" className="btn-outline" style={{ borderColor: 'rgba(255,255,255,0.4)', color: 'white' }}>
                Setleri Gör
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in">
          <span className="text-[10px] text-gray-400 tracking-[0.3em] uppercase">Kaydır</span>
          <div className="w-px h-10 bg-gradient-to-b from-gray-400 to-transparent" />
        </div>
      </section>

      {/* Features Strip */}
      <section className="bg-[var(--bg-subtle)] border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: Truck, title: 'Ücretsiz Kargo', desc: '500₺ üzeri siparişlerde' },
              { icon: Shield, title: 'Güvenli Ödeme', desc: '256-bit SSL şifreleme' },
              { icon: RotateCcw, title: 'Kolay İade', desc: '14 gün iade garantisi' },
              { icon: Star, title: 'Premium Kalite', desc: 'Seçkin kumaş ve işçilik' },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center shrink-0">
                  <item.icon size={20} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-primary-color">{item.title}</p>
                  <p className="text-xs text-muted">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs text-accent tracking-[0.4em] uppercase mb-3">Koleksiyonlar</p>
            <h2 className="section-title">Kategoriler</h2>
            <div className="divider" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {categories.map((cat, i) => (
              <Link
                key={cat.slug}
                href={`/kategoriler/${cat.slug}`}
                className={`group relative overflow-hidden ${i === 0 ? 'md:row-span-2' : ''}`}
              >
                {cat.image ? (
                  <div className={`relative overflow-hidden transition-transform duration-700 group-hover:scale-105 ${i === 0 ? 'h-64 md:h-full min-h-[300px]' : 'h-48 md:h-56'}`}>
                    <Image src={cat.image} alt={cat.name} fill unoptimized className="object-cover" />
                  </div>
                ) : (
                  <div className={`${cat.gradient} transition-transform duration-700 group-hover:scale-105 ${i === 0 ? 'h-64 md:h-full min-h-[300px]' : 'h-48 md:h-56'}`} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-serif text-white text-xl font-medium mb-1">{cat.name}</h3>
                  <p className="text-gray-300 text-xs mb-3 hidden md:block">{cat.description}</p>
                  <span className="text-[10px] text-accent tracking-widest uppercase flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                    Keşfet <ArrowRight size={10} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 md:py-28 bg-[var(--bg-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-xs text-accent tracking-[0.4em] uppercase mb-3">Öne Çıkanlar</p>
              <h2 className="section-title">Çok Satanlar</h2>
              <div className="divider mx-0" />
            </div>
            <Link href="/urunler" className="hidden md:flex items-center gap-2 text-sm nav-link">
              Tümünü Gör <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-10 md:hidden">
            <Link href="/urunler" className="btn-outline">
              Tümünü Gör
            </Link>
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 category-gradient-4" />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs text-accent tracking-[0.4em] uppercase mb-4">Sınırlı Stok</p>
          <h2 className="font-serif text-4xl md:text-6xl font-medium text-white mb-6">
            Yeni Sezon<br /><em>Kostüm Koleksiyonu</em>
          </h2>
          <p className="text-gray-300 mb-10 max-w-lg mx-auto">
            Hayal gücünüzün sınırlarını zorluyor. En cesur fanteziler için tasarlanmış özel kostüm serimizi keşfedin.
          </p>
          <Link href="/kategoriler/kostumler" className="btn-primary">
            Koleksiyonu İncele
          </Link>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs text-accent tracking-[0.4em] uppercase mb-3">Taze Gelenler</p>
            <h2 className="section-title">Yeni Ürünler</h2>
            <div className="divider" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[var(--bg-subtle)] border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs text-accent tracking-[0.4em] uppercase mb-3">Müşteri Yorumları</p>
            <h2 className="section-title">Neler Söylüyorlar</h2>
            <div className="divider" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Ayşe K.', text: 'Rouge Dantel Set inanılmaz kaliteli. Kumaş çok yumuşak, ürün fotoğraftaki gibi geldi. Kesinlikle tavsiye ederim.', stars: 5 },
              { name: 'Melisa T.', text: 'Velours Gecelik\'i hediye aldım, çok beğendim. Paketleme de son derece özenli ve şık. Tekrar alacağım.', stars: 5 },
              { name: 'Selin A.', text: 'Aura\'nın kalitesi gerçekten premium. Fiyatlar biraz yüksek ama değiyor. Kargo da çok hızlıydı.', stars: 5 },
            ].map((review) => (
              <div key={review.name} className="card p-6 md:p-8">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.stars }).map((_, i) => (
                    <Star key={i} size={14} className="fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm text-secondary leading-relaxed mb-6 italic">"{review.text}"</p>
                <p className="text-xs font-medium tracking-widest uppercase text-primary-color">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs text-accent tracking-[0.4em] uppercase mb-3">Aura Club</p>
          <h2 className="section-title mb-4">Fırsatları Kaçırma</h2>
          <p className="text-secondary mb-10 max-w-md mx-auto text-sm">
            Yeni koleksiyonlar, özel indirimler ve gizli kampanyalardan ilk siz haberdar olun.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="E-posta adresiniz"
              className="flex-1 px-5 py-3 text-sm bg-[var(--bg-card)] border border-[var(--border)] text-primary-color placeholder:text-muted focus:outline-none focus:border-accent transition-colors duration-200"
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Abone Ol
            </button>
          </form>
          <p className="text-xs text-muted mt-4">Spam göndermeyiz. İstediğiniz zaman aboneliği iptal edebilirsiniz.</p>
        </div>
      </section>
    </>
  )
}

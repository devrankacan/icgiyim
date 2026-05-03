'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ChevronRight, ChevronLeft, Heart, Share2, Shield, Truck, RotateCcw, X, ZoomIn } from 'lucide-react'
import { Product, Variant } from '@/lib/data'

export default function ProductDetail({ product, related }: { product: Product; related: Product[] }) {
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightbox, setLightbox] = useState<number | null>(null)

  const variantImage = selectedVariant?.image
  const baseImages = [
    ...(product.image ? [product.image] : []),
    ...(product.images ?? []),
  ]
  const allImages = variantImage
    ? [variantImage, ...baseImages.filter((img) => img !== variantImage)]
    : baseImages

  const displayImage = allImages[activeIndex] ?? null
  const displayPrice = selectedVariant?.price ?? product.price
  const displayFeatures = selectedVariant?.features?.length ? selectedVariant.features : product.details

  function selectVariant(v: Variant) {
    const same = selectedVariant?.id === v.id
    setSelectedVariant(same ? null : v)
    setActiveIndex(0)
  }

  const lightboxPrev = useCallback(() => setLightbox((i) => (i !== null ? (i - 1 + allImages.length) % allImages.length : null)), [allImages.length])
  const lightboxNext = useCallback(() => setLightbox((i) => (i !== null ? (i + 1) % allImages.length : null)), [allImages.length])

  useEffect(() => {
    if (lightbox === null) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowLeft') lightboxPrev()
      if (e.key === 'ArrowRight') lightboxNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, lightboxPrev, lightboxNext])

  return (
    <div className="pt-28 pb-24">
      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
            onClick={() => setLightbox(null)}
            aria-label="Kapat"
          >
            <X size={28} />
          </button>

          {allImages.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 flex items-center justify-center rounded-full transition-colors"
                onClick={(e) => { e.stopPropagation(); lightboxPrev() }}
                aria-label="Önceki"
              >
                <ChevronLeft size={22} className="text-white" />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 flex items-center justify-center rounded-full transition-colors"
                onClick={(e) => { e.stopPropagation(); lightboxNext() }}
                aria-label="Sonraki"
              >
                <ChevronRight size={22} className="text-white" />
              </button>
            </>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={allImages[lightbox]}
            alt={`${product.name} ${lightbox + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {allImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {allImages.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setLightbox(i) }}
                  className={`w-2 h-2 rounded-full transition-colors ${i === lightbox ? 'bg-white' : 'bg-white/40'}`}
                />
              ))}
            </div>
          )}
        </div>
      )}

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
          {/* Images */}
          <div className="space-y-4">
            <div
              className="relative aspect-[3/4] w-full overflow-hidden cursor-zoom-in group"
              onClick={() => allImages.length > 0 && setLightbox(activeIndex)}
            >
              {displayImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={displayImage} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className={`w-full h-full ${product.gradient}`} />
              )}
              {allImages.length > 0 && (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 flex items-center justify-center">
                  <ZoomIn size={32} className="text-white opacity-0 group-hover:opacity-80 transition-opacity duration-200" />
                </div>
              )}
            </div>

            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {allImages.slice(0, 8).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`aspect-square overflow-hidden transition-all duration-200 ${
                      i === activeIndex
                        ? 'ring-2 ring-accent opacity-100'
                        : 'opacity-50 hover:opacity-100'
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <p className="text-xs text-accent tracking-[0.3em] uppercase mb-3">{product.category}</p>
            <h1 className="font-serif text-4xl md:text-5xl font-medium text-primary-color mb-4">{product.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-medium text-primary-color">{displayPrice.toLocaleString('tr-TR')}₺</span>
              {product.originalPrice && !selectedVariant?.price && (
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

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-6">
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-primary-color mb-3">
                  Varyant: <span className="text-accent">{selectedVariant ? selectedVariant.name : 'Seçiniz'}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => selectVariant(v)}
                      className={`px-4 py-2 text-xs border transition-all duration-200 ${
                        selectedVariant?.id === v.id
                          ? 'border-accent text-accent bg-accent/10'
                          : 'border-[var(--border)] text-secondary hover:border-accent hover:text-accent'
                      }`}
                    >
                      {v.name}
                      {v.price && v.price !== product.price && (
                        <span className="ml-1.5 opacity-70">{v.price.toLocaleString('tr-TR')}₺</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
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

            {/* Sizes */}
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

            {/* Features */}
            <div className="mt-8">
              <h3 className="text-xs font-medium tracking-[0.2em] uppercase text-primary-color mb-4">
                {selectedVariant?.features?.length ? `${selectedVariant.name} Özellikleri` : 'Ürün Detayları'}
              </h3>
              <ul className="space-y-2">
                {displayFeatures.map((detail, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-secondary">
                    <span className="text-accent mt-1.5">–</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-24">
            <div className="text-center mb-12">
              <p className="text-xs text-accent tracking-[0.4em] uppercase mb-3">Bunlar da İlginizi Çekebilir</p>
              <h2 className="section-title">İlgili Ürünler</h2>
              <div className="divider" />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {related.map((p) => (
                <RelatedCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function RelatedCard({ product }: { product: Product }) {
  return (
    <Link href={`/urunler/${product.id}`} className="group card overflow-hidden">
      <div className="aspect-[3/4] overflow-hidden">
        {product.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <div className={`w-full h-full ${product.gradient} transition-transform duration-700 group-hover:scale-105`} />
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-muted tracking-widest uppercase mb-1">{product.category}</p>
        <h3 className="font-serif text-base font-medium text-primary-color group-hover:text-accent transition-colors duration-200 mb-2">{product.name}</h3>
        <span className="font-medium text-primary-color">{product.price.toLocaleString('tr-TR')}₺</span>
      </div>
    </Link>
  )
}

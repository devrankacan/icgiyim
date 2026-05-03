'use client'

import Link from 'next/link'
import { Heart } from 'lucide-react'
import { useFavorites } from '@/lib/favoritesStore'
import { useEffect, useState } from 'react'
import ProductCard from '@/components/ProductCard'
import { Product } from '@/lib/data'

export default function FavorilerPage() {
  const { ids } = useFavorites()
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    if (ids.length === 0) { setProducts([]); return }
    fetch('/api/products')
      .then((r) => r.json())
      .then((all: Product[]) => setProducts(all.filter((p) => ids.includes(p.id))))
  }, [ids])

  if (ids.length === 0) {
    return (
      <div className="pt-32 pb-24 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <Heart size={48} className="text-muted mb-6" />
        <h1 className="font-serif text-3xl text-primary-color mb-3">Favori Listeniz Boş</h1>
        <p className="text-secondary text-sm mb-8">Beğendiğiniz ürünleri kalp ikonuna tıklayarak kaydedin.</p>
        <Link href="/urunler" className="btn-primary">Ürünleri Keşfet</Link>
      </div>
    )
  }

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs text-accent tracking-[0.4em] uppercase mb-3">Kaydedilenler</p>
          <h1 className="section-title">Favorilerim</h1>
          <div className="divider" />
          <p className="text-sm text-secondary mt-2">{products.length} ürün</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

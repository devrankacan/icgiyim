'use client'

import Link from 'next/link'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '@/lib/cartStore'

export default function SepetPage() {
  const { items, remove, updateQty, total, clear } = useCart()

  const shipping = total >= 500 ? 0 : 49
  const grandTotal = total + shipping

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-24 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <ShoppingBag size={48} className="text-muted mb-6" />
        <h1 className="font-serif text-3xl text-primary-color mb-3">Sepetiniz Boş</h1>
        <p className="text-secondary text-sm mb-8">Beğendiğiniz ürünleri sepete ekleyin.</p>
        <Link href="/urunler" className="btn-primary">Alışverişe Başla</Link>
      </div>
    )
  }

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <h1 className="font-serif text-4xl text-primary-color">Sepetim</h1>
          <button onClick={clear} className="text-xs text-muted hover:text-accent transition-colors">Sepeti Temizle</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="card p-4 flex gap-4">
                <div className="w-20 h-24 shrink-0 overflow-hidden">
                  {item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className={`w-full h-full ${item.gradient}`} />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted tracking-widest uppercase mb-1">{item.category}</p>
                  <h3 className="font-serif text-base font-medium text-primary-color mb-1 truncate">{item.name}</h3>
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-secondary mb-3">
                    {item.variantName && <span>{item.variantName}</span>}
                    {item.size && <span>Beden: {item.size}</span>}
                    {item.color && <span>Renk: {item.color}</span>}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 border border-[var(--border)]">
                      <button
                        onClick={() => updateQty(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-[var(--bg-subtle)] transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-6 text-center text-sm text-primary-color">{item.quantity}</span>
                      <button
                        onClick={() => updateQty(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-[var(--bg-subtle)] transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-medium text-primary-color">
                        {(item.price * item.quantity).toLocaleString('tr-TR')}₺
                      </span>
                      <button
                        onClick={() => remove(item.id)}
                        className="text-muted hover:text-accent transition-colors"
                        aria-label="Ürünü kaldır"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-28">
              <h2 className="font-serif text-xl text-primary-color mb-6">Sipariş Özeti</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm text-secondary">
                  <span>Ara Toplam</span>
                  <span>{total.toLocaleString('tr-TR')}₺</span>
                </div>
                <div className="flex justify-between text-sm text-secondary">
                  <span>Kargo</span>
                  <span>{shipping === 0 ? <span className="text-accent">Ücretsiz</span> : `${shipping}₺`}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-muted">
                    {(500 - total).toLocaleString('tr-TR')}₺ daha ekleyin, kargo ücretsiz olsun!
                  </p>
                )}
                <div className="w-full h-px bg-[var(--border)]" />
                <div className="flex justify-between font-medium text-primary-color">
                  <span>Toplam</span>
                  <span>{grandTotal.toLocaleString('tr-TR')}₺</span>
                </div>
              </div>

              <button className="btn-primary w-full flex items-center justify-center gap-2">
                Ödemeye Geç <ArrowRight size={16} />
              </button>

              <Link href="/urunler" className="block text-center text-xs text-muted hover:text-accent transition-colors mt-4">
                Alışverişe Devam Et
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

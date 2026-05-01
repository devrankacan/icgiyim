'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import ImageUpload from '../ImageUpload'
import GalleryUpload from '../GalleryUpload'

const GRADIENTS = [
  'product-gradient-1', 'product-gradient-2', 'product-gradient-3', 'product-gradient-4',
  'product-gradient-5', 'product-gradient-6', 'product-gradient-7', 'product-gradient-8',
]

const CATEGORY_OPTIONS = [
  { name: 'Setler', slug: 'setler' },
  { name: 'Gecelikler', slug: 'gecelikler' },
  { name: 'Babydoll', slug: 'babydoll' },
  { name: 'Kostümler', slug: 'kostumler' },
  { name: 'Korse & Bustier', slug: 'korse' },
  { name: 'Jartiyer & Çoraplar', slug: 'jartiyer' },
]

export default function YeniUrunPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    name: '',
    price: '',
    originalPrice: '',
    category: 'Setler',
    categorySlug: 'setler',
    description: '',
    details: '',
    sizes: '',
    colors: '',
    gradient: 'product-gradient-1',
    image: '',
    images: [] as string[],
    badge: '',
    isNew: false,
    isBestseller: false,
  })

  function handleCategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const cat = CATEGORY_OPTIONS.find((c) => c.slug === e.target.value)
    if (cat) setForm((f) => ({ ...f, category: cat.name, categorySlug: cat.slug }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const id = Date.now().toString()
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, id }),
    })

    if (res.ok) {
      router.push('/admin/urunler')
      router.refresh()
    } else {
      setError('Ürün eklenemedi.')
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/urunler" className="text-gray-400 hover:text-white transition-colors">
          <ChevronLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-white">Yeni Ürün</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 space-y-5">
          <h2 className="text-white font-semibold">Temel Bilgiler</h2>

          <Field label="Ürün Adı">
            <input
              type="text" required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className={inputCls}
              placeholder="Örn: Rouge Dantel Set"
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Fiyat (₺)">
              <input
                type="number" required min="0"
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                className={inputCls}
                placeholder="649"
              />
            </Field>
            <Field label="Orijinal Fiyat (₺) — İndirim için">
              <input
                type="number" min="0"
                value={form.originalPrice}
                onChange={(e) => setForm((f) => ({ ...f, originalPrice: e.target.value }))}
                className={inputCls}
                placeholder="899"
              />
            </Field>
          </div>

          <Field label="Kategori">
            <select
              value={form.categorySlug}
              onChange={handleCategoryChange}
              className={inputCls}
            >
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </Field>

          <Field label="Açıklama">
            <textarea
              required rows={3}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className={inputCls}
              placeholder="Ürün açıklaması..."
            />
          </Field>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 space-y-5">
          <h2 className="text-white font-semibold">Detaylar</h2>

          <Field label="Ürün Detayları (her satır bir madde)">
            <textarea
              required rows={4}
              value={form.details}
              onChange={(e) => setForm((f) => ({ ...f, details: e.target.value }))}
              className={inputCls}
              placeholder="%80 Naylon, %20 Elastan&#10;El yıkama önerilir&#10;Fransız dantel işçiliği"
            />
          </Field>

          <Field label="Bedenler (virgülle ayırın)">
            <input
              type="text" required
              value={form.sizes}
              onChange={(e) => setForm((f) => ({ ...f, sizes: e.target.value }))}
              className={inputCls}
              placeholder="XS, S, M, L, XL"
            />
          </Field>

          <Field label="Renkler (virgülle ayırın)">
            <input
              type="text" required
              value={form.colors}
              onChange={(e) => setForm((f) => ({ ...f, colors: e.target.value }))}
              className={inputCls}
              placeholder="Kırmızı, Siyah, Bordo"
            />
          </Field>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 space-y-5">
          <h2 className="text-white font-semibold">Görünüm & Etiketler</h2>

          <Field label="Ana Görsel">
            <ImageUpload value={form.image} onChange={(url) => setForm((f) => ({ ...f, image: url }))} />
          </Field>

          <Field label="Galeri Görselleri (çoklu)">
            <GalleryUpload value={form.images} onChange={(urls) => setForm((f) => ({ ...f, images: urls }))} />
          </Field>

          <Field label="Gradient Renk (görsel yoksa kullanılır)">
            <div className="flex gap-2 flex-wrap">
              {GRADIENTS.map((g) => (
                <button
                  key={g} type="button"
                  onClick={() => setForm((f) => ({ ...f, gradient: g }))}
                  className={`w-10 h-10 rounded ${g} border-2 transition-all ${
                    form.gradient === g ? 'border-white scale-110' : 'border-transparent'
                  }`}
                />
              ))}
            </div>
          </Field>

          <Field label="Rozet (opsiyonel)">
            <input
              type="text"
              value={form.badge}
              onChange={(e) => setForm((f) => ({ ...f, badge: e.target.value }))}
              className={inputCls}
              placeholder="Örn: İndirim, Yeni, Özel"
            />
          </Field>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isNew}
                onChange={(e) => setForm((f) => ({ ...f, isNew: e.target.checked }))}
                className="w-4 h-4 accent-rose-500"
              />
              <span className="text-sm text-gray-300">Yeni Ürün</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isBestseller}
                onChange={(e) => setForm((f) => ({ ...f, isBestseller: e.target.checked }))}
                className="w-4 h-4 accent-rose-500"
              />
              <span className="text-sm text-gray-300">Çok Satan</span>
            </label>
          </div>
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <div className="flex gap-3">
          <button
            type="submit" disabled={loading}
            className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 disabled:bg-rose-800 text-white text-sm rounded-lg font-medium transition-colors"
          >
            {loading ? 'Kaydediliyor...' : 'Ürünü Kaydet'}
          </button>
          <Link
            href="/admin/urunler"
            className="px-6 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm rounded-lg font-medium transition-colors"
          >
            İptal
          </Link>
        </div>
      </form>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm text-gray-400 mb-1.5">{label}</label>
      {children}
    </div>
  )
}

const inputCls = 'w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-rose-500 transition-colors'

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

const GRADIENTS = [
  'category-gradient-1', 'category-gradient-2', 'category-gradient-3',
  'category-gradient-4', 'category-gradient-5', 'category-gradient-6',
]

export default function YeniKategoriPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    name: '', slug: '', description: '', gradient: 'category-gradient-1', count: '0',
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      router.push('/admin/kategoriler')
      router.refresh()
    } else {
      setError('Kategori eklenemedi.')
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/kategoriler" className="text-gray-400 hover:text-white transition-colors">
          <ChevronLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-white">Yeni Kategori</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-xl space-y-6">
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 space-y-5">
          <Field label="Kategori Adı">
            <input type="text" required value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className={inputCls} placeholder="Örn: Setler" />
          </Field>

          <Field label="Slug (URL'de görünür)">
            <input type="text" required value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') }))}
              className={inputCls} placeholder="Örn: setler" />
          </Field>

          <Field label="Açıklama">
            <textarea rows={2} value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className={inputCls} placeholder="Kısa kategori açıklaması" />
          </Field>

          <Field label="Ürün Sayısı (gösterim için)">
            <input type="number" min="0" value={form.count}
              onChange={(e) => setForm((f) => ({ ...f, count: e.target.value }))}
              className={inputCls} />
          </Field>

          <Field label="Gradient Renk">
            <div className="flex gap-2 flex-wrap">
              {GRADIENTS.map((g) => (
                <button key={g} type="button"
                  onClick={() => setForm((f) => ({ ...f, gradient: g }))}
                  className={`w-10 h-10 rounded ${g} border-2 transition-all ${
                    form.gradient === g ? 'border-white scale-110' : 'border-transparent'
                  }`}
                />
              ))}
            </div>
          </Field>
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <div className="flex gap-3">
          <button type="submit" disabled={loading}
            className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 disabled:bg-rose-800 text-white text-sm rounded-lg font-medium transition-colors">
            {loading ? 'Kaydediliyor...' : 'Kategoriyi Kaydet'}
          </button>
          <Link href="/admin/kategoriler"
            className="px-6 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm rounded-lg font-medium transition-colors">
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

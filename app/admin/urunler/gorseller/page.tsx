'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, Upload, Check } from 'lucide-react'

interface Product {
  id: string
  name: string
  category: string
  gradient: string
  image?: string
}

export default function GorsellerPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [uploading, setUploading] = useState<string | null>(null)
  const [saved, setSaved] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/products').then((r) => r.json()).then(setProducts)
  }, [])

  async function handleFile(productId: string, file: File) {
    setUploading(productId)

    try {
      const formData = new FormData()
      formData.append('file', file)
      const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData })
      const { url, error } = await uploadRes.json()

      if (!uploadRes.ok) {
        alert(error || 'Yükleme başarısız')
        return
      }

      const updateRes = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: url }),
      })

      if (updateRes.ok) {
        setProducts((prev) => prev.map((p) => p.id === productId ? { ...p, image: url } : p))
        setSaved(productId)
        setTimeout(() => setSaved(null), 2000)
      }
    } catch {
      alert('Bağlantı hatası')
    } finally {
      setUploading(null)
    }
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/urunler" className="text-gray-400 hover:text-white transition-colors">
          <ChevronLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-white">Ürün Görselleri</h1>
      </div>

      <p className="text-gray-400 text-sm mb-8">Her ürün için görsel yükle. Görseller anında kaydedilir.</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
            <label className="block relative cursor-pointer group">
              <div className="relative aspect-[3/4]">
                {product.image ? (
                  <Image src={product.image} alt={product.name} fill className="object-cover" unoptimized />
                ) : (
                  <div className={`w-full h-full ${product.gradient}`} />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  {uploading === product.id ? (
                    <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : saved === product.id ? (
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <Check size={20} className="text-white" />
                    </div>
                  ) : (
                    <Upload size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              </div>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                disabled={uploading === product.id}
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleFile(product.id, file)
                  e.target.value = ''
                }}
              />
            </label>
            <div className="p-3">
              <p className="text-white text-xs font-medium truncate">{product.name}</p>
              <p className="text-gray-500 text-xs">{product.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

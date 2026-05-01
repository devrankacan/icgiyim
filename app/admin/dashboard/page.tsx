import Link from 'next/link'
import { getProducts, getCategories } from '@/lib/store'
import { Package, Tag, Plus } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function DashboardPage() {
  const products = getProducts()
  const categories = getCategories()

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-rose-600/20 rounded-lg flex items-center justify-center">
              <Package size={22} className="text-rose-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-white">{products.length}</p>
              <p className="text-gray-400 text-sm">Toplam Ürün</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-violet-600/20 rounded-lg flex items-center justify-center">
              <Tag size={22} className="text-violet-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-white">{categories.length}</p>
              <p className="text-gray-400 text-sm">Toplam Kategori</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h2 className="text-white font-semibold mb-4">Hızlı İşlemler</h2>
          <div className="space-y-3">
            <Link
              href="/admin/urunler/yeni"
              className="flex items-center gap-2 text-sm text-rose-400 hover:text-rose-300 transition-colors"
            >
              <Plus size={16} /> Yeni Ürün Ekle
            </Link>
            <Link
              href="/admin/kategoriler/yeni"
              className="flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition-colors"
            >
              <Plus size={16} /> Yeni Kategori Ekle
            </Link>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h2 className="text-white font-semibold mb-4">Site Linkleri</h2>
          <div className="space-y-3">
            <a
              href="/"
              target="_blank"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              → Ana Sayfa
            </a>
            <a
              href="/urunler"
              target="_blank"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              → Ürünler Sayfası
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

import Link from 'next/link'
import { getProducts } from '@/lib/store'
import { Plus } from 'lucide-react'
import DeleteButton from './DeleteButton'

export const dynamic = 'force-dynamic'

export default function AdminUrunlerPage() {
  const products = getProducts()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Ürünler</h1>
        <Link
          href="/admin/urunler/yeni"
          className="flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-sm rounded-lg transition-colors"
        >
          <Plus size={16} /> Yeni Ürün
        </Link>
      </div>

      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Ürün</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Kategori</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Fiyat</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Durum</th>
              <th className="text-right px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-800/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded ${product.gradient} shrink-0`} />
                    <span className="text-sm text-white font-medium">{product.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">{product.category}</td>
                <td className="px-6 py-4">
                  <div>
                    <span className="text-sm text-white">{product.price.toLocaleString('tr-TR')}₺</span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-500 line-through ml-2">{product.originalPrice.toLocaleString('tr-TR')}₺</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-1 flex-wrap">
                    {product.isNew && (
                      <span className="px-2 py-0.5 bg-green-900/50 text-green-400 text-xs rounded">Yeni</span>
                    )}
                    {product.isBestseller && (
                      <span className="px-2 py-0.5 bg-yellow-900/50 text-yellow-400 text-xs rounded">Çok Satan</span>
                    )}
                    {product.badge && (
                      <span className="px-2 py-0.5 bg-rose-900/50 text-rose-400 text-xs rounded">{product.badge}</span>
                    )}
                    {!product.isNew && !product.isBestseller && !product.badge && (
                      <span className="text-xs text-gray-600">—</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/urunler/${product.id}/duzenle`}
                      className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Düzenle
                    </Link>
                    <DeleteButton id={product.id} type="product" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <Package size={32} className="mx-auto mb-3 opacity-40" />
            <p className="text-sm">Henüz ürün yok</p>
          </div>
        )}
      </div>
    </div>
  )
}

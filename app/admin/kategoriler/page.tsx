import Link from 'next/link'
import { getCategories } from '@/lib/store'
import { Plus, Tag } from 'lucide-react'
import DeleteButton from '../urunler/DeleteButton'

export const dynamic = 'force-dynamic'

export default function AdminKategorilerPage() {
  const categories = getCategories()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Kategoriler</h1>
        <Link
          href="/admin/kategoriler/yeni"
          className="flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-sm rounded-lg transition-colors"
        >
          <Plus size={16} /> Yeni Kategori
        </Link>
      </div>

      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Kategori</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Slug</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Açıklama</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Ürün Sayısı</th>
              <th className="text-right px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {categories.map((cat) => (
              <tr key={cat.slug} className="hover:bg-gray-800/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded ${cat.gradient} shrink-0`} />
                    <span className="text-sm text-white font-medium">{cat.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <code className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">{cat.slug}</code>
                </td>
                <td className="px-6 py-4 text-sm text-gray-400 max-w-xs truncate">{cat.description}</td>
                <td className="px-6 py-4 text-sm text-gray-400">{cat.count}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/kategoriler/${cat.slug}/duzenle`}
                      className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Düzenle
                    </Link>
                    <DeleteButton id={cat.slug} type="category" slug={cat.slug} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {categories.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <Tag size={32} className="mx-auto mb-3 opacity-40" />
            <p className="text-sm">Henüz kategori yok</p>
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

import { useRouter } from 'next/navigation'

interface Props {
  id: string
  type: 'product' | 'category'
  slug?: string
}

export default function DeleteButton({ id, type, slug }: Props) {
  const router = useRouter()

  async function handleDelete() {
    if (!confirm('Bu öğeyi silmek istediğinizden emin misiniz?')) return

    const url = type === 'product' ? `/api/products/${id}` : `/api/categories/${slug}`
    const res = await fetch(url, { method: 'DELETE' })

    if (res.ok) {
      router.refresh()
    } else {
      alert('Silme işlemi başarısız.')
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="text-sm text-red-400 hover:text-red-300 transition-colors"
    >
      Sil
    </button>
  )
}

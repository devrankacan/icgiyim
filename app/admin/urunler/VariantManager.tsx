'use client'

import { Plus, Trash2 } from 'lucide-react'
import ImageUpload from './ImageUpload'
import { Variant } from '@/lib/data'

interface Props {
  value: Variant[]
  onChange: (variants: Variant[]) => void
}

export default function VariantManager({ value, onChange }: Props) {
  function add() {
    onChange([...value, { id: Date.now().toString(), name: '', features: [], image: '' }])
  }

  function update(id: string, patch: Partial<Variant>) {
    onChange(value.map((v) => (v.id === id ? { ...v, ...patch } : v)))
  }

  function remove(id: string) {
    onChange(value.filter((v) => v.id !== id))
  }

  return (
    <div className="space-y-4">
      {value.map((v, i) => (
        <div key={v.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-white text-sm font-medium">Varyant {i + 1}</span>
            <button type="button" onClick={() => remove(v.id)} className="text-gray-500 hover:text-red-400 transition-colors">
              <Trash2 size={15} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Varyant Adı *</label>
              <input
                type="text"
                value={v.name}
                onChange={(e) => update(v.id, { name: e.target.value })}
                className={inp}
                placeholder="Örn: Kırmızı - S"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Fiyat (₺) — boşsa ana fiyat</label>
              <input
                type="number"
                min="0"
                value={v.price ?? ''}
                onChange={(e) => update(v.id, { price: e.target.value ? Number(e.target.value) : undefined })}
                className={inp}
                placeholder="649"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Özellikler (her satır bir madde)</label>
            <textarea
              rows={2}
              value={Array.isArray(v.features) ? v.features.join('\n') : ''}
              onChange={(e) => update(v.id, { features: e.target.value.split('\n').filter(Boolean) })}
              className={inp}
              placeholder="%100 Pamuk&#10;El yıkama önerilir"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Varyant Görseli</label>
            <ImageUpload value={v.image || ''} onChange={(url) => update(v.id, { image: url })} />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={add}
        className="flex items-center justify-center gap-2 w-full px-4 py-2.5 border border-dashed border-gray-600 text-gray-400 hover:text-white hover:border-gray-400 rounded-lg text-sm transition-colors"
      >
        <Plus size={15} />
        Varyant Ekle
      </button>
    </div>
  )
}

const inp = 'w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-rose-500 transition-colors'

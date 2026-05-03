'use client'

import { useState, useEffect } from 'react'
import { Check, Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react'
import ImageUpload from '../urunler/ImageUpload'

interface HeroSlide {
  id: string
  image: string
  imageMobile?: string
  badgeText?: string
  title: string
  subtitle?: string
  btn1Text?: string
  btn1Href?: string
  btn2Text?: string
  btn2Href?: string
}

const inputCls = 'w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-rose-500 transition-colors'

function newSlide(): HeroSlide {
  return { id: Date.now().toString(), image: '', title: '', subtitle: '', badgeText: '', btn1Text: '', btn1Href: '', btn2Text: '', btn2Href: '' }
}

export default function HeroPage() {
  const [slides, setSlides] = useState<HeroSlide[]>([])
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [open, setOpen] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/hero')
      .then((r) => r.json())
      .then((d: HeroSlide[]) => {
        setSlides(d)
        if (d.length > 0) setOpen(d[0].id)
        setFetching(false)
      })
  }, [])

  async function handleSave() {
    setSaving(true)
    setSaved(false)
    const res = await fetch('/api/hero', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(slides),
    })
    setSaving(false)
    if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 3000) }
  }

  function update(id: string, patch: Partial<HeroSlide>) {
    setSlides((s) => s.map((sl) => sl.id === id ? { ...sl, ...patch } : sl))
  }

  function remove(id: string) {
    setSlides((s) => s.filter((sl) => sl.id !== id))
  }

  function moveUp(i: number) {
    if (i === 0) return
    setSlides((s) => { const a = [...s]; [a[i - 1], a[i]] = [a[i], a[i - 1]]; return a })
  }

  function moveDown(i: number) {
    setSlides((s) => { if (i === s.length - 1) return s; const a = [...s]; [a[i], a[i + 1]] = [a[i + 1], a[i]]; return a })
  }

  if (fetching) return <div className="text-gray-400 text-sm">Yükleniyor...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Hero Slider</h1>
          <p className="text-gray-400 text-sm mt-1">Anasayfa giriş slider'ını yönetin — birden fazla slayt ekleyebilirsiniz</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-500 disabled:bg-rose-800 text-white text-sm rounded-lg font-medium transition-colors"
        >
          {saved ? <><Check size={16} /> Kaydedildi</> : saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
        </button>
      </div>

      <div className="space-y-4 mb-6">
        {slides.map((slide, i) => (
          <div key={slide.id} className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-800/50 transition-colors"
              onClick={() => setOpen(open === slide.id ? null : slide.id)}
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 bg-rose-600/20 text-rose-400 rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span>
                <span className="text-white text-sm font-medium truncate max-w-xs">{slide.title || 'Başlıksız slayt'}</span>
              </div>
              <div className="flex items-center gap-1">
                <button type="button" onClick={(e) => { e.stopPropagation(); moveUp(i) }} disabled={i === 0} className="p-1.5 text-gray-500 hover:text-white disabled:opacity-30 transition-colors">
                  <ChevronUp size={16} />
                </button>
                <button type="button" onClick={(e) => { e.stopPropagation(); moveDown(i) }} disabled={i === slides.length - 1} className="p-1.5 text-gray-500 hover:text-white disabled:opacity-30 transition-colors">
                  <ChevronDown size={16} />
                </button>
                <button type="button" onClick={(e) => { e.stopPropagation(); remove(slide.id) }} className="p-1.5 text-gray-500 hover:text-red-400 transition-colors ml-1">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Body */}
            {open === slide.id && (
              <div className="px-5 pb-6 border-t border-gray-800 pt-5 space-y-5">
                {/* Images */}
                <div>
                  <label className="block text-xs text-gray-400 mb-2">Görsel</label>
                  <ImageUpload
                    value={slide.image}
                    onChange={(url) => update(slide.id, { image: url })}
                    valueMobile={slide.imageMobile ?? ''}
                    onChangeMobile={(url) => update(slide.id, { imageMobile: url })}
                  />
                </div>

                {/* Badge */}
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">Üst Etiket <span className="text-gray-600">(opsiyonel)</span></label>
                  <input value={slide.badgeText ?? ''} onChange={(e) => update(slide.id, { badgeText: e.target.value })} className={inputCls} placeholder="Örn: Yeni Koleksiyon — İlkbahar 2024" />
                </div>

                {/* Title */}
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">Başlık</label>
                  <textarea rows={2} value={slide.title} onChange={(e) => update(slide.id, { title: e.target.value })} className={inputCls} placeholder="Örn: Kendinizi&#10;Özel Hissedin" />
                  <p className="text-xs text-gray-600 mt-1">Satır atlamak için Enter'a basın</p>
                </div>

                {/* Subtitle */}
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">Alt Metin <span className="text-gray-600">(opsiyonel)</span></label>
                  <textarea rows={2} value={slide.subtitle ?? ''} onChange={(e) => update(slide.id, { subtitle: e.target.value })} className={inputCls} placeholder="Kısa açıklama metni..." />
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-xs text-gray-400">1. Buton Metni</label>
                    <input value={slide.btn1Text ?? ''} onChange={(e) => update(slide.id, { btn1Text: e.target.value })} className={inputCls} placeholder="Örn: Keşfet" />
                    <input value={slide.btn1Href ?? ''} onChange={(e) => update(slide.id, { btn1Href: e.target.value })} className={inputCls} placeholder="/urunler" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs text-gray-400">2. Buton Metni <span className="text-gray-600">(opsiyonel)</span></label>
                    <input value={slide.btn2Text ?? ''} onChange={(e) => update(slide.id, { btn2Text: e.target.value })} className={inputCls} placeholder="Örn: Setleri Gör" />
                    <input value={slide.btn2Href ?? ''} onChange={(e) => update(slide.id, { btn2Href: e.target.value })} className={inputCls} placeholder="/kategoriler/setler" />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => { const s = newSlide(); setSlides((prev) => [...prev, s]); setOpen(s.id) }}
        className="flex items-center gap-2 px-5 py-3 border-2 border-dashed border-gray-700 hover:border-rose-500 text-gray-400 hover:text-rose-400 rounded-xl text-sm transition-colors w-full justify-center"
      >
        <Plus size={18} /> Yeni Slayt Ekle
      </button>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { Check } from 'lucide-react'
import ImageUpload from '../urunler/ImageUpload'

interface Banners {
  anasayfa_hero: string
  anasayfa_hero_mobile?: string
  anasayfa_banner: string
  anasayfa_banner_mobile?: string
  hakkimizda_hero: string
  hakkimizda_hero_mobile?: string
  hakkimizda_hikaye: string
  hakkimizda_hikaye_mobile?: string
  hakkimizda_cta: string
  hakkimizda_cta_mobile?: string
}

const BANNER_LABELS: { key: keyof Banners; mobileKey: keyof Banners; title: string; desc: string }[] = [
  { key: 'anasayfa_hero', mobileKey: 'anasayfa_hero_mobile', title: 'Anasayfa — Ana Hero', desc: 'Tam ekran giriş görseli' },
  { key: 'anasayfa_banner', mobileKey: 'anasayfa_banner_mobile', title: 'Anasayfa — Kostüm Banner', desc: 'Ortadaki geniş promosyon bandı' },
  { key: 'hakkimizda_hero', mobileKey: 'hakkimizda_hero_mobile', title: 'Hakkımızda — Hero', desc: 'Sayfa üst banner görseli' },
  { key: 'hakkimizda_hikaye', mobileKey: 'hakkimizda_hikaye_mobile', title: 'Hakkımızda — Hikaye Görseli', desc: 'Hikayemiz bölümündeki sağ görsel' },
  { key: 'hakkimizda_cta', mobileKey: 'hakkimizda_cta_mobile', title: 'Hakkımızda — Alt Banner', desc: 'Sayfa alt CTA bölümü görseli' },
]

const DEFAULT: Banners = {
  anasayfa_hero: '', anasayfa_hero_mobile: '',
  anasayfa_banner: '', anasayfa_banner_mobile: '',
  hakkimizda_hero: '', hakkimizda_hero_mobile: '',
  hakkimizda_hikaye: '', hakkimizda_hikaye_mobile: '',
  hakkimizda_cta: '', hakkimizda_cta_mobile: '',
}

export default function BannerlarPage() {
  const [banners, setBanners] = useState<Banners>(DEFAULT)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    fetch('/api/settings')
      .then((r) => r.json())
      .then((d) => {
        setBanners({ ...DEFAULT, ...d.banners })
        setFetching(false)
      })
  }, [])

  async function handleSave() {
    setSaving(true)
    setSaved(false)
    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ banners }),
    })
    setSaving(false)
    if (res.ok) {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
  }

  if (fetching) return <div className="text-gray-400 text-sm">Yükleniyor...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Banner Görselleri</h1>
          <p className="text-gray-400 text-sm mt-1">Her banner için ayrı masaüstü ve mobil görsel yükleyebilirsiniz</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-500 disabled:bg-rose-800 text-white text-sm rounded-lg font-medium transition-colors"
        >
          {saved ? <><Check size={16} /> Kaydedildi</> : saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
        </button>
      </div>

      <div className="space-y-6">
        {BANNER_LABELS.map(({ key, mobileKey, title, desc }) => (
          <div key={key} className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="mb-4">
              <p className="text-white font-medium text-sm">{title}</p>
              <p className="text-gray-500 text-xs mt-0.5">{desc}</p>
            </div>
            <ImageUpload
              value={banners[key] as string}
              onChange={(url) => setBanners((b) => ({ ...b, [key]: url }))}
              valueMobile={banners[mobileKey] as string ?? ''}
              onChangeMobile={(url) => setBanners((b) => ({ ...b, [mobileKey]: url }))}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

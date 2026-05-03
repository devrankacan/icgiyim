'use client'

import { useState, useEffect } from 'react'
import { Check, Eye, EyeOff } from 'lucide-react'
import ImageUpload from '../urunler/ImageUpload'

interface PopupSettings {
  enabled: boolean
  image: string
  imageMobile?: string
  delay: number
}

const DEFAULT: PopupSettings = { enabled: false, image: '', imageMobile: '', delay: 1 }

export default function PopupPage() {
  const [settings, setSettings] = useState<PopupSettings>(DEFAULT)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    fetch('/api/popup')
      .then((r) => r.json())
      .then((d) => { setSettings({ ...DEFAULT, ...d }); setFetching(false) })
  }, [])

  async function handleSave() {
    setSaving(true)
    setSaved(false)
    const res = await fetch('/api/popup', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    })
    setSaving(false)
    if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 3000) }
  }

  if (fetching) return <div className="text-gray-400 text-sm">Yükleniyor...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Açılış Pop-up</h1>
          <p className="text-gray-400 text-sm mt-1">Site açılırken gösterilecek animasyonlu pop-up görseli</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-500 disabled:bg-rose-800 text-white text-sm rounded-lg font-medium transition-colors"
        >
          {saved ? <><Check size={16} /> Kaydedildi</> : saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
        </button>
      </div>

      <div className="max-w-xl space-y-6">
        {/* Enable toggle */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 flex items-center justify-between">
          <div>
            <p className="text-white font-medium text-sm">Pop-up Durumu</p>
            <p className="text-gray-500 text-xs mt-0.5">
              {settings.enabled ? 'Aktif — ziyaretçiler pop-up görecek' : 'Pasif — pop-up gösterilmeyecek'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSettings((s) => ({ ...s, enabled: !s.enabled }))}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              settings.enabled
                ? 'bg-rose-600 hover:bg-rose-500 text-white'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
            }`}
          >
            {settings.enabled ? <><Eye size={15} /> Aktif</> : <><EyeOff size={15} /> Pasif</>}
          </button>
        </div>

        {/* Delay */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <p className="text-white font-medium text-sm mb-4">Gecikme Süresi</p>
          <div className="flex gap-2 flex-wrap">
            {[0, 1, 2, 3, 5].map((sec) => (
              <button
                key={sec}
                type="button"
                onClick={() => setSettings((s) => ({ ...s, delay: sec }))}
                className={`px-4 py-2 rounded-lg text-sm border transition-colors ${
                  settings.delay === sec
                    ? 'bg-rose-600 border-rose-600 text-white'
                    : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-rose-500'
                }`}
              >
                {sec === 0 ? 'Hemen' : `${sec} saniye`}
              </button>
            ))}
          </div>
        </div>

        {/* Images */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <p className="text-white font-medium text-sm mb-1">Pop-up Görseli</p>
          <p className="text-gray-500 text-xs mb-4">Masaüstü ve mobil için ayrı görsel yükleyebilirsiniz</p>
          <ImageUpload
            value={settings.image}
            onChange={(url) => setSettings((s) => ({ ...s, image: url }))}
            valueMobile={settings.imageMobile ?? ''}
            onChangeMobile={(url) => setSettings((s) => ({ ...s, imageMobile: url }))}
          />
        </div>

        {settings.enabled && !settings.image && (
          <p className="text-yellow-500 text-xs">⚠ Pop-up aktif ama henüz görsel yüklenmedi. Görsel ekleyin veya pop-up'ı pasife alın.</p>
        )}
      </div>
    </div>
  )
}

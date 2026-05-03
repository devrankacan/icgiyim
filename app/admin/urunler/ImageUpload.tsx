'use client'

import { useState, useRef } from 'react'
import { Upload, X, Monitor, Smartphone } from 'lucide-react'

interface Props {
  value: string
  onChange: (url: string) => void
  valueMobile?: string
  onChangeMobile?: (url: string) => void
}

function resizeImage(file: File, maxSize = 1200): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img')
    const url = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(url)
      const canvas = document.createElement('canvas')
      let { width, height } = img
      if (width > maxSize || height > maxSize) {
        if (width > height) { height = Math.round((height * maxSize) / width); width = maxSize }
        else { width = Math.round((width * maxSize) / height); height = maxSize }
      }
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0, width, height)
      resolve(canvas.toDataURL('image/jpeg', 0.85))
    }
    img.onerror = reject
    img.src = url
  })
}

function SingleUpload({
  value,
  onChange,
  label,
  hint,
  Icon,
}: {
  value: string
  onChange: (url: string) => void
  label?: string
  hint?: string
  Icon?: React.ElementType
}) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(file: File) {
    setUploading(true)
    setError('')
    try {
      const base64 = await resizeImage(file)
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file: base64, filename: file.name, type: 'image/jpeg' }),
      })
      const text = await res.text()
      let data: { url?: string; error?: string }
      try { data = JSON.parse(text) } catch { throw new Error('Sunucu yanıtı: ' + text.slice(0, 100)) }
      if (res.ok && data.url) onChange(data.url)
      else setError(data.error || 'Yükleme başarısız')
    } catch (err) {
      setError(String(err))
    } finally {
      setUploading(false)
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  return (
    <div>
      {label && (
        <p className="text-xs text-gray-400 flex items-center gap-1.5 mb-2">
          {Icon && <Icon size={12} />}
          {label}
          {hint && <span className="text-gray-600 font-normal">{hint}</span>}
        </p>
      )}

      {value ? (
        <div className="relative w-full h-40 rounded-lg overflow-hidden border border-gray-700">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt={label ?? 'Görsel'} className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 w-7 h-7 bg-black/70 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
          >
            <X size={14} className="text-white" />
          </button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => !uploading && inputRef.current?.click()}
          className="w-full h-40 border-2 border-dashed border-gray-700 hover:border-rose-500 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-5 h-5 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs text-gray-400">Yükleniyor...</p>
            </div>
          ) : (
            <>
              <Upload size={20} className="text-gray-500" />
              <div className="text-center px-2">
                <p className="text-xs text-gray-400">Tıkla veya sürükle bırak</p>
                <p className="text-[10px] text-gray-600 mt-0.5">JPG, PNG, WebP</p>
              </div>
            </>
          )}
        </div>
      )}

      {error && <p className="text-red-400 text-xs mt-1 break-all">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
          e.target.value = ''
        }}
      />
    </div>
  )
}

export default function ImageUpload({ value, onChange, valueMobile, onChangeMobile }: Props) {
  if (onChangeMobile !== undefined) {
    return (
      <div className="grid grid-cols-2 gap-3">
        <SingleUpload
          value={value}
          onChange={onChange}
          label="Masaüstü"
          Icon={Monitor}
        />
        <SingleUpload
          value={valueMobile ?? ''}
          onChange={onChangeMobile}
          label="Mobil"
          hint={!valueMobile ? ' — yüklenmezse masaüstü görseli' : ''}
          Icon={Smartphone}
        />
      </div>
    )
  }

  return <SingleUpload value={value} onChange={onChange} />
}

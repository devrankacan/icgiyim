'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Upload, X } from 'lucide-react'

interface Props {
  value: string[]
  onChange: (urls: string[]) => void
}

function resizeImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img')
    const objectUrl = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(objectUrl)
      const maxSize = 1200
      const canvas = document.createElement('canvas')
      let { width, height } = img
      if (width > maxSize || height > maxSize) {
        if (width > height) { height = Math.round((height * maxSize) / width); width = maxSize }
        else { width = Math.round((width * maxSize) / height); height = maxSize }
      }
      canvas.width = width; canvas.height = height
      canvas.getContext('2d')!.drawImage(img, 0, 0, width, height)
      resolve(canvas.toDataURL('image/jpeg', 0.85))
    }
    img.onerror = reject
    img.src = objectUrl
  })
}

async function uploadFile(file: File): Promise<string> {
  const base64 = await resizeImage(file)
  const res = await fetch('/api/upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ file: base64, filename: file.name, type: 'image/jpeg' }),
  })
  const text = await res.text()
  const data = JSON.parse(text)
  if (!res.ok) throw new Error(data.error || 'Yükleme başarısız')
  return data.url
}

export default function GalleryUpload({ value, onChange }: Props) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFiles(files: FileList) {
    setUploading(true)
    setError('')
    try {
      const urls = await Promise.all(Array.from(files).map(uploadFile))
      onChange([...value, ...urls])
    } catch (err) {
      setError(String(err))
    } finally {
      setUploading(false)
    }
  }

  function remove(index: number) {
    onChange(value.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-3">
        {value.map((url, i) => (
          <div key={url} className="relative aspect-square rounded-lg overflow-hidden border border-gray-700">
            <Image src={url} alt={`Görsel ${i + 1}`} fill unoptimized className="object-cover" />
            <button
              type="button"
              onClick={() => remove(i)}
              className="absolute top-1 right-1 w-6 h-6 bg-black/70 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
            >
              <X size={12} className="text-white" />
            </button>
            {i === 0 && (
              <span className="absolute bottom-1 left-1 text-[10px] bg-black/60 text-white px-1.5 py-0.5 rounded">
                Ana görsel
              </span>
            )}
          </div>
        ))}

        <div
          onClick={() => !uploading && inputRef.current?.click()}
          onDrop={(e) => { e.preventDefault(); if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files) }}
          onDragOver={(e) => e.preventDefault()}
          className="aspect-square border-2 border-dashed border-gray-700 hover:border-rose-500 rounded-lg flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors"
        >
          {uploading ? (
            <div className="w-5 h-5 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Upload size={18} className="text-gray-500" />
              <p className="text-xs text-gray-500">Ekle</p>
            </>
          )}
        </div>
      </div>

      {error && <p className="text-red-400 text-xs">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        className="hidden"
        onChange={(e) => { if (e.target.files?.length) handleFiles(e.target.files); e.target.value = '' }}
      />

      {value.length > 0 && (
        <p className="text-xs text-gray-500">İlk görsel ana görsel olarak kullanılır. Sıralamak için silinip tekrar eklenebilir.</p>
      )}
    </div>
  )
}

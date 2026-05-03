'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

interface Props {
  image: string
  imageMobile?: string
  delay: number
}

export default function PopupBanner({ image, imageMobile, delay }: Props) {
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('popup_seen')) return
    const t = setTimeout(() => {
      setMounted(true)
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)))
    }, delay * 1000)
    return () => clearTimeout(t)
  }, [delay])

  function close() {
    setVisible(false)
    sessionStorage.setItem('popup_seen', '1')
    setTimeout(() => setMounted(false), 400)
  }

  if (!mounted) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-400 ${
        visible ? 'bg-black/60 backdrop-blur-sm' : 'bg-black/0 backdrop-blur-none pointer-events-none'
      }`}
      onClick={close}
    >
      <div
        className={`relative max-w-lg w-full max-h-[90vh] overflow-hidden shadow-2xl transition-all duration-400 ${
          visible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-8'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          className="absolute top-3 right-3 z-10 w-9 h-9 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center transition-colors"
          aria-label="Kapat"
        >
          <X size={18} className="text-white" />
        </button>

        <picture>
          {imageMobile && <source media="(max-width: 767px)" srcSet={imageMobile} />}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="Duyuru" className="w-full h-auto block" />
        </picture>
      </div>
    </div>
  )
}

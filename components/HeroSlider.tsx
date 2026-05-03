'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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

interface Props {
  slides: HeroSlide[]
}

export default function HeroSlider({ slides }: Props) {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)

  const go = useCallback((index: number) => {
    if (animating || slides.length <= 1) return
    setAnimating(true)
    setTimeout(() => {
      setCurrent(index)
      setAnimating(false)
    }, 400)
  }, [animating, slides.length])

  const next = useCallback(() => go((current + 1) % slides.length), [go, current, slides.length])
  const prev = useCallback(() => go((current - 1 + slides.length) % slides.length), [go, current, slides.length])

  useEffect(() => {
    if (slides.length <= 1) return
    const t = setInterval(next, 6000)
    return () => clearInterval(t)
  }, [next, slides.length])

  if (!slides.length) return null

  const slide = slides[current]

  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-end overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 category-gradient-1 transition-opacity duration-500"
        style={{ opacity: animating ? 0 : 1 }}
      />
      {slide.image && (
        <picture
          className="absolute inset-0 w-full h-full"
          style={{ opacity: animating ? 0 : 1, transition: 'opacity 0.5s ease' }}
        >
          {slide.imageMobile && <source media="(max-width: 767px)" srcSet={slide.imageMobile} />}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
        </picture>
      )}
      <div className="absolute inset-0 hero-overlay" />

      {/* Text */}
      <div
        className="absolute bottom-12 inset-x-0 z-10"
        style={{ opacity: animating ? 0 : 1, transform: animating ? 'translateY(12px)' : 'translateY(0)', transition: 'opacity 0.5s ease, transform 0.5s ease' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg">
            {slide.badgeText && (
              <p className="text-xs text-accent tracking-[0.4em] uppercase font-sans mb-6">{slide.badgeText}</p>
            )}
            <h1 className="font-serif text-5xl md:text-7xl font-medium text-white leading-[1.1] mb-6 whitespace-pre-line">
              {slide.title}
            </h1>
            {slide.subtitle && (
              <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-10 font-sans">{slide.subtitle}</p>
            )}
            {(slide.btn1Text || slide.btn2Text) && (
              <div className="flex flex-col sm:flex-row gap-4">
                {slide.btn1Text && slide.btn1Href && (
                  <Link href={slide.btn1Href} className="btn-primary">{slide.btn1Text}</Link>
                )}
                {slide.btn2Text && slide.btn2Href && (
                  <Link href={slide.btn2Href} className="btn-outline" style={{ borderColor: 'rgba(255,255,255,0.4)', color: 'white' }}>
                    {slide.btn2Text}
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
            aria-label="Önceki"
          >
            <ChevronLeft size={20} className="text-white" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
            aria-label="Sonraki"
          >
            <ChevronRight size={20} className="text-white" />
          </button>
        </>
      )}

      {/* Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`rounded-full transition-all duration-300 ${i === current ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/40 hover:bg-white/70'}`}
              aria-label={`Slayt ${i + 1}`}
            />
          ))}
        </div>
      )}

    </section>
  )
}

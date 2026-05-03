'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, ShoppingBag, Search, Heart } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { Category } from '@/lib/data'

interface NavbarProps {
  categories?: Category[]
}

export default function Navbar({ categories = [] }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[var(--bg)] shadow-sm border-b border-[var(--border)]'
          : 'bg-transparent'
      }`}
    >
      {/* Top bar */}
      <div className="border-b border-[var(--border)] py-2 px-4 text-center text-xs tracking-widest text-secondary hidden md:block">
        ✦ &nbsp; TÜRKIYE GENELİNE ÜCRETSİZ KARGO — 500₺ ÜZERİ SİPARİŞLERDE &nbsp; ✦
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none">
            <span className={`font-serif text-xl md:text-2xl font-medium tracking-[0.15em] transition-colors duration-300 ${scrolled ? 'text-primary-color' : 'text-white'}`}>
              AURA
            </span>
            <span className="text-[10px] tracking-[0.35em] text-accent uppercase font-sans">
              homewears
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/urunler" className={`text-sm font-medium tracking-widest uppercase transition-colors duration-200 hover:text-accent ${scrolled ? 'text-secondary' : 'text-white/80 hover:text-white'}`}>
              Ürünler
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/kategoriler/${cat.slug}`}
                className={`text-sm font-medium tracking-widest uppercase transition-colors duration-200 hover:text-accent ${scrolled ? 'text-secondary' : 'text-white/80 hover:text-white'}`}
              >
                {cat.name}
              </Link>
            ))}
            <Link href="/hakkimizda" className={`text-sm font-medium tracking-widest uppercase transition-colors duration-200 hover:text-accent ${scrolled ? 'text-secondary' : 'text-white/80 hover:text-white'}`}>
              Hakkımızda
            </Link>
            <Link href="/iletisim" className={`text-sm font-medium tracking-widest uppercase transition-colors duration-200 hover:text-accent ${scrolled ? 'text-secondary' : 'text-white/80 hover:text-white'}`}>
              İletişim
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 hover:bg-white/10" aria-label="Ara">
              <Search size={18} className={scrolled ? 'text-secondary' : 'text-white/80'} />
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 hover:bg-white/10" aria-label="Favoriler">
              <Heart size={18} className={scrolled ? 'text-secondary' : 'text-white/80'} />
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 hover:bg-white/10" aria-label="Sepet">
              <ShoppingBag size={18} className={scrolled ? 'text-secondary' : 'text-white/80'} />
            </button>
            <ThemeToggle />
            <button
              className="lg:hidden w-9 h-9 flex items-center justify-center"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menü"
            >
              {menuOpen ? <X size={20} className={scrolled ? 'text-primary-color' : 'text-white'} /> : <Menu size={20} className={scrolled ? 'text-primary-color' : 'text-white'} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[var(--bg)] border-t border-[var(--border)] animate-fade-in">
          <nav className="flex flex-col px-6 py-6 gap-6">
            <Link href="/urunler" className="nav-link text-base" onClick={() => setMenuOpen(false)}>Ürünler</Link>
            {categories.map((cat) => (
              <Link key={cat.slug} href={`/kategoriler/${cat.slug}`} className="nav-link text-base" onClick={() => setMenuOpen(false)}>
                {cat.name}
              </Link>
            ))}
            <Link href="/hakkimizda" className="nav-link text-base" onClick={() => setMenuOpen(false)}>Hakkımızda</Link>
            <Link href="/iletisim" className="nav-link text-base" onClick={() => setMenuOpen(false)}>İletişim</Link>
          </nav>
        </div>
      )}
    </header>
  )
}

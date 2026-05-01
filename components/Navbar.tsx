'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, ShoppingBag, Search, Heart } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const navLinks = [
  { href: '/urunler', label: 'Ürünler' },
  { href: '/kategoriler/setler', label: 'Setler' },
  { href: '/kategoriler/gecelikler', label: 'Gecelikler' },
  { href: '/kategoriler/kostumler', label: 'Kostümler' },
  { href: '/hakkimizda', label: 'Hakkımızda' },
  { href: '/iletisim', label: 'İletişim' },
]

export default function Navbar() {
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
            <span className="font-serif text-xl md:text-2xl font-medium tracking-[0.15em] text-primary-color">
              AURA
            </span>
            <span className="text-[10px] tracking-[0.35em] text-accent uppercase font-sans">
              homewears
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 hover:bg-[var(--bg-subtle)]" aria-label="Ara">
              <Search size={18} className="text-secondary" />
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 hover:bg-[var(--bg-subtle)]" aria-label="Favoriler">
              <Heart size={18} className="text-secondary" />
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 hover:bg-[var(--bg-subtle)]" aria-label="Sepet">
              <ShoppingBag size={18} className="text-secondary" />
            </button>
            <ThemeToggle />
            <button
              className="lg:hidden w-9 h-9 flex items-center justify-center"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menü"
            >
              {menuOpen ? <X size={20} className="text-primary-color" /> : <Menu size={20} className="text-primary-color" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[var(--bg)] border-t border-[var(--border)] animate-fade-in">
          <nav className="flex flex-col px-6 py-6 gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link text-base"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

import Link from 'next/link'
import { Instagram, Facebook, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex flex-col leading-none mb-4">
              <span className="font-serif text-2xl font-medium tracking-[0.15em] text-primary-color">AURA</span>
              <span className="text-[10px] tracking-[0.35em] text-accent uppercase">homewears</span>
            </Link>
            <p className="text-sm text-secondary leading-relaxed mb-6">
              Kendinizi özel ve güçlü hissetmeniz için tasarlanmış premium fantezi iç giyim koleksiyonu.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-muted hover:text-accent transition-colors duration-200" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-muted hover:text-accent transition-colors duration-200" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-muted hover:text-accent transition-colors duration-200" aria-label="Twitter">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Kategoriler */}
          <div>
            <h4 className="font-serif text-sm font-medium tracking-widest uppercase mb-6 text-primary-color">Kategoriler</h4>
            <ul className="space-y-3">
              {[
                { href: '/kategoriler/setler', label: 'Setler' },
                { href: '/kategoriler/gecelikler', label: 'Gecelikler' },
                { href: '/kategoriler/babydoll', label: 'Babydoll' },
                { href: '/kategoriler/kostumler', label: 'Kostümler' },
                { href: '/kategoriler/korse', label: 'Korse & Bustier' },
                { href: '/kategoriler/jartiyer', label: 'Jartiyer & Çoraplar' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-secondary hover:text-accent transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Yardım */}
          <div>
            <h4 className="font-serif text-sm font-medium tracking-widest uppercase mb-6 text-primary-color">Yardım</h4>
            <ul className="space-y-3">
              {[
                { href: '/hakkimizda', label: 'Hakkımızda' },
                { href: '/iletisim', label: 'İletişim' },
                { href: '/kargo-ve-iade', label: 'Kargo & İade' },
                { href: '/beden-rehberi', label: 'Beden Rehberi' },
                { href: '/gizlilik-politikasi', label: 'Gizlilik Politikası' },
                { href: '/kullanim-kosullari', label: 'Kullanım Koşulları' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-secondary hover:text-accent transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h4 className="font-serif text-sm font-medium tracking-widest uppercase mb-6 text-primary-color">İletişim</h4>
            <ul className="space-y-3 text-sm text-secondary">
              <li>info@aurahomewears.com</li>
              <li>+90 (555) 000 00 00</li>
              <li className="leading-relaxed">Pazartesi – Cumartesi<br />09:00 – 18:00</li>
            </ul>
            <div className="mt-6">
              <p className="text-xs text-muted tracking-widest uppercase mb-3">Bizi Takip Edin</p>
              <p className="text-sm text-accent">@aurahomewears</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Aura Homewears. Tüm hakları saklıdır.
          </p>
          <p className="text-xs text-muted tracking-widest">
            PREMIUM FANTEZI İÇ GİYİM
          </p>
        </div>
      </div>
    </footer>
  )
}

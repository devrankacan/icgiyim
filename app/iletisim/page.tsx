import { Metadata } from 'next'
import { Mail, Phone, Clock, MapPin, Instagram, Facebook } from 'lucide-react'

export const metadata: Metadata = {
  title: 'İletişim | Aura Homewears',
  description: 'Aura Homewears ile iletişime geçin. Sorularınızı yanıtlamaktan memnuniyet duyarız.',
}

export default function IletisimPage() {
  return (
    <div className="pt-28 pb-24">
      {/* Header */}
      <div className="relative category-gradient-1 py-28">
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs text-accent tracking-[0.4em] uppercase mb-4">Yardımcı Olmaktan Mutluluk Duyarız</p>
          <h1 className="font-serif text-5xl md:text-6xl font-medium text-white mb-4">İletişim</h1>
          <p className="text-gray-300">Sorularınız için bize ulaşın, en kısa sürede geri döneceğiz.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <div>
            <h2 className="font-serif text-3xl font-medium text-primary-color mb-2">Mesaj Gönderin</h2>
            <div className="divider mx-0 mb-8" />

            <form className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium tracking-[0.2em] uppercase text-primary-color mb-2">
                    Adınız
                  </label>
                  <input
                    type="text"
                    placeholder="Adınızı girin"
                    className="w-full px-4 py-3 text-sm bg-[var(--bg-card)] border border-[var(--border)] text-primary-color placeholder:text-muted focus:outline-none focus:border-accent transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium tracking-[0.2em] uppercase text-primary-color mb-2">
                    Soyadınız
                  </label>
                  <input
                    type="text"
                    placeholder="Soyadınızı girin"
                    className="w-full px-4 py-3 text-sm bg-[var(--bg-card)] border border-[var(--border)] text-primary-color placeholder:text-muted focus:outline-none focus:border-accent transition-colors duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium tracking-[0.2em] uppercase text-primary-color mb-2">
                  E-posta
                </label>
                <input
                  type="email"
                  placeholder="ornek@email.com"
                  className="w-full px-4 py-3 text-sm bg-[var(--bg-card)] border border-[var(--border)] text-primary-color placeholder:text-muted focus:outline-none focus:border-accent transition-colors duration-200"
                />
              </div>

              <div>
                <label className="block text-xs font-medium tracking-[0.2em] uppercase text-primary-color mb-2">
                  Konu
                </label>
                <select className="w-full px-4 py-3 text-sm bg-[var(--bg-card)] border border-[var(--border)] text-primary-color focus:outline-none focus:border-accent transition-colors duration-200">
                  <option value="">Konu seçin</option>
                  <option>Sipariş Sorgulama</option>
                  <option>İade & Değişim</option>
                  <option>Ürün Bilgisi</option>
                  <option>Kargo Takip</option>
                  <option>Diğer</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium tracking-[0.2em] uppercase text-primary-color mb-2">
                  Mesajınız
                </label>
                <textarea
                  rows={5}
                  placeholder="Mesajınızı buraya yazın..."
                  className="w-full px-4 py-3 text-sm bg-[var(--bg-card)] border border-[var(--border)] text-primary-color placeholder:text-muted focus:outline-none focus:border-accent transition-colors duration-200 resize-none"
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                Mesajı Gönder
              </button>
            </form>
          </div>

          {/* Info */}
          <div>
            <h2 className="font-serif text-3xl font-medium text-primary-color mb-2">İletişim Bilgileri</h2>
            <div className="divider mx-0 mb-8" />

            <div className="space-y-6 mb-12">
              {[
                {
                  icon: Mail,
                  title: 'E-posta',
                  content: 'info@aurahomewears.com',
                  sub: 'Genellikle 24 saat içinde yanıtlarız',
                },
                {
                  icon: Phone,
                  title: 'Telefon',
                  content: '+90 (555) 000 00 00',
                  sub: 'Pazartesi – Cumartesi, 09:00–18:00',
                },
                {
                  icon: Clock,
                  title: 'Çalışma Saatleri',
                  content: 'Pzt – Cmt: 09:00 – 18:00',
                  sub: 'Pazar günleri kapalıyız',
                },
                {
                  icon: MapPin,
                  title: 'Konum',
                  content: 'İstanbul, Türkiye',
                  sub: 'Yalnızca online hizmet veriyoruz',
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-10 h-10 flex items-center justify-center shrink-0 border border-[var(--border)]">
                    <item.icon size={16} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted mb-1">{item.title}</p>
                    <p className="text-sm font-medium text-primary-color">{item.content}</p>
                    <p className="text-xs text-muted mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Sosyal Medya */}
            <div className="border-t border-[var(--border)] pt-8">
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-primary-color mb-5">Sosyal Medya</p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="flex items-center gap-3 border border-[var(--border)] px-5 py-3 hover:border-accent transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <Instagram size={16} className="text-accent" />
                  <span className="text-sm text-secondary">@aurahomewears</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 border border-[var(--border)] px-5 py-3 hover:border-accent transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <Facebook size={16} className="text-accent" />
                  <span className="text-sm text-secondary">Aura Homewears</span>
                </a>
              </div>
            </div>

            {/* FAQ teaser */}
            <div className="mt-10 bg-[var(--bg-subtle)] p-6 border border-[var(--border)]">
              <h3 className="font-serif text-lg font-medium text-primary-color mb-2">Sık Sorulan Sorular</h3>
              <p className="text-sm text-secondary mb-4 leading-relaxed">
                Kargo süresi, iade koşulları ve beden seçimi hakkında merak ettiklerinizi SSS sayfamızda bulabilirsiniz.
              </p>
              <ul className="space-y-2 text-sm text-secondary">
                {[
                  'Kargo kaç günde gelir?',
                  'İade nasıl yapılır?',
                  'Doğru bedeni nasıl seçerim?',
                  'Paketleme gizli mi?',
                ].map((q) => (
                  <li key={q} className="flex items-center gap-2">
                    <span className="text-accent">–</span>
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

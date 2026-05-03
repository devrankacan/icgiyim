import Link from 'next/link'
import { Heart, Star, Shield, Sparkles } from 'lucide-react'
import { headers } from 'next/headers'
import { getBanners } from '@/lib/data'

export const dynamic = 'force-dynamic'

export default async function HakkimizdaPage() {
  headers()
  const banners = getBanners()

  return (
    <div className="pt-28 pb-24">
      {/* Hero */}
      <div className="relative category-gradient-1 py-32">
        {banners.hakkimizda_hero && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={banners.hakkimizda_hero} alt="" className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs text-accent tracking-[0.4em] uppercase mb-4">Biz Kimiz</p>
          <h1 className="font-serif text-5xl md:text-6xl font-medium text-white mb-6">
            Hakkımızda
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Her kadının kendini özel, güçlü ve çekici hissetmesini sağlamak için buradayız.
          </p>
        </div>
      </div>

      {/* Story */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs text-accent tracking-[0.4em] uppercase mb-4">Hikayemiz</p>
              <h2 className="section-title mb-6">
                Bir Tutkunun<br />Doğuşu
              </h2>
              <div className="space-y-4 text-secondary text-sm leading-relaxed">
                <p>
                  Aura Homewears, kadınların kendilerini her an özel ve güçlü hissetmesi gerektiğine inanan bir tutkunun ürünüdür. 2020 yılında başlayan bu yolculuk, sadece iç giyim tasarlamakla kalmayıp; her kadının kendi aura'sını keşfetmesine yardımcı olmak için devam ediyor.
                </p>
                <p>
                  Premium kumaşlar, dikkatli işçilik ve özgün tasarımlarımızla her koleksiyon, sizi içinde bulunduğunuz anın en şık versiyonunuza dönüştürecek şekilde tasarlandı.
                </p>
                <p>
                  Fantezi iç giyim dünyasında güven, kalite ve estetik anlayışımızla fark yaratıyoruz. Her ürün, bir kadının kendi ile barışık, özgüvenli ve zarif olma hakkını sembolize ediyor.
                </p>
              </div>
            </div>
            <div className="relative">
              {banners.hakkimizda_hikaye ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={banners.hakkimizda_hikaye} alt="" className="aspect-[4/5] w-full object-cover" />
              ) : (
                <div className="aspect-[4/5] category-gradient-4" />
              )}
              <div className="absolute -bottom-6 -left-6 w-2/3 aspect-square category-gradient-2 opacity-60" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[var(--bg-subtle)] border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs text-accent tracking-[0.4em] uppercase mb-3">Ne İçin Duruyoruz</p>
            <h2 className="section-title">Değerlerimiz</h2>
            <div className="divider" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Heart,
                title: 'Özgüven',
                desc: 'Her kadının kendini güçlü ve çekici hissetme hakkı vardır. Tasarımlarımız bu özgüveni destekler.',
              },
              {
                icon: Star,
                title: 'Premium Kalite',
                desc: 'En iyi kumaşlar, en hassas işçilik. Kaliteden hiçbir zaman ödün vermiyoruz.',
              },
              {
                icon: Shield,
                title: 'Güven',
                desc: 'Gizli paketleme, güvenli ödeme ve koşulsuz iade garantisiyle alışveriş huzuru.',
              },
              {
                icon: Sparkles,
                title: 'Özgünlük',
                desc: 'Her koleksiyon, özgün tasarım anlayışımızla ve kadını merkeze alan bir vizyonla hazırlanır.',
              },
            ].map((value) => (
              <div key={value.title} className="card p-8 text-center">
                <div className="w-12 h-12 mx-auto mb-5 flex items-center justify-center">
                  <value.icon size={24} className="text-accent" />
                </div>
                <h3 className="font-serif text-lg font-medium text-primary-color mb-3">{value.title}</h3>
                <p className="text-sm text-secondary leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '5.000+', label: 'Mutlu Müşteri' },
              { number: '150+', label: 'Ürün Çeşidi' },
              { number: '4.9', label: 'Ortalama Puan' },
              { number: '4', label: 'Yıllık Deneyim' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-4xl md:text-5xl font-medium text-accent mb-2">{stat.number}</p>
                <p className="text-xs text-muted tracking-widest uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative category-gradient-1 py-24">
        {banners.hakkimizda_cta && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={banners.hakkimizda_cta} alt="" className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-white mb-6">
            Koleksiyonumuzu Keşfedin
          </h2>
          <p className="text-gray-300 mb-10 max-w-md mx-auto text-sm">
            Premium fantezi iç giyim dünyasına adım atın ve kendinizi özel hissedin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/urunler" className="btn-primary">
              Ürünleri Gör
            </Link>
            <Link href="/iletisim" className="btn-outline" style={{ borderColor: 'rgba(255,255,255,0.4)', color: 'white' }}>
              Bize Ulaşın
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

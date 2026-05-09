import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Aura Homewears | Premium Fantezi İç Giyim',
  description: 'Aura Homewears ile kendinizi özel hissedin. Premium fantezi iç giyim, gecelikler, babydoll ve kostüm koleksiyonları.',
  keywords: 'fantezi iç giyim, lingerie, babydoll, gecelik, korse, premium iç giyim',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}

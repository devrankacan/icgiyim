import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'Aura Homewears | Premium Fantezi İç Giyim',
  description: 'Aura Homewears ile kendinizi özel hissedin. Premium fantezi iç giyim, gecelikler, babydoll ve kostüm koleksiyonları.',
  keywords: 'fantezi iç giyim, lingerie, babydoll, gecelik, korse, premium iç giyim',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

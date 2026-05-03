'use client'

import { ThemeProvider } from 'next-themes'
import { CartProvider } from '@/lib/cartStore'
import { FavoritesProvider } from '@/lib/favoritesStore'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <CartProvider>
        <FavoritesProvider>
          {children}
        </FavoritesProvider>
      </CartProvider>
    </ThemeProvider>
  )
}

'use client'

import { createContext, useContext, useState, useEffect } from 'react'

interface FavCtx {
  ids: string[]
  toggle: (productId: string) => void
  has: (productId: string) => boolean
  count: number
}

const Ctx = createContext<FavCtx | null>(null)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([])

  useEffect(() => {
    try { setIds(JSON.parse(localStorage.getItem('favorites') || '[]')) } catch {}
  }, [])

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(ids))
  }, [ids])

  function toggle(productId: string) {
    setIds((prev) => prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId])
  }

  function has(productId: string) { return ids.includes(productId) }

  return <Ctx.Provider value={{ ids, toggle, has, count: ids.length }}>{children}</Ctx.Provider>
}

export function useFavorites() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useFavorites must be inside FavoritesProvider')
  return ctx
}

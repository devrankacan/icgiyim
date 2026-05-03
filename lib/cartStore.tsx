'use client'

import { createContext, useContext, useState, useEffect } from 'react'

export interface CartItem {
  id: string          // unique: productId + variantId + size + color
  productId: string
  name: string
  image?: string
  gradient: string
  category: string
  price: number
  size: string
  color: string
  variantName?: string
  quantity: number
}

interface CartCtx {
  items: CartItem[]
  add: (item: Omit<CartItem, 'id' | 'quantity'>) => void
  remove: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clear: () => void
  total: number
  count: number
}

const Ctx = createContext<CartCtx | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    try { setItems(JSON.parse(localStorage.getItem('cart') || '[]')) } catch {}
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  function add(item: Omit<CartItem, 'id' | 'quantity'>) {
    const id = `${item.productId}-${item.variantName ?? ''}-${item.size}-${item.color}`
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id)
      if (existing) return prev.map((i) => i.id === id ? { ...i, quantity: i.quantity + 1 } : i)
      return [...prev, { ...item, id, quantity: 1 }]
    })
  }

  function remove(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  function updateQty(id: string, qty: number) {
    if (qty < 1) return remove(id)
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, quantity: qty } : i))
  }

  function clear() { setItems([]) }

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const count = items.reduce((s, i) => s + i.quantity, 0)

  return <Ctx.Provider value={{ items, add, remove, updateQty, clear, total, count }}>{children}</Ctx.Provider>
}

export function useCart() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useCart must be inside CartProvider')
  return ctx
}

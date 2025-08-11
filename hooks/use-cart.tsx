"use client"

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

type CartContextValue = {
  items: CartItem[]
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void
  updateQuantity: (id: string, quantity: number) => void
  removeItem: (id: string) => void
  clear: () => void
  totalItems: number
  totalPrice: number
  // Checkout flows
  beginCheckoutFromCart: () => void
  buyNow: (item: Omit<CartItem, "quantity">, quantity?: number) => void
}

const CartContext = createContext<CartContextValue | null>(null)

const CART_STORAGE_KEY = "app:cart:v1"
const CHECKOUT_INTENT_KEY = "app:checkout-intent:v2"

export function CartProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  // Load cart from localStorage
  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(CART_STORAGE_KEY) : null
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[]
        if (Array.isArray(parsed)) setItems(parsed)
      }
    } catch {
      // ignore
    }
  }, [])

  // Persist cart
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
      }
    } catch {
      // ignore
    }
  }, [items])

  const addItem = useCallback((item: Omit<CartItem, "quantity">, quantity: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i))
      }
      return [...prev, { ...item, quantity }]
    })
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((prev) => {
      if (quantity <= 0) return prev.filter((i) => i.id !== id)
      return prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    })
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const totalItems = useMemo(() => items.reduce((acc, i) => acc + i.quantity, 0), [items])
  const totalPrice = useMemo(() => items.reduce((acc, i) => acc + i.price * i.quantity, 0), [items])

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen((v) => !v), [])

  // Checkout
  const setCheckoutIntent = useCallback((intentItems: CartItem[], source: "cart" | "buy-now") => {
    try {
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(
          CHECKOUT_INTENT_KEY,
          JSON.stringify({ source, items: intentItems })
        )
      }
    } catch {
      // ignore
    }
  }, [])

  const beginCheckoutFromCart = useCallback(() => {
    setCheckoutIntent(items, "cart")
    router.push("/checkout")
  }, [items, router, setCheckoutIntent])

  const buyNow = useCallback(
    (item: Omit<CartItem, "quantity">, quantity: number = 1) => {
      if (items.length > 0) {
        // If the cart already has items, proceed to checkout with the entire cart
        setCheckoutIntent(items, "cart")
        router.push("/checkout")
        return
      }
      const intent: CartItem = { ...item, quantity }
      setCheckoutIntent([intent], "buy-now")
      router.push("/checkout")
    },
    [router, setCheckoutIntent, items]
  )

  const value: CartContextValue = {
    items,
    isOpen,
    open,
    close,
    toggle,
    addItem,
    updateQuantity,
    removeItem,
    clear,
    totalItems,
    totalPrice,
    beginCheckoutFromCart,
    buyNow,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}

export function useCheckoutIntent(): CartItem[] {
  const [intent, setIntent] = useState<CartItem[]>([])
  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.sessionStorage.getItem(CHECKOUT_INTENT_KEY) : null
      if (raw) {
        const parsed = JSON.parse(raw) as { source: "cart" | "buy-now"; items: CartItem[] }
        if (parsed && Array.isArray(parsed.items)) setIntent(parsed.items)
      }
    } catch {
      // ignore
    }
  }, [])

  return intent
}

export function useCheckoutIntentController() {
  const cart = useCart()
  const [source, setSource] = useState<"cart" | "buy-now" | null>(null)
  const [localItems, setLocalItems] = useState<CartItem[]>([])

  // Initialize from session
  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.sessionStorage.getItem(CHECKOUT_INTENT_KEY) : null
      if (raw) {
        const parsed = JSON.parse(raw) as { source: "cart" | "buy-now"; items: CartItem[] }
        if (parsed && (parsed.source === "cart" || parsed.source === "buy-now")) {
          setSource(parsed.source)
          if (parsed.source === "buy-now") setLocalItems(parsed.items || [])
        }
      }
    } catch {
      // ignore
    }
  }, [])

  // Persist helper
  const persistSession = useCallback(
    (nextItems: CartItem[], origin: "cart" | "buy-now") => {
      try {
        if (typeof window !== "undefined") {
          window.sessionStorage.setItem(
            CHECKOUT_INTENT_KEY,
            JSON.stringify({ source: origin, items: nextItems })
          )
        }
      } catch {
        // ignore
      }
    },
    []
  )

  // Sync session with cart when source is cart
  useEffect(() => {
    if (source === "cart") {
      persistSession(cart.items, "cart")
    }
  }, [source, cart.items, persistSession])

  const updateQuantity = useCallback(
    (id: string, quantity: number) => {
      const safeQuantity = Math.max(1, quantity)
      if (source === "cart") {
        cart.updateQuantity(id, safeQuantity)
        // session will be updated via sync effect
      } else {
        const next = localItems.map((i) => (i.id === id ? { ...i, quantity: safeQuantity } : i))
        setLocalItems(next)
        persistSession(next, "buy-now")
      }
    },
    [source, cart, localItems, persistSession]
  )

  const increment = useCallback(
    (id: string) => {
      const list = source === "cart" ? cart.items : localItems
      const found = list.find((i) => i.id === id)
      if (!found) return
      updateQuantity(id, found.quantity + 1)
    },
    [source, cart.items, localItems, updateQuantity]
  )

  const decrement = useCallback(
    (id: string) => {
      const list = source === "cart" ? cart.items : localItems
      const found = list.find((i) => i.id === id)
      if (!found) return
      updateQuantity(id, Math.max(1, found.quantity - 1))
    },
    [source, cart.items, localItems, updateQuantity]
  )

  const items = source === "cart" ? cart.items : localItems
  const total = useMemo(() => items.reduce((sum, i) => sum + i.price * i.quantity, 0), [items])

  return { items, updateQuantity, increment, decrement, total }
}


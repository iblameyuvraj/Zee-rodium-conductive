"use client"

import { useCart } from "@/hooks/use-cart"
import { ShoppingCart } from "lucide-react"

export function Header() {
  const { totalItems, open } = useCart()
  return (
    <header className="flex items-center justify-between p-4 sm:p-6">
      <div className="text-2xl sm:text-3xl font-bold">COMPANY NAME©</div>
      <button onClick={open} className="relative rounded p-2 hover:bg-accent transition-colors" aria-label="Open cart">
        <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-foreground text-background text-[10px] sm:text-xs rounded-full min-w-4 h-4 px-1 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>
    </header>
  )
}


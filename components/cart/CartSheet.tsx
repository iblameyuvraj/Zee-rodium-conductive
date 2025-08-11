"use client"

import { useCart } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet"
import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"

export function CartSheet() {
  const { isOpen, close, items, updateQuantity, removeItem, totalPrice, beginCheckoutFromCart } = useCart()

  return (
    <Sheet open={isOpen} onOpenChange={(open) => (open ? null : close())}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
          {items.length === 0 ? (
            <p className="text-muted-foreground text-center py-12">Your cart is empty</p>
          ) : (
            items.map((item) => (
              <div key={item.size ? `${item.id}-${item.size}` : item.id} className="flex gap-4 border rounded-lg p-3">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded">
                  {/* Use next/image for better perf; fallback to img if needed */}
                  <Image alt={item.name} src={item.image} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="truncate">
                      <div className="font-medium truncate">{item.name}</div>
                      {item.size && (
                        <div className="text-sm text-muted-foreground">Size: {item.size}</div>
                      )}
                      <div className="text-sm text-muted-foreground">₹{item.price.toFixed(2)}</div>
                    </div>
                    <button
                      aria-label={`Remove ${item.name}`}
                      className="rounded p-1 hover:bg-accent"
                      onClick={() => removeItem(item.size ? `${item.id}-${item.size}` : item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      className="rounded p-1 hover:bg-accent"
                      onClick={() => updateQuantity(item.size ? `${item.id}-${item.size}` : item.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button
                      className="rounded p-1 hover:bg-accent"
                      onClick={() => updateQuantity(item.size ? `${item.id}-${item.size}` : item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter>
            <div className="flex items-center justify-between">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">₹{totalPrice.toFixed(2)}</span>
            </div>
            <Button className="w-full" onClick={beginCheckoutFromCart}>
              Checkout
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}


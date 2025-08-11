"use client"

import { useCheckoutIntentController } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const { items, increment, decrement, total } = useCheckoutIntentController()
  const router = useRouter()

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold">Checkout</h1>
      {items.length === 0 ? (
        <div className="mt-8">
          <p className="text-muted-foreground">Your checkout is empty.</p>
          <Button className="mt-4" onClick={() => router.push("/")}>Continue Shopping</Button>
        </div>
      ) : (
        <div className="mt-6 grid gap-6">
          {items.map((item) => (
            <div key={item.size ? `${item.id}-${item.size}` : item.id} className="flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="font-medium">{item.name}</div>
                {item.size && (
                  <div className="text-sm text-muted-foreground">Size: {item.size}</div>
                )}
                <div className="mt-2 flex items-center gap-2">
                  <button
                    aria-label="Decrease quantity"
                    className="rounded p-1 hover:bg-accent"
                    onClick={() => decrement(item.size ? `${item.id}-${item.size}` : item.id)}
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-sm">{item.quantity}</span>
                  <button
                    aria-label="Increase quantity"
                    className="rounded p-1 hover:bg-accent"
                    onClick={() => increment(item.size ? `${item.id}-${item.size}` : item.id)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
          <div className="flex items-center justify-between border-t pt-4">
            <div className="font-semibold">Total</div>
            <div className="font-semibold">₹{total.toFixed(2)}</div>
          </div>
          <Button className="w-full sm:w-auto">Place Order</Button>
        </div>
      )}
    </main>
  )
}


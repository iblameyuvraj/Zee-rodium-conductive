"use client"

import { useCheckoutIntentController } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const { items, increment, decrement, total } = useCheckoutIntentController()
  const router = useRouter()
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)
  const [couponError, setCouponError] = useState("")

  // Coupon configuration from environment variables
  const VALID_COUPON_CODE = process.env.NEXT_PUBLIC_COUPON_CODE
  const DISCOUNT_PERCENTAGE = parseInt(process.env.NEXT_PUBLIC_COUPON_DISCOUNT_PERCENTAGE || "0")

  const handleApplyCoupon = () => {
    const trimmedCode = couponCode.trim().toUpperCase()
    
    if (!trimmedCode) {
      setCouponError("Please enter a coupon code")
      return
    }

    if (trimmedCode === VALID_COUPON_CODE) {
      setAppliedCoupon(trimmedCode)
      setCouponError("")
      setCouponCode("")
    } else {
      setCouponError("Invalid coupon code")
      setAppliedCoupon(null)
    }
  }

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
    setCouponError("")
  }

  const discountAmount = appliedCoupon ? (total * DISCOUNT_PERCENTAGE) / 100 : 0
  const finalTotal = total - discountAmount

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
          
          {/* Coupon Code Section */}
          <div className="border-t pt-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
              <div className="flex-1">
                <label htmlFor="coupon-code" className="block text-sm font-medium mb-2">
                  Coupon Code
                </label>
                <div className="flex gap-2">
                  <Input
                    id="coupon-code"
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1"
                    disabled={!!appliedCoupon}
                  />
                  {!appliedCoupon ? (
                    <Button onClick={handleApplyCoupon} variant="outline">
                      Apply
                    </Button>
                  ) : (
                    <Button onClick={handleRemoveCoupon} variant="outline">
                      Remove
                    </Button>
                  )}
                </div>
                {couponError && (
                  <p className="text-sm text-red-500 mt-1">{couponError}</p>
                )}
                {appliedCoupon && (
                  <p className="text-sm text-green-600 mt-1">
                    Coupon "{appliedCoupon}" applied! {DISCOUNT_PERCENTAGE}% discount
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <div className="border-t pt-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-muted-foreground">Subtotal</div>
              <div>₹{total.toFixed(2)}</div>
            </div>
            {appliedCoupon && (
              <div className="flex items-center justify-between text-green-600">
                <div>Discount ({DISCOUNT_PERCENTAGE}%)</div>
                <div>-₹{discountAmount.toFixed(2)}</div>
              </div>
            )}
            <div className="flex items-center justify-between border-t pt-2">
              <div className="font-semibold text-lg">Total</div>
              <div className="font-semibold text-lg">₹{finalTotal.toFixed(2)}</div>
            </div>
          </div>
          
          <Button className="w-full sm:w-auto">Place Order</Button>
        </div>
      )}
    </main>
  )
}


"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"

export default function ProductPage() {
  const { addItem, open, buyNow } = useCart()

  const product = {
    id: "ceramic-vase",
    name: "Ceramic Vase",
    price: 79.0,
    image: "/placeholder.svg?height=600&width=600",
  }

  return (
    <div className="min-h-screen bg-gray-100 border-0">
      {/* Main Product Section */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          {/* Product Image */}
          <div className="relative">
            <img
              src="/placeholder.svg?height=600&width=600"
              alt="Ceramic Vase"
              className="w-full h-auto rounded-lg"
            />
            <button className="absolute bottom-4 left-4 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">
              N
            </button>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-black">Ceramic Vase</h1>
            <p className="text-xl sm:text-2xl font-semibold text-black">$79.00</p>
            <p className="text-gray-600 leading-relaxed">
              A minimalist ceramic vase with a matte finish. Perfect for fresh stems or as a sculptural accent on its
              own. Handcrafted with care for timeless durability.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
              <Button
                onClick={() => {
                  addItem(product)
                  open()
                }}
                className="bg-black text-white hover:bg-gray-800 px-6 py-3"
              >
                Add to Cart
              </Button>
              <Button
                onClick={() => buyNow(product)}
                variant="outline"
                className="border-black text-black hover:bg-gray-50 px-6 py-3 bg-transparent"
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white mt-12 sm:mt-20 rounded-4xl border-[15px]">
        <div className="max-w-6xl py-8 bg-black mx-3.5 my-0 px-6 border-0">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-4">
              <div className="font-bold text-4xl sm:text-6xl lg:text-9xl">COMPANY NAME©</div>
              <div className="flex flex-col sm:flex-row sm:gap-8 gap-2 text-xs sm:text-sm text-gray-400">
                <span>37°47'33.4"N 122°24'18.6"W</span>
                <span>(269) 682-1402</span>
                <span>Instagram</span>
              </div>
            </div>
            <div className="text-xs sm:text-sm text-gray-400 lg:text-right">2025© — All rights reserved</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

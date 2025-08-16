"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { Facebook, Instagram, Mail, Twitter } from "lucide-react"

export default function ProductPage() {
  const { addItem, open, buyNow } = useCart()
  const [selectedSize, setSelectedSize] = useState<string>("1L")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const productSizes = [
    { size: "1L", price: 3600 },
    { size: "250ml", price: 1200 }
  ]

  const selectedProduct = productSizes.find(p => p.size === selectedSize) || productSizes[0]

  // Define images for each size
  const getImagesForSize = (size: string) => {
    if (size === "1L") {
      return ["/images/product-img/common.png", "/images/product-img/1litre.png"]
    } else {
      return ["/images/product-img/common.png", "/images/product-img/250ml.png"]
    }
  }

  const currentImages = getImagesForSize(selectedSize)
  const currentImage = currentImages[currentImageIndex]

  // Get the size-specific image for cart/checkout
  const getSizeSpecificImage = (size: string) => {
    if (size === "1L") {
      return "/images/product-img/1litre.png"
    } else {
      return "/images/product-img/250ml.png"
    }
  }

  const product = {
    id: "brass-conductive-paint",
    name: "Brass conductive paint",
    price: selectedProduct.price,
    image: getSizeSpecificImage(selectedSize),
    size: selectedSize,
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % currentImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length)
  }

  const handleSizeChange = (size: string) => {
    setSelectedSize(size)
    setCurrentImageIndex(0) // Reset to first image when size changes
  }

  return (
    <div className="min-h-screen bg-gray-100 border-0">
      {/* Main Product Section */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          {/* Product Image */}
          <div className="relative">
            <Image
              src={currentImage}
              alt="Brass Conductive Paint"
              className="w-full h-auto rounded-lg"
              width={500}
              height={500}
              loading="lazy"
            />
            
            {/* Navigation Buttons */}
            {currentImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/80 text-white rounded-full flex items-center justify-center hover:bg-black transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/80 text-white rounded-full flex items-center justify-center hover:bg-black transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Image Indicators */}
            {currentImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {currentImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-black' : 'bg-white/60 hover:bg-white/80'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-black">Brass conductive paint.</h1>
            <p className="text-xl sm:text-2xl font-semibold text-black">₹{selectedProduct.price}/-
            </p>
            <p className="text-gray-600 leading-relaxed">
              A revolutionary paint that makes non-conductive surfaces electro-conductive. 
              Apply a durable metallic finish on wood, plastic, ceramics, stone, and more — 
              unlocking new creative and industrial possibilities. <a href="/details" className="text-grey-800 font-medium underline hover:text-black">Click here for more details.</a>
            </p>

            {/* Size Selection */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-black">Select Size:</h3>
              <div className="flex gap-3">
                {productSizes.map((sizeOption) => (
                  <button
                    key={sizeOption.size}
                    onClick={() => handleSizeChange(sizeOption.size)}
                    className={`px-4 py-2 border-2 rounded-lg font-medium transition-colors ${
                      selectedSize === sizeOption.size
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {sizeOption.size} - ₹{sizeOption.price}
                  </button>
                ))}
              </div>
            </div>

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
          {/* Left Section */}
          <div className="space-y-4">
            <div className="font-bold text-4xl sm:text-6xl lg:text-9xl">Zee Rodium©</div>
            <div className="flex flex-col sm:flex-row sm:gap-8 gap-2 text-xs sm:text-sm text-gray-400">
              {/* Social Icons */}
              <div className="flex gap-4 mt-2 sm:mt-0">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <Facebook className="w-5 h-5 hover:text-white transition-colors" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-5 h-5 hover:text-white transition-colors" />
                </a>
                <a href="mailto:info@zeerodium.com">
                  <Mail className="w-5 h-5 hover:text-white transition-colors" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="w-5 h-5 hover:text-white transition-colors" />
                </a>
              </div>
              <span><a href="tel:1234567890">1234567890</a></span>
            </div>
          </div>
        </div>
      </div>
    </footer>
    </div>
  )
}

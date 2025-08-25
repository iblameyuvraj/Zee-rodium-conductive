"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function ConductivePaintDetails() {
    const images = [
        "/images/product-img/common.png",
        "/images/product-img/1litre.png",
        "/images/product-img/250ml.png",
    ]

    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const currentImage = images[currentImageIndex]

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10">
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-bold text-black">
                Brass Conductive Paint — Full Details
            </h1>

            {/* Image Gallery */}
            <div className="relative w-full max-w-3xl mx-auto">
                <Image
                    src={currentImage}
                    alt="Conductive Paint Preview"
                    width={100}
                    height={100}
                    className="w-full h-auto rounded-lg shadow-md"
                />

                {/* Prev Button */}
                <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/80 text-white rounded-full flex items-center justify-center hover:bg-black transition-colors"
                    aria-label="Previous image"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Next Button */}
                <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/80 text-white rounded-full flex items-center justify-center hover:bg-black transition-colors"
                    aria-label="Next image"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2.5 h-2.5 rounded-full transition-colors ${index === currentImageIndex ? "bg-black" : "bg-white/60 hover:bg-white/80"
                                }`}
                            aria-label={`Go to image ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Back to product link */}
            <div>
                <Link href="/">
                    <span className="text-black font-medium underline hover:text-gray-800 cursor-pointer">
                        ← Back to Product Page
                    </span>
                </Link>
            </div>

            {/* Full Description */}
            <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>
                    We realized that the biggest limitation of electroplating was its restriction to electro-conductive materials.
                    To overcome this, we have developed a revolutionary paint that makes any non-conductive surface electro-conductive.
                </p>

                <p>
                    This proprietary paint allows us to expand the possibilities of electroplating beyond traditional metals.
                    Now, we can seamlessly apply a durable, metallic finish to a vast range of materials, including:
                </p>

                <ul className="list-disc pl-6 space-y-1">
                    <li>Wood</li>
                    <li>Plastic</li>
                    <li>Stone</li>
                    <li>Ceramics</li>
                    <li>Statues</li>
                </ul>

                <p>
                    This easy-to-apply paint opens up new applications for artists, designers, and manufacturers, enabling them to
                    achieve a metallic look on virtually any object.
                </p>

                <p>
                    Furthermore, this conductive paint has practical applications in the electronics industry, offering new solutions
                    for creating conductive pathways on non-traditional substrates.
                </p>

                <p>
                    We are proud to offer this unique product that not only solves a long-standing challenge in our industry but also
                    opens up a world of creative and technical possibilities.
                </p>
            </div>
        </div>
    )
}





















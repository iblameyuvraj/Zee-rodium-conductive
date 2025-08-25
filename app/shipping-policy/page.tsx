import { Facebook, Instagram, Mail, Twitter } from "lucide-react"

export const metadata = {
  title: "Shipping Policy | Zee Rodium",
  description:
    "Shipping timelines, order processing, COD and refund policy, tracking, address changes, and support for Zee Rodium orders in India.",
}

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <section className="space-y-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-black">Shipping Policy</h1>

          <div className="space-y-5 text-gray-700 leading-relaxed">
            <p>
              Thank you for shopping with Zee Rodium. Please review our shipping terms below before placing your order.
            </p>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-black">Key Points</h2>
              <ul className="list-disc pl-6 space-y-1 text-black">
                <li>No Cash on Delivery (COD) available.</li>
                <li>No refunds available.</li>
                <li>Order processing time: 24–48 business hours after payment confirmation.</li>
                <li>Tracking details will be shared via Email/SMS once dispatched.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-black">Estimated Delivery Timelines (India)</h2>
              <ul className="list-disc pl-6 space-y-1 text-black">
                <li>Tier 1 cities: 2–3 business days after dispatch.</li>
                <li>Tier 2 cities: +2–3 business days (total approx. 4–6 business days).</li>
                <li>Tier 3 / rural areas: 4–5 business days.</li>
              </ul>
              <p className="text-gray-600">
                Note: Timelines are estimates and may vary due to weather, courier delays, local holidays,
                strikes, or unforeseen logistics issues. Remote locations may take longer depending on serviceability.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-black">Shipping Coverage & Charges</h2>
              <ul className="list-disc pl-6 space-y-1 text-black">
                <li>Shipping charges (if any) are shown at checkout based on destination and weight.</li>
                <li>Applicable taxes are as per government regulations.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-black">Address Changes & Undeliverable Orders</h2>
              <ul className="list-disc pl-6 space-y-1 text-black">
                <li>Address changes are possible only before dispatch. Post-dispatch, rerouting isn’t guaranteed.</li>
                <li>If an order is returned due to incorrect address, incomplete details, or repeated delivery attempts,
                    re-shipping charges may apply.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-black">No Refunds Policy</h2>
              <p className="text-black">
                We do not offer refunds. Please review your order carefully before checkout.
              </p>
              <p className="text-gray-600">
                If you receive a damaged or incorrect item, contact us within 48 hours of delivery with clear photos
                and your order details. We’ll assess and assist with a suitable resolution as per our discretion.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-black">Support</h2>
              <ul className="list-disc pl-6 space-y-1 text-black">
                <li>Email: <a href="mailto:info@zeerodium.com" className="underline">info@zeerodium.com</a></li>
                <li>Hours: Mon–Sat, 10:00 AM – 6:00 PM (IST)</li>
              </ul>
            </div>

            <p className="text-gray-600">
              By placing an order, you agree to the terms outlined in this Shipping Policy.
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-black text-white mt-12 sm:mt-20 rounded-4xl border-[15px]">
        <div className="max-w-6xl py-8 bg-black mx-3.5 my-0 px-6 border-0">
          <div className="flex flex-col items-center gap-3">
            <div className="font-bold text-4xl sm:text-6xl lg:text-8xl text-center">
              Zee Rodium
            </div>

            <div className="flex gap-5">
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


            <div className="flex gap-3">
              <a
                href="/about-us"
                className="px-3 py-1.5 rounded-lg border border-gray-600 text-gray-300 hover:text-white hover:border-white transition-colors text-xs sm:text-sm"
              >
                About Us
              </a>
              <a
                href="/shipping-policy"
                className="px-3 py-1.5 rounded-lg border border-gray-600 text-gray-300 hover:text-white hover:border-white transition-colors text-xs sm:text-sm"
              >
                Shipping Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
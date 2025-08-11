import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { CartProvider } from '@/hooks/use-cart'
import { Toaster } from '@/components/ui/toaster'
import { CartSheet } from '@/components/cart/CartSheet'
import { Header } from '@/components/cart/Header'

export const metadata: Metadata = {
  title: 'Company Name',
  description: 'Company Name',
  generator: 'Company Name',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <CartProvider>
          <Header />
          {children}
          <CartSheet />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  )
}

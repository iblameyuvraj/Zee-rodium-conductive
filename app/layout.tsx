import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { CartProvider } from '@/hooks/use-cart'
import { Toaster } from '@/components/ui/toaster'
import { CartSheet } from '@/components/cart/CartSheet'
import { Header } from '@/components/cart/Header'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    default: 'Zee Rodium',
    template: '%s | Zee Rodium',
  },
  description: 'Zee Rodium',
  applicationName: 'Zee Rodium',
  generator: 'Zee Rodium',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Zee Rodium',
    title: 'Zee Rodium',
    description: 'Zee Rodium',
    images: [
      {
        url: '/placeholder.jpg',
        width: 1200,
        height: 630,
        alt: 'Zee Rodium',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zee Rodium',
    description: 'Zee Rodium',
    images: ['/placeholder.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/placeholder-logo.png', type: 'image/png' },
      { url: '/placeholder-logo.svg', type: 'image/svg+xml' },
    ],
    shortcut: ['/placeholder-logo.png'],
    apple: [{ url: '/placeholder-logo.png', type: 'image/png' }],
  },
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

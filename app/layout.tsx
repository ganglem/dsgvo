// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'

export const metadata: Metadata = {
  title: 'ROPA Generator',
}

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode
}>) {
  return (
      <html lang="en" suppressHydrationWarning>
      <body>
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
      >
        {children}
      </ThemeProvider>
      </body>
      </html>
  )
}

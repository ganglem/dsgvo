import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import Link from 'next/link'
import { ThemeToggle } from '@/components/ThemeToggle'

export const metadata: Metadata = {
    title: 'ROPA Generator',
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className="bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="min-h-screen flex flex-col">
                {/* HEADER */}
                <header className="py-10">
                    <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                        <Link href="/" className="flex items-center space-x-2">
                            <img src="/star.svg" alt="Logo" className="h-8 w-8 md:h-10 md:w-10" />
                            <h1 className="text-2xl md:text-5xl font-bold">shmollest ROPA Generator</h1>
                        </Link>
                        <ThemeToggle />
                    </div>
                </header>

                {/* MAIN */}
                <main className="flex-grow">{children}</main>

                {/* FOOTER */}
                <footer className="p-4 text-center text-sm">
                    <Link href="/impressum" className="text-primary-foreground hover:opacity-50">
                        Impressum
                    </Link>
                </footer>
            </div>
        </ThemeProvider>
        </body>
        </html>
    );
}

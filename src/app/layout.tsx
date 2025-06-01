import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "next-themes";
import Link from 'next/link'
import {Themetoggle} from "@/components/ui/themetoggle";


export const metadata: Metadata = {
  title: "ROPAgen",
  description: "Generate your own ROPA files with ease",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="min-h-screen flex flex-col">
                {/* HEADER */}
                <header className="sticky top-0 z-50 bg-white dark:bg-black backdrop-blur-md bg-background/70 border-b">
                    <div className="container mx-auto flex items-center justify-between px-4 md:px-6 py-2 md:py-4">
                        <Link
                            href="/"
                            aria-label="Go to homepage"
                            className="flex items-center space-x-2"
                        >
                            <img
                                src="/star.svg"
                                alt="Logo"
                                className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8"
                            />
                            <span className="text-sm sm:text-base md:text-xl font-semibold whitespace-nowrap">
                    ROPA Generator
                  </span>
                        </Link>
                        <Themetoggle aria-label="Toggle theme" />
                    </div>
                </header>

                {/* MAIN CONTENT */}
                <main className="flex-grow px-4 md:px-6 py-4 md:py-6">{children}</main>

                {/* FOOTER */}
                <footer className="p-4 text-sm text-muted-foreground text-center">
                    <Link
                        href="/impressum"
                        aria-label="Impressum"
                        className="transition-opacity hover:opacity-70"
                    >
                        Impressum
                    </Link>
                </footer>
            </div>
        </ThemeProvider>
        </body>
        </html>
    );
}
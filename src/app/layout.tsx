import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "next-themes";
import Link from 'next/link'
import Themetoggle from "@/components/ui/themetoggle";
import NavHeader from "@/components/ui/nav-header";
import Footer from "@/components/ui/footer";


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
                <header className="sticky top-0 py-2 z-50">
                    <NavHeader
                        logoSrc="/star.svg"
                        brandName="ROPAgen"
                        links={[
                            { name: "Generate", href: "/generator" }
                        ]}
                    />
                </header>

                {/* MAIN CONTENT */}
                <main className="flex-grow px-2 md:px-4 py-4 md:py-6">{children}</main>

                {/* FOOTER */}
                <footer className="py-4">
                    <Footer/>
                </footer>
            </div>
        </ThemeProvider>
        </body>
        </html>
    );
}
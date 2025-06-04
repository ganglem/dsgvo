import Link from "next/link"
import { Github } from "lucide-react"

interface FooterProps {
    productName?: string
    githubUrl?: string
}

export default function Footer({
                                   productName = "ROPAgen",
                                   githubUrl = "https://github.com/ganglem/ropagen", // Bitte anpassen
                               }: FooterProps) {
    return (
        <footer className="bg-background border-t text-muted-foreground">
            <div className="container mx-auto px-4 py-5 md:px-3 lg:py-8">
                <div className="grid gap-10 md:grid-cols-12">
                    {/* Linke Sektion: Produktname & GitHub */}
                    <div className="md:col-span-4 lg:col-span-5 flex flex-col items-start">
                        <Link href="/" className="text-xl font-bold text-foreground mb-2 transition-colors hover:text-primary">
                            {productName}
                        </Link>
                        <a
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${productName} GitHub Repository`}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <Github className="h-6 w-6" />
                            <span className="sr-only">GitHub</span>
                        </a>
                    </div>

                    {/* Rechte Sektion: Links in Spalten */}
                    <div className="md:col-span-8 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
                        <div>
                            <h3 className="font-semibold text-foreground mb-4">Rechtliches</h3>
                            <ul className="space-y-3">
                                <li>
                                    <Link href="/impressum" className="hover:text-foreground transition-colors">
                                        Impressum
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/privacy-policy" className="hover:text-foreground transition-colors">
                                        Datenschutz
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground mb-4">Unternehmen</h3>
                            <ul className="space-y-3">
                                <li>
                                    <Link href="/about" className="hover:text-foreground transition-colors">
                                        Über uns
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="hover:text-foreground transition-colors">
                                        Kontakt
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/faq" className="hover:text-foreground transition-colors">
                                        FAQ
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>

            {/* Copyright */}
            <div className="border-t border-border text-center text-sm py-6">
                <p>
                    &copy; {new Date().getFullYear()} {productName}. Alle Rechte vorbehalten.
                </p>
            </div>
        </footer>
    )
}

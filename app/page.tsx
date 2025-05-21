import { Suspense } from "react"
import DocumentGenerator from "@/components/document-generator"
import { Skeleton } from "@/components/ui/skeleton"
import { ThemeToggle } from "@/components/ThemeToggle"

export default function Home() {
    return (
        <main className="container mx-auto py-10 px-4 md:px-6 relative">
            {/* Toggle in top right */}
            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>

            <h1 className="text-3xl font-bold mb-6">ROPA Generator</h1>
            <p className="text-muted-foreground mb-8">
                Create GDPR-compliant documents for your company by either entering custom information or selecting from
                predefined templates.
            </p>

            <Suspense fallback={<GeneratorSkeleton />}>
                <DocumentGenerator />
            </Suspense>
        </main>
    )
}

function GeneratorSkeleton() {
    return (
        <div className="space-y-6">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-40 w-full" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-60 w-full" />
        </div>
    )
}

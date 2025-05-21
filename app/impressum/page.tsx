export default function ImpressumPage() {
    return (
        <main className="container mx-auto px-4 py-10 max-w-2xl space-y-4">
            <h1 className="text-3xl font-bold">Impressum</h1>
            <p className="text-muted-foreground">
                Angaben gemäß § 5 TMG
            </p>
            <p>
                Emilija Kastratović
                <br />
                Wagnerstraße 9
                <br />
                89077 Ulm
                <br />
                Deutschland
            </p>

            <p>
                <strong>Vertreten durch:</strong>
                <br />
                Emilija Kastratović
            </p>

            <p>
                <strong>Kontakt:</strong>
                <br />
                Telefon: +49 (0)1525 369 5021
                <br />
                E-Mail: emilija1705@gmail.com
            </p>

            <p className="text-sm text-muted-foreground">
                Quelle: <a href="https://www.e-recht24.de" className="underline">eRecht24</a>
            </p>
        </main>
    )
}

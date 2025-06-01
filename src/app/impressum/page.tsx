import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

export default function ImpressumPage() {
    return (

        <div className="container mx-auto py-10 px-4 md:px-6 relative space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Impressum</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
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
                        Quelle:{" "}
                        <a href="https://www.e-recht24.de" className="underline">
                            eRecht24
                        </a>
                    </p>
                </CardContent>
            </Card>
        </div>

    )
}

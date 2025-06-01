import {Textarea} from "@/components/ui/textarea";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

export default function RopaPreview({generatedDocument, setGeneratedDocument}: { generatedDocument: string, setGeneratedDocument: (doc: string) => void }) {

    return (
        <Card className="mt-8">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Generated Document</CardTitle>
            </CardHeader>
            <CardContent>
                <Textarea
                    className="max-h-[500px] min-h-[200px]"
                    defaultValue={generatedDocument}
                    onChange={e => setGeneratedDocument(e.target.value)}
                />
            </CardContent>
        </Card>
    )
}
import {Textarea} from "@/components/ui/textarea";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {ShineBorder} from "@/components/ui/shine-border";

export default function RopaPreview({generatedDocument, setGeneratedDocument}: { generatedDocument: string, setGeneratedDocument: (doc: string) => void }) {

    return (
        <Card className="mt-8 relative">
            <ShineBorder shineColor={["rgb(131,121,241)", "rgb(241,198,121)"]} />
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
"use client";

import { Category } from "@/models/DocumentData";
import {ChangeEvent, useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "./ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "./ui/textarea";
import {Button} from "@/components/ui/button";
import {generateDocument} from "@/actions/actions";
import { Loader2 } from "lucide-react"
import RopaTemplateSelector from "./ropa-template-selector";


export default function RopaForm({setGeneratedDocument}: {setGeneratedDocument: (doc: string) => void}) {

    const [documentData, setDocumentData] = useState({
        title: "",
        categories:
            Object.values(Category).reduce(
                (acc, category) => ({ ...acc, [category]: false }),
                {} as Record<Category, boolean>
            ),
        additionalInfo: "",
    });

    const [isGenerating, setIsGenerating] = useState<boolean>(false)

    function handleTitleChange(title: string) {
        setDocumentData({...documentData, title:  title});
    }

    function handleCategoryChange (category: string, checked: boolean) {
        setDocumentData({...documentData, categories: {...documentData.categories, [category]: checked}});
    }

    function handleAdditionalInfoChange (additionalInfo: string) {
        setDocumentData({...documentData, additionalInfo: additionalInfo});
    }

    async function handleGenerateDocument() {
        setIsGenerating(true);
        const generatedDocument = await generateDocument(documentData)
        setIsGenerating(false);
        setGeneratedDocument(generatedDocument)
    }

    return (
        <div className="space-y-6">

            <RopaTemplateSelector onSelect={setDocumentData}></RopaTemplateSelector>

            <Card>
                <CardHeader>
                    <CardTitle>Document Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-8">
                        <div className="space-y-2">
                            <Label htmlFor="title">Document Title</Label>
                            <Input
                                id="title"
                                placeholder="e.g., Privacy Policy for Company XYZ"
                                value={documentData.title}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleTitleChange(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Document Categories</Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {Object.keys(Category).map((key) => (
                                    <div key={key} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={key}
                                            checked={documentData.categories[key as Category] || false}
                                            onCheckedChange={(checked) => handleCategoryChange(key, checked === true)}
                                        />
                                        <Label htmlFor={key} className="cursor-pointer">
                                            {Category[key as keyof typeof Category]}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="additionalInfo">Additional Information</Label>
                            <Textarea
                                id="additionalInfo"
                                placeholder="Enter any specific details about your company or requirements..."
                                className="min-h-[150px]"
                                value={documentData.additionalInfo}
                                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleAdditionalInfoChange(e.target.value)}
                            />
                        </div>

                        <Button onClick={handleGenerateDocument} disabled={isGenerating}>
                            {isGenerating ? (
                                <> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>) : (
                                "Generate Document"
                            )}
                        </Button>
                    </div>

                </CardContent>
            </Card>
        </div>
    )
}


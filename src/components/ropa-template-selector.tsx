"use client"

import {useEffect, useState} from "react"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {fetchMockTemplates} from "@/actions/actions"
import {DocumentData, Template} from "@/models/DocumentData"


export default function RopaTemplateSelector({onSelect}: {
    onSelect: (template: DocumentData) => void }){

    const [templates, setTemplates] = useState<Template[]>([])

    useEffect(() => {
        const loadTemplates = async () => {
            try {
                const data = await fetchMockTemplates()
                console.log(data)
                setTemplates(data)
            } catch (error) {
                console.error("Error loading templates:", error)
            }
        }
        loadTemplates()
    }, [])

    const handleTemplateChange = (templateId: string) => {
        const selectedTemplate = templates.find((t) => t.id === templateId)
        if (selectedTemplate) {
            onSelect({
                title: selectedTemplate.title,
                categories: selectedTemplate.categories,
                additionalInfo: selectedTemplate.additionalInfo,
            })
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Select a Template</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <Select onValueChange={handleTemplateChange}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a predefined template"/>
                        </SelectTrigger>
                        <SelectContent>
                            {templates.map((template) => (
                                <SelectItem key={template.id} value={template.id}>
                                    {template.title}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
    )
}


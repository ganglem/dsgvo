"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { useToast } from "@/hooks/use-toast"
import {DocumentData} from "@/models/DocumentData";
import { marked } from 'marked';
import { useState } from "react"
import {Textarea} from "@/components/ui/textarea";


export default function DocumentPreview( {generatedDocument, documentData} : {generatedDocument: string, documentData: DocumentData}) {
  const { toast } = useToast()

  const [editableDoc, setEditableDoc] = useState(generatedDocument)

    const handleDownload = () => {
    try {

      const htmlContent = marked.parse(documentData.title + "\n\n" + generatedDocument);


      toast({
        title: "PDF downloaded",
        description: "Your document has been downloaded as a PDF file",
      })
    } catch (error) {
      console.error("Error generating PDF:", error)
      toast({
        title: "Download failed",
        description: "Could not generate PDF. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="mt-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Generated Document</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          className="max-h-[500px] min-h-[200px]"
          defaultValue={editableDoc}
          onChange={e => setEditableDoc(e.target.value)}
        />
      </CardContent>
    </Card>
  )
}


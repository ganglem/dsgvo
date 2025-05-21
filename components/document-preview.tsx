"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {DocumentData} from "@/models/DocumentData";
import { marked } from 'marked';
import html2pdf from 'html2pdf.js';


export default function DocumentPreview( {generatedDocument, documentData} : {generatedDocument: string, documentData: DocumentData}) {
  const { toast } = useToast()

    const handleDownload = () => {
    try {

      const htmlContent = marked.parse(documentData.title + "\n\n" + generatedDocument);

      const container = document.createElement('div');
      container.innerHTML = htmlContent;

      html2pdf()
          .from(container)
          .set({ filename: documentData.title, margin: 10, html2canvas: { scale: 2 } })
          .save();

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
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-muted p-4 rounded-md whitespace-pre-wrap max-h-[500px] overflow-y-auto">{generatedDocument}</div>
      </CardContent>
    </Card>
  )
}


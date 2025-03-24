"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import jsPDF from "jspdf"

interface DocumentPreviewProps {
  document: string
}

export default function DocumentPreview({ document }: DocumentPreviewProps) {
  const { toast } = useToast()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(document)
      toast({
        title: "Copied to clipboard",
        description: "Document content has been copied to your clipboard",
      })
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Could not copy to clipboard. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDownload = () => {
    try {
      // Create a new PDF document
      const pdf = new jsPDF()

      // Split the document into lines
      const lines = document.split("\n")

      // Set initial position
      let y = 20

      // Add title with larger font
      if (lines.length > 0 && lines[0].startsWith("# ")) {
        pdf.setFontSize(18)
        pdf.text(lines[0].replace("# ", ""), 20, y)
        y += 10
        lines.shift() // Remove the title from lines
      }

      // Process the rest of the document
      pdf.setFontSize(12)

      lines.forEach((line) => {
        // Handle section headers
        if (line.startsWith("## ")) {
          y += 5 // Add some space before section
          pdf.setFont("bold")
          pdf.text(line.replace("## ", ""), 20, y)
          pdf.setFont("normal")
        } else if (line.trim() === "") {
          // Empty line, just add space
          // Do nothing, we'll add space after each line anyway
        } else {
          // Regular text
          // Split long lines to fit page width
          const textLines = pdf.splitTextToSize(line, 170)
          textLines.forEach((textLine: string | string[]) => {
            y += 7
            if (y > 280) {
              // Check if we need a new page
              pdf.addPage()
              y = 20
            }
            pdf.text(textLine, 20, y)
          })
        }

        if (!line.startsWith("## ")) {
          y += 3 // Add space after each non-header line
        }
      })

      // Save the PDF
      pdf.save("gdpr-document.pdf")

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
          <Button variant="outline" size="sm" onClick={handleCopy}>
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-muted p-4 rounded-md whitespace-pre-wrap max-h-[500px] overflow-y-auto">{document}</div>
      </CardContent>
    </Card>
  )
}


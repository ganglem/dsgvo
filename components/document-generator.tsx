"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import ManualInputForm from "@/components/manual-input-form"
import TemplateSelector from "@/components/template-selector"
import DocumentPreview from "@/components/document-preview"
import { generateDocument } from "@/actions/actions"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import {Category, DocumentData} from "@/models/DocumentData";


export default function DocumentGenerator() {
  const [documentData, setDocumentData] = useState<DocumentData>({
    title: "",
    categories: Object.values(Category).reduce(
        (acc, category) => ({ ...acc, [category]: false }),
        {} as Record<Category, boolean>
    ),
    additionalInfo: "",
  })
  const [generatedDocument, setGeneratedDocument] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const { toast } = useToast()

  const handleManualInputChange = (data: DocumentData) => {
    setDocumentData(data)
  }

  const handleTemplateSelect = (template: DocumentData) => {
    setDocumentData(template)
  }

  const handleGenerateDocument = async () => {
    if (!documentData.title) {
      toast({
        title: "Missing information",
        description: "Please provide a title for your document",
        variant: "destructive",
      })
      return
    }

    const hasSelectedCategories = Object.values(documentData.categories).some((value) => value === true)
    if (!hasSelectedCategories) {
      toast({
        title: "Missing information",
        description: "Please select at least one category for your document",
        variant: "destructive",
      })
      return
    }

    try {
      setIsGenerating(true)
      const result = await generateDocument(documentData)
      setGeneratedDocument(result)
      toast({
        title: "Document generated",
        description: "Your GDPR document has been created successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate document. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-8">
      <TemplateSelector onSelect={handleTemplateSelect} />
      <ManualInputForm data={documentData} onChange={handleManualInputChange} />
      <div className="flex justify-end">
        <Button onClick={handleGenerateDocument} disabled={isGenerating} size="lg">
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate Document"
          )}
        </Button>
      </div>

      {generatedDocument && <DocumentPreview generatedDocument={generatedDocument} documentData={documentData} />}
    </div>
  )
}


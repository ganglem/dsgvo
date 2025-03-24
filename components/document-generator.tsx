"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ManualInputForm from "@/components/manual-input-form"
import TemplateSelector from "@/components/template-selector"
import DocumentPreview from "@/components/document-preview"
import { generateDocument } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface DocumentData {
  title: string
  categories: Record<string, boolean>
  additionalInfo: string
}

export default function DocumentGenerator() {
  const [activeTab, setActiveTab] = useState<string>("manual")
  const [documentData, setDocumentData] = useState<DocumentData>({
    title: "",
    categories: {
      dataCollection: false,
      dataProcessing: false,
      dataRetention: false,
      dataSharing: false,
      userRights: false,
      security: false,
      cookies: false,
      contactInfo: false,
    },
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
    setActiveTab("manual") // Switch to manual tab to allow editing
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
      <Tabs defaultValue="manual" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="manual">Manual Input</TabsTrigger>
          <TabsTrigger value="template">Use Template</TabsTrigger>
        </TabsList>
        <TabsContent value="manual" className="space-y-4 pt-4">
          <ManualInputForm data={documentData} onChange={handleManualInputChange} />
        </TabsContent>
        <TabsContent value="template" className="space-y-4 pt-4">
          <TemplateSelector onSelect={handleTemplateSelect} />
        </TabsContent>
      </Tabs>

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

      {generatedDocument && <DocumentPreview document={generatedDocument} />}
    </div>
  )
}


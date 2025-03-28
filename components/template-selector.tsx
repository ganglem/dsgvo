"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { fetchTemplates } from "@/app/actions"
import { Skeleton } from "@/components/ui/skeleton"

interface Template {
  id: string
  title: string
  categories: Record<string, boolean>
  additionalInfo: string
}

interface TemplateSelectorProps {
  onSelect: (template: {
    title: string
    categories: Record<string, boolean>
    additionalInfo: string
  }) => void
}

export default function TemplateSelector({ onSelect }: TemplateSelectorProps) {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        const data = await fetchTemplates()
        setTemplates(data)
      } catch (error) {
        toast({
          title: "Error loading templates",
          description: "Failed to load predefined templates. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadTemplates()
  }, [toast])

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
        {loading ? (
          <Skeleton className="h-10 w-full" />
        ) : (
          <div className="space-y-4">
            <Select onValueChange={handleTemplateChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a predefined template" />
              </SelectTrigger>
              <SelectContent>
                {templates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <p className="text-sm text-muted-foreground">
              Select a template to use as a starting point. You can modify it after selection.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}


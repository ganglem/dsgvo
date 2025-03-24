"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Save } from "lucide-react"

interface SaveTemplateDialogProps {
  documentData: {
    title: string
    categories: Record<string, boolean>
    additionalInfo: string
  }
}

export default function SaveTemplateDialog({ documentData }: SaveTemplateDialogProps) {
  const [open, setOpen] = useState(false)
  const [templateTitle, setTemplateTitle] = useState(documentData.title)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  const handleSave = async () => {
    if (!templateTitle.trim()) {
      toast({
        title: "Title required",
        description: "Please provide a title for your template",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSaving(true)

      const response = await fetch("/api/save-template", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: templateTitle,
          categories: documentData.categories,
          additionalInfo: documentData.additionalInfo,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to save template")
      }

      toast({
        title: "Template saved",
        description: "Your template has been saved successfully",
      })

      setOpen(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save template. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Save className="h-4 w-4 mr-2" />
          Save as Template
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save as Template</DialogTitle>
          <DialogDescription>Save your current document configuration as a template for future use.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="template-title" className="col-span-4">
              Template Title
            </Label>
            <Input
              id="template-title"
              value={templateTitle}
              onChange={(e) => setTemplateTitle(e.target.value)}
              className="col-span-4"
              placeholder="Enter a descriptive title for your template"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Template"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


import { type NextRequest, NextResponse } from "next/server"
import { kv } from "@vercel/kv"

interface DocumentData {
  title: string
  categories: Record<string, boolean>
  additionalInfo: string
}

export async function POST(request: NextRequest) {
  try {
    const data = (await request.json()) as DocumentData

    if (!data.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 })
    }

    // Get existing templates
    const existingTemplates = (await kv.get("gdpr_templates")) || []

    // Create new template
    const newTemplate = {
      id: `template_${Date.now()}`,
      ...data,
    }

    // Add to existing templates
    const updatedTemplates = [...existingTemplates, newTemplate]

    // Save to KV store
    await kv.set("gdpr_templates", updatedTemplates)

    return NextResponse.json({ success: true, template: newTemplate })
  } catch (error) {
    console.error("Error saving template:", error)
    return NextResponse.json({ error: "Failed to save template" }, { status: 500 })
  }
}


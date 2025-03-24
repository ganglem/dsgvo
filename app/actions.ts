"use server"

import { revalidatePath } from "next/cache"
import { kv } from "@vercel/kv"

interface DocumentData {
  title: string
  categories: Record<string, boolean>
  additionalInfo: string
}

interface Template extends DocumentData {
  id: string
}

// Fetch templates from the NoSQL database (using Vercel KV as an example)
export async function fetchTemplates(): Promise<Template[]> {
  try {
    // In a real application, you would fetch from your NoSQL database
    // This is a mock implementation using Vercel KV
    const templates = await kv.get<Template[]>("gdpr_templates")

    if (!templates) {
      // Return mock data if no templates are found
      return getMockTemplates()
    }

    return templates
  } catch (error) {
    console.error("Error fetching templates:", error)
    // Return mock data in case of error
    return getMockTemplates()
  }
}

// Generate document using ChatGPT
export async function generateDocument(data: DocumentData): Promise<string> {
  try {
    // In a real application, you would call the OpenAI API here
    // For now, we'll simulate a response

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Return a mock generated document
    return generateMockDocument(data)
  } catch (error) {
    console.error("Error generating document:", error)
    throw new Error("Failed to generate document")
  }
}

// Save a new template to the database
export async function saveTemplate(data: DocumentData): Promise<void> {
  try {
    const templates = await fetchTemplates()

    const newTemplate: Template = {
      id: `template_${Date.now()}`,
      ...data,
    }

    const updatedTemplates = [...templates, newTemplate]

    // In a real application, you would save to your NoSQL database
    await kv.set("gdpr_templates", updatedTemplates)

    revalidatePath("/")
  } catch (error) {
    console.error("Error saving template:", error)
    throw new Error("Failed to save template")
  }
}

// Mock functions for demonstration purposes
function getMockTemplates(): Template[] {
  return [
    {
      id: "template_1",
      title: "Standard Privacy Policy",
      categories: {
        dataCollection: true,
        dataProcessing: true,
        dataRetention: true,
        dataSharing: true,
        userRights: true,
        security: true,
        cookies: true,
        contactInfo: true,
      },
      additionalInfo: "This is a comprehensive privacy policy template suitable for most businesses.",
    },
    {
      id: "template_2",
      title: "E-commerce Privacy Policy",
      categories: {
        dataCollection: true,
        dataProcessing: true,
        dataRetention: true,
        dataSharing: true,
        userRights: true,
        security: true,
        cookies: true,
        contactInfo: true,
      },
      additionalInfo:
        "Specifically designed for e-commerce businesses that collect payment information and shipping details.",
    },
    {
      id: "template_3",
      title: "Minimal Cookie Policy",
      categories: {
        dataCollection: false,
        dataProcessing: false,
        dataRetention: false,
        dataSharing: false,
        userRights: true,
        security: false,
        cookies: true,
        contactInfo: true,
      },
      additionalInfo: "A simple cookie policy that covers the basics of cookie usage on your website.",
    },
  ]
}

function generateMockDocument(data: DocumentData): string {
  const { title, categories, additionalInfo } = data

  // Start with the document title and introduction
  let document = `# ${title}\n\n## Introduction\nThis document outlines the privacy practices for our company in accordance with the General Data Protection Regulation (GDPR).\n\n`

  // Add scope section with only the selected categories
  const selectedCategoryNames = Object.entries(categories)
    .filter(([_, selected]) => selected)
    .map(([key]) => {
      // Convert camelCase to readable format
      switch (key) {
        case "dataCollection":
          return "Data Collection"
        case "dataProcessing":
          return "Data Processing"
        case "dataRetention":
          return "Data Retention"
        case "dataSharing":
          return "Data Sharing"
        case "userRights":
          return "User Rights"
        case "security":
          return "Security Measures"
        case "cookies":
          return "Cookies Policy"
        case "contactInfo":
          return "Contact Information"
        default:
          return key
      }
    })
    .join(", ")

  document += `## Scope\nThis policy covers the following areas: ${selectedCategoryNames}\n\n`

  // Add additional information section only if it's provided
  if (additionalInfo && additionalInfo.trim() !== "") {
    document += `## Additional Information\n${additionalInfo}\n\n`
  }

  // Add sections only for selected categories
  if (categories.dataCollection) {
    document += `## Data Collection\nWe collect personal data that you provide directly to us when you register for an account, make a purchase, or contact our customer service.\n\n`
  }

  if (categories.dataProcessing) {
    document += `## Data Processing\nWe process your data to provide our services, process transactions, and communicate with you about your account.\n\n`
  }

  if (categories.dataRetention) {
    document += `## Data Retention\nWe retain your personal data for as long as necessary to fulfill the purposes for which we collected it, including for the purposes of satisfying any legal, accounting, or reporting requirements.\n\n`
  }

  if (categories.dataSharing) {
    document += `## Data Sharing\nWe may share your personal data with third parties in specific circumstances, such as with service providers who perform services on our behalf or when required by law.\n\n`
  }

  if (categories.userRights) {
    document += `## User Rights\nUnder GDPR, you have the right to access, correct, or delete your personal data that we have collected. You also have the right to restrict or object to our processing of your data.\n\n`
  }

  if (categories.security) {
    document += `## Security Measures\nWe implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing, accidental loss, destruction, or damage.\n\n`
  }

  if (categories.cookies) {
    document += `## Cookies Policy\nOur website uses cookies to enhance your browsing experience. You can control cookies through your browser settings and our cookie consent tool.\n\n`
  }

  if (categories.contactInfo) {
    document += `## Contact Information\nIf you have any questions about this policy, please contact our Data Protection Officer at dpo@example.com.\n\n`
  }

  // Add legal disclaimer
  document += `## Legal Disclaimer\nThis document was generated automatically and should be reviewed by a legal professional before use.`

  return document
}


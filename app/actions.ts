'use server';

import { revalidatePath } from 'next/cache';
import { kv } from '@vercel/kv';
import {generateText} from "ai";
import {openai} from "@ai-sdk/openai";

interface DocumentData {
  title: string;
  categories: Record<string, boolean>;
  additionalInfo: string;
}

interface Template extends DocumentData {
  id: string;
}

// Generate a document using Hugging Face API
export async function generateDocument(data: DocumentData): Promise<string> {
  try {
    const prompt = generatePromptFromData(data);

    const {text: llmResponse} = await generateText({
      model: openai('gpt-4o'),
      prompt: prompt,
    })

    return llmResponse
  } catch (error) {
    console.error('Error generating document:', error);
    throw new Error('Failed to generate document');
  }
}

// Save a new template to the database
export async function saveTemplate(data: DocumentData): Promise<void> {
  try {
    const templates = await fetchTemplates();

    const newTemplate: Template = {
      id: `template_${Date.now()}`,
      ...data,
    };

    const updatedTemplates = [...templates, newTemplate];

    await kv.set('gdpr_templates', updatedTemplates);

    revalidatePath('/');
  } catch (error) {
    console.error('Error saving template:', error);
    throw new Error('Failed to save template');
  }
}

// Fetch templates from the NoSQL database (using Vercel KV as an example)
export async function fetchTemplates(): Promise<Template[]> {
  try {
    const templates = await kv.get<Template[]>('gdpr_templates');

    if (!templates) {
      return getMockTemplates();
    }

    return templates;
  } catch (error) {
    console.error('Error fetching templates:', error);
    return getMockTemplates();
  }
}

// Build a custom prompt string from user input
function generatePromptFromData(data: DocumentData): string {
  const { title, categories, additionalInfo } = data;

  const categoryDetails = Object.entries(categories)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');

  const prompt =
      `
          Generate a detailed, professional GDPR privacy policy.
          
          Title: ${title}
          
          Section requirements:
          ${categoryDetails}
          
          Additional information:
          ${additionalInfo || 'N/A'}
          
          The document should be clear, structured, and in formal business language.
      `.trim();

  return prompt
}

// Mock data if no templates exist
function getMockTemplates(): Template[] {
  return [
    {
      id: 'template_1',
      title: 'Standard Privacy Policy',
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
          'This is a comprehensive privacy policy template suitable for most businesses.',
    },
    {
      id: 'template_2',
      title: 'E-commerce Privacy Policy',
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
          'Specifically designed for e-commerce businesses that collect payment information and shipping details.',
    },
    {
      id: 'template_3',
      title: 'Minimal Cookie Policy',
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
      additionalInfo:
          'A simple cookie policy that covers the basics of cookie usage on your website.',
    },
  ];
}

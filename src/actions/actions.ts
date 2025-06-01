"use server";

import {Category, DocumentData, Template} from "@/models/DocumentData";
import { generateText } from "ai";
import {openai} from '@ai-sdk/openai';
import templates from "../../data/mock.json";

export async function fetchMockTemplates(): Promise<Template[]> {
    return templates as unknown as Template[];
}


export async function generateDocument(data: DocumentData): Promise<string> {
    try {
        const prompt = generatePromptFromData(data);

        const {text: llmResponse} = await generateText({
            model: openai('gpt-4o'),
            prompt: prompt,
            temperature: 0,
        });

        return llmResponse;
    } catch (error) {
        console.error('Error generating document:', error);
        throw new Error('Failed to generate document');
    }
}

function generatePromptFromData(documentData: DocumentData): string {

    const selectedCategories = Object.entries(documentData.categories)
        .filter(([_, isSelected]) => isSelected)
        .map(([key]) => `- ${Category[key as keyof typeof Category]}`)
        .join('\n');

    const prompt = `
    You are an expert in data protection compliance. Generate a professional, structured Records of Processing Activities (ROPA) document in full compliance with the EU General Data Protection Regulation (GDPR).
    
    This ROPA document must be suitable for official regulatory review and written in formal business language.
    
    Document Title:
    ${documentData.title || 'No title provided. Use standard GDPR best practices.'}
    
    Included GDPR Compliance Categories:
    ${selectedCategories || 'None specified. Apply general GDPR processing practices.'}
    
    Additional Information and Special Instructions:
    ${documentData.additionalInfo || 'No additional instructions provided. Use standard GDPR best practices.'}
    
    Instructions:
    - Begin with an executive summary.
    - Clearly structure the document with headings for each included category.
    - For each category, describe processing purposes, legal basis, data subjects involved, data processors/controllers, retention periods, and safeguards.
    - Maintain a professional, legally appropriate tone throughout.
    
    The output should be suitable for use by a Data Protection Officer (DPO) or legal counsel.
    The output should be in .md style.
        `.trim();

    return prompt;
}

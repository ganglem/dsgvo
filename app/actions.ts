'use server';

import {generateText} from 'ai';
import {openai} from '@ai-sdk/openai';
import {MongoClient} from "mongodb";

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME;

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
        });

        return llmResponse;
    } catch (error) {
        console.error('Error generating document:', error);
        throw new Error('Failed to generate document');
    }
}

// Fetch templates from MongoDB instead of Vercel KV
export async function fetchTemplates() {
    const client = new MongoClient(mongoUri);
    let templates = [];
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('dsgvo');
        templates = await collection.find({}).toArray();
    } catch (error) {
        console.error('Error fetching templates:', error);
        throw new Error('Failed to fetch templates');
    } finally {
        await client.close();
    }

    return templates
}

// Build a custom prompt string from user input
function generatePromptFromData(data: DocumentData): string {
    const { title, categories, additionalInfo } = data;

    const categoryLabels: Record<string, string> = {
        dataCollection: 'Data Collection',
        dataProcessing: 'Data Processing',
        dataRetention: 'Data Retention',
        dataSharing: 'Data Sharing',
        userRights: 'User Rights',
        security: 'Security Measures',
        cookies: 'Cookies and Tracking Technologies',
        contactInfo: 'Contact Information',
    };

    const selectedCategories = Object.entries(categories)
        .filter(([_, isSelected]) => isSelected)
        .map(([key]) => `- ${categoryLabels[key]}`)
        .join('\n');

    const prompt = `
    You are an expert in data protection compliance. Generate a professional, structured Records of Processing Activities (ROPA) document in full compliance with the EU General Data Protection Regulation (GDPR).
    
    This ROPA document must be suitable for official regulatory review and written in formal business language.
    
    Document Title:
    ${title}
    
    Included GDPR Compliance Categories:
    ${selectedCategories || 'None specified. Apply general GDPR processing practices.'}
    
    Additional Information and Special Instructions:
    ${additionalInfo || 'No additional instructions provided. Use standard GDPR best practices.'}
    
    Instructions:
    - Begin with an executive summary.
    - Clearly structure the document with headings for each included category.
    - For each category, describe processing purposes, legal basis, data subjects involved, data processors/controllers, retention periods, and safeguards.
    - Maintain a professional, legally appropriate tone throughout.
    
    The output should be suitable for use by a Data Protection Officer (DPO) or legal counsel.
        `.trim();

        return prompt;
}

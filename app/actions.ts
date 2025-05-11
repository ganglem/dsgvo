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
    const {title, categories, additionalInfo} = data;

    const categoryDetails = Object.entries(categories)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');

    const prompt = `
    Generate a detailed, professional GDPR privacy policy.

    Title: ${title}

    Section requirements:
    ${categoryDetails}

    Additional information:
    ${additionalInfo || 'N/A'}

    The document should be clear, structured, and in formal business language.
  `.trim();

    return prompt;
}

// Mock data if needed in the future (currently unused)
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

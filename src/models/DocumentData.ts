export enum Category {
    dataCollection = "Data Collection",
    dataProcessing = "Data Processing",
    dataRetention = "Data Retention",
    dataSharing = "Data Sharing",
    userRights = "User Rights",
    security = "Security Measures",
    cookies = "Cookies Policy",
    contactInfo = "Contact Information",
}

export interface DocumentData {
    title: string;
    categories: Record<Category, boolean>;
    additionalInfo: string;
}

export interface Template {
    id: string;
    title: string;
    categories: Record<Category, boolean>;
    additionalInfo: string;
}
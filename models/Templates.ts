import { Category } from './DocumentData'

export interface Template {
    id: string
    title: string
    categories: Record<Category, boolean>
    additionalInfo: string
}
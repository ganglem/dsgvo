"use client"

import type React from "react"

import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {DocumentData} from "@/models/DocumentData";
import { Category } from "@/models/DocumentData"


interface ManualInputFormProps {
  data: DocumentData
  onChange: (data: DocumentData) => void
}


export default function ManualInputForm({ data, onChange }: ManualInputFormProps) {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...data,
      title: e.target.value,
    })
  }

  const handleCategoryChange = (category: string, checked: boolean) => {
    onChange({
      ...data,
      categories: {
        ...data.categories,
        [category]: checked,
      },
    })
  }

  const handleAdditionalInfoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange({
      ...data,
      additionalInfo: e.target.value,
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Document Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Document Title</Label>
              <Input
                id="title"
                placeholder="e.g., Privacy Policy for Company XYZ"
                value={data.title}
                onChange={handleTitleChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Document Categories</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.keys(Category).map((key) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox
                        id={key}
                        checked={data.categories[key as Category] || false}
                        onCheckedChange={(checked) => handleCategoryChange(key, checked === true)}
                      />
                      <Label htmlFor={key} className="cursor-pointer">
                        {Category[key as keyof typeof Category]}
                      </Label>
                    </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalInfo">Additional Information</Label>
              <Textarea
                id="additionalInfo"
                placeholder="Enter any specific details about your company or requirements..."
                className="min-h-[150px]"
                value={data.additionalInfo}
                onChange={handleAdditionalInfoChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


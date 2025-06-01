"use client";

import RopaForm from "@/components/ropa-form";
import RopaPreview from "@/components/ropa-preview";
import {useState} from "react";

export default function Home() {

    const [generatedDocument, setGeneratedDocument] = useState<string>("");

    return (
        <main className="container mx-auto py-10 px-4 md:px-6 relative space-y-6">
            <RopaForm setGeneratedDocument={setGeneratedDocument}/>
            {generatedDocument != "" && <RopaPreview generatedDocument={generatedDocument} setGeneratedDocument={setGeneratedDocument}/>}
        </main>
    )
}
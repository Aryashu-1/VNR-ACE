"use client"

import { useState } from "react"
import { PlacementsChatbot } from "@/components/placements-chatbot"
import { UploadCloud, FileType, CheckCircle, AlertCircle } from "lucide-react"

export default function ResumeAnalysisPage() {
    const [file, setFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)
    const [analysis, setAnalysis] = useState<string | null>(null)

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!file) return

        setUploading(true)
        setAnalysis(null)

        try {
            const formData = new FormData()
            formData.append("file", file)

            const res = await fetch("http://localhost:8000/placements/upload-resume", {
                method: "POST",
                body: formData
            })

            if (!res.ok) throw new Error("Upload failed")

            const data = await res.json()
            setAnalysis(data.analysis) // Display this in UI or pass to chatbot?
            // For now, let's display it in a nice UI card and let the chatbot discuss it.
        } catch (error) {
            console.error(error)
            alert("Failed to analyze resume")
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="h-[calc(100vh-100px)] flex flex-col gap-6">
            <h1 className="text-2xl font-bold text-gray-900">Resume Analysis</h1>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
                {/* Left: Upload Area & Results */}
                <div className="flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">

                    {/* Upload Card */}
                    <div className="bg-white p-8 rounded-xl border border-dashed border-gray-300 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors">
                        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-blue-600">
                            <UploadCloud className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">Upload your Resume</h3>
                        <p className="text-sm text-gray-500 mb-6">PDF or DOCX up to 10MB</p>

                        <form onSubmit={handleUpload} className="w-full max-w-xs flex flex-col gap-3">
                            <input
                                type="file"
                                accept=".pdf,.docx"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                                className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100"
                            />
                            <button
                                type="submit"
                                disabled={!file || uploading}
                                className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                            >
                                {uploading ? "Analyzing..." : "Analyze Resume"}
                            </button>
                        </form>
                    </div>

                    {/* Analysis Result */}
                    {analysis && (
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 animate-in fade-in slide-in-from-bottom-4">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-600" /> Analysis Report
                            </h3>
                            <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-line">
                                {analysis}
                            </div>
                            <div className="mt-4 p-4 bg-blue-50 rounded-lg text-sm text-blue-800 flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 mt-0.5" />
                                <p>Tip: Ask the assistant on the right for specific improvements on your weak areas.</p>
                            </div>
                        </div>
                    )}

                </div>

                {/* Right: Chatbot */}
                <div className="h-full min-h-[500px]">
                    <PlacementsChatbot initialMode="resume" />
                </div>
            </div>
        </div>
    )
}

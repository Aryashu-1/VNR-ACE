"use client"

import { useEffect, useState } from "react"
import { PlacementsChatbot } from "@/components/placements-chatbot"
import { Building2, BookOpen } from "lucide-react"

export default function CompanyPrepPage() {
    const [companies, setCompanies] = useState<string[]>([])
    const [selectedCompany, setSelectedCompany] = useState<string | null>(null)
    const [concepts, setConcepts] = useState(["DSA", "System Design", "DBMS", "OS", "Networks"])
    const [selectedConcepts, setSelectedConcepts] = useState<string[]>([])

    useEffect(() => {
        fetch("http://localhost:8000/placements/companies")
            .then(res => res.json())
            .then(setCompanies)
            .catch(console.error)
    }, [])

    const toggleConcept = (c: string) => {
        if (selectedConcepts.includes(c)) setSelectedConcepts(prev => prev.filter(x => x !== c))
        else setSelectedConcepts(prev => [...prev, c])
    }

    return (
        <div className="h-[calc(100vh-100px)] flex flex-col gap-6">
            <h1 className="text-2xl font-bold text-gray-900">Company Preparation</h1>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
                {/* Left: Selectors */}
                <div className="flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">

                    {/* Company Selector */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Building2 className="w-5 h-5 text-purple-600" /> Select Target Company
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {companies.map(c => (
                                <button
                                    key={c}
                                    onClick={() => setSelectedCompany(c)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedCompany === c
                                            ? "bg-purple-600 text-white shadow-md ring-2 ring-purple-200"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Concept Selector */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-orange-600" /> Focus Concepts
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {concepts.map(c => (
                                <button
                                    key={c}
                                    onClick={() => toggleConcept(c)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${selectedConcepts.includes(c)
                                            ? "bg-orange-50 border-orange-200 text-orange-700"
                                            : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                                        }`}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Start Button hint */}
                    <div className="p-4 bg-blue-50 text-blue-800 rounded-lg text-sm">
                        The assistant on the right is context-aware. Try asking "Give me interview questions for {selectedCompany || "selected company"}".
                    </div>
                </div>

                {/* Right: Chatbot */}
                <div className="h-full min-h-[500px]">
                    <PlacementsChatbot initialMode="prep" />
                </div>
            </div>
        </div>
    )
}

"use client"

import { useState } from "react"
import { PlacementsChatbot } from "@/components/placements-chatbot"
import { Search, Filter, Briefcase } from "lucide-react"

interface Student {
    id: number
    name: string
    gpa: number
    branch: string
    match: string
}

export default function ShortlistingPage() {
    const [jd, setJd] = useState("")
    const [minGpa, setMinGpa] = useState("")
    const [branch, setBranch] = useState("all")
    const [loading, setLoading] = useState(false)
    const [matches, setMatches] = useState<Student[]>([])

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const formData = new FormData()
            formData.append("jd", jd)
            if (minGpa) formData.append("min_gpa", minGpa)
            if (branch) formData.append("branch", branch)

            const res = await fetch("http://localhost:8000/placements/shortlist", {
                method: "POST",
                body: formData
            })

            if (!res.ok) throw new Error("Search failed")
            const data = await res.json()
            setMatches(data.matches)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="h-[calc(100vh-100px)] flex flex-col gap-6">
            <h1 className="text-2xl font-bold text-gray-900">Shortlisting Assistant</h1>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
                {/* Left: Search Form & Results */}
                <div className="flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">

                    {/* Search Form */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-indigo-600" /> Criteria Selection
                        </h3>
                        <form onSubmit={handleSearch} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
                                <textarea
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-indigo-500 outline-none h-24 resize-none"
                                    placeholder="Paste JD here..."
                                    value={jd}
                                    onChange={(e) => setJd(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Min GPA</label>
                                    <input
                                        type="number" step="0.1" max="10"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-indigo-500 outline-none"
                                        placeholder="e.g. 7.5"
                                        value={minGpa}
                                        onChange={(e) => setMinGpa(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                                    <select
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-indigo-500 outline-none"
                                        value={branch}
                                        onChange={(e) => setBranch(e.target.value)}
                                    >
                                        <option value="all">All Branches</option>
                                        <option value="CSE">CSE</option>
                                        <option value="IT">IT</option>
                                        <option value="ECE">ECE</option>
                                        <option value="EEE">EEE</option>
                                    </select>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-indigo-600 text-white font-medium py-2 rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300 transition-colors flex items-center justify-center gap-2"
                            >
                                {loading ? "Searching..." : <><Search className="w-4 h-4" /> Find Suitable Students</>}
                            </button>
                        </form>
                    </div>

                    {/* Results Table */}
                    {matches.length > 0 && (
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="p-4 bg-gray-50 border-b border-gray-200">
                                <h4 className="font-bold text-gray-900 text-sm">Matches Found ({matches.length})</h4>
                            </div>
                            <table className="w-full text-sm text-left">
                                <thead className="bg-white text-gray-500 border-b">
                                    <tr>
                                        <th className="px-4 py-2 font-medium">Name</th>
                                        <th className="px-4 py-2 font-medium">Branch</th>
                                        <th className="px-4 py-2 font-medium">GPA</th>
                                        <th className="px-4 py-2 font-medium">Match</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {matches.map((s) => (
                                        <tr key={s.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-2 text-gray-900">{s.name}</td>
                                            <td className="px-4 py-2 text-gray-600">{s.branch}</td>
                                            <td className="px-4 py-2 text-gray-600">{s.gpa}</td>
                                            <td className="px-4 py-2 font-semibold text-green-600">{s.match}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Right: Chatbot */}
                <div className="h-full min-h-[500px]">
                    <PlacementsChatbot initialMode="shortlisting" />
                </div>
            </div>
        </div>
    )
}

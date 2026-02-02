"use client"

import { useEffect, useState } from "react"
import { StatCard } from "@/components/stat-card"
import { PlacementsChatbot } from "@/components/placements-chatbot"
import { TrendingUp, Users } from "lucide-react"

interface PlacementStats {
    stats: { label: string, value: string, trend?: number }[]
    recent_placements: { name: string, branch: string, company: string, package: string }[]
}

export default function PlacementsDashboardPage() {
    const [data, setData] = useState<PlacementStats | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Fetch mock stats
        fetch("http://localhost:8000/placements/dashboard-stats")
            .then(res => res.json())
            .then(setData)
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className="h-[calc(100vh-100px)] flex flex-col gap-6">
            <h1 className="text-2xl font-bold text-gray-900">Placement Dashboard</h1>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
                {/* Left: Stats & Data */}
                <div className="lg:col-span-2 overflow-y-auto pr-2 custom-scrollbar space-y-6">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {loading ? (
                            Array(4).fill(0).map((_, i) => (
                                <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />
                            ))
                        ) : (
                            data?.stats.map((stat, i) => (
                                <StatCard key={i} label={stat.label} value={stat.value} trend={stat.trend} />
                            ))
                        )}
                    </div>

                    {/* Recent Placements Table */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                <Users className="w-5 h-5 text-blue-600" /> Recent Placements
                            </h3>
                            <button className="text-sm text-blue-600 font-medium hover:underline">View All</button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 rounded-l-lg">Student</th>
                                        <th className="px-4 py-3">Branch</th>
                                        <th className="px-4 py-3">Company</th>
                                        <th className="px-4 py-3 rounded-r-lg">Package</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr><td colSpan={4} className="text-center py-4">Loading...</td></tr>
                                    ) : (
                                        data?.recent_placements.map((student, i) => (
                                            <tr key={i} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                                                <td className="px-4 py-3 font-medium text-gray-900">{student.name}</td>
                                                <td className="px-4 py-3 text-gray-600">{student.branch}</td>
                                                <td className="px-4 py-3 font-semibold text-gray-900">{student.company}</td>
                                                <td className="px-4 py-3 text-green-600 font-medium">{student.package}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right: Chatbot */}
                <div className="lg:col-span-1 h-full min-h-[500px]">
                    <PlacementsChatbot initialMode="dashboard" />
                </div>
            </div>
        </div>
    )
}

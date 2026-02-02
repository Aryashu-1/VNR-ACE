"use client"

import { useRouter } from "next/navigation"
import { StatCard } from "@/components/stat-card"
import { Briefcase, TrendingUp, FileText, Building2, Zap, Code } from "lucide-react"
import { PlacementsChatbot } from "@/components/placements-chatbot"

export default function PlacementsPage() {
  const router = useRouter()

  const prepCards = [
    {
      id: 1,
      title: "Resume Analysis",
      description: "AI-powered resume review and optimization for better chances with recruiters",
      icon: FileText,
      color: "bg-blue-100",
      iconColor: "text-blue-600",
      button: "Analyze Resume",
      link: "/dashboard/placements/resume",
    },
    {
      id: 2,
      title: "Company-Specific Prep",
      description: "Targeted preparation materials and interview questions from specific companies",
      icon: Building2,
      color: "bg-purple-100",
      iconColor: "text-purple-600",
      button: "Start Prep",
      link: "/dashboard/placements/prep",
    },
    {
      id: 3,
      title: "Placement Tracking",
      description: "Track your applications, interviews, and offer status in real-time",
      icon: TrendingUp,
      color: "bg-green-100",
      iconColor: "text-green-600",
      button: "Track Applications",
      link: "/dashboard/placements/dashboard", // Assuming tracking is part of main dashboard for now
    },
    {
      id: 4,
      title: "Shortlisting Info",
      description: "Check eligibility and shortlisting status for different drives",
      icon: Zap,
      color: "bg-orange-100",
      iconColor: "text-orange-600",
      button: "Check Status",
      link: "/dashboard/placements/shortlisting",
    },
  ]

  return (
    <div className="space-y-6 h-[calc(100vh-100px)] flex flex-col">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Placements Hub</h1>
        <p className="text-gray-600 mt-1">Select a tool to get started</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        {/* Main Content Area - Left 2 Columns */}
        <div className="lg:col-span-2 space-y-6 overflow-y-auto pr-2 custom-scrollbar">





          <div className="mt-8">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {prepCards.map((card) => {
                const Icon = card.icon
                return (
                  <div
                    key={card.id}
                    className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => router.push(card.link)}
                  >
                    <div className={`w-10 h-10 ${card.color} rounded-lg flex items-center justify-center mb-3`}>
                      <Icon className={`w-5 h-5 ${card.iconColor}`} />
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm mb-2">{card.title}</h3>
                    <p className="text-gray-600 text-xs mb-4 leading-relaxed">{card.description}</p>
                    <button
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-2 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-colors font-medium text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(card.link);
                      }}
                    >
                      {card.button}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Chatbot Area - Right 1 Column */}
        <div className="lg:col-span-1 h-full min-h-[500px]">
          <PlacementsChatbot />
        </div>
      </div>
    </div>
  )
}

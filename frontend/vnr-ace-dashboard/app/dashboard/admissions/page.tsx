"use client"

import { StatCard } from "@/components/stat-card"
import { GlassCard } from "@/components/glass-card"
import { AdmissionsChatbot } from "@/components/admissions-chatbot"
import { Plus, Upload, FileText } from "lucide-react"

export default function AdmissionsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admissions</h1>
        <p className="text-gray-600 mt-1">Manage student applications and enrollments</p>
      </div>

     
     

          {/* Admissions Chatbot */}
          <AdmissionsChatbot />
      
    </div>
  )
}

"use client"

import { ClassworkChatbot } from "@/components/classwork-chatbot"

export default function ClassworkPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Classwork</h1>
        <p className="text-gray-600 mt-1">Academic Analysis and Insights</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Classwork Chatbot */}
        <ClassworkChatbot />
      </div>
    </div>
  )
}

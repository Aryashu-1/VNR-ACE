"use client"

import type React from "react"

import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"
import { ChatAssistant } from "@/components/chat-assistant"
import { getUser } from "@/lib/auth"
import { useEffect, useState } from "react"
import type { User } from "@/lib/auth"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const mockUser = getUser("student1")
    setUser(
      mockUser || {
        id: "guest",
        name: "Guest User",
        role: "student",
        email: "guest@vnrace.edu",
      },
    )
  }, [])

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role={user.role} />
      <div className="flex-1 flex flex-col ml-64">
        <Navbar user={user} />
        <main className="flex-1 overflow-auto pt-16">
          <div className="p-6">{children}</div>
        </main>
      </div>
      {user.role !== "student" && <ChatAssistant />}
    </div>
  )
}

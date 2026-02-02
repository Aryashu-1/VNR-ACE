"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export function AdmissionsChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! Welcome to VNR-ACE Admissions. I can help answer questions about applications, requirements, deadlines, scholarships, and more. What would you like to know?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // 🔥 Backend-connected function
  const generateResponse = async (userInput: string): Promise<string> => {
    try {
      // 1️⃣ LOGIN → Get token
      const loginRes = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          username: "admin@vnr.com",
          password: "password123",
        }),
      })

      if (!loginRes.ok) {
        console.error("Login failed")
        return "Authentication failed. Please check backend."
      }

      const loginData = await loginRes.json()
      const token = loginData.access_token

      // 2️⃣ CALL CHAT ENDPOINT
      const chatRes = await fetch("http://localhost:8000/admissions/chat", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userInput }),
      })

      if (!chatRes.ok) {
        const err = await chatRes.text()
        console.error("Chat error:", err)
        return "Server error. Unable to respond."
      }

      const data = await chatRes.json()
      return data.reply || "No reply received."
    } catch (error) {
      console.error("Network error:", error)
      return "Could not reach backend."
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    const userText = input
    setInput("")
    setIsLoading(true)

    // 🔥 Wait for backend response
    const assistantReply = await generateResponse(userText)

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: assistantReply,
    }

    setMessages((prev) => [...prev, assistantMessage])
    setIsLoading(false)
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 h-full flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <h3 className="font-bold text-gray-900 text-lg">Admissions Chatbot</h3>
        <p className="text-sm text-gray-600 mt-1">Ask questions about our admission process</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                message.role === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-gray-100 text-gray-900 rounded-bl-none"
              }`}
            >
              <p>{message.content}</p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 px-4 py-2 rounded-lg rounded-bl-none">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="flex gap-2 border-t border-gray-200 pt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about admissions..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 transition-smooth"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-smooth"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  )
}

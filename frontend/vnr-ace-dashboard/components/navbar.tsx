"use client"

import type { User as UserType } from "@/lib/auth"

interface NavbarProps {
  user: UserType
}

export function Navbar({ user }: NavbarProps) {
  return (
    <div className="fixed top-0 left-64 right-0 h-16 bg-white/80 backdrop-blur border-b border-gray-200 flex items-center justify-end px-6 z-40 transition-smooth">
      {/* Profile Avatar */}
      <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-smooth">
        {user.avatar}
      </button>
    </div>
  )
}

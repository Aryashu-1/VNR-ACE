"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, Users, Briefcase, FileText, Settings, User } from "lucide-react"
import type { UserRole } from "@/lib/auth"

interface SidebarProps {
  role: UserRole
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname()

  const menuItems = {
    student: [
      { label: "Admissions", href: "/dashboard/admissions", icon: Users },
      { label: "Classwork", href: "/dashboard/classwork", icon: BookOpen },
      { label: "Placements", href: "/dashboard/placements", icon: Briefcase },
    ],
    faculty: [
      { label: "Admissions", href: "/dashboard/admissions", icon: Users },
      { label: "Classwork", href: "/dashboard/classwork", icon: BookOpen },
      { label: "Placements", href: "/dashboard/placements", icon: Briefcase },
      { label: "Reports", href: "/dashboard/reports", icon: FileText },
    ],
    admin: [
      { label: "Admissions", href: "/dashboard/admissions", icon: Users },
      { label: "Classwork", href: "/dashboard/classwork", icon: BookOpen },
      { label: "Placements", href: "/dashboard/placements", icon: Briefcase },
      { label: "Reports", href: "/dashboard/reports", icon: FileText },
      { label: "Admin Panel", href: "/dashboard/admin", icon: Settings },
    ],
  }

  const items = menuItems[role]

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-slate-900 border-r-2 border-cyan-400/30 flex flex-col p-6 text-white transition-smooth">
      {/* Logo */}
      <div className="mb-12">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          VNR-ACE
        </h1>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 flex-1">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                  : "text-gray-300 hover:bg-slate-800 hover:text-cyan-400"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <Link
        href="/dashboard/profile"
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth border-t border-slate-700 pt-4 ${
          pathname === "/dashboard/profile"
            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
            : "text-gray-300 hover:bg-slate-800 hover:text-cyan-400"
        }`}
      >
        <User className="w-5 h-5" />
        <span className="font-medium">Profile</span>
      </Link>
    </div>
  )
}

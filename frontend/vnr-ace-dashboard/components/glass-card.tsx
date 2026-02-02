import type React from "react"
interface GlassCardProps {
  title: string
  children: React.ReactNode
  className?: string
}

export function GlassCard({ title, children, className = "" }: GlassCardProps) {
  return (
    <div className={`bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl ${className}`}>
      <h3 className="text-lg font-bold text-white mb-4">{title}</h3>
      <div className="text-gray-300">{children}</div>
    </div>
  )
}

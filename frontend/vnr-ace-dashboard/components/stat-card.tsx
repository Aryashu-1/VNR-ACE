import type React from "react"
interface StatCardProps {
  label: string
  value: string | number
  trend?: number
  icon?: React.ReactNode
}

export function StatCard({ label, value, trend }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-smooth">
      <p className="text-gray-600 text-sm font-medium mb-2">{label}</p>
      <div className="flex items-end justify-between">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {trend !== undefined && (
          <p
            className={`text-sm font-semibold flex items-center gap-1 ${trend > 0 ? "text-green-600" : "text-red-600"}`}
          >
            <span>↑</span> {Math.abs(trend)}%
          </p>
        )}
      </div>
    </div>
  )
}

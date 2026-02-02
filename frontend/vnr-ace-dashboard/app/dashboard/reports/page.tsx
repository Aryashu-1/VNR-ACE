"use client"

import { StatCard } from "@/components/stat-card"
import { Download, BarChart3 } from "lucide-react"

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-600 mt-1">Generate and view academic and administrative reports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Reports Generated" value="247" />
        <StatCard label="Monthly Reports" value="12" />
        <StatCard label="Last Generated" value="2h ago" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" /> Available Reports
          </h3>
          <div className="space-y-2">
            {[
              { name: "Academic Performance", date: "Nov 20, 2024" },
              { name: "Attendance Summary", date: "Nov 19, 2024" },
              { name: "Placement Statistics", date: "Nov 18, 2024" },
              { name: "Financial Report", date: "Nov 15, 2024" },
              { name: "Admission Analytics", date: "Nov 10, 2024" },
            ].map((report) => (
              <div
                key={report.name}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-smooth"
              >
                <div>
                  <p className="font-semibold text-sm text-gray-900">{report.name}</p>
                  <p className="text-xs text-gray-600">{report.date}</p>
                </div>
                <button className="p-2 hover:bg-white rounded transition-smooth">
                  <Download className="w-4 h-4 text-blue-600" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Generate New Report</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 transition-smooth">
                <option>Academic Performance</option>
                <option>Attendance</option>
                <option>Placements</option>
                <option>Financial</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 transition-smooth">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last Quarter</option>
                <option>Last Year</option>
              </select>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-smooth font-medium text-sm">
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

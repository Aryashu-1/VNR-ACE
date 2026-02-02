"use client"

import { StatCard } from "@/components/stat-card"
import { Users, Settings, Activity } from "lucide-react"

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
        <p className="text-gray-600 mt-1">System administration and configuration</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Total Users" value="2,847" />
        <StatCard label="Active Sessions" value="423" />
        <StatCard label="System Uptime" value="99.9%" />
        <StatCard label="Alerts" value="3" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" /> User Management
          </h3>
          <div className="space-y-2">
            <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-smooth">
              <span className="font-semibold text-sm text-gray-900">Create New User</span>
              <span className="text-lg">+</span>
            </button>
            <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-smooth">
              <span className="font-semibold text-sm text-gray-900">Manage Roles</span>
              <span className="text-lg">→</span>
            </button>
            <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-smooth">
              <span className="font-semibold text-sm text-gray-900">View Logs</span>
              <span className="text-lg">→</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-600" /> System Settings
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Maintenance Mode</span>
              <button className="relative w-11 h-6 bg-gray-300 rounded-full transition-smooth hover:bg-gray-400">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-smooth"></div>
              </button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Enable Analytics</span>
              <button className="relative w-11 h-6 bg-blue-600 rounded-full transition-smooth">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-smooth"></div>
              </button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Backup Schedule</span>
              <span className="text-xs text-gray-600">Daily 2:00 AM</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-600" /> Recent Activity
        </h3>
        <div className="space-y-2">
          {[
            { action: "User registration", user: "Aarav Patel", time: "5 mins ago" },
            { action: "Report generated", user: "Admin Officer", time: "1 hour ago" },
            { action: "Student enrollment", user: "Admissions", time: "3 hours ago" },
            { action: "System backup", user: "System", time: "6 hours ago" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold text-sm text-gray-900">{item.action}</p>
                <p className="text-xs text-gray-600">By {item.user}</p>
              </div>
              <span className="text-xs text-gray-500">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

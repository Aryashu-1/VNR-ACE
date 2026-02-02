"use client"

import { User, Mail, Phone, MapPin, Calendar, Edit2, LogOut } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600 mt-1">Manage your account information and preferences</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Cover */}
        <div className="h-32 bg-gradient-to-r from-blue-600 to-cyan-400"></div>

        {/* Profile Content */}
        <div className="px-6 pb-6">
          {/* Avatar & Basic Info */}
          <div className="flex flex-col md:flex-row md:items-end md:gap-4 -mt-16 mb-6">
            <div className="w-32 h-32 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold border-4 border-white shadow-lg">
              AD
            </div>
            <div className="mt-4 md:mt-0">
              <h2 className="text-2xl font-bold text-gray-900">Alex Developer</h2>
              <p className="text-gray-600">Faculty Member • Computer Science</p>
              <p className="text-sm text-gray-500 mt-1">Member since January 2023</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-smooth">
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-smooth">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-6"></div>

          {/* Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-5 h-5 text-blue-600" />
                <label className="font-semibold text-gray-900">Email</label>
              </div>
              <p className="text-gray-700 ml-7">alex.developer@vnrace.edu</p>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-5 h-5 text-blue-600" />
                <label className="font-semibold text-gray-900">Phone</label>
              </div>
              <p className="text-gray-700 ml-7">+1 (555) 123-4567</p>
            </div>

            {/* Department */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <User className="w-5 h-5 text-blue-600" />
                <label className="font-semibold text-gray-900">Department</label>
              </div>
              <p className="text-gray-700 ml-7">Computer Science & Engineering</p>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-5 h-5 text-blue-600" />
                <label className="font-semibold text-gray-900">Location</label>
              </div>
              <p className="text-gray-700 ml-7">Hyderabad, India</p>
            </div>

            {/* Join Date */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-5 h-5 text-blue-600" />
                <label className="font-semibold text-gray-900">Joined</label>
              </div>
              <p className="text-gray-700 ml-7">January 15, 2023</p>
            </div>

            {/* Role */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <User className="w-5 h-5 text-blue-600" />
                <label className="font-semibold text-gray-900">Role</label>
              </div>
              <p className="text-gray-700 ml-7">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  Faculty
                </span>
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-6"></div>

          {/* Additional Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900">Account Preferences</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">Email Notifications</p>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-blue-600" />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">Two-Factor Authentication</p>
                <input type="checkbox" className="w-4 h-4 accent-blue-600" />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">Public Profile</p>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

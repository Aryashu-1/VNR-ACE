// Mock authentication utility - Replace with real auth when implementing
export type UserRole = "student" | "faculty" | "admin"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

// Mock user data - In production, use real authentication
const mockUsers: Record<string, User> = {
  student1: {
    id: "1",
    name: "Arjun Sharma",
    email: "arjun@student.edu",
    role: "student",
    avatar: "AS",
  },
  faculty1: {
    id: "2",
    name: "Prof. Rajesh Kumar",
    email: "rajesh@faculty.edu",
    role: "faculty",
    avatar: "RK",
  },
  admin1: {
    id: "3",
    name: "Admin Officer",
    email: "admin@vnr.edu",
    role: "admin",
    avatar: "AO",
  },
}

export function getUser(id: string): User | null {
  return mockUsers[id] || null
}

export function canAccessRoute(userRole: UserRole, route: string): boolean {
  const accessRules: Record<UserRole, string[]> = {
    student: ["/dashboard", "/dashboard/admissions"],
    faculty: [
      "/dashboard",
      "/dashboard/admissions",
      "/dashboard/classwork",
      "/dashboard/placements",
      "/dashboard/reports",
    ],
    admin: [
      "/dashboard",
      "/dashboard/admissions",
      "/dashboard/classwork",
      "/dashboard/placements",
      "/dashboard/reports",
      "/dashboard/admin",
    ],
  }

  return accessRules[userRole]?.some((allowedRoute) => route.startsWith(allowedRoute)) || false
}

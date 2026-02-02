interface CircularProgressProps {
  percentage: number
  label?: string
}

export function CircularProgress({ percentage, label }: CircularProgressProps) {
  const radius = 56
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference * (1 - percentage / 100)

  return (
    <div className="relative w-32 h-32">
      <svg className="transform -rotate-90 w-32 h-32">
        <circle cx="64" cy="64" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="8" />
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke="#0E6FFF"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-2xl font-bold text-gray-900">{percentage}%</p>
      </div>
      {label && <p className="text-center text-xs text-gray-600 mt-2">{label}</p>}
    </div>
  )
}

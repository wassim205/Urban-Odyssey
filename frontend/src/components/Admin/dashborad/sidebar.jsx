import { Home, Users, MapPin, MessageSquare, BarChart2, Settings, LogOut } from "lucide-react"
import { cn } from "./../../../lib/utils"

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "users", label: "Users", icon: Users },
    { id: "places", label: "Places", icon: MapPin },
    { id: "reviews", label: "Reviews", icon: MessageSquare },
    { id: "analytics", label: "Analytics", icon: BarChart2 },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="hidden md:flex flex-col w-64 bg-emerald-800 text-white">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Urban Odyssey</h1>
        <p className="text-sm text-emerald-200">Admin Dashboard</p>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="p-2 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "flex items-center w-full px-4 py-3 rounded-lg text-left transition-colors",
                    activeTab === item.id ? "bg-emerald-700 text-white" : "text-emerald-100 hover:bg-emerald-700/50",
                  )}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.label}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="p-4 border-t border-emerald-700">
        <a href="/logout" className="flex items-center w-full px-4 py-2 text-emerald-100 hover:bg-emerald-700 rounded-lg transition-colors">
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </a>
      </div>
    </div>
  )
}

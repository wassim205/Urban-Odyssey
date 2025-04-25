import { Bell, Search, Menu } from "lucide-react"
import { useState } from "react"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        <div className="hidden md:flex items-center flex-1 px-4">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="search"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Search..."
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full text-gray-500 hover:text-gray-600 hover:bg-gray-100 relative">
            <Bell className="h-6 w-6" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center">
            <img className="h-8 w-8 rounded-full" src="/placeholder.svg?height=32&width=32" alt="Admin" />
            <div className="ml-3 hidden md:block">
              <p className="text-sm font-medium text-gray-700">Admin User</p>
              <p className="text-xs text-gray-500">admin@urbanodyssey.com</p>
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-emerald-800 text-white">
          <nav className="px-2 pt-2 pb-4 space-y-1">
            {["Dashboard", "Users", "Places", "Reviews", "Analytics", "Settings"].map((item) => (
              <a key={item} href="#" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-700">
                {item}
              </a>
            ))}
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-700">
              Logout
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

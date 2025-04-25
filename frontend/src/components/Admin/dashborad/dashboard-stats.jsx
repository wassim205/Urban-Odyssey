import { Users, MapPin, MessageSquare, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./../ui/card/index"
import RecentActivities from "./recent-activites"
import PopularPlaces from "./popular-places"

export default function DashboardStats() {
  // Static data for demonstration
  const stats = [
    {
      title: "Total Users",
      value: "2,856",
      icon: Users,
      change: "+12%",
      trend: "up",
      description: "from last month",
    },
    {
      title: "Places",
      value: "1,245",
      icon: MapPin,
      change: "+23%",
      trend: "up",
      description: "from last month",
    },
    {
      title: "Reviews",
      value: "5,432",
      icon: MessageSquare,
      change: "+18%",
      trend: "up",
      description: "from last month",
    },
    {
      title: "Visits",
      value: "18.6K",
      icon: TrendingUp,
      change: "+28%",
      trend: "up",
      description: "from last month",
    },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">{stat.title}</CardTitle>
                <Icon className="h-5 w-5 text-emerald-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">
                  <span className={stat.trend === "up" ? "text-emerald-500" : "text-red-500"}>{stat.change}</span>{" "}
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivities />
        <PopularPlaces />
      </div>
    </div>
  )
}

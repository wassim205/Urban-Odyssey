import { Card, CardContent, CardHeader, CardTitle } from "./../ui/card/index"

export default function RecentActivities() {
  // Static data for demonstration
  const activities = [
    {
      user: "Sophie Martin",
      action: "added a new review",
      target: "Café des Artistes",
      time: "2 minutes ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      user: "Thomas Dubois",
      action: "registered",
      target: "",
      time: "15 minutes ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      user: "Emma Laurent",
      action: "added a new place",
      target: "Le Petit Marché",
      time: "1 hour ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      user: "Lucas Bernard",
      action: "updated their profile",
      target: "",
      time: "2 hours ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      user: "Chloé Moreau",
      action: "saved a place to favorites",
      target: "Jardin des Plantes",
      time: "3 hours ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-4">
              <img src={activity.avatar || "/placeholder.svg"} alt={activity.user} className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium text-gray-900">
                  <span className="font-semibold">{activity.user}</span> {activity.action}
                  {activity.target && <span className="font-medium"> {activity.target}</span>}
                </p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

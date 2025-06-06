import { Users, MapPin, MessageSquare, TrendingUp, FolderHeart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./../ui/card/index";
import RecentActivities from "./recent-activites";
import PopularPlaces from "./popular-places";
import axiosConfig from "./../../../config/axiosConfig";
import { useState, useEffect } from "react";
// import toast from "sonner";

export default function DashboardStats() {
  const [stats, setStats] = useState([]);
 
  const fetchStatistique = async () => {
    try {
      const response = await axiosConfig.get("dashboard");
      const data = response.data;

      const formattedStats = [
        {
          title: "Total Users",
          value: data.total_users,
          icon: Users,
          change: "+12%",
          trend: "up",
          description: "from last month",
        },
        {
          title: "Places",
          value: data.total_places,
          icon: MapPin,
          change: "+23%",
          trend: "up",
          description: "from last month",
        },
        {
          title: "Reviews",
          value: data.total_reviews,
          icon: MessageSquare,
          change: "+18%",
          trend: "up",
          description: "from last month",
        },
        {
          title: "Favorites",
          value: data.total_favorites,
          icon: FolderHeart,
          change: "+28%",
          trend: "up",
          description: "from last month",
        },
      ];

      setStats(formattedStats);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };
  useEffect(() => {
    fetchStatistique();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {stat.title}
                </CardTitle>
                <Icon className="h-5 w-5 text-emerald-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">
                  <span
                    className={
                      stat.trend === "up" ? "text-emerald-500" : "text-red-500"
                    }
                  >
                    {stat.change}
                  </span>{" "}
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* <RecentActivities /> */}
        <PopularPlaces />
      </div>
    </div>
  );
}

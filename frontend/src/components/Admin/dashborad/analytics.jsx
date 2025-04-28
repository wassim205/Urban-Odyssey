import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./../ui/card/index"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./../ui/tabs/index"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export default function Analytics() {
  // Static data for demonstration
  const visitsData = [
    { name: "Jan", visits: 4000 },
    { name: "Feb", visits: 3000 },
    { name: "Mar", visits: 2000 },
    { name: "Apr", visits: 2780 },
    { name: "May", visits: 1890 },
    { name: "Jun", visits: 2390 },
    { name: "Jul", visits: 3490 },
    { name: "Aug", visits: 4000 },
    { name: "Sep", visits: 5000 },
    { name: "Oct", visits: 6000 },
    { name: "Nov", visits: 7000 },
    { name: "Dec", visits: 8000 },
  ]

  const userActivityData = [
    { name: "Mon", reviews: 20, favorites: 40, visits: 100 },
    { name: "Tue", reviews: 30, favorites: 45, visits: 120 },
    { name: "Wed", reviews: 25, favorites: 50, visits: 150 },
    { name: "Thu", reviews: 40, favorites: 55, visits: 180 },
    { name: "Fri", reviews: 50, favorites: 60, visits: 200 },
    { name: "Sat", reviews: 60, favorites: 65, visits: 250 },
    { name: "Sun", reviews: 45, favorites: 70, visits: 220 },
  ]

  const categoryData = [
    { name: "Monuments", value: 35 },
    { name: "Museums", value: 25 },
    { name: "Parks", value: 15 },
    { name: "Restaurants", value: 10 },
    { name: "Cafés", value: 8 },
    { name: "Shops", value: 7 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d"]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Analytics</h2>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="places">Places</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Visits</CardTitle>
                <CardDescription>Total visits per month in the current year</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={visitsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="visits" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Place Categories</CardTitle>
                <CardDescription>Distribution of places by category</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Weekly User Activity</CardTitle>
              <CardDescription>User engagement metrics for the past week</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userActivityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="reviews" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="favorites" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="visits" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
              <CardDescription>New user registrations over time</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Detailed user analytics will be implemented here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="places" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Popular Places</CardTitle>
              <CardDescription>Most visited places and engagement metrics</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Detailed place analytics will be implemented here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Review Metrics</CardTitle>
              <CardDescription>Review volume and sentiment analysis</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Detailed review analytics will be implemented here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

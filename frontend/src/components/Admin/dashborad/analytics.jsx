import { useEffect, useState } from "react";
import axios from "../../../config/axiosConfig";
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
  const [visitsData, setVisitsData] = useState([]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d"];
  

  

  useEffect(() => {
    const fetchMonthlyVisits = async () => {
      try {
        const response = await axios.get("/analytics/monthly-visits");
        console.log(response.data);
        
        setVisitsData(response.data);
      } catch (error) {
        console.error("Error fetching monthly visits analytics:", error);
      }
    };
  
    fetchMonthlyVisits();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Analytics</h2>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
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

           
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

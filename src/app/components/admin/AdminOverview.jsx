import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Users, 
  Activity, 
  TrendingUp, 
  AlertTriangle,
  Smile,
  Frown,
  Zap,
  Heart
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getDashboardStats, getTrendData, getDepartmentStats, getBurnoutAlerts } from '../../../services/adminService';

export const AdminOverview = () => {
  const [stats, setStats] = useState(null);
  const [trendData, setTrendData] = useState([]);
  const [deptStats, setDeptStats] = useState([]);
  const [burnoutAlerts, setBurnoutAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [dashboardData, trends, departments, alerts] = await Promise.all([
        getDashboardStats(),
        getTrendData(7),
        getDepartmentStats(),
        getBurnoutAlerts()
      ]);
      
      setStats({
        totalEmployees: dashboardData.totalEmployees,
        totalCheckIns: dashboardData.totalCheckIns,
        avgHappiness: parseFloat(dashboardData.averages?.happiness || 0),
        avgStress: parseFloat(dashboardData.averages?.stress || 0),
        avgMotivation: parseFloat(dashboardData.averages?.motivation || 0)
      });
      setTrendData(trends);
      setDeptStats(departments.map(dept => ({
        department: dept.department,
        employeeCount: dept.employeeCount,
        checkInCount: dept.checkInCount,
        avgHappiness: dept.averages.happiness,
        avgStress: dept.averages.stress,
        avgMotivation: dept.averages.motivation
      })));
      setBurnoutAlerts(alerts);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  if (loading) {
    return <div className="text-center py-8">Loading dashboard...</div>;
  }

  if (!stats) {
    return <div className="text-center py-8">Failed to load dashboard data</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold mb-2">Dashboard Overview 📊</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Real-time insights into employee wellbeing and engagement
        </p>
      </div>

      {/* Burnout Alerts */}
      {burnoutAlerts && burnoutAlerts.length > 0 && (
        <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300">
              <AlertTriangle className="w-5 h-5" />
              Burnout Alerts ({burnoutAlerts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {burnoutAlerts.map((alert, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-white dark:bg-gray-950 rounded-lg">
                  <div>
                    <p className="font-medium">{alert.employee?.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{alert.employee?.department}</p>
                  </div>
                  <Badge variant="destructive">{alert.message}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="w-4 h-4 opacity-75" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalEmployees}</div>
            <p className="text-xs opacity-75 mt-1">Active team members 👥</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Check-ins</CardTitle>
            <Activity className="w-4 h-4 opacity-75" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalCheckIns}</div>
            <p className="text-xs opacity-75 mt-1">Mood entries logged 📝</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg Happiness</CardTitle>
            <Smile className="w-4 h-4 opacity-75" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.avgHappiness.toFixed(1)}/5</div>
            <p className="text-xs opacity-75 mt-1">Team happiness level 😊</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg Motivation</CardTitle>
            <Zap className="w-4 h-4 opacity-75" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.avgMotivation.toFixed(1)}/5</div>
            <p className="text-xs opacity-75 mt-1">Team motivation 🚀</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              7-Day Wellbeing Trends
            </CardTitle>
            <CardDescription>Track happiness, stress, and motivation over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="happiness" stroke="#10b981" strokeWidth={2} name="Happiness 😊" />
                <Line type="monotone" dataKey="stress" stroke="#ef4444" strokeWidth={2} name="Stress 😰" />
                <Line type="monotone" dataKey="motivation" stroke="#8b5cf6" strokeWidth={2} name="Motivation 🚀" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Department Happiness
            </CardTitle>
            <CardDescription>Average happiness by department</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={deptStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" angle={-45} textAnchor="end" height={100} />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Bar dataKey="avgHappiness" fill="#8b5cf6" name="Happiness" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Department Stats Table */}
      <Card>
        <CardHeader>
          <CardTitle>Department Statistics 📈</CardTitle>
          <CardDescription>Detailed breakdown by department</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Department</th>
                  <th className="text-left py-3 px-4">Employees</th>
                  <th className="text-left py-3 px-4">Check-ins</th>
                  <th className="text-left py-3 px-4">Happiness</th>
                  <th className="text-left py-3 px-4">Stress</th>
                  <th className="text-left py-3 px-4">Motivation</th>
                </tr>
              </thead>
              <tbody>
                {deptStats.map((dept, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50 dark:hover:bg-gray-900">
                    <td className="py-3 px-4 font-medium">{dept.department}</td>
                    <td className="py-3 px-4">{dept.employeeCount}</td>
                    <td className="py-3 px-4">{dept.checkInCount}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300">
                        {dept.avgHappiness.toFixed(1)} 😊
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300">
                        {dept.avgStress.toFixed(1)} 😰
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300">
                        {dept.avgMotivation.toFixed(1)} 🚀
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
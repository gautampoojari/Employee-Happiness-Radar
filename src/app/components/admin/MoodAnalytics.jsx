import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { TrendingUp, TrendingDown, Activity, AlertTriangle, Clock, User } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getTrendData, getDepartmentStats, getBurnoutAlerts, getEmployees } from '../../../services/adminService';
import api from '../../../services/api';

export const MoodAnalytics = () => {
  const [trendData, setTrendData] = useState([]);
  const [deptStats, setDeptStats] = useState([]);
  const [burnoutAlerts, setBurnoutAlerts] = useState([]);
  const [timeRange, setTimeRange] = useState(7);
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    loadData();
  }, [timeRange]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [trends, departments, alerts, empList] = await Promise.all([
        getTrendData(timeRange),
        getDepartmentStats(),
        getBurnoutAlerts(),
        getEmployees()
      ]);
      
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
      setEmployees(empList);
    } catch (error) {
      console.error('Failed to load mood analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading mood analytics...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Mood & Health Analytics 📊</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Deep dive into employee wellbeing trends and insights
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setTimeRange(7)}
            className={`px-4 py-2 rounded-lg ${timeRange === 7 ? 'bg-purple-600 text-white' : 'bg-gray-200 dark:bg-gray-800'}`}
          >
            7 Days
          </button>
          <button
            onClick={() => setTimeRange(14)}
            className={`px-4 py-2 rounded-lg ${timeRange === 14 ? 'bg-purple-600 text-white' : 'bg-gray-200 dark:bg-gray-800'}`}
          >
            14 Days
          </button>
          <button
            onClick={() => setTimeRange(30)}
            className={`px-4 py-2 rounded-lg ${timeRange === 30 ? 'bg-purple-600 text-white' : 'bg-gray-200 dark:bg-gray-800'}`}
          >
            30 Days
          </button>
        </div>
      </div>

      {/* Burnout Alerts */}
      {burnoutAlerts.length > 0 && (
        <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300">
              <AlertTriangle className="w-5 h-5" />
              Burnout Risk Alerts ({burnoutAlerts.length})
            </CardTitle>
            <CardDescription>Employees showing signs of burnout</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {burnoutAlerts.map((alert, idx) => (
                <div key={idx} className="p-4 bg-white dark:bg-gray-950 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium">{alert.employee?.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{alert.employee?.department}</p>
                    </div>
                    <Badge variant="destructive">{alert.severity}</Badge>
                  </div>
                  <p className="text-sm text-red-700 dark:text-red-300">{alert.message}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Trend Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Happiness Trend</CardTitle>
            <CardDescription>Track overall happiness levels</CardDescription>
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
                <Line type="monotone" dataKey="happiness" stroke="#10b981" strokeWidth={3} name="Happiness 😊" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Stress Levels</CardTitle>
            <CardDescription>Monitor stress patterns</CardDescription>
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
                <Line type="monotone" dataKey="stress" stroke="#ef4444" strokeWidth={3} name="Stress 😰" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Motivation Levels</CardTitle>
            <CardDescription>Track team motivation</CardDescription>
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
                <Line type="monotone" dataKey="motivation" stroke="#8b5cf6" strokeWidth={3} name="Motivation 🚀" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Comparison</CardTitle>
            <CardDescription>Compare metrics across departments</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={deptStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" angle={-45} textAnchor="end" height={100} />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="avgHappiness" fill="#10b981" name="Happiness" />
                <Bar dataKey="avgStress" fill="#ef4444" name="Stress" />
                <Bar dataKey="avgMotivation" fill="#8b5cf6" name="Motivation" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Department Details */}
      <Card>
        <CardHeader>
          <CardTitle>Department Analytics</CardTitle>
          <CardDescription>Detailed wellbeing metrics by department</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {deptStats.map((dept, idx) => (
              <div key={idx} className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-lg">{dept.department}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {dept.employeeCount} employees • {dept.checkInCount} check-ins
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-white dark:bg-gray-950 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{dept.avgHappiness.toFixed(1)}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Happiness 😊</p>
                  </div>
                  <div className="text-center p-3 bg-white dark:bg-gray-950 rounded-lg">
                    <p className="text-2xl font-bold text-red-600">{dept.avgStress.toFixed(1)}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Stress 😰</p>
                  </div>
                  <div className="text-center p-3 bg-white dark:bg-gray-950 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">{dept.avgMotivation.toFixed(1)}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Motivation 🚀</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
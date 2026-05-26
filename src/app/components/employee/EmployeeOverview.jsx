import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Smile, 
  Frown, 
  Zap, 
  Award, 
  TrendingUp,
  Calendar,
  Activity
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAuth } from '../AuthContext';
import { getMoodCheckIns, getEmployeeStreak, getEmployeeTrendData } from '../../../services/moodService';

export const EmployeeOverview = () => {
  const { employee } = useAuth();
  const [checkIns, setCheckIns] = useState([]);
  const [streak, setStreak] = useState(0);
  const [trendData, setTrendData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (employee) {
      loadData();
    }
  }, [employee]);

  const loadData = async () => {
    try {
      setLoading(true);
      const empCheckIns = await getMoodCheckIns();
      setCheckIns(empCheckIns);
      const streakCount = await getEmployeeStreak();
      setStreak(streakCount);
      const trends = await getEmployeeTrendData(14);
      setTrendData(trends);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate averages
  const avgHappiness = checkIns.length > 0
    ? checkIns.reduce((sum, c) => sum + c.happiness, 0) / checkIns.length
    : 0;
  
  const avgStress = checkIns.length > 0
    ? checkIns.reduce((sum, c) => sum + c.stress, 0) / checkIns.length
    : 0;
  
  const avgMotivation = checkIns.length > 0
    ? checkIns.reduce((sum, c) => sum + c.motivation, 0) / checkIns.length
    : 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Your Wellbeing Dashboard 🌟</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Track your mood, build streaks, and improve your wellbeing
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className={`bg-gradient-to-br ${
          streak > 0 
            ? 'from-yellow-400 to-orange-500' 
            : 'from-gray-400 to-gray-500'
        } text-white shadow-lg`}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Your Streak</CardTitle>
            <Award className="w-4 h-4 opacity-75" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {streak} {streak > 0 ? '🔥' : '💤'}
            </div>
            <p className="text-xs opacity-75 mt-1">
              {streak === 0 ? 'Start your streak today!' : 
               streak === 1 ? 'Great start! Keep it up!' :
               streak < 7 ? 'Building momentum!' :
               streak < 30 ? 'Awesome consistency! 🌟' :
               'Legendary streak! 🏆'}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg Happiness</CardTitle>
            <Smile className="w-4 h-4 opacity-75" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{avgHappiness.toFixed(1)}/5</div>
            <p className="text-xs opacity-75 mt-1">Keep smiling! 😊</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg Stress</CardTitle>
            <Frown className="w-4 h-4 opacity-75" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{avgStress.toFixed(1)}/5</div>
            <p className="text-xs opacity-75 mt-1">Take it easy 🧘</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg Motivation</CardTitle>
            <Zap className="w-4 h-4 opacity-75" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{avgMotivation.toFixed(1)}/5</div>
            <p className="text-xs opacity-75 mt-1">Stay energized! ⚡</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Your Wellbeing Trends (14 Days)
            </CardTitle>
            <CardDescription>Track your mood patterns over time</CardDescription>
          </CardHeader>
          <CardContent>
            {trendData.length > 0 ? (
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
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                No data yet. Start checking in to see your trends! 📊
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Your Activity
            </CardTitle>
            <CardDescription>Check-in statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
                <p className="text-5xl font-bold text-green-600">{checkIns.length}</p>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Total Check-ins</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <p className="text-2xl font-bold">{streak}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Current Streak 🔥</p>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <p className="text-2xl font-bold">{employee?.department}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Department 🏢</p>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <p className="text-sm font-medium text-yellow-900 dark:text-yellow-100 mb-2">
                  💡 Pro Tip
                </p>
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  Check in daily to build your streak and track your wellbeing journey!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Check-ins */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Mood History
          </CardTitle>
          <CardDescription>All your mood check-ins with dates and times</CardDescription>
        </CardHeader>
        <CardContent>
          {checkIns.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No check-ins yet. Head to the Check-in tab to get started! 🚀
            </div>
          ) : (
            <div className="space-y-3">
              {checkIns.map((checkIn, idx) => (
                <div key={idx} className="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-sm font-medium">
                        {new Date(checkIn.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        Submitted: {new Date(checkIn.createdAt).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true
                        })}
                      </p>
                    </div>
                    <Badge variant="outline">Day {checkIns.length - idx}</Badge>
                  </div>
                  <div className="grid grid-cols-4 gap-4 mb-3">
                    <div className="text-center p-2 bg-white dark:bg-gray-950 rounded">
                      <p className="text-2xl font-bold text-green-600">{checkIn.happiness}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Happiness 😊</p>
                    </div>
                    <div className="text-center p-2 bg-white dark:bg-gray-950 rounded">
                      <p className="text-2xl font-bold text-red-600">{checkIn.stress}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Stress 😰</p>
                    </div>
                    <div className="text-center p-2 bg-white dark:bg-gray-950 rounded">
                      <p className="text-2xl font-bold text-purple-600">{checkIn.motivation}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Motivation 🚀</p>
                    </div>
                    <div className="text-center p-2 bg-white dark:bg-gray-950 rounded">
                      <p className="text-2xl font-bold text-blue-600">{checkIn.hydration}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Water 💧</p>
                    </div>
                  </div>
                  {checkIn.notes && (
                    <div className="mt-3 text-sm text-gray-700 dark:text-gray-300 p-3 bg-white dark:bg-gray-950 rounded">
                      <p className="font-medium text-xs text-gray-500 mb-1">Notes:</p>
                      <p>💭 {checkIn.notes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
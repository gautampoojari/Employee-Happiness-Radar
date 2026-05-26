import React, { useState } from 'react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useAuth } from './AuthContext';
import { 
  LayoutDashboard, 
  Heart, 
  MessageSquare, 
  FileText, 
  LogOut,
  Moon,
  Sun
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { EmployeeOverview } from './employee/EmployeeOverview';
import { MoodCheckIn } from './employee/MoodCheckIn';
import { EmployeeSurveys } from './employee/EmployeeSurveys';
import { EmployeeFeedback } from './employee/EmployeeFeedback';

export const EmployeeDashboard = () => {
  const { employee, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-green-900/20 dark:to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 dark:bg-gray-950/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center text-white text-xl">
                💚
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Happiness Radar
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Hey {employee?.name}! 👋
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              <Button
                variant="outline"
                onClick={logout}
                className="gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white dark:bg-gray-950 p-1 grid grid-cols-2 md:grid-cols-4 gap-1">
            <TabsTrigger value="overview" className="gap-2">
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden md:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="checkin" className="gap-2">
              <Heart className="w-4 h-4" />
              <span className="hidden md:inline">Check-in</span>
            </TabsTrigger>
            <TabsTrigger value="surveys" className="gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden md:inline">Surveys</span>
            </TabsTrigger>
            <TabsTrigger value="feedback" className="gap-2">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden md:inline">Feedback</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <EmployeeOverview />
          </TabsContent>

          <TabsContent value="checkin" className="space-y-6">
            <MoodCheckIn />
          </TabsContent>

          <TabsContent value="surveys" className="space-y-6">
            <EmployeeSurveys />
          </TabsContent>

          <TabsContent value="feedback" className="space-y-6">
            <EmployeeFeedback />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

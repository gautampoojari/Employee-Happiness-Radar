import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight, Users, Heart, TrendingUp, Shield, Zap, Award } from 'lucide-react';

export const LandingPage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-6 text-5xl">
            💚
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Employee Happiness Radar
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Transform workplace wellbeing with real-time mood tracking, anonymous feedback, and actionable insights. 
            Build a happier, healthier, and more productive team. ✨
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-xl transition-shadow">
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                😊
              </div>
              <h3 className="text-xl font-bold mb-2">Mood Tracking</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Daily check-ins for happiness, stress, and motivation levels
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow">
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Analytics</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Visualize trends and detect burnout early with powerful insights
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow">
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                🎭
              </div>
              <h3 className="text-xl font-bold mb-2">Anonymous Feedback</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Safe space for employees to share honest thoughts
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow">
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Streak System</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Gamification to encourage daily participation and consistency
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow">
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                📋
              </div>
              <h3 className="text-xl font-bold mb-2">Custom Surveys</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Create and manage surveys with rating and text questions
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow">
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Burnout Detection</h3>
              <p className="text-gray-600 dark:text-gray-400">
                AI-powered alerts when employees show signs of burnout
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Buttons */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 border-2 border-purple-200 dark:border-purple-800">
            <CardContent className="pt-8 pb-8">
              <h2 className="text-2xl font-bold text-center mb-6">Get Started Today 🚀</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  onClick={() => onNavigate('admin')}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg py-6"
                  size="lg"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Admin Portal
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                
                <Button 
                  onClick={() => onNavigate('employee')}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-lg py-6"
                  size="lg"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Employee Portal
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">100%</p>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Privacy Protected</p>
          </div>
          <div>
            <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Real-time</p>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Analytics</p>
          </div>
          <div>
            <p className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">Easy</p>
            <p className="text-gray-600 dark:text-gray-400 mt-1">To Use</p>
          </div>
          <div>
            <p className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">Powerful</p>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Insights</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-gray-600 dark:text-gray-400">
          <p className="text-sm">
            Built with ❤️ using React, Tailwind CSS, and Recharts
          </p>
          <p className="text-xs mt-2">
            Demo application - Data stored locally in your browser
          </p>
        </div>
      </div>
    </div>
  );
};

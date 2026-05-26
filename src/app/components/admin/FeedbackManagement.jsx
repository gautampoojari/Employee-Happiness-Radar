import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { MessageSquare, User, Calendar, Filter } from 'lucide-react';
import { getAllFeedback } from '../../../services/adminService';

export const FeedbackManagement = () => {
  const [feedback, setFeedback] = useState([]);
  const [filter, setFilter] = useState('all'); // all, anonymous, identified
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeedback();
  }, []);

  const loadFeedback = async () => {
    try {
      setLoading(true);
      const feedbackData = await getAllFeedback();
      setFeedback(feedbackData);
    } catch (error) {
      console.error('Failed to load feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredFeedback = feedback.filter(f => {
    if (filter === 'anonymous') return f.isAnonymous;
    if (filter === 'identified') return !f.isAnonymous;
    return true;
  });

  if (loading) {
    return <div className="text-center py-8">Loading feedback...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Feedback Management 💬</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Review employee feedback and suggestions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-white dark:bg-gray-950"
          >
            <option value="all">All Feedback</option>
            <option value="anonymous">Anonymous Only</option>
            <option value="identified">Identified Only</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Feedback</p>
                <p className="text-3xl font-bold">{feedback.length}</p>
              </div>
              <MessageSquare className="w-12 h-12 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Anonymous</p>
                <p className="text-3xl font-bold">{feedback.filter(f => f.isAnonymous).length}</p>
              </div>
              <User className="w-12 h-12 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">This Week</p>
                <p className="text-3xl font-bold">
                  {feedback.filter(f => {
                    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
                    return new Date(f.createdAt).getTime() > weekAgo;
                  }).length}
                </p>
              </div>
              <Calendar className="w-12 h-12 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {filteredFeedback.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <MessageSquare className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 dark:text-gray-400">No feedback yet</p>
            </CardContent>
          </Card>
        ) : (
          filteredFeedback.map((item, idx) => {
            const employee = item.user;
            return (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {item.isAnonymous ? (
                        <>
                          <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white">
                            🎭
                          </div>
                          <div>
                            <p className="font-medium">Anonymous</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Identity hidden</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white">
                            {employee?.name?.charAt(0) || '?'}
                          </div>
                          <div>
                            <p className="font-medium">{employee?.name || 'Unknown'}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{employee?.department}</p>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="text-right">
                      <Badge variant={item.isAnonymous ? 'secondary' : 'outline'}>
                        {item.isAnonymous ? '🎭 Anonymous' : '👤 Identified'}
                      </Badge>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(item.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                    <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                      {item.message}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};
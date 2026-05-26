import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from './../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { KeyRound, Copy, Check, Plus, Trash2, RefreshCw } from 'lucide-react';
import { generateInviteToken, getAdminTokens, getDashboardStats } from '../../../services/adminService';
import { toast } from 'sonner';

export const AdminSettings = () => {
  const [tokens, setTokens] = useState([]);
  const [systemInfo, setSystemInfo] = useState({
    totalEmployees: 0,
    totalCheckIns: 0,
    totalSurveys: 0,
    totalFeedback: 0
  });
  const [newTokenDesc, setNewTokenDesc] = useState('');
  const [copiedToken, setCopiedToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [tokensData, dashboardData] = await Promise.all([
        getAdminTokens(),
        getDashboardStats()
      ]);
      
      setTokens(tokensData);
      setSystemInfo({
        totalEmployees: dashboardData.totalEmployees || 0,
        totalCheckIns: dashboardData.totalCheckIns || 0,
        totalSurveys: dashboardData.totalSurveys || 0,
        totalFeedback: dashboardData.totalFeedback || 0
      });
    } catch (error) {
      console.error('Failed to load settings data:', error);
      toast.error('Failed to load settings data');
    } finally {
      setLoading(false);
    }
  };

  const refreshSystemInfo = async () => {
    try {
      setRefreshing(true);
      const dashboardData = await getDashboardStats();
      setSystemInfo({
        totalEmployees: dashboardData.totalEmployees || 0,
        totalCheckIns: dashboardData.totalCheckIns || 0,
        totalSurveys: dashboardData.totalSurveys || 0,
        totalFeedback: dashboardData.totalFeedback || 0
      });
      toast.success('System information updated! ✅');
    } catch (error) {
      console.error('Failed to refresh system info:', error);
      toast.error('Failed to refresh system information');
    } finally {
      setRefreshing(false);
    }
  };

  const copyToken = (token) => {
    navigator.clipboard.writeText(token);
    setCopiedToken(token);
    toast.success('Token copied to clipboard! 📋');
    setTimeout(() => setCopiedToken(''), 2000);
  };

  const generateNewToken = async () => {
    if (!newTokenDesc) {
      toast.error('Please enter a description for the token');
      return;
    }

    try {
      await generateInviteToken(newTokenDesc);
      toast.success('New admin invite token generated! 🎉');
      setNewTokenDesc('');
      loadData(); // Reload tokens
    } catch (error) {
      console.error('Failed to generate token:', error);
      toast.error(error.message || 'Failed to generate token');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading settings...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Admin Settings ⚙️</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Manage admin invite tokens and view system information
        </p>
      </div>

      {/* Generate New Token */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Generate New Admin Token
          </CardTitle>
          <CardDescription>
            Create invitation tokens for new administrators
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tokenDesc">Token Description</Label>
            <Input
              id="tokenDesc"
              placeholder="e.g., HR Manager Token"
              value={newTokenDesc}
              onChange={(e) => setNewTokenDesc(e.target.value)}
            />
          </div>
          <Button onClick={generateNewToken} className="w-full">
            <KeyRound className="w-4 h-4 mr-2" />
            Generate Token
          </Button>
        </CardContent>
      </Card>

      {/* Existing Tokens */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <KeyRound className="w-5 h-5" />
            Admin Invite Tokens ({tokens.length})
          </CardTitle>
          <CardDescription>
            Manage and view all admin invitation tokens
          </CardDescription>
        </CardHeader>
        <CardContent>
          {tokens.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <KeyRound className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No admin tokens generated yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {tokens.map((token, idx) => {
                const isExpired = new Date(token.expiresAt) < new Date();
                const isUsed = token.isUsed;
                
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg border ${
                      isUsed || isExpired
                        ? 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800'
                        : 'bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium">{token.description || 'Admin Token'}</p>
                          {isUsed ? (
                            <Badge variant="secondary">Used</Badge>
                          ) : isExpired ? (
                            <Badge variant="destructive">Expired</Badge>
                          ) : (
                            <Badge className="bg-green-500">Available</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <code className="text-sm bg-white dark:bg-gray-950 px-3 py-1 rounded border flex-1 overflow-x-auto">
                            {token.token}
                          </code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToken(token.token)}
                            disabled={isUsed || isExpired}
                          >
                            {copiedToken === token.token ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>
                        Expires: {new Date(token.expiresAt).toLocaleDateString()}
                      </span>
                      {token.isUsed && token.usedBy && (
                        <span>
                          Used by: {token.usedBy.name}
                        </span>
                      )}
                      {token.createdBy && (
                        <span>
                          Created by: {token.createdBy.name}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* System Info */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>System Information</CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={refreshSystemInfo}
              disabled={refreshing}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
          </div>
          <CardDescription>
            Real-time statistics from the database
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded border border-purple-200 dark:border-purple-800">
            <span className="text-sm font-medium">👥 Total Employees</span>
            <Badge className="bg-purple-600">{systemInfo.totalEmployees}</Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded border border-blue-200 dark:border-blue-800">
            <span className="text-sm font-medium">😊 Total Check-ins</span>
            <Badge className="bg-blue-600">{systemInfo.totalCheckIns}</Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded border border-green-200 dark:border-green-800">
            <span className="text-sm font-medium">📋 Total Surveys</span>
            <Badge className="bg-green-600">{systemInfo.totalSurveys}</Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded border border-orange-200 dark:border-orange-800">
            <span className="text-sm font-medium">💬 Total Feedback</span>
            <Badge className="bg-orange-600">{systemInfo.totalFeedback}</Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-900/30 rounded border border-yellow-200 dark:border-yellow-800">
            <span className="text-sm font-medium">🔑 Total Admin Tokens</span>
            <Badge className="bg-yellow-600">{tokens.length}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Database Info */}
      <Card className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-900/80 border-gray-200 dark:border-gray-800">
        <CardContent className="pt-6">
          <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
            🗄️ Database Information
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <span>✅</span>
              <span>Database Type: SQLite</span>
            </li>
            <li className="flex items-center gap-2">
              <span>✅</span>
              <span>All data persisted to /server/database.sqlite</span>
            </li>
            <li className="flex items-center gap-2">
              <span>✅</span>
              <span>Automatic backups enabled</span>
            </li>
            <li className="flex items-center gap-2">
              <span>✅</span>
              <span>System information updates in real-time</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

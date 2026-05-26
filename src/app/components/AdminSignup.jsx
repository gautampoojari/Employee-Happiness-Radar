import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { User, Mail, Lock, KeyRound, AlertCircle, CheckCircle, Copy, Check } from 'lucide-react';
import { adminSignup } from '../../services/authService';
import { toast } from 'sonner';

export const AdminSignup = ({ onSwitchToLogin, onSignupSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    inviteToken: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showTokens, setShowTokens] = useState(false);
  const [copiedToken, setCopiedToken] = useState('');

  const availableTokens = [
    { token: 'ADMIN-INVITE-2025-MAIN', desc: '🎯 Main Admin Token' },
    { token: 'ADMIN-INVITE-HR-001', desc: '👥 HR Department Token' },
    { token: 'ADMIN-INVITE-EXEC-001', desc: '💼 Executive Token' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const copyToken = (token) => {
    navigator.clipboard.writeText(token);
    setCopiedToken(token);
    setFormData({ ...formData, inviteToken: token });
    setTimeout(() => setCopiedToken(''), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword || !formData.inviteToken) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    const result = await adminSignup(
      formData.name,
      formData.email,
      formData.password,
      formData.inviteToken
    );

    if (result.success) {
      toast.success('🎉 Admin account created successfully! Please login with your credentials.');
      onSignupSuccess();
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-3xl">
              ✨
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Create Admin Account
          </CardTitle>
          <CardDescription className="text-base">
            You'll need an invite token to create an admin account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-200">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Available Tokens Info */}
            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <button
                type="button"
                onClick={() => setShowTokens(!showTokens)}
                className="w-full flex items-center justify-between text-sm font-medium text-purple-900 dark:text-purple-100 mb-2"
              >
                <span className="flex items-center gap-2">
                  🎫 Available Admin Tokens
                </span>
                <span>{showTokens ? '▼' : '▶'}</span>
              </button>
              
              {showTokens && (
                <div className="space-y-2 mt-3">
                  {availableTokens.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-white dark:bg-gray-800 p-2 rounded border border-purple-200 dark:border-purple-700">
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">{item.desc}</div>
                        <code className="text-xs font-mono text-purple-700 dark:text-purple-300 break-all">{item.token}</code>
                      </div>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToken(item.token)}
                        className="ml-2 flex-shrink-0"
                      >
                        {copiedToken === item.token ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@company.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="inviteToken" className="flex items-center gap-2">
                <KeyRound className="w-4 h-4" />
                Admin Invite Token
              </Label>
              <Input
                id="inviteToken"
                name="inviteToken"
                type="text"
                placeholder="ADMIN-INVITE-XXXX-XXXX"
                value={formData.inviteToken}
                onChange={handleChange}
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Admin Account 🎉'}
            </Button>

            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium"
              >
                Sign in
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
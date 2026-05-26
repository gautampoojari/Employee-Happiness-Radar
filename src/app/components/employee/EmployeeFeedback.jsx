import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { MessageSquare, Send, CheckCircle } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { submitFeedback } from '../../../services/feedbackService';
import { toast } from 'sonner';

export const EmployeeFeedback = () => {
  const { employee } = useAuth();
  const [feedback, setFeedback] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!feedback.trim()) {
      toast.error('Please enter your feedback');
      return;
    }

    if (feedback.trim().length < 10) {
      toast.error('Feedback must be at least 10 characters long');
      return;
    }

    setIsSubmitting(true);

    try {
      await submitFeedback(feedback, isAnonymous);
      toast.success(
        isAnonymous 
          ? 'Anonymous feedback submitted! 🎭' 
          : 'Feedback submitted! Thank you for sharing 🎉'
      );
      setFeedback('');
      setIsAnonymous(false);
    } catch (error) {
      toast.error(error.message || 'Failed to submit feedback');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Share Your Feedback 💬</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Your voice matters! Share suggestions, concerns, or praise
        </p>
      </div>

      <Card className="border-2 border-purple-200 dark:border-purple-800">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-purple-600" />
            Feedback Form
          </CardTitle>
          <CardDescription>
            Share your thoughts, ideas, or concerns with leadership
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Anonymous Toggle */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-xl">
                  {isAnonymous ? '🎭' : '👤'}
                </div>
                <div>
                  <Label htmlFor="anonymous" className="text-base font-medium cursor-pointer">
                    Submit as Anonymous
                  </Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {isAnonymous 
                      ? 'Your identity will be hidden' 
                      : 'Your name will be shown to admins'}
                  </p>
                </div>
              </div>
              <Switch
                id="anonymous"
                checked={isAnonymous}
                onCheckedChange={setIsAnonymous}
              />
            </div>

            {/* Feedback Textarea */}
            <div className="space-y-2">
              <Label htmlFor="feedback" className="text-base font-medium">
                Your Feedback
              </Label>
              <Textarea
                id="feedback"
                placeholder="Share your thoughts, suggestions, concerns, or any feedback you have...

Examples:
• Suggestions for improving workplace culture
• Recognition for a colleague or team
• Concerns about processes or policies
• Ideas for new initiatives
• Any other thoughts you'd like to share"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={12}
                className="resize-none"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {feedback.length} characters
              </p>
            </div>

            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg py-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                'Submitting...'
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  {isAnonymous ? 'Submit Anonymously 🎭' : 'Submit Feedback 💬'}
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/30 border-green-200 dark:border-green-800">
          <CardContent className="pt-6">
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              ✅ What to Share
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span>💡</span>
                <span>Ideas for improvement</span>
              </li>
              <li className="flex items-start gap-2">
                <span>🎉</span>
                <span>Positive experiences</span>
              </li>
              <li className="flex items-start gap-2">
                <span>🤝</span>
                <span>Team collaboration suggestions</span>
              </li>
              <li className="flex items-start gap-2">
                <span>⚠️</span>
                <span>Concerns or issues</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/30 border-purple-200 dark:border-purple-800">
          <CardContent className="pt-6">
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              🔒 Privacy & Safety
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 text-purple-600" />
                <span>All feedback is reviewed by leadership</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 text-purple-600" />
                <span>Anonymous feedback protects your identity</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 text-purple-600" />
                <span>Your input helps shape workplace culture</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 text-purple-600" />
                <span>Be respectful and constructive</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Guidelines */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800">
        <CardContent className="pt-6">
          <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
            📝 Feedback Guidelines
          </h3>
          <div className="space-y-2 text-sm">
            <p className="flex items-start gap-2">
              <span>1.</span>
              <span><strong>Be Specific:</strong> Provide details and examples to help us understand your perspective</span>
            </p>
            <p className="flex items-start gap-2">
              <span>2.</span>
              <span><strong>Be Constructive:</strong> Focus on solutions and improvements, not just problems</span>
            </p>
            <p className="flex items-start gap-2">
              <span>3.</span>
              <span><strong>Be Respectful:</strong> Maintain professionalism even when discussing concerns</span>
            </p>
            <p className="flex items-start gap-2">
              <span>4.</span>
              <span><strong>Be Honest:</strong> Your authentic feedback helps us make real improvements</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
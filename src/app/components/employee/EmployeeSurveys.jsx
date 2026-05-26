import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { FileText, Star, Send, CheckCircle } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { getSurveys, submitSurveyResponse } from '../../../services/surveyService';
import { toast } from 'sonner';

export const EmployeeSurveys = () => {
  const { employee } = useAuth();
  const [surveys, setSurveys] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSurveys();
  }, []);

  const loadSurveys = async () => {
    try {
      const activeSurveys = await getSurveys(true); // Only active surveys
      setSurveys(activeSurveys);
    } catch (error) {
      console.error('Failed to load surveys:', error);
    }
  };

  const startSurvey = (survey) => {
    setSelectedSurvey(survey);
    setResponses(new Array(survey.questions.length).fill(''));
  };

  const handleResponseChange = (index, value) => {
    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);
  };

  const handleSubmit = async () => {
    // Check if all questions are answered
    const allAnswered = responses.every((r, idx) => {
      const question = selectedSurvey.questions[idx];
      if (question.type === 'rating') {
        // For rating questions, check if value is between 1-5
        return r >= 1 && r <= 5;
      } else {
        // For text questions, check if not empty
        return r && r.trim() !== '';
      }
    });

    if (!allAnswered) {
      toast.error('Please answer all questions before submitting');
      return;
    }

    try {
      setLoading(true);
      await submitSurveyResponse(selectedSurvey.id, responses);
      toast.success('Survey submitted successfully! 🎉 Thank you for your feedback');
      setSelectedSurvey(null);
      setResponses([]);
      loadSurveys();
    } catch (error) {
      toast.error(error.message || 'Failed to submit survey');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel? Your responses will be lost.')) {
      setSelectedSurvey(null);
      setResponses([]);
    }
  };

  // If taking a survey
  if (selectedSurvey) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">{selectedSurvey.title}</h2>
            <p className="text-gray-600 dark:text-gray-400">
              {selectedSurvey.questions.length} questions • Be honest and thoughtful
            </p>
          </div>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
        </div>

        <Card>
          <CardContent className="pt-6 space-y-6">
            {selectedSurvey.questions.map((question, idx) => (
              <div key={idx} className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-lg mb-1">{question.question}</p>
                    <Badge variant="outline" className="text-xs">
                      {question.type === 'rating' ? '⭐ Rating' : '📝 Text'}
                    </Badge>
                  </div>
                </div>

                {question.type === 'rating' ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-3 py-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleResponseChange(idx, star)}
                          className="transition-all hover:scale-125 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-full p-1"
                        >
                          <Star
                            className={`w-14 h-14 transition-all ${ 
                              responses[idx] >= star
                                ? 'fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]'
                                : 'text-gray-300 dark:text-gray-600 hover:text-yellow-300 dark:hover:text-yellow-500'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    {responses[idx] ? (
                      <p className="text-center text-base font-medium text-purple-600 dark:text-purple-400">
                        You rated: <span className="text-lg font-bold">{responses[idx]}</span> / 5 stars ⭐
                      </p>
                    ) : (
                      <p className="text-center text-sm text-gray-500 dark:text-gray-500">
                        Click on a star to rate
                      </p>
                    )}
                  </div>
                ) : (
                  <Textarea
                    placeholder="Type your response here..."
                    value={responses[idx] || ''}
                    onChange={(e) => handleResponseChange(idx, e.target.value)}
                    rows={4}
                    className="mt-2"
                  />
                )}
              </div>
            ))}

            <Button 
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg py-6"
              disabled={loading}
            >
              <Send className="w-5 h-5 mr-2" />
              Submit Survey 🎉
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Survey list
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Available Surveys 📋</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Share your thoughts and help improve the workplace
        </p>
      </div>

      {surveys.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-xl font-medium text-gray-600 dark:text-gray-400 mb-2">
              No Active Surveys
            </p>
            <p className="text-gray-500">
              Check back later for new surveys from your organization
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {surveys.map((survey) => (
            <Card key={survey.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-purple-600" />
                      {survey.title}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {survey.questions.length} questions •{' '}
                      {survey.questions.filter(q => q.type === 'rating').length} rating questions •{' '}
                      {survey.questions.filter(q => q.type === 'text').length} text questions
                    </CardDescription>
                  </div>
                  <Badge className="bg-green-500">Active</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {survey.questions.slice(0, 3).map((q, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {q.type === 'rating' ? '⭐' : '📝'} Q{idx + 1}
                      </Badge>
                    ))}
                    {survey.questions.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{survey.questions.length - 3} more
                      </Badge>
                    )}
                  </div>
                  <Button 
                    onClick={() => startSurvey(survey)}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    Start Survey →
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Info Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-6">
          <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
            ℹ️ About Surveys
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-0.5 text-green-600" />
              <span>Your responses help leadership understand team needs</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-0.5 text-green-600" />
              <span>Be honest and thoughtful in your answers</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-0.5 text-green-600" />
              <span>Your individual responses are seen by admins but used to improve the workplace</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-0.5 text-green-600" />
              <span>New surveys appear here when published by admins</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Plus, Trash2, Eye, Power, PowerOff, Star } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { getAdminSurveys, createSurvey, toggleSurveyStatus, deleteSurvey, getSurveyResponses } from '../../../services/adminService';
import { toast } from 'sonner';

export const SurveyManagement = () => {
  const [surveys, setSurveys] = useState([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newSurvey, setNewSurvey] = useState({
    title: '',
    description: '',
    questions: [{ id: 1, question: '', type: 'rating', min: 1, max: 5 }]
  });
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSurveys();
  }, []);

  const loadSurveys = async () => {
    try {
      setLoading(true);
      const surveysData = await getAdminSurveys();
      setSurveys(surveysData);
    } catch (error) {
      console.error('Failed to load surveys:', error);
      toast.error('Failed to load surveys');
    } finally {
      setLoading(false);
    }
  };

  const handleAddQuestion = () => {
    setNewSurvey({
      ...newSurvey,
      questions: [...newSurvey.questions, { id: newSurvey.questions.length + 1, question: '', type: 'rating', min: 1, max: 5 }]
    });
  };

  const handleRemoveQuestion = (index) => {
    const questions = newSurvey.questions.filter((_, i) => i !== index);
    // Re-number the question IDs
    const renumberedQuestions = questions.map((q, i) => ({ ...q, id: i + 1 }));
    setNewSurvey({ ...newSurvey, questions: renumberedQuestions });
  };

  const handleQuestionChange = (index, field, value) => {
    const questions = [...newSurvey.questions];
    questions[index][field] = value;
    
    // If changing type, ensure proper structure
    if (field === 'type') {
      if (value === 'rating') {
        questions[index].min = 1;
        questions[index].max = 5;
      } else if (value === 'text') {
        // Text questions don't need min/max, but keep them for consistency
        questions[index].min = 1;
        questions[index].max = 5;
      }
    }
    
    setNewSurvey({ ...newSurvey, questions });
  };

  const handleCreateSurvey = async () => {
    if (!newSurvey.title || newSurvey.questions.some(q => !q.question)) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      console.log('Creating survey with data:', {
        title: newSurvey.title,
        description: newSurvey.description,
        questions: newSurvey.questions,
        isActive: true
      });
      
      await createSurvey({
        title: newSurvey.title,
        description: newSurvey.description,
        questions: newSurvey.questions,
        isActive: true
      });
      toast.success('Survey created successfully! 🎉');
      setNewSurvey({ title: '', description: '', questions: [{ id: 1, question: '', type: 'rating', min: 1, max: 5 }] });
      setIsCreateOpen(false);
      loadSurveys();
    } catch (error) {
      console.error('Failed to create survey:', error);
      const errorMessage = error.message || 'Failed to create survey';
      toast.error(errorMessage);
    }
  };

  const handleToggleStatus = async (surveyId) => {
    try {
      await toggleSurveyStatus(surveyId);
      toast.success('Survey status updated');
      loadSurveys();
    } catch (error) {
      console.error('Failed to toggle survey:', error);
      toast.error('Failed to toggle survey status');
    }
  };

  const handleDeleteSurvey = async (surveyId) => {
    if (confirm('Are you sure you want to delete this survey?')) {
      try {
        await deleteSurvey(surveyId);
        toast.success('Survey deleted');
        loadSurveys();
      } catch (error) {
        console.error('Failed to delete survey:', error);
        toast.error('Failed to delete survey');
      }
    }
  };

  const viewResponses = async (survey) => {
    try {
      const data = await getSurveyResponses(survey.id);
      setSelectedSurvey(data.survey);
      setResponses(data.responses || []);
    } catch (error) {
      console.error('Failed to load survey responses:', error);
      toast.error('Failed to load survey responses');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading surveys...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Survey Management 📋</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Create and manage employee surveys
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
              <Plus className="w-4 h-4 mr-2" />
              Create Survey
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Survey</DialogTitle>
              <DialogDescription>Add questions for employees to answer</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Survey Title</Label>
                <Input
                  placeholder="e.g., Q1 Employee Satisfaction Survey"
                  value={newSurvey.title}
                  onChange={(e) => setNewSurvey({ ...newSurvey, title: e.target.value })}
                />
              </div>

              <div>
                <Label>Description (Optional)</Label>
                <Textarea
                  placeholder="Survey description..."
                  value={newSurvey.description}
                  onChange={(e) => setNewSurvey({ ...newSurvey, description: e.target.value })}
                />
              </div>

              <div className="space-y-3">
                <Label>Questions</Label>
                {newSurvey.questions.map((q, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <Input
                          placeholder={`Question ${index + 1}`}
                          value={q.question}
                          onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                        />
                      </div>
                      {newSurvey.questions.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveQuestion(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Label className="text-sm">Type:</Label>
                      <select
                        value={q.type}
                        onChange={(e) => handleQuestionChange(index, 'type', e.target.value)}
                        className="px-3 py-1 border rounded-lg bg-white dark:bg-gray-950 text-sm"
                      >
                        <option value="rating">Rating (1-5 stars) ⭐</option>
                        <option value="text">Text Response 📝</option>
                      </select>
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={handleAddQuestion}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Question
                </Button>
              </div>

              <Button onClick={handleCreateSurvey} className="w-full">
                Create Survey 🎉
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold">{surveys.length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total Surveys</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">{surveys.filter(s => s.isActive).length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Active Surveys</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-600">{surveys.filter(s => !s.isActive).length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Inactive Surveys</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Surveys List */}
      <div className="grid grid-cols-1 gap-4">
        {surveys.map((survey) => {
          return (
            <Card key={survey.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      {survey.title}
                      {survey.isActive ? (
                        <Badge className="bg-green-500">Active</Badge>
                      ) : (
                        <Badge variant="secondary">Inactive</Badge>
                      )}
                    </CardTitle>
                    <CardDescription>
                      {survey.questions.length} questions
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleStatus(survey.id)}
                    >
                      {survey.isActive ? (
                        <PowerOff className="w-4 h-4 text-red-500" />
                      ) : (
                        <Power className="w-4 h-4 text-green-500" />
                      )}
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => viewResponses(survey)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>{survey.title} - Responses</DialogTitle>
                          <DialogDescription>{responses.length} total responses</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          {responses.length === 0 ? (
                            <p className="text-center text-gray-500 py-8">No responses yet</p>
                          ) : (
                            responses.map((response, idx) => (
                              <div key={idx} className="p-4 border rounded-lg space-y-3 bg-white dark:bg-gray-950">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="font-medium text-lg">{response.user?.name || 'Unknown'}</p>
                                    <p className="text-xs text-gray-500">{response.user?.email || ''} • {response.user?.department || 'N/A'}</p>
                                  </div>
                                  <p className="text-sm text-gray-500">
                                    {new Date(response.createdAt).toLocaleDateString('en-US', { 
                                      year: 'numeric', 
                                      month: 'short', 
                                      day: 'numeric',
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    })}
                                  </p>
                                </div>
                                <div className="space-y-3">
                                  {(response.answers || []).map((ans, qIdx) => (
                                    <div key={qIdx} className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                                      <p className="text-sm font-semibold mb-2 text-purple-600 dark:text-purple-400">
                                        Q{qIdx + 1}: {selectedSurvey?.questions[qIdx]?.question}
                                      </p>
                                      {selectedSurvey?.questions[qIdx]?.type === 'rating' ? (
                                        <div className="flex items-center gap-2">
                                          {[...Array(5)].map((_, i) => (
                                            <Star
                                              key={i}
                                              className={`w-5 h-5 ${i < ans ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                                            />
                                          ))}
                                          <span className="ml-2 font-bold text-sm text-gray-700 dark:text-gray-300">{ans}/5 stars</span>
                                        </div>
                                      ) : (
                                        <p className="text-sm text-gray-700 dark:text-gray-300 italic bg-white dark:bg-gray-950 p-3 rounded border border-gray-200 dark:border-gray-700">
                                          "{ans}"
                                        </p>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteSurvey(survey.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {survey.questions.map((q, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <span className="text-gray-500">{idx + 1}.</span>
                      <span>{q.question}</span>
                      <Badge variant="outline" className="ml-auto">
                        {q.type === 'rating' ? '⭐ Rating' : '📝 Text'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
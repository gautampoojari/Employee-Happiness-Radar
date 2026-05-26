import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Slider } from '../ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Smile, Frown, Zap, Building2, CheckCircle } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { addMoodCheckIn } from '../../../services/moodService';
import { toast } from 'sonner';

export const MoodCheckIn = () => {
  const { employee } = useAuth();
  const [formData, setFormData] = useState({
    happiness: 3,
    stress: 3,
    motivation: 3,
    hydration: 5,
    department: employee?.department || '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const departments = [
    'Engineering',
    'Marketing',
    'Sales',
    'Human Resources',
    'Finance',
    'Operations',
    'Customer Support',
    'Product',
    'Design',
    'Other'
  ];

  const getEmoji = (value, type) => {
    if (type === 'happiness') {
      if (value <= 1) return '😢';
      if (value <= 2) return '😕';
      if (value <= 3) return '😐';
      if (value <= 4) return '🙂';
      return '😄';
    } else if (type === 'stress') {
      if (value <= 1) return '😌';
      if (value <= 2) return '😊';
      if (value <= 3) return '😐';
      if (value <= 4) return '😰';
      return '😫';
    } else if (type === 'motivation') {
      if (value <= 1) return '😴';
      if (value <= 2) return '😑';
      if (value <= 3) return '🙂';
      if (value <= 4) return '😃';
      return '🚀';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.department) {
      toast.error('Please select your department');
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await addMoodCheckIn({
        happiness: formData.happiness,
        stress: formData.stress,
        motivation: formData.motivation,
        hydration: formData.hydration,
        note: formData.notes
      });
      
      // Show appropriate message based on whether it's new or updated
      if (result.message.includes('updated')) {
        toast.success('Check-in updated successfully! 🎉');
      } else {
        toast.success('Check-in submitted successfully! 🎉 Your streak has been updated!');
      }
      
      // Reset form
      setFormData({
        happiness: 3,
        stress: 3,
        motivation: 3,
        hydration: 5,
        department: employee?.department || '',
        notes: ''
      });
      
      // Reload to show updated data
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error('Check-in error:', error);
      toast.error(error.message || 'Failed to submit check-in');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Daily Mood Check-in 💚</h2>
        <p className="text-gray-600 dark:text-gray-400">
          How are you feeling today? Track your wellbeing journey
        </p>
      </div>

      <Card className="border-2 border-green-200 dark:border-green-800">
        <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
          <CardTitle className="flex items-center gap-2">
            <Smile className="w-6 h-6 text-green-600" />
            Check-in Form
          </CardTitle>
          <CardDescription>
            Fill in your mood metrics for today. Be honest with yourself! ✨
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Department Selection */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-base">
                <Building2 className="w-5 h-5" />
                Department <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={formData.department} 
                onValueChange={(value) => setFormData({ ...formData, department: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Happiness */}
            <div className="space-y-3 p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium flex items-center gap-2">
                  <Smile className="w-5 h-5 text-green-600" />
                  Happiness Level
                </Label>
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{getEmoji(formData.happiness, 'happiness')}</span>
                  <span className="text-2xl font-bold text-green-600">{formData.happiness}</span>
                </div>
              </div>
              <Slider
                value={[formData.happiness]}
                onValueChange={(value) => setFormData({ ...formData, happiness: value[0] })}
                min={1}
                max={5}
                step={1}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                <span>Very Unhappy</span>
                <span>Neutral</span>
                <span>Very Happy</span>
              </div>
            </div>

            {/* Stress */}
            <div className="space-y-3 p-6 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium flex items-center gap-2">
                  <Frown className="w-5 h-5 text-red-600" />
                  Stress Level
                </Label>
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{getEmoji(formData.stress, 'stress')}</span>
                  <span className="text-2xl font-bold text-red-600">{formData.stress}</span>
                </div>
              </div>
              <Slider
                value={[formData.stress]}
                onValueChange={(value) => setFormData({ ...formData, stress: value[0] })}
                min={1}
                max={5}
                step={1}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                <span>Very Relaxed</span>
                <span>Moderate</span>
                <span>Very Stressed</span>
              </div>
            </div>

            {/* Motivation */}
            <div className="space-y-3 p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-600" />
                  Motivation Level
                </Label>
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{getEmoji(formData.motivation, 'motivation')}</span>
                  <span className="text-2xl font-bold text-purple-600">{formData.motivation}</span>
                </div>
              </div>
              <Slider
                value={[formData.motivation]}
                onValueChange={(value) => setFormData({ ...formData, motivation: value[0] })}
                min={1}
                max={5}
                step={1}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                <span>No Energy</span>
                <span>Moderate</span>
                <span>Super Motivated</span>
              </div>
            </div>

            {/* Hydration */}
            <div className="space-y-3 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium flex items-center gap-2">
                  💧 Hydration (Glasses of Water)
                </Label>
                <span className="text-2xl font-bold text-blue-600">{formData.hydration}</span>
              </div>
              <Slider
                value={[formData.hydration]}
                onValueChange={(value) => setFormData({ ...formData, hydration: value[0] })}
                min={0}
                max={15}
                step={1}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                <span>0 glasses</span>
                <span>8 glasses (goal)</span>
                <span>15 glasses</span>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-base">
                Additional Notes (Optional) 💭
              </Label>
              <Textarea
                id="notes"
                placeholder="How's your day going? Any thoughts or feelings you'd like to share..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={4}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-lg py-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                'Submitting...'
              ) : (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Submit Check-in 🎉
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800">
        <CardContent className="pt-6">
          <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
            💡 Tips for Better Wellbeing
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span>✅</span>
              <span>Check in daily to build your streak and track patterns</span>
            </li>
            <li className="flex items-start gap-2">
              <span>💧</span>
              <span>Aim for 8 glasses of water per day for optimal hydration</span>
            </li>
            <li className="flex items-start gap-2">
              <span>🧘</span>
              <span>If stress is high, try taking short breaks throughout the day</span>
            </li>
            <li className="flex items-start gap-2">
              <span>🎯</span>
              <span>Low motivation? Set small, achievable goals to get started</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
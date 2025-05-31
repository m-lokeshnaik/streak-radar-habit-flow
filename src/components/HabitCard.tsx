
import React from 'react';
import { Habit } from '@/types/habit';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { isHabitCompletedToday } from '@/utils/habitUtils';
import { CheckCircle2, Circle, Flame } from 'lucide-react';

interface HabitCardProps {
  habit: Habit;
  onToggle: (habitId: string) => void;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, onToggle }) => {
  const isCompleted = isHabitCompletedToday(habit);
  
  const getCategoryColor = (category: string) => {
    const colors = {
      health: 'bg-green-100 text-green-800 border-green-200',
      productivity: 'bg-blue-100 text-blue-800 border-blue-200',
      learning: 'bg-purple-100 text-purple-800 border-purple-200',
      mindfulness: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      social: 'bg-pink-100 text-pink-800 border-pink-200',
      creative: 'bg-orange-100 text-orange-800 border-orange-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <Card className="p-4 border-2 border-gray-200 hover:border-gray-300 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggle(habit.id)}
            className={`p-0 h-8 w-8 ${isCompleted ? 'text-green-600' : 'text-gray-400'}`}
          >
            {isCompleted ? <CheckCircle2 size={24} /> : <Circle size={24} />}
          </Button>
          <h3 className={`font-medium ${isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}>
            {habit.name}
          </h3>
        </div>
        <Badge variant="outline" className={getCategoryColor(habit.category)}>
          {habit.category}
        </Badge>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Flame size={16} className="text-orange-500" />
          <span>{habit.streak} day streak</span>
        </div>
        <div className="text-sm text-gray-500">
          {habit.completedDates.length} completions
        </div>
      </div>
    </Card>
  );
};

export default HabitCard;

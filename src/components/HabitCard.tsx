
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
      health: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      productivity: 'bg-blue-100 text-blue-700 border-blue-200',
      learning: 'bg-purple-100 text-purple-700 border-purple-200',
      mindfulness: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      social: 'bg-pink-100 text-pink-700 border-pink-200',
      creative: 'bg-orange-100 text-orange-700 border-orange-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <Card className="p-6 border-2 border-pastel-gray-medium/30 hover:border-pastel-coral/40 transition-all duration-300 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggle(habit.id)}
            className={`p-0 h-10 w-10 rounded-full hover:bg-pastel-blue/20 transition-all duration-300 ${
              isCompleted ? 'text-emerald-500 bg-emerald-50' : 'text-gray-400 hover:text-pastel-coral'
            }`}
          >
            {isCompleted ? <CheckCircle2 size={28} /> : <Circle size={28} />}
          </Button>
          <h3 className={`font-semibold text-lg ${
            isCompleted ? 'line-through text-gray-500' : 'text-gray-800'
          }`}>
            {habit.name}
          </h3>
        </div>
        <Badge variant="outline" className={`${getCategoryColor(habit.category)} rounded-full px-3 py-1 font-medium`}>
          {habit.category}
        </Badge>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <div className="flex items-center gap-2 bg-orange-50 px-3 py-2 rounded-full">
            <Flame size={18} className="text-orange-500" />
            <span className="font-medium">{habit.streak} day streak</span>
          </div>
        </div>
        <div className="text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded-full">
          <span className="font-medium">{habit.completedDates.length}</span> completions
        </div>
      </div>
    </Card>
  );
};

export default HabitCard;

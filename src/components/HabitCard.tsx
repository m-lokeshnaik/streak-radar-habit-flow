
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
      health: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/50 dark:text-emerald-300 dark:border-emerald-700',
      productivity: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-700',
      learning: 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/50 dark:text-purple-300 dark:border-purple-700',
      mindfulness: 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-700',
      social: 'bg-pink-100 text-pink-700 border-pink-200 dark:bg-pink-900/50 dark:text-pink-300 dark:border-pink-700',
      creative: 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/50 dark:text-orange-300 dark:border-orange-700'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600';
  };

  return (
    <Card className="p-6 border-2 border-violet-light/30 hover:border-violet-medium/40 transition-all duration-300 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl dark:bg-gray-800/80 dark:border-gray-600/30 dark:hover:border-gray-500/40">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggle(habit.id)}
            className={`p-0 h-10 w-10 rounded-full hover:bg-violet-light/20 transition-all duration-300 dark:hover:bg-gray-700/50 ${
              isCompleted ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/50' : 'text-gray-medium hover:text-violet-dark dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            {isCompleted ? <CheckCircle2 size={28} /> : <Circle size={28} />}
          </Button>
          <h3 className={`font-semibold text-lg ${
            isCompleted ? 'line-through text-gray-medium dark:text-gray-500' : 'text-gray-dark dark:text-gray-100'
          }`}>
            {habit.name}
          </h3>
        </div>
        <Badge variant="outline" className={`${getCategoryColor(habit.category)} rounded-full px-3 py-1 font-medium`}>
          {habit.category}
        </Badge>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-sm text-gray-medium dark:text-gray-400">
          <div className="flex items-center gap-2 bg-orange-50 px-3 py-2 rounded-full dark:bg-orange-900/50">
            <Flame size={18} className="text-orange-500" />
            <span className="font-medium">{habit.streak} day streak</span>
          </div>
        </div>
        <div className="text-sm text-gray-medium bg-violet-light/20 px-3 py-2 rounded-full dark:text-gray-400 dark:bg-gray-700/50">
          <span className="font-medium">{habit.completedDates.length}</span> completions
        </div>
      </div>
    </Card>
  );
};

export default HabitCard;

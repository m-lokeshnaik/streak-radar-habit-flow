
import React from 'react';
import { Habit } from '@/types/habit';
import { Card } from '@/components/ui/card';
import { getMonthlyCompletions } from '@/utils/habitUtils';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MonthlyViewProps {
  habits: Habit[];
  currentMonth: Date;
  onMonthChange: (month: Date) => void;
}

const MonthlyView: React.FC<MonthlyViewProps> = ({ habits, currentMonth, onMonthChange }) => {
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + (direction === 'next' ? 1 : -1));
    onMonthChange(newMonth);
  };

  return (
    <Card className="p-6 border-2 border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
            <ChevronLeft size={16} />
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {habits.map(habit => {
          const monthlyData = getMonthlyCompletions(habit, currentMonth);
          const daysInWeek = 7;
          const weeks = [];
          
          for (let i = 0; i < monthlyData.length; i += daysInWeek) {
            weeks.push(monthlyData.slice(i, i + daysInWeek));
          }

          return (
            <div key={habit.id} className="space-y-2">
              <h3 className="font-medium text-gray-900">{habit.name}</h3>
              <div className="space-y-1">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex gap-1">
                    {week.map((day, dayIndex) => (
                      <div
                        key={dayIndex}
                        className={`w-4 h-4 rounded-sm border ${
                          day.completed
                            ? 'bg-gray-800 border-gray-800'
                            : day.isToday
                            ? 'border-gray-400 bg-white'
                            : 'border-gray-200 bg-white'
                        }`}
                        title={format(day.date, 'MMM d, yyyy')}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default MonthlyView;

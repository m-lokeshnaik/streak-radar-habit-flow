
import React, { useState } from 'react';
import { Habit } from '@/types/habit';
import { Card } from '@/components/ui/card';
import { getMonthlyCompletions } from '@/utils/habitUtils';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar, TrendingUp, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface MonthlyViewProps {
  habits: Habit[];
  currentMonth: Date;
  onMonthChange: (month: Date) => void;
}

const MonthlyView: React.FC<MonthlyViewProps> = ({ habits, currentMonth, onMonthChange }) => {
  const [selectedHabit, setSelectedHabit] = useState<string | null>(null);

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + (direction === 'next' ? 1 : -1));
    onMonthChange(newMonth);
  };

  const getMonthStats = (habit: Habit) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
    
    const completedDays = habit.completedDates.filter(date => {
      const completedDate = new Date(date);
      return completedDate >= monthStart && completedDate <= monthEnd;
    }).length;
    
    return {
      completed: completedDays,
      total: daysInMonth.length,
      percentage: Math.round((completedDays / daysInMonth.length) * 100)
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 border-2 border-purple-500/30 rounded-2xl bg-gradient-to-br from-white/95 to-purple-50/50 backdrop-blur-sm shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-500/20 rounded-full border border-purple-400/30">
              <Calendar className="text-purple-700" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent">
                {format(currentMonth, 'MMMM yyyy')}
              </h2>
              <p className="text-gray-600">Monthly habit overview</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigateMonth('prev')}
              className="border-purple-300/40 text-purple-700 hover:bg-purple-50 rounded-xl"
            >
              <ChevronLeft size={16} />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigateMonth('next')}
              className="border-purple-300/40 text-purple-700 hover:bg-purple-50 rounded-xl"
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </Card>

      {/* Habit Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {habits.map(habit => {
          const stats = getMonthStats(habit);
          const isSelected = selectedHabit === habit.id;
          
          return (
            <Card 
              key={habit.id} 
              className={`p-6 cursor-pointer transition-all duration-300 rounded-2xl shadow-lg hover:shadow-xl border-2 ${
                isSelected 
                  ? 'border-purple-500 bg-gradient-to-br from-purple-100/80 to-blue-100/80 scale-105' 
                  : 'border-purple-300/30 bg-gradient-to-br from-white/95 to-purple-50/50 hover:border-purple-400/50'
              }`}
              onClick={() => setSelectedHabit(isSelected ? null : habit.id)}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800">{habit.name}</h3>
                  <Badge 
                    variant="outline" 
                    className={`rounded-full font-medium ${
                      stats.percentage >= 80 
                        ? 'bg-emerald-100 text-emerald-700 border-emerald-300' 
                        : stats.percentage >= 60 
                        ? 'bg-yellow-100 text-yellow-700 border-yellow-300'
                        : 'bg-red-100 text-red-700 border-red-300'
                    }`}
                  >
                    {stats.percentage}%
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium text-gray-800">{stats.completed}/{stats.total} days</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        stats.percentage >= 80 
                          ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' 
                          : stats.percentage >= 60 
                          ? 'bg-gradient-to-r from-yellow-400 to-yellow-600'
                          : 'bg-gradient-to-r from-red-400 to-red-600'
                      }`}
                      style={{ width: `${stats.percentage}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-purple-600">
                    <TrendingUp size={14} />
                    <span>{habit.streak} day streak</span>
                  </div>
                  <div className="flex items-center gap-1 text-blue-600">
                    <Target size={14} />
                    <span>{habit.category}</span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Detailed Calendar View */}
      {selectedHabit && (
        <Card className="p-8 border-2 border-purple-500/30 rounded-2xl bg-gradient-to-br from-white/95 to-purple-50/50 backdrop-blur-sm shadow-xl animate-fade-in">
          {(() => {
            const habit = habits.find(h => h.id === selectedHabit);
            if (!habit) return null;
            
            const monthlyData = getMonthlyCompletions(habit, currentMonth);
            const daysInWeek = 7;
            const weeks = [];
            
            for (let i = 0; i < monthlyData.length; i += daysInWeek) {
              weeks.push(monthlyData.slice(i, i + daysInWeek));
            }

            return (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent">
                    {habit.name} - Detailed View
                  </h3>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setSelectedHabit(null)}
                    className="border-purple-300/40 text-purple-700 hover:bg-purple-50 rounded-xl"
                  >
                    Close
                  </Button>
                </div>
                
                {/* Calendar Grid */}
                <div className="space-y-3">
                  {/* Week Headers */}
                  <div className="grid grid-cols-7 gap-2 text-center">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="p-2 text-sm font-medium text-gray-600">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  {/* Calendar Days */}
                  {weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="grid grid-cols-7 gap-2">
                      {week.map((day, dayIndex) => (
                        <div
                          key={dayIndex}
                          className={`aspect-square rounded-xl border-2 flex items-center justify-center text-sm font-medium transition-all duration-300 hover:scale-105 ${
                            day.completed
                              ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 border-emerald-500 text-white shadow-lg'
                              : day.isToday
                              ? 'border-purple-500 bg-purple-100 text-purple-700'
                              : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50 text-gray-600'
                          }`}
                          title={format(day.date, 'MMM d, yyyy')}
                        >
                          {format(day.date, 'd')}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </Card>
      )}

      {habits.length === 0 && (
        <Card className="p-12 text-center border-2 border-purple-300/30 rounded-2xl bg-gradient-to-br from-white/95 to-purple-50/50 backdrop-blur-sm shadow-xl">
          <div className="text-purple-300 mb-4 bg-gradient-to-br from-purple-500/20 to-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto border-2 border-purple-400/30">
            <Calendar size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">No habits to track</h3>
          <p className="text-gray-500">Add some habits to see your monthly progress here</p>
        </Card>
      )}
    </div>
  );
};

export default MonthlyView;

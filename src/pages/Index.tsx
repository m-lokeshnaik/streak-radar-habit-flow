
import React, { useState, useEffect } from 'react';
import { Habit, Achievement } from '@/types/habit';
import { calculateStreak, checkAchievements } from '@/utils/habitUtils';
import { format } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HabitCard from '@/components/HabitCard';
import MonthlyView from '@/components/MonthlyView';
import ProgressInsights from '@/components/ProgressInsights';
import AchievementBadges from '@/components/AchievementBadges';
import AddHabitDialog from '@/components/AddHabitDialog';
import { HabitCategory } from '@/types/habit';
import { Calendar, BarChart3, Award, CheckSquare } from 'lucide-react';

const Index = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'first-habit',
      name: 'Getting Started',
      description: 'Create your first habit',
      icon: '🎯',
      unlocked: false
    },
    {
      id: 'week-warrior',
      name: 'Week Warrior',
      description: 'Maintain a 7-day streak',
      icon: '🔥',
      unlocked: false
    },
    {
      id: 'perfect-day',
      name: 'Perfect Day',
      description: 'Complete all habits in a day',
      icon: '⭐',
      unlocked: false
    },
    {
      id: 'month-master',
      name: 'Month Master',
      description: 'Maintain a 30-day streak',
      icon: '👑',
      unlocked: false
    }
  ]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedHabits = localStorage.getItem('habits');
    const savedAchievements = localStorage.getItem('achievements');
    
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    }
    
    if (savedAchievements) {
      setAchievements(JSON.parse(savedAchievements));
    }
  }, []);

  // Save to localStorage whenever habits or achievements change
  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('achievements', JSON.stringify(achievements));
  }, [achievements]);

  const addHabit = (name: string, category: HabitCategory) => {
    const newHabit: Habit = {
      id: Date.now().toString(),
      name,
      category,
      streak: 0,
      completedDates: [],
      createdAt: new Date().toISOString(),
      target: 1
    };
    
    const updatedHabits = [...habits, newHabit];
    setHabits(updatedHabits);
    
    // Check for new achievements
    const updatedAchievements = checkAchievements(updatedHabits, achievements);
    setAchievements(updatedAchievements);
  };

  const toggleHabit = (habitId: string) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    
    setHabits(prevHabits => {
      const updatedHabits = prevHabits.map(habit => {
        if (habit.id === habitId) {
          const isCompleted = habit.completedDates.includes(today);
          let newCompletedDates;
          
          if (isCompleted) {
            // Remove today's date
            newCompletedDates = habit.completedDates.filter(date => date !== today);
          } else {
            // Add today's date
            newCompletedDates = [...habit.completedDates, today];
          }
          
          const updatedHabit = {
            ...habit,
            completedDates: newCompletedDates,
            streak: calculateStreak(newCompletedDates)
          };
          
          return updatedHabit;
        }
        return habit;
      });
      
      // Check for new achievements after updating habits
      const updatedAchievements = checkAchievements(updatedHabits, achievements);
      setAchievements(updatedAchievements);
      
      return updatedHabits;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-blue/20 via-white to-pastel-pink/20">
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pastel-coral to-pastel-pink bg-clip-text text-transparent">
              GoalFlow ✨
            </h1>
            <p className="text-gray-600 text-lg font-medium">Build better habits, one day at a time</p>
          </div>
          <AddHabitDialog onAddHabit={addHabit} />
        </div>

        {/* Main Content */}
        <Tabs defaultValue="today" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm border-2 border-pastel-gray-medium/30 rounded-2xl p-2 shadow-lg">
            <TabsTrigger 
              value="today" 
              className="flex items-center gap-2 rounded-xl font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-pastel-coral data-[state=active]:to-pastel-pink data-[state=active]:text-white data-[state=active]:shadow-lg"
            >
              <CheckSquare size={18} />
              Today
            </TabsTrigger>
            <TabsTrigger 
              value="monthly" 
              className="flex items-center gap-2 rounded-xl font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-pastel-coral data-[state=active]:to-pastel-pink data-[state=active]:text-white data-[state=active]:shadow-lg"
            >
              <Calendar size={18} />
              Monthly
            </TabsTrigger>
            <TabsTrigger 
              value="insights" 
              className="flex items-center gap-2 rounded-xl font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-pastel-coral data-[state=active]:to-pastel-pink data-[state=active]:text-white data-[state=active]:shadow-lg"
            >
              <BarChart3 size={18} />
              Insights
            </TabsTrigger>
            <TabsTrigger 
              value="achievements" 
              className="flex items-center gap-2 rounded-xl font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-pastel-coral data-[state=active]:to-pastel-pink data-[state=active]:text-white data-[state=active]:shadow-lg"
            >
              <Award size={18} />
              Achievements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-6">
            {habits.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-pastel-coral mb-6 bg-gradient-to-br from-pastel-coral/20 to-pastel-pink/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
                  <CheckSquare size={48} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">No habits yet ✨</h3>
                <p className="text-gray-600 mb-6 text-lg">Get started by adding your first habit</p>
                <AddHabitDialog onAddHabit={addHabit} />
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {habits.map(habit => (
                  <HabitCard
                    key={habit.id}
                    habit={habit}
                    onToggle={toggleHabit}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="monthly">
            <MonthlyView
              habits={habits}
              currentMonth={currentMonth}
              onMonthChange={setCurrentMonth}
            />
          </TabsContent>

          <TabsContent value="insights">
            <ProgressInsights habits={habits} />
          </TabsContent>

          <TabsContent value="achievements">
            <AchievementBadges achievements={achievements} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;

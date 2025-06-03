import { Habit, HabitEntry, Achievement, HabitStats, HabitCategory } from '@/types/habit';
import { format, isToday, startOfMonth, endOfMonth, eachDayOfInterval, isWithinInterval } from 'date-fns';

export const createHabit = (name: string, category: HabitCategory): Habit => {
  return {
    id: Date.now().toString(),
    name,
    category,
    streak: 0,
    completedDates: [],
    createdAt: new Date().toISOString(),
    target: 1,
    unit: undefined
  };
};

export const toggleHabitCompletion = (habit: Habit): Habit => {
  const today = format(new Date(), 'yyyy-MM-dd');
  const isCompleted = habit.completedDates.includes(today);
  
  let updatedCompletedDates: string[];
  if (isCompleted) {
    // Remove today's date if already completed
    updatedCompletedDates = habit.completedDates.filter(date => date !== today);
  } else {
    // Add today's date if not completed
    updatedCompletedDates = [...habit.completedDates, today];
  }
  
  const newStreak = calculateStreak(updatedCompletedDates);
  
  return {
    ...habit,
    completedDates: updatedCompletedDates,
    streak: newStreak
  };
};

export const calculateStreak = (completedDates: string[]): number => {
  if (completedDates.length === 0) return 0;
  
  const sortedDates = completedDates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  let streak = 0;
  let currentDate = new Date();
  
  for (const dateStr of sortedDates) {
    const date = new Date(dateStr);
    const expectedDate = new Date(currentDate);
    expectedDate.setDate(expectedDate.getDate() - streak);
    
    if (format(date, 'yyyy-MM-dd') === format(expectedDate, 'yyyy-MM-dd')) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
};

export const isHabitCompletedToday = (habit: Habit): boolean => {
  const today = format(new Date(), 'yyyy-MM-dd');
  return habit.completedDates.includes(today);
};

export const getMonthlyCompletions = (habit: Habit, month: Date) => {
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  return daysInMonth.map(day => {
    const dayStr = format(day, 'yyyy-MM-dd');
    return {
      date: day,
      completed: habit.completedDates.includes(dayStr),
      isToday: isToday(day)
    };
  });
};

export const calculateHabitStats = (habits: Habit[]): HabitStats => {
  const totalHabits = habits.length;
  const completedToday = habits.filter(isHabitCompletedToday).length;
  const longestStreak = Math.max(...habits.map(h => h.streak), 0);
  const totalCompletions = habits.reduce((sum, h) => sum + h.completedDates.length, 0);
  const completionRate = totalHabits > 0 ? (completedToday / totalHabits) * 100 : 0;
  
  return {
    totalHabits,
    completedToday,
    longestStreak,
    totalCompletions,
    completionRate
  };
};

export const getRadarChartData = (habits: Habit[]) => {
  const categories = ['health', 'productivity', 'learning', 'mindfulness', 'social', 'creative'];
  
  return categories.map(category => {
    const categoryHabits = habits.filter(h => h.category === category);
    const completedToday = categoryHabits.filter(isHabitCompletedToday).length;
    const totalInCategory = categoryHabits.length;
    const completionRate = totalInCategory > 0 ? (completedToday / totalInCategory) * 100 : 0;
    
    return {
      category: category.charAt(0).toUpperCase() + category.slice(1),
      value: completionRate,
      fullMark: 100
    };
  });
};

export const checkAchievements = (habits: Habit[], currentAchievements: Achievement[]): Achievement[] => {
  const achievements = [...currentAchievements];
  const stats = calculateHabitStats(habits);
  
  // First habit achievement
  if (stats.totalHabits >= 1 && !achievements.find(a => a.id === 'first-habit')?.unlocked) {
    const achievement = achievements.find(a => a.id === 'first-habit');
    if (achievement) {
      achievement.unlocked = true;
      achievement.unlockedAt = new Date().toISOString();
    }
  }
  
  // Week warrior (7-day streak)
  if (stats.longestStreak >= 7 && !achievements.find(a => a.id === 'week-warrior')?.unlocked) {
    const achievement = achievements.find(a => a.id === 'week-warrior');
    if (achievement) {
      achievement.unlocked = true;
      achievement.unlockedAt = new Date().toISOString();
    }
  }
  
  // Perfect day (all habits completed)
  if (stats.completionRate === 100 && stats.totalHabits > 0 && !achievements.find(a => a.id === 'perfect-day')?.unlocked) {
    const achievement = achievements.find(a => a.id === 'perfect-day');
    if (achievement) {
      achievement.unlocked = true;
      achievement.unlockedAt = new Date().toISOString();
    }
  }
  
  return achievements;
};

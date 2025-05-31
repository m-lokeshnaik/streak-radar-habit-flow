
export interface Habit {
  id: string;
  name: string;
  category: HabitCategory;
  streak: number;
  completedDates: string[];
  createdAt: string;
  target: number; // daily target (e.g., 1 for binary habits, more for countable habits)
  unit?: string; // e.g., "minutes", "glasses", "pages"
}

export interface HabitEntry {
  habitId: string;
  date: string;
  completed: boolean;
  value?: number; // for countable habits
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export type HabitCategory = 'health' | 'productivity' | 'learning' | 'mindfulness' | 'social' | 'creative';

export interface HabitStats {
  totalHabits: number;
  completedToday: number;
  longestStreak: number;
  totalCompletions: number;
  completionRate: number;
}

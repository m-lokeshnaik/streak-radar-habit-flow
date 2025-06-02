import { Preferences } from '@capacitor/preferences';
import { Habit, Achievement } from '@/types/habit';
import { RoutineTask } from '@/types/routine';

export const StorageKeys = {
  HABITS: 'habits',
  ACHIEVEMENTS: 'achievements',
  ROUTINE_TASKS: 'routineTasks',
  THEME: 'theme',
  SETTINGS: 'settings'
} as const;

export async function saveData<T>(key: string, data: T): Promise<void> {
  await Preferences.set({
    key,
    value: JSON.stringify(data)
  });
}

export async function getData<T>(key: string): Promise<T | null> {
  const { value } = await Preferences.get({ key });
  return value ? JSON.parse(value) : null;
}

export async function removeData(key: string): Promise<void> {
  await Preferences.remove({ key });
}

// Specific storage functions for the app
export const HabitStorage = {
  save: (habits: Habit[]) => saveData(StorageKeys.HABITS, habits),
  get: () => getData<Habit[]>(StorageKeys.HABITS),
  clear: () => removeData(StorageKeys.HABITS)
};

export const AchievementStorage = {
  save: (achievements: Achievement[]) => saveData(StorageKeys.ACHIEVEMENTS, achievements),
  get: () => getData<Achievement[]>(StorageKeys.ACHIEVEMENTS),
  clear: () => removeData(StorageKeys.ACHIEVEMENTS)
};

export const RoutineStorage = {
  save: (tasks: RoutineTask[]) => saveData(StorageKeys.ROUTINE_TASKS, tasks),
  get: () => getData<RoutineTask[]>(StorageKeys.ROUTINE_TASKS),
  clear: () => removeData(StorageKeys.ROUTINE_TASKS)
};
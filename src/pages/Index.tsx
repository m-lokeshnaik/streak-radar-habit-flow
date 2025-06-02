// Update the imports at the top of the file
import { useEffect } from 'react';
import { HabitStorage, AchievementStorage, RoutineStorage } from '@/utils/storage';
import { requestNotificationPermissions, setupPushNotifications, scheduleRoutineNotification } from '@/utils/notifications';
import OfflineIndicator from '@/components/OfflineIndicator';

// Add to the existing Index component, just before the return statement:
useEffect(() => {
  const initializeApp = async () => {
    // Load data from storage
    const savedHabits = await HabitStorage.get();
    if (savedHabits) setHabits(savedHabits);

    const savedAchievements = await AchievementStorage.get();
    if (savedAchievements) setAchievements(savedAchievements);

    const savedRoutineTasks = await RoutineStorage.get();
    if (savedRoutineTasks) setRoutineTasks(savedRoutineTasks);

    // Set up notifications
    await requestNotificationPermissions();
    setupPushNotifications();
  };

  initializeApp();
}, []);

// Update the save effects
useEffect(() => {
  HabitStorage.save(habits);
}, [habits]);

useEffect(() => {
  AchievementStorage.save(achievements);
}, [achievements]);

useEffect(() => {
  RoutineStorage.save(routineTasks);
  // Schedule notifications for new tasks
  routineTasks.forEach(task => {
    if (task.recurrence && task.recurrence !== 'none') {
      scheduleRoutineNotification(task);
    }
  });
}, [routineTasks]);

// Add OfflineIndicator to the JSX, just before the closing div of the main container
<OfflineIndicator />
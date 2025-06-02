import { useEffect, useState } from 'react';
import { HabitStorage, AchievementStorage, RoutineStorage } from '@/utils/storage';
import { requestNotificationPermissions, setupPushNotifications, scheduleRoutineNotification } from '@/utils/notifications';
import OfflineIndicator from '@/components/OfflineIndicator';

function Index() {
  const [habits, setHabits] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [routineTasks, setRoutineTasks] = useState([]);

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

  return (
    <div className="container mx-auto p-4">
      {/* Your existing JSX content would go here */}
      <OfflineIndicator />
    </div>
  );
}

export default Index;
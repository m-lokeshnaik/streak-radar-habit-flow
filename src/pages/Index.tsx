
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { HabitStorage, AchievementStorage, RoutineStorage } from '@/utils/storage';
import { requestNotificationPermissions, setupPushNotifications, scheduleRoutineNotification } from '@/utils/notifications';
import { Habit, Achievement, HabitCategory } from '@/types/habit';
import { RoutineTask } from '@/types/routine';
import { createHabit, toggleHabitCompletion, checkAchievements } from '@/utils/habitUtils';
import { Capacitor } from '@capacitor/core';
import OfflineIndicator from '@/components/OfflineIndicator';
import HabitCard from '@/components/HabitCard';
import AddHabitDialog from '@/components/AddHabitDialog';
import ProgressInsights from '@/components/ProgressInsights';
import AchievementBadges from '@/components/AchievementBadges';
import TimeBlockView from '@/components/TimeBlockView';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Target, Calendar, Award, Settings, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

function Index() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [routineTasks, setRoutineTasks] = useState<RoutineTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        console.log(`Loading app data on ${Capacitor.getPlatform()}`);
        
        // Load data from storage
        const [savedHabits, savedAchievements, savedRoutineTasks] = await Promise.all([
          HabitStorage.get(),
          AchievementStorage.get(),
          RoutineStorage.get()
        ]);

        if (savedHabits) setHabits(savedHabits);
        if (savedAchievements) setAchievements(savedAchievements);
        if (savedRoutineTasks) setRoutineTasks(savedRoutineTasks);

        // Initialize notifications
        const permissionGranted = await requestNotificationPermissions();
        if (permissionGranted && Capacitor.isNativePlatform()) {
          setupPushNotifications();
          toast({
            title: "Welcome to Streak Radar! 🎯",
            description: "Notifications enabled for habit reminders",
          });
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error initializing app:', error);
        setIsLoading(false);
      }
    };

    initializeApp();
  }, [toast]);

  // Save data whenever state changes
  useEffect(() => {
    if (!isLoading) HabitStorage.save(habits);
  }, [habits, isLoading]);

  useEffect(() => {
    if (!isLoading) AchievementStorage.save(achievements);
  }, [achievements, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      RoutineStorage.save(routineTasks);
      // Schedule notifications for routine tasks
      routineTasks.forEach(task => {
        if (task.recurrence && task.recurrence !== 'none') {
          scheduleRoutineNotification(task);
        }
      });
    }
  }, [routineTasks, isLoading]);

  const handleAddHabit = (name: string, category: HabitCategory) => {
    const newHabit = createHabit(name, category);
    setHabits(prev => [...prev, newHabit]);
    toast({
      title: "Habit Added! 🌟",
      description: `${name} has been added to your habits`,
    });
  };

  const handleToggleHabit = (habitId: string) => {
    setHabits(prev => {
      const updated = prev.map(habit => 
        habit.id === habitId ? toggleHabitCompletion(habit) : habit
      );
      
      // Check for new achievements
      const newAchievements = checkAchievements(updated, achievements);
      if (newAchievements.length > 0) {
        setAchievements(prev => [...prev, ...newAchievements]);
        newAchievements.forEach(achievement => {
          toast({
            title: "Achievement Unlocked! 🏆",
            description: achievement.name,
          });
        });
      }
      
      return updated;
    });
  };

  const handleTaskToggle = (taskId: string) => {
    setRoutineTasks(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Loading Streak Radar...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <OfflineIndicator />
      
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-violet-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-violet-600 rounded-xl">
                <Target className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Streak Radar</h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">Build lasting habits</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="rounded-full"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </Button>
              <Badge variant="outline" className="hidden sm:flex">
                {Capacitor.getPlatform()}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="habits" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="habits" className="flex items-center gap-2">
              <Target size={16} />
              <span className="hidden sm:inline">Habits</span>
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center gap-2">
              <Calendar size={16} />
              <span className="hidden sm:inline">Schedule</span>
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <Settings size={16} />
              <span className="hidden sm:inline">Insights</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Award size={16} />
              <span className="hidden sm:inline">Awards</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="habits" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Habits</h2>
                <p className="text-gray-600 dark:text-gray-300">Track your daily progress</p>
              </div>
              <AddHabitDialog onAddHabit={handleAddHabit} />
            </div>

            {habits.length === 0 ? (
              <Card className="p-12 text-center border-dashed border-2 border-violet-300 dark:border-gray-600">
                <Target className="mx-auto mb-4 text-violet-400" size={48} />
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Start Your Journey
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Add your first habit to begin building your streak radar
                </p>
                <AddHabitDialog onAddHabit={handleAddHabit} />
              </Card>
            ) : (
              <div className="grid gap-4 sm:gap-6">
                {habits.map(habit => (
                  <HabitCard 
                    key={habit.id} 
                    habit={habit} 
                    onToggle={handleToggleHabit} 
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="schedule">
            <TimeBlockView 
              tasks={routineTasks}
              onTaskToggle={handleTaskToggle}
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
}

export default Index;

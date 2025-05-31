
export interface RoutineTask {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  category: 'habit' | 'goal' | 'routine';
  description?: string;
  recurrence?: 'daily' | 'weekly' | 'monthly' | 'none';
  priority?: 'high' | 'medium' | 'low';
  completed: boolean;
  color?: string;
}

export interface DailyRoutine {
  id: string;
  date: string;
  tasks: RoutineTask[];
  createdAt: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
  task?: RoutineTask;
}

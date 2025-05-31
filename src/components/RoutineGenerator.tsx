
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { RoutineTask } from '@/types/routine';
import { Plus, Clock, Calendar, Target, Repeat } from 'lucide-react';

interface RoutineGeneratorProps {
  onTaskAdd: (task: RoutineTask) => void;
}

const RoutineGenerator: React.FC<RoutineGeneratorProps> = ({ onTaskAdd }) => {
  const [taskName, setTaskName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState<'habit' | 'goal' | 'routine'>('routine');
  const [description, setDescription] = useState('');
  const [recurrence, setRecurrence] = useState<'daily' | 'weekly' | 'monthly' | 'none'>('daily');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');

  const handleAddTask = () => {
    if (!taskName || !startTime || !duration) return;

    const durationNum = parseInt(duration);
    const [hours, minutes] = startTime.split(':').map(Number);
    const endDate = new Date();
    endDate.setHours(hours, minutes + durationNum);
    const endTime = endDate.toTimeString().slice(0, 5);

    const newTask: RoutineTask = {
      id: Date.now().toString(),
      name: taskName,
      startTime,
      endTime,
      duration: durationNum,
      category,
      description,
      recurrence,
      priority,
      completed: false,
      color: getCategoryColor(category)
    };

    onTaskAdd(newTask);
    
    // Reset form
    setTaskName('');
    setStartTime('');
    setDuration('');
    setDescription('');
  };

  const getCategoryColor = (cat: string) => {
    const colors = {
      habit: '#A78BFA',
      goal: '#7C3AED',
      routine: '#5B21B6'
    };
    return colors[cat as keyof typeof colors];
  };

  const getCategoryIcon = (cat: string) => {
    const icons = {
      habit: <Repeat size={16} />,
      goal: <Target size={16} />,
      routine: <Calendar size={16} />
    };
    return icons[cat as keyof typeof icons];
  };

  return (
    <Card className="p-8 border-2 border-violet-light/30 rounded-2xl bg-gradient-to-br from-white to-violet-light/10 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-violet-medium/20 rounded-full">
          <Plus className="text-violet-dark" size={24} />
        </div>
        <h3 className="text-xl font-bold text-gray-dark">Smart Routine Generator ✨</h3>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="task-name" className="text-gray-dark font-semibold">Task Name</Label>
            <Input
              id="task-name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="e.g., Morning workout 💪"
              className="border-violet-light/40 focus:border-violet-medium rounded-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="start-time" className="text-gray-dark font-semibold">Start Time</Label>
              <Input
                id="start-time"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="border-violet-light/40 focus:border-violet-medium rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration" className="text-gray-dark font-semibold">Duration (min)</Label>
              <Input
                id="duration"
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="30"
                className="border-violet-light/40 focus:border-violet-medium rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-dark font-semibold">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Additional details about this task..."
              className="border-violet-light/40 focus:border-violet-medium rounded-xl resize-none"
              rows={2}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category" className="text-gray-dark font-semibold">Category</Label>
            <Select value={category} onValueChange={(value) => setCategory(value as any)}>
              <SelectTrigger className="border-violet-light/40 focus:border-violet-medium rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-violet-light/30">
                <SelectItem value="habit" className="rounded-lg">
                  <div className="flex items-center gap-2">
                    <Repeat size={16} />
                    <span>Habit</span>
                  </div>
                </SelectItem>
                <SelectItem value="goal" className="rounded-lg">
                  <div className="flex items-center gap-2">
                    <Target size={16} />
                    <span>Goal</span>
                  </div>
                </SelectItem>
                <SelectItem value="routine" className="rounded-lg">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>Routine</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="recurrence" className="text-gray-dark font-semibold">Recurrence</Label>
            <Select value={recurrence} onValueChange={(value) => setRecurrence(value as any)}>
              <SelectTrigger className="border-violet-light/40 focus:border-violet-medium rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-violet-light/30">
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="none">One-time</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority" className="text-gray-dark font-semibold">Priority</Label>
            <Select value={priority} onValueChange={(value) => setPriority(value as any)}>
              <SelectTrigger className="border-violet-light/40 focus:border-violet-medium rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-violet-light/30">
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={handleAddTask}
            className="w-full bg-gradient-to-r from-violet-medium to-violet-dark hover:from-violet-dark hover:to-violet-darker text-white rounded-xl py-3 font-semibold shadow-lg mt-4"
          >
            <Plus size={18} className="mr-2" />
            Add to Routine
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default RoutineGenerator;

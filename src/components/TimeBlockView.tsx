
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RoutineTask } from '@/types/routine';
import { Clock, CheckCircle2, Circle, Edit, Trash2 } from 'lucide-react';

interface TimeBlockViewProps {
  tasks: RoutineTask[];
  onTaskToggle: (taskId: string) => void;
  onTaskEdit?: (task: RoutineTask) => void;
  onTaskDelete?: (taskId: string) => void;
}

const TimeBlockView: React.FC<TimeBlockViewProps> = ({ 
  tasks, 
  onTaskToggle, 
  onTaskEdit, 
  onTaskDelete 
}) => {
  const sortedTasks = tasks.sort((a, b) => a.startTime.localeCompare(b.startTime));

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: 'bg-red-100 text-red-700 border-red-200',
      medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      low: 'bg-green-100 text-green-700 border-green-200'
    };
    return colors[priority as keyof typeof colors] || colors.medium;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      habit: 'bg-violet-light text-violet-dark border-violet-medium',
      goal: 'bg-violet-medium/20 text-violet-dark border-violet-medium',
      routine: 'bg-violet-dark/20 text-violet-dark border-violet-dark'
    };
    return colors[category as keyof typeof colors] || colors.routine;
  };

  return (
    <Card className="p-8 border-2 border-violet-light/30 rounded-2xl bg-gradient-to-br from-white to-violet-light/10 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-violet-medium/20 rounded-full">
          <Clock className="text-violet-dark" size={24} />
        </div>
        <h3 className="text-xl font-bold text-gray-dark">Today's Schedule ⏰</h3>
        <Badge variant="outline" className="bg-violet-light/20 text-violet-dark border-violet-medium/30 rounded-full px-4 py-1 font-semibold">
          {tasks.filter(t => t.completed).length}/{tasks.length} completed
        </Badge>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-violet-medium mb-4 bg-gradient-to-br from-violet-light/20 to-violet-medium/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
            <Clock size={40} />
          </div>
          <h4 className="text-lg font-semibold text-gray-dark mb-2">No tasks scheduled</h4>
          <p className="text-gray-medium">Add your first task to get started with your routine!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedTasks.map(task => (
            <div 
              key={task.id} 
              className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-300 ${
                task.completed 
                  ? 'bg-gradient-to-r from-emerald-50 to-violet-light/20 border-emerald-200/50' 
                  : 'bg-white border-violet-light/40 hover:border-violet-medium/60 hover:shadow-md'
              }`}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onTaskToggle(task.id)}
                className={`p-0 h-10 w-10 rounded-full transition-all duration-300 ${
                  task.completed 
                    ? 'text-emerald-500 bg-emerald-50' 
                    : 'text-gray-medium hover:text-violet-dark hover:bg-violet-light/20'
                }`}
              >
                {task.completed ? <CheckCircle2 size={28} /> : <Circle size={28} />}
              </Button>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className={`font-semibold text-lg ${
                    task.completed ? 'line-through text-gray-medium' : 'text-gray-dark'
                  }`}>
                    {task.name}
                  </h4>
                  <Badge variant="outline" className={`${getCategoryColor(task.category)} rounded-full px-3 py-1 font-medium text-xs`}>
                    {task.category}
                  </Badge>
                  <Badge variant="outline" className={`${getPriorityColor(task.priority || 'medium')} rounded-full px-3 py-1 font-medium text-xs`}>
                    {task.priority}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-medium">
                  <div className="flex items-center gap-2 bg-violet-light/20 px-3 py-1 rounded-full">
                    <Clock size={16} />
                    <span className="font-medium">{task.startTime} - {task.endTime}</span>
                  </div>
                  <div className="bg-gray-light px-3 py-1 rounded-full">
                    <span className="font-medium">{task.duration} min</span>
                  </div>
                  {task.recurrence && task.recurrence !== 'none' && (
                    <div className="bg-violet-medium/20 px-3 py-1 rounded-full">
                      <span className="font-medium text-violet-dark">{task.recurrence}</span>
                    </div>
                  )}
                </div>
                
                {task.description && (
                  <p className="text-sm text-gray-medium mt-2 italic">{task.description}</p>
                )}
              </div>

              <div className="flex gap-2">
                {onTaskEdit && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onTaskEdit(task)}
                    className="h-8 w-8 p-0 hover:bg-violet-light/20 hover:text-violet-dark rounded-full"
                  >
                    <Edit size={16} />
                  </Button>
                )}
                {onTaskDelete && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onTaskDelete(task.id)}
                    className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600 rounded-full"
                  >
                    <Trash2 size={16} />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default TimeBlockView;

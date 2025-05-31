
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { HabitCategory } from '@/types/habit';

interface AddHabitDialogProps {
  onAddHabit: (name: string, category: HabitCategory) => void;
}

const AddHabitDialog: React.FC<AddHabitDialogProps> = ({ onAddHabit }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<HabitCategory>('health');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddHabit(name.trim(), category);
      setName('');
      setOpen(false);
    }
  };

  const categories = [
    { value: 'health', label: 'Health' },
    { value: 'productivity', label: 'Productivity' },
    { value: 'learning', label: 'Learning' },
    { value: 'mindfulness', label: 'Mindfulness' },
    { value: 'social', label: 'Social' },
    { value: 'creative', label: 'Creative' }
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gray-900 hover:bg-gray-800 text-white border-gray-900">
          <Plus size={16} className="mr-2" />
          Add Habit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md border-2 border-gray-200">
        <DialogHeader>
          <DialogTitle className="text-gray-900">Add New Habit</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="habit-name" className="text-gray-700">Habit Name</Label>
            <Input
              id="habit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Drink 8 glasses of water"
              className="border-gray-300 focus:border-gray-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="habit-category" className="text-gray-700">Category</Label>
            <Select value={category} onValueChange={(value) => setCategory(value as HabitCategory)}>
              <SelectTrigger className="border-gray-300 focus:border-gray-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="flex-1 bg-gray-900 hover:bg-gray-800 text-white"
            >
              Add Habit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddHabitDialog;

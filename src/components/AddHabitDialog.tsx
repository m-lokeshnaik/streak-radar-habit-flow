
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
    { value: 'health', label: 'Health', emoji: '🌱' },
    { value: 'productivity', label: 'Productivity', emoji: '⚡' },
    { value: 'learning', label: 'Learning', emoji: '📚' },
    { value: 'mindfulness', label: 'Mindfulness', emoji: '🧘' },
    { value: 'social', label: 'Social', emoji: '💝' },
    { value: 'creative', label: 'Creative', emoji: '🎨' }
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-violet-medium to-violet-dark hover:from-violet-dark hover:to-violet-darker text-white border-none rounded-2xl px-6 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
          <Plus size={18} className="mr-2" />
          Add Habit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md border-2 border-violet-light/30 rounded-2xl bg-white shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-gray-dark text-xl font-bold">Add New Habit ✨</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-3">
            <Label htmlFor="habit-name" className="text-gray-dark font-semibold">Habit Name</Label>
            <Input
              id="habit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Drink 8 glasses of water 💧"
              className="border-violet-light/40 focus:border-violet-medium rounded-xl py-3 px-4 font-medium"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="habit-category" className="text-gray-dark font-semibold">Category</Label>
            <Select value={category} onValueChange={(value) => setCategory(value as HabitCategory)}>
              <SelectTrigger className="border-violet-light/40 focus:border-violet-medium rounded-xl py-3 px-4">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-violet-light/30">
                {categories.map(cat => (
                  <SelectItem key={cat.value} value={cat.value} className="rounded-lg font-medium">
                    {cat.emoji} {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              className="flex-1 border-violet-light/40 text-gray-dark hover:bg-gray-light rounded-xl py-3 font-semibold"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="flex-1 bg-gradient-to-r from-violet-medium to-violet-dark hover:from-violet-dark hover:to-violet-darker text-white rounded-xl py-3 font-semibold shadow-lg"
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

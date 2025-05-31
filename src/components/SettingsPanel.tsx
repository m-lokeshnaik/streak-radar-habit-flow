
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings, Bell, Palette, Moon, Sun, Minimize } from 'lucide-react';

const SettingsPanel: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark' | 'minimal'>('light');
  const [reminderTime, setReminderTime] = useState('09:00');
  const [weeklyReports, setWeeklyReports] = useState(true);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('goalflow-settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setNotifications(settings.notifications ?? true);
      setTheme(settings.theme ?? 'light');
      setReminderTime(settings.reminderTime ?? '09:00');
      setWeeklyReports(settings.weeklyReports ?? true);
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    const settings = {
      notifications,
      theme,
      reminderTime,
      weeklyReports
    };
    localStorage.setItem('goalflow-settings', JSON.stringify(settings));
  }, [notifications, theme, reminderTime, weeklyReports]);

  const getThemeIcon = (themeType: string) => {
    const icons = {
      light: <Sun size={16} />,
      dark: <Moon size={16} />,
      minimal: <Minimize size={16} />
    };
    return icons[themeType as keyof typeof icons];
  };

  return (
    <div className="space-y-6">
      {/* Notifications Settings */}
      <Card className="p-8 border-2 border-purple-500/30 rounded-2xl bg-gradient-to-br from-white/95 to-purple-50/50 backdrop-blur-sm shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-purple-500/20 rounded-full border border-purple-400/30">
            <Bell className="text-purple-700" size={24} />
          </div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent">Notification Settings</h3>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-gray-700 font-semibold">Enable Notifications</Label>
              <p className="text-sm text-gray-500">Receive reminders for habits and routines</p>
            </div>
            <Switch
              checked={notifications}
              onCheckedChange={setNotifications}
              className="data-[state=checked]:bg-purple-600"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-gray-700 font-semibold">Daily Reminder Time</Label>
              <p className="text-sm text-gray-500">When to send your daily habit reminder</p>
            </div>
            <Select value={reminderTime} onValueChange={setReminderTime}>
              <SelectTrigger className="w-32 border-purple-300/40 focus:border-purple-500 rounded-xl bg-white/80">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-purple-300/30 bg-white/95 backdrop-blur-sm">
                <SelectItem value="07:00">7:00 AM</SelectItem>
                <SelectItem value="08:00">8:00 AM</SelectItem>
                <SelectItem value="09:00">9:00 AM</SelectItem>
                <SelectItem value="10:00">10:00 AM</SelectItem>
                <SelectItem value="18:00">6:00 PM</SelectItem>
                <SelectItem value="19:00">7:00 PM</SelectItem>
                <SelectItem value="20:00">8:00 PM</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-gray-700 font-semibold">Weekly Reports</Label>
              <p className="text-sm text-gray-500">Receive weekly progress summaries</p>
            </div>
            <Switch
              checked={weeklyReports}
              onCheckedChange={setWeeklyReports}
              className="data-[state=checked]:bg-purple-600"
            />
          </div>
        </div>
      </Card>

      {/* Theme Settings */}
      <Card className="p-8 border-2 border-purple-500/30 rounded-2xl bg-gradient-to-br from-white/95 to-purple-50/50 backdrop-blur-sm shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-purple-500/20 rounded-full border border-purple-400/30">
            <Palette className="text-purple-700" size={24} />
          </div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent">Theme Settings</h3>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <Label className="text-gray-700 font-semibold">App Theme</Label>
            <div className="grid grid-cols-3 gap-3">
              <Button
                variant={theme === 'light' ? 'default' : 'outline'}
                onClick={() => setTheme('light')}
                className={`h-20 flex flex-col gap-2 rounded-xl ${
                  theme === 'light' 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0' 
                    : 'border-purple-300/40 bg-white/80 text-gray-700 hover:bg-purple-50'
                }`}
              >
                <Sun size={24} />
                <span className="text-sm font-medium">Light</span>
              </Button>
              
              <Button
                variant={theme === 'dark' ? 'default' : 'outline'}
                onClick={() => setTheme('dark')}
                className={`h-20 flex flex-col gap-2 rounded-xl ${
                  theme === 'dark' 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0' 
                    : 'border-purple-300/40 bg-white/80 text-gray-700 hover:bg-purple-50'
                }`}
              >
                <Moon size={24} />
                <span className="text-sm font-medium">Dark</span>
              </Button>
              
              <Button
                variant={theme === 'minimal' ? 'default' : 'outline'}
                onClick={() => setTheme('minimal')}
                className={`h-20 flex flex-col gap-2 rounded-xl ${
                  theme === 'minimal' 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0' 
                    : 'border-purple-300/40 bg-white/80 text-gray-700 hover:bg-purple-50'
                }`}
              >
                <Minimize size={24} />
                <span className="text-sm font-medium">Minimal</span>
              </Button>
            </div>
            <p className="text-sm text-gray-500">Choose your preferred visual style</p>
          </div>

          <div className="p-4 bg-purple-100/50 rounded-xl border border-purple-200/50">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="bg-purple-200/50 text-purple-700 border-purple-300/50">
                Current Theme
              </Badge>
              {getThemeIcon(theme)}
              <span className="font-semibold text-purple-700 capitalize">{theme}</span>
            </div>
            <p className="text-sm text-purple-600">
              {theme === 'light' && 'Clean and bright interface with full colors'}
              {theme === 'dark' && 'Easy on the eyes with dark backgrounds'}
              {theme === 'minimal' && 'Simplified interface with reduced visual elements'}
            </p>
          </div>
        </div>
      </Card>

      {/* App Information */}
      <Card className="p-8 border-2 border-purple-500/30 rounded-2xl bg-gradient-to-br from-white/95 to-purple-50/50 backdrop-blur-sm shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-purple-500/20 rounded-full border border-purple-400/30">
            <Settings className="text-purple-700" size={24} />
          </div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent">App Information</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-700 font-medium">Version</span>
            <Badge variant="outline" className="bg-purple-100/50 text-purple-700 border-purple-300/50">
              1.0.0
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700 font-medium">Storage Used</span>
            <Badge variant="outline" className="bg-blue-100/50 text-blue-700 border-blue-300/50">
              {localStorage.getItem('habits')?.length || 0} bytes
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SettingsPanel;

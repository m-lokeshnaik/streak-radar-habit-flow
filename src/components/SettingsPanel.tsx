
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings, Bell, Palette, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const SettingsPanel: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(true);
  const { theme, setTheme } = useTheme();

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('goalflow-settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setNotifications(settings.notifications ?? true);
      setWeeklyReports(settings.weeklyReports ?? true);
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    const settings = {
      notifications,
      weeklyReports
    };
    localStorage.setItem('goalflow-settings', JSON.stringify(settings));
  }, [notifications, weeklyReports]);

  const getThemeIcon = (themeType: string) => {
    const icons = {
      light: <Sun size={16} />,
      dark: <Moon size={16} />
    };
    return icons[themeType as keyof typeof icons];
  };

  return (
    <div className="space-y-6">
      {/* Notifications Settings */}
      <Card className="p-8 border-2 border-purple-500/30 rounded-2xl bg-gradient-to-br from-white/95 to-purple-50/50 backdrop-blur-sm shadow-xl dark:from-gray-900/95 dark:to-purple-900/20 dark:border-purple-400/30">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-purple-500/20 rounded-full border border-purple-400/30">
            <Bell className="text-purple-700 dark:text-purple-300" size={24} />
          </div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent dark:from-purple-300 dark:to-blue-300">Notification Settings</h3>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-gray-700 font-semibold dark:text-gray-200">Enable Notifications</Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">Receive reminders for habits and routines</p>
            </div>
            <Switch
              checked={notifications}
              onCheckedChange={setNotifications}
              className="data-[state=checked]:bg-purple-600"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-gray-700 font-semibold dark:text-gray-200">Weekly Reports</Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">Receive weekly progress summaries</p>
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
      <Card className="p-8 border-2 border-purple-500/30 rounded-2xl bg-gradient-to-br from-white/95 to-purple-50/50 backdrop-blur-sm shadow-xl dark:from-gray-900/95 dark:to-purple-900/20 dark:border-purple-400/30">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-purple-500/20 rounded-full border border-purple-400/30">
            <Palette className="text-purple-700 dark:text-purple-300" size={24} />
          </div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent dark:from-purple-300 dark:to-blue-300">Theme Settings</h3>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <Label className="text-gray-700 font-semibold dark:text-gray-200">App Theme</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={theme === 'light' ? 'default' : 'outline'}
                onClick={() => setTheme('light')}
                className={`h-20 flex flex-col gap-2 rounded-xl ${
                  theme === 'light' 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0' 
                    : 'border-purple-300/40 bg-white/80 text-gray-700 hover:bg-purple-50 dark:bg-gray-800/80 dark:text-gray-200 dark:hover:bg-gray-700/50'
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
                    : 'border-purple-300/40 bg-white/80 text-gray-700 hover:bg-purple-50 dark:bg-gray-800/80 dark:text-gray-200 dark:hover:bg-gray-700/50'
                }`}
              >
                <Moon size={24} />
                <span className="text-sm font-medium">Dark</span>
              </Button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Choose your preferred visual style</p>
          </div>

          <div className="p-4 bg-purple-100/50 rounded-xl border border-purple-200/50 dark:bg-purple-900/20 dark:border-purple-800/50">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="bg-purple-200/50 text-purple-700 border-purple-300/50 dark:bg-purple-800/50 dark:text-purple-300 dark:border-purple-600/50">
                Current Theme
              </Badge>
              {getThemeIcon(theme)}
              <span className="font-semibold text-purple-700 capitalize dark:text-purple-300">{theme}</span>
            </div>
            <p className="text-sm text-purple-600 dark:text-purple-400">
              {theme === 'light' && 'Clean and bright interface with full colors'}
              {theme === 'dark' && 'Easy on the eyes with dark backgrounds and white text'}
            </p>
          </div>
        </div>
      </Card>

      {/* App Information */}
      <Card className="p-8 border-2 border-purple-500/30 rounded-2xl bg-gradient-to-br from-white/95 to-purple-50/50 backdrop-blur-sm shadow-xl dark:from-gray-900/95 dark:to-purple-900/20 dark:border-purple-400/30">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-purple-500/20 rounded-full border border-purple-400/30">
            <Settings className="text-purple-700 dark:text-purple-300" size={24} />
          </div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent dark:from-purple-300 dark:to-blue-300">App Information</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-700 font-medium dark:text-gray-200">Version</span>
            <Badge variant="outline" className="bg-purple-100/50 text-purple-700 border-purple-300/50 dark:bg-purple-800/50 dark:text-purple-300 dark:border-purple-600/50">
              1.0.0
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700 font-medium dark:text-gray-200">Storage Used</span>
            <Badge variant="outline" className="bg-blue-100/50 text-blue-700 border-blue-300/50 dark:bg-blue-800/50 dark:text-blue-300 dark:border-blue-600/50">
              {localStorage.getItem('habits')?.length || 0} bytes
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SettingsPanel;

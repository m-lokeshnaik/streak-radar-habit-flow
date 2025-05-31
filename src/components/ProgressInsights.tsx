
import React from 'react';
import { Habit, HabitStats } from '@/types/habit';
import { Card } from '@/components/ui/card';
import { calculateHabitStats, getRadarChartData } from '@/utils/habitUtils';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { TrendingUp, Target, Flame, CheckCircle } from 'lucide-react';

interface ProgressInsightsProps {
  habits: Habit[];
}

const ProgressInsights: React.FC<ProgressInsightsProps> = ({ habits }) => {
  const stats = calculateHabitStats(habits);
  const radarData = getRadarChartData(habits);

  const StatCard = ({ icon: Icon, label, value, suffix = '' }: {
    icon: any;
    label: string;
    value: number;
    suffix?: string;
  }) => (
    <Card className="p-4 border-2 border-gray-200">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gray-100 rounded-lg">
          <Icon size={20} className="text-gray-700" />
        </div>
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-xl font-semibold text-gray-900">
            {value}{suffix}
          </p>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={Target}
          label="Total Habits"
          value={stats.totalHabits}
        />
        <StatCard
          icon={CheckCircle}
          label="Completed Today"
          value={stats.completedToday}
        />
        <StatCard
          icon={Flame}
          label="Longest Streak"
          value={stats.longestStreak}
          suffix=" days"
        />
        <StatCard
          icon={TrendingUp}
          label="Completion Rate"
          value={Math.round(stats.completionRate)}
          suffix="%"
        />
      </div>

      <Card className="p-6 border-2 border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Performance</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="category" tick={{ fontSize: 12, fill: '#4b5563' }} />
              <PolarRadiusAxis 
                angle={90}
                domain={[0, 100]}
                tick={{ fontSize: 10, fill: '#6b7280' }}
              />
              <Radar
                name="Completion Rate"
                dataKey="value"
                stroke="#1f2937"
                fill="#1f2937"
                fillOpacity={0.1}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default ProgressInsights;

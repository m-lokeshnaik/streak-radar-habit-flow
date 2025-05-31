
import React from 'react';
import { Achievement } from '@/types/habit';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Lock } from 'lucide-react';

interface AchievementBadgesProps {
  achievements: Achievement[];
}

const AchievementBadges: React.FC<AchievementBadgesProps> = ({ achievements }) => {
  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);

  return (
    <Card className="p-6 border-2 border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <Award className="text-gray-700" size={20} />
        <h3 className="text-lg font-semibold text-gray-900">Achievements</h3>
        <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-300">
          {unlockedAchievements.length}/{achievements.length}
        </Badge>
      </div>

      <div className="space-y-3">
        {unlockedAchievements.map(achievement => (
          <div key={achievement.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="p-2 bg-gray-800 text-white rounded-full">
              <Award size={16} />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{achievement.name}</h4>
              <p className="text-sm text-gray-600">{achievement.description}</p>
            </div>
            <Badge className="bg-gray-800 text-white border-gray-800">
              Unlocked
            </Badge>
          </div>
        ))}

        {lockedAchievements.map(achievement => (
          <div key={achievement.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg opacity-60">
            <div className="p-2 bg-gray-200 text-gray-400 rounded-full">
              <Lock size={16} />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-500">{achievement.name}</h4>
              <p className="text-sm text-gray-400">{achievement.description}</p>
            </div>
            <Badge variant="outline" className="bg-gray-100 text-gray-500 border-gray-300">
              Locked
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AchievementBadges;

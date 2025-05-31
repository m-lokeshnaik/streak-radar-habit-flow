
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
    <Card className="p-8 border-2 border-violet-light/30 rounded-2xl bg-gradient-to-br from-white to-violet-light/10 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-violet-medium/20 rounded-full">
          <Award className="text-violet-dark" size={24} />
        </div>
        <h3 className="text-xl font-bold text-gray-dark">Achievements</h3>
        <Badge variant="outline" className="bg-violet-light/20 text-violet-dark border-violet-medium/30 rounded-full px-4 py-1 font-semibold">
          {unlockedAchievements.length}/{achievements.length}
        </Badge>
      </div>

      <div className="space-y-4">
        {unlockedAchievements.map(achievement => (
          <div key={achievement.id} className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-violet-light/20 rounded-2xl border border-emerald-200/50">
            <div className="p-3 bg-emerald-500 text-white rounded-full shadow-lg">
              <Award size={20} />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-dark text-lg">{achievement.name}</h4>
              <p className="text-sm text-gray-medium mt-1">{achievement.description}</p>
            </div>
            <Badge className="bg-emerald-500 text-white border-emerald-500 rounded-full px-4 py-2 font-medium shadow-md">
              Unlocked ✨
            </Badge>
          </div>
        ))}

        {lockedAchievements.map(achievement => (
          <div key={achievement.id} className="flex items-center gap-4 p-4 border border-violet-light/40 rounded-2xl opacity-60 bg-gray-light/50">
            <div className="p-3 bg-gray-medium text-white rounded-full">
              <Lock size={20} />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-medium text-lg">{achievement.name}</h4>
              <p className="text-sm text-gray-medium/70 mt-1">{achievement.description}</p>
            </div>
            <Badge variant="outline" className="bg-gray-light text-gray-medium border-gray-medium/30 rounded-full px-4 py-2 font-medium">
              Locked 🔒
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AchievementBadges;

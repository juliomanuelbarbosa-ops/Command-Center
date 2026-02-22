import { useState, useEffect } from 'react';
import { Shield, Target, Trophy, Crosshair, Zap } from 'lucide-react';

export function MissionLog() {
  const [status, setStatus] = useState({ xp: 14250, streak: 12 });

  useEffect(() => {
    fetch('/api/mission-status')
      .then(res => res.json())
      .then(data => setStatus(data));
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="mb-8">
        <h1 className="text-3xl font-mono font-bold neon-text-cyan mb-2 flex items-center gap-3">
          <Shield className="w-8 h-8" /> MISSION_LOG
        </h1>
        <p className="text-gray-400 font-mono text-sm">XP, STREAKS & OBJECTIVES</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-panel p-6 flex items-center justify-between">
          <div>
            <h2 className="font-mono text-sm text-gray-400 mb-1">CURRENT_RANK</h2>
            <div className="text-3xl font-mono font-bold text-amber-400 flex items-center gap-3">
              <Trophy className="w-6 h-6" /> OPERATIVE_V2
            </div>
          </div>
          <div className="text-right">
            <h2 className="font-mono text-sm text-gray-400 mb-1">TOTAL_XP</h2>
            <div className="text-3xl font-mono font-bold text-cyber-cyan">{status.xp}</div>
          </div>
        </div>

        <div className="glass-panel p-6 flex items-center justify-between">
          <div>
            <h2 className="font-mono text-sm text-gray-400 mb-1">DAILY_STREAK</h2>
            <div className="text-3xl font-mono font-bold text-cyber-magenta flex items-center gap-3">
              <Zap className="w-6 h-6" /> {status.streak} DAYS
            </div>
          </div>
          <div className="text-right">
            <h2 className="font-mono text-sm text-gray-400 mb-1">MULTIPLIER</h2>
            <div className="text-3xl font-mono font-bold text-emerald-400">1.5x</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-mono text-sm text-cyber-cyan flex items-center gap-2">
          <Target className="w-4 h-4" /> ACTIVE_OBJECTIVES
        </h3>
        
        {[
          { title: 'Daily Bio-Sync', desc: 'Complete 10,000 steps', progress: 84, xp: 500 },
          { title: 'Neural Training', desc: 'Run 5 prompts through AI Forge', progress: 40, xp: 300 },
          { title: 'Signal Intelligence', desc: 'Log in from 3 different locations', progress: 100, xp: 1000, completed: true },
        ].map((mission, i) => (
          <div key={i} className={`glass-panel p-4 border-l-4 ${mission.completed ? 'border-l-emerald-400' : 'border-l-cyber-cyan'} hover:bg-white/5 transition-colors`}>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className={`font-mono font-bold ${mission.completed ? 'text-emerald-400' : 'text-white'}`}>
                  {mission.title}
                </h4>
                <p className="text-xs text-gray-400 font-mono mt-1">{mission.desc}</p>
              </div>
              <div className="text-xs font-mono font-bold text-amber-400 bg-amber-400/10 px-2 py-1 rounded">
                +{mission.xp} XP
              </div>
            </div>
            
            {!mission.completed && (
              <div className="mt-4">
                <div className="flex justify-between text-[10px] font-mono text-gray-400 mb-1">
                  <span>PROGRESS</span>
                  <span>{mission.progress}%</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-cyber-cyan h-full transition-all duration-1000" 
                    style={{ width: `${mission.progress}%` }} 
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

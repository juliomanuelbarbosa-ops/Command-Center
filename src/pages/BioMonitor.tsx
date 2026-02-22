import { Activity, Heart, Footprints, Moon } from 'lucide-react';

export function BioMonitor() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="mb-8">
        <h1 className="text-3xl font-mono font-bold neon-text-magenta mb-2 flex items-center gap-3">
          <Activity className="w-8 h-8" /> BIO_MONITOR
        </h1>
        <p className="text-gray-400 font-mono text-sm">VITAL SIGNS & TELEMETRY</p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel p-5 flex flex-col items-center justify-center text-center gap-2 hover:border-rose-500 transition-all">
          <Heart className="w-8 h-8 text-rose-500 animate-pulse" />
          <div className="text-2xl font-mono mt-2">72 <span className="text-xs text-gray-500">BPM</span></div>
          <div className="text-[10px] text-gray-400 font-mono">HEART_RATE</div>
        </div>

        <div className="glass-panel p-5 flex flex-col items-center justify-center text-center gap-2 hover:border-emerald-400 transition-all">
          <Footprints className="w-8 h-8 text-emerald-400" />
          <div className="text-2xl font-mono mt-2">8,432</div>
          <div className="text-[10px] text-gray-400 font-mono">STEPS_TODAY</div>
        </div>

        <div className="glass-panel p-5 flex flex-col items-center justify-center text-center gap-2 hover:border-indigo-400 transition-all">
          <Moon className="w-8 h-8 text-indigo-400" />
          <div className="text-2xl font-mono mt-2">6h 42m</div>
          <div className="text-[10px] text-gray-400 font-mono">LAST_SLEEP</div>
        </div>

        <div className="glass-panel p-5 flex flex-col items-center justify-center text-center gap-2 hover:border-amber-400 transition-all">
          <Activity className="w-8 h-8 text-amber-400" />
          <div className="text-2xl font-mono mt-2">2,150 <span className="text-xs text-gray-500">KCAL</span></div>
          <div className="text-[10px] text-gray-400 font-mono">ENERGY_BURN</div>
        </div>
      </div>

      <div className="glass-panel p-6 mt-6">
        <h2 className="font-mono text-sm text-cyber-magenta mb-6">TELEMETRY_GRAPH</h2>
        <div className="h-[200px] w-full flex items-end gap-2">
          {[40, 60, 45, 80, 55, 90, 70, 65, 85, 50, 75, 60].map((height, i) => (
            <div key={i} className="flex-1 bg-cyber-magenta/20 hover:bg-cyber-magenta/40 transition-colors rounded-t-sm relative group">
              <div 
                className="absolute bottom-0 left-0 right-0 bg-cyber-magenta rounded-t-sm transition-all duration-500"
                style={{ height: `${height}%` }}
              />
              <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-xs font-mono px-2 py-1 rounded border border-white/10 pointer-events-none transition-opacity z-10">
                {height}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-[10px] font-mono text-gray-500">
          <span>00:00</span>
          <span>12:00</span>
          <span>24:00</span>
        </div>
      </div>
    </div>
  );
}

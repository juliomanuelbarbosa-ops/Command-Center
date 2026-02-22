import { Radio, MapPin, Wifi, Signal } from 'lucide-react';

export function SignalNexus() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
      <header className="mb-8 shrink-0">
        <h1 className="text-3xl font-mono font-bold neon-text-cyan mb-2 flex items-center gap-3">
          <Radio className="w-8 h-8" /> SIGNAL_NEXUS
        </h1>
        <p className="text-gray-400 font-mono text-sm">WAR-DRIVING & SPECTRUM ANALYSIS</p>
      </header>

      <div className="flex-1 glass-panel relative overflow-hidden flex flex-col">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(#00FFFF 1px, transparent 1px), linear-gradient(90deg, #00FFFF 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
        
        <div className="flex-1 flex items-center justify-center relative">
          {/* Mock Map Visualization */}
          <div className="relative w-64 h-64">
            <div className="absolute inset-0 border-2 border-cyber-cyan/30 rounded-full animate-ping" />
            <div className="absolute inset-0 border-2 border-cyber-cyan/50 rounded-full animate-pulse" />
            <div className="absolute inset-0 border border-cyber-cyan rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-cyber-cyan rounded-full shadow-[0_0_15px_#00FFFF]" />
            
            {/* Hotspots */}
            <div className="absolute top-10 left-10 group">
              <div className="w-3 h-3 bg-cyber-magenta rounded-full animate-pulse" />
              <div className="hidden group-hover:block absolute top-4 left-4 glass-panel p-2 text-[10px] font-mono whitespace-nowrap z-10">
                SSID: X-NET-01<br/>SIG: -45dBm
              </div>
            </div>
            <div className="absolute bottom-20 right-10 group">
              <div className="w-3 h-3 bg-cyber-purple rounded-full animate-pulse" />
              <div className="hidden group-hover:block absolute top-4 left-4 glass-panel p-2 text-[10px] font-mono whitespace-nowrap z-10">
                SSID: GHOST_WIFI<br/>SIG: -62dBm
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-white/10 bg-black/40 grid grid-cols-2 md:grid-cols-4 gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <Wifi className="text-cyber-cyan w-5 h-5" />
            <div>
              <div className="text-[10px] text-gray-500 font-mono">NETWORKS</div>
              <div className="text-sm font-mono">14 ACTIVE</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Signal className="text-cyber-magenta w-5 h-5" />
            <div>
              <div className="text-[10px] text-gray-400 font-mono">AVG_SIGNAL</div>
              <div className="text-sm font-mono">-58 dBm</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="text-emerald-400 w-5 h-5" />
            <div>
              <div className="text-[10px] text-gray-400 font-mono">COORDS</div>
              <div className="text-sm font-mono">34.05, -118.24</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Radio className="text-cyber-purple w-5 h-5" />
            <div>
              <div className="text-[10px] text-gray-400 font-mono">MODE</div>
              <div className="text-sm font-mono">PASSIVE_SCAN</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

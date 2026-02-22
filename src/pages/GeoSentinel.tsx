import { Shield, AlertTriangle, Zap, Wind } from 'lucide-react';

export function GeoSentinel() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="mb-8">
        <h1 className="text-3xl font-mono font-bold neon-text-magenta mb-2 flex items-center gap-3">
          <Shield className="w-8 h-8" /> GEO_SENTINEL
        </h1>
        <p className="text-gray-400 font-mono text-sm">REAL-TIME GLOBAL ALERT SYSTEM</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div className="glass-panel p-6 border-l-4 border-l-rose-500 bg-rose-500/5">
            <div className="flex items-center gap-3 text-rose-500 mb-2">
              <AlertTriangle className="w-6 h-6" />
              <h2 className="font-mono font-bold">CRITICAL_ALERT: SEISMIC_ACTIVITY</h2>
            </div>
            <p className="text-sm font-mono text-gray-300">Magnitude 6.2 earthquake detected near Tokyo, Japan. Tsunami warning issued for coastal regions.</p>
            <div className="mt-4 flex justify-between items-center text-[10px] font-mono text-gray-500">
              <span>SOURCE: USGS_CORE</span>
              <span>TIME: 2M AGO</span>
            </div>
          </div>

          <div className="glass-panel p-6 border-l-4 border-l-amber-500 bg-amber-500/5">
            <div className="flex items-center gap-3 text-amber-500 mb-2">
              <Wind className="w-6 h-6" />
              <h2 className="font-mono font-bold">WEATHER_WARNING: CYCLONE_SIGMA</h2>
            </div>
            <p className="text-sm font-mono text-gray-300">Category 4 cyclone approaching the Philippines. Expected landfall in 12 hours. Winds up to 220km/h.</p>
            <div className="mt-4 flex justify-between items-center text-[10px] font-mono text-gray-500">
              <span>SOURCE: NOAA_SAT</span>
              <span>TIME: 15M AGO</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass-panel p-6">
            <h3 className="font-mono text-sm text-cyber-magenta mb-4">THREAT_LEVEL</h3>
            <div className="flex items-center justify-center py-4">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/10" />
                  <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="364" strokeDashoffset="100" className="text-rose-500" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-mono text-2xl font-bold text-rose-500">
                  HIGH
                </div>
              </div>
            </div>
            <p className="text-[10px] font-mono text-center text-gray-500">ELEVATED GLOBAL INSTABILITY</p>
          </div>

          <div className="glass-panel p-6">
            <h3 className="font-mono text-sm text-cyber-cyan mb-4">ACTIVE_SENSORS</h3>
            <div className="space-y-2">
              <div className="flex justify-between font-mono text-xs">
                <span className="text-gray-400">SAT_LINK_01</span>
                <span className="text-emerald-400">ONLINE</span>
              </div>
              <div className="flex justify-between font-mono text-xs">
                <span className="text-gray-400">GROUND_STATION_A</span>
                <span className="text-emerald-400">ONLINE</span>
              </div>
              <div className="flex justify-between font-mono text-xs">
                <span className="text-gray-400">BUOY_ARRAY_PACIFIC</span>
                <span className="text-amber-400">DEGRADED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

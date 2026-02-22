import { Activity, Zap, Shield, Radio, TrendingUp, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';

export function HomeDashboard() {
  const { settings } = useUser();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-mono font-bold neon-text-cyan mb-2">COMMAND_CENTER_V6</h1>
          <p className="text-gray-400 font-mono text-sm">OPERATIVE: <span className="text-cyber-cyan">{settings.operatorId}</span> | STATUS: <span className="text-emerald-400">NOMINAL</span></p>
        </div>
        <div className="glass-panel px-4 py-2 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-mono text-gray-400">ENCRYPTED_LINK_ACTIVE</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 flex flex-col gap-3 group hover:neon-border-cyan transition-all">
          <div className="flex items-center justify-between text-cyber-cyan">
            <Activity className="w-5 h-5" />
            <span className="font-mono text-[10px]">BIO_SYNC</span>
          </div>
          <div className="text-3xl font-mono">98%</div>
          <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '98%' }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="bg-cyber-cyan h-full" 
            />
          </div>
        </div>

        <div className="glass-panel p-5 flex flex-col gap-3 group hover:border-cyber-magenta transition-all">
          <div className="flex items-center justify-between text-cyber-magenta">
            <Zap className="w-5 h-5" />
            <span className="font-mono text-[10px]">NEURAL_LOAD</span>
          </div>
          <div className="text-3xl font-mono">
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              42%
            </motion.span>
          </div>
          <div className="text-[10px] text-gray-400 font-mono mt-1">Processing: 1.2 Tflops</div>
        </div>

        <div className="glass-panel p-5 flex flex-col gap-3 group hover:border-emerald-400 transition-all">
          <div className="flex items-center justify-between text-emerald-400">
            <Shield className="w-5 h-5" />
            <span className="font-mono text-[10px]">SEC_LEVEL</span>
          </div>
          <div className="text-3xl font-mono">MAX</div>
          <div className="text-[10px] text-gray-400 font-mono mt-1">Firewall: Active</div>
        </div>

        <div className="glass-panel p-5 flex flex-col gap-3 group hover:border-cyber-purple transition-all">
          <div className="flex items-center justify-between text-cyber-purple">
            <TrendingUp className="w-5 h-5" />
            <span className="font-mono text-[10px]">MARKET_VOL</span>
          </div>
          <div className="text-3xl font-mono">+12.4%</div>
          <div className="text-[10px] text-gray-400 font-mono mt-1">Portfolio: Bullish</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 glass-panel p-6 min-h-[300px]">
          <h2 className="font-mono text-sm text-cyber-cyan mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4" /> GLOBAL_INTEL_FEED
          </h2>
          <div className="space-y-4">
            {[
              { time: '14:22', msg: 'Signal Nexus detected 12 new hotspots in sector 7', type: 'info' },
              { time: '13:45', msg: 'Geo Sentinel: Seismic activity detected in Pacific Rim', type: 'warn' },
              { time: '12:10', msg: 'Neural Library: 5 new intel nodes archived', type: 'success' },
              { time: '11:05', msg: 'Bio Monitor: Sleep cycle optimization recommended', type: 'info' },
            ].map((log, i) => (
              <div key={i} className="flex gap-4 font-mono text-sm border-b border-white/5 pb-3 hover:bg-white/5 transition-colors p-2 rounded">
                <span className="text-gray-500">{log.time}</span>
                <span className={
                  log.type === 'warn' ? 'text-amber-400' : 
                  log.type === 'success' ? 'text-emerald-400' : 'text-gray-300'
                }>{log.msg}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6 min-h-[300px]">
          <h2 className="font-mono text-sm text-cyber-magenta mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4" /> ACTIVE_MISSIONS
          </h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyber-magenta transition-all">
              <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-sm">OP_DEEP_DIVE</span>
                <span className="text-[10px] text-cyber-magenta font-mono">IN_PROGRESS</span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-cyber-magenta h-full w-[65%]" />
              </div>
              <div className="text-xs text-gray-400 font-mono mt-2 text-right">65%</div>
            </div>
            
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyber-cyan transition-all">
              <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-sm">BIO_RECOVERY</span>
                <span className="text-[10px] text-cyber-cyan font-mono">8H_REMAINING</span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-cyber-cyan h-full w-[30%]" />
              </div>
              <div className="text-xs text-gray-400 font-mono mt-2 text-right">30%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

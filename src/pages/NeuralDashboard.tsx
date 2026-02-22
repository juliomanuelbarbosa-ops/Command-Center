import { Cpu, Network, Database } from 'lucide-react';

export function NeuralDashboard() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="mb-8">
        <h1 className="text-3xl font-mono font-bold neon-text-purple mb-2">NEURAL_DASHBOARD</h1>
        <p className="text-gray-400 font-mono text-sm">COGNITIVE PROCESSING CENTER</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 flex flex-col items-center justify-center text-center min-h-[200px] hover:neon-border-cyan transition-all">
          <Cpu className="w-12 h-12 text-cyber-purple mb-4" />
          <h3 className="font-mono text-lg mb-1">GEMINI_CORE</h3>
          <p className="text-xs text-gray-400 font-mono">Model: gemini-3.1-pro</p>
          <div className="mt-4 px-3 py-1 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 text-xs font-mono">
            ONLINE
          </div>
        </div>

        <div className="glass-panel p-6 flex flex-col items-center justify-center text-center min-h-[200px] hover:neon-border-cyan transition-all">
          <Network className="w-12 h-12 text-cyber-cyan mb-4" />
          <h3 className="font-mono text-lg mb-1">MULTI_AGENT_SWARM</h3>
          <p className="text-xs text-gray-400 font-mono">Active Agents: 12</p>
          <div className="mt-4 px-3 py-1 rounded-full bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/20 text-xs font-mono">
            SYNCING
          </div>
        </div>

        <div className="glass-panel p-6 flex flex-col items-center justify-center text-center min-h-[200px] hover:neon-border-cyan transition-all">
          <Database className="w-12 h-12 text-cyber-magenta mb-4" />
          <h3 className="font-mono text-lg mb-1">RAG_MEMORY</h3>
          <p className="text-xs text-gray-400 font-mono">Vectors: 1.2M</p>
          <div className="mt-4 px-3 py-1 rounded-full bg-cyber-magenta/10 text-cyber-magenta border border-cyber-magenta/20 text-xs font-mono">
            INDEXED
          </div>
        </div>
      </div>

      <div className="glass-panel p-6">
        <h2 className="font-mono text-sm text-cyber-purple mb-4">NEURAL_TOPOLOGY</h2>
        <div className="h-[300px] w-full border border-white/5 rounded-xl bg-black/20 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'radial-gradient(circle at center, #9D00FF 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}></div>
          <div className="text-gray-500 font-mono text-sm z-10 bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10">
            [VISUALIZATION_RENDER_PENDING]
          </div>
        </div>
      </div>
    </div>
  );
}

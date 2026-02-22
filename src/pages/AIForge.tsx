import { useState } from 'react';
import { Zap, Terminal, Image as ImageIcon, MessageSquare, Code } from 'lucide-react';

export function AIForge() {
  const [activeTab, setActiveTab] = useState('chat');

  const tabs = [
    { id: 'chat', name: 'ORACLE_CHAT', icon: MessageSquare },
    { id: 'vision', name: 'VISION_STUDIO', icon: ImageIcon },
    { id: 'code', name: 'CODE_NEXUS', icon: Code },
  ];

  return (
    <div className="h-full flex flex-col animate-in fade-in duration-500 max-h-[calc(100vh-8rem)] md:max-h-[calc(100vh-4rem)]">
      <header className="mb-6 shrink-0">
        <h1 className="text-3xl font-mono font-bold neon-text-cyan mb-2 flex items-center gap-3">
          <Zap className="w-8 h-8" /> AI_FORGE
        </h1>
        <p className="text-gray-400 font-mono text-sm">UNIFIED GENERATIVE INTELLIGENCE</p>
      </header>

      <div className="flex gap-2 mb-4 overflow-x-auto pb-2 shrink-0 no-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm whitespace-nowrap transition-colors ${
              activeTab === tab.id 
                ? 'bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/50' 
                : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.name}
          </button>
        ))}
      </div>

      <div className="flex-1 glass-panel flex flex-col overflow-hidden relative">
        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col p-4">
            <div className="flex-1 flex items-center justify-center text-gray-500 font-mono text-sm flex-col gap-4">
              <Terminal className="w-12 h-12 opacity-50 text-cyber-cyan" />
              <p>AWAITING_INPUT</p>
            </div>
            <div className="mt-4 relative">
              <input 
                type="text" 
                placeholder="Query the Oracle..." 
                className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-white font-mono text-sm outline-none focus:border-cyber-cyan transition-colors"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-cyber-cyan hover:bg-cyber-cyan/10 rounded-lg transition-colors">
                <Zap className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'vision' && (
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="text-center space-y-4">
              <ImageIcon className="w-16 h-16 text-cyber-magenta mx-auto opacity-50" />
              <p className="font-mono text-sm text-gray-400">IMAGE_GENERATION_MODULE_OFFLINE</p>
              <button className="px-4 py-2 bg-cyber-magenta/20 text-cyber-magenta border border-cyber-magenta/50 rounded-lg font-mono text-sm hover:bg-cyber-magenta/30 transition-colors">
                INITIALIZE_STABLE_DIFFUSION
              </button>
            </div>
          </div>
        )}

        {activeTab === 'code' && (
          <div className="flex-1 p-4 flex flex-col">
            <div className="flex-1 bg-black/80 border border-white/10 rounded-xl p-4 font-mono text-sm text-emerald-400 overflow-y-auto">
              <pre><code>{`// CODE_NEXUS INITIALIZED
function optimizeAlgorithm(input) {
  // Analyzing complexity...
  // O(n^2) detected. Refactoring to O(n log n)
  return input.sort((a, b) => a - b);
}

> Ready for code generation or review.`}</code></pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

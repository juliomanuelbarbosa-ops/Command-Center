import { motion } from 'framer-motion';
import { Terminal, ExternalLink, AlertCircle } from 'lucide-react';

interface GenericHubProps {
  title: string;
  description: string;
  category: string;
  icon: any;
}

export function GenericHub({ title, description, category, icon: Icon }: GenericHubProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 bg-cyber-cyan/10 border border-cyber-cyan/30 rounded-xl">
            <Icon className="w-8 h-8 text-cyber-cyan" />
          </div>
          <div>
            <h1 className="text-3xl font-mono font-bold neon-text-cyan">{title}</h1>
            <p className="text-gray-400 font-mono text-sm">{category} // {description}</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 space-y-4">
          <h2 className="font-mono text-sm text-cyber-cyan flex items-center gap-2">
            <Terminal className="w-4 h-4" /> MODULE_STATUS
          </h2>
          <div className="p-4 bg-black/50 border border-white/10 rounded-xl font-mono text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">INITIALIZING...</span>
              <span className="text-emerald-400">OK</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">NEURAL_LINK...</span>
              <span className="text-emerald-400">STABLE</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">DATA_STREAM...</span>
              <span className="text-cyber-magenta">ENCRYPTED</span>
            </div>
          </div>
          <p className="text-sm text-gray-400 font-mono">
            This module is currently operating in passive mode. Full interactive capabilities are being deployed to your sector.
          </p>
        </div>

        <div className="glass-panel p-6 flex flex-col justify-center items-center text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-cyber-magenta opacity-50" />
          <h3 className="font-mono text-lg">WEB_VIEW_FALLBACK</h3>
          <p className="text-xs text-gray-500 font-mono max-w-xs">
            Some advanced features of this hub require a full browser environment or external API keys.
          </p>
          <button className="flex items-center gap-2 px-4 py-2 bg-cyber-magenta/20 text-cyber-magenta border border-cyber-magenta/50 rounded-xl font-mono text-sm hover:bg-cyber-magenta/30 transition-all">
            OPEN_EXTERNAL_INTERFACE <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="glass-panel p-6">
        <h2 className="font-mono text-sm text-cyber-cyan mb-4">ACTIVITY_LOG</h2>
        <div className="space-y-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex gap-4 font-mono text-xs border-b border-white/5 pb-2">
              <span className="text-gray-600">0{i}:00:00</span>
              <span className="text-gray-400">System heartbeat detected in {title} module.</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

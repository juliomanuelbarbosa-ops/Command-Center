import { useState, useEffect } from 'react';
import { Settings, User, Bell, Zap, Shield, Save, Image as ImageIcon, Loader2, RefreshCw } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useNotify } from '../context/NotificationContext';
import { motion, AnimatePresence } from 'framer-motion';
import { generateAppIcon } from '../services/imageService';

export function SystemSettings() {
  const { settings, updateSettings } = useUser();
  const { notify } = useNotify();
  const [localId, setLocalId] = useState(settings.operatorId);
  const [iconUrl, setIconUrl] = useState<string | null>(localStorage.getItem('app_icon_url'));
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSave = () => {
    updateSettings({ operatorId: localId });
    notify("SYSTEM_UPDATE: Operator profile synchronized", "SUCCESS");
  };

  const handleGenerateIcon = async () => {
    setIsGenerating(true);
    notify("NEURAL_SYNTHESIS: Generating new app icon...", "INFO");
    
    const prompt = "A futuristic, high-tech app icon for a command center. The icon features a stylized geometric hexagonal shield with glowing neon cyan and magenta circuits. Dark matte black background, sleek 3D glass morphism effect, sharp edges, professional digital art.";
    
    const url = await generateAppIcon(prompt);
    if (url) {
      setIconUrl(url);
      localStorage.setItem('app_icon_url', url);
      notify("SYNTHESIS_COMPLETE: New app icon generated", "SUCCESS");
    } else {
      notify("SYNTHESIS_FAILURE: Unable to generate icon", "ERROR");
    }
    setIsGenerating(false);
  };

  return (
    <div className="h-full flex flex-col animate-in fade-in duration-500">
      <header className="mb-6 shrink-0">
        <h1 className="text-3xl font-mono font-bold neon-text-cyan mb-2 flex items-center gap-3">
          <Settings className="w-8 h-8" /> SYSTEM_SETTINGS
        </h1>
        <p className="text-gray-400 font-mono text-sm">CORE CONFIGURATION & OPERATOR PROFILE</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 space-y-6">
          <h2 className="font-mono text-sm text-cyber-cyan flex items-center gap-2">
            <ImageIcon className="w-4 h-4" /> APP_IDENTITY
          </h2>
          
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-32 h-32 rounded-3xl overflow-hidden border-2 border-cyber-cyan/30 bg-black/50 flex items-center justify-center group">
              {iconUrl ? (
                <img src={iconUrl} alt="App Icon" className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="w-12 h-12 text-gray-700" />
              )}
              {isGenerating && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-cyber-cyan animate-spin" />
                </div>
              )}
            </div>
            
            <button
              onClick={handleGenerateIcon}
              disabled={isGenerating}
              className="flex items-center gap-2 bg-cyber-cyan/10 hover:bg-cyber-cyan/20 disabled:opacity-50 text-cyber-cyan border border-cyber-cyan/30 rounded-xl px-6 py-2 font-mono text-xs transition-all"
            >
              {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              GENERATE_NEW_ICON
            </button>
          </div>
        </div>

        <div className="glass-panel p-6 space-y-6">
          <h2 className="font-mono text-sm text-cyber-cyan flex items-center gap-2">
            <User className="w-4 h-4" /> OPERATOR_PROFILE
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono text-gray-500 mb-1">OPERATOR_IDENTIFIER</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={localId}
                  onChange={(e) => setLocalId(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white font-mono text-sm outline-none focus:border-cyber-cyan transition-all"
                />
                <button 
                  onClick={handleSave}
                  className="bg-cyber-cyan/20 hover:bg-cyber-cyan/30 text-cyber-cyan border border-cyber-cyan/50 rounded-xl px-4 py-2 flex items-center justify-center transition-all"
                >
                  <Save className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-4 bg-cyber-cyan/5 border border-cyber-cyan/20 rounded-xl">
              <div className="text-[10px] font-mono text-cyber-cyan mb-1">NEURAL_SIGNATURE</div>
              <div className="text-xs text-gray-400 font-mono break-all opacity-50">
                {btoa(settings.operatorId).substring(0, 32)}...
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 space-y-6">
          <h2 className="font-mono text-sm text-cyber-magenta flex items-center gap-2">
            <Zap className="w-4 h-4" /> INTERFACE_CONFIG
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center gap-3">
                <Zap className="w-4 h-4 text-cyber-magenta" />
                <span className="font-mono text-xs">HAPTIC_FEEDBACK</span>
              </div>
              <button 
                onClick={() => updateSettings({ haptics: !settings.haptics })}
                className={`w-10 h-5 rounded-full transition-all relative ${settings.haptics ? 'bg-cyber-magenta' : 'bg-gray-700'}`}
              >
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${settings.haptics ? 'left-6' : 'left-1'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center gap-3">
                <Bell className="w-4 h-4 text-cyber-cyan" />
                <span className="font-mono text-xs">SYSTEM_ALERTS</span>
              </div>
              <button 
                onClick={() => updateSettings({ notifications: !settings.notifications })}
                className={`w-10 h-5 rounded-full transition-all relative ${settings.notifications ? 'bg-cyber-cyan' : 'bg-gray-700'}`}
              >
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${settings.notifications ? 'left-6' : 'left-1'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span className="font-mono text-xs">STEALTH_MODE</span>
              </div>
              <button 
                onClick={() => updateSettings({ theme: settings.theme === 'STEALTH' ? 'CYBER' : 'STEALTH' })}
                className={`w-10 h-5 rounded-full transition-all relative ${settings.theme === 'STEALTH' ? 'bg-emerald-500' : 'bg-gray-700'}`}
              >
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${settings.theme === 'STEALTH' ? 'left-6' : 'left-1'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

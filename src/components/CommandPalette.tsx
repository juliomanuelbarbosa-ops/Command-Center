import { useState, useEffect, useCallback } from 'react';
import { Search, X, Activity, Cpu, Radio, Shield, Zap, Mic, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { HUB_REGISTRY } from '../HubRegistry';

export function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();

  const handleVoiceCommand = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition not supported.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      setQuery(transcript);
      const foundHub = HUB_REGISTRY.find(hub => transcript.includes(hub.name.toLowerCase()));
      if (foundHub) {
        navigate(foundHub.path);
        onClose();
      }
    };
    recognition.start();
  }, [navigate, onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredHubs = HUB_REGISTRY.filter(hub => hub.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/90 backdrop-blur-md z-50" />
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="fixed top-[15%] left-1/2 -translate-x-1/2 w-full max-w-xl z-50 px-4">
            <div className="glass-panel overflow-hidden border-2 border-cyber-cyan/30 shadow-[0_0_50px_rgba(0,255,255,0.2)]">
              <div className="flex items-center px-6 py-4 border-b border-white/10">
                <Search className="w-6 h-6 text-cyber-cyan mr-4" />
                <input autoFocus type="text" placeholder="Search hubs or say 'Hey Command'..." value={query} onChange={(e) => setQuery(e.target.value)} className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-600 font-mono text-lg" />
                <button onClick={handleVoiceCommand} className={`p-3 rounded-full transition-all ${isListening ? 'bg-cyber-magenta/20 text-cyber-magenta animate-pulse' : 'text-gray-500 hover:text-cyber-cyan'}`}>
                  <Mic className="w-6 h-6" />
                </button>
              </div>
              <div className="max-h-[50vh] overflow-y-auto p-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredHubs.map((hub) => (
                  <button key={hub.id} onClick={() => { navigate(hub.path); onClose(); }} className="flex items-center px-4 py-4 rounded-2xl hover:bg-cyber-cyan/10 transition-all group border border-transparent hover:border-cyber-cyan/30">
                    <hub.icon className="w-6 h-6 text-gray-500 group-hover:text-cyber-cyan mr-4 transition-colors" />
                    <span className="font-mono text-sm text-gray-400 group-hover:text-white">{hub.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

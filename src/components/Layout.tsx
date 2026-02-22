import { useState, useEffect, useCallback } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Home, Cpu, Radio, Activity, Shield, Zap, Command, Menu, X, Bell } from 'lucide-react';
import { CommandPalette } from './CommandPalette';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { id: 'home', icon: Home, path: '/', label: 'DASHBOARD' },
  { id: 'neural', icon: Cpu, path: '/neural', label: 'NEURAL' },
  { id: 'operator', icon: Radio, path: '/operator', label: 'COMMS' },
  { id: 'bio', icon: Activity, path: '/bio', label: 'BIO' },
  { id: 'mission', icon: Shield, path: '/mission', label: 'LOG' },
  { id: 'forge', icon: Zap, path: '/forge', label: 'FORGE' },
];

import { HUB_REGISTRY } from '../HubRegistry';

export function Layout() {
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [notifications, setNotifications] = useState<{id: number, msg: string}[]>([]);
  const location = useLocation();

  const CORE_HUBS = HUB_REGISTRY.filter(h => h.category === 'CORE');
  const OTHER_HUBS = HUB_REGISTRY.filter(h => h.category !== 'CORE');

  const triggerHaptic = useCallback((pattern = 10) => {
    if ('vibrate' in navigator) navigator.vibrate(pattern);
  }, []);

  const addNotification = useCallback((msg: string) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, msg }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  }, []);

  // Shake to refresh & Haptics on Nav
  useEffect(() => {
    let lastX: number, lastY: number, lastZ: number;
    let moveCounter = 0;

    const handleMotion = (e: DeviceMotionEvent) => {
      const acc = e.accelerationIncludingGravity;
      if (!acc) return;
      const { x, y, z } = acc;
      if (lastX !== undefined) {
        const delta = Math.abs(lastX - (x || 0)) + Math.abs(lastY - (y || 0)) + Math.abs(lastZ - (z || 0));
        if (delta > 35) moveCounter++;
        else moveCounter = Math.max(0, moveCounter - 1);
        if (moveCounter > 8) {
          triggerHaptic([50, 30, 50]);
          window.location.reload();
        }
      }
      lastX = x || 0; lastY = y || 0; lastZ = z || 0;
    };

    window.addEventListener('devicemotion', handleMotion);
    return () => window.removeEventListener('devicemotion', handleMotion);
  }, [triggerHaptic]);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-cyber-magenta overflow-hidden">
      {/* Top Bar */}
      <header className="h-16 border-b border-white/10 flex items-center justify-between px-4 glass-panel rounded-none border-x-0 border-t-0 z-40">
        <button onClick={() => { setIsDrawerOpen(true); triggerHaptic(); }} className="p-2 text-cyber-cyan">
          <Menu className="w-6 h-6" />
        </button>
        <div className="font-mono text-sm font-bold tracking-widest neon-text-cyan">COMMAND_CENTER_V6</div>
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            {notifications.length > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-cyber-magenta rounded-full animate-pulse" />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative z-0 pb-24">
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          <Outlet context={{ addNotification, triggerHaptic }} />
        </div>
      </main>

      {/* Notifications Overlay */}
      <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {notifications.map(n => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass-panel p-4 border-l-4 border-cyber-magenta pointer-events-auto min-w-[200px]"
            >
              <div className="text-[10px] font-mono text-cyber-magenta mb-1">INTEL_ALERT</div>
              <div className="text-xs font-mono">{n.msg}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Command FAB */}
      <button
        onClick={() => { setIsCommandOpen(true); triggerHaptic(20); }}
        className="fixed bottom-24 right-6 z-40 w-16 h-16 rounded-full bg-black border-2 border-cyber-cyan text-cyber-cyan flex items-center justify-center shadow-[0_0_30px_rgba(0,255,255,0.4)] hover:scale-110 active:scale-95 transition-all group"
      >
        <Command className="w-8 h-8 group-hover:animate-pulse" />
      </button>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 glass-panel rounded-none border-x-0 border-b-0 z-40 flex items-center justify-around px-2">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
          return (
            <NavLink
              key={item.id}
              to={item.path}
              onClick={() => triggerHaptic(5)}
              className={`flex flex-col items-center gap-1 transition-all duration-300 ${isActive ? 'text-cyber-cyan' : 'text-gray-500'}`}
            >
              <item.icon className={`w-6 h-6 ${isActive ? 'drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]' : ''}`} />
              <span className="text-[9px] font-mono font-bold tracking-tighter">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Secondary Hub Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-black border-r border-white/10 z-50 p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="font-mono text-cyber-cyan text-sm">SECONDARY_HUBS</div>
                <button onClick={() => setIsDrawerOpen(false)} className="text-gray-500 hover:text-white"><X className="w-6 h-6" /></button>
              </div>
              <div className="space-y-1 overflow-y-auto pr-2">
                {Object.entries(
                  OTHER_HUBS.reduce((acc, hub) => {
                    if (!acc[hub.category]) acc[hub.category] = [];
                    acc[hub.category].push(hub);
                    return acc;
                  }, {} as Record<string, typeof OTHER_HUBS>)
                ).map(([category, hubs]) => (
                  <div key={category} className="mb-4">
                    <div className="text-[10px] font-mono text-gray-600 mb-2 px-4">{category}</div>
                    {hubs.map(hub => (
                      <NavLink
                        key={hub.id}
                        to={hub.path}
                        onClick={() => { setIsDrawerOpen(false); triggerHaptic(5); }}
                        className={({isActive}) => `block p-3 rounded-xl font-mono text-xs transition-all ${isActive ? 'bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30' : 'text-gray-400 hover:bg-white/5'}`}
                      >
                        {hub.name}
                      </NavLink>
                    ))}
                  </div>
                ))}
              </div>
              <div className="mt-auto pt-8 border-t border-white/5">
                <div className="text-[10px] font-mono text-gray-600 mb-2">SYSTEM_VERSION: 6.0.4-STABLE</div>
                <div className="text-[10px] font-mono text-gray-600">UPTIME: 142:12:05</div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CommandPalette isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />
    </div>
  );
}

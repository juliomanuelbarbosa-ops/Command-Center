import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';

interface Notification {
  id: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
  message: string;
  timestamp: number;
}

interface NotificationContextType {
  notify: (message: string, type?: Notification['type']) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const notify = useCallback((message: string, type: Notification['type'] = 'INFO') => {
    const id = Math.random().toString(36).substring(7);
    setNotifications(prev => [...prev, { id, type, message, timestamp: Date.now() }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  }, []);

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <div className="fixed bottom-20 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {notifications.map(n => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border font-mono text-xs min-w-[240px] shadow-lg backdrop-blur-md ${
                n.type === 'ERROR' ? 'bg-red-500/20 border-red-500/50 text-red-200' :
                n.type === 'SUCCESS' ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-200' :
                n.type === 'WARNING' ? 'bg-amber-500/20 border-amber-500/50 text-amber-200' :
                'bg-cyber-cyan/20 border-cyber-cyan/50 text-cyber-cyan'
              }`}
            >
              {n.type === 'ERROR' && <AlertCircle className="w-4 h-4" />}
              {n.type === 'SUCCESS' && <CheckCircle className="w-4 h-4" />}
              {n.type === 'INFO' && <Info className="w-4 h-4" />}
              <span className="flex-1">{n.message}</span>
              <button onClick={() => setNotifications(prev => prev.filter(notif => notif.id !== n.id))}>
                <X className="w-3 h-3 opacity-50 hover:opacity-100" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
}

export function useNotify() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotify must be used within a NotificationProvider');
  }
  return context;
}

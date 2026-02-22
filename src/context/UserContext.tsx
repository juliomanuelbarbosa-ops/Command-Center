import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserSettings {
  operatorId: string;
  theme: 'CYBER' | 'MINIMAL' | 'STEALTH';
  haptics: boolean;
  notifications: boolean;
}

interface UserContextType {
  settings: UserSettings;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  xp: number;
  addXp: (amount: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<UserSettings>(() => {
    const saved = localStorage.getItem('operator_settings');
    return saved ? JSON.parse(saved) : {
      operatorId: 'OP_' + Math.floor(Math.random() * 10000).toString().padStart(4, '0'),
      theme: 'CYBER',
      haptics: true,
      notifications: true,
    };
  });

  const [xp, setXp] = useState(() => {
    const saved = localStorage.getItem('operator_xp');
    return saved ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem('operator_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('operator_xp', xp.toString());
  }, [xp]);

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const addXp = (amount: number) => {
    setXp(prev => prev + amount);
  };

  return (
    <UserContext.Provider value={{ settings, updateSettings, xp, addXp }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

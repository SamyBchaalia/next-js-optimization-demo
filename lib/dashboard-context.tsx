'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// ✅ SOLUTION: Use Context API to avoid prop drilling

interface User {
  name: string;
  role: string;
  email: string;
}

interface Stats {
  users: number;
  revenue: number;
  orders: number;
  growth: number;
}

interface DashboardContextType {
  user: User;
  stats: Stats;
  updateUser: (user: User) => void;
  updateStats: (stats: Stats) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>({
    name: 'John Doe',
    role: 'Admin',
    email: 'john@example.com',
  });

  const [stats, setStats] = useState<Stats>({
    users: 1234,
    revenue: 56780,
    orders: 890,
    growth: 12.5,
  });

  // ✅ Use useCallback to memoize functions
  const updateUser = useCallback((newUser: User) => {
    setUser(newUser);
  }, []);

  const updateStats = useCallback((newStats: Stats) => {
    setStats(newStats);
  }, []);

  return (
    <DashboardContext.Provider value={{ user, stats, updateUser, updateStats }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}

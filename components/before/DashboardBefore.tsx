'use client';

import { useState } from 'react';

// ❌ PROBLEM 1: Excessive prop drilling through multiple component levels
// ❌ PROBLEM 2: No memoization - all children re-render on any state change
// ❌ PROBLEM 3: Inline function definitions cause unnecessary re-renders

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

// Intentionally problematic component - no memoization
function StatCard({
  title,
  value,
  change,
  icon,
  onUpdate
}: {
  title: string;
  value: string | number;
  change: number;
  icon: string;
  onUpdate: () => void;
}) {
  // This will re-render even when its props haven't changed
  console.log(`🔴 StatCard "${title}" rendered`);

  return (
    <div className="card">
      <div className="flex justify-between items-start mb-2">
        <div className="text-3xl">{icon}</div>
        <button
          onClick={onUpdate}
          className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        >
          Refresh
        </button>
      </div>
      <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium">{title}</h3>
      <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-gray-100">{value}</p>
      <div className={`text-sm mt-2 ${change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
        {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% from last month
      </div>
    </div>
  );
}

// Intentionally problematic - receives all props even if only needs some
function UserList({
  user: _user,
  stats: _stats,
  theme: _theme,
  onUserUpdate: _onUserUpdate
}: {
  user: User;
  stats: Stats;
  theme: string;
  onUserUpdate: () => void;
}) {
  console.log('🔴 UserList rendered');

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Active Users</h3>
      <div className="space-y-3">
        {/* Simulating a list */}
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded">
            <div className="w-10 h-10 bg-primary-200 dark:bg-primary-900/50 rounded-full flex items-center justify-center">
              👤
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900 dark:text-gray-100">User {i}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">user{i}@example.com</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Problematic - receives props it doesn't need, causing unnecessary renders
function ActivityFeed({
  user: _user,
  stats: _stats,
  theme: _theme
}: {
  user: User;
  stats: Stats;
  theme: string;
}) {
  console.log('🔴 ActivityFeed rendered');

  // ❌ PROBLEM: Heavy computation in render without memoization
  const processedActivities = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    text: `Activity ${i + 1} - Processing data...`,
    time: `${i + 1}m ago`,
  }));

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Recent Activity</h3>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {processedActivities.map((activity) => (
          <div key={activity.id} className="text-sm p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded">
            <div className="font-medium text-gray-900 dark:text-gray-100">{activity.text}</div>
            <div className="text-gray-500 dark:text-gray-400 text-xs">{activity.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main dashboard with prop drilling issues
export default function DashboardBefore() {
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

  const [theme, setTheme] = useState('light');
  const [refreshCount, setRefreshCount] = useState(0);

  console.log('🔴 DashboardBefore rendered');

  // ❌ PROBLEM: Inline functions created on every render
  // These will cause child components to re-render even with React.memo
  const handleUserUpdate = () => {
    setUser({ ...user, name: user.name + '!' });
  };

  const handleStatsUpdate = () => {
    setStats({
      ...stats,
      users: stats.users + Math.floor(Math.random() * 10),
    });
  };

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-7xl mx-auto pt-16 lg:pt-0">
        {/* Header */}
        <div className="mb-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">Dashboard (Before)</h1>
            <p className="text-gray-600 dark:text-gray-400">
              This version has performance issues - check console for re-renders
            </p>
          </div>
          <div className="flex gap-2 lg:gap-4 flex-wrap">
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="btn-secondary text-sm"
            >
              Fake Toggle: {theme}
            </button>
            <button
              onClick={() => setRefreshCount(refreshCount + 1)}
              className="btn-primary text-sm"
            >
              Refresh ({refreshCount})
            </button>
          </div>
        </div>

        {/* Problems indicator */}
        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 dark:border-red-700 p-4 mb-6 rounded">
          <div className="flex items-start gap-3">
            <div className="text-2xl">⚠️</div>
            <div>
              <h3 className="font-semibold text-red-800 dark:text-red-400 mb-1">Performance Issues in This Version:</h3>
              <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                <li>• Props drilled through multiple levels (user, stats, theme)</li>
                <li>• All components re-render when "Fake Toggle" changes (open console)</li>
                <li>• Inline function definitions prevent memoization</li>
                <li>• Heavy computation in ActivityFeed without useMemo</li>
                <li>• No component memoization with React.memo</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Stats Grid - all cards re-render on any state change */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* ❌ Inline functions cause these to always re-render */}
          <StatCard
            title="Total Users"
            value={stats.users.toLocaleString()}
            change={stats.growth}
            icon="👥"
            onUpdate={() => handleStatsUpdate()}
          />
          <StatCard
            title="Revenue"
            value={`$${stats.revenue.toLocaleString()}`}
            change={8.2}
            icon="💰"
            onUpdate={() => handleStatsUpdate()}
          />
          <StatCard
            title="Orders"
            value={stats.orders.toLocaleString()}
            change={-2.4}
            icon="📦"
            onUpdate={() => handleStatsUpdate()}
          />
          <StatCard
            title="Growth"
            value={`${stats.growth}%`}
            change={stats.growth}
            icon="📈"
            onUpdate={() => handleStatsUpdate()}
          />
        </div>

        {/* Content Grid - excessive prop drilling */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ❌ Passing all props even though components only need some */}
          <UserList
            user={user}
            stats={stats}
            theme={theme}
            onUserUpdate={handleUserUpdate}
          />
          <ActivityFeed
            user={user}
            stats={stats}
            theme={theme}
          />
        </div>

        {/* Instructions */}
        <div className="mt-6 card bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 text-gray-100">
          <h3 className="font-semibold mb-2">🧪 Try This:</h3>
          <p className="text-sm text-gray-300">
            Click "Fake Toggle" and watch the console - you'll see ALL components re-render,
            even though the fake theme state isn't actually being used by most of them. This is due to
            prop drilling and lack of memoization.
          </p>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, memo, useCallback, useMemo } from 'react';
import { DashboardProvider, useDashboard } from '@/lib/dashboard-context';

// ✅ SOLUTION 1: Use React.memo to prevent unnecessary re-renders
// ✅ SOLUTION 2: Use useCallback for stable function references

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: string;
  onUpdate: () => void;
}

// ✅ Memoized component - only re-renders when props actually change
const StatCard = memo(function StatCard({
  title,
  value,
  change,
  icon,
  onUpdate
}: StatCardProps) {
  console.log(`✅ StatCard "${title}" rendered`);

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
});

// ✅ Optimized component using Context instead of prop drilling
const UserList = memo(function UserList() {
  const { stats } = useDashboard();
  console.log('✅ UserList rendered (only when stats change)');

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Active Users</h3>
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
        Total: {stats.users.toLocaleString()}
      </div>
      <div className="space-y-3">
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
});

// ✅ Optimized with useMemo for heavy computations
const ActivityFeed = memo(function ActivityFeed() {
  console.log('✅ ActivityFeed rendered (isolated from parent re-renders)');

  // ✅ useMemo prevents recalculating on every render
  const processedActivities = useMemo(() => {
    console.log('  → Processing activities (expensive operation)');
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      text: `Activity ${i + 1} - Processing data...`,
      time: `${i + 1}m ago`,
    }));
  }, []); // Empty deps - only calculate once

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
});

// Separate component for stats grid with optimized callbacks
function StatsGrid() {
  const { stats, updateStats } = useDashboard();

  // ✅ useCallback ensures stable function reference
  const handleStatsUpdate = useCallback(() => {
    updateStats({
      ...stats,
      users: stats.users + Math.floor(Math.random() * 10),
    });
  }, [stats, updateStats]);

  // ✅ Individual memoized callbacks for each card
  const handleRefresh = useCallback(() => {
    handleStatsUpdate();
  }, [handleStatsUpdate]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {/* ✅ Stable callbacks mean these only re-render when their props change */}
      <StatCard
        title="Total Users"
        value={stats.users.toLocaleString()}
        change={stats.growth}
        icon="👥"
        onUpdate={handleRefresh}
      />
      <StatCard
        title="Revenue"
        value={`$${stats.revenue.toLocaleString()}`}
        change={8.2}
        icon="💰"
        onUpdate={handleRefresh}
      />
      <StatCard
        title="Orders"
        value={stats.orders.toLocaleString()}
        change={-2.4}
        icon="📦"
        onUpdate={handleRefresh}
      />
      <StatCard
        title="Growth"
        value={`${stats.growth}%`}
        change={stats.growth}
        icon="📈"
        onUpdate={handleRefresh}
      />
    </div>
  );
}

// Main dashboard content - wrapped separately for Context isolation
function DashboardContent() {
  const [refreshCount, setRefreshCount] = useState(0);

  console.log('✅ DashboardContent rendered');

  // ✅ useCallback for stable function reference
  const handleRefreshAll = useCallback(() => {
    setRefreshCount((prev) => prev + 1);
  }, []);

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-7xl mx-auto pt-16 lg:pt-0">
        {/* Header */}
        <div className="mb-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">Dashboard (After)</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Optimized version - check console for efficient re-renders
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleRefreshAll}
              className="btn-primary"
            >
              Refresh All ({refreshCount})
            </button>
          </div>
        </div>

        {/* Improvements indicator */}
        <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 dark:border-green-700 p-4 mb-6 rounded">
          <div className="flex items-start gap-3">
            <div className="text-2xl">✨</div>
            <div>
              <h3 className="font-semibold text-green-800 dark:text-green-400 mb-1">Optimizations in This Version:</h3>
              <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                <li>• Context API eliminates prop drilling</li>
                <li>• React.memo prevents unnecessary re-renders (toggle theme in sidebar to test!)</li>
                <li>• useCallback provides stable function references</li>
                <li>• useMemo caches expensive computations</li>
                <li>• Clean component composition and separation of concerns</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <StatsGrid />

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ✅ No props needed - using Context */}
          <UserList />
          <ActivityFeed />
        </div>

        {/* Instructions */}
        <div className="mt-6 card bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 text-gray-100">
          <h3 className="font-semibold mb-2">🎯 Compare with Before:</h3>
          <p className="text-sm text-gray-300 mb-3">
            Toggle theme using the sidebar and watch the console - you'll see NO dashboard components
            re-render because they're properly memoized! The theme change happens at the layout level.
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-semibold text-green-400 mb-1">Before:</div>
              <div className="text-gray-300">6+ components re-render on state change</div>
            </div>
            <div>
              <div className="font-semibold text-green-400 mb-1">After:</div>
              <div className="text-gray-300">Isolated re-renders only when needed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ✅ Wrapper with Context Provider
export default function DashboardAfter() {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
}

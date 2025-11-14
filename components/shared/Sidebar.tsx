'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/lib/theme-context';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/before', label: 'Before (Issues)', icon: '⚠️' },
    { href: '/after', label: 'After (Optimized)', icon: '✨' },
  ];

  const isActive = (href: string) => pathname === href;

  // Return placeholder during SSR to avoid hydration mismatch
  if (!mounted) {
    return (
      <>
        <div className="hidden lg:block w-64" />
      </>
    );
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden btn-primary p-2 rounded-lg"
        aria-label="Toggle menu"
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-xl z-40
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 border-r border-gray-200 dark:border-gray-700
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
              Dashboard Demo
            </h2>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Next.js 14 Optimization
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  sidebar-link
                  ${isActive(item.href) ? 'sidebar-link-active' : 'text-gray-700 dark:text-gray-300'}
                `}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Theme Toggle & Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <span className="flex items-center gap-3">
                <span className="text-xl">{theme === 'light' ? '☀️' : '🌙'}</span>
                <span className="font-medium">{theme === 'light' ? 'Light' : 'Dark'} Mode</span>
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {theme === 'light' ? '→ Dark' : '→ Light'}
              </span>
            </button>

            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
              <p>Built with Next.js 14</p>
              <p className="mt-1">React 18 • TypeScript • Tailwind</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content spacer for desktop */}
      <div className="hidden lg:block w-64" />
    </>
  );
}

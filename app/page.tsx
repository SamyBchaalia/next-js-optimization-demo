import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen p-4 lg:p-8">
      <div className="max-w-6xl mx-auto pt-16 lg:pt-0">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
            Next.js Dashboard Optimization Demo
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A comprehensive demonstration of performance optimizations, clean architecture patterns,
            and Next.js 14 best practices for production-ready dashboards.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Link href="/before" className="group">
            <div className="card border-2 border-red-200 dark:border-red-900 hover:border-red-400 dark:hover:border-red-700 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center text-2xl">
                  ⚠️
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Before</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Dashboard with common performance issues:
              </p>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span>Excessive prop drilling through multiple levels</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span>Unnecessary component re-renders</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span>Heavy client-side computation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span>Inline function definitions causing re-renders</span>
                </li>
              </ul>
              <div className="mt-6 text-primary-600 font-medium group-hover:translate-x-2 transition-transform inline-block">
                View problematic code →
              </div>
            </div>
          </Link>

          <Link href="/after" className="group">
            <div className="card border-2 border-green-200 dark:border-green-900 hover:border-green-400 dark:hover:border-green-700 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center text-2xl">
                  ✨
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">After</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Optimized dashboard with best practices:
              </p>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Clean state management with Context API</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Optimized renders with React.memo & hooks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Server Components for data fetching</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Component composition & clean architecture</span>
                </li>
              </ul>
              <div className="mt-6 text-primary-600 font-medium group-hover:translate-x-2 transition-transform inline-block">
                View optimized code →
              </div>
            </div>
          </Link>
        </div>

        <div className="card bg-gradient-to-br from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 border border-primary-200 dark:border-primary-800">
          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Key Improvements Demonstrated</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="font-semibold text-primary-700 dark:text-primary-400 mb-2">⚡ Performance</div>
              <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                <li>• Memoization strategies</li>
                <li>• Render optimization</li>
                <li>• Code splitting</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-primary-700 dark:text-primary-400 mb-2">🏗️ Architecture</div>
              <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                <li>• Server/Client Components</li>
                <li>• Clean state management</li>
                <li>• Component composition</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-primary-700 dark:text-primary-400 mb-2">🎨 UI/UX</div>
              <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                <li>• Responsive design</li>
                <li>• Dark/Light theme</li>
                <li>• Smooth transitions</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 card bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 text-gray-100">
          <h3 className="text-lg font-semibold mb-2">📦 Tech Stack</h3>
          <p className="text-sm text-gray-300">
            Next.js 14 (App Router) • React 18 • TypeScript • Tailwind CSS • Dark Mode • ESLint
          </p>
        </div>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-context";
import Sidebar from "@/components/shared/Sidebar";

export const metadata: Metadata = {
  title: "Next.js Dashboard Demo - Performance Optimization Showcase",
  description: "Demonstrating performance optimizations, clean architecture, and Next.js 14 best practices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

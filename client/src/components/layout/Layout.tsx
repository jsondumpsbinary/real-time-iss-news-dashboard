import React from 'react';
import { Rocket, Satellite, Menu, X, Newspaper, BarChart3, MessageSquare } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar - Desktop */}
      <aside className="hidden w-64 border-r border-border bg-card lg:flex lg:flex-col">
        <div className="flex h-16 items-center px-6 border-b border-border">
          <Satellite className="mr-2 h-6 w-6 text-cyan-400" />
          <span className="text-lg font-bold tracking-tight text-white">OrbitDash</span>
        </div>
        <nav className="flex-1 space-y-2 p-4">
          <NavItem icon={<Rocket className="h-5 w-5" />} label="ISS Tracking" active />
          <NavItem icon={<Newspaper className="h-5 w-5" />} label="News Feed" />
          <NavItem icon={<BarChart3 className="h-5 w-5" />} label="Analytics" />
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="flex h-16 items-center justify-between border-b border-border bg-card/50 backdrop-blur-md px-6">
          <div className="flex items-center lg:hidden">
            <button onClick={() => setIsSidebarOpen(true)} className="text-gray-400 hover:text-white">
              <Menu className="h-6 w-6" />
            </button>
            <div className="ml-4 flex items-center">
              <Satellite className="mr-2 h-6 w-6 text-cyan-400" />
              <span className="text-lg font-bold text-white">OrbitDash</span>
            </div>
          </div>
          <div className="hidden lg:flex flex-1"></div>
          <div className="flex items-center space-x-4">
             {/* User profile placeholder */}
             <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500"></div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsSidebarOpen(false)}></div>
          <aside className="relative flex w-64 flex-col bg-card border-r border-border h-full z-50 animate-in slide-in-from-left-0">
            <div className="flex h-16 items-center justify-between px-6 border-b border-border">
              <div className="flex items-center">
                <Satellite className="mr-2 h-6 w-6 text-cyan-400" />
                <span className="text-lg font-bold text-white">OrbitDash</span>
              </div>
              <button onClick={() => setIsSidebarOpen(false)} className="text-gray-400 hover:text-white">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex-1 space-y-2 p-4">
              <NavItem icon={<Rocket className="h-5 w-5" />} label="ISS Tracking" active />
              <NavItem icon={<Newspaper className="h-5 w-5" />} label="News Feed" />
              <NavItem icon={<BarChart3 className="h-5 w-5" />} label="Analytics" />
            </nav>
          </aside>
        </div>
      )}
    </div>
  );
}

function NavItem({ icon, label, active }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <a
      href="#"
      className={`flex items-center space-x-3 rounded-lg px-4 py-3 transition-all duration-200 ${
        active 
          ? 'bg-primary/20 text-cyan-400' 
          : 'text-gray-400 hover:bg-white/5 hover:text-white'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </a>
  );
}

import React from 'react';
import { Rocket, Satellite, Menu, X, Newspaper, BarChart3, MessageSquare } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background relative selection:bg-cyan-500/30">
      {/* Animated Deep Space Background Blob */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-cyan-600/20 rounded-full blur-[120px] animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse-glow pointer-events-none" style={{ animationDelay: '2s' }} />

      {/* Sidebar - Desktop */}
      <aside className="hidden w-64 border-r border-white/5 bg-black/40 backdrop-blur-xl lg:flex lg:flex-col z-10">
        <div className="flex h-16 items-center px-6 border-b border-white/5">
          <Satellite className="mr-2 h-6 w-6 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
          <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">OrbitDash</span>
        </div>
        <nav className="flex-1 space-y-2 p-4">
          <NavItem icon={<Rocket className="h-5 w-5" />} label="ISS Tracking" href="#iss-tracking" active />
          <NavItem icon={<Newspaper className="h-5 w-5" />} label="News Feed" href="#news-feed" />
          <NavItem icon={<BarChart3 className="h-5 w-5" />} label="Analytics" href="#analytics" />
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden z-10">
        {/* Top Navbar */}
        <header className="flex h-16 items-center justify-between border-b border-white/5 bg-black/40 backdrop-blur-xl px-6">
          <div className="flex items-center lg:hidden">
            <button onClick={() => setIsSidebarOpen(true)} className="text-gray-400 hover:text-white">
              <Menu className="h-6 w-6" />
            </button>
            <div className="ml-4 flex items-center">
              <Satellite className="mr-2 h-6 w-6 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">OrbitDash</span>
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
            <div className="flex h-16 items-center justify-between px-6 border-b border-white/5">
              <div className="flex items-center">
                <Satellite className="mr-2 h-6 w-6 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">OrbitDash</span>
              </div>
              <button onClick={() => setIsSidebarOpen(false)} className="text-gray-400 hover:text-white">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex-1 space-y-2 p-4">
              <NavItem icon={<Rocket className="h-5 w-5" />} label="ISS Tracking" href="#iss-tracking" onClick={() => setIsSidebarOpen(false)} active />
              <NavItem icon={<Newspaper className="h-5 w-5" />} label="News Feed" href="#news-feed" onClick={() => setIsSidebarOpen(false)} />
              <NavItem icon={<BarChart3 className="h-5 w-5" />} label="Analytics" href="#analytics" onClick={() => setIsSidebarOpen(false)} />
            </nav>
          </aside>
        </div>
      )}
    </div>
  );
}

function NavItem({ icon, label, href, active, onClick }: { icon: React.ReactNode; label: string; href?: string; active?: boolean; onClick?: () => void }) {
  return (
    <a
      href={href || "#"}
      onClick={onClick}
      className={`flex items-center space-x-3 rounded-xl px-4 py-3 transition-all duration-300 group ${
        active 
          ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/10 text-cyan-300 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.15)]' 
          : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </a>
  );
}

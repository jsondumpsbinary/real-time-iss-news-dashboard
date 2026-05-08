import React from 'react';
import { IssMap } from '../map/IssMap';
import { IssStats } from './IssStats';
import { NewsFeed } from './NewsFeed';
import { Analytics } from '../charts/Analytics';
import { motion, AnimatePresence } from 'framer-motion';
import { useUiStore } from '@/store/useUiStore';

export function Dashboard() {
  const { activeTab, setActiveTab } = useUiStore();

  return (
    <div className="space-y-8">
      {/* Header & Tab Switcher */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 drop-shadow-sm uppercase">
            {activeTab === 'overview' ? 'Mission Control' : activeTab === 'analytics' ? 'Data Analytics' : 'Space News'}
          </h1>
          <p className="text-cyan-400/70 tracking-widest uppercase text-sm mt-2 font-semibold">
            {activeTab === 'overview' ? 'Real-time Telemetry & Orbital Updates' : activeTab === 'analytics' ? 'Historical Velocity & News Sources' : 'Latest Articles from the Final Frontier'}
          </p>
        </div>

        {/* Desktop Tab Switcher */}
        <div className="hidden md:flex bg-black/40 backdrop-blur-md p-1 rounded-xl border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          {(['overview', 'analytics', 'news'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === tab 
                  ? 'bg-gradient-to-r from-cyan-500/80 to-purple-500/80 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]' 
                  : 'text-cyan-400/50 hover:text-cyan-400 hover:bg-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content Rendering */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.section 
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            <div className="lg:col-span-2 h-[500px] rounded-xl overflow-hidden border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)] relative bg-black/50 backdrop-blur-sm group">
              <div className="absolute inset-0 pointer-events-none border border-cyan-500/0 group-hover:border-cyan-500/30 transition-colors duration-500 rounded-xl z-20" />
              <IssMap />
            </div>
            <div className="flex flex-col gap-6">
              <IssStats />
            </div>
          </motion.section>
        )}

        {activeTab === 'analytics' && (
          <motion.section 
            key="analytics"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Analytics />
          </motion.section>
        )}

        {activeTab === 'news' && (
          <motion.section 
            key="news"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <NewsFeed />
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}

import React from 'react';
import { IssMap } from '../map/IssMap';
import { IssStats } from './IssStats';
import { NewsFeed } from './NewsFeed';
import { Analytics } from '../charts/Analytics';
import { motion } from 'framer-motion';

export function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 drop-shadow-sm uppercase">Mission Control</h1>
        <p className="text-cyan-400/70 tracking-widest uppercase text-sm mt-2 font-semibold">Real-time Telemetry & Orbital Updates</p>
      </div>

      {/* ISS Tracking Section */}
      <section id="iss-tracking">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-[450px] rounded-xl overflow-hidden border border-border shadow-lg relative bg-card">
            <IssMap />
          </div>
          <div className="flex flex-col gap-6">
            <IssStats />
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section id="analytics">
        <h2 className="text-2xl font-semibold text-white mb-4">Analytics</h2>
        <Analytics />
      </section>

      {/* News Section */}
      <section id="news-feed">
        <h2 className="text-2xl font-semibold text-white mb-4">Latest Space News</h2>
        <NewsFeed />
      </section>
    </div>
  );
}

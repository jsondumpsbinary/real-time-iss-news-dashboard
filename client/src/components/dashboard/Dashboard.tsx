import React from 'react';
import { IssMap } from '../map/IssMap';
import { IssStats } from './IssStats';
import { NewsFeed } from './NewsFeed';
import { Analytics } from '../charts/Analytics';
import { motion } from 'framer-motion';

export function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
        <p className="text-muted-foreground">Real-time ISS tracking and space news.</p>
      </div>

      {/* ISS Tracking Section */}
      <section>
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
      <section>
        <h2 className="text-2xl font-semibold text-white mb-4">Analytics</h2>
        <Analytics />
      </section>

      {/* News Section */}
      <section>
        <h2 className="text-2xl font-semibold text-white mb-4">Latest Space News</h2>
        <NewsFeed />
      </section>
    </div>
  );
}

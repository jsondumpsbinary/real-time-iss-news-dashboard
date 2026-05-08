import React from 'react';
import { useIssStore } from '@/store/useIssStore';
import { Compass, Gauge, Users, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export function IssStats() {
  const { positions, astronauts, isLoading } = useIssStore();

  const currentPos = positions.length > 0 ? positions[positions.length - 1] : null;

  const stats = [
    {
      label: 'Speed',
      value: currentPos?.speed ? `${Math.round(currentPos.speed).toLocaleString()} km/h` : '--',
      icon: <Gauge className="h-5 w-5 text-cyan-400" />,
      delay: 0.1
    },
    {
      label: 'Coordinates',
      value: currentPos ? `${currentPos.lat.toFixed(2)}°, ${currentPos.lng.toFixed(2)}°` : '--',
      icon: <Compass className="h-5 w-5 text-purple-400" />,
      delay: 0.2
    },
    {
      label: 'Crew Aboard',
      value: astronauts.length > 0 ? astronauts.length : '--',
      icon: <Users className="h-5 w-5 text-green-400" />,
      delay: 0.3
    },
    {
      label: 'Last Updated',
      value: currentPos ? new Date(currentPos.timestamp).toLocaleTimeString() : '--',
      icon: <Clock className="h-5 w-5 text-orange-400" />,
      delay: 0.4
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
      {stats.map((stat, idx) => (
        <motion.div 
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: stat.delay, duration: 0.5 }}
          className="bg-black/40 backdrop-blur-md border border-white/5 p-5 rounded-xl flex items-center space-x-4 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:border-cyan-500/30 transition-all duration-300 group"
        >
          <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:bg-cyan-500/20 group-hover:scale-110 transition-all duration-300 shadow-inner">
            {stat.icon}
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
            <h3 className="text-xl font-bold text-white mt-1">
              {isLoading && !currentPos ? (
                <span className="inline-block w-16 h-6 bg-white/10 animate-pulse rounded"></span>
              ) : (
                stat.value
              )}
            </h3>
          </div>
        </motion.div>
      ))}

      {astronauts.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="col-span-2 lg:col-span-1 bg-black/40 backdrop-blur-md border border-white/5 p-5 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.5)] mt-2 hover:-translate-y-1 transition-all duration-300"
        >
          <p className="text-sm font-medium text-muted-foreground mb-3 flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Current Crew
          </p>
          <div className="flex flex-wrap gap-2">
            {astronauts.map((astro) => (
              <span key={astro.name} className="px-3 py-1 bg-cyan-500/10 text-cyan-300 text-xs rounded-full border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.1)]">
                {astro.name}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

import React, { useEffect } from 'react';
import { useNewsStore } from '@/store/useNewsStore';
import { RefreshCw, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const CATEGORIES = ['space', 'science', 'technology', 'world'];

export function NewsFeed() {
  const { articles, category, isLoading, error, setCategory, fetchNews } = useNewsStore();

  useEffect(() => {
    // Refresh news every 15 mins automatically
    const interval = setInterval(() => {
      fetchNews();
    }, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchNews]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                category === c 
                  ? 'bg-primary text-primary-foreground shadow-md' 
                  : 'bg-secondary/50 text-secondary-foreground hover:bg-secondary'
              }`}
            >
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>
        
        <button 
          onClick={() => fetchNews(true)}
          disabled={isLoading}
          className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-white transition-colors"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {error ? (
        <div className="p-6 text-center bg-destructive/10 border border-destructive/20 rounded-xl text-destructive">
          <p>{error}</p>
          <button onClick={() => fetchNews(true)} className="mt-4 px-4 py-2 bg-destructive/20 hover:bg-destructive/30 rounded-lg text-sm font-medium transition-colors">
            Try Again
          </button>
        </div>
      ) : isLoading && articles.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="animate-pulse bg-card border border-border rounded-xl h-80 flex flex-col">
              <div className="h-40 bg-white/5 rounded-t-xl"></div>
              <div className="p-4 space-y-3 flex-1">
                <div className="h-4 bg-white/5 rounded w-1/4"></div>
                <div className="h-6 bg-white/5 rounded w-3/4"></div>
                <div className="h-4 bg-white/5 rounded w-full"></div>
                <div className="h-4 bg-white/5 rounded w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {articles.map((article, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              key={article.url}
              className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all shadow-sm hover:shadow-primary/10 flex flex-col h-full"
            >
              <div className="h-48 overflow-hidden relative bg-muted">
                {article.urlToImage ? (
                  <img 
                    src={article.urlToImage} 
                    alt={article.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-secondary/30 text-muted-foreground">
                    No Image Available
                  </div>
                )}
                <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs font-medium text-white/90">
                  {article.source.name}
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <p className="text-xs text-muted-foreground mb-2">
                  {new Date(article.publishedAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                  {article.author ? ` • ${article.author}` : ''}
                </p>
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
                  {article.description || 'No description available for this article.'}
                </p>
                <a 
                  href={article.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors mt-auto"
                >
                  Read full article
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

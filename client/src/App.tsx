import React, { useEffect } from 'react';
import { useIssStore } from '@/store/useIssStore';
import { useNewsStore } from '@/store/useNewsStore';
import { Toaster } from 'react-hot-toast';
import { Layout } from '@/components/layout/Layout';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { Chatbot } from '@/components/chat/Chatbot';

function App() {
  const { fetchIssLocation, fetchAstronauts } = useIssStore();
  const { fetchNews } = useNewsStore();

  useEffect(() => {
    // Initial fetches
    fetchIssLocation();
    fetchAstronauts();
    fetchNews();

    // Polling every 15 seconds for ISS Location
    const interval = setInterval(() => {
      fetchIssLocation();
    }, 15000);

    return () => clearInterval(interval);
  }, [fetchIssLocation, fetchAstronauts, fetchNews]);

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      <Layout>
        <Dashboard />
      </Layout>
      <Chatbot />
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;

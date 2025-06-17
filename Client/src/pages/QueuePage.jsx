import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/auth/AuthContext';
import QueueList from '../components/queue/QueueList';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

const QueuePage = () => {
  const { user } = useAuth();
  const [queues, setQueues] = useState([]);
  const [userEntries, setUserEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastRefresh, setLastRefresh] = useState(new Date());

  useEffect(() => {
    if(user) {
      loadData();
      const interval = setInterval(loadData, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const loadData = async () => {
    if(!user) return;
    try {
      // כאן יש להחליף לקריאות ממשק ה-API שלך
      const queuesData = await fetchQueues();
      const entriesData = await fetchUserEntries(user.id);
      setQueues(queuesData);
      setUserEntries(entriesData);
      setLastRefresh(new Date());
      setError('');
    } catch {
      setError('Failed to load queue data.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinQueue = async (queueId) => {
    setActionLoading(true);
    setError('');
    try {
      // קריאה לשרת להצטרפות לתור
      await joinQueue(queueId, user.id);
      await loadData();
    } catch {
      setError('Failed to join queue');
    } finally {
      setActionLoading(false);
    }
  };

  const handleLeaveQueue = async (queueId) => {
    setActionLoading(true);
    setError('');
    try {
      // קריאה לשרת ליציאה מהתור
      await leaveQueue(queueId, user.id);
      await loadData();
    } catch {
      setError('Failed to leave queue');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Current Queues</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500">
            Last updated: {lastRefresh.toLocaleTimeString()}
          </span>
          <Button
            onClick={() => {
              setIsLoading(true);
              loadData();
            }}
            variant="outline"
            size="sm"
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {error && <div className="mb-6 text-red-600">{error}</div>}

      <QueueList
        queues={queues}
        userEntries={userEntries}
        onJoinQueue={handleJoinQueue}
        onLeaveQueue={handleLeaveQueue}
        isLoading={actionLoading}
      />
    </div>
  );
};

export default QueuePage;

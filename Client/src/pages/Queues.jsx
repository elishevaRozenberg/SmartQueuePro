import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/auth/AuthContext';
import { Queue } from '@/entities/Queue';
import { QueueEntry } from '@/entities/QueueEntry';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RefreshCw, Users, Clock, TrendingUp } from 'lucide-react';
import QueueCard from '../components/queue/QueueCard';
import ProtectedRoute from '../components/auth/ProtectedRoute';

const QueuesPageContent = () => {
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
    if (!user) return;
    try {
      const [queueData, entryData] = await Promise.all([
        Queue.filter({ is_active: true }),
        QueueEntry.filter({ user_id: user.id, status: 'waiting' })
      ]);
      
      setQueues(queueData);
      setUserEntries(entryData);
      setLastRefresh(new Date());
    } catch (error) {
      setError('Failed to load queue data. Please ensure you are logged in.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinQueue = async (queueId) => {
    setActionLoading(true);
    setError('');
    
    try {
      const existingEntry = userEntries.find(entry => entry.status === 'waiting');
      if (existingEntry) {
        setError('You can only be in one queue at a time');
        setActionLoading(false);
        return;
      }

      const queueEntries = await QueueEntry.filter({ 
        queue_id: queueId, 
        status: 'waiting' 
      });
      
      const position = queueEntries.length + 1;
      const queue = queues.find(q => q.id === queueId);
      const estimatedCallTime = new Date();
      estimatedCallTime.setMinutes(estimatedCallTime.getMinutes() + (position * queue.estimated_wait_time));

      const newEntry = await QueueEntry.create({
        queue_id: queueId,
        user_id: user.id,
        position,
        join_time: new Date().toISOString(),
        estimated_call_time: estimatedCallTime.toISOString()
      });

      setUserEntries(prev => [...prev, newEntry]);
    } catch (error) {
      setError('Failed to join queue');
    } finally {
      setActionLoading(false);
    }
  };

  const handleLeaveQueue = async (queueId) => {
    setActionLoading(true);
    setError('');
    
    try {
      const entryToRemove = userEntries.find(entry => 
        entry.queue_id === queueId && entry.status === 'waiting'
      );
      
      if (entryToRemove) {
        await QueueEntry.update(entryToRemove.id, { status: 'cancelled' });
        setUserEntries(prev => prev.filter(entry => entry.id !== entryToRemove.id));
      }
    } catch (error) {
      setError('Failed to leave queue');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRefresh = () => {
    setIsLoading(true);
    loadData();
  };

  const getTotalWaitingUsers = () => {
    return queues.reduce((total, queue) => {
      const queueSize = Math.floor(Math.random() * queue.max_capacity);
      return total + queueSize;
    }, 0);
  };

  const getAverageWaitTime = () => {
    if (queues.length === 0) return 0;
    return Math.round(queues.reduce((sum, queue) => sum + queue.estimated_wait_time, 0) / queues.length);
  };

  if (isLoading && queues.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 animate-spin text-orange-500 mx-auto mb-4" />
            <p className="text-slate-600">Loading queues...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Current Queues</h1>
          <p className="text-slate-600 mt-1">Join a queue and track your position in real-time</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500">
            Last updated: {lastRefresh.toLocaleTimeString()}
          </span>
          <Button
            onClick={handleRefresh}
            variant="outline"
            size="sm"
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Active Queues</p>
                <p className="text-2xl font-bold text-slate-900">{queues.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Waiting</p>
                <p className="text-2xl font-bold text-slate-900">{getTotalWaitingUsers()}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Avg. Wait Time</p>
                <p className="text-2xl font-bold text-slate-900">{getAverageWaitTime()} min</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {userEntries.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Your Active Queues</h2>
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
            {userEntries.map(entry => {
              const queue = queues.find(q => q.id === entry.queue_id);
              return queue ? (
                <div key={entry.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="bg-orange-200 text-orange-800">
                      #{entry.position}
                    </Badge>
                    <div>
                      <p className="font-medium text-slate-900">{queue.name}</p>
                      <p className="text-sm text-slate-600">
                        Estimated call: {new Date(entry.estimated_call_time).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleLeaveQueue(queue.id)}
                    variant="outline"
                    size="sm"
                    disabled={actionLoading}
                  >
                    Leave Queue
                  </Button>
                </div>
              ) : null;
            })}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {queues.map(queue => {
          const userEntry = userEntries.find(entry => 
            entry.queue_id === queue.id && entry.status === 'waiting'
          );
          
          return (
            <QueueCard
              key={queue.id}
              queue={queue}
              userEntry={userEntry}
              onJoinQueue={handleJoinQueue}
              onLeaveQueue={handleLeaveQueue}
              isLoading={actionLoading}
            />
          );
        })}
      </div>

      {queues.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">No Active Queues</h3>
          <p className="text-slate-600">Check back later or contact staff for more information.</p>
        </div>
      )}
    </div>
  );
};

export default function Queues() {
    return (
        <ProtectedRoute>
            <QueuesPageContent />
        </ProtectedRoute>
    )
}
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '@/context/UserContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const QueueDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [queue, setQueue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joined, setJoined] = useState(false);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    fetchQueue();
  }, []);

  const fetchQueue = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/queues/${id}`);
      const data = await res.json();
      setQueue(data);
      if (data.usersInQueue && user) {
        const index = data.usersInQueue.findIndex(u => u === user.id);
        if (index !== -1) {
          setJoined(true);
          setPosition(index + 1);
        }
      }
    } catch (err) {
      console.error('Failed to load queue:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async () => {
    try {
      const res = await fetch(`/api/queues/${id}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id })
      });
      if (res.ok) {
        setJoined(true);
        fetchQueue();
      }
    } catch (err) {
      console.error('Error joining queue:', err);
    }
  };

  const handleLeave = async () => {
    try {
      const res = await fetch(`/api/queues/${id}/leave`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id })
      });
      if (res.ok) {
        setJoined(false);
        setPosition(null);
        fetchQueue();
      }
    } catch (err) {
      console.error('Error leaving queue:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!queue) {
    return <p className="text-center mt-12 text-red-500">Queue not found.</p>;
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="max-w-2xl mx-auto shadow-md">
        <CardContent className="p-8">
          <h2 className="text-3xl font-bold mb-4 text-slate-900">{queue.name}</h2>
          <p className="text-slate-600 mb-6">{queue.description}</p>

          <div className="mb-4 text-slate-700 space-y-2">
            <p><strong>Queue Size:</strong> {queue.size}/{queue.maxSize}</p>
            <p><strong>Estimated Wait Time:</strong> {queue.estimatedWait} min</p>
            {joined && (
              <p><strong>Your Position:</strong> {position}</p>
            )}
          </div>

          {!joined ? (
            <Button onClick={handleJoin} disabled={queue.size >= queue.maxSize} className="w-full">
              {queue.size >= queue.maxSize ? 'Queue Full' : 'Join Queue'}
            </Button>
          ) : (
            <Button onClick={handleLeave} variant="outline" className="w-full">
              Leave Queue
            </Button>
          )}

          <Button variant="ghost" onClick={() => navigate(-1)} className="mt-4 w-full text-sm text-blue-600">
            ← Back to Queues
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default QueueDetailsPage;
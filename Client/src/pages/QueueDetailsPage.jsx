import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Clock } from 'lucide-react';

const QueueDetailsPage = () => {
  const { id } = useParams();
  const [queue, setQueue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadQueueDetails = async () => {
      try {
        // כאן תביאי את הפרטים של התור לפי id
        const data = await fetchQueueById(id);
        setQueue(data);
        setError('');
      } catch {
        setError('Failed to load queue details');
      } finally {
        setIsLoading(false);
      }
    };
    loadQueueDetails();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!queue) return <div>Queue not found</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{queue.name}</CardTitle>
          <Badge variant="outline" className={`${queue.is_active ? 'border-green-200 text-green-700' : 'border-red-200 text-red-700'}`}>
            {queue.is_active ? 'Active' : 'Closed'}
          </Badge>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-slate-700">{queue.description}</p>
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-slate-400" />
              <span className="text-slate-600 font-medium">Max Capacity:</span>
            </div>
            <span className="font-semibold text-slate-900">{queue.max_capacity}</span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-slate-400" />
              <span className="text-slate-600 font-medium">Estimated Wait Time:</span>
            </div>
            <span className="font-semibold text-slate-900">{queue.estimated_wait_time} min</span>
          </div>
          {/* הוסיפי פה כל מידע נוסף שרלוונטי לפרטי תור */}
        </CardContent>
      </Card>
    </div>
  );
};

export default QueueDetailsPage;

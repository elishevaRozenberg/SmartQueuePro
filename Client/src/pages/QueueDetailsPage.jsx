import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Users, Clock } from 'lucide-react';

// דוגמה לפונקציה שמחזירה נתוני תור (להחליף ב-fetch אמיתי)
async function fetchQueueById(id) {
  // כאן תוכל להחליף ב-fetch אמיתי לשרת שלך
  return {
    name: "Pilates Queue",
    is_active: true,
    description: "Pilates class queue for today.",
    max_capacity: 20,
    estimated_wait_time: 15,
  };
}

const QueueDetailsPage = () => {
  const { id } = useParams();
  const [queue, setQueue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadQueueDetails = async () => {
      try {
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
      <div className="border rounded-lg shadow-md p-6 bg-white">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">{queue.name}</h2>
      // מחק את השורה:
// import { Badge } from "../components/ui/badge";

<span style={{
  border: queue.is_active ? "1px solid #22c55e" : "1px solid #ef4444",
  color: queue.is_active ? "#22c55e" : "#ef4444",
  borderRadius: "8px",
  padding: "2px 8px",
  fontSize: "0.9em"
}}>
  {queue.is_active ? 'Active' : 'Closed'}
</span>
        </div>
        <div className="mb-4 text-slate-700">{queue.description}</div>
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
      </div>
    </div>
  );
};
export default QueueDetailsPage;
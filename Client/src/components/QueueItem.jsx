// import React from 'react';
// import { User, Clock, ActivityIcon } from 'lucide-react';

// const QueueItem = ({ queue }) => {
//   const {
//     name,
//     description,
//     status,
//     currentSize,
//     maxSize,
//     waitTime,
//     color,
//   } = queue;

//   const isFull = currentSize >= maxSize;
//   const QueueItem = ({ queue }) => {
//   const navigate = useNavigate();
//   }
//   return (
//    <div className="queue-card" onClick={() => navigate(`/queues/${queue.id}`)}>
//       <div className="queue-header">
//         <div className={`queue-icon ${color}`}>{/* Icon placeholder */}</div>
//         <div>
//           <h3 className="queue-title">{name}</h3>
//           <p className="queue-desc">{description}</p>
//         </div>
//         <span className="queue-status">{status}</span>
//       </div>

//       <div className="queue-info">
//         <div className="queue-size">
//           <User size={16} /> Queue Size: {currentSize}/{maxSize}
//           <div className="queue-bar">
//             <div className="queue-bar-fill" style={{ width: `${(currentSize / maxSize) * 100}%` }}></div>
//           </div>
//         </div>

//         <div className="queue-wait">
//           <Clock size={16} /> Est. Wait Time: <strong>{waitTime} min</strong>
//         </div>
//       </div>

//       <button className="queue-join-btn" disabled={isFull}>
//         <User size={16} /> Join Queue
//       </button>
//     </div>
//   );
// };

// export default QueueItem;
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Clock, UserPlus, XCircle, CheckCircle } from 'lucide-react';

const QueueItem = ({ queue, userEntry, onJoinQueue, onLeaveQueue, isLoading }) => {
  const currentSize = queue.currentSize ?? 0; // כדאי להעביר כ-prop

  const getStatusColor = () => {
    const percentage = (currentSize / queue.max_capacity) * 100;
    if (percentage >= 80) return 'text-red-600';
    if (percentage >= 60) return 'text-orange-600';
    return 'text-green-600';
  };

  const statusColor = getStatusColor();

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
      <CardHeader className="pb-3 flex justify-between items-center">
        <div>
          <CardTitle className="text-lg">{queue.name}</CardTitle>
          <p className="text-sm text-slate-600">{queue.description}</p>
        </div>
        <Badge variant="outline" className={`${queue.is_active ? 'border-green-200 text-green-700' : 'border-red-200 text-red-700'}`}>
          {queue.is_active ? 'Active' : 'Closed'}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-slate-400" />
            <span className="text-slate-600">Queue Size</span>
          </div>
          <span className={`font-medium ${statusColor}`}>
            {currentSize}/{queue.max_capacity}
          </span>
        </div>

        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400" />
            <span className="text-slate-600">Est. Wait Time</span>
          </div>
          <span className="font-medium text-slate-900">{queue.estimated_wait_time} min</span>
        </div>

        {userEntry ? (
          <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-800">You're in queue</span>
              </div>
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                Position #{userEntry.position}
              </Badge>
            </div>
            <p className="text-xs text-orange-700 mt-1">
              Estimated call time: {new Date(userEntry.estimated_call_time).toLocaleTimeString()}
            </p>
          </div>
        ) : null}

        <div className="pt-2">
          {userEntry ? (
            <Button
              onClick={() => onLeaveQueue(queue.id)}
              disabled={isLoading || !queue.is_active}
              variant="outline"
              className="w-full border-red-200 text-red-700 hover:bg-red-50"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Leave Queue
            </Button>
          ) : (
            <Button
              onClick={() => onJoinQueue(queue.id)}
              disabled={isLoading || !queue.is_active || currentSize >= queue.max_capacity}
              className="w-full"
              style={{ backgroundColor: queue.color }}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              {currentSize >= queue.max_capacity ? 'Queue Full' : 'Join Queue'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QueueItem;

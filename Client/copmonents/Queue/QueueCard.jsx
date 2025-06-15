import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle, 
  UserPlus,
  Activity,
  Heart,
  Zap
} from 'lucide-react';

const QueueCard = ({ 
  queue, 
  userEntry, 
  onJoinQueue, 
  onLeaveQueue, 
  isLoading = false 
}) => {
  const getQueueIcon = (iconName) => {
    const icons = {
      activity: Activity,
      heart: Heart,
      zap: Zap
    };
    return icons[iconName] || Activity;
  };

  const getStatusColor = (count, maxCapacity) => {
    const percentage = (count / maxCapacity) * 100;
    if (percentage >= 80) return 'text-red-600';
    if (percentage >= 60) return 'text-orange-600';
    return 'text-green-600';
  };

  const getCurrentQueueSize = () => {
    // This would normally come from the queue data
    return Math.floor(Math.random() * queue.max_capacity);
  };

  const currentSize = getCurrentQueueSize();
  const Icon = getQueueIcon(queue.icon);
  const statusColor = getStatusColor(currentSize, queue.max_capacity);

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${queue.color}20` }}
            >
              <Icon 
                className="w-6 h-6" 
                style={{ color: queue.color }}
              />
            </div>
            <div>
              <CardTitle className="text-lg">{queue.name}</CardTitle>
              <p className="text-sm text-slate-600">{queue.description}</p>
            </div>
          </div>
          <Badge 
            variant="outline" 
            className={`${queue.is_active ? 'border-green-200 text-green-700' : 'border-red-200 text-red-700'}`}
          >
            {queue.is_active ? 'Active' : 'Closed'}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Queue Status */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-slate-400" />
              <span className="text-slate-600">Queue Size</span>
            </div>
            <span className={`font-medium ${statusColor}`}>
              {currentSize}/{queue.max_capacity}
            </span>
          </div>
          <Progress 
            value={(currentSize / queue.max_capacity) * 100} 
            className="h-2"
          />
        </div>

        {/* Wait Time */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400" />
            <span className="text-slate-600">Est. Wait Time</span>
          </div>
          <span className="font-medium text-slate-900">
            {currentSize * queue.estimated_wait_time} min
          </span>
        </div>

        {/* User Status */}
        {userEntry && (
          <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-800">
                  You're in queue
                </span>
              </div>
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                Position #{userEntry.position}
              </Badge>
            </div>
            <p className="text-xs text-orange-700 mt-1">
              Estimated call time: {new Date(userEntry.estimated_call_time).toLocaleTimeString()}
            </p>
          </div>
        )}

        {/* Action Button */}
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

export default QueueCard;
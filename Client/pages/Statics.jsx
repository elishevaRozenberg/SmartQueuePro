
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Clock } from 'lucide-react';
import ProtectedRoute from '../components/auth/ProtectedRoute';

const data = [
  { name: 'Mon', Cardio: 40, Pilates: 24, Training: 15 },
  { name: 'Tue', Cardio: 30, Pilates: 13, Training: 22 },
  { name: 'Wed', Cardio: 20, Pilates: 98, Training: 22 },
  { name: 'Thu', Cardio: 27, Pilates: 39, Training: 20 },
  { name: 'Fri', Cardio: 18, Pilates: 48, Training: 21 },
  { name: 'Sat', Cardio: 23, Pilates: 38, Training: 25 },
  { name: 'Sun', Cardio: 34, Pilates: 43, Training: 12 },
];

const StatisticsPageContent = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Queue Statistics</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Users Today</p>
                <p className="text-2xl font-bold text-slate-900">342</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Peak Hour</p>
                <p className="text-2xl font-bold text-slate-900">6:00 PM</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Avg. Wait Time</p>
                <p className="text-2xl font-bold text-slate-900">7.2 min</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Weekly Queue Usage</CardTitle>
          <CardDescription>Number of entries per queue over the last week.</CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={data}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                <Tooltip wrapperClassName="!bg-white !border-slate-200 !rounded-lg !shadow-lg" />
                <Legend iconType="circle" />
                <Bar dataKey="Cardio" fill="#10b981" name="Cardio" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Pilates" fill="#f97316" name="Pilates" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Training" fill="#8b5cf6" name="Personal Training" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default function Statistics() {
    return (
        <ProtectedRoute requiredRole="secretary">
            <StatisticsPageContent />
        </ProtectedRoute>
    )
}

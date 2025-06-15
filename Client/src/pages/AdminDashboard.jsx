
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Clock, BarChart3, ArrowRight } from 'lucide-react';
import { useAuth } from '../components/auth/AuthContext';
import { Link, Navigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import ProtectedRoute from '../components/auth/ProtectedRoute';

const AdminDashboardPageContent = () => {
  const { user } = useAuth();

  if (user?.role !== 'admin') {
    // This check is redundant due to ProtectedRoute but serves as a fallback.
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-600 mt-1">Manage users, queues, and view system statistics.</p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <CardTitle>User Management</CardTitle>
                <CardDescription>View, add, and remove users.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 mb-4">Manage roles for all registered users in the system.</p>
            <Button asChild>
                <Link to={createPageUrl('UserManagement')} className="bg-blue-600 hover:bg-blue-700">
                    Manage Users <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <CardTitle>Queue Management</CardTitle>
                <CardDescription>Edit and create new queues.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 mb-4">Manage your service queues. You can edit existing queues or add new ones to expand your gym's offerings.</p>
            <Button variant="outline" asChild>
              <Link to={createPageUrl('Queues')}>Manage Queues</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <CardTitle>System Statistics</CardTitle>
                <CardDescription>View performance reports.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 mb-4">Analyze queue performance, wait times, and user traffic to optimize your gym's operations.</p>
            <Button variant="outline" asChild>
              <Link to={createPageUrl('Statistics')}>View Statistics</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default function AdminDashboard() {
    return (
        <ProtectedRoute requiredRole="admin">
            <AdminDashboardPageContent />
        </ProtectedRoute>
    )
}

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Palette, Shield } from 'lucide-react';
import ProtectedRoute from '../components/auth/ProtectedRoute';

const SettingsPageContent = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Settings</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <Bell className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Manage how you receive alerts.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600">This feature is coming soon! You'll be able to customize email and push notifications for queue updates.</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <Palette className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize the look and feel.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600">Theme customization will be available in a future update. Stay tuned for light/dark modes!</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
              <Shield className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <CardTitle>Account & Security</CardTitle>
              <CardDescription>Manage your account settings.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 mb-4">For account security changes, please use the options provided by your login provider (e.g., Google).</p>
            <Button variant="destructive" disabled>Delete Account</Button>
            <p className="text-xs text-slate-500 mt-2">Account deletion is coming soon.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default function Settings() {
    return (
        <ProtectedRoute>
            <SettingsPageContent />
        </ProtectedRoute>
    )
}
import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/auth/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Loader2, Save, User } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ProtectedRoute from '../components/auth/ProtectedRoute';

const ProfilePageContent = () => {
  const { user, updateProfile, loading: authLoading } = useAuth();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    profile_image: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || '',
        email: user.email || '',
        phone: user.phone || '',
        profile_image: user.profile_image || ''
      });
    }
  }, [user]);

  const getInitials = (fullName) => {
    if (!fullName) return 'U';
    const names = fullName.split(' ');
    return names.map(n => n[0]).join('').toUpperCase();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');
    
    // Can't update email or full_name from Google
    const { email, full_name, ...updateData } = formData;

    const result = await updateProfile(updateData);

    if (result.success) {
      setSuccessMessage('Profile updated successfully!');
    } else {
      setErrorMessage(result.error || 'Failed to update profile.');
    }
    setIsLoading(false);
  };

  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">My Profile</h1>
      <Card className="max-w-2xl mx-auto border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal details here.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src={formData.profile_image} alt={formData.full_name} />
                <AvatarFallback className="text-2xl bg-orange-100 text-orange-700">
                  {getInitials(formData.full_name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <Label htmlFor="profile_image">Profile Image URL</Label>
                <Input
                  id="profile_image"
                  name="profile_image"
                  value={formData.profile_image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.png"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  disabled
                  className="bg-slate-100"
                />
                <p className="text-xs text-slate-500">Full name is managed by your login provider.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  disabled
                  className="bg-slate-100"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="(555) 123-4567"
              />
            </div>

            {successMessage && <Alert className="bg-green-50 border-green-200 text-green-800"><AlertDescription>{successMessage}</AlertDescription></Alert>}
            {errorMessage && <Alert variant="destructive"><AlertDescription>{errorMessage}</AlertDescription></Alert>}

            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading} className="bg-orange-600 hover:bg-orange-700">
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default function Profile() {
    return (
        <ProtectedRoute>
            <ProfilePageContent />
        </ProtectedRoute>
    )
}
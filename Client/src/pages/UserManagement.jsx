
import React, { useState, useEffect } from 'react';
import { User } from '@/entities/User';
import { useAuth } from '../components/auth/AuthContext';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Trash2, Loader2, ShieldAlert } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const UserManagementPageContent = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const userList = await User.list('-created_date');
      setUsers(userList);
    } catch (e) {
      setError('Failed to fetch users.');
    } finally {
      setLoading(false);
    }
  };
  
  const getInitials = (fullName) => {
    if (!fullName) return '?';
    const names = fullName.split(' ');
    return names.map(n => n[0]).join('').toUpperCase();
  };

  const handleDeleteUser = async (userId) => {
    try {
      await User.delete(userId);
      fetchUsers(); // Refresh the list
    } catch (e) {
      setError('Failed to delete user.');
    }
  };

  const roleColors = {
    admin: 'bg-red-200 text-red-800',
    secretary: 'bg-yellow-200 text-yellow-800',
    client: 'bg-blue-200 text-blue-800',
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">User Management</h1>
      <p className="text-slate-600 mb-6">View, manage, and assign roles to users.</p>
      
      <Alert className="mb-6 bg-blue-50 border-blue-200">
        <ShieldAlert className="h-4 w-4 text-blue-700" />
        <AlertTitle className="text-blue-800">How to Add New Users</AlertTitle>
        <AlertDescription className="text-blue-700">
          To add a new Secretary or Admin, go to your workspace's **Data** tab, select the **User** entity, and use the **Invite User** button. You can set their role during the invitation process.
        </AlertDescription>
      </Alert>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>A list of all users in the system.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={user.profile_image} />
                          <AvatarFallback>{getInitials(user.full_name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.full_name}</p>
                          <p className="text-sm text-slate-500">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`capitalize ${roleColors[user.role]}`}>{user.role}</Badge>
                    </TableCell>
                    <TableCell>{new Date(user.created_date).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      {user.id !== currentUser.id ? (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-slate-500 hover:text-red-600">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the user account for **{user.full_name}**.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteUser(user.id)} className="bg-red-600 hover:bg-red-700">
                                Delete User
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      ) : (
                        <Button variant="ghost" size="icon" disabled>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default function UserManagement() {
  return (
    <ProtectedRoute requiredRole="admin">
      <UserManagementPageContent />
    </ProtectedRoute>
  );
}

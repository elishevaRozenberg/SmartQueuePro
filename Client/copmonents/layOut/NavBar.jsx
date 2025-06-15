
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  Menu, 
  Dumbbell, 
  Users, 
  BarChart3, 
  Settings, 
  User, 
  LogOut,
  Home,
  Clock,
  Info,
  ShieldQuestion // Added ShieldQuestion
} from 'lucide-react';
import { createPageUrl } from '@/utils';

const NavBar = () => {
  const { user, login, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const getInitials = (fullName) => {
    if (!fullName) return 'U';
    const names = fullName.split(' ');
    return names.map(n => n[0]).join('').toUpperCase();
  };

  const navigationItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Queues', href: createPageUrl('Queues'), icon: Clock, auth: true },
    { name: 'Statistics', href: createPageUrl('Statistics'), icon: BarChart3, roles: ['admin', 'secretary'] }, // Modified roles
    { name: 'Admin Dashboard', href: createPageUrl('AdminDashboard'), icon: ShieldQuestion, roles: ['admin'] }, // Modified icon
    { name: 'About', href: createPageUrl('About'), icon: Info },
  ];

  const filteredNavItems = navigationItems.filter(item => {
    if (!item.auth && !item.roles) return true;
    if (item.auth && isAuthenticated) return true;
    if (item.roles && user && item.roles.includes(user.role)) return true;
    return false;
  });

  const NavItems = ({ mobile = false, closeSheet = null }) => (
    <>
      {filteredNavItems.map((item) => {
        const isActive = location.pathname === item.href;
        return (
          <Link
            key={item.name}
            to={item.href}
            onClick={closeSheet}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
              mobile ? 'text-base' : 'text-sm font-medium'
            } ${
              isActive 
                ? 'bg-orange-100 text-orange-700' 
                : 'text-slate-600 hover:text-orange-600 hover:bg-orange-50'
            }`}
          >
            <item.icon className="w-4 h-4" />
            {item.name}
          </Link>
        );
      })}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">FitQueue</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <NavItems />
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.profile_image} alt={user.full_name} />
                      <AvatarFallback className="bg-orange-100 text-orange-700 text-sm">
                        {getInitials(user.full_name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium leading-none">{user.full_name}</p>
                    <p className="text-xs leading-none text-muted-foreground capitalize">{user.role}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to={createPageUrl('Profile')} className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  {user.role === 'admin' && ( // Conditionally render User Management for admins
                    <DropdownMenuItem asChild>
                      <Link to={createPageUrl('UserManagement')} className="cursor-pointer">
                        <Users className="mr-2 h-4 w-4" />
                        User Management
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link to={createPageUrl('Settings')} className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" onClick={login}>Login</Button>
                <Button onClick={login} className="bg-orange-600 hover:bg-orange-700">Sign Up</Button>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col gap-4 py-4">
                  <div className="flex items-center gap-2 pb-4 border-b">
                    <Dumbbell className="w-6 h-6 text-orange-600" />
                    <span className="text-lg font-bold">FitQueue</span>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <NavItems mobile closeSheet={() => setIsOpen(false)} />
                  </div>

                  {!isAuthenticated && (
                    <div className="flex flex-col gap-2 pt-4 border-t">
                      <Button variant="outline" onClick={() => { login(); setIsOpen(false); }}>Login</Button>
                      <Button onClick={() => { login(); setIsOpen(false); }} className="bg-orange-600 hover:bg-orange-700">Sign Up</Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

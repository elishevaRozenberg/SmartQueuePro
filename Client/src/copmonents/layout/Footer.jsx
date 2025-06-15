import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { createPageUrl } from '@/utils';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">FitQueue</span>
            </div>
            <p className="text-slate-400 text-sm">
              Modern queue management for your fitness journey. Skip the wait, embrace the workout.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <Link to="/" className="text-slate-400 hover:text-orange-400 transition-colors text-sm">
                Home
              </Link>
              <Link to={createPageUrl('Queues')} className="text-slate-400 hover:text-orange-400 transition-colors text-sm">
                Queue Status
              </Link>
              <Link to={createPageUrl('About')} className="text-slate-400 hover:text-orange-400 transition-colors text-sm">
                About Us
              </Link>
              <Link to={createPageUrl('Login')} className="text-slate-400 hover:text-orange-400 transition-colors text-sm">
                Member Login
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact</h3>
            <div className="flex flex-col space-y-3">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <MapPin className="w-4 h-4" />
                <span>123 Fitness Ave, Gym City, GC 12345</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Phone className="w-4 h-4" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Mail className="w-4 h-4" />
                <span>info@fitqueue.com</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Hours</h3>
            <div className="flex flex-col space-y-2 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Mon - Fri: 5:00 AM - 11:00 PM</span>
              </div>
              <div className="ml-6">
                <span>Sat - Sun: 6:00 AM - 10:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center">
          <p className="text-slate-400 text-sm">
            © 2024 FitQueue. All rights reserved. Built with ❤️ for fitness enthusiasts.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
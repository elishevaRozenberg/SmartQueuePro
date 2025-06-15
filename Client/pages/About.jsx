import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Dumbbell, MapPin, Mail, Phone, Users, Zap, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">About FitQueue</h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          We're passionate about fitness and technology, and we believe your gym time should be spent working out, not waiting.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Our Mission</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Our mission is to revolutionize the gym experience by eliminating unnecessary waiting times. We provide a seamless, digital solution that empowers members to manage their class and equipment schedules effortlessly, allowing them to focus on what truly matters: their health and fitness goals.
          </p>
          <p className="text-slate-600 leading-relaxed">
            By leveraging smart technology, we aim to create a more efficient, enjoyable, and productive environment for both gym-goers and staff.
          </p>
        </div>
        <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
          <img src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1975&auto=format&fit=crop" alt="Gym interior" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
      </div>

      <div className="bg-slate-50 rounded-2xl p-12 mb-16">
        <h2 className="text-3xl font-bold text-slate-800 text-center mb-8">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Efficiency</h3>
            <p className="text-slate-600">Maximizing your time at the gym.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Member-First</h3>
            <p className="text-slate-600">Your fitness journey is our priority.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p className="text-slate-600">Building a supportive fitness environment.</p>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-3xl font-bold text-slate-800 text-center mb-8">Contact Us</h2>
        <Card className="max-w-3xl mx-auto shadow-lg border-0">
          <CardContent className="p-8 grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-slate-500" />
                </div>
                <div>
                  <h4 className="font-semibold">Address</h4>
                  <p className="text-slate-600 text-sm">123 Fitness Ave, Gym City</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-slate-500" />
                </div>
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <p className="text-slate-600 text-sm">(555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-slate-500" />
                </div>
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-slate-600 text-sm">info@fitqueue.com</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden h-48 md:h-full">
               <div style={{width: '100%', height: '100%', border: 0}}><iframe width="100%" height="100%" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
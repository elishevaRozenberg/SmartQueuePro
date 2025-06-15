import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  Users, 
  Smartphone, 
  CheckCircle, 
  ArrowRight,
  Zap,
  Shield,
  Heart
} from 'lucide-react';
import { createPageUrl } from '@/utils';
import { useAuth } from '../components/auth/AuthContext';

const Home = () => {
  const { isAuthenticated, login } = useAuth();

  const features = [
    {
      icon: Clock,
      title: 'Real-time Queue Updates',
      description: 'See your position and estimated wait time in real-time',
      color: 'text-blue-600'
    },
    {
      icon: Smartphone,
      title: 'Mobile Friendly',
      description: 'Join queues from anywhere using your mobile device',
      color: 'text-green-600'
    },
    {
      icon: Users,
      title: 'Multiple Queue Types',
      description: 'Separate queues for Cardio, Personal Training, and Pilates',
      color: 'text-purple-600'
    },
    {
      icon: CheckCircle,
      title: 'Smart Notifications',
      description: 'Get notified when it\'s your turn',
      color: 'text-orange-600'
    }
  ];

  const stats = [
    { label: 'Happy Members', value: '2,500+', icon: Heart },
    { label: 'Average Wait Time', value: '< 5 min', icon: Clock },
    { label: 'Daily Sessions', value: '150+', icon: Zap },
    { label: 'Success Rate', value: '99.9%', icon: Shield }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-blue-600/10"></div>
        <div className="container mx-auto text-center relative z-10">
          <Badge variant="outline" className="mb-6 border-orange-200 text-orange-700">
            Smart Queue Management
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Skip the Wait,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-500">
              Embrace the Workout
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join queues remotely, track your position in real-time, and maximize your gym experience 
            with our intelligent queue management system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Button size="lg" asChild className="bg-orange-600 hover:bg-orange-700 h-12 px-8">
                <Link to={createPageUrl('Queues')}>
                  View Queues
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            ) : (
              <>
                <Button size="lg" onClick={login} className="bg-orange-600 hover:bg-orange-700 h-12 px-8">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button size="lg" variant="outline" onClick={login} className="h-12 px-8">
                  Sign In
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-orange-600" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                <div className="text-slate-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Choose FitQueue?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Experience the future of gym queue management with our innovative features
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-600 to-orange-500">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Gym Experience?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Join thousands of members who have already upgraded their fitness routine
          </p>
          {!isAuthenticated && (
            <Button size="lg" variant="secondary" onClick={login} className="h-12 px-8">
              Start Your Journey
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
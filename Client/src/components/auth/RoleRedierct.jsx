import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { createPageUrl } from '@/utils';

const RoleRedirect = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    // Only perform redirect if the user is authenticated, not loading, and hasn't been redirected yet in this session.
    // We also check if they just landed on the homepage after login.
    if (isAuthenticated && !loading && !hasRedirected && location.pathname === '/') {
      setHasRedirected(true); // Prevent future redirects in the same session
      
      switch (user.role) {
        case 'admin':
          navigate(createPageUrl('AdminDashboard'), { replace: true });
          break;
        case 'secretary':
          navigate(createPageUrl('Queues'), { replace: true });
          break;
        case 'client':
          navigate(createPageUrl('Queues'), { replace: true });
          break;
        default:
          // Stay on the homepage if role is unknown
          break;
      }
    }
  }, [isAuthenticated, user, loading, navigate, hasRedirected, location.pathname]);

  // This component does not render anything
  return null;
};

export default RoleRedirect;
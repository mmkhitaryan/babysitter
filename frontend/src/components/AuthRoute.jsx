import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '@/context/Auth';

const AuthRoute = ({ guestOnly = false }) => {
  const location = useLocation();
  const from = location.pathname;

  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated && !guestOnly) {
    return <Outlet />;
  } else if (!isAuthenticated && !guestOnly) {
    return <Navigate to='/login' replace state={{ from }} />;
  } else if (isAuthenticated && guestOnly) {
    return <Navigate to='/' replace />;
  } else {
    return <Outlet />;
  }
};

export default AuthRoute;

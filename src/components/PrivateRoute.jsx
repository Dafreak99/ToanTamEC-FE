import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const { auth } = useSelector((state) => state.user);

  return auth ? <Outlet /> : <Navigate to='/' />;
};

export default PrivateRoute;

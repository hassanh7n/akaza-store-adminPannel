import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const ProtectedRoutes = ({ children }) => {
  const { user } = useSelector((store) => store.user);
  if (!user) {
    return <Navigate to='/register' />;
  }
  return children;
};

export default ProtectedRoutes;
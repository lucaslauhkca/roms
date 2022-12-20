import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('staff');

  if (!user) {
    return <Navigate to='/' />;
  }

  return children;
};

export default ProtectedRoute;

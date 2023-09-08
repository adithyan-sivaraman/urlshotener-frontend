/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem('user');
  
  if (!isAuthenticated) {
    // Redirect to the login page if not authenticated
    return <Navigate to="/" />;
  }

  return (
    element
  );
};

export default ProtectedRoute;

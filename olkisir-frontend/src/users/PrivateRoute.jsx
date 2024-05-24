import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../ContextProvider';

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
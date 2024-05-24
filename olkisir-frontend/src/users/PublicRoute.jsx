import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../ContextProvider';

const PublicRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? <Navigate to="/dispatcher" /> : children;
};

export default PublicRoute;
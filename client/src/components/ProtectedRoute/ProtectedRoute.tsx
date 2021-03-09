import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = (props: RouteProps) => {
  const { authenticated } = useAuth();
  if (!authenticated) {
    return <Redirect to="/" />;
  }
  return <Route {...props} />;
};

export default ProtectedRoute;

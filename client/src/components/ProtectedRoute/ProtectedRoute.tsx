import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import logger from '../../config/logger';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = (props: RouteProps) => {
  const { authenticated } = useAuth();
  if (!authenticated) {
    logger.debug(`Tried to access private route, but not authenticated`, {
      path: props.path,
    });
    return <Redirect to="/" />;
  }
  return <Route {...props} />;
};

export default ProtectedRoute;

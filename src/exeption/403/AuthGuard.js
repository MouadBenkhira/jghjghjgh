import React from 'react';
import { Navigate } from 'react-router-dom';
import ForbiddenImage from './403.png';

const Forbidden = () => {
  const imageStyle = {
    width: '80%',
    display: 'block',
    margin: '0 auto',
  };

  return <img src={ForbiddenImage} alt="403 Forbidden" style={imageStyle} />;
};

const AuthGuard = ({ children, isAuthenticated, userRole, allowedRoles }) => {
  if (isAuthenticated && allowedRoles.includes(userRole)) {
    return children;
  } else {
    return <Forbidden />;
  }
};

export default AuthGuard;

import React from 'react';
import { Navigate } from 'react-router-dom';

export default function Protected({ users, children }) {
  // Check if users is null or does not have a role property
  if (!users || !users.role) {
    // Redirect to '/' if the user information is not available or has an undefined role
    return <Navigate to="/" />;
  }

  // Check the user's role and redirect accordingly
  if (users.role === 'User') {
    // Redirect to '/' for regular users
    return <Navigate to="/" />;
  } else {
    // Render the protected content for other roles
    return children;
  }
}

import React, { useState } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const GoogleButton = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Get the navigate function from react-router

  const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwt_decode(credentialResponse.credential);
    setUser(decoded);
    navigate('/welcome');  // Redirect to the welcome page
  };

  const handleLogout = () => {
    googleLogout();
    setUser(null);
  };

  return (
    <div>
      {!user ? (
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      ) : (
        <div>
          <h1>Welcome, {user.name}!</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default GoogleButton;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleButton from './components/googleButton';
import WelcomePage from './components/Welcome';

const App = () => {
  return (
    <GoogleOAuthProvider clientId="">
    <Router>
      <Routes>
        <Route path="/" element={<GoogleButton />} />
        <Route path="/welcome" element={<WelcomePage />} />
      </Routes>
    </Router>
    </GoogleOAuthProvider>
  );
};

export default App;

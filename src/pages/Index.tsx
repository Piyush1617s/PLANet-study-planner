
import React, { useState, useEffect } from 'react';
import LoginForm from '@/components/LoginForm';
import Dashboard from '@/pages/Dashboard';
import { PlanetProvider } from '@/contexts/PlanetContext';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in on component mount
    const userInfo = localStorage.getItem('planet_current_user');
    setIsLoggedIn(!!userInfo);
  }, []);
  
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="min-h-screen bg-space">
      <PlanetProvider>
        {isLoggedIn ? (
          <Dashboard />
        ) : (
          <LoginForm onLogin={handleLogin} />
        )}
      </PlanetProvider>
    </div>
  );
};

export default Index;

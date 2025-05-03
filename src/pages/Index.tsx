
import React, { useState } from 'react';
import LoginForm from '@/components/LoginForm';
import Dashboard from '@/pages/Dashboard';
import { PlanetProvider } from '@/contexts/PlanetContext';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
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

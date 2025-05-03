
import React from 'react';
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Logo from '@/components/Logo';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-space text-white p-4">
      <div className="mb-8">
        <Logo />
      </div>
      
      <div className="max-w-md w-full bg-planet-dark/60 border border-planet-cyan/30 rounded-lg p-8 backdrop-blur-sm">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-planet-cyan text-glow">404</h1>
          <p className="text-xl text-gray-300 mb-6">Oops! Page not found</p>
          <p className="text-gray-400 mb-8">
            The page you are looking for might have been removed, had its name changed,
            or is temporarily unavailable.
          </p>
          <Link 
            to="/" 
            className="inline-block bg-planet-cyan text-planet-dark px-6 py-2 rounded-md font-medium hover:bg-planet-cyan/90 transition-colors"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

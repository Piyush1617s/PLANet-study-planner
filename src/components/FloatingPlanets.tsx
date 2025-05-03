
import React from 'react';

const FloatingPlanets: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div 
        className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-planet-coral opacity-60 animate-float"
        style={{ animationDelay: '0s' }}
      ></div>
      
      <div 
        className="absolute top-1/2 -right-10 w-32 h-32 rounded-full bg-planet-cyan opacity-40 animate-float"
        style={{ animationDelay: '1.5s' }}
      ></div>
      
      <div 
        className="absolute -bottom-10 right-1/4 w-24 h-24 rounded-full bg-yellow-400 opacity-50 animate-float"
        style={{ animationDelay: '3s' }}
      ></div>
      
      <div className="absolute top-60 left-1/3 opacity-30">
        <div className="relative">
          <div className="h-1 w-1 rounded-full bg-white absolute z-10 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="h-1 w-1 rounded-full bg-planet-coral absolute animate-orbit" style={{ animationDuration: '15s' }}></div>
          <div className="h-1 w-1 rounded-full bg-planet-cyan absolute animate-orbit" style={{ animationDuration: '20s', animationDelay: '5s' }}></div>
        </div>
      </div>
      
      <div className="absolute top-1/4 right-1/4 opacity-20">
        <div className="relative">
          <div className="h-1 w-1 rounded-full bg-white absolute z-10 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="h-1 w-1 rounded-full bg-planet-purple absolute animate-orbit" style={{ animationDuration: '25s' }}></div>
          <div className="h-1 w-1 rounded-full bg-yellow-400 absolute animate-orbit" style={{ animationDuration: '18s', animationDelay: '3s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default FloatingPlanets;

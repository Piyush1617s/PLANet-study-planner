
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative flex items-center">
        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-300 opacity-90 flex items-center justify-center relative">
          <div className="h-6 w-6 rounded-full bg-planet-dark opacity-70 absolute z-10"></div>
          <div className="h-3 w-3 rounded-full bg-planet-cyan absolute z-20 translate-x-1 -translate-y-1"></div>
        </div>
        <h1 className="ml-3 text-4xl font-bold bg-gradient-to-r from-planet-cyan via-blue-400 to-planet-purple bg-clip-text text-transparent animate-glow">
          PLANet
        </h1>
      </div>
    </div>
  );
};

export default Logo;

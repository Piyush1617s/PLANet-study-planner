
import React from 'react';
import { cn } from '@/lib/utils';

interface PlanetCardProps {
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const PlanetCard: React.FC<PlanetCardProps> = ({
  title,
  children,
  className
}) => {
  return (
    <div 
      className={cn(
        "bg-planet-dark/60 border border-planet-cyan/30 rounded-lg p-6 backdrop-blur-sm",
        className
      )}
    >
      {title && (
        <div className="flex items-center mb-4">
          <h2 className="text-xl text-planet-cyan text-glow">{title}</h2>
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};

export default PlanetCard;

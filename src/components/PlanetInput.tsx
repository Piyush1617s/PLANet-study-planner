
import React from 'react';
import { cn } from '@/lib/utils';

interface PlanetInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
}

const PlanetInput: React.FC<PlanetInputProps> = ({
  className,
  label,
  icon,
  error,
  ...props
}) => {
  return (
    <div className="relative w-full">
      {label && (
        <label className="block text-sm text-planet-cyan mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-planet-cyan">
            {icon}
          </div>
        )}
        <input
          className={cn(
            "w-full bg-planet-dark/60 border border-planet-cyan/40 rounded-md py-2 px-4 text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-planet-cyan focus:border-planet-cyan transition-all",
            icon && "pl-10",
            error && "border-red-500",
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default PlanetInput;

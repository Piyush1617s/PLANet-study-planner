
import React from 'react';
import { cn } from '@/lib/utils';

interface NavigationButtonProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  icon,
  label,
  active = false,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-6 py-2 rounded-full border border-planet-cyan/40 flex items-center justify-center space-x-2 transition-all duration-300",
        active
          ? "bg-planet-cyan/20 text-white border-planet-cyan border-glow"
          : "bg-transparent text-planet-cyan/80 hover:bg-planet-cyan/10"
      )}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
};

export default NavigationButton;

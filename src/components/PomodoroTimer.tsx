
import React, { useState, useEffect } from 'react';
import { Timer, RotateCcw } from 'lucide-react';
import PlanetCard from './PlanetCard';
import PlanetButton from './PlanetButton';
import { usePlanet } from '@/contexts/PlanetContext';

const PomodoroTimer: React.FC = () => {
  const { settings } = usePlanet();
  const [minutes, setMinutes] = useState(settings.defaultPomodoroDuration);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'work' | 'shortBreak' | 'longBreak'>('work');
  
  // Reset timer when mode changes
  useEffect(() => {
    resetTimer();
  }, [mode, settings.defaultPomodoroDuration]);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer is complete
            setIsActive(false);
            // Could add notification/sound here
            
            // Automatically switch to the next mode
            if (mode === 'work') {
              setMode('shortBreak');
            } else if (mode === 'shortBreak') {
              setMode('work');
            } else if (mode === 'longBreak') {
              setMode('work');
            }
            
            clearInterval(interval);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, minutes, seconds, mode]);

  const resetTimer = () => {
    setIsActive(false);
    if (mode === 'work') {
      setMinutes(settings.defaultPomodoroDuration);
    } else if (mode === 'shortBreak') {
      setMinutes(5);
    } else if (mode === 'longBreak') {
      setMinutes(15);
    }
    setSeconds(0);
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };
  
  const formatTime = (mins: number, secs: number): string => {
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <PlanetCard title={<div className="flex items-center gap-2"><Timer className="h-5 w-5" /> Pomodoro Timer</div>}>
      <div className="flex flex-col items-center">
        <div className="text-8xl font-mono text-planet-cyan text-glow mb-8">
          {formatTime(minutes, seconds)}
        </div>
        
        <div className="flex gap-4 mb-6">
          <PlanetButton
            onClick={toggleTimer}
            size="lg"
          >
            {isActive ? 'Pause' : 'Start'}
          </PlanetButton>
          
          <PlanetButton
            onClick={resetTimer}
            variant="outline"
            size="lg"
          >
            <RotateCcw className="mr-1 h-4 w-4" />
            Reset
          </PlanetButton>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setMode('work')}
            className={`px-4 py-2 rounded-md ${mode === 'work' ? 'bg-planet-cyan text-planet-dark' : 'bg-planet-dark/40 text-white'}`}
          >
            Work
          </button>
          <button
            onClick={() => setMode('shortBreak')}
            className={`px-4 py-2 rounded-md ${mode === 'shortBreak' ? 'bg-planet-cyan text-planet-dark' : 'bg-planet-dark/40 text-white'}`}
          >
            Short Break
          </button>
          <button
            onClick={() => setMode('longBreak')}
            className={`px-4 py-2 rounded-md ${mode === 'longBreak' ? 'bg-planet-cyan text-planet-dark' : 'bg-planet-dark/40 text-white'}`}
          >
            Long Break
          </button>
        </div>
      </div>
    </PlanetCard>
  );
};

export default PomodoroTimer;

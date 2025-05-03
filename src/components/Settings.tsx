
import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import PlanetCard from './PlanetCard';
import PlanetInput from './PlanetInput';
import { usePlanet } from '@/contexts/PlanetContext';

const Settings: React.FC = () => {
  const { settings, updateSettings } = usePlanet();
  
  return (
    <PlanetCard title={<div className="flex items-center gap-2"><SettingsIcon className="h-5 w-5" /> Settings</div>}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm text-planet-cyan mb-1">
            Default Pomodoro Duration (minutes)
          </label>
          <PlanetInput
            type="number"
            min="1"
            max="60"
            value={settings.defaultPomodoroDuration}
            onChange={(e) => updateSettings({ defaultPomodoroDuration: parseInt(e.target.value) || 25 })}
            className="max-w-xs"
          />
        </div>
        
        <div>
          <label className="block text-sm text-planet-cyan mb-1">
            First Day of Week
          </label>
          <select
            value={settings.firstDayOfWeek}
            onChange={(e) => updateSettings({ firstDayOfWeek: e.target.value })}
            className="bg-planet-dark/60 border border-planet-cyan/40 rounded-md py-2 px-4 text-white focus:outline-none focus:border-planet-cyan max-w-xs"
          >
            <option value="Sunday">Sunday</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
          </select>
        </div>
        
        <div className="pt-4 border-t border-planet-cyan/20">
          <h3 className="text-lg text-planet-cyan mb-3">About PLANet</h3>
          <p className="text-gray-300">
            PLANet is your ultimate study companion designed to help you track, plan, and optimize your academic journey.
            Version 1.0.0
          </p>
        </div>
      </div>
    </PlanetCard>
  );
};

export default Settings;

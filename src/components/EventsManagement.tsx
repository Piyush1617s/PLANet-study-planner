
import React, { useState } from 'react';
import { Star, Plus } from 'lucide-react';
import PlanetCard from './PlanetCard';
import PlanetInput from './PlanetInput';
import PlanetButton from './PlanetButton';
import { usePlanet } from '@/contexts/PlanetContext';

const EventsManagement: React.FC = () => {
  const { events, addEvent, deleteEvent } = usePlanet();
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    time: ''
  });
  
  const handleAddEvent = () => {
    if (newEvent.name.trim() && newEvent.date) {
      addEvent({
        name: newEvent.name.trim(),
        date: newEvent.date,
        time: newEvent.time || ''
      });
      setNewEvent({
        name: '',
        date: '',
        time: ''
      });
    }
  };

  return (
    <PlanetCard title={<div className="flex items-center gap-2"><Star className="h-5 w-5" /> Events</div>}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <PlanetInput
          placeholder="Event Name"
          value={newEvent.name}
          onChange={(e) => setNewEvent({...newEvent, name: e.target.value})}
        />
        
        <PlanetInput
          type="date"
          value={newEvent.date}
          onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
        />
        
        <PlanetInput
          type="time"
          value={newEvent.time}
          onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
        />
      </div>
      
      <PlanetButton onClick={handleAddEvent} className="mb-6">
        <Plus className="h-4 w-4 mr-1" /> Add Event
      </PlanetButton>
      
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {events.length > 0 ? (
          events.map(event => (
            <div 
              key={event.id} 
              className="flex justify-between items-center p-3 bg-planet-dark/40 rounded-lg border border-planet-cyan/20"
            >
              <div>
                <div className="font-medium text-white">{event.name}</div>
                <div className="text-sm text-gray-400">
                  {event.date} {event.time && `at ${event.time}`}
                </div>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => deleteEvent(event.id)}
                  className="text-gray-400 hover:text-red-500 p-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center py-4">No events scheduled</p>
        )}
      </div>
    </PlanetCard>
  );
};

export default EventsManagement;

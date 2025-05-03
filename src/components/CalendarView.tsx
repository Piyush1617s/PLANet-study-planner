
import React, { useState } from 'react';
import { format, startOfWeek, addDays, isSameDay, parseISO, addWeeks, subWeeks } from 'date-fns';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import PlanetCard from './PlanetCard';
import { usePlanet } from '@/contexts/PlanetContext';

const CalendarView: React.FC = () => {
  const { settings, tasks, events } = usePlanet();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  
  // Get the start of the week based on user settings
  const getStartOfWeek = () => {
    const dayMap: Record<string, number> = {
      'Sunday': 0,
      'Monday': 1,
      'Tuesday': 2,
      'Wednesday': 3,
      'Thursday': 4,
      'Friday': 5,
      'Saturday': 6
    };
    
    return startOfWeek(currentDate, { weekStartsOn: dayMap[settings.firstDayOfWeek] });
  };
  
  const weekStart = getStartOfWeek();
  
  // Generate week days
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  
  // Handlers for navigation
  const previousWeek = () => setCurrentDate(subWeeks(currentDate, 1));
  const nextWeek = () => setCurrentDate(addWeeks(currentDate, 1));
  
  // Get tasks and events for a specific day
  const getTasksForDay = (date: Date) => {
    return tasks.filter(task => {
      try {
        const taskDate = parseISO(task.dueDate);
        return isSameDay(taskDate, date);
      } catch {
        return false;
      }
    });
  };
  
  const getEventsForDay = (date: Date) => {
    return events.filter(event => {
      try {
        const eventDate = parseISO(event.date);
        return isSameDay(eventDate, date);
      } catch {
        return false;
      }
    });
  };

  return (
    <PlanetCard title={<div className="flex items-center gap-2"><CalendarIcon className="h-5 w-5" /> Calendar</div>}>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={previousWeek}
            className="p-2 rounded-full bg-planet-dark/40 text-planet-cyan hover:bg-planet-dark/60 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <div className="text-xl text-planet-cyan">
            {format(weekStart, 'MMMM yyyy')}
          </div>
          
          <button
            onClick={nextWeek}
            className="p-2 rounded-full bg-planet-dark/40 text-planet-cyan hover:bg-planet-dark/60 transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day, i) => (
            <div key={i} className="text-center">
              <div className="text-planet-cyan font-medium py-1">
                {format(day, 'EEEE')}
              </div>
              <div className={`p-2 rounded-full mx-auto w-8 h-8 flex items-center justify-center
                ${isSameDay(day, new Date()) ? 'bg-planet-cyan text-planet-dark' : 'text-white'}`}
              >
                {format(day, 'd')}
              </div>
              
              <div className="mt-2 h-32 overflow-y-auto text-left py-1 px-2">
                {getTasksForDay(day).map(task => (
                  <div key={task.id} className="text-xs mb-1 p-1 bg-planet-dark/40 rounded border-l-2 border-red-500">
                    {task.name}
                  </div>
                ))}
                
                {getEventsForDay(day).map(event => (
                  <div key={event.id} className="text-xs mb-1 p-1 bg-planet-dark/40 rounded border-l-2 border-planet-purple">
                    {event.time} - {event.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg text-planet-cyan mb-3">Month Notes</h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add notes for this month..."
          className="w-full h-32 bg-planet-dark/30 border border-planet-cyan/30 rounded-lg p-3 text-white placeholder:text-gray-400 focus:outline-none focus:border-planet-cyan"
        />
      </div>
    </PlanetCard>
  );
};

export default CalendarView;

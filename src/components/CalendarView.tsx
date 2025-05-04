
import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, getDay, isSameDay, parseISO } from 'date-fns';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Save } from 'lucide-react';
import PlanetCard from './PlanetCard';
import { usePlanet } from '@/contexts/PlanetContext';
import { useToast } from '@/hooks/use-toast';

const CalendarView: React.FC = () => {
  const { settings, tasks, events } = usePlanet();
  const { toast } = useToast();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [savedNotes, setSavedNotes] = useState<Record<string, string>>({});
  
  // Get days in current month
  const getDaysInMonth = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    return eachDayOfInterval({ start: monthStart, end: monthEnd });
  };
  
  const days = getDaysInMonth();
  
  // Calculate blank days at start of month (for formatting calendar grid)
  const firstDayOfMonth = getDay(startOfMonth(currentMonth));
  const blankDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);
  
  // Navigation handlers
  const previousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  
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
  
  // Load saved notes when month changes
  useEffect(() => {
    const monthKey = format(currentMonth, 'yyyy-MM');
    const savedNote = localStorage.getItem(`planet_notes_${monthKey}`);
    if (savedNote) {
      setNotes(savedNote);
    } else {
      setNotes('');
    }
  }, [currentMonth]);
  
  // Save notes
  const saveNotes = () => {
    const monthKey = format(currentMonth, 'yyyy-MM');
    localStorage.setItem(`planet_notes_${monthKey}`, notes);
    
    toast({
      title: "Notes saved",
      description: `Your notes for ${format(currentMonth, 'MMMM yyyy')} have been saved.`
    });
  };

  return (
    <PlanetCard title={<div className="flex items-center gap-2"><CalendarIcon className="h-5 w-5" /> Calendar</div>}>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={previousMonth}
            className="p-2 rounded-full bg-planet-dark/40 text-planet-cyan hover:bg-planet-dark/60 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <div className="text-xl text-planet-cyan">
            {format(currentMonth, 'MMMM yyyy')}
          </div>
          
          <button
            onClick={nextMonth}
            className="p-2 rounded-full bg-planet-dark/40 text-planet-cyan hover:bg-planet-dark/60 transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        
        {/* Calendar weekday headers */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
            <div key={i} className="text-center text-planet-cyan font-medium py-1">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Blank days */}
          {blankDays.map(day => (
            <div key={`blank-${day}`} className="aspect-square p-1"></div>
          ))}
          
          {/* Actual days */}
          {days.map((day, i) => {
            const isToday = isSameDay(day, new Date());
            const tasksForDay = getTasksForDay(day);
            const eventsForDay = getEventsForDay(day);
            const hasItems = tasksForDay.length > 0 || eventsForDay.length > 0;
            
            return (
              <div 
                key={i} 
                className={`aspect-square border border-planet-cyan/10 rounded-md overflow-hidden flex flex-col
                  ${isToday ? 'bg-planet-cyan/10' : 'bg-planet-dark/20'}`}
              >
                <div className={`text-right p-1 font-medium ${isToday ? 'text-planet-cyan' : 'text-white'}`}>
                  {format(day, 'd')}
                </div>
                
                <div className="flex-1 p-1 overflow-y-auto">
                  {tasksForDay.slice(0, 2).map(task => (
                    <div key={task.id} className="text-xs mb-1 truncate px-1 bg-planet-dark/30 border-l-2 border-red-500">
                      {task.name}
                    </div>
                  ))}
                  
                  {eventsForDay.slice(0, 2).map(event => (
                    <div key={event.id} className="text-xs mb-1 truncate px-1 bg-planet-dark/30 border-l-2 border-planet-purple">
                      {event.name}
                    </div>
                  ))}
                  
                  {hasItems && tasksForDay.length + eventsForDay.length > 4 && (
                    <div className="text-xs text-center text-gray-400">
                      +{tasksForDay.length + eventsForDay.length - 4} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="mt-8">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg text-planet-cyan">Month Notes</h3>
          <button 
            onClick={saveNotes}
            className="flex items-center gap-1 text-planet-cyan bg-planet-dark/40 px-3 py-1 rounded-md hover:bg-planet-dark/60 transition-colors"
          >
            <Save className="h-4 w-4" /> Save Notes
          </button>
        </div>
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

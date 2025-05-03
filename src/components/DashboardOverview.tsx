
import React from 'react';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import { ListChecks, BookOpen, Clock, Calendar } from 'lucide-react';
import PlanetCard from './PlanetCard';
import { usePlanet } from '@/contexts/PlanetContext';

const COLORS = ['#5DE0E6'];

const DashboardOverview: React.FC = () => {
  const { subjects, tasks, studySessions, events } = usePlanet();
  
  // Calculate completion statistics
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  // Calculate active subjects (subjects with tasks)
  const activeSubjects = subjects.filter(subject => subject.tasks?.length > 0).length;
  
  // Count study sessions for this week
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  
  const sessionsThisWeek = studySessions.filter(session => {
    const sessionDate = new Date(session.date);
    return sessionDate >= startOfWeek;
  }).length;
  
  // Find next upcoming event
  const upcomingEvents = events
    .filter(event => new Date(event.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const nextEvent = upcomingEvents.length > 0 ? upcomingEvents[0] : null;
  
  // Task priority data for chart
  const tasksByPriority = {
    low: tasks.filter(task => task.priority === 'low').length,
    medium: tasks.filter(task => task.priority === 'medium').length,
    high: tasks.filter(task => task.priority === 'high').length,
    critical: 0 // Added for the chart layout
  };
  
  const priorityData = [
    { name: 'Low', value: tasksByPriority.low },
    { name: 'Medium', value: tasksByPriority.medium },
    { name: 'High', value: tasksByPriority.high },
    { name: 'Critical', value: tasksByPriority.critical }
  ];
  
  // Subject progress data
  const subjectProgressData = subjects.map(subject => ({
    name: subject.name,
    value: subject.completion
  }));
  
  // Upcoming tasks (not completed, sorted by date)
  const upcomingTasks = tasks
    .filter(task => !task.completed)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5);

  return (
    <div>
      <div className="mb-4 text-center">
        <h1 className="text-4xl font-bold text-planet-cyan mb-2">Dashboard</h1>
        <p className="text-gray-400">Your study journey at a glance</p>
      </div>
      
      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-planet-dark/40 p-4 rounded-lg border border-planet-cyan/20 flex flex-col items-center">
          <div className="bg-[#3a4a63] p-3 rounded-full mb-3">
            <ListChecks className="h-6 w-6 text-[#5DE0E6]" />
          </div>
          <h3 className="text-lg text-center">Task Completion</h3>
          <p className="text-4xl font-bold text-white mt-1">{completionPercentage}%</p>
          <p className="text-sm text-gray-400 mt-1">{completedTasks}/{totalTasks} tasks</p>
        </div>
        
        <div className="bg-planet-dark/40 p-4 rounded-lg border border-planet-cyan/20 flex flex-col items-center">
          <div className="bg-[#483a63] p-3 rounded-full mb-3">
            <BookOpen className="h-6 w-6 text-[#9B87F5]" />
          </div>
          <h3 className="text-lg text-center">Active Subjects</h3>
          <p className="text-4xl font-bold text-white mt-1">{activeSubjects}</p>
          <p className="text-sm text-gray-400 mt-1">{activeSubjects} in progress</p>
        </div>
        
        <div className="bg-planet-dark/40 p-4 rounded-lg border border-planet-cyan/20 flex flex-col items-center">
          <div className="bg-[#63583a] p-3 rounded-full mb-3">
            <Clock className="h-6 w-6 text-[#FFB800]" />
          </div>
          <h3 className="text-lg text-center">Study Sessions</h3>
          <p className="text-4xl font-bold text-white mt-1">{sessionsThisWeek}</p>
          <p className="text-sm text-gray-400 mt-1">This week</p>
        </div>
        
        <div className="bg-planet-dark/40 p-4 rounded-lg border border-planet-cyan/20 flex flex-col items-center">
          <div className="bg-[#633a4a] p-3 rounded-full mb-3">
            <Calendar className="h-6 w-6 text-[#FE6479]" />
          </div>
          <h3 className="text-lg text-center">Upcoming Events</h3>
          <p className="text-4xl font-bold text-white mt-1">{upcomingEvents.length}</p>
          <p className="text-sm text-gray-400 mt-1">Next: {nextEvent ? nextEvent.name : 'None'}</p>
        </div>
      </div>
      
      {/* Charts and Lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <PlanetCard className="min-h-[300px]">
          <h3 className="text-xl text-planet-cyan mb-4">Subject Progress</h3>
          <div className="h-[250px] flex items-center justify-center">
            {subjectProgressData.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={subjectProgressData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#5DE0E6"
                      paddingAngle={1}
                      dataKey="value"
                    >
                      {subjectProgressData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill="#5DE0E6" />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
                {subjectProgressData.map((subject) => (
                  <div key={subject.name} className="text-planet-cyan absolute bottom-8 left-8">
                    {subject.name}: {subject.value}%
                  </div>
                ))}
              </>
            ) : (
              <p className="text-gray-400">No subject data available</p>
            )}
          </div>
        </PlanetCard>
        
        <PlanetCard className="min-h-[300px]">
          <h3 className="text-xl text-planet-cyan mb-4">Tasks by Priority</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priorityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#444" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis domain={[0, 1]} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="value" name="Tasks">
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#5DE0E6" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </PlanetCard>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PlanetCard>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl text-planet-cyan">Upcoming Tasks</h3>
            <a href="#" className="text-planet-cyan hover:underline text-sm">View All</a>
          </div>
          
          {upcomingTasks.length > 0 ? (
            <div className="space-y-2">
              {upcomingTasks.map(task => (
                <div 
                  key={task.id}
                  className="flex justify-between items-center p-3 bg-planet-dark/20 rounded-md border border-planet-cyan/10"
                >
                  <div className="flex flex-col">
                    <span className="text-white">{task.name}</span>
                    <span className="text-xs text-gray-400">{task.dueDate}</span>
                  </div>
                  <div className="px-3 py-1 rounded-full text-xs" 
                    style={{ 
                      backgroundColor: task.priority === 'high' ? 'rgba(255,75,75,0.2)' : 'transparent',
                      color: task.priority === 'high' ? '#ff4b4b' : 'inherit',
                      border: task.priority === 'high' ? '1px solid #ff4b4b' : 'none',
                    }}>
                    {task.priority === 'high' ? 'High' : ''}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-8">No upcoming tasks</p>
          )}
          
          {upcomingTasks.length > 0 && (
            <div className="text-center mt-4">
              <button className="px-5 py-2 rounded-md border border-planet-cyan text-planet-cyan hover:bg-planet-cyan/10 transition">
                Add Event
              </button>
            </div>
          )}
        </PlanetCard>
        
        <PlanetCard>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl text-planet-cyan">Upcoming Events</h3>
            <a href="#" className="text-planet-cyan hover:underline text-sm">View All</a>
          </div>
          
          {upcomingEvents.length > 0 ? (
            <div className="space-y-2">
              {upcomingEvents.slice(0, 5).map(event => (
                <div 
                  key={event.id}
                  className="flex justify-between items-center p-3 bg-planet-dark/20 rounded-md border border-planet-cyan/10"
                >
                  <div>
                    <span className="text-white">{event.name}</span>
                    <div className="text-xs text-gray-400">
                      {event.date} {event.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-400 text-center py-8">
              <p className="mb-4">No upcoming events</p>
              <button className="px-5 py-2 rounded-md border border-planet-cyan text-planet-cyan hover:bg-planet-cyan/10 transition">
                Add Event
              </button>
            </div>
          )}
        </PlanetCard>
      </div>
    </div>
  );
};

export default DashboardOverview;

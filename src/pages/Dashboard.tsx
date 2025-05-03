
import React, { useState } from 'react';
import { Target, BarChart3, Settings as SettingsIcon, User } from 'lucide-react';
import Logo from '@/components/Logo';
import NavigationButton from '@/components/NavigationButton';
import TaskManagement from '@/components/TaskManagement';
import PomodoroTimer from '@/components/PomodoroTimer';
import CalendarView from '@/components/CalendarView';
import EventsManagement from '@/components/EventsManagement';
import SubjectsManagement from '@/components/SubjectsManagement';
import Settings from '@/components/Settings';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import FloatingPlanets from '@/components/FloatingPlanets';
import Profile from '@/components/Profile';
import { usePlanet, TabType } from '@/contexts/PlanetContext';

const Dashboard: React.FC = () => {
  const { activeTab, setActiveTab } = usePlanet();
  const [showSettings, setShowSettings] = useState(false);
  
  const tabs = [
    { id: 'tasks', label: 'Tasks', icon: <Target className="h-5 w-5 mr-2" /> },
    { id: 'pomodoro', label: 'Pomodoro', icon: <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
    { id: 'calendar', label: 'Calendar', icon: <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
    { id: 'events', label: 'Events', icon: <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
    { id: 'subjects', label: 'Subjects', icon: <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="h-5 w-5 mr-2" /> },
    { id: 'profile', label: 'Profile', icon: <User className="h-5 w-5 mr-2" /> }
  ];
  
  return (
    <div className="min-h-screen bg-space text-white relative">
      <FloatingPlanets />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Logo />
        </div>
        
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {tabs.map(tab => (
            <NavigationButton
              key={tab.id}
              icon={tab.icon}
              label={tab.label}
              active={activeTab === tab.id as TabType}
              onClick={() => setActiveTab(tab.id as TabType)}
            />
          ))}
        </div>
        
        <div className="max-w-6xl mx-auto">
          {activeTab === 'tasks' && <TaskManagement />}
          {activeTab === 'pomodoro' && <PomodoroTimer />}
          {activeTab === 'calendar' && <CalendarView />}
          {activeTab === 'events' && <EventsManagement />}
          {activeTab === 'subjects' && <SubjectsManagement />}
          {activeTab === 'analytics' && <AnalyticsDashboard />}
          {activeTab === 'profile' && <Profile />}
          
          {showSettings && (
            <div className="mt-8">
              <Settings />
            </div>
          )}
        </div>
        
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center gap-2 text-planet-cyan bg-planet-dark/40 px-4 py-2 rounded-full border border-planet-cyan/30 hover:bg-planet-dark/60 transition-colors"
          >
            <SettingsIcon className="h-4 w-4" />
            {showSettings ? 'Hide Settings' : 'Show Settings'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

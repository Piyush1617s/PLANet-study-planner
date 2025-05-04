
import React, { useState, useEffect } from 'react';
import { ListChecks, Clock, Calendar, Star, BookOpen, Home, Settings as SettingsIcon, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import NavigationButton from '@/components/NavigationButton';
import TaskManagement from '@/components/TaskManagement';
import PomodoroTimer from '@/components/PomodoroTimer';
import CalendarView from '@/components/CalendarView';
import EventsManagement from '@/components/EventsManagement';
import SubjectsManagement from '@/components/SubjectsManagement';
import Settings from '@/components/Settings';
import DashboardOverview from '@/components/DashboardOverview';
import FloatingPlanets from '@/components/FloatingPlanets';
import Profile from '@/components/Profile';
import { usePlanet, TabType } from '@/contexts/PlanetContext';
import { useToast } from '@/hooks/use-toast';

const Dashboard: React.FC = () => {
  const { activeTab, setActiveTab } = usePlanet();
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState<{ name: string, email: string } | null>(null);
  
  // Check if user is logged in
  useEffect(() => {
    const userInfo = localStorage.getItem('planet_current_user');
    if (userInfo) {
      setCurrentUser(JSON.parse(userInfo));
    } else {
      navigate('/');
    }
  }, [navigate]);
  
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home className="h-5 w-5 mr-2" /> },
    { id: 'tasks', label: 'Tasks', icon: <ListChecks className="h-5 w-5 mr-2" /> },
    { id: 'pomodoro', label: 'Pomodoro', icon: <Clock className="h-5 w-5 mr-2" /> },
    { id: 'calendar', label: 'Calendar', icon: <Calendar className="h-5 w-5 mr-2" /> },
    { id: 'events', label: 'Events', icon: <Star className="h-5 w-5 mr-2" /> },
    { id: 'subjects', label: 'Subjects', icon: <BookOpen className="h-5 w-5 mr-2" /> },
    { id: 'profile', label: 'Profile', icon: <User className="h-5 w-5 mr-2" /> }
  ];
  
  const handleLogout = () => {
    // Clear all user-related data
    localStorage.removeItem('planet_current_user');
    
    // Show toast notification
    toast({
      title: "Logged out",
      description: "You've been successfully logged out"
    });
    
    // Reset to login page
    setCurrentUser(null);
    navigate('/', { replace: true });
  };
  
  if (!currentUser) {
    return null; // Don't render anything until we check auth status
  }
  
  return (
    <div className="min-h-screen bg-space text-white relative">
      <FloatingPlanets />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-4">
            <span className="text-planet-cyan">Welcome, {currentUser.name}</span>
            <button 
              onClick={handleLogout}
              className="px-4 py-1 rounded-md border border-planet-cyan text-planet-cyan hover:bg-planet-cyan/10 transition flex items-center gap-1"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
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
          {activeTab === 'dashboard' && <DashboardOverview />}
          {activeTab === 'tasks' && <TaskManagement />}
          {activeTab === 'pomodoro' && <PomodoroTimer />}
          {activeTab === 'calendar' && <CalendarView />}
          {activeTab === 'events' && <EventsManagement />}
          {activeTab === 'subjects' && <SubjectsManagement />}
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
      
      <div className="text-center text-xs text-gray-500 mt-8 pb-4">
        <div className="flex justify-center gap-4 mb-2">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Help</span>
        </div>
        <div>© 2025 PLANet Study Planner. All rights reserved.</div>
      </div>
    </div>
  );
};

export default Dashboard;

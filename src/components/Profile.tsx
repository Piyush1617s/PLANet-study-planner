
import React from 'react';
import { User, Mail, Clock, BookOpen } from 'lucide-react';
import PlanetCard from './PlanetCard';
import PlanetButton from './PlanetButton';

const Profile: React.FC = () => {
  // In a real app, this would come from context or props
  const user = {
    name: 'Student Name',
    email: 'student@university.edu',
    joinedDate: '2023-09-01',
    major: 'Computer Science',
    studyHours: 120,
    completedTasks: 48
  };

  return (
    <PlanetCard title={<div className="flex items-center gap-2"><User className="h-5 w-5" /> Profile</div>}>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0 flex flex-col items-center">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            {user.name.charAt(0)}
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-lg font-medium text-white">{user.name}</h3>
            <div className="flex items-center justify-center text-sm text-gray-400 mt-1">
              <Mail className="h-3 w-3 mr-1" />
              <span>{user.email}</span>
            </div>
          </div>
          <PlanetButton variant="outline" className="mt-4 text-sm">
            Edit Profile
          </PlanetButton>
        </div>

        <div className="flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-planet-dark/40 border border-planet-cyan/20 p-4 rounded-md">
              <div className="flex items-center text-planet-cyan mb-2">
                <BookOpen className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Major</span>
              </div>
              <div className="text-white">{user.major}</div>
            </div>
            
            <div className="bg-planet-dark/40 border border-planet-cyan/20 p-4 rounded-md">
              <div className="flex items-center text-planet-cyan mb-2">
                <Clock className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Joined</span>
              </div>
              <div className="text-white">{new Date(user.joinedDate).toLocaleDateString()}</div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="bg-planet-dark/40 border border-planet-cyan/20 p-4 rounded-md text-center">
              <div className="text-2xl font-bold text-white">{user.studyHours}</div>
              <div className="text-xs text-gray-400 mt-1">STUDY HOURS</div>
            </div>
            
            <div className="bg-planet-dark/40 border border-planet-cyan/20 p-4 rounded-md text-center">
              <div className="text-2xl font-bold text-white">{user.completedTasks}</div>
              <div className="text-xs text-gray-400 mt-1">COMPLETED TASKS</div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-planet-cyan mb-3">Academic Goals</h3>
            <div className="bg-planet-dark/40 border border-planet-cyan/20 p-4 rounded-md">
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white">Weekly Study Hours</span>
                  <span className="text-planet-cyan">8/12 hrs</span>
                </div>
                <div className="h-2 bg-planet-dark rounded-full">
                  <div className="h-2 bg-planet-cyan rounded-full" style={{ width: '66%' }}></div>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white">Assignment Completion</span>
                  <span className="text-planet-cyan">85%</span>
                </div>
                <div className="h-2 bg-planet-dark rounded-full">
                  <div className="h-2 bg-planet-cyan rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PlanetCard>
  );
};

export default Profile;

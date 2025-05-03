
import React, { useState } from 'react';
import { User, Mail, Clock, BookOpen, Edit, Save, X } from 'lucide-react';
import PlanetCard from './PlanetCard';
import PlanetButton from './PlanetButton';
import PlanetInput from './PlanetInput';
import { useToast } from '@/hooks/use-toast';

const Profile: React.FC = () => {
  const { toast } = useToast();
  
  // In a real app, this would come from context or props
  const [userData, setUserData] = useState({
    name: 'Student Name',
    email: 'student@university.edu',
    joinedDate: '2023-09-01',
    major: 'Computer Science',
    studyHours: 120,
    completedTasks: 48
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...userData });
  const [goals, setGoals] = useState({
    weeklyStudyHours: 8,
    weeklyStudyHoursTarget: 12,
    assignmentCompletion: 85
  });
  
  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...userData });
  };
  
  const handleCancel = () => {
    setIsEditing(false);
  };
  
  const handleSave = () => {
    // Validate input
    if (!editData.name.trim() || !editData.email.trim() || !editData.major.trim()) {
      toast({
        title: "Error",
        description: "All fields are required",
        variant: "destructive"
      });
      return;
    }
    
    // Update user data
    setUserData({
      ...userData,
      name: editData.name,
      email: editData.email,
      major: editData.major
    });
    
    setIsEditing(false);
    
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated",
    });
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value
    });
  };
  
  const updateGoal = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setGoals({
        ...goals,
        [field]: value
      });
      
      toast({
        title: "Goal updated",
        description: `Your ${field === 'weeklyStudyHoursTarget' ? 'weekly study hours target' : 'assignment completion target'} has been updated`,
      });
    }
  };

  return (
    <PlanetCard title={<div className="flex items-center gap-2"><User className="h-5 w-5" /> Profile</div>}>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0 flex flex-col items-center">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            {userData.name.charAt(0)}
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-lg font-medium text-white">{userData.name}</h3>
            <div className="flex items-center justify-center text-sm text-gray-400 mt-1">
              <Mail className="h-3 w-3 mr-1" />
              <span>{userData.email}</span>
            </div>
          </div>
          {!isEditing ? (
            <PlanetButton variant="outline" className="mt-4 text-sm" onClick={handleEdit}>
              <Edit className="h-4 w-4 mr-1" /> Edit Profile
            </PlanetButton>
          ) : (
            <div className="flex gap-2 mt-4">
              <PlanetButton variant="outline" className="text-sm" onClick={handleSave}>
                <Save className="h-4 w-4 mr-1" /> Save
              </PlanetButton>
              <PlanetButton variant="outline" className="text-sm" onClick={handleCancel}>
                <X className="h-4 w-4 mr-1" /> Cancel
              </PlanetButton>
            </div>
          )}
        </div>

        <div className="flex-grow">
          {!isEditing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-planet-dark/40 border border-planet-cyan/20 p-4 rounded-md">
                <div className="flex items-center text-planet-cyan mb-2">
                  <BookOpen className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Major</span>
                </div>
                <div className="text-white">{userData.major}</div>
              </div>
              
              <div className="bg-planet-dark/40 border border-planet-cyan/20 p-4 rounded-md">
                <div className="flex items-center text-planet-cyan mb-2">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Joined</span>
                </div>
                <div className="text-white">{new Date(userData.joinedDate).toLocaleDateString()}</div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 bg-planet-dark/40 border border-planet-cyan/20 p-4 rounded-md mb-4">
              <PlanetInput 
                label="Name"
                name="name"
                value={editData.name}
                onChange={handleChange}
                required
              />
              <PlanetInput 
                label="Email"
                name="email"
                type="email"
                value={editData.email}
                onChange={handleChange}
                required
              />
              <PlanetInput 
                label="Major"
                name="major"
                value={editData.major}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="bg-planet-dark/40 border border-planet-cyan/20 p-4 rounded-md text-center">
              <div className="text-2xl font-bold text-white">{userData.studyHours}</div>
              <div className="text-xs text-gray-400 mt-1">STUDY HOURS</div>
            </div>
            
            <div className="bg-planet-dark/40 border border-planet-cyan/20 p-4 rounded-md text-center">
              <div className="text-2xl font-bold text-white">{userData.completedTasks}</div>
              <div className="text-xs text-gray-400 mt-1">COMPLETED TASKS</div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-planet-cyan mb-3">Academic Goals</h3>
            <div className="bg-planet-dark/40 border border-planet-cyan/20 p-4 rounded-md">
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white">Weekly Study Hours</span>
                  <div className="flex items-center">
                    <span className="text-planet-cyan">{goals.weeklyStudyHours}/{goals.weeklyStudyHoursTarget} hrs</span>
                    <input 
                      type="number" 
                      className="ml-2 w-14 bg-planet-dark/50 border border-planet-cyan/30 rounded text-xs p-1 text-white"
                      value={goals.weeklyStudyHoursTarget}
                      onChange={(e) => updateGoal(e, 'weeklyStudyHoursTarget')}
                      min="1"
                    />
                  </div>
                </div>
                <div className="h-2 bg-planet-dark rounded-full">
                  <div 
                    className="h-2 bg-planet-cyan rounded-full" 
                    style={{ width: `${(goals.weeklyStudyHours / goals.weeklyStudyHoursTarget) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white">Assignment Completion</span>
                  <div className="flex items-center">
                    <span className="text-planet-cyan">{goals.assignmentCompletion}%</span>
                    <input 
                      type="number" 
                      className="ml-2 w-14 bg-planet-dark/50 border border-planet-cyan/30 rounded text-xs p-1 text-white"
                      value={goals.assignmentCompletion}
                      onChange={(e) => updateGoal(e, 'assignmentCompletion')}
                      min="0"
                      max="100"
                    />
                  </div>
                </div>
                <div className="h-2 bg-planet-dark rounded-full">
                  <div className="h-2 bg-planet-cyan rounded-full" style={{ width: `${goals.assignmentCompletion}%` }}></div>
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

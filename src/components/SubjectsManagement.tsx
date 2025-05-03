
import React, { useState } from 'react';
import { BookOpen, Plus } from 'lucide-react';
import PlanetCard from './PlanetCard';
import PlanetInput from './PlanetInput';
import PlanetButton from './PlanetButton';
import { usePlanet, PriorityType } from '@/contexts/PlanetContext';

const SubjectsManagement: React.FC = () => {
  const { subjects, addSubject, deleteSubject, updateSubject } = usePlanet();
  const [newSubject, setNewSubject] = useState({
    name: '',
    courses: '',
    completion: 50,
    priority: 'medium' as PriorityType
  });
  
  const handleAddSubject = () => {
    if (newSubject.name.trim()) {
      addSubject({
        name: newSubject.name.trim(),
        courses: newSubject.courses.split(',').map(course => course.trim()).filter(Boolean),
        completion: newSubject.completion,
        priority: newSubject.priority
      });
      setNewSubject({
        name: '',
        courses: '',
        completion: 50,
        priority: 'medium' as PriorityType
      });
    }
  };
  
  const updateCompletion = (id: string, value: number) => {
    updateSubject(id, { completion: value });
  };
  
  const priorityColors = {
    low: 'bg-green-500',
    medium: 'bg-yellow-500',
    high: 'bg-red-500'
  };

  return (
    <PlanetCard title={<div className="flex items-center gap-2"><BookOpen className="h-5 w-5" /> Subjects</div>}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <PlanetInput
          placeholder="Subject Name"
          value={newSubject.name}
          onChange={(e) => setNewSubject({...newSubject, name: e.target.value})}
        />
        
        <PlanetInput
          placeholder="Courses (comma-separated)"
          value={newSubject.courses}
          onChange={(e) => setNewSubject({...newSubject, courses: e.target.value})}
        />
        
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm text-planet-cyan mb-1">
            Completion: {newSubject.completion}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={newSubject.completion}
            onChange={(e) => setNewSubject({...newSubject, completion: parseInt(e.target.value)})}
            className="w-full h-2 bg-planet-dark/60 rounded-lg appearance-none cursor-pointer accent-planet-cyan"
          />
        </div>
        
        <select
          value={newSubject.priority}
          onChange={(e) => setNewSubject({...newSubject, priority: e.target.value as PriorityType})}
          className="bg-planet-dark/60 border border-planet-cyan/40 rounded-md py-2 px-4 text-white focus:outline-none focus:border-planet-cyan"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </div>
      
      <PlanetButton onClick={handleAddSubject} className="mb-6">
        <Plus className="h-4 w-4 mr-1" /> Add Subject
      </PlanetButton>
      
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {subjects.length > 0 ? (
          subjects.map(subject => (
            <div 
              key={subject.id} 
              className="p-4 bg-planet-dark/40 rounded-lg border border-planet-cyan/20"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="font-medium text-white flex items-center">
                  {subject.name}
                  <div className={`ml-2 h-3 w-3 rounded-full ${priorityColors[subject.priority]}`} title={`Priority: ${subject.priority}`} />
                </div>
                <button 
                  onClick={() => deleteSubject(subject.id)}
                  className="text-gray-400 hover:text-red-500 p-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              {subject.courses.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {subject.courses.map((course, index) => (
                    <span 
                      key={index}
                      className="bg-planet-dark/80 text-planet-purple px-2 py-1 rounded-md text-xs border border-planet-purple/30"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="pt-2">
                <label className="block text-sm text-planet-cyan mb-1">
                  Completion: {subject.completion}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={subject.completion}
                  onChange={(e) => updateCompletion(subject.id, parseInt(e.target.value))}
                  className="w-full h-2 bg-planet-dark/60 rounded-lg appearance-none cursor-pointer accent-planet-cyan"
                />
                <div className="relative w-full h-2 mt-1 rounded-full bg-planet-dark/60 overflow-hidden">
                  <div 
                    className="absolute left-0 top-0 h-full bg-planet-cyan"
                    style={{ width: `${subject.completion}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center py-4">No subjects added</p>
        )}
      </div>
    </PlanetCard>
  );
};

export default SubjectsManagement;

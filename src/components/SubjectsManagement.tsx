
import React, { useState } from 'react';
import { BookOpen, Plus, Check, X } from 'lucide-react';
import PlanetCard from './PlanetCard';
import PlanetInput from './PlanetInput';
import PlanetButton from './PlanetButton';
import { usePlanet, PriorityType } from '@/contexts/PlanetContext';

const SubjectsManagement: React.FC = () => {
  const { subjects, addSubject, deleteSubject, addSubjectTask, toggleSubjectTaskCompletion, deleteSubjectTask } = usePlanet();
  const [newSubject, setNewSubject] = useState({
    name: '',
    priority: 'medium' as PriorityType,
    tasks: [] as { name: string, completed: boolean }[]
  });
  const [newTasks, setNewTasks] = useState<Record<string, string>>({});
  
  const handleAddSubject = () => {
    if (newSubject.name.trim()) {
      addSubject({
        name: newSubject.name.trim(),
        tasks: [],
        completion: 0,
        priority: newSubject.priority
      });
      setNewSubject({
        name: '',
        priority: 'medium' as PriorityType,
        tasks: []
      });
    }
  };
  
  const handleAddTask = (subjectId: string) => {
    const taskName = newTasks[subjectId];
    if (taskName && taskName.trim()) {
      addSubjectTask(subjectId, {
        name: taskName.trim(),
        completed: false
      });
      
      // Clear the input for this subject
      setNewTasks(prev => ({
        ...prev,
        [subjectId]: ''
      }));
    }
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
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="pt-2 mb-4">
                <label className="block text-sm text-planet-cyan mb-1">
                  Completion: {subject.completion}%
                </label>
                <div className="relative w-full h-2 rounded-full bg-planet-dark/60 overflow-hidden">
                  <div 
                    className="absolute left-0 top-0 h-full bg-planet-cyan"
                    style={{ width: `${subject.completion}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Task list for this subject */}
              <div className="space-y-2 mb-3">
                {subject.tasks && subject.tasks.length > 0 ? (
                  subject.tasks.map(task => (
                    <div 
                      key={task.id} 
                      className="flex items-center justify-between bg-planet-dark/20 p-2 rounded-md border border-planet-cyan/10"
                    >
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleSubjectTaskCompletion(subject.id, task.id)}
                          className={`h-5 w-5 rounded border flex items-center justify-center ${task.completed ? 'bg-planet-cyan border-planet-cyan text-planet-dark' : 'border-planet-cyan/50 text-transparent'}`}
                        >
                          {task.completed && <Check className="h-3 w-3" />}
                        </button>
                        <span className={`${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                          {task.name}
                        </span>
                      </div>
                      <button
                        onClick={() => deleteSubjectTask(subject.id, task.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-center py-1">No tasks added</p>
                )}
              </div>
              
              {/* Add task input for this subject */}
              <div className="flex gap-2">
                <PlanetInput 
                  placeholder="Add new task"
                  value={newTasks[subject.id] || ''}
                  onChange={(e) => setNewTasks({...newTasks, [subject.id]: e.target.value})}
                  className="flex-1"
                />
                <PlanetButton onClick={() => handleAddTask(subject.id)} size="sm">
                  <Plus className="h-4 w-4" />
                </PlanetButton>
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

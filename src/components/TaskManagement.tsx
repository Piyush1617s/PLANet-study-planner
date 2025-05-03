
import React, { useState } from 'react';
import { Pencil, Plus, Calendar, Clock, X } from 'lucide-react';
import PlanetCard from './PlanetCard';
import PlanetInput from './PlanetInput';
import PlanetButton from './PlanetButton';
import { usePlanet, Task, PriorityType, UrgencyType } from '@/contexts/PlanetContext';

const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  const { toggleTaskCompletion, deleteTask } = usePlanet();
  
  const priorityColors = {
    low: 'bg-green-500',
    medium: 'bg-yellow-500',
    high: 'bg-red-500'
  };
  
  return (
    <div className="flex items-center justify-between p-3 border-b border-planet-cyan/20 last:border-0">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTaskCompletion(task.id)}
          className="rounded-full h-5 w-5 text-planet-cyan bg-planet-dark/30 border-planet-cyan/40 focus:ring-planet-cyan"
        />
        <div className="flex-1">
          <p className={`text-white ${task.completed ? 'line-through text-gray-500' : ''}`}>{task.name}</p>
          <div className="flex gap-4 mt-1 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {task.dueDate}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {task.time}
            </span>
            <span>{task.category}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className={`h-3 w-3 rounded-full ${priorityColors[task.priority]}`} title={`Priority: ${task.priority}`} />
        <button 
          onClick={() => deleteTask(task.id)}
          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

const TaskManagement: React.FC = () => {
  const { tasks, categories, addTask, addCategory } = usePlanet();
  const [newCategory, setNewCategory] = useState('');
  const [newTask, setNewTask] = useState({
    name: '',
    category: '',
    dueDate: '',
    time: '',
    priority: 'medium' as PriorityType,
    urgency: 'medium' as UrgencyType
  });
  const [filterValue, setFilterValue] = useState('all');
  
  const handleAddCategory = () => {
    if (newCategory.trim()) {
      addCategory({ name: newCategory.trim() });
      setNewCategory('');
    }
  };

  const handleAddTask = () => {
    if (newTask.name.trim() && newTask.category && newTask.dueDate) {
      addTask({
        ...newTask,
        name: newTask.name.trim(),
        completed: false
      });
      setNewTask({
        name: '',
        category: '',
        dueDate: '',
        time: '',
        priority: 'medium' as PriorityType,
        urgency: 'medium' as UrgencyType
      });
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filterValue === 'all') return true;
    if (filterValue === 'completed') return task.completed;
    if (filterValue === 'active') return !task.completed;
    return task.category === filterValue;
  });

  return (
    <PlanetCard title={<div className="flex items-center gap-2"><Pencil className="h-5 w-5" /> Task Management</div>}>
      <div className="mb-6">
        <h3 className="text-lg text-planet-cyan mb-3">Categories</h3>
        <div className="flex gap-3 mb-4">
          <PlanetInput
            placeholder="New Category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="max-w-xs"
          />
          <PlanetButton onClick={handleAddCategory}>
            <Plus className="h-4 w-4 mr-1" /> Add Category
          </PlanetButton>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map(category => (
            <span 
              key={category.id}
              className="bg-planet-dark/80 text-planet-cyan px-3 py-1 rounded-full border border-planet-cyan/30 text-sm"
            >
              {category.name}
            </span>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg text-planet-cyan mb-3">Tasks</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <PlanetInput
            placeholder="Task Name"
            value={newTask.name}
            onChange={(e) => setNewTask({...newTask, name: e.target.value})}
          />
          
          <select
            value={newTask.category}
            onChange={(e) => setNewTask({...newTask, category: e.target.value})}
            className="bg-planet-dark/60 border border-planet-cyan/40 rounded-md py-2 px-4 text-white focus:outline-none focus:border-planet-cyan"
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.name}>{category.name}</option>
            ))}
          </select>
          
          <div className="flex gap-4">
            <div className="flex-1">
              <PlanetInput
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
              />
            </div>
            <div className="flex-1">
              <PlanetInput
                type="time"
                value={newTask.time}
                onChange={(e) => setNewTask({...newTask, time: e.target.value})}
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="flex-1">
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({...newTask, priority: e.target.value as PriorityType})}
                className="bg-planet-dark/60 border border-planet-cyan/40 rounded-md py-2 px-4 text-white w-full focus:outline-none focus:border-planet-cyan"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
            <div className="flex-1">
              <select
                value={newTask.urgency}
                onChange={(e) => setNewTask({...newTask, urgency: e.target.value as UrgencyType})}
                className="bg-planet-dark/60 border border-planet-cyan/40 rounded-md py-2 px-4 text-white w-full focus:outline-none focus:border-planet-cyan"
              >
                <option value="low">Low Urgency</option>
                <option value="medium">Medium Urgency</option>
                <option value="high">High Urgency</option>
              </select>
            </div>
          </div>
        </div>
        
        <PlanetButton onClick={handleAddTask} className="w-full mb-6">
          <Plus className="h-4 w-4 mr-1" /> Add Task
        </PlanetButton>
        
        <div className="mb-4">
          <label className="text-sm text-planet-cyan mb-1 block">Filter Tasks:</label>
          <select
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="bg-planet-dark/60 border border-planet-cyan/40 rounded-md py-2 px-4 text-white focus:outline-none focus:border-planet-cyan"
          >
            <option value="all">All Tasks</option>
            <option value="completed">Completed</option>
            <option value="active">Active</option>
            {categories.map(category => (
              <option key={category.id} value={category.name}>{category.name}</option>
            ))}
          </select>
        </div>
        
        <div className="max-h-80 overflow-y-auto">
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))
          ) : (
            <p className="text-gray-400 text-center py-4">No tasks found</p>
          )}
        </div>
      </div>
    </PlanetCard>
  );
};

export default TaskManagement;

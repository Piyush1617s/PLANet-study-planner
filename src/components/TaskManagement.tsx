import React, { useState } from 'react';
import { ListChecks, Plus, Calendar, Clock, X, Tag } from 'lucide-react';
import PlanetInput from './PlanetInput';
import PlanetButton from './PlanetButton';
import { usePlanet, Task, PriorityType, UrgencyType } from '@/contexts/PlanetContext';
import { useToast } from '@/hooks/use-toast';

const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  const { toggleTaskCompletion, deleteTask } = usePlanet();
  const { toast } = useToast();
  
  const priorityColors = {
    low: 'bg-green-500',
    medium: 'bg-yellow-500',
    high: 'bg-red-500'
  };
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  const handleComplete = () => {
    toggleTaskCompletion(task.id);
    if (!task.completed) {
      toast({
        title: "Task completed!",
        description: `You've completed "${task.name}"`,
      });
    }
  };
  
  return (
    <div className="flex items-center justify-between p-3 bg-planet-dark/30 rounded-md mb-2 border-l-4"
      style={{ borderLeftColor: task.priority === 'high' ? '#ff4b4b' : task.priority === 'medium' ? '#FFB800' : '#5DE0E6' }}>
      <div className="flex items-center gap-3 w-full">
        <button
          onClick={handleComplete}
          className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-colors ${
            task.completed 
            ? 'bg-planet-cyan border-planet-cyan text-planet-dark' 
            : 'border-planet-cyan/50 hover:border-planet-cyan hover:bg-planet-cyan/10'
          }`}
        >
          {task.completed && <span>✓</span>}
        </button>
        
        <div className="flex-1">
          <p className={`text-white ${task.completed ? 'line-through text-gray-500' : ''}`}>{task.name}</p>
          <div className="flex gap-4 mt-1 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(task.dueDate)}
            </span>
            {task.time && (
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {task.time}
              </span>
            )}
            {task.category && (
              <span className="flex items-center gap-1">
                <Tag className="h-3 w-3" />
                {task.category}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {!task.completed && (
          <div className="w-24">
            <div className="relative h-1.5 bg-gray-700 rounded overflow-hidden">
              <div 
                className={`absolute top-0 left-0 h-full ${
                  task.priority === 'high' ? 'bg-red-500' : 
                  task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{width: task.completed ? '100%' : '50%'}}
              ></div>
            </div>
            <div className="text-right text-xs text-gray-400 mt-0.5">
              50% complete
            </div>
          </div>
        )}
        
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
    if (newTask.name.trim()) {
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
    if (filterValue === 'high') return task.priority === 'high' && !task.completed;
    if (filterValue === 'medium') return task.priority === 'medium' && !task.completed;
    if (filterValue === 'low') return task.priority === 'low' && !task.completed;
    return task.category === filterValue;
  });

  // Group tasks by priority for display
  const highPriorityTasks = filteredTasks.filter(task => task.priority === 'high' && !task.completed);
  const mediumPriorityTasks = filteredTasks.filter(task => task.priority === 'medium' && !task.completed);
  const lowPriorityTasks = filteredTasks.filter(task => task.priority === 'low' && !task.completed);
  const completedTasks = filteredTasks.filter(task => task.completed);

  return (
    <div>
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-bold text-planet-cyan mb-2 flex items-center justify-center gap-2">
          <ListChecks className="h-8 w-8" /> Task Management
        </h1>
        <p className="text-gray-400">Organize your study tasks effectively</p>
      </div>
      
      {/* Task filter tabs */}
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        <button 
          onClick={() => setFilterValue('all')}
          className={`px-4 py-2 rounded-full text-sm ${
            filterValue === 'all' 
              ? 'bg-planet-cyan text-planet-dark' 
              : 'bg-planet-dark/40 text-planet-cyan hover:bg-planet-dark/60'
          }`}
        >
          All Tasks
        </button>
        <button 
          onClick={() => setFilterValue('active')}
          className={`px-4 py-2 rounded-full text-sm ${
            filterValue === 'active' 
              ? 'bg-planet-cyan text-planet-dark' 
              : 'bg-planet-dark/40 text-planet-cyan hover:bg-planet-dark/60'
          }`}
        >
          Active
        </button>
        <button 
          onClick={() => setFilterValue('completed')}
          className={`px-4 py-2 rounded-full text-sm ${
            filterValue === 'completed' 
              ? 'bg-planet-cyan text-planet-dark' 
              : 'bg-planet-dark/40 text-planet-cyan hover:bg-planet-dark/60'
          }`}
        >
          Completed
        </button>
      </div>
      
      {/* Categories Section */}
      <div className="bg-planet-dark/40 border border-planet-cyan/30 rounded-lg p-6 mb-6">
        <h2 className="text-xl text-planet-cyan mb-4">Categories</h2>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map(category => (
            <span 
              key={category.id}
              className="bg-planet-dark/80 text-planet-cyan px-3 py-1 rounded-full border border-planet-cyan/30 text-sm"
            >
              {category.name}
              <span className="ml-1 bg-planet-dark/40 px-1 rounded-full text-xs">1</span>
            </span>
          ))}
        </div>
        
        <div className="flex gap-3">
          <PlanetInput
            placeholder="New Category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="max-w-xs"
          />
          <button 
            onClick={handleAddCategory}
            className="bg-planet-cyan/10 hover:bg-planet-cyan/20 text-planet-cyan px-4 py-2 rounded-md border border-planet-cyan/30 transition-colors"
          >
            Add Category
          </button>
        </div>
      </div>
      
      {/* New Task Form */}
      <div className="bg-planet-dark/40 border border-planet-cyan/30 rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="md:col-span-2">
            <PlanetInput
              placeholder="Task Name"
              value={newTask.name}
              onChange={(e) => setNewTask({...newTask, name: e.target.value})}
            />
          </div>
          
          <div>
            <select
              value={newTask.category}
              onChange={(e) => setNewTask({...newTask, category: e.target.value})}
              className="bg-planet-dark/60 border border-planet-cyan/40 rounded-md py-2 px-4 text-white w-full focus:outline-none focus:border-planet-cyan"
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category.id} value={category.name}>{category.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <PlanetInput
              type="date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
            />
          </div>
          
          <div>
            <PlanetInput
              type="time"
              value={newTask.time}
              onChange={(e) => setNewTask({...newTask, time: e.target.value})}
            />
          </div>
          
          <div>
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({...newTask, priority: e.target.value as PriorityType})}
              className="bg-planet-dark/60 border border-planet-cyan/40 rounded-md py-2 px-4 text-white w-full focus:outline-none focus:border-planet-cyan"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        
        <div className="mt-4 text-right">
          <button
            onClick={handleAddTask}
            className="bg-planet-cyan text-planet-dark px-6 py-2 rounded-md hover:bg-planet-cyan/80 transition-colors inline-flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Add Task
          </button>
        </div>
      </div>
      
      {/* Task Lists by Priority */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-planet-dark/40 border border-planet-cyan/30 rounded-lg p-4">
          <h3 className="text-xl border-b border-planet-cyan/20 pb-3 mb-3">High Priority</h3>
          
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {highPriorityTasks.length > 0 ? (
              highPriorityTasks.map(task => <TaskItem key={task.id} task={task} />)
            ) : (
              <p className="text-gray-400 text-center py-4">No high priority tasks</p>
            )}
          </div>
        </div>
        
        <div className="bg-planet-dark/40 border border-planet-cyan/30 rounded-lg p-4">
          <h3 className="text-xl border-b border-planet-cyan/20 pb-3 mb-3">Medium Priority</h3>
          
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {mediumPriorityTasks.length > 0 ? (
              mediumPriorityTasks.map(task => <TaskItem key={task.id} task={task} />)
            ) : (
              <p className="text-gray-400 text-center py-4">No medium priority tasks</p>
            )}
          </div>
        </div>
        
        <div className="bg-planet-dark/40 border border-planet-cyan/30 rounded-lg p-4">
          <h3 className="text-xl border-b border-planet-cyan/20 pb-3 mb-3">Low Priority</h3>
          
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {lowPriorityTasks.length > 0 ? (
              lowPriorityTasks.map(task => <TaskItem key={task.id} task={task} />)
            ) : (
              <p className="text-gray-400 text-center py-4">No low priority tasks</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Completed Tasks */}
      <div className="bg-planet-dark/40 border border-planet-cyan/30 rounded-lg p-4">
        <h3 className="text-xl border-b border-planet-cyan/20 pb-3 mb-3">Completed Tasks</h3>
        
        <div className="space-y-2 max-h-[300px] overflow-y-auto">
          {completedTasks.length > 0 ? (
            completedTasks.map(task => <TaskItem key={task.id} task={task} />)
          ) : (
            <p className="text-gray-400 text-center py-4">No completed tasks</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskManagement;

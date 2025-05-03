import React, { createContext, useContext, useState, useEffect } from 'react';

// Types
export type TabType = 'tasks' | 'pomodoro' | 'calendar' | 'events' | 'subjects' | 'analytics' | 'profile';
export type PriorityType = 'low' | 'medium' | 'high';
export type UrgencyType = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  name: string;
  completed: boolean;
  dueDate: string;
  time: string;
  category: string;
  priority: PriorityType;
  urgency: UrgencyType;
}

export interface SubjectTask {
  id: string;
  name: string;
  completed: boolean;
}

export interface Category {
  id: string;
  name: string;
}

export interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
}

export interface Subject {
  id: string;
  name: string;
  tasks: SubjectTask[];
  completion: number;
  priority: PriorityType;
}

export interface StudySession {
  id: string;
  subject: string;
  date: string;
  duration: number; // minutes
}

interface PlanetContextType {
  // Navigation
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;

  // Tasks
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;

  // Categories
  categories: Category[];
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;

  // Events
  events: Event[];
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;

  // Subjects
  subjects: Subject[];
  addSubject: (subject: Omit<Subject, 'id'>) => void;
  updateSubject: (id: string, subject: Partial<Subject>) => void;
  deleteSubject: (id: string) => void;
  addSubjectTask: (subjectId: string, task: Omit<SubjectTask, 'id'>) => void;
  toggleSubjectTaskCompletion: (subjectId: string, taskId: string) => void;
  deleteSubjectTask: (subjectId: string, taskId: string) => void;
  updateSubjectCompletion: (subjectId: string) => void;

  // Study Sessions
  studySessions: StudySession[];
  addStudySession: (session: Omit<StudySession, 'id'>) => void;

  // Settings
  settings: {
    defaultPomodoroDuration: number;
    firstDayOfWeek: string;
  };
  updateSettings: (newSettings: Partial<{ defaultPomodoroDuration: number; firstDayOfWeek: string }>) => void;
}

const PlanetContext = createContext<PlanetContextType | undefined>(undefined);

// Sample initial data
const initialCategories = [
  { id: '1', name: 'Homework' },
  { id: '2', name: 'Exam Prep' },
  { id: '3', name: 'Project' }
];

const initialTasks = [
  {
    id: '1',
    name: 'Complete Math Assignment',
    completed: false,
    dueDate: '2025-05-10',
    time: '23:59',
    category: 'Homework',
    priority: 'high' as PriorityType,
    urgency: 'medium' as UrgencyType
  },
  {
    id: '2',
    name: 'Study for Physics Midterm',
    completed: false,
    dueDate: '2025-05-15',
    time: '10:00',
    category: 'Exam Prep',
    priority: 'high' as PriorityType,
    urgency: 'high' as UrgencyType
  },
  {
    id: '3',
    name: 'Research for Chemistry Project',
    completed: false,
    dueDate: '2025-05-20',
    time: '23:59',
    category: 'Project',
    priority: 'medium' as PriorityType,
    urgency: 'low' as UrgencyType
  }
];

const initialEvents = [
  { id: '1', name: 'Math Study Group', date: '2025-05-12', time: '15:00' },
  { id: '2', name: 'Office Hours', date: '2025-05-14', time: '13:30' }
];

const initialSubjects = [
  { 
    id: '1', 
    name: 'Mathematics', 
    tasks: [
      { id: 'task_1_1', name: 'Learn Calculus', completed: true },
      { id: 'task_1_2', name: 'Practice Linear Algebra', completed: false }
    ], 
    completion: 50, 
    priority: 'high' as PriorityType 
  },
  { 
    id: '2', 
    name: 'Physics', 
    tasks: [
      { id: 'task_2_1', name: 'Study Mechanics', completed: false },
      { id: 'task_2_2', name: 'Review Electromagnetism', completed: false }
    ], 
    completion: 0, 
    priority: 'medium' as PriorityType 
  },
  { 
    id: '3', 
    name: 'Chemistry', 
    tasks: [
      { id: 'task_3_1', name: 'Learn Organic Chemistry', completed: true }
    ], 
    completion: 100, 
    priority: 'low' as PriorityType 
  }
];

const initialStudySessions = [
  { id: '1', subject: 'Mathematics', date: '2025-05-01', duration: 120 },
  { id: '2', subject: 'Physics', date: '2025-05-02', duration: 90 },
  { id: '3', subject: 'Chemistry', date: '2025-05-03', duration: 60 },
  { id: '4', subject: 'Mathematics', date: '2025-05-04', duration: 150 },
  { id: '5', subject: 'Physics', date: '2025-05-05', duration: 120 }
];

export const PlanetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<TabType>('tasks');
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);
  const [studySessions, setStudySessions] = useState<StudySession[]>(initialStudySessions);
  const [settings, setSettings] = useState({
    defaultPomodoroDuration: 25,
    firstDayOfWeek: 'Sunday'
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem('planet_tasks');
    if (storedTasks) setTasks(JSON.parse(storedTasks));

    const storedCategories = localStorage.getItem('planet_categories');
    if (storedCategories) setCategories(JSON.parse(storedCategories));

    const storedEvents = localStorage.getItem('planet_events');
    if (storedEvents) setEvents(JSON.parse(storedEvents));

    const storedSubjects = localStorage.getItem('planet_subjects');
    if (storedSubjects) setSubjects(JSON.parse(storedSubjects));

    const storedStudySessions = localStorage.getItem('planet_studySessions');
    if (storedStudySessions) setStudySessions(JSON.parse(storedStudySessions));

    const storedSettings = localStorage.getItem('planet_settings');
    if (storedSettings) setSettings(JSON.parse(storedSettings));
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('planet_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('planet_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('planet_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('planet_subjects', JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem('planet_studySessions', JSON.stringify(studySessions));
  }, [studySessions]);

  useEffect(() => {
    localStorage.setItem('planet_settings', JSON.stringify(settings));
  }, [settings]);

  // Task functions
  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask = { ...task, id: `task_${Date.now()}` };
    setTasks(prev => [...prev, newTask as Task]);
  };

  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updatedTask } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Category functions
  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory = { ...category, id: `category_${Date.now()}` };
    setCategories(prev => [...prev, newCategory as Category]);
  };

  const updateCategory = (id: string, updatedCategory: Partial<Category>) => {
    setCategories(prev => prev.map(category => 
      category.id === id ? { ...category, ...updatedCategory } : category
    ));
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(category => category.id !== id));
  };

  // Event functions
  const addEvent = (event: Omit<Event, 'id'>) => {
    const newEvent = { ...event, id: `event_${Date.now()}` };
    setEvents(prev => [...prev, newEvent as Event]);
  };

  const updateEvent = (id: string, updatedEvent: Partial<Event>) => {
    setEvents(prev => prev.map(event => 
      event.id === id ? { ...event, ...updatedEvent } : event
    ));
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
  };

  // Subject functions
  const addSubject = (subject: Omit<Subject, 'id'>) => {
    const newSubject = { ...subject, id: `subject_${Date.now()}` };
    setSubjects(prev => [...prev, newSubject as Subject]);
  };

  const updateSubject = (id: string, updatedSubject: Partial<Subject>) => {
    setSubjects(prev => prev.map(subject => 
      subject.id === id ? { ...subject, ...updatedSubject } : subject
    ));
  };

  const deleteSubject = (id: string) => {
    setSubjects(prev => prev.filter(subject => subject.id !== id));
  };
  
  // New subject task functions
  const addSubjectTask = (subjectId: string, task: Omit<SubjectTask, 'id'>) => {
    const newTask = { ...task, id: `subtask_${Date.now()}` };
    setSubjects(prev => prev.map(subject => 
      subject.id === subjectId 
        ? { ...subject, tasks: [...subject.tasks, newTask as SubjectTask] } 
        : subject
    ));
    
    // Update completion percentage after adding a task
    updateSubjectCompletion(subjectId);
  };
  
  const toggleSubjectTaskCompletion = (subjectId: string, taskId: string) => {
    setSubjects(prev => prev.map(subject => 
      subject.id === subjectId 
        ? { 
            ...subject, 
            tasks: subject.tasks.map(task => 
              task.id === taskId 
                ? { ...task, completed: !task.completed } 
                : task
            )
          } 
        : subject
    ));
    
    // Update completion percentage after toggling completion
    updateSubjectCompletion(subjectId);
  };
  
  const deleteSubjectTask = (subjectId: string, taskId: string) => {
    setSubjects(prev => prev.map(subject => 
      subject.id === subjectId 
        ? { ...subject, tasks: subject.tasks.filter(task => task.id !== taskId) } 
        : subject
    ));
    
    // Update completion percentage after deleting a task
    updateSubjectCompletion(subjectId);
  };
  
  const updateSubjectCompletion = (subjectId: string) => {
    setSubjects(prev => prev.map(subject => {
      if (subject.id === subjectId) {
        const totalTasks = subject.tasks.length;
        if (totalTasks === 0) return { ...subject, completion: 0 };
        
        const completedTasks = subject.tasks.filter(task => task.completed).length;
        const newCompletion = Math.round((completedTasks / totalTasks) * 100);
        
        return { ...subject, completion: newCompletion };
      }
      return subject;
    }));
  };

  // Study session functions
  const addStudySession = (session: Omit<StudySession, 'id'>) => {
    const newSession = { ...session, id: `session_${Date.now()}` };
    setStudySessions(prev => [...prev, newSession as StudySession]);
  };

  // Settings functions
  const updateSettings = (newSettings: Partial<{ defaultPomodoroDuration: number; firstDayOfWeek: string }>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <PlanetContext.Provider
      value={{
        activeTab,
        setActiveTab,
        tasks,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskCompletion,
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        subjects,
        addSubject,
        updateSubject,
        deleteSubject,
        addSubjectTask,
        toggleSubjectTaskCompletion,
        deleteSubjectTask,
        updateSubjectCompletion,
        studySessions,
        addStudySession,
        settings,
        updateSettings
      }}
    >
      {children}
    </PlanetContext.Provider>
  );
};

export const usePlanet = () => {
  const context = useContext(PlanetContext);
  if (context === undefined) {
    throw new Error('usePlanet must be used within a PlanetProvider');
  }
  return context;
};

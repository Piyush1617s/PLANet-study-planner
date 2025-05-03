
import React from 'react';
import { PieChart, Pie, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';
import { BarChart3, ChartPie } from 'lucide-react';
import PlanetCard from './PlanetCard';
import { usePlanet } from '@/contexts/PlanetContext';

const COLORS = ['#5DE0E6', '#9B87F5', '#FE6479', '#FFB800', '#42D392', '#9747FF'];

const AnalyticsDashboard: React.FC = () => {
  const { subjects, tasks, studySessions } = usePlanet();
  
  // Calculate study hours per subject
  const studyHoursData = subjects.map(subject => {
    const sessions = studySessions.filter(session => session.subject === subject.name);
    const totalMinutes = sessions.reduce((total, session) => total + session.duration, 0);
    return {
      name: subject.name,
      hours: Math.round(totalMinutes / 60 * 10) / 10 // Round to 1 decimal place
    };
  });
  
  // Calculate task completion rate
  const taskStats = {
    completed: tasks.filter(task => task.completed).length,
    pending: tasks.filter(task => !task.completed).length
  };
  
  const taskCompletionData = [
    { name: 'Completed', value: taskStats.completed },
    { name: 'Pending', value: taskStats.pending }
  ];
  
  // Weekly study pattern (last 7 days)
  const now = new Date();
  const weekData = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString().split('T')[0];
    
    const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
    const sessionsForDay = studySessions.filter(session => session.date === dateString);
    const minutesForDay = sessionsForDay.reduce((total, session) => total + session.duration, 0);
    
    weekData.push({
      day: dayName,
      minutes: minutesForDay
    });
  }
  
  // Subject performance based on task completion
  const subjectPerformanceData = subjects.map(subject => {
    const subjectTasks = tasks.filter(task => task.category === subject.name);
    const completedTasks = subjectTasks.filter(task => task.completed);
    const completionRate = subjectTasks.length > 0
      ? Math.round((completedTasks.length / subjectTasks.length) * 100)
      : 0;
    
    return {
      name: subject.name,
      completion: subject.completion,
      taskCompletion: completionRate
    };
  });

  return (
    <PlanetCard title={<div className="flex items-center gap-2"><BarChart3 className="h-5 w-5" /> Analytics Dashboard</div>}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-planet-dark/40 p-4 rounded-lg border border-planet-cyan/20">
          <h3 className="text-lg text-planet-cyan mb-3 flex items-center gap-2">
            <ChartPie className="h-5 w-5" /> Study Time Distribution
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={studyHoursData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}h`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="hours"
                >
                  {studyHoursData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-planet-dark/40 p-4 rounded-lg border border-planet-cyan/20">
          <h3 className="text-lg text-planet-cyan mb-3">Task Completion Status</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={taskCompletionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell fill="#5DE0E6" />
                  <Cell fill="#FE6479" />
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-planet-dark/40 p-4 rounded-lg border border-planet-cyan/20 col-span-1 md:col-span-2">
          <h3 className="text-lg text-planet-cyan mb-3">Weekly Study Pattern</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={weekData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="day" stroke="#AAA" />
                <YAxis stroke="#AAA" label={{ value: 'Minutes', angle: -90, position: 'insideLeft', stroke: "#AAA" }} />
                <Tooltip />
                <Bar dataKey="minutes" name="Study Minutes" fill="#5DE0E6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-planet-dark/40 p-4 rounded-lg border border-planet-cyan/20 col-span-1 md:col-span-2">
          <h3 className="text-lg text-planet-cyan mb-3">Subject Performance</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={subjectPerformanceData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" stroke="#AAA" />
                <YAxis stroke="#AAA" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="completion" name="Self-Reported Progress" stroke="#9B87F5" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="taskCompletion" name="Task Completion Rate" stroke="#5DE0E6" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </PlanetCard>
  );
};

export default AnalyticsDashboard;

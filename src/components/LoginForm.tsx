import React, { useState } from 'react';
import { User, Lock, AtSign } from 'lucide-react';
import PlanetCard from './PlanetCard';
import PlanetInput from './PlanetInput';
import PlanetButton from './PlanetButton';
import { useToast } from '@/hooks/use-toast';
interface LoginFormProps {
  onLogin: () => void;
}
const LoginForm: React.FC<LoginFormProps> = ({
  onLogin
}) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [error, setError] = useState('');
  const {
    toast
  } = useToast();

  // Mock user database - in a real app, this would come from a backend service
  const mockUsers = [{
    email: 'student@university.edu',
    password: 'password123',
    name: 'Student Name'
  }, {
    email: 'test@example.com',
    password: 'test123',
    name: 'Test User'
  }];
  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError('');
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setError('');
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      // Handle sign up
      if (formData.name.trim() === '' || formData.email.trim() === '' || formData.password.trim() === '') {
        setError('All fields are required');
        return;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }

      // Check if user already exists
      if (mockUsers.some(user => user.email === formData.email)) {
        setError('Email already exists');
        return;
      }

      // In a real app, we would register the user here
      toast({
        title: "Account created!",
        description: "Your account has been successfully created."
      });
      onLogin();
    } else {
      // Handle sign in
      if (formData.email.trim() === '' || formData.password.trim() === '') {
        setError('Email and password are required');
        return;
      }

      // Check if credentials match any user
      const user = mockUsers.find(user => user.email === formData.email && user.password === formData.password);
      if (user) {
        toast({
          title: "Welcome back!",
          description: `You've successfully signed in as ${user.name}.`
        });
        onLogin();
      } else {
        setError('Invalid email or password');
      }
    }
  };
  return <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-300 opacity-90 flex items-center justify-center relative">
              <div className="h-8 w-8 rounded-full bg-planet-dark opacity-70 absolute z-10"></div>
              <div className="h-4 w-4 rounded-full bg-planet-cyan absolute z-20 translate-x-1 -translate-y-1"></div>
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-planet-cyan via-blue-400 to-planet-purple bg-clip-text text-transparent animate-glow">PLANet</h1>
          <p className="text-gray-300 mt-2">
        </p>
        </div>
        
        <PlanetCard className="shadow-lg shadow-planet-cyan/10">
          <h2 className="text-2xl text-planet-cyan mb-6">
            {isSignUp ? 'Join Study Orbit' : 'Welcome Back'}
          </h2>
          
          {error && <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 text-red-300 rounded-md text-sm">
              {error}
            </div>}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && <div>
                <PlanetInput label="Name" name="name" placeholder="Your name" icon={<User className="h-4 w-4" />} value={formData.name} onChange={handleChange} required />
              </div>}
            
            <div>
              <PlanetInput label="Email" name="email" type="email" placeholder="Your email" icon={<AtSign className="h-4 w-4" />} value={formData.email} onChange={handleChange} required />
            </div>
            
            <div>
              <PlanetInput label="Password" name="password" type="password" placeholder="Your password" icon={<Lock className="h-4 w-4" />} value={formData.password} onChange={handleChange} required />
            </div>
            
            <PlanetButton type="submit" className="w-full mt-6">
              {isSignUp ? 'Create Account' : 'Sign In'}
            </PlanetButton>
            
            <div className="text-center text-gray-400 text-sm pt-4">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
              <button type="button" className="ml-1 text-planet-cyan hover:underline" onClick={toggleMode}>
                {isSignUp ? 'Sign In' : 'Create Account'}
              </button>
            </div>
          </form>
        </PlanetCard>
      </div>
    </div>;
};
export default LoginForm;
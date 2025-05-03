
import React, { useState } from 'react';
import { User, Lock, AtSign, Facebook, Mail } from 'lucide-react';
import PlanetCard from './PlanetCard';
import PlanetInput from './PlanetInput';
import PlanetButton from './PlanetButton';

interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  
  const toggleMode = () => {
    setIsSignUp(!isSignUp);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would handle authentication here
    // For now, we'll just call onLogin to simulate successful login
    onLogin();
  };
  
  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // In a real app, we would handle social auth here
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-300 opacity-90 flex items-center justify-center relative">
              <div className="h-8 w-8 rounded-full bg-planet-dark opacity-70 absolute z-10"></div>
              <div className="h-4 w-4 rounded-full bg-planet-cyan absolute z-20 translate-x-1 -translate-y-1"></div>
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-planet-cyan via-blue-400 to-planet-purple bg-clip-text text-transparent animate-glow">
            PLANet
          </h1>
          <p className="text-gray-300 mt-2">Your Ultimate Study Planner</p>
        </div>
        
        <PlanetCard className="shadow-lg shadow-planet-cyan/10">
          <h2 className="text-2xl text-planet-cyan mb-6">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          
          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <div className="mb-4">
                <PlanetInput
                  label="Full Name"
                  name="name"
                  placeholder="Enter your name"
                  icon={<User className="h-4 w-4" />}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            
            <div className="mb-4">
              <PlanetInput
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email"
                icon={<AtSign className="h-4 w-4" />}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="mb-6">
              <PlanetInput
                label="Password"
                name="password"
                type="password"
                placeholder={isSignUp ? "Create a password" : "Enter your password"}
                icon={<Lock className="h-4 w-4" />}
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            
            <PlanetButton type="submit" className="w-full mb-4">
              {isSignUp ? 'Sign Up' : 'Log In'}
            </PlanetButton>
            
            {!isSignUp && (
              <div className="text-right mb-6">
                <a href="#" className="text-planet-cyan text-sm hover:underline">
                  Forgot Password?
                </a>
              </div>
            )}
            
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-planet-cyan/20"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 bg-planet-dark text-gray-400">Or continue with</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <PlanetButton
                type="button"
                variant="outline"
                className="flex items-center justify-center gap-2"
                onClick={() => handleSocialLogin('Google')}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </PlanetButton>
              
              <PlanetButton
                type="button"
                variant="outline"
                className="flex items-center justify-center gap-2"
                onClick={() => handleSocialLogin('Facebook')}
              >
                <Facebook className="h-5 w-5 text-blue-500" />
                Facebook
              </PlanetButton>
            </div>
            
            <div className="text-center text-gray-400 text-sm">
              {isSignUp
                ? "Already have an account?"
                : "Don't have an account?"
              }
              <button
                type="button"
                className="ml-1 text-planet-cyan hover:underline"
                onClick={toggleMode}
              >
                {isSignUp ? 'Log In' : 'Sign Up'}
              </button>
            </div>
          </form>
        </PlanetCard>
      </div>
    </div>
  );
};

export default LoginForm;

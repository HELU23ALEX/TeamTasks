import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../../../shared/components/Button';

export const LoginForm = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    
    try {
      await login(email, password);
    } catch (err) {
      // Extract specific message from the error object
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMsg && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-bold rounded-xl animate-in fade-in slide-in-from-top-1">
          ⚠️ {errorMsg}
        </div>
      )}
      
      <div className="space-y-1">
        <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Email</label>
        <input 
          type="email" placeholder="admin@company.com" 
          className="w-full p-3 border rounded-xl dark:bg-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" 
          value={email} onChange={e => setEmail(e.target.value)} required 
        />
      </div>

      <div className="space-y-1">
        <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Password</label>
        <input 
          type="password" placeholder="••••••••" 
          className="w-full p-3 border rounded-xl dark:bg-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" 
          value={password} onChange={e => setPassword(e.target.value)} required 
        />
      </div>

      <Button className="w-full py-3 mt-2" isLoading={isLoading}>Sign In</Button>
    </form>
  );
};
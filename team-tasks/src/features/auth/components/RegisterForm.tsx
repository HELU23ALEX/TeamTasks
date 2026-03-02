
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../../../shared/components/Button';

export const RegisterForm = () => {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      await register(name, email, password);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Registration failed.";
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMsg && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-bold rounded-xl animate-in fade-in">
          ⚠️ {errorMsg}
        </div>
      )}

      <div className="space-y-1">
        <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Full Name</label>
        <input 
          placeholder="John Doe" className="w-full p-3 border rounded-xl dark:bg-gray-900 dark:text-white" 
          value={name} onChange={e => setName(e.target.value)} required 
        />
      </div>

      <div className="space-y-1">
        <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Email</label>
        <input 
          type="email" placeholder="user@company.com" className="w-full p-3 border rounded-xl dark:bg-gray-900 dark:text-white" 
          value={email} onChange={e => setEmail(e.target.value)} required 
        />
      </div>

      <div className="space-y-1">
        <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Password</label>
        <input 
          type="password" placeholder="Create a password" className="w-full p-3 border rounded-xl dark:bg-gray-900 dark:text-white" 
          value={password} onChange={e => setPassword(e.target.value)} required 
        />
      </div>

      <Button className="w-full py-3 mt-2" isLoading={isLoading}>Create Account</Button>
    </form>
  );
};
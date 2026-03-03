import { useState } from 'react';
import { LoginForm } from '../components/LoginForm';
import { RegisterForm } from '../components/RegisterForm';

export const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    /* FIX: Added bg-white dark:bg-gray-900 and text-gray-900 dark:text-gray-100 */
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex items-center justify-center p-4 transition-colors duration-300">
      {/* FIX: Added dark:bg-gray-800 and dark:border-gray-700 */}
      <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-3xl shadow-xl w-full max-w-md border border-gray-100 dark:border-gray-700">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-blue-600">TEAM TASKS</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            {isLogin ? "Welcome back" : "Create your account"}
          </p>
        </div>

        {isLogin ? <LoginForm /> : <RegisterForm />}

        <div className="mt-6 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-blue-600 dark:text-blue-400 font-bold hover:underline"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; 
import App from './app/App';
import { AuthProvider } from './app/providers/AuthProvider';
import { QueryProvider } from './app/providers/QueryProvider';
import { ThemeProvider } from './app/providers/ThemeProvider';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* 1. Infrastructure (Routing & API Cache) */}
    <BrowserRouter>
      <QueryProvider>
        {/* 2. Global Business State (Auth) */}
        <AuthProvider>
          {/* 3. Global UI State (Theme) */}
          <ThemeProvider>
            <App />        
          </ThemeProvider>
        </AuthProvider>
      </QueryProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
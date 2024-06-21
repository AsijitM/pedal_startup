import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Toaster } from './components/ui/sonner.jsx';
import axios from 'axios';
// import { ThemeProvider } from './components/theme-provider.tsx';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Toaster />
  </React.StrictMode>
);

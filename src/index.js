import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import Dashboard from './pages/Dashboard';
import Artists from './pages/Artists/Artists';
import Albums from './pages/Albums';
import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ThemeProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/albums" element={<Albums />} />
      </Routes>
    </Router>
  </ThemeProvider>
);

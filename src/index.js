import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Backoffice from './pages/BackOffice';
import './styles/index.css';
import { ThemeProvider } from './context/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ThemeProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/backoffice" element={<Backoffice />} />
      </Routes>
    </Router>
  </ThemeProvider>
);

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { TokenProvider } from './context/TokenContext';
import ErrorBoundary from './components/common/ErrorBoundary/ErrorBoundary';
import AppRoutes from './routes';

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <TokenProvider>
          <ThemeProvider>
            <AuthProvider>
              <AppRoutes />
            </AuthProvider>
          </ThemeProvider>
        </TokenProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;

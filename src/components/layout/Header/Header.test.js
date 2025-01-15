import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { ThemeContext } from '../../../context/ThemeContext';
import Header from './Header';

const mockLogout = jest.fn();

const wrapper = ({ children }) => (
  <BrowserRouter>
    <AuthContext.Provider value={{ logout: mockLogout }}>
      <ThemeContext.Provider value={{ theme: 'light', toggleTheme: jest.fn() }}>
        {children}
      </ThemeContext.Provider>
    </AuthContext.Provider>
  </BrowserRouter>
);

describe('Header', () => {
  it('renders all navigation items', () => {
    render(<Header />, { wrapper });

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Artistes')).toBeInTheDocument();
    expect(screen.getByText('Albums')).toBeInTheDocument();
    expect(screen.getByText('Audio')).toBeInTheDocument();
    expect(screen.getByText('Paramètres')).toBeInTheDocument();
  });

  it('calls logout when clicking logout button', () => {
    render(<Header />, { wrapper });

    const logoutButton = screen.getByText('Déconnexion');
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalled();
  });
});

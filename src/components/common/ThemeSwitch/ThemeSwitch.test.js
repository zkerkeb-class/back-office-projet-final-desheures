// import React from 'react';
// import { render, fireEvent, screen } from '@testing-library/react';
// import { ThemeProvider } from '../../../context/ThemeContext';
// import ThemeSwitch from './ThemeSwitch';

// // Mock du localStorage
// const localStorageMock = {
//   getItem: jest.fn(),
//   setItem: jest.fn(),
//   clear: jest.fn()
// };
// global.localStorage = localStorageMock;

// // Wrapper personnalisé pour fournir le contexte
// const renderWithTheme = (component) => {
//   return render(
//     <ThemeProvider>
//       {component}
//     </ThemeProvider>
//   );
// };

// describe('ThemeSwitch', () => {
//   beforeEach(() => {
//     // Réinitialiser les mocks avant chaque test
//     localStorage.clear();
//     localStorage.getItem.mockReset();
//     localStorage.setItem.mockReset();
//   });

//   it('renders without crashing', () => {
//     renderWithTheme(<ThemeSwitch />);
//     expect(screen.getByRole('switch')).toBeInTheDocument();
//   });

//   it('displays correct icon based on theme', () => {
//     localStorage.getItem.mockReturnValue('light');
//     renderWithTheme(<ThemeSwitch />);

//     // Vérifier que l'icône du soleil est visible en mode clair
//     expect(screen.getByLabelText('Mode clair')).toBeInTheDocument();

//     // Simuler le clic pour passer en mode sombre
//     fireEvent.click(screen.getByRole('switch'));

//     // Vérifier que l'icône de la lune est visible en mode sombre
//     expect(screen.getByLabelText('Mode sombre')).toBeInTheDocument();
//   });

//   it('toggles theme when clicked', () => {
//     localStorage.getItem.mockReturnValue('light');
//     renderWithTheme(<ThemeSwitch />);

//     const switchElement = screen.getByRole('switch');

//     // Premier clic - passage en mode sombre
//     fireEvent.click(switchElement);
//     expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');

//     // Deuxième clic - retour en mode clair
//     fireEvent.click(switchElement);
//     expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'light');
//   });

//   it('applies correct accessibility attributes', () => {
//     renderWithTheme(<ThemeSwitch />);

//     const switchElement = screen.getByRole('switch');
//     expect(switchElement).toHaveAttribute('aria-checked');
//     expect(switchElement).toHaveAttribute('aria-label', 'Changer le thème');
//   });

//   it('maintains theme state after page reload', () => {
//     // Simuler un thème sauvegardé
//     localStorage.getItem.mockReturnValue('dark');

//     renderWithTheme(<ThemeSwitch />);

//     // Vérifier que le thème est correctement restauré
//     expect(screen.getByLabelText('Mode sombre')).toBeInTheDocument();
//     expect(document.body.className).toContain('dark');
//   });

//   it('handles localStorage errors gracefully', () => {
//     // Simuler une erreur de localStorage
//     localStorage.getItem.mockImplementation(() => {
//       throw new Error('localStorage not available');
//     });

//     // Le composant devrait se rendre sans erreur avec le thème par défaut
//     renderWithTheme(<ThemeSwitch />);
//     expect(screen.getByRole('switch')).toBeInTheDocument();
//   });
// });

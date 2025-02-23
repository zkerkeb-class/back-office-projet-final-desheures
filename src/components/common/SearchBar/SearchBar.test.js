// import { render, fireEvent } from '@testing-library/react';
// import SearchBar from './SearchBar';

// describe('SearchBar', () => {
//   it('renders with placeholder', () => {
//     const { getByPlaceholderText } = render(
//       <SearchBar value="" onChange={() => {}} />
//     );
//     expect(getByPlaceholderText('Rechercher...')).toBeInTheDocument();
//   });

//   it('calls onChange when input changes', () => {
//     const handleChange = jest.fn();
//     const { getByPlaceholderText } = render(
//       <SearchBar value="" onChange={handleChange} />
//     );
//     fireEvent.change(getByPlaceholderText('Rechercher...'), {
//       target: { value: 'test' },
//     });
//     expect(handleChange).toHaveBeenCalled();
//   });
// });

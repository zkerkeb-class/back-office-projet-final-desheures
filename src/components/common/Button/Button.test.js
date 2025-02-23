// import { render, fireEvent } from '@testing-library/react';
// import Button from './Button';

// describe('Button', () => {
//   it('renders correctly', () => {
//     const { getByText } = render(<Button>Test Button</Button>);
//     expect(getByText('Test Button')).toBeInTheDocument();
//   });

//   it('calls onClick when clicked', () => {
//     const handleClick = jest.fn();
//     const { getByText } = render(
//       <Button onClick={handleClick}>Click Me</Button>
//     );
//     fireEvent.click(getByText('Click Me'));
//     expect(handleClick).toHaveBeenCalled();
//   });

//   it('is disabled when disabled prop is true', () => {
//     const { getByText } = render(<Button disabled>Disabled</Button>);
//     expect(getByText('Disabled')).toBeDisabled();
//   });
// });

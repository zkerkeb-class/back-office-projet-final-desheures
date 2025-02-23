// import { render, fireEvent } from '@testing-library/react';
// import InputField from './InputField';

// describe('InputField', () => {
//   it('renders with label', () => {
//     const { getByLabelText } = render(
//       <InputField id="test" label="Test Input" value="" onChange={() => {}} />
//     );
//     expect(getByLabelText('Test Input')).toBeInTheDocument();
//   });

//   it('shows error message when error prop is provided', () => {
//     const { getByText } = render(
//       <InputField
//         id="test"
//         label="Test Input"
//         value=""
//         onChange={() => {}}
//         error="This field is required"
//       />
//     );
//     expect(getByText('This field is required')).toBeInTheDocument();
//   });

//   it('calls onChange when value changes', () => {
//     const handleChange = jest.fn();
//     const { getByLabelText } = render(
//       <InputField
//         id="test"
//         label="Test Input"
//         value=""
//         onChange={handleChange}
//       />
//     );
//     fireEvent.change(getByLabelText('Test Input'), {
//       target: { value: 'test' },
//     });
//     expect(handleChange).toHaveBeenCalled();
//   });
// });

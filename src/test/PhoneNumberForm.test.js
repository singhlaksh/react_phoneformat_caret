import React from 'react';
import { render, fireEvent , screen } from '@testing-library/react';
import PhoneNumberForm from '../Components/PhoneNumberForm'; // Update the import path

test('should reset phone state and error', () => {
  const { getByLabelText, queryByText } = render(<PhoneNumberForm />);
  const phoneInput = getByLabelText('Phone:');

  // Type a number to trigger the formatting
  fireEvent.change(phoneInput, { target: { value: '(123) 456-7890' } });

  // Click the reset button
  fireEvent.click(queryByText('Reset'));

  // Check if the phone state is reset
  expect(phoneInput.value).toBe('');

  // Check if the error message is not in the document
  expect(queryByText('Invalid phone number format. Example: (555) 555-5555')).not.toBeInTheDocument();
});

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = jest.fn();

test('renders battle engine title', () => {
  const { getByText } = render(<App />);
  const titleElement = getByText(/BATTLE ENGINE/i);
  expect(titleElement).toBeInTheDocument();
});

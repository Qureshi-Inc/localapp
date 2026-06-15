import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText(/Interactive Data Visualization Web App/i)).toBeInTheDocument();
  });

  test('displays the correct title', () => {
    render(<App />);
    expect(screen.getByText(/Interactive Data Visualization Web App/i)).toBeInTheDocument();
  });

  test('renders year selection dropdown', () => {
    render(<App />);
    const selectElement = screen.getByLabelText(/Filter by Year:/i);
    expect(selectElement).toBeInTheDocument();
  });

  test('handles year change correctly', () => {
    render(<App />);
    
    const selectElement = screen.getByLabelText(/Filter by Year:/i);
    fireEvent.change(selectElement, { target: { value: '2022' } });
    
    expect(selectElement.value).toBe('2022');
  });

  test('renders all three chart components', () => {
    render(<App />);
    
    // Check that the main container elements are present
    expect(screen.getByText(/Sales Chart/i)).toBeInTheDocument();
    expect(screen.getByText(/Revenue Chart/i)).toBeInTheDocument();
    expect(screen.getByText(/Distribution Chart/i)).toBeInTheDocument();
  });
});
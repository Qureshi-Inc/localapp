import React from 'react';
import { render, screen } from '@testing-library/react';
import BarChart from './BarChart';

// Mock Chart.js component to avoid complex dependencies in tests
jest.mock('react-chartjs-2', () => ({
  Bar: jest.fn(() => <div data-testid="mock-bar-chart">Mock Bar Chart</div>),
}));

describe('BarChart Component', () => {
  const mockData = {
    labels: ['Jan', 'Feb', 'Mar'],
    datasets: [
      {
        label: 'Sales',
        data: [10, 20, 30],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  test('renders without crashing', () => {
    render(<BarChart data={mockData} />);
    expect(screen.getByTestId('mock-bar-chart')).toBeInTheDocument();
  });

  test('displays chart title', () => {
    render(<BarChart data={mockData} title="Sales Chart" />);
    expect(screen.getByText(/Sales Chart/i)).toBeInTheDocument();
  });
});
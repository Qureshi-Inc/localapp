import React from 'react';
import { render, screen } from '@testing-library/react';
import LineChart from './LineChart';

// Mock Chart.js component to avoid complex dependencies in tests
jest.mock('react-chartjs-2', () => ({
  Line: jest.fn(() => <div data-testid="mock-line-chart">Mock Line Chart</div>),
}));

describe('LineChart Component', () => {
  const mockData = {
    labels: ['Jan', 'Feb', 'Mar'],
    datasets: [
      {
        label: 'Revenue',
        data: [10, 20, 30],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
      },
    ],
  };

  test('renders without crashing', () => {
    render(<LineChart data={mockData} />);
    expect(screen.getByTestId('mock-line-chart')).toBeInTheDocument();
  });

  test('displays chart title', () => {
    render(<LineChart data={mockData} title="Revenue Chart" />);
    expect(screen.getByText(/Revenue Chart/i)).toBeInTheDocument();
  });
});
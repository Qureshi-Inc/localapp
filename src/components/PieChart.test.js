import React from 'react';
import { render, screen } from '@testing-library/react';
import PieChart from './PieChart';

// Mock Chart.js component to avoid complex dependencies in tests
jest.mock('react-chartjs-2', () => ({
  Pie: jest.fn(() => <div data-testid="mock-pie-chart">Mock Pie Chart</div>),
}));

describe('PieChart Component', () => {
  const mockData = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        data: [10, 20, 30],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 205, 86, 0.6)',
        ],
      },
    ],
  };

  test('renders without crashing', () => {
    render(<PieChart data={mockData} />);
    expect(screen.getByTestId('mock-pie-chart')).toBeInTheDocument();
  });

  test('displays chart title', () => {
    render(<PieChart data={mockData} title="Distribution Chart" />);
    expect(screen.getByText(/Distribution Chart/i)).toBeInTheDocument();
  });
});
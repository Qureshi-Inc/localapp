import React, { useState } from 'react';
import './App.css';
import BarChart from './components/BarChart';
import LineChart from './components/LineChart';
import PieChart from './components/PieChart';

function App() {
  const [selectedYear, setSelectedYear] = useState('2023');
  
  // Sample data for charts
  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  const pieChartData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
    datasets: [
      {
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 205, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Function to handle year change
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    // In a real app, this would fetch new data based on the selected year
    console.log(`Selected year: ${e.target.value}`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Interactive Data Visualization Web App</h1>
        <p>Welcome to the data visualization dashboard</p>
        
        {/* Interactive Controls */}
        <div className="controls">
          <label htmlFor="year-select">Filter by Year: </label>
          <select 
            id="year-select"
            value={selectedYear} 
            onChange={handleYearChange}
          >
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </select>
        </div>

        {/* Charts Container */}
        <div className="charts-container">
          <BarChart data={barChartData} title="Sales Chart" />
          <LineChart data={lineChartData} title="Revenue Chart" />
          <PieChart data={pieChartData} title="Distribution Chart" />
        </div>
      </header>
    </div>
  );
}

export default App;
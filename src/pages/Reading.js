import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from 'chart.js';
import { differenceInDays, format, addDays } from 'date-fns';
import './Reading.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

const Reading = () => {
  const [birthDate, setBirthDate] = useState('');
  const [targetDate, setTargetDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [chartData, setChartData] = useState(null);

  const calculateBiorhythm = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const target = new Date(targetDate);
    const daysSinceBirth = differenceInDays(target, birth);
    
    // Generate chart data for 30 days
    const labels = [];
    const physicalData = [];
    const emotionalData = [];
    const intellectualData = [];
    
    for (let i = -15; i <= 15; i++) {
      const currentDay = addDays(target, i);
      const currentDaysSinceBirth = daysSinceBirth + i;
      
      labels.push(format(currentDay, 'MMM dd'));
      
      // Calculate biorhythm values using sine waves
      const physical = Math.sin(2 * Math.PI * currentDaysSinceBirth / 23) * 100;
      const emotional = Math.sin(2 * Math.PI * currentDaysSinceBirth / 28) * 100;
      const intellectual = Math.sin(2 * Math.PI * currentDaysSinceBirth / 33) * 100;
      
      physicalData.push(physical);
      emotionalData.push(emotional);
      intellectualData.push(intellectual);
    }

    setChartData({
      labels,
      datasets: [
        {
          label: 'Physical',
          data: physicalData,
          borderColor: '#ff6b6b',
          backgroundColor: 'transparent',
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 4,
        },
        {
          label: 'Emotional',
          data: emotionalData,
          borderColor: '#4ecdc4',
          backgroundColor: 'transparent',
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 4,
        },
        {
          label: 'Intellectual',
          data: intellectualData,
          borderColor: '#45b7d1',
          backgroundColor: 'transparent',
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 4,
        },
      ],
    });
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 20,
        bottom: 20,
        left: 10,
        right: 10,
      },
    },
    plugins: {
      legend: {
        display: false, // Remove legend as requested
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Remove grid
        },
        ticks: {
          color: '#cccccc',
          font: {
            size: 12,
          },
        },
      },
      y: {
        min: -110,
        max: 110,
        grid: {
          display: true, // Enable grid to show zero line
          drawBorder: false,
          color: function(context) {
            if (context.tick.value === 0) {
              return 'rgba(255, 255, 255, 0.3)'; // White zero line
            }
            return 'transparent'; // Hide all other grid lines
          },
          lineWidth: function(context) {
            if (context.tick.value === 0) {
              return 1; // Zero line width
            }
            return 0; // Hide other lines
          },
        },
        ticks: {
          display: false, // Remove y-axis labels
          stepSize: 50, // Ensure zero is included in ticks
        },
      },
    },
    elements: {
      line: {
        borderJoinStyle: 'round',
      },
    },
    // Add horizontal line at 0
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  return (
    <div className="reading">
      <div className="reading-content">
        <h1>Reading</h1>
        
        <div className="calculator-controls">
          <div className="input-group">
            <label>Birth Date</label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="date-input"
            />
          </div>
          
          <div className="input-group">
            <label>Target Date</label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="date-input"
            />
          </div>
          
          <button onClick={calculateBiorhythm} className="calculate-btn">
            Calculate
          </button>
        </div>

        {chartData && (
          <div className="chart-section">
            <div className="chart-container">
              <Line data={chartData} options={chartOptions} />
            </div>
            
            <div className="chart-labels">
              <div className="label physical">Physical</div>
              <div className="label emotional">Emotional</div>
              <div className="label intellectual">Intellectual</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reading; 
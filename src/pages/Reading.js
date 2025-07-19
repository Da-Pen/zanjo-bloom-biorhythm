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
  const [currentView, setCurrentView] = useState('graph'); // 'graph' or 'about'
  const [currentScores, setCurrentScores] = useState(null);

  const calculateBiorhythm = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const target = new Date(targetDate);
    const daysSinceBirth = differenceInDays(target, birth);
    
    // Calculate current day biorhythm scores
    const currentPhysical = Math.sin(2 * Math.PI * daysSinceBirth / 23) * 100;
    const currentEmotional = Math.sin(2 * Math.PI * daysSinceBirth / 28) * 100;
    const currentIntellectual = Math.sin(2 * Math.PI * daysSinceBirth / 33) * 100;
    
    setCurrentScores({
      date: format(target, 'MMMM dd, yyyy'),
      physical: Math.round(currentPhysical),
      emotional: Math.round(currentEmotional),
      intellectual: Math.round(currentIntellectual)
    });
    
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
          borderColor: '#fff01f',
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
          borderColor: '#bc13fe',
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
          borderColor: '#00e71f',
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
        top: 2,
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
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            const value = Math.round(context.parsed.y);
            return `${label}: ${value}`;
          }
        },
        usePointStyle: true,
        pointStyle: 'circle',
        boxWidth: 6,
        boxHeight: 6,
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false, // Remove grid
          drawBorder: false, // Remove bottom axis line
          borderWidth: 0, // Ensure no border
        },
        border: {
          display: false, // Remove axis line
        },
        ticks: {
          color: '#cccccc',
          font: {
            size: 12,
          },
        },
      },
      y: {
        display: true,
        min: -110,
        max: 110,
        grid: {
          display: true, // Enable grid to show zero line
          drawBorder: false, // Remove left axis line
          borderWidth: 0, // Ensure no border
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
        border: {
          display: false, // Remove axis line
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
      <div className={`reading-slider-container ${currentView === 'about' ? 'show-about' : ''}`}>
        
        {/* Graph Panel */}
        <div className={`panel graph-panel ${currentView === 'graph' ? 'active' : ''}`}>
          <div className="panel-content">
            <h1>Biorhythm Reading</h1>
            
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
                <div className="chart-labels">
                  <div className="label physical">
                    Physical
                    {currentScores && <div className="score-value">{currentScores.physical}</div>}
                  </div>
                  <div className="label emotional">
                    Emotional
                    {currentScores && <div className="score-value">{currentScores.emotional}</div>}
                  </div>
                  <div className="label intellectual">
                    Intellectual
                    {currentScores && <div className="score-value">{currentScores.intellectual}</div>}
                  </div>
                </div>
                
                <div className="chart-container">
                  <Line data={chartData} options={chartOptions} />
                </div>
              </div>
            )}
            
            {/* About Button */}
            {chartData && (
              <div className="panel-navigation">
                <button 
                  onClick={() => setCurrentView('about')} 
                  className="about-btn-simple"
                >
                  About Biorhythms
                </button>
              </div>
            )}
          </div>
        </div>

        {/* About Panel */}
        <div className={`panel about-panel ${currentView === 'about' ? 'active' : ''}`}>
          <div className="panel-content">
            {/* Back Button */}
            <div className="panel-navigation top-left">
              <button 
                onClick={() => setCurrentView('graph')} 
                className="back-btn-simple"
              >
                ← Back
              </button>
            </div>
            
            <div className="about-biorhythms">
              <h2>About Biorhythms</h2>
              <div className="biorhythm-info">
                <p>
                  Biorhythm theory suggests that our lives are influenced by rhythmic biological cycles that affect our ability 
                  in various domains. The theory was developed in the late 19th century by Wilhelm Fliess, a German physician, 
                  and later popularized in the 1970s.
                </p>
                
                <div className="cycle-explanations">
                  <div className="cycle-explanation">
                    <h3>Physical Cycle (23 days)</h3>
                    <p>
                      Governs physical strength, energy levels, stamina, and overall health. High phases indicate peak physical 
                      performance, while low phases suggest rest and recovery periods. This cycle influences athletic performance, 
                      immune system strength, and physical coordination.
                    </p>
                  </div>
                  
                  <div className="cycle-explanation">
                    <h3>Emotional Cycle (28 days)</h3>
                    <p>
                      Controls mood, feelings, emotional stability, and creativity. High phases bring optimism, artistic inspiration, 
                      and emotional balance, while low phases may involve introspection, sensitivity, or mood fluctuations. This cycle 
                      affects relationships, artistic endeavors, and emotional well-being.
                    </p>
                  </div>
                  
                  <div className="cycle-explanation">
                    <h3>Intellectual Cycle (33 days)</h3>
                    <p>
                      Influences mental capabilities, logic, reasoning, and decision-making. High phases enhance analytical thinking, 
                      learning capacity, and problem-solving abilities, while low phases suggest slower mental processing. This cycle 
                      affects academic performance, strategic planning, and cognitive tasks.
                    </p>
                  </div>
                </div>
                
                <p className="disclaimer">
                  While biorhythm theory is not scientifically proven, many people find it useful for self-reflection and 
                  understanding their natural patterns of energy and mood.
                </p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Reading; 
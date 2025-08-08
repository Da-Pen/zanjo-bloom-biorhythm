import React, { useState, useEffect } from 'react';
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
import { differenceInDays, format, addDays, parseISO } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
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
  const [currentScores, setCurrentScores] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showToast, setShowToast] = useState(false);

  const performCalculation = (birthDateStr, targetDateStr) => {
    if (!birthDateStr) return;

    const birth = parseISO(birthDateStr);
    const target = parseISO(targetDateStr);
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
          backgroundColor: '#fff01f',
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
          backgroundColor: '#bc13fe',
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
          backgroundColor: '#00e71f',
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 4,
        },
      ],
    });
  };

  const calculateBiorhythm = () => {
    if (!birthDate) return;
    performCalculation(birthDate, targetDate);
  };

  const handleShare = async () => {
    const url = new URL(window.location.href);
    url.searchParams.set('birth', birthDate);
    url.searchParams.set('target', targetDate);
    const shareUrl = url.toString();

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Biorhythm Chart',
          text: 'Check out my biorhythm chart - what does yours look like?',
          url: shareUrl,
        });
        return; // Successfully shared
      } catch (err) {
        // Fall through to clipboard methods
      }
    }

    // Try modern clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        showCopyToast();
        return;
      } catch (err) {
        // Fall through to legacy method
      }
    }

    // Legacy fallback method
    try {
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      showCopyToast();
    } catch (err) {
      // Final fallback - show the URL in a prompt
      prompt('Copy this link to share your biorhythm chart:', shareUrl);
    }
  };

  const showCopyToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  useEffect(() => {
    // Initialize from URL params
    const birthParam = searchParams.get('birth');
    const targetParam = searchParams.get('target');
    const isValidDate = (s) => /^(\d{4})-(\d{2})-(\d{2})$/.test(s);

    let initialBirth = birthDate;
    let initialTarget = targetDate;

    if (birthParam && isValidDate(birthParam)) {
      initialBirth = birthParam;
      setBirthDate(birthParam);
    }
    if (targetParam && isValidDate(targetParam)) {
      initialTarget = targetParam;
      setTargetDate(targetParam);
    }

    // Auto-calc when both present
    if (initialBirth && isValidDate(initialBirth)) {
      performCalculation(initialBirth, initialTarget);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Keep URL in sync with current selections
    const params = {};
    if (birthDate) params.birth = birthDate;
    if (targetDate) params.target = targetDate;
    setSearchParams(params, { replace: true });
  }, [birthDate, targetDate, setSearchParams]);

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
      <div className="reading-content">
        <h1>Check Your Biorhythm</h1>
        
        {/* Calculator Form - Always Visible */}
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

        {/* Chart Section - Only shows after calculate */}
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
            
            <button onClick={handleShare} className="calculate-btn share-btn">
              Share
            </button>
          </div>
        )}
        
        {/* About Biorhythms Section - Only shows after calculate */}
        {chartData && (
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
        )}
        
      </div>
      
      {/* Toast notification */}
      {showToast && (
        <div className="toast-notification">
          <div className="toast-content">
            Link copied to clipboard
          </div>
        </div>
      )}
    </div>
  );
};

export default Reading; 
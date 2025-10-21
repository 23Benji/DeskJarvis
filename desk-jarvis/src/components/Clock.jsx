import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react'; // 🧠 icon library

const ClockWidget = () => {
  const [activeTab, setActiveTab] = useState('clock');
  const [menuOpen, setMenuOpen] = useState(false);
  const [time, setTime] = useState(new Date());
  const [stopwatch, setStopwatch] = useState(0);
  const [timer, setTimer] = useState(60);
  const [pomodoro, setPomodoro] = useState(25 * 60);
  const [running, setRunning] = useState(false);

  // CLOCK
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // STOPWATCH
  useEffect(() => {
    let interval;
    if (activeTab === 'stopwatch' && running) {
      interval = setInterval(() => setStopwatch((s) => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [activeTab, running]);

  // TIMER
  useEffect(() => {
    let interval;
    if (activeTab === 'timer' && running && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [activeTab, running, timer]);

  // POMODORO
  useEffect(() => {
    let interval;
    if (activeTab === 'pomodoro' && running && pomodoro > 0) {
      interval = setInterval(() => setPomodoro((p) => p - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [activeTab, running, pomodoro]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  const switchTab = (tab) => {
    setRunning(false);
    setActiveTab(tab);
    setMenuOpen(false);
  };

  return (
    <div className="clock-widget">
      {/* Header row: hamburger + title */}
      <div className="menu-bar">
        <button className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          <Menu size={20} />
        </button>

        <div className="clock-title">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </div>

        {menuOpen && (
          <div className="dropdown-menu">
            {['clock', 'stopwatch', 'timer', 'pomodoro'].map((tab) => (
              <button
                key={tab}
                onClick={() => switchTab(tab)}
                className={activeTab === tab ? 'active' : ''}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Display */}
      <div className="clock-display">
        {activeTab === 'clock' && <div>{time.toLocaleTimeString()}</div>}

        {activeTab === 'stopwatch' && (
          <div>
            <div>{formatTime(stopwatch)}</div>
            <div className="button-row">
              <button onClick={() => setRunning(!running)}>
                {running ? 'Pause' : 'Start'}
              </button>
              <button onClick={() => setStopwatch(0)}>Reset</button>
            </div>
          </div>
        )}

        {activeTab === 'timer' && (
          <div>
            <div>{formatTime(timer)}</div>
            <input
              type="range"
              min="10"
              max="1800"
              step="10"
              value={timer}
              onChange={(e) => setTimer(Number(e.target.value))}
            />
            <div className="button-row">
              <button onClick={() => setRunning(!running)}>
                {running ? 'Pause' : 'Start'}
              </button>
              <button onClick={() => setTimer(60)}>Reset</button>
            </div>
          </div>
        )}

        {activeTab === 'pomodoro' && (
          <div>
            <div>{formatTime(pomodoro)}</div>
            <div className="button-row">
              <button onClick={() => setRunning(!running)}>
                {running ? 'Pause' : 'Start'}
              </button>
              <button onClick={() => setPomodoro(25 * 60)}>Reset</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClockWidget;

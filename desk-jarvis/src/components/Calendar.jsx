import React, { useState, useEffect } from 'react';

const Calendar = () => {
  const [calendarGrid, setCalendarGrid] = useState([]);
  const [monthInfo, setMonthInfo] = useState('');

  useEffect(() => {
    const now = new Date();
    const today = now.getDate();
    const year = now.getFullYear();
    const month = now.toLocaleString('default', { month: 'long' });
    const daysInMonth = new Date(year, now.getMonth() + 1, 0).getDate();
    const firstDay = new Date(year, now.getMonth(), 1).getDay();

    const days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
    const grid = [];
    let week = Array(firstDay).fill(null);

    for (let d = 1; d <= daysInMonth; d++) {
      week.push(d);
      if (week.length === 7 || d === daysInMonth) {
        grid.push(week);
        week = [];
      }
    }

    setMonthInfo(`${month.toUpperCase()} ${year}`);
    setCalendarGrid([days, ...grid]);
  }, []);

  return (
    <div className="calendar-widget">
      <h3 className="widget-title">Calendar</h3>
      <div className="calendar-grid">
        {calendarGrid.map((week, i) => (
          <div key={i} className="calendar-row">
            {week.map((day, j) =>
              day ? (
                <span
                  key={j}
                  className={`calendar-day ${
                    day === new Date().getDate() ? 'today' : ''
                  }`}
                >
                  {day.toString().padStart(2, '0')}
                </span>
              ) : (
                <span key={j} className="calendar-day empty"> </span>
              )
            )}
          </div>
        ))}
      </div>
      <div className="calendar-footer">{monthInfo}</div>
    </div>
  );
};

export default Calendar;

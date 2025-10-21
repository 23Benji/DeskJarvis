import React, { useState, useEffect } from 'react';

const Calendar = () => {
  const [calendarText, setCalendarText] = useState('');

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.toLocaleString('default', { month: 'long' });
    const daysInMonth = new Date(year, now.getMonth() + 1, 0).getDate();

    const firstDay = new Date(year, now.getMonth(), 1).getDay();
    const days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
    let grid = days.join(' ') + '\n';

    let week = Array(firstDay).fill('  ');

    for (let d = 1; d <= daysInMonth; d++) {
      week.push(d.toString().padStart(2, ' '));
      if (week.length === 7 || d === daysInMonth) {
        grid += week.join(' ') + '\n';
        week = [];
      }
    }

    setCalendarText(`${month.toUpperCase()} ${year}\n\n${grid}`);
  }, []);

  return (
    <div className="calendar-widget">
      <h3 className="widget-title">Calendar</h3>
      <pre className="calendar-grid">{calendarText}</pre>
    </div>
  );
};

export default Calendar;

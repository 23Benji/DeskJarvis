import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import Draggable from 'react-draggable';
import {
  Clock as ClockIcon,
  Cloud as CloudIcon,
  Calendar as CalendarIcon,
  CheckSquare as CheckIcon,
  StickyNote as NoteIcon,
  Music as MusicIcon,
  Image as ImageIcon,
} from 'lucide-react';

import Clock from './components/Clock';
import Weather from './components/Weather';
import Calendar from './components/Calendar';
import ToDo from './components/ToDo';
import Notes from './components/Notes';
import MusicPlayer from './components/MusicPlayer';
import AiWidget from './components/AiWidget';
import ResizableImageWidget from './components/ResizableImageWidget';

function App() {
  const [widgets, setWidgets] = useState({
    clock: false,
    weather: true,
    calendar: true,
    todo: true,
    notes: true,
    music: true,
    image: true,
  });

  const hideWidget = (name) => {
    setWidgets((prev) => ({ ...prev, [name]: false }));
  };

  // 🧩 Refs for each draggable widget
  const clockRef = useRef(null);
  const weatherRef = useRef(null);
  const calendarRef = useRef(null);
  const todoRef = useRef(null);
  const notesRef = useRef(null);
  const musicRef = useRef(null);

  // 🧭 Toolbox visibility logic (appears when near right edge)
  const [toolboxVisible, setToolboxVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const threshold = window.innerWidth * 0.1; // 10% from right edge
      if (window.innerWidth - e.clientX <= threshold) {
        setToolboxVisible(true);
      } else {
        setToolboxVisible(false);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="dashboard">
      <div className="ai-center">
        <AiWidget />
      </div>

      {widgets.clock && (
        <Draggable handle=".drag-handle" nodeRef={clockRef}>
          <div ref={clockRef} className="widget" style={{ top: '5%', left: '35%' }}>
            <div className="drag-handle"></div>
            <button className="hide-btn" onClick={() => hideWidget('clock')}>×</button>
            <Clock />
          </div>
        </Draggable>
      )}

      {widgets.weather && (
        <Draggable handle=".drag-handle" nodeRef={weatherRef}>
          <div ref={weatherRef} className="widget" style={{ top: '15%', right: '7%', position: 'absolute' }}>
            <div className="drag-handle"></div>
            <button className="hide-btn" onClick={() => hideWidget('weather')}>×</button>
            <Weather />
          </div>
        </Draggable>
      )}

      {widgets.calendar && (
        <Draggable handle=".drag-handle" nodeRef={calendarRef}>
          <div ref={calendarRef} className="widget" style={{ bottom: '5%', left: '5%', position: 'absolute' }}>
            <div className="drag-handle"></div>
            <button className="hide-btn" onClick={() => hideWidget('calendar')}>×</button>
            <Calendar />
          </div>
        </Draggable>
      )}

      {widgets.todo && (
        <Draggable handle=".drag-handle" nodeRef={todoRef}>
          <div ref={todoRef} className="widget" style={{ top: '40%', right: '3%', position: 'absolute' }}>
            <div className="drag-handle"></div>
            <button className="hide-btn" onClick={() => hideWidget('todo')}>×</button>
            <ToDo />
          </div>
        </Draggable>
      )}

      {widgets.notes && (
        <Draggable handle=".drag-handle" nodeRef={notesRef}>
          <div ref={notesRef} className="widget" style={{ top: '10%', left: '5%', transform: 'translateY(-50%)' }}>
            <div className="drag-handle"></div>
            <button className="hide-btn" onClick={() => hideWidget('notes')}>×</button>
            <Notes />
          </div>
        </Draggable>
      )}

      {widgets.music && (
        <Draggable handle=".drag-handle" nodeRef={musicRef}>
          <div ref={musicRef} className="widget" style={{ bottom: '5%', right: '35%', position: 'absolute' }}>
            <div className="drag-handle"></div>
            <button className="hide-btn" onClick={() => hideWidget('music')}>×</button>
            <MusicPlayer />
          </div>
        </Draggable>
      )}

      {widgets.image && (
        <div style={{ position: 'absolute', bottom: '5%', left: '50%', transform: 'translateX(-50%)' }}>
          <ResizableImageWidget imageSrc="/images/mountains.jpg" />
          <button className="hide-btn" onClick={() => hideWidget('image')}>×</button>
        </div>
      )}
      {/* Debug: show toolbox state */}
      <div style={{ position: 'fixed', bottom: '10px', left: '10px', color: 'white', fontSize: '12px', zIndex: 999999 }}>
        toolboxVisible: {toolboxVisible ? 'true' : 'false'}
      </div>

      {/* 🧩 Smart Toolbox with proximity detection and icons */}
      <div className={`toolbox ${toolboxVisible ? 'visible' : ''}`}>
        {Object.entries(widgets)
          .filter(([_, visible]) => !visible)
          .map(([name]) => {
            const icons = {
              clock: <ClockIcon size={18} />,
              weather: <CloudIcon size={18} />,
              calendar: <CalendarIcon size={18} />,
              todo: <CheckIcon size={18} />,
              notes: <NoteIcon size={18} />,
              music: <MusicIcon size={18} />,
              image: <ImageIcon size={18} />,
            };

            return (
              <div
                key={name}
                className="toolbox-icon"
                title={name.toUpperCase()}
                onClick={() => setWidgets(prev => ({ ...prev, [name]: true }))}
              >
                {icons[name] || '❔'}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;

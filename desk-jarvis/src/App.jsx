import React, { useRef } from 'react';
import './App.css';
import Draggable from 'react-draggable';

import Clock from './components/Clock';
import Weather from './components/Weather';
import Calendar from './components/Calendar';
import ToDo from './components/ToDo';
import Notes from './components/Notes';
import MusicPlayer from './components/MusicPlayer';
import AiWidget from './components/AiWidget';

function App() {
  const clockRef = useRef(null);
  const weatherRef = useRef(null);
  const calendarRef = useRef(null);
  const todoRef = useRef(null);
  const notesRef = useRef(null);
  const musicRef = useRef(null);
  const aiRef = useRef(null);

  return (
    <div className="dashboard" nodeRef={aiRef}>
      {/* AI Widget in the center */}
      <div className="ai-center">
        <AiWidget />
      </div>

      {/* Clock (top center-left) */}
      <Draggable handle=".drag-handle" nodeRef={clockRef}>
        <div ref={clockRef} className="widget" style={{ top: '80px', left: '40%' }}>
          <div className="drag-handle"></div>
          <Clock />
        </div>
      </Draggable>

      {/* Weather (top right) */}
      <Draggable handle=".drag-handle" nodeRef={weatherRef}>
        <div
          ref={weatherRef}
          className="widget"
          style={{ top: '100px', right: '150px', position: 'absolute' }}
        >
          <div className="drag-handle"></div>
          <Weather />
        </div>
      </Draggable>

      {/* CALENDAR (bottom left) */}
      <Draggable handle=".drag-handle" nodeRef={calendarRef}>
        <div
          ref={calendarRef}
          className="widget"
          style={{ bottom: '100px', left: '50px', position: 'absolute' }}
        >
          <div className="drag-handle"></div>
          <Calendar />
        </div>
      </Draggable>

      {/* TO-DO (top right) */}
      <Draggable handle=".drag-handle" nodeRef={todoRef}>
        <div
          ref={todoRef}
          className="widget"
          style={{ top: '45%', right: '150px', position: 'absolute' }}
        >
          <div className="drag-handle"></div>
          <ToDo />
        </div>
      </Draggable>

      {/* NOTES (left middle) */}
      <Draggable handle=".drag-handle" nodeRef={notesRef}>
        <div
          ref={notesRef}
          className="widget"
          style={{ top: '10%', left: '50px', transform: 'translateY(-50%)' }}
        >
          <div className="drag-handle"></div>
          <Notes />
        </div>
      </Draggable>

      {/* MUSIC PLAYER (bottom right) */}
      <Draggable handle=".drag-handle" nodeRef={musicRef}>
        <div
          ref={musicRef}
          className="widget"
          style={{ bottom: '5%', right: '5%', position: 'absolute' }}
        >
          <div className="drag-handle"></div>
          <MusicPlayer />
        </div>
      </Draggable>
    </div>
  );
}

export default App;

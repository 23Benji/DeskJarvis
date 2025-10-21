import React, { useEffect, useState } from 'react';

const Notes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch('/notes.json')
      .then((res) => res.json())
      .then((data) => setNotes(data))
      .catch((err) => console.error('Error loading notes:', err));
  }, []);

  return (
    <div className="notes-widget">
      <h3 className="notes-title">Notes</h3>
      <div className="notes-container">
        <ul>
          {notes.map((note, index) => (
            <li key={index}>
              <strong>{note.title}</strong> — {note.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notes;

import React, { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';

const ResizableImageWidget = ({ imageSrc = '/images/photo.jpg' }) => {
  const nodeRef = useRef(null);
  const [size, setSize] = useState({ width: 250, height: 250 });
  const [isResizing, setIsResizing] = useState(false);
  const startRef = useRef({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    let frame;

    const handlePointerMove = (e) => {
      if (!isResizing) return;

      const dx = e.clientX - startRef.current.x;
      const dy = e.clientY - startRef.current.y;

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setSize({
          width: Math.max(100, startRef.current.width + dx),
          height: Math.max(100, startRef.current.height + dy),
        });
      });
    };

    const handlePointerUp = () => setIsResizing(false);

    if (isResizing) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isResizing]);

  const handlePointerDown = (e) => {
    e.stopPropagation();
    setIsResizing(true);
    startRef.current = {
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
    };
  };

  return (
    <Draggable handle=".drag-handle" nodeRef={nodeRef}>
      <div
        ref={nodeRef}
        className="widget"
        style={{
          width: `${size.width}px`,
          height: `${size.height}px`,
          overflow: 'hidden',
          position: 'absolute',
          borderRadius: '10px',
        }}
      >
        {/* Drag handle */}
        <div className="drag-handle" />

        {/* Image */}
        <img
          src={imageSrc}
          alt="Displayed"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '10px',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />

        {/* Resize grip */}
        <div className="resize-grip" onPointerDown={handlePointerDown}></div>
      </div>
    </Draggable>
  );
};

export default ResizableImageWidget;

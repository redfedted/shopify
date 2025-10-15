import React, { useRef, useEffect, useMemo } from 'react';
import { FLOWERS } from '../constants';
import type { Flower } from '../types';

interface HorizontalScrollGalleryProps {
  onFlowerClick: (flower: Flower) => void;
}

const FlowerCard: React.FC<{ flower: Flower, onClick: () => void }> = ({ flower, onClick }) => {
  return (
    <button onClick={onClick} className="flex flex-col items-center justify-start p-4 w-72 h-64 select-none transition-transform duration-300 ease-in-out hover:scale-105 group text-left">
      <div className="w-48 h-48 flex items-center justify-center">
        <img 
          src={flower.imageUrl} 
          alt={flower.name} 
          className="max-w-full max-h-full object-contain pointer-events-none" 
          draggable="false"
        />
      </div>
      <p className="mt-4 italic text-xl text-stone-800">{flower.name}</p>
    </button>
  );
};

const ScrollableGridGallery: React.FC<HorizontalScrollGalleryProps> = ({ onFlowerClick }) => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const momentumID = useRef<number | null>(null);
  const isDown = useRef(false);
  const didMove = useRef(false);
  
  const lastMouseX = useRef(0);
  const lastMouseY = useRef(0);
  const velX = useRef(0);
  const velY = useRef(0);

  const galleryFlowers = useMemo(() => Array(5).fill(FLOWERS).flat(), []);

  const beginMomentumTracking = () => {
    cancelMomentumTracking();
    momentumID.current = requestAnimationFrame(momentumLoop);
  };

  const cancelMomentumTracking = () => {
    if (momentumID.current !== null) {
      cancelAnimationFrame(momentumID.current);
      momentumID.current = null;
    }
  };

  const momentumLoop = () => {
    const el = galleryRef.current;
    if (!el) return;
    
    el.scrollLeft += velX.current;
    el.scrollTop += velY.current;
    velX.current *= 0.95;
    velY.current *= 0.95;
    
    if (Math.abs(velX.current) > 0.5 || Math.abs(velY.current) > 0.5) {
      momentumID.current = requestAnimationFrame(momentumLoop);
    } else {
      cancelMomentumTracking();
    }
  };
  
  const handleCardClick = (e: React.MouseEvent, flower: Flower) => {
    if (didMove.current) {
      e.preventDefault(); // Prevent click if the user was dragging
    } else {
      onFlowerClick(flower);
    }
  };

  useEffect(() => {
    const el = galleryRef.current;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown.current) return;
      e.preventDefault();
      
      const dx = e.clientX - lastMouseX.current;
      const dy = e.clientY - lastMouseY.current;

      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
        didMove.current = true;
      }

      el.scrollLeft -= dx;
      el.scrollTop -= dy;

      velX.current = -dx;
      velY.current = -dy;

      lastMouseX.current = e.clientX;
      lastMouseY.current = e.clientY;
    };

    const onMouseUp = () => {
      if(isDown.current) {
        isDown.current = false;
        el.classList.remove('grabbing');
        beginMomentumTracking();
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      isDown.current = true;
      didMove.current = false; // Reset move status on new mousedown
      el.classList.add('grabbing');
      lastMouseX.current = e.clientX;
      lastMouseY.current = e.clientY;
      velX.current = 0;
      velY.current = 0;
      cancelMomentumTracking();
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    };
    
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        return; 
      }
      e.preventDefault();
      cancelMomentumTracking();
      velX.current += e.deltaY * 0.1;
      beginMomentumTracking();
    };


    el.addEventListener('mousedown', onMouseDown);
    el.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      el.removeEventListener('mousedown', onMouseDown);
      el.removeEventListener('wheel', onWheel);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      cancelMomentumTracking();
    };
  }, []);

  return (
    <div 
      ref={galleryRef} 
      className="absolute inset-0 grid grid-flow-col auto-cols-max content-start gap-x-16 gap-y-8 pt-40 pb-40 px-8 overflow-auto cursor-grab no-scrollbar"
      style={{ gridTemplateRows: 'repeat(6, auto)' }}
    >
      {galleryFlowers.map((flower, index) => (
        <div key={index} onMouseDown={() => didMove.current = false} onClick={(e) => handleCardClick(e, flower)}>
          <FlowerCard flower={flower} onClick={() => { /* Clicks are handled by parent div */ }} />
        </div>
      ))}
    </div>
  );
};

export default ScrollableGridGallery;
import React from 'react';
import { FLOWERS } from '../constants';
import type { Flower } from '../types';

interface GridViewProps {
  onFlowerClick: (flower: Flower) => void;
}

const FlowerCardContent: React.FC<{ flower: Flower, onClick: () => void }> = ({ flower, onClick }) => (
  <button onClick={onClick} className="w-full text-left flex flex-col h-[380px] p-6 bg-white hover:bg-stone-50 transition-colors">
    <div className="flex-grow flex items-center justify-center">
      <img 
        src={flower.imageUrl} 
        alt={flower.name} 
        className="max-w-full max-h-full object-contain" 
      />
    </div>
    <div className="flex justify-between items-center pt-4 mt-4">
      <p className="text-lg" style={{color: '#0075c9'}}>{flower.name}</p>
      <a href="#" className="italic text-lg text-black hover:underline" onClick={(e) => e.stopPropagation()}>Explore</a>
    </div>
  </button>
);

const GridView: React.FC<GridViewProps> = ({ onFlowerClick }) => {
  return (
    <div className="absolute inset-0 pt-36 pb-48 px-8 overflow-y-auto no-scrollbar">
      <div className="grid grid-cols-3 border-l border-t" style={{borderColor: '#854d2f'}}>
        {FLOWERS.map(flower => (
          <div key={flower.id} className="border-r border-b" style={{borderColor: '#854d2f'}}>
            <FlowerCardContent flower={flower} onClick={() => onFlowerClick(flower)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridView;

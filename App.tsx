import React, { useState } from 'react';
import HorizontalScrollGallery from './components/HorizontalScrollGallery';
import GridView from './components/VerticalScrollGallery';
import FlowerDetail from './components/FlowerDetail';
import { FLOWERS } from './constants';
import type { Flower } from './types';

const GemLogo: React.FC = () => (
  <svg width="48" height="48" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gemGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#00c6ff' }} />
        <stop offset="100%" style={{ stopColor: '#0072ff' }} />
      </linearGradient>
    </defs>
    <path d="M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z" fill="url(#gemGradient)" />
    <path d="M50 0 L100 25 L50 20 Z" fill="#00a2d3" />
    <path d="M50 0 L0 25 L50 20 Z" fill="#00b4e6" />
    <path d="M0 25 L0 75 L50 80 Z" fill="#008ac4" />
    <path d="M100 25 L100 75 L50 80 Z" fill="#007ab4" />
    <path d="M0 75 L50 100 L50 80 Z" fill="#00699f" />
    <path d="M100 75 L50 100 L50 80 Z" fill="#00578a" />
    <path d="M50 20 L50 80 L0 75 L0 25 Z" fill="#009cd9" />
    <path d="M50 20 L50 80 L100 75 L100 25 Z" fill="#008fcc" />
    <path d="M50 0 L100 25 L50 100 L0 75 Z" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />
    <path d="M0 25 L100 75" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />
    <path d="M50 0 L50 100" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />
  </svg>
);

const Footer: React.FC = () => (
  <footer className="fixed bottom-0 left-0 right-0 flex items-center justify-between px-8 py-6 bg-white z-10">
    <div className="flex items-center gap-6">
      <GemLogo />
      <div>
        <p className="text-lg" style={{color: '#4c1d58'}}>Wegter Brands, Deventerstraat ll,</p>
        <p className="text-lg" style={{color: '#4c1d58'}}>7575 EM Oldenzaal, Nederland</p>
      </div>
    </div>
    <nav className="flex flex-col items-end gap-2 text-right">
      <a href="#" className="text-2xl hover:underline" style={{color: '#4c1d58'}}>About us</a>
      <a href="#" className="text-2xl hover:underline" style={{color: '#4c1d58'}}>Shipping policy</a>
      <a href="#" className="text-2xl hover:underline" style={{color: '#4c1d58'}}>Contact us</a>
    </nav>
  </footer>
);

export default function App() {
  const [view, setView] = useState<'horizontal' | 'grid' | 'detail'>('horizontal');
  const [selectedFlower, setSelectedFlower] = useState<Flower | null>(null);
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleFlowerClick = (flower: Flower) => {
    setSelectedFlower(flower);
    setView('detail');
  };

  const handleCloseDetail = () => {
    setSelectedFlower(null);
    setView('grid');
  };
  
  const handleViewChange = (newView: 'horizontal' | 'grid') => {
    setSelectedFlower(null);
    setView(newView);
    if (newView === 'horizontal') {
      setActiveButton(null);
    }
  }

  const handleGridNavigation = (buttonId: string) => {
    setSelectedFlower(null);
    setView('grid');
    setActiveButton(buttonId);
  };

  const getButtonClasses = (buttonId: string) => {
    const base = "px-5 py-2 text-sm rounded-full transition-colors border";
    if (activeButton === buttonId) {
      return `${base} bg-black text-white border-black`;
    }
    return `${base} bg-white text-black border-black hover:bg-stone-100`;
  };

  const renderContent = () => {
    if (view === 'detail' && selectedFlower) {
      return <FlowerDetail flower={selectedFlower} />;
    }
    if (view === 'grid') {
      return <GridView onFlowerClick={handleFlowerClick} />;
    }
    return <HorizontalScrollGallery onFlowerClick={handleFlowerClick} />;
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-stone-50">
      {renderContent()}
      
      <header className="fixed top-0 left-0 right-0 z-10 pointer-events-none">
        <div className="flex items-center justify-between px-8 py-4">
          <div 
            onClick={() => handleViewChange('horizontal')}
            className="flex items-center gap-4 pointer-events-auto cursor-pointer"
          >
            <GemLogo />
            <h1 className="text-4xl" style={{color: '#581c3c'}}>Flowers</h1>
          </div>
          <nav className="flex items-center gap-2 pointer-events-auto">
            <button onClick={() => handleGridNavigation('new-arrival')} className={getButtonClasses('new-arrival')}>
              new arrival
            </button>
            <button onClick={() => handleGridNavigation('collections')} className={getButtonClasses('collections')}>
              collections
            </button>
            {view === 'horizontal' ? (
              <button onClick={() => handleGridNavigation('grid-view')} className={getButtonClasses('grid-view')}>
                grid view
              </button>
            ) : (
              <button onClick={view === 'detail' ? handleCloseDetail : () => handleViewChange('horizontal')} className="px-5 py-2 text-sm text-black border border-black rounded-full hover:bg-stone-100 transition-colors bg-white">
                {view === 'detail' ? 'grid view' : 'close grid view'}
              </button>
            )}
          </nav>
        </div>
      </header>

      <Footer />
    </div>
  );
}
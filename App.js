import React, { useState } from 'react';
import HorizontalScrollGallery from './components/HorizontalScrollGallery.js';
import GridView from './components/VerticalScrollGallery.js';
import FlowerDetail from './components/FlowerDetail.js';
import { FLOWERS } from './constants.js';

const GemLogo = () => (
  React.createElement('svg', { width: "48", height: "48", viewBox: "0 0 100 100", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement('defs', null,
      React.createElement('linearGradient', { id: "gemGradient", x1: "0%", y1: "0%", x2: "100%", y2: "100%" },
        React.createElement('stop', { offset: "0%", style: { stopColor: '#00c6ff' } }),
        React.createElement('stop', { offset: "100%", style: { stopColor: '#0072ff' } })
      )
    ),
    React.createElement('path', { d: "M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z", fill: "url(#gemGradient)" }),
    React.createElement('path', { d: "M50 0 L100 25 L50 20 Z", fill: "#00a2d3" }),
    React.createElement('path', { d: "M50 0 L0 25 L50 20 Z", fill: "#00b4e6" }),
    React.createElement('path', { d: "M0 25 L0 75 L50 80 Z", fill: "#008ac4" }),
    React.createElement('path', { d: "M100 25 L100 75 L50 80 Z", fill: "#007ab4" }),
    React.createElement('path', { d: "M0 75 L50 100 L50 80 Z", fill: "#00699f" }),
    React.createElement('path', { d: "M100 75 L50 100 L50 80 Z", fill: "#00578a" }),
    React.createElement('path', { d: "M50 20 L50 80 L0 75 L0 25 Z", fill: "#009cd9" }),
    React.createElement('path', { d: "M50 20 L50 80 L100 75 L100 25 Z", fill: "#008fcc" }),
    React.createElement('path', { d: "M50 0 L100 25 L50 100 L0 75 Z", stroke: "rgba(255,255,255,0.2)", strokeWidth: "1", fill: "none" }),
    React.createElement('path', { d: "M0 25 L100 75", stroke: "rgba(255,255,255,0.2)", strokeWidth: "1", fill: "none" }),
    React.createElement('path', { d: "M50 0 L50 100", stroke: "rgba(255,255,255,0.2)", strokeWidth: "1", fill: "none" })
  )
);

const Footer = () => (
  React.createElement('footer', { className: "fixed bottom-0 left-0 right-0 flex items-center justify-between px-8 py-6 bg-white z-10" },
    React.createElement('div', { className: "flex items-center gap-6" },
      React.createElement(GemLogo),
      React.createElement('div', null,
        React.createElement('p', { className: "text-lg", style: {color: '#4c1d58'} }, "Wegter Brands, Deventerstraat ll,"),
        React.createElement('p', { className: "text-lg", style: {color: '#4c1d58'} }, "7575 EM Oldenzaal, Nederland")
      )
    ),
    React.createElement('nav', { className: "flex flex-col items-end gap-2 text-right" },
      React.createElement('a', { href: "#", className: "text-2xl hover:underline", style: {color: '#4c1d58'} }, "About us"),
      React.createElement('a', { href: "#", className: "text-2xl hover:underline", style: {color: '#4c1d58'} }, "Shipping policy"),
      React.createElement('a', { href: "#", className: "text-2xl hover:underline", style: {color: '#4c1d58'} }, "Contact us")
    )
  )
);

export default function App() {
  const [view, setView] = useState('horizontal');
  const [selectedFlower, setSelectedFlower] = useState(null);
  const [activeButton, setActiveButton] = useState(null);

  const handleFlowerClick = (flower) => {
    setSelectedFlower(flower);
    setView('detail');
  };

  const handleCloseDetail = () => {
    setSelectedFlower(null);
    setView('grid');
  };
  
  const handleViewChange = (newView) => {
    setSelectedFlower(null);
    setView(newView);
    if (newView === 'horizontal') {
      setActiveButton(null);
    }
  }

  const handleGridNavigation = (buttonId) => {
    setSelectedFlower(null);
    setView('grid');
    setActiveButton(buttonId);
  };

  const getButtonClasses = (buttonId) => {
    const base = "px-5 py-2 text-sm rounded-full transition-colors border";
    if (activeButton === buttonId) {
      return `${base} bg-black text-white border-black`;
    }
    return `${base} bg-white text-black border-black hover:bg-stone-100`;
  };

  const renderContent = () => {
    if (view === 'detail' && selectedFlower) {
      return React.createElement(FlowerDetail, { flower: selectedFlower });
    }
    if (view === 'grid') {
      return React.createElement(GridView, { onFlowerClick: handleFlowerClick });
    }
    return React.createElement(HorizontalScrollGallery, { onFlowerClick: handleFlowerClick });
  };

  return React.createElement('div', { className: "h-screen w-screen overflow-hidden bg-stone-50" },
    renderContent(),
    React.createElement('header', { className: "fixed top-0 left-0 right-0 z-10 pointer-events-none" },
      React.createElement('div', { className: "flex items-center justify-between px-8 py-4" },
        React.createElement('div', { 
          onClick: () => handleViewChange('horizontal'),
          className: "flex items-center gap-4 pointer-events-auto cursor-pointer"
        },
          React.createElement(GemLogo),
          React.createElement('h1', { className: "text-4xl", style: {color: '#581c3c'} }, "Flowers")
        ),
        React.createElement('nav', { className: "flex items-center gap-2 pointer-events-auto" },
          React.createElement('button', { 
            onClick: () => handleGridNavigation('new-arrival'), 
            className: getButtonClasses('new-arrival') 
          }, "new arrival"),
          React.createElement('button', { 
            onClick: () => handleGridNavigation('collections'), 
            className: getButtonClasses('collections') 
          }, "collections"),
          view === 'horizontal' ? 
            React.createElement('button', { 
              onClick: () => handleGridNavigation('grid-view'), 
              className: getButtonClasses('grid-view') 
            }, "grid view") :
            React.createElement('button', { 
              onClick: view === 'detail' ? handleCloseDetail : () => handleViewChange('horizontal'), 
              className: "px-5 py-2 text-sm text-black border border-black rounded-full hover:bg-stone-100 transition-colors bg-white"
            }, view === 'detail' ? 'grid view' : 'close grid view')
        )
      )
    ),
    React.createElement(Footer)
  );
}

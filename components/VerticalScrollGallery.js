import React from 'react';
import { FLOWERS } from '../constants.js';

const FlowerCardContent = ({ flower, onClick }) => 
  React.createElement('button', { 
    onClick: onClick, 
    className: "w-full text-left flex flex-col h-[380px] p-6 bg-white hover:bg-stone-50 transition-colors" 
  },
    React.createElement('div', { className: "flex-grow flex items-center justify-center" },
      React.createElement('img', { 
        src: flower.imageUrl, 
        alt: flower.name, 
        className: "max-w-full max-h-full object-contain" 
      })
    ),
    React.createElement('div', { className: "flex justify-between items-center pt-4 mt-4" },
      React.createElement('p', { className: "text-lg", style: {color: '#0075c9'} }, flower.name),
      React.createElement('a', { 
        href: "#", 
        className: "italic text-lg text-black hover:underline", 
        onClick: (e) => e.stopPropagation() 
      }, "Explore")
    )
  );

const GridView = ({ onFlowerClick }) => {
  return React.createElement('div', { 
    className: "absolute inset-0 pt-36 pb-48 px-8 overflow-y-auto no-scrollbar" 
  },
    React.createElement('div', { 
      className: "grid grid-cols-3 border-l border-t", 
      style: {borderColor: '#854d2f'} 
    },
      FLOWERS.map(flower => 
        React.createElement('div', { 
          key: flower.id, 
          className: "border-r border-b", 
          style: {borderColor: '#854d2f'} 
        },
          React.createElement(FlowerCardContent, { 
            flower: flower, 
            onClick: () => onFlowerClick(flower) 
          })
        )
      )
    )
  );
};

export default GridView;

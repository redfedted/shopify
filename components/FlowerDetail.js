import React from 'react';

const ProductCard = ({ product }) => 
  React.createElement('div', { className: "relative group flex items-center justify-center" },
    React.createElement('img', { 
      src: product.imageUrl, 
      alt: product.name, 
      className: "max-w-full max-h-48 object-contain" 
    }),
    React.createElement('div', { className: "absolute bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" },
      React.createElement('span', { 
        className: "bg-white text-xs px-3 py-1 rounded-full shadow-md" 
      }, product.name)
    )
  );

const FlowerDetail = ({ flower }) => {
  return React.createElement('div', { className: "absolute inset-0 grid grid-cols-2 h-screen" },
    React.createElement('div', { className: "flex flex-col items-center justify-center p-8" },
      React.createElement('div', { className: "w-96 h-96 flex items-center justify-center" },
        React.createElement('img', { 
          src: flower.imageUrl, 
          alt: flower.name, 
          className: "max-w-full max-h-full object-contain" 
        })
      ),
      React.createElement('h2', { 
        className: "mt-8 italic text-5xl", 
        style: {color: '#581c3c'} 
      }, flower.name)
    ),
    React.createElement('div', { 
      className: "pt-36 pb-48 px-16 overflow-y-auto no-scrollbar", 
      style: {backgroundColor: '#FADADD'} 
    },
      React.createElement('h1', { 
        className: "text-8xl font-serif", 
        style: {color: '#581c3c'} 
      }, flower.name),
      React.createElement('p', { 
        className: "mt-6 text-lg", 
        style: {color: '#581c3c'} 
      }, flower.description),
      React.createElement('div', { className: "mt-12" },
        React.createElement('h3', { 
          className: "text-xl", 
          style: {color: '#581c3c'} 
        }, "Explore products"),
        React.createElement('div', { 
          className: "mt-4 grid grid-cols-2 border", 
          style: {borderColor: '#854d2f'} 
        },
          flower.products.map((product, index) => 
            React.createElement('div', { 
              key: product.id, 
              className: `p-4 ${index % 2 === 0 ? 'border-r' : ''}`, 
              style: {borderColor: '#854d2f'} 
            },
              React.createElement(ProductCard, { product: product })
            )
          )
        )
      )
    )
  );
};

export default FlowerDetail;

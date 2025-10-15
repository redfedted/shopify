import React from 'react';
import type { Flower, Product } from '../types';

interface FlowerDetailProps {
  flower: Flower;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <div className="relative group flex items-center justify-center">
    <img src={product.imageUrl} alt={product.name} className="max-w-full max-h-48 object-contain" />
    <div className="absolute bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <span className="bg-white text-xs px-3 py-1 rounded-full shadow-md">{product.name}</span>
    </div>
  </div>
);

const FlowerDetail: React.FC<FlowerDetailProps> = ({ flower }) => {
  return (
    <div className="absolute inset-0 grid grid-cols-2 h-screen">
      <div className="flex flex-col items-center justify-center p-8">
        <div className="w-96 h-96 flex items-center justify-center">
          <img src={flower.imageUrl} alt={flower.name} className="max-w-full max-h-full object-contain" />
        </div>
        <h2 className="mt-8 italic text-5xl" style={{color: '#581c3c'}}>{flower.name}</h2>
      </div>
      
      <div className="pt-36 pb-48 px-16 overflow-y-auto no-scrollbar" style={{backgroundColor: '#FADADD'}}>
          <h1 className="text-8xl font-serif" style={{color: '#581c3c'}}>{flower.name}</h1>
          <p className="mt-6 text-lg" style={{color: '#581c3c'}}>
            {flower.description}
          </p>

          <div className="mt-12">
            <h3 className="text-xl" style={{color: '#581c3c'}}>Explore products</h3>
            <div className="mt-4 grid grid-cols-2 border" style={{borderColor: '#854d2f'}}>
              {flower.products.map((product, index) => (
                <div key={product.id} className={`p-4 ${index % 2 === 0 ? 'border-r' : ''}`} style={{borderColor: '#854d2f'}}>
                    <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
      </div>
    </div>
  );
};

export default FlowerDetail;

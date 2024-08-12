import React from 'react';
import q1 from '../../assets/image/q1.jpg';
import q2 from '../../assets/image/q2.jpg';
import q3 from '../../assets/image/q3.jpg';
import q4 from '../../assets/image/q4.jpg';
import q5 from '../../assets/image/q5.jpg';
import q6 from '../../assets/image/q6.jpg';

const Galeri: React.FC = () => {
  const images: string[] = [q1, q2, q3, q4, q5, q6];

  return (
    <div className="p-4 max-w-screen-lg mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Galeri Kami</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((src, index) => (
          <div key={index} className="relative overflow-hidden rounded-lg shadow-lg">
            <img
              src={src}
              alt={`Image ${index + 1}`}
              className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Galeri;

import React from 'react';
import q1 from '../../assets/image/q1.jpg'
import q2 from '../../assets/image/q2.jpg'
import q3 from '../../assets/image/q3.jpg'
import q4 from '../../assets/image/q4.jpg'
import q5 from '../../assets/image/q5.jpg'
import q6 from '../../assets/image/q6.jpg'
import q7 from '../../assets/image/q7.jpg'


const Galeri: React.FC = () => {
  // Dummy image URLs for demonstration
  const images: string[] = [
    q1,
    q2,
    q3,
    q4,
    q5,
    q6,
    q7,
    
  ];

  return (
    <div className="p-4 max-w-screen-lg mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Galeri Kami</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((src, index) => (
          <div key={index} className="relative overflow-hidden rounded-lg shadow-lg">
            <img src={src} alt={`Image ${index + 1}`} className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Galeri;

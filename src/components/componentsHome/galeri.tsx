import { Box } from '@mui/material';
import React from 'react';

interface GaleriProps {
  fotoGaleri: string;
}

const Galeri: React.FC<GaleriProps> = ({ fotoGaleri }) => {
  return (
    <Box>
      <div className="relative overflow-hidden rounded-lg shadow-lg">
        <img
          style={{ height: "300px", width: "289px" }}
          src={fotoGaleri}
          alt="galeri"
          className="w-full h-auto object-cover transition-transform duration-500 transform hover:scale-105"
        />
      </div>
    </Box>
  );
}

export default Galeri;

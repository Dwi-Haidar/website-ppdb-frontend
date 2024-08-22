import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { motion } from 'framer-motion';
import a from '../assets/image/a.png';
import API from '../libs';
import Galeri from '../components/componentsHome/galeri';

interface FotoGaleri {
  fotoGaleri: string;
}
const About: React.FC = () => {
  const [foto, setFoto] = useState<FotoGaleri[]>([]);

  const getImage = async () => {
    try {
      const res = await API.get('galeri');
      setFoto(res.data.data);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  }

  useEffect(() => {
    getImage();
  }, []);

  return (
    <Box sx={{ width: '100%', backgroundColor: '#f9f9f9', py: 8 }}>
      <Box
        sx={{
          width: '100%',
          height: '600px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: `url(${a})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: 2,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          color: '#fff',
          textAlign: 'center',
          mb: 5,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: '600',
            fontFamily: 'Work Sans',
            mb: 3,
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
          }}
        >
          SMP Islam Karya Mukti
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontFamily: 'Work Sans',
            fontWeight: '400',
            color: '#fff',
            textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
          }}
        >
          Mencetak Generasi Unggul dengan Nilai Islami
        </Typography>
      </Box>

      <Container>


        {/* Visi dan Misi Sekolah */}
        <Box
          maxWidth="md"
          display="flex"
          flexDirection="column"
          textAlign="center"
          margin="auto"
          gap={4}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: '600',
                fontFamily: 'Work Sans',
                color: '#333',
                mb: 4,
              }}
            >
              Tentang Kami
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          >
            <Typography
              sx={{
                textAlign: 'justify',
                fontSize: '18px',
                fontWeight: '400',
                fontFamily: 'Work Sans',
                color: '#555',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                mb: 4,
                lineHeight: 1.7,
              }}
            >
              SMP Islam Karya Mukti adalah sekolah menengah pertama yang didirikan dengan tujuan untuk membentuk generasi muda yang berakhlak mulia, berprestasi, dan berwawasan luas. Berlandaskan nilai-nilai Islami, kami berkomitmen untuk memberikan pendidikan yang berkualitas dengan mengedepankan integrasi antara ilmu pengetahuan umum dan agama.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
          >
            <Typography
              sx={{
                textAlign: 'justify',
                fontSize: '18px',
                fontWeight: '400',
                fontFamily: 'Work Sans',
                color: '#555',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                mb: 4,
                lineHeight: 1.7,
              }}
            >
              Kami percaya bahwa setiap siswa memiliki potensi yang unik. Oleh karena itu, kami menyediakan berbagai program pendidikan dan ekstrakurikuler yang dirancang untuk mengembangkan keterampilan akademik, spiritual, dan sosial siswa. Dengan lingkungan belajar yang kondusif, guru-guru yang berpengalaman, serta fasilitas yang memadai, kami berusaha untuk menciptakan suasana belajar yang menyenangkan dan mendukung pertumbuhan karakter siswa.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}
          >
            <Typography
              sx={{
                textAlign: 'justify',
                fontSize: '18px',
                fontWeight: '400',
                fontFamily: 'Work Sans',
                color: '#555',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                mb: 4,
                lineHeight: 1.7,
              }}
            >
              SMP Islam Karya Mukti juga aktif dalam berbagai kegiatan sosial dan keagamaan, yang bertujuan untuk menanamkan rasa empati dan kepedulian terhadap sesama. Melalui pendekatan holistik dalam pendidikan, kami berharap dapat mencetak lulusan yang siap menghadapi tantangan zaman dengan iman yang kuat, ilmu yang mendalam, dan karakter yang baik.
            </Typography>
          </motion.div>


          <Box>
            <Typography variant="h4" sx={{ fontWeight: '600', fontFamily: 'Work Sans', color: '#333', mb: 2 }}>Galeri Kami</Typography>
            <Box display="flex" justifyContent="center" flexWrap="wrap" gap={2}>
              {foto.slice(0, 6).map((image, index) => (
                <Box key={index} display="flex">
                  <Galeri fotoGaleri={`http://localhost:5001/uploads/${image.fotoGaleri}`} />
                </Box>
              ))}
            </Box>
          </Box>
          
          <Box sx={{ width: '100%', mt: 10, backgroundColor: '#f9f9f9', py: 8 }}>
            <Box
              sx={{
                width: '100%',
                maxWidth: '1200px',
                margin: 'auto',
                px: 2,
                mb: 5
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: '600',
                  fontFamily: 'Work Sans',
                  color: '#333',
                  mb: 2,
                  textAlign: 'center'
                }}
              >
                Lokasi Kami
              </Typography>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '400px',
                  overflow: 'hidden',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.2864634561556!2d106.86907377441364!3d-6.485360763406607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c046ae7c429d%3A0x5e236c619c82b96f!2sSMP%20Islam%20Karya%20Mukti!5e0!3m2!1sid!2sid!4v1724304121308!5m2!1sid!2sid"
                  style={{ border: 0, width: '100%', height: '100%' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </Box>
            </Box>
          </Box>

          {/* Testimoni */}
          <Box sx={{ mb: 5 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: '600',
                fontFamily: 'Work Sans',
                color: '#333',
                mb: 2,
              }}
            >
              Testimoni
            </Typography>
            <Typography
              sx={{
                textAlign: 'justify',
                fontSize: '16px',
                fontWeight: '400',
                fontFamily: 'Work Sans',
                color: '#555',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                lineHeight: 1.7,
              }}
            >
              "SMP Islam Karya Mukti telah memberikan pengalaman belajar yang luar biasa bagi anak saya. Kurikulum yang seimbang dan perhatian individual dari guru-guru membuat anak kami berkembang dengan pesat." - Bapak Ahmad, Orang Tua Siswa
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default About;

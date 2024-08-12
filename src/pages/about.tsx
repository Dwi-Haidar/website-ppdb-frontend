import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <Box sx={{ width: '100%', mt: 15 }}>
      <Box 
        width="80%" 
        display={'flex'} 
        flexDirection={'column'} 
        textAlign={'center'} 
        margin={'auto'} 
        gap={4}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Typography 
            sx={{ 
              textAlign: 'justify', 
              fontSize: '18px', 
              fontWeight: '400', 
              fontFamily: 'Work Sans',
              color: 'black',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
              mb: 2
            }}
          >
            SMP Islam Karya Mukti adalah sekolah menengah pertama yang didirikan dengan tujuan untuk membentuk generasi muda yang berakhlak mulia, berprestasi, dan berwawasan luas. Berlandaskan nilai-nilai Islami, kami berkomitmen untuk memberikan pendidikan yang berkualitas dengan mengedepankan integrasi antara ilmu pengetahuan umum dan agama.
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
              color: 'black',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
              mb: 2
            }}
          >
            Kami percaya bahwa setiap siswa memiliki potensi yang unik. Oleh karena itu, kami menyediakan berbagai program pendidikan dan ekstrakurikuler yang dirancang untuk mengembangkan keterampilan akademik, spiritual, dan sosial siswa. Dengan lingkungan belajar yang kondusif, guru-guru yang berpengalaman, serta fasilitas yang memadai, kami berusaha untuk menciptakan suasana belajar yang menyenangkan dan mendukung pertumbuhan karakter siswa.
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
              color: 'black',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
              mb: 2
            }}
          >
            SMP Islam Karya Mukti juga aktif dalam berbagai kegiatan sosial dan keagamaan, yang bertujuan untuk menanamkan rasa empati dan kepedulian terhadap sesama. Melalui pendekatan holistik dalam pendidikan, kami berharap dapat mencetak lulusan yang siap menghadapi tantangan zaman dengan iman yang kuat, ilmu yang mendalam, dan karakter yang baik.
          </Typography>
        </motion.div>
      </Box>
    </Box>
  );
};

export default About;

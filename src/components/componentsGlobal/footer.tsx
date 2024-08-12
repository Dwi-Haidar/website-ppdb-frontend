import React from 'react';
import { motion } from 'framer-motion';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import LogoSekolah from "../../assets/image/logosekolah.png"
import Maps from '../componentsHome/maps';
import { Image } from '@mui/icons-material';

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-700 text-white py-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          <div className="mb-8 md:mb-0 text-gray-100">
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
              <motion.h4
                className="text-3xl font-extrabold mb-6 text-white"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                SMP Islam Karya Mukti

              </motion.h4>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div style={{ width: "100%", display: "flex", justifyContent: "center", }}>
                <img src={LogoSekolah} alt="Logo Sekolah" style={{ width: 200, height: 200 }} />
              </div>
            </motion.div>
          </div>
          <div className="text-gray-100">
            <motion.h4
              className="text-3xl font-extrabold mb-6 text-white"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Kontak Kami
            </motion.h4>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="flex items-center mb-3 text-gray-200">
                <MailOutlineIcon className="mr-2" /> <span className="font-semibold">Email:</span>
                <a href="mailto:info@smpkaryamukti.sch.id" className="underline text-gray-200 hover:text-white transition-colors duration-300">info@smpkaryamukti.sch.id</a>
              </p>
              <p className="flex items-center mb-3 text-gray-200">
                <PhoneInTalkIcon className="mr-2" /> <span className="font-semibold">Telepon:</span> (0251) 1234567
              </p>
              <p className="flex items-center text-gray-200">
                <span className="font-semibold">Alamat:</span> Jl. Mayor Oking Jayaatmaja Citereup-Bogor
              </p>
              <Maps />
            </motion.div>
          </div>
        </div>
        <motion.div
          className="mt-12 text-center text-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-lg">&copy; {new Date().getFullYear()} SMP Islam Karya Mukti. All rights reserved.</p>
        </motion.div>

      </div>
    </footer>
  );
};

export default Footer;

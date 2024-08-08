import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-600 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Informasi Sekolah */}
          <div className="mb-6 md:mb-0 text-gray-100">
            <h4 className="text-2xl font-bold mb-4 text-white">SMP Islam Karya Mukti</h4>
            <p className="mb-2 text-gray-200"><span className="font-semibold">Kepala Sekolah:</span> Endang Wahyuti S.Pd</p>
            <p className="mb-2 text-gray-200"><span className="font-semibold">NPSN:</span> 20231081</p>
            <p className="mb-2 text-gray-200"><span className="font-semibold">Status:</span> Swasta</p>
            <p className="mb-2 text-gray-200"><span className="font-semibold">Bentuk Pendidikan:</span> SMP</p>
            <p className="mb-2 text-gray-200"><span className="font-semibold">Alamat:</span> Jl. Mayor Oking Jayaatmaja Citereup-Bogor</p>
            <p className="mb-2 text-gray-200"><span className="font-semibold">Status Kepemilikan:</span> Yayasan</p>
            <p className="mb-2 text-gray-200"><span className="font-semibold">SK Pendirian Sekolah:</span> 421.3/2829-Disdik/05</p>
            <p className="mb-2 text-gray-200"><span className="font-semibold">Tanggal SK Pendirian:</span> 2005-06-27</p>
            <p className="mb-2 text-gray-200"><span className="font-semibold">SK Izin Operasional:</span> 421.3/2829-DISDIK/05</p>
            <p className="text-gray-200"><span className="font-semibold">Tanggal SK Izin Operasional:</span> 2005-06-27</p>
          </div>
          {/* Kontak Kami */}
          <div className="text-gray-100">
            <h4 className="text-2xl font-bold mb-4 text-white">Kontak Kami</h4>
            <p className="mb-2 text-gray-200"><span className="font-semibold">Email:</span> <a href="mailto:info@smpkaryamukti.sch.id" className="underline text-gray-200">info@smpkaryamukti.sch.id</a></p>
            <p className="mb-2 text-gray-200"><span className="font-semibold">Telepon:</span> (0251) 1234567</p>
            <p className="mb-2 text-gray-200"><span className="font-semibold">Website:</span> <a href="http://smpkaryamukti.sch.id" className="underline text-gray-200" target="_blank" rel="noopener noreferrer">smpkaryamukti.sch.id</a></p>
            <p className="text-gray-200"><span className="font-semibold">Alamat:</span> Jl. Mayor Oking Jayaatmaja Citereup-Bogor</p>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-200">
          <p>&copy; {new Date().getFullYear()} SMP Islam Karya Mukti. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Data {
  id: number;
  nama: string;
  nisn: string;
  ttl: string;
  nik: string;
  noKK: string;
  alamat: string;
  namaAyah: string;
  tahunLahirAyah: string;
  pendidikanAyah: string;
  pekerjaanAyah: string;
  namaIbu: string;
  tahunLahirIbu: string;
  pendidikanIbu: string;
  pekerjaanIbu: string;
  alamatOrtu: string;
  noTelp: string;
}

const EditKelulusan: React.FC = () => {
  const [data, setData] = useState<Data | null>(null);
  const [kelulusan, setKelulusan] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/ppdb/1');
        setData(response.data.data); // Mengambil data dari response.data.data
        setKelulusan(response.data.data.status === 'Lulus'); // Misalnya status disimpan di data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKelulusan(event.target.checked);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.put('http://localhost:5000/ppdb/1', {
        ...data,
        status: kelulusan ? 'Lulus' : 'Tidak Lulus',
      });
      alert('Status kelulusan berhasil diperbarui!');
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      {data ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="text-3xl font-bold mb-4">Edit Kelulusan</h1>
          
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex justify-between items-center border-b py-2">
                <span className="font-semibold">ID:</span>
                <span className="text-gray-700">{data.id}</span>
              </div>
              <div className="flex justify-between items-center border-b py-2">
                <span className="font-semibold">Nama:</span>
                <span className="text-gray-700">{data.nama}</span>
              </div>
              <div className="flex justify-between items-center border-b py-2">
                <span className="font-semibold">NISN:</span>
                <span className="text-gray-700">{data.nisn}</span>
              </div>
              <div className="flex justify-between items-center border-b py-2">
                <span className="font-semibold">TTL:</span>
                <span className="text-gray-700">{data.ttl}</span>
              </div>
              <div className="flex justify-between items-center border-b py-2">
                <span className="font-semibold">NIK:</span>
                <span className="text-gray-700">{data.nik}</span>
              </div>
              <div className="flex justify-between items-center border-b py-2">
                <span className="font-semibold">No KK:</span>
                <span className="text-gray-700">{data.noKK}</span>
              </div>
              <div className="flex justify-between items-center border-b py-2">
                <span className="font-semibold">Alamat:</span>
                <span className="text-gray-700">{data.alamat}</span>
              </div>
              <div className="flex justify-between items-center border-b py-2">
                <span className="font-semibold">Nama Ayah:</span>
                <span className="text-gray-700">{data.namaAyah}</span>
              </div>
              <div className="flex justify-between items-center border-b py-2">
                <span className="font-semibold">Tahun Lahir Ayah:</span>
                <span className="text-gray-700">{data.tahunLahirAyah}</span>
              </div>
              <div className="flex justify-between items-center border-b py-2">
                <span className="font-semibold">Pendidikan Ayah:</span>
                <span className="text-gray-700">{data.pendidikanAyah}</span>
              </div>
              <div className="flex justify-between items-center border-b py-2">
                <span className="font-semibold">Pekerjaan Ayah:</span>
                <span className="text-gray-700">{data.pekerjaanAyah}</span>
              </div>
              <div className="flex justify-between items-center border-b py-2">
                <span className="font-semibold">Nama Ibu:</span>
                <span className="text-gray-700">{data.namaIbu}</span>
              </div>
              <div className="flex justify-between items-center border-b py-2">
                <span className="font-semibold">Tahun Lahir Ibu:</span>
                <span className="text-gray-700">{data.tahunLahirIbu}</span>
              </div>
              <div className="flex justify-between items-center border-b py-2">
                <span className="font-semibold">Pendidikan Ibu:</span>
                <span className="text-gray-700">{data.pendidikanIbu}</span>
              </div>
              <div className="flex justify-between items-center border-b py-2">
                <span className="font-semibold">Pekerjaan Ibu:</span>
                <span className="text-gray-700">{data.pekerjaanIbu}</span>
              </div>
              <div className="flex justify-between items-center border-b py-2">
                <span className="font-semibold">Alamat Ortu:</span>
                <span className="text-gray-700">{data.alamatOrtu}</span>
              </div>
              <div className="flex justify-between items-center border-b py-2">
                <span className="font-semibold">No Telp:</span>
                <span className="text-gray-700">{data.noTelp}</span>
              </div>
            </div>
            <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="lulus"
                  name='kelulusan'
                  
                  className="mr-2"
                />
                <label htmlFor="lulus" className="font-semibold">Lulus</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="tidaklulus"
                   name='kelulusan'
                  className="mr-2"
                />
                <label htmlFor="tidaklulus" className="font-semibold">Tidak Lulus</label>
              </div>
          </div>
          <div className='flex w-full justify-end'>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Simpan
            </button>
          </div>
          
        </form>
      ) : (
        <p className="text-gray-500">Loading...</p>
      )}
    </div>
  );
};

export default EditKelulusan;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
  status?: boolean;
}

const EditKelulusan: React.FC = () => {
  const [data, setData] = useState<Data | null>(null);
  const [kelulusan, setKelulusan] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>(); // Mengambil id dari URL params
  const numericId = id ? Number(id) : 0; // Konversi id ke number
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/ppdb/${numericId}`);
        if (response.data && response.data.data) {
          setData(response.data.data);
          setKelulusan(response.data.data.status ?? false);
        } else {
          console.error('Data tidak ditemukan');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [numericId]);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKelulusan(event.target.value === 'true');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Sending data:', {
      ppdbId: numericId,
      statusKelulusan: kelulusan,
    });
    try {
      await axios.post(`http://localhost:5000/kelulusan`, {
        ppdbId: numericId,
        statusKelulusan: kelulusan,
      });
      console.log('Data berhasil dikirim!');
      alert('Status kelulusan berhasil diperbarui!');
      window.location.href = '/admin/ppdb-data';
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      console.error('Error updating status:', errorMessage);
      alert(`Error updating status: ${errorMessage}`);
    }
  };
  
  return (
    <div className="container mx-auto p-6">
      {data ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="text-3xl font-bold mb-4">Edit Kelulusan</h1>
          
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Displaying data in a grid */}
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
                name="kelulusan"
                value="true"
                checked={kelulusan === true}
                onChange={handleRadioChange}
                className="mr-2"
              />
              <label htmlFor="lulus" className="font-semibold">Lulus</label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="tidaklulus"
                name="kelulusan"
                value="false"
                checked={kelulusan === false}
                onChange={handleRadioChange}
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
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditKelulusan;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import axios from "axios";

// Define type for ppdb data
interface PpdbData {
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
  createdAt: string;
  updatedAt: string;
  image: string[]; // Assuming image is an array of image URLs
  Kelulusan?: number;
  lulus?: boolean;
}

const PpdbDataTable: React.FC = () => {
  const [ppdbData, setPpdbData] = useState<PpdbData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ status: boolean; message: string; data: PpdbData[] }>(
          'http://localhost:5000/ppdb'
        );
        setPpdbData(response.data.data); // Access 'data' property from the response
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!Array.isArray(ppdbData)) {
    console.error("ppdbData is not an array");
    return null;
  }

  const currentItems = ppdbData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <div className="overflow-x-auto w-[70%] mb-4">
        <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-200">
          <thead>
            <tr>
            <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700 w-[14%]">Kelulusan</th>
              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700 w-[10%]">Foto</th>
              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700 w-[14%]">Nama Lengkap</th>
              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700 w-[10%]">NISN</th>
              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700 w-[20%]">Tempat, Tanggal Lahir</th>
              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700 w-[12%]">NIK</th>
              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700 w-[12%]">No. KK</th>
              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700 w-[22%]">Alamat</th>
              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700 w-[14%]">Nama Ayah</th>
              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700 w-[14%]">Tahun Lahir Ayah</th>
              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700 w-[14%]">Pendidikan Ayah</th>
              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700 w-[20%]">Pekerjaan Ayah</th>
              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700 w-[14%]">Nama Ibu</th>
              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700 w-[14%]">Tahun Lahir Ibu</th>
              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700 w-[14%]">Pendidikan Ibu</th>
              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700 w-[20%]">Pekerjaan Ibu</th>
              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700 w-[22%]">Alamat Orang Tua</th>
              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700 w-[14%]">No. Telepon</th>
           
              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700 w-[14%]">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((data, index) => (
              <tr key={index}>
                
                <td className="py-3 px-4 border-b text-sm text-gray-700 whitespace-nowrap">
                  {data.Kelulusan ? (
                    data.lulus === true ? "Lulus" : "Tidak Lulus"
                  ) : (
                    "Belum Dikonfirmasi"
                  )}
                </td>
                <td className="py-3 px-4 border-b text-sm text-gray-700 whitespace-nowrap">
                  {data.image && data.image.length > 0 ? (
                    <img src={data.image[0]} alt="Foto Siswa" className="w-16 h-16 object-cover rounded-full" />
                  ) : (
                    <span>Tidak ada foto</span>
                  )}
                </td>
                
                <td className="py-3 px-4 border-b text-sm text-gray-700 whitespace-nowrap">{data.nama}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700 whitespace-nowrap">{data.nisn}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700 whitespace-nowrap">{data.ttl}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700 whitespace-nowrap">{data.nik}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700 whitespace-nowrap">{data.noKK}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700 whitespace-nowrap">{data.alamat}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700 whitespace-nowrap">{data.namaAyah}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700 whitespace-nowrap">{data.tahunLahirAyah}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700 whitespace-nowrap">{data.pendidikanAyah}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700 whitespace-nowrap">{data.pekerjaanAyah}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700 whitespace-nowrap">{data.namaIbu}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700 whitespace-nowrap">{data.tahunLahirIbu}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700 whitespace-nowrap">{data.pendidikanIbu}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700 whitespace-nowrap">{data.pekerjaanIbu}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700 whitespace-nowrap">{data.alamatOrtu}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700 whitespace-nowrap">{data.noTelp}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700 whitespace-nowrap">
                  <Link
                    to={`edit/${data.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Konfirmasi
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <ReactPaginate
          pageCount={Math.ceil(ppdbData.length / itemsPerPage)}
          onPageChange={handlePageClick}
          containerClassName="pagination flex justify-center"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          nextClassName="page-item"
          previousLinkClassName="page-link"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          activeClassName="active"
        />
      </div>
    </div>
  );
};

export default PpdbDataTable;

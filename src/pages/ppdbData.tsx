import { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

// Define type for ppdb data
interface PpdbData {
  id: number;
  nama: string;
  nisn: string;
  ttl: string;
  nik: string;
  noKK: string;
  alamat: string;
  alamatOrtu: string;
  namaAyah: string;
  tahunLahirAyah: string;
  pendidikanAyah: string;
  pekerjaanAyah: string;
  namaIbu: string;
  tahunLahirIbu: string;
  pendidikanIbu: string;
  pekerjaanIbu: string;
  noTelp: string;
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;
  image: string[]; // Assuming image is an array of image URLs
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
              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700">Foto</th>
              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700">Nama Lengkap</th>
              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700">NISN</th>
              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700">Tempat, Tanggal Lahir</th>
              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700">NIK</th>
              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700">No. KK</th>
              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700">Alamat</th>
              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700">Alamat Ortu</th>
              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700">Nama Ayah</th>
              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700">Tahun Lahir Ayah</th>
              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700">Pendidikan Ayah</th>
              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700">Pekerjaan Ayah</th>
              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700">Nama Ibu</th>
              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700">Tahun Lahir Ibu</th>
              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700">Pendidikan Ibu</th>
              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700">Pekerjaan Ibu</th>
              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700">No. Telepon</th>
              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700">Kelulusan</th>
              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((data) => (
              <tr key={data.id}>
                <td className="py-3 px-4 border-b text-sm text-gray-700">
                  {data.image.length > 0 ? (
                    <img src={data.image[0]} alt="Foto Siswa" className="w-16 h-16 object-cover rounded-full" />
                  ) : (
                    <span>Tidak ada foto</span>
                  )}
                </td>
                <td className="py-3 px-4 border-b text-sm text-gray-700">{data.nama}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700">{data.nisn}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700">{data.ttl}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700">{data.nik}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700">{data.noKK}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700">{data.alamat}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700">{data.alamatOrtu}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700">{data.namaAyah}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700">{data.tahunLahirAyah}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700">{data.pendidikanAyah}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700">{data.pekerjaanAyah}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700">{data.namaIbu}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700">{data.tahunLahirIbu}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700">{data.pendidikanIbu}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700">{data.pekerjaanIbu}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700">{data.noTelp}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700">
                  {data.isPaid ? "lulus" : "tidak lulus"}
                </td>
                <td className="py-3 px-4 border-b text-sm text-gray-700">
                  <Link to={`edit/${data.id}`} className="text-blue-600 hover:underline">edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        pageCount={Math.ceil(ppdbData.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'}
        activeClassName={'active'}
      />
    </div>
  );
};

export default PpdbDataTable;

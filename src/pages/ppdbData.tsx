import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import axios from "axios";

// Define type for ppdb data
interface PpdbData {
  statusKeputusan: boolean;
  namaLengkap: string;
  nisn: string;
  tempatTanggalLahir: string;
  nik: string;
  noKk: string;
  alamat: string;
  namaAyah: string;
  tahunLahirAyah: string;
  pendidikanAyah: string;
  pekerjaanAyah: string;
  namaIbu: string;
  tahunLahirIbu: string;
  pendidikanIbu: string;
  pekerjaanIbu: string;
  alamatOrangTua: string;
  noTelepon: string;
}

const PpdbDataTable: React.FC = () => {
  const [ppdbData, setPpdbData] = useState<PpdbData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<PpdbData[]>('http://localhost:5000/ppdb');
        setPpdbData(response.data);
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
              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700 w-[14%]">Status Kelulusan</th>
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
                <td
                  className={`py-3 px-4 border-b text-sm text-gray-700 whitespace-nowrap ${
                    data.statusKeputusan ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {data.statusKeputusan ? "Lulus" : "Belum Lulus"}
                </td>
                <td className="py-3 px-4 border-b text-sm text-gray-700 whitespace-nowrap">{data.namaLengkap}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700 whitespace-nowrap">{data.nisn}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700 whitespace-nowrap">{data.tempatTanggalLahir}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700 whitespace-nowrap">{data.nik}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700 whitespace-nowrap">{data.noKk}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700 whitespace-nowrap">{data.alamat}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700 whitespace-nowrap">{data.namaAyah}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700 whitespace-nowrap">{data.tahunLahirAyah}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700 whitespace-nowrap">{data.pendidikanAyah}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700 whitespace-nowrap">{data.pekerjaanAyah}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700 whitespace-nowrap">{data.namaIbu}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700 whitespace-nowrap">{data.tahunLahirIbu}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700 whitespace-nowrap">{data.pendidikanIbu}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700 whitespace-nowrap">{data.pekerjaanIbu}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700 whitespace-nowrap">{data.alamatOrangTua}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700 whitespace-nowrap">{data.noTelepon}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700 whitespace-nowrap">
                  <Link to={`/edit/${data.nisn}`} className="text-blue-600 hover:text-blue-800">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <ReactPaginate
          pageCount={Math.ceil(ppdbData.length / itemsPerPage)}
          onPageChange={handlePageClick}
          containerClassName="pagination"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
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

import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";

// Tipe data untuk PPDB
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
  Kelulusan?: {
    // Optional to handle cases where it's not present
    id: number;
    createdAt: string;
    ppdbId: number;
    statusKelulusan: boolean;
    updatedAt: string;
  };
}

const Pengumuman: React.FC = () => {
  const [ppdbData, setPpdbData] = useState<PpdbData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 5;
  console.log(ppdbData);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{
          status: boolean;
          message: string;
          data: PpdbData[];
        }>(`${process.env.BACKEND_URL}/ppdb`);
        setPpdbData(response.data.data); // Access 'data' property from the response
        setError(null); // Clear any previous error
      } catch (error) {
        setError("Error fetching data. Please try again later.");
        console.error("Error fetching data:", error);
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
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="overflow-x-auto w-[70%] mb-4">
        <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-200">
          <thead>
            <tr>
              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700">
                Foto
              </th>
              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700">
                Nama Lengkap
              </th>
              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700">
                NISN
              </th>
              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700">
                Tempat, Tanggal Lahir
              </th>

              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700">
                Alamat
              </th>

              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700">
                Nama Ayah
              </th>

              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700">
                Nama Ibu
              </th>

              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700">
                Kelulusan
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((data) => (
                <tr key={data.id}>
                  <td className="py-3 px-4 border-b text-sm text-gray-700">
                    {data.image.length > 0 ? (
                      <img
                        src={data.image[0]}
                        alt="Foto Siswa"
                        className="w-16 h-16 object-cover rounded-full"
                      />
                    ) : (
                      <span>Tidak ada foto</span>
                    )}
                  </td>
                  <td className="py-3 px-4 border-b text-sm text-gray-700">
                    {data.nama}
                  </td>
                  <td className="py-3 px-4 border-b text-sm text-gray-700">
                    {data.nisn}
                  </td>
                  <td className="py-3 px-4 border-b text-sm text-gray-700">
                    {data.ttl}
                  </td>

                  <td className="py-3 px-4 border-b text-sm text-gray-700">
                    {data.alamat}
                  </td>

                  <td className="py-3 px-4 border-b text-sm text-gray-700">
                    {data.pekerjaanAyah}
                  </td>

                  <td className="py-3 px-4 border-b text-sm text-gray-700">
                    {data.noTelp}
                  </td>
                  <td className="py-3 px-4 border-b text-sm text-gray-700">
                    {data.Kelulusan?.statusKelulusan ? "Lulus" : "Tidak Lulus"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={18}
                  className="py-3 px-4 border-b text-sm text-gray-700 text-center"
                >
                  Tidak ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ReactPaginate
        pageCount={Math.ceil(ppdbData.length / itemsPerPage)}
        onPageChange={handlePageClick}
        containerClassName="pagination flex justify-center"
        pageClassName="page-item"
        pageLinkClassName="page-link px-4 py-2 border border-gray-300 rounded-md"
        activeClassName="active"
        activeLinkClassName="bg-blue-500 text-white"
        previousClassName="previous-page"
        nextClassName="next-page"
        previousLinkClassName="page-link px-4 py-2 border border-gray-300 rounded-md"
        nextLinkClassName="page-link px-4 py-2 border border-gray-300 rounded-md"
      />
    </div>
  );
};

export default Pengumuman;

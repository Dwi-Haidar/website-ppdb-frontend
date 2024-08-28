import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { PpdbData } from "../types/types";
import API from "../libs";

const PpdbDataTable: React.FC = () => {
  const [ppdbData, setPpdbData] = useState<PpdbData[]>([]);
  const [searchnisn, setSearchnisn] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 5;
  console.log(ppdbData);

  const postEmail = async (emailToPost: string) => {
    try {
      const res = await API.post("sendEmail", { email: emailToPost });
      console.log("Email sent successfully:", res.data);
    } catch (error) {
      console.error("Error sending email:", error);
      setError("Error sending email. Please try again later.");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get<{
          status: boolean;
          message: string;
          data: PpdbData[];
        }>("ppdb");

        setPpdbData(response.data.data);
        setError(null);
      } catch (error) {
        setError("Error fetching data. Please try again later.");
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredData = ppdbData.filter((data) =>
    data.nisn ? data.nisn.toLowerCase().includes(searchnisn.toLowerCase()) : false
  );

  const currentItems = ppdbData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  return (
    <Box className="flex flex-col items-center mt-10">
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="overflow-x-auto w-[96%] mb-4">
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Data Calon Siswa</Typography>
        </Box>
        <table className="min-w-full bg-white shadow-md rounded-lg border border-black-200">
          <thead>
            <tr>
              <th className="py-1 px-4 bg-gray-100 border border-gray-400 text-left text-sm font-medium text-gray-700 ">
                Foto Murid
              </th>
              <th className="py-1 px-4 bg-gray-100 border border-gray-400 text-left text-sm font-medium text-gray-700 ">
                Foto Bukti
              </th>
              <th className="py-1 px-4 bg-gray-100 border border-gray-400 text-left text-sm font-medium text-gray-700">
                Nama Lengkap
              </th>
              <th className="py-1  px-4 bg-gray-100 border border-gray-400 text-left text-sm font-medium text-gray-700">
                NISN
              </th>
              <th className="py-1 px-4 bg-gray-100 border border-gray-400 text-left text-sm font-medium text-gray-700">
                Tempat
              </th>
              <th className="py-1 px-4 bg-gray-100 border border-gray-400 text-left text-sm font-medium text-gray-700">
                Tanggal Lahir
              </th>
              <th className="py-1 px-4 bg-gray-100 border border-gray-400 text-left text-sm font-medium text-gray-700">
                NIK
              </th>
              <th className="py-1 px-4 bg-gray-100 border border-gray-400 text-left text-sm font-medium text-gray-700">
                No. KK
              </th>
              <th className="py-1 px-4 bg-gray-100 border border-gray-400 text-left text-sm font-medium text-gray-700">
                Alamat
              </th>
              <th className="py-1 px-4 bg-gray-100 border border-gray-400 text-left text-sm font-medium text-gray-700">
                Alamat Ortu
              </th>
              <th className="py-1 px-4 bg-gray-100 border border-gray-400 text-left text-sm font-medium text-gray-700">
                Nama Ayah
              </th>
              <th className="py-1 px-4 bg-gray-100 border border-gray-400 text-left text-sm font-medium text-gray-700">
                Tahun Lahir Ayah
              </th>
              <th className="py-1 px-4 bg-gray-100 border border-gray-400 text-left text-sm font-medium text-gray-700">
                Pendidikan Ayah
              </th>
              <th className="py-1 px-4 bg-gray-100 border border-gray-400 text-left text-sm font-medium text-gray-700">
                Pekerjaan Ayah
              </th>
              <th className="py-1 px-4 bg-gray-100 border border-gray-400 text-left text-sm font-medium text-gray-700">
                Nama Ibu
              </th>
              <th className="py-1 px-4 bg-gray-100 border border-gray-400 text-left text-sm font-medium text-gray-700">
                Tahun Lahir Ibu
              </th>
              <th className="py-1 px-4 bg-gray-100 border border-gray-400 text-left text-sm font-medium text-gray-700">
                Pendidikan Ibu
              </th>
              <th className="py-1 px-4 bg-gray-100 border border-gray-400 text-left text-sm font-medium text-gray-700">
                Pekerjaan Ibu
              </th>
              <th className="py-1 px-4 bg-gray-100 border border-gray-400 text-left text-sm font-medium text-gray-700">
                No. Telepon
              </th>
              <th className="py-1 px-4 bg-gray-100 border border-gray-400 text-left text-sm font-medium text-gray-700">
                Status Murid
              </th>
              <th className="py-1 px-4 bg-gray-100 border border-gray-400 text-left text-sm font-medium text-gray-700">
                Status Pembayaran
              </th>
              <th className="py-1 px-4 bg-gray-100 border border-gray-400 text-left text-sm font-medium text-gray-700">
                Status Pembayaran Form
              </th>
              <th className="py-1 px-4 bg-gray-100 border border-gray-400 text-left text-sm font-medium text-gray-700">
                Email
              </th>
              <th className="py-1 px-4 bg-gray-100 border border-gray-400 text-left text-sm font-medium text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((data) => (
                <tr key={data.id}>
                  <td className="py-1 px-4 border-b text-sm text-gray-700 border border-gray-400">
                    <img
                      src={`http://localhost:5001/uploads/${data.fotoMurid}`}
                      alt="foto"
                      style={{ width: "30px", height: "30px" }}
                    />
                  </td>

                  <td className="py-1 px-4 border-b text-sm text-gray-700 border border-gray-400">
                    <img
                      src={`http://localhost:5001/uploads/${data.fotoBukti}`}
                      alt="foto"
                      style={{ width: "30px", height: "30px" }}
                    />
                  </td>
                  <td className="py-1 px-4 border border-gray-400 text-sm text-gray-700">
                    {data.nama}
                  </td>
                  <td className="py-1 px-4 border border-gray-400 text-sm text-gray-700">
                    {data.nisn}
                  </td>
                  <td className="py-1 px-4 border border-gray-400 text-sm text-gray-700">
                    {data.tempat}
                  </td>
                  <td className="py-1 px-4 border border-gray-400 text-sm text-gray-700">
                    {data.ttl}
                  </td>
                  <td className="py-1 px-4 border border-gray-400 text-sm text-gray-700">
                    {data.nik}
                  </td>
                  <td className="py-1 px-4 border border-gray-400 text-sm text-gray-700">
                    {data.noKK}
                  </td>
                  <td className="py-1 px-4 border border-gray-400 text-sm text-gray-700">
                    {data.alamat}
                  </td>
                  <td className="py-1 px-4 border border-gray-400 text-sm text-gray-700">
                    {data.alamatOrtu}
                  </td>
                  <td className="py-1 px-4 border border-gray-400 text-sm text-gray-700">
                    {data.namaAyah}
                  </td>
                  <td className="py-1 px-4 border border-gray-400 text-sm text-gray-700">
                    {data.tahunLahirAyah}
                  </td>
                  <td className="py-1 px-4 border border-gray-400 text-sm text-gray-700">
                    {data.pendidikanAyah}
                  </td>
                  <td className="py-1 px-4 border border-gray-400 text-sm text-gray-700">
                    {data.pekerjaanAyah}
                  </td>
                  <td className="py-1 px-4 border border-gray-400 text-sm text-gray-700">
                    {data.namaIbu}
                  </td>
                  <td className="py-1 px-4 border border-gray-400 text-sm text-gray-700">
                    {data.tahunLahirIbu}
                  </td>
                  <td className="py-1 px-4 border border-gray-400 text-sm text-gray-700">
                    {data.pendidikanIbu}
                  </td>
                  <td className="py-1 px-4 border border-gray-400 text-sm text-gray-700">
                    {data.pekerjaanIbu}
                  </td>

                  <td className="py-1 px-4 border border-gray-400 text-sm text-gray-700">
                    {data.noTelp}
                  </td>
                  <td className="py-1 px-4 border border-gray-400 text-sm text-gray-700">
                    {data.Kelulusan
                      ? data.Kelulusan.statusKelulusan
                        ? "Diterima"
                        : "Ditolak"
                      : "Belum Diproses"}
                  </td>
                  <td className="py-1 px-4 border border-gray-400 text-sm text-gray-700">
                    {data.isPaid ? "Paid" : "Unpaid"}
                  </td>
                  <td className="py-1 px-4 border border-gray-400 text-sm text-gray-700">
                    {data.isVerified ? "sudah bayar" : "belum bayar"}
                  </td>
                  <td className="py-1 px-4 border border-gray-400 text-sm text-gray-700">
                    {data.email}
                  </td>
                  <td className="py-1 px-4 border border-gray-400 text-sm text-gray-700">
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "center",
                      }}
                    >
                      <Link
                        to={`edit/${data.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </Link>
                      <Button
                        sx={{ fontSize: "11px", color: "green" }}
                        onClick={() => postEmail(data.email)}
                      >
                        Send Email
                      </Button>
                    </Box>
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
    </Box>
  );
};

export default PpdbDataTable;

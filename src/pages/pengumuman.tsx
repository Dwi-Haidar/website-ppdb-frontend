
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useState } from "react";

const pengumuman = () => {
    const ppdbDummyData = [
        {
          statusKeputusan: false,
          namaLengkap: "Ayu Lestari",
          nisn: "0987654321",
          tempatTanggalLahir: "Bandung, 15 Mei 2010",
          nik: "6543210987654321",
          noKk: "6543210987654321",
          alamat: "Jl. Sudirman No. 456, Bandung",
          namaAyah: "Andi Wirawan",
          tahunLahirAyah: "1970",
          pendidikanAyah: "SMA",
          pekerjaanAyah: "Wiraswasta",
          namaIbu: "Nurul Hidayah",
          tahunLahirIbu: "1975",
          pendidikanIbu: "D3",
          pekerjaanIbu: "Guru",
          alamatOrangTua: "Jl. Sudirman No. 456, Bandung",
          noTelepon: "081298765432"
        },
        {
          statusKeputusan: true,
          namaLengkap: "Budi Santoso",
          nisn: "1234567890",
          tempatTanggalLahir: "Jakarta, 20 April 2010",
          nik: "1234567890123456",
          noKk: "1234567890123456",
          alamat: "Jl. Merdeka No. 123, Jakarta",
          namaAyah: "Samsul Arifin",
          tahunLahirAyah: "1972",
          pendidikanAyah: "S1",
          pekerjaanAyah: "Pegawai Negeri",
          namaIbu: "Lestari Dewi",
          tahunLahirIbu: "1976",
          pendidikanIbu: "SMA",
          pekerjaanIbu: "Ibu Rumah Tangga",
          alamatOrangTua: "Jl. Merdeka No. 123, Jakarta",
          noTelepon: "081234567890"
        },
        {
          statusKeputusan: false,
          namaLengkap: "Citra Anjani",
          nisn: "9876543210",
          tempatTanggalLahir: "Surabaya, 10 Maret 2010",
          nik: "0987654321098765",
          noKk: "0987654321098765",
          alamat: "Jl. Pahlawan No. 789, Surabaya",
          namaAyah: "Joko Supriyadi",
          tahunLahirAyah: "1968",
          pendidikanAyah: "SMA",
          pekerjaanAyah: "Petani",
          namaIbu: "Siti Aminah",
          tahunLahirIbu: "1972",
          pendidikanIbu: "SMP",
          pekerjaanIbu: "Pedagang",
          alamatOrangTua: "Jl. Pahlawan No. 789, Surabaya",
          noTelepon: "082198765432"
        },
        {
          statusKeputusan: true,
          namaLengkap: "Dewi Lestari",
          nisn: "1122334455",
          tempatTanggalLahir: "Yogyakarta, 25 Desember 2010",
          nik: "1122334455667788",
          noKk: "1122334455667788",
          alamat: "Jl. Malioboro No. 234, Yogyakarta",
          namaAyah: "Bambang Sugeng",
          tahunLahirAyah: "1975",
          pendidikanAyah: "D3",
          pekerjaanAyah: "Karyawan Swasta",
          namaIbu: "Sri Wahyuni",
          tahunLahirIbu: "1978",
          pendidikanIbu: "S1",
          pekerjaanIbu: "Dosen",
          alamatOrangTua: "Jl. Malioboro No. 234, Yogyakarta",
          noTelepon: "081234556677"
        },
        {
          statusKeputusan: false,
          namaLengkap: "Eka Prasetya",
          nisn: "2233445566",
          tempatTanggalLahir: "Semarang, 5 Januari 2010",
          nik: "2233445566778899",
          noKk: "2233445566778899",
          alamat: "Jl. Diponegoro No. 456, Semarang",
          namaAyah: "Suharto",
          tahunLahirAyah: "1965",
          pendidikanAyah: "SMP",
          pekerjaanAyah: "Pedagang",
          namaIbu: "Siti Aisyah",
          tahunLahirIbu: "1969",
          pendidikanIbu: "SD",
          pekerjaanIbu: "Ibu Rumah Tangga",
          alamatOrangTua: "Jl. Diponegoro No. 456, Semarang",
          noTelepon: "083312345678"
        },
        {
          statusKeputusan: true,
          namaLengkap: "Farhan Maulana",
          nisn: "3344556677",
          tempatTanggalLahir: "Medan, 30 Agustus 2010",
          nik: "3344556677889900",
          noKk: "3344556677889900",
          alamat: "Jl. Gatot Subroto No. 789, Medan",
          namaAyah: "Usman",
          tahunLahirAyah: "1973",
          pendidikanAyah: "SMA",
          pekerjaanAyah: "Supir",
          namaIbu: "Rina Wulandari",
          tahunLahirIbu: "1976",
          pendidikanIbu: "SMP",
          pekerjaanIbu: "Penjahit",
          alamatOrangTua: "Jl. Gatot Subroto No. 789, Medan",
          noTelepon: "082212345678"
        },
        {
          statusKeputusan: false,
          namaLengkap: "Gita Pramesti",
          nisn: "4455667788",
          tempatTanggalLahir: "Malang, 12 November 2010",
          nik: "4455667788990011",
          noKk: "4455667788990011",
          alamat: "Jl. Ijen No. 123, Malang",
          namaAyah: "Heru Setiawan",
          tahunLahirAyah: "1971",
          pendidikanAyah: "SMA",
          pekerjaanAyah: "Buruh",
          namaIbu: "Siti Fatimah",
          tahunLahirIbu: "1974",
          pendidikanIbu: "SMP",
          pekerjaanIbu: "Ibu Rumah Tangga",
          alamatOrangTua: "Jl. Ijen No. 123, Malang",
          noTelepon: "082312345678"
        },
        {
          statusKeputusan: true,
          namaLengkap: "Hendra Kurniawan",
          nisn: "5566778899",
          tempatTanggalLahir: "Makassar, 25 Februari 2010",
          nik: "5566778899001122",
          noKk: "5566778899001122",
          alamat: "Jl. Ahmad Yani No. 456, Makassar",
          namaAyah: "Yusuf Hidayat",
          tahunLahirAyah: "1972",
          pendidikanAyah: "SMA",
          pekerjaanAyah: "Petani",
          namaIbu: "Siti Nurhayati",
          tahunLahirIbu: "1975",
          pendidikanIbu: "SD",
          pekerjaanIbu: "Ibu Rumah Tangga",
          alamatOrangTua: "Jl. Ahmad Yani No. 456, Makassar",
          noTelepon: "082412345678"
        },
        {
          statusKeputusan: false,
          namaLengkap: "Indah Permata",
          nisn: "6677889900",
          tempatTanggalLahir: "Palembang, 17 Juli 2010",
          nik: "6677889900112233",
          noKk: "6677889900112233",
          alamat: "Jl. Sudirman No. 789, Palembang",
          namaAyah: "Supriyanto",
          tahunLahirAyah: "1974",
          pendidikanAyah: "S1",
          pekerjaanAyah: "Karyawan Swasta",
          namaIbu: "Fitriani",
          tahunLahirIbu: "1977",
          pendidikanIbu: "SMA",
          pekerjaanIbu: "Penjahit",
          alamatOrangTua: "Jl. Sudirman No. 789, Palembang",
          noTelepon: "082512345678"
        },
        {
          statusKeputusan: true,
          namaLengkap: "Joko Susanto",
          nisn: "7788990011",
          tempatTanggalLahir: "Denpasar, 22 Oktober 2010",
          nik: "7788990011223344",
          noKk: "7788990011223344",
          alamat: "Jl. Diponegoro No. 456, Denpasar",
          namaAyah: "Wahyudi",
          tahunLahirAyah: "1970",
          pendidikanAyah: "SMA",
          pekerjaanAyah: "Supir",
          namaIbu: "Dewi Sartika",
          tahunLahirIbu: "1973",
          pendidikanIbu: "SMP",
          pekerjaanIbu: "Pedagang",
          alamatOrangTua: "Jl. Diponegoro No. 456, Denpasar",
          noTelepon: "082612345678"
        },
        {
          statusKeputusan: false,
          namaLengkap: "Karina Wijaya",
          nisn: "8899001122",
          tempatTanggalLahir: "Pontianak, 1 Juni 2010",
          nik: "8899001122334455",
          noKk: "8899001122334455",
          alamat: "Jl. Gajah Mada No. 789, Pontianak",
          namaAyah: "Budi Wijaya",
          tahunLahirAyah: "1971",
          pendidikanAyah: "S1",
          pekerjaanAyah: "Karyawan Swasta",
          namaIbu: "Linda Hartono",
          tahunLahirIbu: "1974",
          pendidikanIbu: "SMA",
          pekerjaanIbu: "Ibu Rumah Tangga",
          alamatOrangTua: "Jl. Gajah Mada No. 789, Pontianak",
          noTelepon: "082712345678"
        }
      ];

      
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;


  const currentItems = ppdbDummyData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );


  const handlePageClick = (event:any) => {
    const newPage = event.selected;
    setCurrentPage(newPage);
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
              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700 w-[22%]">Alamat</th>
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
                <td className="py-3 px-4 border-b text-sm text-gray-700 whitespace-nowrap">{data.alamat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ReactPaginate
        pageCount={Math.ceil(ppdbDummyData.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
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
  )
}

export default pengumuman

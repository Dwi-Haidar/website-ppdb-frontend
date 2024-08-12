const ppdbData = () => {
    const ppdbDummyData = [
      {
        namaLengkap: "Budi Santoso",
        nisn: "1234567890",
        tempatTanggalLahir: "Jakarta, 01 Januari 2010",
        nik: "1234567890123456",
        noKk: "1234567890123456",
        alamat: "Jl. Merdeka No. 123, Jakarta",
        namaAyah: "Slamet Riyadi",
        tahunLahirAyah: "1975",
        pendidikanAyah: "S1",
        pekerjaanAyah: "Pegawai Negeri",
        namaIbu: "Siti Aminah",
        tahunLahirIbu: "1977",
        pendidikanIbu: "SMA",
        pekerjaanIbu: "Ibu Rumah Tangga",
        alamatOrangTua: "Jl. Merdeka No. 123, Jakarta",
        noTelepon: "081234567890",
      },
      {
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
        noTelepon: "081298765432",
      },
    ];
  
    return (
      <div className="flex justify-center items-center mt-20">
        <div className="overflow-x-auto w-[90%]">
          <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-200">
            <thead>
              <tr>
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
              </tr>
            </thead>
            <tbody>
              {ppdbDummyData.map((data, index) => (
                <tr key={index}>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default ppdbData;

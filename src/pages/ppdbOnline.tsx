import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

interface FormData {
  nama: string;
  nisn: string;
  email: string;
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

const PpdbOnline = () => {
  const [formData, setFormData] = useState<FormData>({
    nama: "",
    nisn: "",
    email: "",
    ttl: "",
    nik: "",
    noKK: "",
    alamat: "",
    namaAyah: "",
    tahunLahirAyah: "",
    pendidikanAyah: "",
    pekerjaanAyah: "",
    namaIbu: "",
    tahunLahirIbu: "",
    pendidikanIbu: "",
    pekerjaanIbu: "",
    alamatOrtu: "",
    noTelp: "",
  });

  const [images, setImages] = useState<FileList | null>(null);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImages(e.target.files);
  };

  const validateForm = () => {
    const { nisn, nik, noKK } = formData;
    if (nisn.length !== 10) {
      toast.error("NISN harus terdiri dari 10 angka.");
      return false;
    }
    if (nik.length !== 16) {
      toast.error("NIK harus terdiri dari 16 angka.");
      return false;
    }
    if (noKK.length !== 16) {
      toast.error("No. KK harus terdiri dari 16 angka.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const data = new FormData();

    for (const key in formData) {
      data.append(key, formData[key as keyof FormData]);
    }

    if (images) {
      for (let i = 0; i < images.length; i++) {
        data.append("image", images[i]);
      }
    }

    try {
      const response = await axios.post("http://localhost:8000/ppdb", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.status) {
        toast.success(response.data.message);
        const token = response.data.data.transactionToken;
        console.log("token", token);
        (window as any).snap.pay(token, {
          onSuccess: function (result: any) {
            alert("payment success!");
            console.log(result);
          },
          onPending: function (result: any) {
            /* You may add your own implementation here */
            alert("wating your payment!");
            console.log(result);
          },
          onError: function (result: any) {
            /* You may add your own implementation here */
            alert("payment failed!");
            console.log(result);
          },
          onClose: function () {
            /* You may add your own implementation here */
            alert("you closed the popup without finishing the payment");
          },
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      console.error("Error details:", error.response || error.message || error);
      toast.error("Terjadi kesalahan saat memproses data2.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 w-[80%] mt-10">
      <h1 className="text-2xl font-bold mb-6">Pendaftaran Online</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Nama", name: "nama", type: "text" },
            { label: "NISN", name: "nisn", type: "text" },
            { label: "Email", name: "email", type: "text" },
            { label: "Tempat, Tanggal Lahir", name: "ttl", type: "date" },
            { label: "NIK", name: "nik", type: "text" },
            { label: "No KK", name: "noKK", type: "text" },
            { label: "Alamat", name: "alamat", type: "text" },
            { label: "Nama Ayah", name: "namaAyah", type: "text" },
            { label: "Tahun Lahir Ayah", name: "tahunLahirAyah", type: "date" },
            { label: "Pendidikan Ayah", name: "pendidikanAyah", type: "text" },
            { label: "Pekerjaan Ayah", name: "pekerjaanAyah", type: "text" },
            { label: "Nama Ibu", name: "namaIbu", type: "text" },
            { label: "Tahun Lahir Ibu", name: "tahunLahirIbu", type: "date" },
            { label: "Pendidikan Ibu", name: "pendidikanIbu", type: "text" },
            { label: "Pekerjaan Ibu", name: "pekerjaanIbu", type: "text" },
            { label: "Alamat Orang Tua", name: "alamatOrtu", type: "text" },
            { label: "No Telepon", name: "noTelp", type: "text" },
          ].map((field) => (
            <div className="mb-4" key={field.name}>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {field.label}
              </label>
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formData[field.name as keyof FormData]}
                onChange={handleInputChange}
                autoComplete={field.name}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          ))}
          <div className="mb-4">
            <label
              htmlFor="file1"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Foto SKL
            </label>
            <input
              type="file"
              id="file1"
              name="file1"
              onChange={handleFileChange}
              multiple
              className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md cursor-pointer"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="file2"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Foto Kartu Keluarga
            </label>
            <input
              type="file"
              id="file2"
              name="file2"
              onChange={handleFileChange}
              multiple
              className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md cursor-pointer"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="file3"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Upload Akte Kelahiran
            </label>
            <input
              type="file"
              id="file3"
              name="file3"
              onChange={handleFileChange}
              multiple
              className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md cursor-pointer"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="file4"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Foto Ijazah
            </label>
            <input
              type="file"
              id="file4"
              name="file4"
              onChange={handleFileChange}
              multiple
              className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md cursor-pointer"
            />
          </div>
          <div className="mb-4">
            <div id="snap-container"></div> {/* Container for Snap */}
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default PpdbOnline;

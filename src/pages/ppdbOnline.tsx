import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormData {
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

const PpdbOnline = () => {
  const [formData, setFormData] = useState<FormData>({
    nama: "",
    nisn: "",
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

  const [images, setImages] = useState<{ [key: string]: File[] }>({
    fotoMurid: [],
    otherImages: [],
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setImages((prev) => ({
        ...prev,
        [name]: Array.from(files),
      }));
    }
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

  const handleValidationError = (message: string) => {
    if (message.includes("NIK")) {
      toast.error("NIK sudah terdaftar.");
    } else if (message.includes("No KK")) {
      toast.error("No KK sudah terdaftar.");
    } else if (message.includes("NISN")) {
      toast.error("NISN sudah terdaftar.");
    } else {
      toast.error(message);
    }
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

    // Append the fotoMurid and other images
    for (const file of images.fotoMurid) {
      data.append("fotoMurid", file);
    }

    for (const file of images.otherImages) {
      data.append("image", file);
    }

    try {
      const response = await axios.post("http://localhost:5001/ppdb", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      console.log("response", response.data);
      console.log("response", response);

      if (response.data.status) {
        toast.success("Data berhasil dikirim.");
        const token = response.data.data.transactionToken;
        (window as any).snap.pay(token, {
          onSuccess: function (result: any) {
            alert("Payment success!");
            console.log(result);
          },
          onPending: function (result: any) {
            alert("Waiting your payment!");
            console.log(result);
          },
          onError: function (result: any) {
            alert("Payment failed!");
            console.log(result);
          },
          onClose: function () {
            alert("You closed the popup without finishing the payment.");
          },
        });
      } else {
        handleValidationError(response.data.message);
      }
    } catch (error: any) {
      if (error.response) {
        const message =
          error.response.data.message ||
          "Terjadi kesalahan saat mengirim data.";
        toast.error(message);
      } else if (error.request) {
        toast.error("Tidak ada respons dari server.");
      } else {
        toast.error("Terjadi kesalahan: " + error.message);
      }
      console.error("Error details:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 w-[80%] mt-10">
      <h1 className="text-2xl font-bold mb-6">Pendaftaran Online</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Existing form fields */}
          {[
            { label: "Nama", name: "nama", type: "text" },
            { label: "NISN", name: "nisn", type: "text" },
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
              htmlFor="fotoMurid"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Foto Murid
            </label>
            <input
              type="file"
              id="fotoMurid"
              name="fotoMurid"
              onChange={handleFileChange}
              multiple
              className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md cursor-pointer"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="file1"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Foto Berkas Murid
            </label>
            <input
              type="file"
              id="file1"
              name="otherImages"
              placeholder="Tolong masukan Foto Izajah, Akte Kelahiran, SKL, KK"
              onChange={handleFileChange}
              multiple
              className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md cursor-pointer"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Kirim
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default PpdbOnline;

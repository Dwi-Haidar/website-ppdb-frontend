import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "./alurppdb-online";


// Define the interface for form data
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
  tempat: string;
  tahunLahirIbu: string;
  pendidikanIbu: string;
  pekerjaanIbu: string;
  alamatOrtu: string;
  noTelp: string;
}

// Define the interface for JWT payload

const PpdbOnline = () => {
  // Define the initial state for form data
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
    tempat: "",
    tahunLahirIbu: "",
    pendidikanIbu: "",
    pekerjaanIbu: "",
    alamatOrtu: "",
    noTelp: "",
  });

  // Define the initial state for handling image files
  const [images, setImages] = useState<{ [key: string]: File[] }>({
    fotoMurid: [],
    fotoKK: [],
    fotoSKL: [],
    fotoIjazah: [],
    fotoAkta: [],
  });

  // Handle input changes for form fields
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle file changes for image uploads
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setImages((prev) => ({
        ...prev,
        [name]: Array.from(files),
      }));
    }
  };

  // Validate the form before submission
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

  // Handle validation errors returned from the server
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

  // Fetch user data based on token in local storage
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const decoded = jwtDecode<CustomJwtPayload>(token);
          const userEmail = decoded.email;
          if (userEmail) {
            const response = await fetch(
              `http://localhost:5001/ppdb?email=${userEmail}`
            );
            if (!response.ok) {
              throw new Error("Failed to fetch user data");
            }
            const result = await response.json();
            if (result.status === 200 && result.data.length > 0) {
              const userData = result.data[0];
              setFormData(userData);
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const data = new FormData();

    // Append form data to FormData object
    for (const key in formData) {
      data.append(key, formData[key as keyof FormData]);
    }

    // Append image files to FormData object
    Object.keys(images).forEach((key) => {
      images[key].forEach((file) => {
        data.append(key, file);
      });
    });

    try {
      console.log(data,'tes');
      const response = await axios.post("http://localhost:5001/ppdb", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

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
        console.log(response.data.data);

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
          {/* Input fields for the form */}
          {[
            { label: "Nama", name: "nama", type: "text" },
            { label: "NISN", name: "nisn", type: "text" },
            { label: "Tempat", name: "tempat", type: "text" },
            { label: "Tanggal Lahir", name: "ttl", type: "date", min: "2012-01-01" },
            { label: "NIK", name: "nik", type: "text" },
            { label: "No KK", name: "noKK", type: "text" },
            { label: "Alamat", name: "alamat", type: "text" },
            { label: "Nama Ayah", name: "namaAyah", type: "text" },
            { label: "Tahun Lahir Ayah", name: "tahunLahirAyah", type: "date" },
            { label: "Pekerjaan Ayah", name: "pekerjaanAyah", type: "text" },
            { label: "Nama Ibu", name: "namaIbu", type: "text" },
            { label: "Tahun Lahir Ibu", name: "tahunLahirIbu", type: "date" },
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

          {/* Dropdown for pendidikanAyah */}
          <div className="mb-4">
            <label
              htmlFor="pendidikanAyah"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Pendidikan Ayah
            </label>
            <select
              id="pendidikanAyah"
              name="pendidikanAyah"
              value={formData.pendidikanAyah}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Pilih Pendidikan Ayah</option>
              <option value="SD">SD</option>
              <option value="SMP">SMP</option>
              <option value="SMA">SMA</option>
              <option value="Diploma">Diploma</option>
              <option value="Sarjana">Sarjana</option>
            </select>
          </div>

          {/* Dropdown for pendidikanIbu */}
          <div className="mb-4">
            <label
              htmlFor="pendidikanIbu"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Pendidikan Ibu
            </label>
            <select
              id="pendidikanIbu"
              name="pendidikanIbu"
              value={formData.pendidikanIbu}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Pilih Pendidikan Ibu</option>
              <option value="SD">SD</option>
              <option value="SMP">SMP</option>
              <option value="SMA">SMA</option>
              <option value="Diploma">Diploma</option>
              <option value="Sarjana">Sarjana</option>
            </select>
          </div>


          {/* File input fields */}
          {[
            { label: "Foto Murid", name: "fotoMurid" },
            { label: "Foto KK", name: "fotoKK" },
            { label: "Foto SKL", name: "fotoSKL" },
            { label: "Foto Ijazah", name: "fotoIjazah" },
            { label: "Foto Akta Kelahiran", name: "fotoAkta" },
          ].map((fileField) => (
            <div className="mb-4" key={fileField.name}>
              <label
                htmlFor={fileField.name}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {fileField.label}
              </label>
              <input
                type="file"
                id={fileField.name}
                name={fileField.name}
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                multiple
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default PpdbOnline;

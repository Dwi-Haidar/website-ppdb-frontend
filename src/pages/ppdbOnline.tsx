import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "./alurppdb-online";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addYears, isBefore } from "date-fns";
import { FaCloudUploadAlt, FaFileUpload, FaUpload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(null);
  const [fileNames, setFileNames] = useState<{ [key: string]: string }>({});

  const inputStyles = {
    width: "100%",
    border: "1px solid #ccc",
    padding: "12px 15px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    fontSize: "16px",
    transition: "border-color 0.3s, box-shadow 0.3s",
  };
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
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
      setFileNames((prev) => ({
        ...prev,
        [name]: files[0].name, // Only showing the first file name
      }));
    }
  };

  // Validate the form before submission
  const validateForm = () => {
    const { nisn, nik, noKK, ttl } = formData;
    if (nisn.length !== 10) {
      toast.error("NISN harus terdiri dari 10 angka.");
      return false;
    }
    const ttlDate = new Date(ttl);
    const minDate = new Date("2012-01-01");

    if (ttlDate < minDate) {
      toast.error("Tanggal lahir harus setelah Januari 2012.");
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
      const response = await axios.post("http://localhost:5001/ppdb", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (response.data.status) {
        toast.success("Data berhasil dikirim.");
        navigate("/waiting-for-verification");

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
    <div className="container mx-auto px-4 py-8 max-w-4xl mt-16">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Pendaftaran Online
      </h1>
      <form onSubmit={handleSubmit} noValidate>
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "space-between",
          }}
        >
          <div style={{ width: "100%" }}>
            <label className="block mb-1 text-gray-800 font-semibold text-sm capitalize">
              Nama
            </label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleInputChange}
              required
              style={{
                width: "100%",
                border: "1px solid #ccc",
                padding: "12px 15px",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                fontSize: "16px",
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#007bff")}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />
          </div>
          <div style={{ width: "100%" }}>
            <label className="block mb-1 text-gray-800 font-semibold text-sm capitalize">
              NISN
            </label>
            <input
              type="text"
              name="nisn"
              value={formData.nisn}
              onChange={handleInputChange}
              required
              style={{
                width: "100%",
                border: "1px solid #ccc",
                padding: "12px 15px",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                fontSize: "16px",
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#007bff")}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
          <div style={{ width: "100%" }}>
            <label className="block mb-1 text-gray-800 font-semibold text-sm capitalize">
              Tempat Lahir
            </label>
            <input
              type="text"
              name="tempat"
              value={formData.tempat}
              onChange={handleInputChange}
              required
              style={{
                width: "100%",
                border: "1px solid #ccc",
                padding: "12px 15px",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                fontSize: "16px",
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#007bff")}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />
          </div>
          <div style={{ width: "100%" }}>
            <label className="block mb-1 text-gray-800 font-semibold text-sm capitalize">
              Tanggal Lahir
            </label>
            <input
              type="date"
              name="ttl"
              value={formData.ttl}
              onChange={handleInputChange}
              max={new Date().toISOString().split("T")[0]}
              min="2012-01-01"
              required
              style={{
                width: "100%",
                border: "1px solid #ccc",
                padding: "12px 15px",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                fontSize: "16px",
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#007bff")}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
          <div style={{ width: "100%" }}>
            <label className="block mb-1 text-gray-800 font-semibold text-sm capitalize">
              NIK
            </label>
            <input
              type="text"
              name="nik"
              value={formData.nik}
              onChange={handleInputChange}
              required
              style={{
                width: "100%",
                border: "1px solid #ccc",
                padding: "12px 15px",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                fontSize: "16px",
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#007bff")}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />
          </div>
          <div style={{ width: "100%" }}>
            <label className="block mb-1 text-gray-800 font-semibold text-sm capitalize">
              No. KK
            </label>
            <input
              type="text"
              name="noKK"
              value={formData.noKK}
              onChange={handleInputChange}
              required
              style={{
                width: "100%",
                border: "1px solid #ccc",
                padding: "12px 15px",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                fontSize: "16px",
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#007bff")}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
          <div style={{ width: "100%" }}>
            <label className="block mb-1 text-gray-800 font-semibold text-sm capitalize">
              Alamat
            </label>
            <input
              type="text"
              name="alamat"
              value={formData.alamat}
              onChange={handleInputChange}
              required
              style={{
                width: "100%",
                border: "1px solid #ccc",
                padding: "12px 15px",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                fontSize: "16px",
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#007bff")}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />
          </div>
          <div style={{ width: "100%" }}>
            <label className="block mb-1 text-gray-800 font-semibold text-sm capitalize">
              Nama Ayah
            </label>
            <input
              type="text"
              name="namaAyah"
              value={formData.namaAyah}
              onChange={handleInputChange}
              required
              style={{
                width: "100%",
                border: "1px solid #ccc",
                padding: "12px 15px",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                fontSize: "16px",
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#007bff")}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
          <div style={{ width: "100%" }}>
            <label className="block mb-1 text-gray-800 font-semibold text-sm capitalize">
              Tahun Lahir Ayah
            </label>
            <input
              type="text"
              name="tahunLahirAyah"
              value={formData.tahunLahirAyah}
              onChange={handleInputChange}
              required
              style={{
                width: "100%",
                border: "1px solid #ccc",
                padding: "12px 15px",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                fontSize: "16px",
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#007bff")}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />
          </div>
          <div style={{ width: "100%" }}>
            <label className="block mb-1 text-gray-800 font-semibold text-sm capitalize">
              Pendidikan Ayah
            </label>
            <select
              id="pendidikanAyah"
              name="pendidikanAyah"
              value={formData.pendidikanAyah}
              onChange={handleInputChange}
              style={{
                width: "100%",
                border: "1px solid #ccc",
                padding: "12px 15px",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                fontSize: "16px",
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#007bff")}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            >
              <option value=""> --- Pendidikan Ayah ---</option>
              <option value="SD">SD</option>
              <option value="SMP">SMP</option>
              <option value="SMA">SMA</option>
              <option value="Diploma">Diploma</option>
              <option value="Sarjana">Sarjana</option>
            </select>
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
          <div style={{ width: "100%" }}>
            <label className="block mb-1 text-gray-800 font-semibold text-sm capitalize">
              Pekerjaan Ayah
            </label>
            <input
              type="text"
              name="pekerjaanAyah"
              value={formData.pekerjaanAyah}
              onChange={handleInputChange}
              required
              style={{
                width: "100%",
                border: "1px solid #ccc",
                padding: "12px 15px",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                fontSize: "16px",
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#007bff")}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />
          </div>
          <div style={{ width: "100%" }}>
            <label className="block mb-1 text-gray-800 font-semibold text-sm capitalize">
              Nama Ibu
            </label>
            <input
              type="text"
              name="namaIbu"
              value={formData.namaIbu}
              onChange={handleInputChange}
              required
              style={{
                width: "100%",
                border: "1px solid #ccc",
                padding: "12px 15px",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                fontSize: "16px",
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#007bff")}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
          <div style={{ width: "100%" }}>
            <label className="block mb-1 text-gray-800 font-semibold text-sm capitalize">
              Tahun Lahir Ibu
            </label>
            <input
              type="text"
              name="tahunLahirIbu"
              value={formData.tahunLahirIbu}
              onChange={handleInputChange}
              required
              style={{
                width: "100%",
                border: "1px solid #ccc",
                padding: "12px 15px",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                fontSize: "16px",
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#007bff")}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />
          </div>
          <div style={{ width: "100%" }}>
            <label className="block mb-1 text-gray-800 font-semibold text-sm capitalize">
              Pendidikan Ibu
            </label>
            <select
              id="pendidikanIbu"
              name="pendidikanIbu"
              value={formData.pendidikanIbu}
              onChange={handleInputChange}
              style={{
                width: "100%",
                border: "1px solid #ccc",
                padding: "12px 15px",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                fontSize: "16px",
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#007bff")}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            >
              <option value=""> --- Pendidikan Ibu ---</option>
              <option value="SD">SD</option>
              <option value="SMP">SMP</option>
              <option value="SMA">SMA</option>
              <option value="Diploma">Diploma</option>
              <option value="Sarjana">Sarjana</option>
            </select>
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
          <div style={{ width: "100%" }}>
            <label className="block mb-1 text-gray-800 font-semibold text-sm capitalize">
              Pekerjaan Ibu
            </label>
            <input
              type="text"
              name="pekerjaanIbu"
              value={formData.pekerjaanIbu}
              onChange={handleInputChange}
              required
              style={{
                width: "100%",
                border: "1px solid #ccc",
                padding: "12px 15px",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                fontSize: "16px",
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#007bff")}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />
          </div>
          <div style={{ width: "100%" }}>
            <label className="block mb-1 text-gray-800 font-semibold text-sm capitalize">
              Alamat Orang Tua
            </label>
            <input
              type="text"
              name="alamatOrtu"
              value={formData.alamatOrtu}
              onChange={handleInputChange}
              required
              style={{
                width: "100%",
                border: "1px solid #ccc",
                padding: "12px 15px",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                fontSize: "16px",
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#007bff")}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
          <div style={{ width: "100%" }}>
            <label className="block mb-1 text-gray-800 font-semibold text-sm capitalize">
              No. Telepon
            </label>
            <input
              type="text"
              name="noTelp"
              value={formData.noTelp}
              onChange={handleInputChange}
              required
              style={{
                width: "100%",
                border: "1px solid #ccc",
                padding: "12px 15px",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                fontSize: "16px",
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#007bff")}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />
          </div>
          <div style={{ width: "100%" }}></div>
        </div>
        <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
          <div style={{ width: "100%" }}>
            <label className="block mb-1 text-gray-800 font-semibold text-sm capitalize">
              Foto Murid
            </label>
            <div className="relative">
              <input
                type="file"
                name="fotoMurid"
                onChange={handleFileChange}
                multiple
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "5px",
                  border: "1px solid #ccc",
                  width: "100%",
                  alignItems: "center",
                  padding: "10px",
                  borderRadius: "8px",
                }}
              >
                <FaCloudUploadAlt style={{ fontSize: "24px", color: "blue" }} />
                {fileNames.fotoMurid
                  ? fileNames.fotoMurid
                  : "Masukan foto format jpg"}
              </div>
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <label className="block mb-1 text-gray-800 font-semibold text-sm capitalize">
              Foto KK
            </label>
            <div className="relative">
              <input
                type="file"
                name="fotoKK"
                onChange={handleFileChange}
                multiple
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "5px",
                  border: "1px solid #ccc",
                  width: "100%",
                  alignItems: "center",
                  padding: "10px",
                  borderRadius: "8px",
                }}
              >
                <FaCloudUploadAlt style={{ fontSize: "24px", color: "blue" }} />
                {fileNames.fotoKK
                  ? fileNames.fotoKK
                  : "Masukan foto format jpg"}
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
          <div style={{ width: "100%" }}>
            <label className="block mb-1 text-gray-800 font-semibold text-sm capitalize">
              Foto SKL
            </label>
            <div className="relative">
              <input
                type="file"
                name="fotoSKL"
                onChange={handleFileChange}
                multiple
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "5px",
                  border: "1px solid #ccc",
                  width: "100%",
                  alignItems: "center",
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "8px",
                }}
              >
                <FaCloudUploadAlt style={{ fontSize: "24px", color: "blue" }} />
                {fileNames.fotoSKL
                  ? fileNames.fotoSKL
                  : "Masukan foto format jpg"}
              </div>
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <label className="block mb-1 text-gray-800 font-semibold text-sm capitalize">
              Foto Ijazah
            </label>
            <div className="relative">
              <input
                type="file"
                name="fotoIjazah"
                onChange={handleFileChange}
                multiple
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "5px",
                  border: "1px solid #ccc",
                  width: "100%",
                  alignItems: "center",
                  padding: "10px",
                  borderRadius: "8px",
                }}
              >
                <FaCloudUploadAlt style={{ fontSize: "24px", color: "blue" }} />
                {fileNames.fotoIjazah
                  ? fileNames.fotoIjazah
                  : "Masukan foto format jpg"}
              </div>
            </div>
          </div>
        </div>

        <label className="block mb-1 mt-4 text-gray-800 font-semibold text-sm capitalize">
          Foto Akta
        </label>
        <div className="relative">
          <input
            type="file"
            name="fotoAkta"
            onChange={handleFileChange}
            multiple
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "5px",
              border: "1px solid #ccc",
              width: "50%",
              alignItems: "center",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <FaCloudUploadAlt style={{ fontSize: "24px", color: "blue" }} />
            {fileNames.fotoAkta
              ? fileNames.fotoAkta
              : "Masukan foto format jpg"}
          </div>
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            marginTop: "10px",
            padding: "10px 10px",
            borderRadius: "8px",
            color: "white",
            background: "linear-gradient(180deg, #0f6fff 0%, #0062e6 100%)",
          }}
        >
          Kirim
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default PpdbOnline;

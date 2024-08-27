import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Modal,
  Container,
  Grid,
  IconButton,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import CloseIcon from '@mui/icons-material/Close';
import { IPpdbImage } from "../types/types";
import API from "../libs";
import { toast } from "react-toastify";

interface Kelulusan {
  id: number;
  createdAt: string;
  ppdbId: number;
  statusKelulusan: boolean;
  updatedAt: string;
}

interface PpdbData {
  id: number;
  nama: string;
  nisn: string;
  ttl: string;
  nik: string;
  noKK: string;
  fotoMurid: string;
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
  email: string;
  fotoBukti: string;
  fotoKK: string;
  fotoSKL: string;
  fotoIjazah: string;
  fotoAkta: string;
  link: string;
  createdAt: string;
  updatedAt: string;
  image: IPpdbImage[];
  Kelulusan?: Kelulusan;
}

const EditKelulusan: React.FC = () => {
  const [data, setData] = useState<PpdbData | null>(null);
  const [kelulusan, setKelulusan] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();
  const numericId = id ? Number(id) : 0;

  const postEmail = async (emailToPost: string, nama: string, link: string) => {
    try {
      const res = await API.post("sendEmailPembayaranFormulir", { email: emailToPost, nama: nama, link: link });
      console.log("Email sent successfully:", res.data);
      toast.success("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }
  const GetdetailKelulusan = async () => {
    try {
      const response = await API.get(`ppdb/${numericId}`);
      setData(response.data.data);
      setIsVerified(response.data.data.isVerified);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    GetdetailKelulusan();
  }, [numericId]);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKelulusan(event.target.value === "true");
  };

  const handleVerifiedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsVerified(event.target.value === "true");
  };

  const updatePpdb = async () => {
    try {
      await API.put(`ppdb/${numericId}`, {
        isVerified,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await API.post(`kelulusan`, {
        ppdbId: numericId,
        statusKelulusan: kelulusan,
      });

      await updatePpdb();
      GetdetailKelulusan();
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <Container maxWidth="lg" sx={{ paddingY: 4 }}>
      {data ? (
        <Card elevation={4} sx={{ borderRadius: 2 }}>
          <CardHeader
            avatar={
              <Avatar
                sx={{ bgcolor: blue[500], width: 56, height: 56 }}
                src={`http://localhost:5001/uploads/${data.fotoMurid}`}
              />
            }
            title={data.nama}
            subheader={`NISN: ${data.nisn}`}
            titleTypographyProps={{ variant: "h6" }}
            subheaderTypographyProps={{ variant: "body2" }}
            sx={{ backgroundColor: "#56b475", color: "white", borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
          />
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Informasi Data
            </Typography>
            <Grid container spacing={3}>
              {[
                { label: "TTL", value: data.ttl },
                { label: "NIK", value: data.nik },
                { label: "No KK", value: data.noKK },
                { label: "Alamat", value: data.alamat },
                { label: "Alamat Ortu", value: data.alamatOrtu },
                { label: "Nama Ayah", value: data.namaAyah },
                { label: "Tahun Lahir Ayah", value: data.tahunLahirAyah },
                { label: "Pendidikan Ayah", value: data.pendidikanAyah },
                { label: "Pekerjaan Ayah", value: data.pekerjaanAyah },
                { label: "Nama Ibu", value: data.namaIbu },
                { label: "Tahun Lahir Ibu", value: data.tahunLahirIbu },
                { label: "Pendidikan Ibu", value: data.pendidikanIbu },
                { label: "Pekerjaan Ibu", value: data.pekerjaanIbu },
                { label: "No Telp", value: data.noTelp },
              ].map((item, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Typography variant="body1" color="textSecondary" sx={{ fontWeight: 600 }}>
                    {item.label}:
                  </Typography>
                  <Typography variant="body2">{item.value}</Typography>
                </Grid>
              ))}
              <Grid item xs={12}>
                <Box sx={{ borderBottom: "2px solid black", width: "100%", marginBottom: "16px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)" }}></Box>
                <Typography variant="body1" color="textSecondary" sx={{ fontWeight: 600 }}>
                  Foto Bukti Pembayaran:
                </Typography>
                <img
                  src={`http://localhost:5001/uploads/${data.fotoBukti}`}
                  alt="Foto Bukti Pembayaran"
                  style={{ width: "150px", height: "auto", borderRadius: "8px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)" }}
                />
              </Grid>
              {[
                { label: "KK", value: data.fotoKK },
                { label: "SKL", value: data.fotoSKL },
                { label: "Ijazah", value: data.fotoIjazah },
                { label: "Akta", value: data.fotoAkta },
              ].map((item, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Typography variant="body1" color="textSecondary" sx={{ fontWeight: 600 }}>
                    Foto {item.label}:
                  </Typography>
                  <img
                    src={`http://localhost:5001/uploads/${item.value}`}
                    alt={`Foto ${item.label}`}
                    style={{ width: "150px", height: "auto", borderRadius: "8px", cursor: "pointer", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)" }}
                    onClick={() => handleImageClick(item.value)}
                  />
                </Grid>
              ))}
            </Grid>
            <Box mt={3}>
              <Typography variant="h6" gutterBottom>
                Status Murid
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="status"
                  name="statusKelulusan"
                  value={kelulusan ? "true" : "false"}
                  onChange={handleRadioChange}
                >
                  <FormControlLabel value="true" control={<Radio />} label="Diterima" />
                  <FormControlLabel value="false" control={<Radio />} label="Tidak  Diterima" />
                </RadioGroup>
              </FormControl>
              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Status Pembayaran
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="verification"
                  name="verificationStatus"
                  value={isVerified ? "true" : "false"}
                  onChange={handleVerifiedChange}
                >
                  <FormControlLabel value="true" control={<Radio />} label="Sudah Bayar" />
                  <FormControlLabel value="false" control={<Radio />} label="Belum Bayar" />
                </RadioGroup>
              </FormControl>
            </Box>

            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ mt: 3 }}
            >
              Simpan
            </Button>
            <Button
              sx={{ width: "100%", mt: 3, borderRadius: 2 }} color="primary"
              onClick={() => postEmail(data.email, data.nama, data.link)}>
              kirim email verifikasi
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="h6" color="textSecondary">
          Data tidak ditemukan
        </Typography>
      )}

      {/* Modal for Image Preview */}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "800px",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            textAlign: "center",
            overflow: "auto",
          }}
        >
          <IconButton
            onClick={handleCloseModal}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
          {selectedImage && (
            <img
              src={`http://localhost:5001/uploads/${selectedImage}`}
              alt="Selected"
              style={{ width: "100%", height: "auto", borderRadius: "8px" }}
            />
          )}
        </Box>
      </Modal>
    </Container>
  );
};

export default EditKelulusan;

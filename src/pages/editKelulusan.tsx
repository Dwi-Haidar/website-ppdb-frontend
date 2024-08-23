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
  Paper,
  Grid,
  Container,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Modal,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { IPpdbImage } from "../types/types";
import API from "../libs";

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
  fotoBukti: string;
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

  const GetdetailKelulusan = async () => {
    try {
      const response = await API.get(`ppdb/${numericId}`);
      console.log(response.data.data, 'ini resppon');
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
    } catch (error: any) {
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
    } catch (error: any) {
      console.log(error);
    }
  };
  ;

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <Container maxWidth="md" sx={{ paddingY: 4 }}>
      {data ? (
        <Card elevation={3}>
          <CardHeader
            avatar={
              <Avatar
                sx={{ bgcolor: blue[500] }}
                src={`http://localhost:5001/uploads/${data.fotoMurid}`}
              ></Avatar>
            }
            title={data.nama}
            subheader={`NISN: ${data.nisn}`}
            titleTypographyProps={{ variant: "h6" }}
            subheaderTypographyProps={{ variant: "body1", color: "white" }}
            sx={{ backgroundColor: "#73ee11", color: "white" }}
          />
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Informasi Data
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" color="textSecondary">
                  TTL:
                </Typography>
                <Typography variant="body2">{data.ttl}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" color="textSecondary">
                  NIK:
                </Typography>
                <Typography variant="body2">{data.nik}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" color="textSecondary">
                  No KK:
                </Typography>
                <Typography variant="body2">{data.noKK}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" color="textSecondary">
                  Alamat:
                </Typography>
                <Typography variant="body2">{data.alamat}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" color="textSecondary">
                  Alamat Ortu:
                </Typography>
                <Typography variant="body2">{data.alamatOrtu}</Typography>
              </Grid>
              {/* Informasi Orang Tua */}
              <Grid item xs={12} md={6}>
                <Typography variant="body1" color="textSecondary">
                  Nama Ayah:
                </Typography>
                <Typography variant="body2">{data.namaAyah}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" color="textSecondary">
                  Tahun Lahir Ayah:
                </Typography>
                <Typography variant="body2">{data.tahunLahirAyah}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" color="textSecondary">
                  Pendidikan Ayah:
                </Typography>
                <Typography variant="body2">{data.pendidikanAyah}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" color="textSecondary">
                  Pekerjaan Ayah:
                </Typography>
                <Typography variant="body2">{data.pekerjaanAyah}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" color="textSecondary">
                  Nama Ibu:
                </Typography>
                <Typography variant="body2">{data.namaIbu}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" color="textSecondary">
                  Tahun Lahir Ibu:
                </Typography>
                <Typography variant="body2">{data.tahunLahirIbu}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" color="textSecondary">
                  Pendidikan Ibu:
                </Typography>
                <Typography variant="body2">{data.pendidikanIbu}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" color="textSecondary">
                  Pekerjaan Ibu:
                </Typography>
                <Typography variant="body2">{data.pekerjaanIbu}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" color="textSecondary">
                  No Telp:
                </Typography>
                <Typography variant="body2">{data.noTelp}</Typography>
              </Grid>
              <Box>
                <Typography>foto bukti pembayaran </Typography>
                <img src={`http://localhost:5001/uploads/${data.fotoBukti}`} alt="foto Bukti" style={{ width: "100px", height: "auto" }} />
              </Box>
              <Grid item xs={12} md={6}>
                <Typography>Berkas Murid</Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  {data.image.map((img, index) => (
                    <img
                      key={index}
                      src={`http://localhost:5001/uploads/${img.url}`}
                      alt={`berkas murid ${index + 1}`}
                      style={{
                        width: "20%",
                        height: "auto",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        handleImageClick(
                          `http://localhost:5001/uploads/${img.url}`
                        )
                      }
                    />

                  ))}

                </Box>
              </Grid>
            </Grid>

            <Box sx={{ marginTop: 4 }}>
              <Typography variant="h6" gutterBottom>
                Status Kelulusan
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="kelulusan"
                  name="kelulusan"
                  value={kelulusan.toString()}
                  onChange={handleRadioChange}
                  row
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="Diterima"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="Tidak Diterima"
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            <form
              onSubmit={handleSubmit}
              style={{ marginTop: 4, textAlign: "center" }}
            >
              <Button type="submit" variant="contained" color="primary">
                Simpan Perubahan
              </Button>
            </form>
            <Box sx={{ marginTop: 4 }}>
              <Typography variant="h6" gutterBottom>
                Status Verifikasi
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="verified"
                  name="verified"
                  value={isVerified.toString()}
                  onChange={handleVerifiedChange}
                  row
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="Terverifikasi"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="Belum Terverifikasi"
                  />
                </RadioGroup>
              </FormControl>
              <form
                onSubmit={updatePpdb}
                style={{ marginTop: 4, textAlign: "center" }}
              >
                <Button type="submit" variant="contained" color="primary">
                  Simpan Perubahan
                </Button>
              </form>
            </Box>

          </CardContent>
        </Card>
      ) : (
        <Typography>Loading...</Typography>
      )}

      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            outline: "none",
            borderRadius: 2,
          }}
        >
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Preview"
              style={{ width: "100%", height: "auto" }}
            />
          )}
        </Box>
      </Modal>
    </Container>
  );
};

export default EditKelulusan;

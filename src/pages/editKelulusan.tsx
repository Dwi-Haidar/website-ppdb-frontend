import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Box, Typography, FormControl, FormControlLabel, Radio, RadioGroup, Button, Paper, Grid, Container, Card, CardContent, CardHeader, Avatar, Modal } from '@mui/material';
import { blue } from '@mui/material/colors';
import { IPpdbImage } from '../types/types';

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
  image: IPpdbImage[];
  Kelulusan?: Kelulusan; // Optional to handle cases where it's not present
}

const EditKelulusan: React.FC = () => {
  const [data, setData] = useState<PpdbData | null>(null);
  const [kelulusan, setKelulusan] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>(); // Mengambil id dari URL params
  const numericId = id ? Number(id) : 0; // Konversi id ke number

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/ppdb/${numericId}`);
        if (response.data && response.data.data) {
          setData(response.data.data);
          // Sesuaikan pengaturan kelulusan dengan status dari response
          setKelulusan(response.data.data.Kelulusan?.statusKelulusan ?? false);
        } else {
          console.error('Data tidak ditemukan');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [numericId]);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKelulusan(event.target.value === 'true');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Sending data:', {
      ppdbId: numericId,
      statusKelulusan: kelulusan,
    });
    try {
      await axios.post(`http://localhost:5001/kelulusan`, {
        ppdbId: numericId,
        statusKelulusan: kelulusan,
      });
      console.log('Data berhasil dikirim!');
      alert('Status kelulusan berhasil diperbarui!');
      // window.location.href = '/admin/ppdb-data';
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      console.error('Error updating status:', errorMessage);
      alert(`Error updating status: ${errorMessage}`);
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
    <Container maxWidth="md" sx={{ paddingY: 4 }}>
      {data ? (
        <Card elevation={3}>
          <CardHeader
            avatar={<Avatar sx={{ bgcolor: blue[500] }}>{data.nama.charAt(0)}</Avatar>}
            title={data.nama}
            subheader={`NISN: ${data.nisn}`}
            sx={{ backgroundColor: blue[100] }}
          />
          <CardContent>
            <Typography variant="h6" gutterBottom>Informasi Data</Typography>
            <Grid container spacing={3}>
              {/* Informasi Pribadi */}
              <Grid item xs={12} md={6}>
                <Typography variant="body1" color="textSecondary">TTL:</Typography>
                <Typography variant="body2">{data.ttl}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" color="textSecondary">NIK:</Typography>
                <Typography variant="body2">{data.nik}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" color="textSecondary">No KK:</Typography>
                <Typography variant="body2">{data.noKK}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" color="textSecondary">Alamat:</Typography>
                <Typography variant="body2">{data.alamat}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" color="textSecondary">Alamat Ortu:</Typography>
                <Typography variant="body2">{data.alamatOrtu}</Typography>
              </Grid>
              {/* Informasi Orang Tua */}
              <Grid item xs={12} md={6}>
                <Typography variant="body1" color="textSecondary">Nama Ayah:</Typography>
                <Typography variant="body2">{data.namaAyah}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" color="textSecondary">Tahun Lahir Ayah:</Typography>
                <Typography variant="body2">{data.tahunLahirAyah}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" color="textSecondary">Pendidikan Ayah:</Typography>
                <Typography variant="body2">{data.pendidikanAyah}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" color="textSecondary">Pekerjaan Ayah:</Typography>
                <Typography variant="body2">{data.pekerjaanAyah}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" color="textSecondary">Nama Ibu:</Typography>
                <Typography variant="body2">{data.namaIbu}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" color="textSecondary">Tahun Lahir Ibu:</Typography>
                <Typography variant="body2">{data.tahunLahirIbu}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" color="textSecondary">Pendidikan Ibu:</Typography>
                <Typography variant="body2">{data.pendidikanIbu}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" color="textSecondary">Pekerjaan Ibu:</Typography>
                <Typography variant="body2">{data.pekerjaanIbu}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" color="textSecondary">No Telp:</Typography>
                <Typography variant="body2">{data.noTelp}</Typography>
              </Grid>

              {/* Bagian untuk Menampilkan Gambar */}
              <Grid item xs={12} md={6}>
                <Typography>Berkas Murid</Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '10px',
                    flexWrap: 'wrap',
                  }}
                >
                  {data.image.map((img, index) => (
                    <img
                      key={index}
                      src={`http://localhost:5001/uploads/${img.url}`}
                      alt={`berkas murid ${index + 1}`}
                      style={{ width: '20%', height: 'auto', cursor: 'pointer' }}
                      onClick={() => handleImageClick(`http://localhost:5001/uploads/${img.url}`)}
                    />
                  ))}
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ marginTop: 4 }}>
              <Typography variant="h6" gutterBottom>Status Kelulusan</Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="kelulusan"
                  name="kelulusan"
                  value={kelulusan.toString()}
                  onChange={handleRadioChange}
                  row
                >
                  <FormControlLabel value="true" control={<Radio />} label="Lulus" />
                  <FormControlLabel value="false" control={<Radio />} label="Tidak Lulus" />
                </RadioGroup>
              </FormControl>
            </Box>

            <Box onClick={handleSubmit} sx={{ marginTop: 4, textAlign: 'center' }}>
              <Button type="submit" variant="contained" color="primary">
                Simpan Perubahan
              </Button>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Typography>Loading...</Typography>
      )}


      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            outline: 'none',
            borderRadius: 2,
          }}
        >
          {selectedImage && <img src={selectedImage} alt="Preview" style={{ width: '100%', height: 'auto' }} />}
        </Box>
      </Modal>
    </Container>
  );
};

export default EditKelulusan;

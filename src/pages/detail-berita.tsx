import { Box, Container, Typography, Card, CardContent, CardMedia, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../libs";
import { IBerita } from "../types/types";
import { keyframes } from '@mui/system';
import q7 from "../assets/image/q7.jpg";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const DetailBerita = () => {
  const { id } = useParams<{ id: string }>();
  const [prestasi, setPrestasi] = useState<IBerita | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrestasiDetail = async () => {
      try {
        const response = await API.get<{
          status: boolean;
          message: string;
          data: IBerita;
        }>(`berita/${id}`);
        setPrestasi(response.data.data);
      } catch (error) {
        console.error("Error fetching detail:", error);
      }
    };

    fetchPrestasiDetail();
  }, [id]);

  if (!prestasi) {
    return (
      <Box sx={{ padding: "50px", textAlign: "center" }}>
        <Typography variant="h4">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{
      backgroundImage: `url(${q7})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 3,
      mt: 10,
      position: 'relative'
    }}>
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        zIndex: -1
      }} />
      <Container sx={{ animation: `${fadeIn} 1s ease-in-out`, maxWidth: 'sm' }}>
        <Card sx={{ 
          boxShadow: 4, 
          borderRadius: 3, 
          margin: 'auto', 
          position: 'relative',
          backgroundColor: 'rgba(255, 255, 255, 0.9)', // Background Card lebih cerah
          padding: 2, 
          overflow: 'hidden'
        }}>
          <CardMedia
            component="img"
            image={`http://localhost:5001/uploads/${prestasi.fotoBerita}`}
            alt={prestasi.name}
            sx={{ 
              maxWidth: '100%', 
              height: 400, 
              objectFit: 'cover',
              borderTopLeftRadius: 12, 
              borderTopRightRadius: 12,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
          />
          <CardContent sx={{ textAlign: 'center', padding: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: 'black', marginBottom: 2 }}>
              {prestasi.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ marginBottom: "20px", lineHeight: 1.7 }}>
              {prestasi.Article}
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#79fa17",
                color: "#fff",
                boxShadow: 3,
                textTransform: 'none',
                transition: 'background-color 0.3s ease, transform 0.3s ease',
                '&:hover': {
                  backgroundColor: "#5fbf13",
                  transform: 'scale(1.05)',
                }
              }}
              onClick={() => navigate('/prestasi')}
            >
              Kembali ke Daftar Prestasi
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default DetailBerita;

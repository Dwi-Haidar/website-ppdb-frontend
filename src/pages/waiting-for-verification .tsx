import React from "react";
import { Container, Typography, Paper, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const WaitingForVerification = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <Container sx={{ mt: 20, mb: 10 }}>
      <Paper elevation={3} sx={{ padding: 3, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Harap Menunggu
        </Typography>
        <Typography variant="body1" paragraph>
          Terima kasih telah mengirimkan data Anda. Saat ini kami sedang
          memverifikasi data Anda. Harap menunggu konfirmasi dari kami melalui
          email.
        </Typography>
        <Box mt={2}>
          <Typography variant="body2" color="textSecondary">
            Jika Anda tidak menerima email dalam waktu 24 jam, silakan hubungi
            kami untuk bantuan lebih lanjut.
          </Typography>
        </Box>
        <Box mt={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleBackToHome}
          >
            Kembali ke Beranda
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default WaitingForVerification;

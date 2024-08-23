import { Container, Typography, Paper, Box } from "@mui/material";

const AfterPaymentInstructions = () => {
  return (
    <Container sx={{ mt: 10 }}>
      <Paper elevation={3} sx={{ padding: 3, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Terima Kasih!
        </Typography>
        <Typography variant="body1" paragraph>
          Terima kasih telah melakukan pembayaran. Harap menunggu email setelah
          kami memverifikasi pembayaran Anda.
        </Typography>
        <Box mt={2}>
          <Typography variant="body2" color="textSecondary">
            Jika Anda tidak menerima email dalam waktu 24 jam, silakan hubungi
            kami untuk bantuan lebih lanjut.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default AfterPaymentInstructions;

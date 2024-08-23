import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type AlertSeverity = "success" | "info" | "warning" | "error";

const PaymentInstructions = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<AlertSeverity>("success");
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const formData = new FormData();
      formData.append("fotoBukti", file);

      try {
        const response = await axios.post(
          "http://localhost:5001/uploadBuktiPembayaran",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        if (response.status === 200) {
          setSnackbarMessage("Bukti pembayaran berhasil diunggah");
          setSnackbarSeverity("success");
          setTimeout(() => navigate("/after-payment-instructions"), 1000);
        } else {
          setSnackbarMessage("Gagal mengunggah bukti pembayaran");
          setSnackbarSeverity("error");
        }
      } catch (error) {
        setSnackbarMessage("Gagal mengunggah bukti pembayaran");
        setSnackbarSeverity("error");
      } finally {
        setSnackbarOpen(true);
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container sx={{ mt: 10 }}>
      <Paper elevation={3} sx={{ padding: 3, marginTop: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Instruksi Pembayaran
        </Typography>
        <Typography variant="subtitle1" align="center" paragraph>
          Untuk menyelesaikan pembayaran, silakan ikuti langkah-langkah berikut:
        </Typography>
        <Typography variant="body1" paragraph>
          1. Lakukan pembayaran ke Virtual Account (VA) yang telah disediakan.
        </Typography>
        <Typography variant="body1" paragraph>
          2. Setelah melakukan pembayaran, unggah bukti pembayaran melalui
          formulir di bawah ini.
        </Typography>
        <Typography variant="body1" paragraph>
          3. Setelah mengunggah bukti pembayaran, diharap menunggu konfirmasi
          dan akan di kabari melalui email.
        </Typography>
        <Box mt={4} display="flex" flexDirection="column" alignItems="center">
          <Button
            variant="contained"
            color="primary"
            startIcon={<UploadIcon />}
            onClick={handleButtonClick}
          >
            Unggah Bukti Pembayaran
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </Box>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default PaymentInstructions;

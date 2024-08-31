import { Container, Typography, Paper, Box, Button } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const PaymentPage = () => {
  const handlePayment = async () => {
    console.log("token", localStorage.getItem("authToken"));
    try {
      console.log("masuk sini gak");

      const response = await axios.post(
        "http://localhost:5001/paymentPage",
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      console.log("response", response);

      console.log("1", response.data.data.transactionToken);
      console.log("2", response.data.data);
      console.log("3", response.data);

      if (response.data.status) {
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
    <Container sx={{ mt: 20, mb: 10 }}>
      <Paper elevation={3} sx={{ padding: 3, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Silakan Klik Tombol di Bawah untuk Melakukan Pembayaran
        </Typography>
        <Typography variant="body1" paragraph>
          Setelah Anda mengklik tombol di bawah, Anda akan diarahkan ke halaman
          pembayaran. Pastikan untuk mengikuti petunjuk pembayaran yang ada di
          sana.
        </Typography>
        <Box mt={4}>
          <Button variant="contained" color="primary" onClick={handlePayment}>
            Lanjutkan Pembayaran
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default PaymentPage;
function handleValidationError(message: any) {
  throw new Error("Function not implemented.");
}

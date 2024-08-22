import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Container,
  Button,
} from "@mui/material";
import PaidIcon from "@mui/icons-material/Paid";
import FormIcon from "@mui/icons-material/Description";
import VerifiedIcon from "@mui/icons-material/Verified";
import SchoolIcon from "@mui/icons-material/School";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    label: "Pembayaran Formulir",
    description: "Siswa membayar untuk mengisi formulir.",
    icon: <PaidIcon />,
  },
  {
    label: "Pengisian Formulir",
    description: "Siswa diberikan formulir untuk diisi.",
    icon: <FormIcon />,
  },
  {
    label: "Verifikasi Dokumen",
    description: "Dokumen yang diisi akan diverifikasi.",
    icon: <VerifiedIcon />,
  },
  {
    label: "Pembayaran Semester 1",
    description: "Siswa melakukan pembayaran untuk semester pertama.",
    icon: <PaidIcon />,
  },
  {
    label: "Diterima menjadi murid",
    description: "Setelah pembayaran, siswa resmi diterima sebagai murid.",
    icon: <SchoolIcon />,
  },
];

const AlurppdbOnline = () => {
  const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate("/payment-instructions");
  };
  return (
    <Container sx={{ mt: 10 }}>
      <Paper elevation={3} sx={{ padding: 3, marginTop: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Alur PPDB Online
        </Typography>
        <Typography variant="subtitle1" align="center" paragraph>
          Penerimaan Siswa untuk tahun ajaran 2024/2025 akan dimulai pada
          tanggal 14 Juni 2024.
        </Typography>
        <Stepper alternativeLabel>
          {steps.map((step, index) => (
            <Step key={step.label} completed={index < steps.length - 1}>
              <StepLabel>
                <Box display="flex" alignItems="center">
                  {step.icon}
                  <Box ml={1}>
                    <Typography variant="body1">{step.label}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {step.description}
                    </Typography>
                  </Box>
                </Box>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box
          mt={4}
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
        >
          <Typography variant="h6" gutterBottom>
            Unggah Bukti Pembayaran dan Formulir
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUploadClick}
          >
            Unggah Bukti Pembayaran
          </Button>
          <Button variant="contained" color="secondary" sx={{ mt: 2 }}>
            Isi Formulir
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AlurppdbOnline;

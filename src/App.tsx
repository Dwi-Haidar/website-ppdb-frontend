import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import About from "./pages/about";
import Home from "./pages/home";
import Login from "./pages/login";
import Layouts from "./layouts/layouts";
import PpdbOnline from "./pages/ppdbOnline";
import LayoutsAdmin from "./layouts/layoutsAdmin";
import Dashboard from "./pages/dashboard";
import DataPpdb from "./pages/ppdbData";
import PpdbOfline from "./pages/ppdbOfline";
import PrestasiPage from "./pages/PrestasiPage";
import DataPpdbEdit from "./pages/editKelulusan";
import { useEffect } from "react";
import DataKelulusan from "./pages/dataKelulusan";
import ProfileSekolah from "./pages/profileSekolah";
import Berita from "./pages/berita";
import AlurppdbOnline from "./pages/alurppdb-online";
import PaymentInstructions from "./pages/payment-instructions";
import Register from "./pages/register";
import AfterPaymentInstructions from "./pages/after-payment-instructions";
import DataBerita from "./pages/dataBerita";
import DataGaleri from "./pages/dataGaleri";
import DataEktrakulikuler from "./pages/dataEktrakulikuler";
import DetailPrestasi from "./pages/detailPrestasi";
import DetailBerita from "./pages/detail-berita";
import DataPrestasi from "./pages/data-prestasi";
import WaitingForVerification from "./pages/waiting-for-verification ";
import PaymentPage from "./pages/payment-page";

const App = () => {
  const isAuthenticated = !!localStorage.getItem("authToken");

  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };
  useEffect(() => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = "SB-Mid-client-xwt7dO0ikf2dVydv";
    const script = document.createElement("script");
    script.src = snapScript;
    script.setAttribute("data-client-key", clientKey);
    script.async = true;

    document.body.appendChild(script);
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Routes accessible to everyone */}
          <Route path="/" element={<Layouts />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />

            <Route path="ppdb-online" element={<AlurppdbOnline />} />
            <Route path="ppdbonline" element={<PpdbOnline />} />
            <Route
              path="/payment-instructions"
              element={<PaymentInstructions />}
            />
            <Route
              path="/waiting-for-verification"
              element={<WaitingForVerification />}
            />
            <Route
              path="/after-payment-instructions"
              element={<AfterPaymentInstructions />}
            />
            <Route path="payment-page" element={<PaymentPage />} />

            <Route path="ppdb-offline" element={<PpdbOfline />} />
            <Route path="prestasi" element={<PrestasiPage />} />
            <Route path="profile" element={<ProfileSekolah />} />
            <Route path="berita" element={<Berita />} />
            <Route path="detail-prestasi/:id" element={<DetailPrestasi />} />
            <Route path="detail-berita/:id" element={<DetailBerita />} />

            {/* <Route path="artikel" element={<ArticlesPage />} /> */}
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          {/* Protected Routes */}
          <Route path="/admin" element={<LayoutsAdmin />}>
            <Route index element={<Dashboard />} />
            <Route path="ppdb-data" element={<DataPpdb />} />
            <Route path="ppdb-kelulusan" element={<DataKelulusan />} />
            <Route path="ppdb-data/edit/:id" element={<DataPpdbEdit />} />
            <Route path="ppdb-berita" element={<DataBerita />} />
            <Route path="ppdb-galeri" element={<DataGaleri />} />
            <Route path="ppdb-ekskul" element={<DataEktrakulikuler />} />
            <Route path="ppdb-prestasi" element={<DataPrestasi />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

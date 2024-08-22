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
import Pengumuman from "./pages/pengumuman";
import DataPpdbEdit from "./pages/editKelulusan";
import { useEffect } from "react";
import DataKelulusan from "./pages/dataKelulusan";
import ProfileSekolah from "./pages/profileSekolah";
import Berita from "./pages/berita";
import AlurppdbOnline from "./pages/alurppdb-online";

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
            <Route path="login" element={<Login />} />
            <Route path="ppdb-online" element={<AlurppdbOnline />} />
            <Route path="ppdbonline" element={<PpdbOnline />} />
            <Route path="ppdb-ofline" element={<PpdbOfline />} />
            <Route path="pengumuman" element={<Pengumuman />} />
            <Route path="profile" element={<ProfileSekolah />} />
            <Route path="berita" element={<Berita />} />
            {/* <Route path="artikel" element={<ArticlesPage />} /> */}
          </Route>

          {/* Protected Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <LayoutsAdmin />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="ppdb-data" element={<DataPpdb />} />
            <Route path="ppdb-kelulusan" element={<DataKelulusan />} />
            <Route path="ppdb-data/edit/:id" element={<DataPpdbEdit />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/about";
import Home from "./pages/home";
import Login from "./pages/login";
import Layouts from "./layouts/layouts";
import PpdbOnline from "./pages/ppdbOnline";
import LayoutsAdmin from "./layouts/layoutsAdmin";
import Dashboard from "./pages/dashboard";
import DataPpdb from "../src/pages/ppdbData";
import PpdbOfline from "./pages/ppdbOfline";
import Pengumuman from "./pages/pengumuman";
import { useEffect } from "react";

import DataPpdbEdit from "./pages/editKelulusan";
const App = () => {
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
          <Route path="/" element={<Layouts />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="ppdb-online" element={<PpdbOnline />} />
            <Route path="ppdb-ofline" element={<PpdbOfline />} />
            <Route path="pengumuman" element={<Pengumuman />} />
            {/* <Route path="artikel" element={<ArticlesPage />} /> */}
          </Route>
          <Route path="/admin" element={<LayoutsAdmin />}>
            <Route index element={<Dashboard />} />
            <Route path="ppdb-data" element={<DataPpdb />} />
            <Route path="ppdb-data/edit/:id" element={<DataPpdbEdit />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

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

const App = () => {
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
          </Route>
          <Route path="/admin" element={<LayoutsAdmin />}>
            <Route index element={<Dashboard />} />
            <Route path="ppdb-data" element={<DataPpdb />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

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

const App = () => {
  const isAuthenticated = !!localStorage.getItem('authToken');

  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Routes accessible to everyone */}
          <Route path="/" element={<Layouts />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="ppdb-online" element={<PpdbOnline />} />
            <Route path="ppdb-ofline" element={<PpdbOfline />} />
            <Route path="pengumuman" element={<Pengumuman />} />
          </Route>
          
          {/* Protected Routes */}
          <Route path="/admin" element={<ProtectedRoute><LayoutsAdmin /></ProtectedRoute>}>
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

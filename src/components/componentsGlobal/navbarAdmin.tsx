import { useState, FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut, FiHome, FiTable, FiFileText } from "react-icons/fi";
import logo from "../../assets/image/logosekolah.png";

const NavbarAdmin: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <div style={{ fontSize: "16px", fontWeight: 500 }}>
      <button
        className="p-2 text-gray-700 bg-gray-200 md:hidden hover:bg-gray-300 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      <div
        className={`fixed inset-y-0 left-0 w-64 bg-green-700 text-white transform h-[100vh] shadow-lg ${isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform md:relative md:translate-x-0 md:flex md:flex-col`}
      >
        <button
          className="p-2 text-gray-700 bg-gray-200 md:hidden hover:bg-gray-300 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        <div className="p-4">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo Sekolah" className="w-[40px]" />
            <h2 className="text-sm font-bold">SMP ISLAM KARYA MUKTI</h2>
          </div>
          <nav className="flex flex-col mt-8">
            <ul>
              <li className="flex items-center py-3 px-4 hover:bg-green-600 rounded transition-colors">
                <FiHome className="mr-2" />
                <Link to="/admin">Dashboard</Link>
              </li>
              <li className="flex items-center py-3 px-4 hover:bg-green-600 rounded transition-colors">
                <FiTable className="mr-2" />
                <Link to="/admin/ppdb-data">Table PPDB</Link>
              </li>
              <li className="flex items-center py-3 px-4 hover:bg-green-600 rounded transition-colors">
                <FiTable className="mr-2" />
                <Link to="/admin/ppdb-kelulusan">Table Murid</Link>
              </li>
              <li className="flex items-center py-3 px-4 hover:bg-green-600 rounded transition-colors">
                <FiFileText className="mr-2" />
                <Link to="/admin/ppdb-berita">Berita Sekolah</Link>
              </li>
              <li className="flex items-center py-3 px-4 hover:bg-green-600 rounded transition-colors">
                <FiFileText className="mr-2" />
                <Link to="/admin/ppdb-galeri">Galeri</Link>
              </li>
              <li className="flex items-center py-3 px-4 hover:bg-green-600 rounded transition-colors">
                <FiFileText className="mr-2" />
                <Link to="/admin/ppdb-ekskul">Ektrakulikuler</Link>
              </li>
              <li className="flex items-center py-3 px-4 hover:bg-green-600 rounded transition-colors">
                <FiFileText className="mr-2" />
                <Link to="/admin/ppdb-prestasi">Prestasi</Link>
              </li>

            </ul>
          </nav>
        </div>

        <button
          className="mt-auto mb-4 mx-4 p-2 flex items-center justify-center text-gray-700 bg-gray-200 hover:bg-gray-300 rounded transition-colors focus:outline-none"
          onClick={handleLogout}
        >
          <FiLogOut className="mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default NavbarAdmin;

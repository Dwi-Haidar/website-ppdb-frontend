import { useState, FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/image/logosekolah.png";

const NavbarAdmin: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <div>
      <button
        className="p-2 text-gray-700 bg-gray-200 md:hidden hover:bg-gray-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      <div
        className={`fixed inset-y-0 left-0 w-64 bg-green-500 text-white transform h-[100vh] ${isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform md:relative md:translate-x-0 md:flex md:flex-col`}
      >
        <button
          className="p-2 text-gray-700 bg-gray-200 md:hidden hover:bg-gray-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
        <div className="p-4">
          <div className="flex items-center gap-2">
            <img src={logo} alt="" className="w-[40px]" />
            <h2 className="text-[10px] font-bold">SMPN ISLAM KARYA MUKTI</h2>
          </div>
          <nav className="flex flex-col mt-4">
            <ul>
              <li className="py-2 hover:bg-green-600 rounded pl-4">
                <Link to="/admin">Dashboard</Link>
              </li>
              <li className="py-2 hover:bg-green-600 rounded pl-4">
                <Link to="/admin/ppdb-data">Table PPDB</Link>
              </li>
            </ul>
          </nav>
        </div>
        <button
          className="mt-auto mb-4 p-2 text-gray-700 bg-gray-200 hover:bg-gray-300 my-10"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default NavbarAdmin;

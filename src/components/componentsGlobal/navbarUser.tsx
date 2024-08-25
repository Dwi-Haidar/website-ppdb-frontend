import { useState, useEffect, useRef } from 'react';
import Logo from "../../assets/image/logosekolah.png";
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

const NavbarUser: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState<number>(0);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200); // Delay before hiding the dropdown
    setDropdownTimeout(timeout);
  };

  const checkLoginStatus = () => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", backgroundColor: "#56b475", color: "white" }}
      className={`p-4 md:px-9 lg:px-14 transition-all duration-300 color`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <img src={Logo} alt="logo" className='w-[44px]' />
          <a style={{ fontSize: "16px", fontWeight: 500 }}>SMP Islam Karya Mukti</a>
        </Box>
        <div className="hidden md:flex gap-8 items-center" style={{ fontSize: "16px", fontWeight: 500 }}>
          <a href="/" className="hover:text-green-800">Home</a>
          <a href='/berita' className='hover:text-green-800'>Berita</a>
          <a href="/about" className="hover:text-green-800">Profile</a>
          <a href='/prestasi' className='hover:text-green-800'>Prestasi</a>
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button className={`hover:text-green-800`}>
              Pengumuman
              <svg
                className="inline w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-48 bg-green-600 rounded-md shadow-lg transition-opacity duration-300"
                style={{ opacity: isDropdownOpen ? 1 : 0 }}
              >
                <Link to="/ppdb-online">
                  <a className="block px-4 py-2 text-white hover:bg-green-400">PPDB Online</a>
                </Link>
                <Link to="/ppdb-offline">
                  <a className="block px-4 py-2 text-white hover:bg-green-400">PPDB Offline</a>
                </Link>
              </div>
            )}
          </div>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="hover:text-gray-400 text-[black] font-bold"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <a className="hover:text-gray-400 text-[black] font-bold">Login</a>
            </Link>
          )}
        </div>
        <div className="md:hidden">
          <button
            className={`focus:outline-none `}
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden right-3 top-20 absolute bg-green-600 rounded-[15%] p-1 z-50">
          <Link to={"/"}>
            <a className={`block text-gray-200 pr-[90px] pl-[20px] py-[15px] rounded-full hover:text-black hover:bg-green-400 font-bold`}>Home</a>
          </Link>
          <Link to={"/about"}>
            <a className={`block text-gray-200 pr-[90px] pl-[20px] py-[15px] rounded-full hover:text-black hover:bg-green-400 font-bold`}>About</a>
          </Link>
          <Link to={"/ppdb-online"}>
            <a className={`block text-gray-200 pr-[90px] pl-[20px] py-[15px] rounded-full hover:text-black hover:bg-green-400 font-bold`}>PPDB Online</a>
          </Link>
          <Link to={"/ppdb-offline"}>
            <a className={`block text-gray-200 pr-[90px] pl-[20px] py-[15px] rounded-full hover:text-black hover:bg-green-400 font-bold`}>PPDB Offline</a>
          </Link>
          <Link to={"/pengumuman"}>
            <a className={`block text-gray-200 pr-[90px] pl-[20px] py-[15px] rounded-full hover:text-black hover:bg-green-400 font-bold`}>Pengumuman</a>
          </Link>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className={`block text-gray-200 pr-[90px] pl-[20px] py-[15px] rounded-full hover:text-black hover:bg-green-400 font-bold`}
            >
              Logout
            </button>
          ) : (
            <Link to={"/login"}>
              <a className={`block text-gray-200 pr-[90px] pl-[20px] py-[15px] rounded-full hover:text-black hover:bg-green-400 font-bold`}>Login</a>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavbarUser;

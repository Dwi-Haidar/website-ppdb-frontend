import { useState, useEffect } from 'react';
import Logo from "../../assets/image/logosekolah.png";
import { Link } from 'react-router-dom';
import { Box, Button, Menu, MenuItem } from '@mui/material';

const NavbarUser: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState<number>(0);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const checkLoginStatus = () => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
  };
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const bgColor = scrollY > 50 ? 'bg-green-600' : 'bg-white';
  const textColor = scrollY > 50 ? 'text-white' : 'text-green-600';

  return (
    <nav className={`${bgColor} ${textColor} p-4 md:px-9 lg:px-14 transition-all duration-300`}>
      <div className="container mx-auto flex justify-between items-center">
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <img src={Logo} alt="logo" className='w-[44px]' />
          <a style={{ fontSize: "16px", fontWeight: 500 }}>SMP Islam Karya Mukti</a>
        </Box>
        <div className="hidden md:flex gap-8 items-center" style={{ fontSize: "16px", fontWeight: 500 }}>
          <a href="/" className="hover:text-green-800">Home</a>
          <a href='/berita' className='hover:text-green-800'>Berita </a>
          <a href="/about" className="hover:text-green-800">Profile</a>
          <Button
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleClick}
        sx={{ color: 'inherit', '&:hover': { color: 'green.800' } }}
      >
        Profile
      </Button>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          '& .MuiPaper-root': {
            backgroundColor: 'white',
            boxShadow: 3,
          },
        }}
      >
        <MenuItem
          component={Link}
          to="/about/ekstrakurikuler"
          onClick={handleClose}
          sx={{ '&:hover': { color: 'green.800' } }}
        >
          Ekstrakurikuler
        </MenuItem>
        <MenuItem
          component={Link}
          to="/about/visi-misi"
          onClick={handleClose}
          sx={{ '&:hover': { color: 'green.800' } }}
        >
          Visi Misi
        </MenuItem>
      </Menu>
          <a href="/ppdb-online" className="hover:text-green-800">ppdb-online</a>
          <a href="/ppdb-offline" className="hover:text-green-800">ppdb-offline</a>
          <a href="/pengumuman" className="hover:text-green-800">Prestasi</a>

          {!isLoggedIn ? (
            <a href="/login" className="hover:text-gray-400 text-[black] font-bold">Login</a>
          ) : (
            <button onClick={handleLogout} className="hover:text-gray-400 text-[black] font-bold">Logout</button>
          )}
        </div>
        <div className="md:hidden">
          <button
            className={`focus:outline-none ${textColor}`}
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
            <a className={`block text-gray-200 pr-[90px] pl-[20px] py-[15px] rounded-full hover:text-black hover:bg-green-400 font-bold`}>ppdb-online</a>
          </Link>
          <Link to={"/ppdb-offline"}>
            <a className={`block text-gray-200 pr-[90px] pl-[20px] py-[15px] rounded-full hover:text-black hover:bg-green-400 font-bold`}>ppdb-offline</a>
          </Link>
          <Link to={"/pengumuman"}>
            <a className={`block text-gray-200 pr-[90px] pl-[20px] py-[15px] rounded-full hover:text-black hover:bg-green-400 font-bold`}>pengumuman</a>
          </Link>
          {!isLoggedIn ? (
            <Link to={"/login"}>
              <a className={`block text-gray-200 pr-[90px] pl-[20px] py-[15px] rounded-full hover:text-black hover:bg-green-400 font-bold`}>Login</a>
            </Link>
          ) : (
            <button onClick={handleLogout} className={`block text-gray-200 pr-[90px] pl-[20px] py-[15px] rounded-full hover:text-black hover:bg-green-400 font-bold`}>Logout</button>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavbarUser;

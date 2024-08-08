import { useState, useEffect } from 'react';

const NavbarUser: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState<number>(0);

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

  // Determine the background color and text color based on scroll position
  const bgColor = scrollY > 50 ? 'bg-green-600' : 'bg-white';
  const textColor = scrollY > 50 ? 'text-white' : 'text-green-600';

  return (
    <nav
      className={`${bgColor} ${textColor} p-4 md:px-9 lg:px-14 transition-all duration-300`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">Logo</div>
        <div className="hidden md:flex gap-8 items-center">
          <a href="/" className="hover:text-green-800">Home</a>
          <a href="/about" className="hover:text-green-800">About</a>
          <a href="#about" className="hover:text-green-800">ppdb-online</a>
          <a href="#about" className="hover:text-green-800">ppdb-offline</a>
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
      {/* Dropdown menu for mobile */}
      {isOpen && (
        <div className="md:hidden right-3 top-20 absolute bg-green-600 rounded-[15%] p-1 z-50">
          <a href="#home" className={`block text-gray-200  pr-[90px] pl-[20px] py-[15px] rounded-full hover:text-black hover:bg-green-400 font-bold`}>Home</a>
          <a href="#about" className={`block  text-gray-200 pr-[90px] pl-[20px] py-[15px] rounded-full hover:text-black hover:bg-green-400 font-bold`}>About</a>
          <a href="#about" className={`block   text-gray-200 pr-[90px] pl-[20px] py-[15px] rounded-full hover:text-black hover:bg-green-400 font-bold`}>ppdb-online</a>
          <a href="#about" className={`block  text-gray-200 pr-[90px] pl-[20px] py-[15px] rounded-full hover:text-black hover:bg-green-400 font-bold`}>ppdb-offline</a>
        </div>
      )}
    </nav>
  );
};

export default NavbarUser;

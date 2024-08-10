import { useState, FC } from "react";

const NavbarAdmin: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <button
        className="p-2 text-gray-700 bg-gray-200 md:hidden hover:bg-gray-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-green-500 text-white transform h-[100vh] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform md:relative md:translate-x-0 md:flex md:flex-col`}
      >
        <button
          className="p-2 text-gray-700 bg-gray-200 md:hidden hover:bg-gray-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
        <div className="p-4">
          <h2 className="text-lg font-semibold">Admin</h2>
          <nav className="flex flex-col mt-[10%] ">
            <ul>
              <li className="py-2 hover:bg-green-600 rounded pl-[5%]">
                <a href="admin">Dashboard</a>
              </li>
              <li className="py-2 hover:bg-green-600 rounded pl-[5%]">
                <a href="#">table ppdb</a>
              </li>

            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default NavbarAdmin;

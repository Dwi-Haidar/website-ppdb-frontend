import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/componentsGlobal/navbarUser";
import Footer from "../components/componentsGlobal/footer";

const Layouts = () => {
  const location = useLocation();

  const isLoginPage = location.pathname === '/login';

  return (
    <div className="overflow-x-hidden">
      {!isLoginPage && (
        <div className="fixed z-50 w-full">
          <Navbar />
        </div>
      )}
      <div className={`mt-${isLoginPage ? '0' : '[100px]'}`}>
        <Outlet />
      </div>
      {!isLoginPage && (
        <div className="mt-10">
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Layouts;

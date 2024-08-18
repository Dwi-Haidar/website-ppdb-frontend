import { Outlet } from "react-router-dom";
import NavbarAdmin from "../components/componentsGlobal/navbarAdmin";
import { Box } from "@mui/material";

const LayoutsAdmin = () => {
  return (
    <Box display={"flex"} sx={{ height: '100vh' }}>
      <Box
        sx={{
          position: 'fixed',
          width: '250px',
          top: 0,
          bottom: 0,
          overflowY: 'auto',
          borderRight: '1px solid #ddd',
          "&::-webkit-scrollbar": { display: "none" }
        }}
      >
        <NavbarAdmin />
      </Box>
      <Box
        sx={{
          marginLeft: '250px',
          width: 'calc(100% - 250px)',
          overflowY: 'auto',
          height: '100vh'
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default LayoutsAdmin;

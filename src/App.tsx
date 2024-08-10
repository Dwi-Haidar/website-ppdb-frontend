import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/about";
import Home from "./pages/home";
import Login from "./pages/login";
import Layouts from "./layouts/layouts";
import PpdbOnline from "./pages/ppdbOnline";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layouts />}>
          <Route index element={<Home/ >}/>
            <Route path="/About" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/ppdb-online" element={<PpdbOnline />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

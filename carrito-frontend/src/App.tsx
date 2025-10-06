import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UsuarioGestion from "./components/UsuarioGestion";
import ArticuloGestion from "./components/ArticuloGestion";
import CarritoGestion from "./components/CarritoGestion";

export default function App() {
  return (
    <Router>
      <div>
        <nav style={{ marginBottom: "20px",
                      marginTop: "20px",
                      fontSize: "25px"
         }}>
          <Link to="/usuarios" style={{ marginRight: "10px" }}>Usuarios</Link>
          <Link to="/articulos" style={{ marginRight: "10px" }}>Artículos</Link>
          <Link to="/carritos">Carritos</Link>
        </nav>

        <Routes>
          <Route path="/usuarios" element={<UsuarioGestion />} />
          <Route path="/articulos" element={<ArticuloGestion />} />
          <Route path="/carritos" element={<CarritoGestion />} />
          <Route path="*" element={<p>Seleccioná una sección desde el menú</p>} />
        </Routes>
      </div>
    </Router>
  );
}

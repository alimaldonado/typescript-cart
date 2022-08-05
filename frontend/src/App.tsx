import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { About } from "./pages/About";
import { Home } from "./pages/Home";
import { Store } from "./pages/Store";
import { Navbar } from "./components/Navbar";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { AxiosInstanceProvider } from "./context/AxiosContext";
import { AdminPage } from "./pages/Admin";

function App() {
  return (
    <AxiosInstanceProvider config={{ baseURL: "http://localhost:5500/api" }}>
      <ShoppingCartProvider>
        <Navbar />
        <Container className="mb-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store/*" element={<Store />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </Container>
      </ShoppingCartProvider>
    </AxiosInstanceProvider>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Users from "./pages/Users/Users";
import AddUser from "./pages/Users/AddUser";
import EditUser from "./pages/Users/EditUser";
import Pemesanan from "./pages/Pemesanan/Pemesanan";
import AddPemesanan from "./pages/Pemesanan/AddPemesanan"
import EditPemesanan from "./pages/Pemesanan/EditPemesanan"
import KustomSelesai from "./pages/KustomSelesai/KustomSelesai"
import AddKustomSelesai from "./pages/KustomSelesai/AddKustomSelesai";
import EditKustomSelesai from "./pages/KustomSelesai/EditKustomSelesai";

function App() {
  return (
    <div className="main__conten">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/pemesanan" element={<Pemesanan />} />
          <Route path="/pemesanan/add" element={<AddPemesanan />} />
          <Route path="/pemesanan/edit/:uuid" element={<EditPemesanan />} />
          <Route path="/kustom-selesai" element={<KustomSelesai />} />
          <Route path="/kustom-selesai/add" element={<AddKustomSelesai />} />
          <Route path="/kustom-selesai/edit/:uuid" element={<EditKustomSelesai />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const PemesananList = () => {
  const [pemesanan, setPemesanan] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getPemesanan();
  }, []);
  
  const getPemesanan = async () => {
    const response = await axios.get("http://localhost:5000/pemesanan");
    setPemesanan(response.data);
  };

  const deletePemesanan = async (pemesananUuid) => {
    await axios.delete(`http://localhost:5000/pemesanan/${pemesananUuid}`);
    getPemesanan();
  };

  return (
    <div className="animation">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h3 className="h2">Pemesanan</h3>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
          <Link to={"/pemesanan/add"} className="btn btn-success">Tambah Pemesanan</Link>
          </div>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Nama Pemesan</th>
            <th scope="col">Jenis Kustom</th>
            <th scope="col">Perkiraan Harga</th>
            <th scope="col">Status</th>
            <th scope="col">Telp</th>
            <th scope="col" className="actions">Aksi</th>
          </tr>
        </thead>
        <tbody>
        {pemesanan.map((pemesanan, index) => (
            <tr key={pemesanan.uuid}>
              <td className="fw-bold">{index + 1}</td>
              <td>{pemesanan.nama_pemesan}</td>
              <td>{pemesanan.jenis_kustom}</td>
              <td>{pemesanan.perkiraan_harga}</td>
              <td>{pemesanan.selesai ? "Selesai" : "Pengerjaan"}</td>
              <td>{pemesanan.nomor_telepon_pelanggan}</td>
              <td>
                <div className="btn-group me-2">
                  <Link to={`/pemesanan/edit/${pemesanan.uuid}`} className="btn btn-warning" >Edit</Link>
                  <button className="btn btn-danger" onClick={() => deletePemesanan(pemesanan.uuid)} >Hapus</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PemesananList;

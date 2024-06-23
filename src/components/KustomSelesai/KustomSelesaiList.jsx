import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const KustomSelesaiList = () => {
  const [kustomSelesai, setKustomSelesai] = useState([]);

  useEffect(() => {
    getKustomSelesai();
  }, []);
  
  const getKustomSelesai = async () => {
    const response = await axios.get("http://localhost:5000/kustom-selesai");
    setKustomSelesai(response.data);
  };

  const deleteKustomSelesai = async (kustomSelesaiUUID) => {
    await axios.delete(`http://localhost:5000/kustom-selesai/${kustomSelesaiUUID}`);
    getKustomSelesai();
  };

  const calculateDate = (startDateClass, endDateClass) => {
    const startDate = moment(new Date(startDateClass))
    const endDate = moment(new Date(endDateClass))

    const durasi = moment.duration(endDate.diff(startDate))

    const years = durasi._data.years
    const months = durasi._data.months
    const days = durasi._data.days

    console.log(durasi._data)

    let result = ''
    if(years > 0) {
        result += `${years} tahun `
    }
    if(months > 0) {
        result += `${months} bulan `
    }
    if(days > 0) {
        result += `${days} hari`
    }

    return result.trim()
  }

  return (
    <div className="animation">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h3 className="h2">Kustom Selesai</h3>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
          <Link to={"/kustom-selesai/add"} className="btn btn-success">Tambah Kustom Selesai</Link>
          </div>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Nama Pemesan</th>
            <th scope="col">UUID Pemesanan</th>
            <th scope="col">Estimasi</th>
            <th scope="col">Harga Akhir</th>
            <th scope="col" className="actions">Aksi</th>
          </tr>
        </thead>
        <tbody>
        {kustomSelesai.map((kustomSelesai, index) => (
            <tr key={kustomSelesai.uuid}>
              <td className="fw-bold">{index + 1}</td>
              <td>{kustomSelesai.pemesanan.nama_pemesan}</td>
              <td>{kustomSelesai.pemesanan.uuid}</td>
              <td>{calculateDate(kustomSelesai.pemesanan.createdAt, kustomSelesai.tanggal_selesai)}</td>
              <td>{kustomSelesai.harga_akhir}</td>
              <td>
                <div className="btn-group me-2 button-td">
                  <Link to={`/kustom-selesai/edit/${kustomSelesai.uuid}`} className="btn btn-warning" >Edit</Link>
                  <button className="btn btn-danger" onClick={() => deleteKustomSelesai(kustomSelesai.uuid)} >Hapus</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KustomSelesaiList;

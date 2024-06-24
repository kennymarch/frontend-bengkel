import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams ,useNavigate } from "react-router-dom";

const FormUpdatePemesanan = () => {
  const [namaPemesan, setNamaPemesan] = useState("");
  const [jenisKustom, setJenisKustom] = useState("");
  const [perkiraanHarga, setPerkiraanHarga] = useState(0);
  const [nomerTelepon, setNomerTelepon] = useState("");
  const [penginput, setPenginput] = useState("")
  const [msg, setMsg] = useState("");

  const { uuid } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    const getPemesananByUuid = async() => {
      try {
        const response = await axios.get(`http://localhost:5000/pemesanan/${uuid}`)
        console.log(response.data)

        setNamaPemesan(response.data.nama_pemesan)
        setJenisKustom(response.data.jenis_kustom)
        setPerkiraanHarga(response.data.perkiraan_harga)
        setNomerTelepon(response.data.nomor_telepon_pelanggan)
        setPenginput(response.data.user.name)
      } catch (error) {
        if(error) {
          setMsg(error.message)
          console.log(error)
        } 
      }
    }

    getPemesananByUuid()
  }, [uuid])

  const updatePemesanan = async(event) => {
    event.preventDefault()

    try {
      await axios.patch(`http://localhost:5000/pemesanan/${uuid}`, 
        {
          nama_pemesan : namaPemesan,
          jenis_kustom : jenisKustom,
          perkiraan_harga : perkiraanHarga,
          nomor_telepon_pelanggan : nomerTelepon
        }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      navigate("/pemesanan")
    } catch (error) {
       if(error) {
        setMsg(error.response.data.msg)
        console.log(error)
       }
    }
  }

  return (
    <div className="animation">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h3 className="h2">Edit Pesanan</h3>
        <p>{msg}</p>
      </div>
      <form className="form p-4" onSubmit={updatePemesanan} >
        <div className="form-dashboard">
          <p>Penginput : {penginput}</p>
          <div className="form-floating mb-3">
            <input value={namaPemesan} onChange={(event) => setNamaPemesan(event.target.value)} type="text" className="form-control" id="floatingInput" placeholder="Nama Pemesan" />
            <label htmlFor="floatingInput">Nama Pemesan</label>
          </div>

          <div className="form-floating mb-3">
            <input value={jenisKustom} onChange={(event) => setJenisKustom(event.target.value)} type="text" className="form-control" id="floatingInput" placeholder="Jenis Custom" />
            <label htmlFor="floatingInput">Jenis Custom</label>
          </div>
          
          <div className="form-floating mb-3">
            <input value={perkiraanHarga} onChange={(event) => setPerkiraanHarga(event.target.value)} type="number" className="form-control" id="floatingInput" placeholder="Perkiraan Harga" />
            <label htmlFor="floatingInput">Perkiraan Harga</label>
          </div>

          <div className="form-floating mb-3">
            <input value={nomerTelepon} onChange={(event) => setNomerTelepon(event.target.value)} type="number" className="form-control" id="floatingInput" placeholder="Nomor Telepon" />
            <label htmlFor="floatingInput">Nomor Telepon</label>
          </div>
        </div>
        <button className="w-10 btn btn-lg btn-primary button-save" type="submit">
          Simpan
        </button>
      </form>
    </div>
  );
};

export default FormUpdatePemesanan;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddProduct = () => {
  const [pemesanan, setPemesanan] = useState([]);
  const [pemesananUuid, setPemesananUUID] = useState("");
  const [hargaAkir, setHargaAkir] = useState(0);
  const [tanggalSelesai, setTanggalSelesai] = useState(new Date());
  const [file, setFile] = useState("");
  const [preview, setpreview] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getPemesanan();
  }, []);
  
  const getPemesanan = async () => {
    const response = await axios.get("http://localhost:5000/pemesanan");
    setPemesanan(response.data);
  };

  const navigate = useNavigate()

  const saveProduct = async(event) => {
    event.preventDefault()
    const formData = new FormData();
    
    
    formData.append("pemesananUuid", pemesananUuid);
    formData.append("harga_akhir", hargaAkir);
    formData.append("tanggal_selesai", `${tanggalSelesai}`);
    formData.append("file", file);

    try {
      await axios.post("http://localhost:5000/kustom-selesai", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      navigate("/kustom-selesai")
    } catch (error) {
       if(error) {
        setMsg(error.response.data.msg)
        console.log(error)
       }
    }
  }

  const loadImage = (event) => {
    const image = event.target.files[0]
    console.log(image)
    setFile(image)
    setpreview(URL.createObjectURL(image))
  }

  return (
    <div className="animation">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h3 className="h2">Tambah Kustom Selesai</h3>
        <p>{msg}</p>
      </div>
      <form className="form p-4" onSubmit={saveProduct}>
        <div className="form-dashboard">
          <div className="select mb-3">
            <label>Pemesan</label>
          <select value={pemesananUuid} onChange={(event) => setPemesananUUID(event.target.value)} className="form-select" aria-label="Pemesan">
              <option value=""></option>
              {pemesanan.map((pemesanan) => <option key={pemesanan.uuid} value={pemesanan.uuid}>{`${pemesanan.nama_pemesan} | ${pemesanan.uuid}`}</option>)}
            </select>
          </div>

          <div className="form-floating mb-3">
            <input value={hargaAkir} onChange={(event) => setHargaAkir(event.target.value)} type="number" className="form-control" id="floatingInput" placeholder="Harga Akir" />
            <label htmlFor="floatingInput">Harga Akir</label>
          </div>

          <div className="form-floating mb-3">
            <input type="date" className="form-control" id="floatingPassword" value={tanggalSelesai} onChange={(event) => setTanggalSelesai(event.target.value)} placeholder="Tanggal Selesai" required/>
            <label htmlFor="floatingPassword">Tanggal Selesai</label>
          </div>

          <div className="foto mb-3">
            <label htmlFor="floatingPassword">Masukkan Foto Hasil Kustom</label>
            <div>
              <div>
                <label className="d-flex flex-column">
                  <input type="file" className="file-input" onChange={loadImage} />
                  <span className="file-cta">
                    {preview ? (
                      <figure className="figure">
                        <img src={preview} alt="Gambar Pilihan" className="figure-img img-fluid rounded" />
                      </figure>
                    ) : ("")}
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <button className="w-10 btn btn-lg btn-primary button-save" type="submit">
          Simpan
        </button>
      </form>
    </div>
  );
};

export default FormAddProduct;

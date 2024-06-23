import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams ,useNavigate } from "react-router-dom";

const FormUpdateKustomSelesai = () => {
  const [namaPemesan, setNamaPemesan] = useState("");
  const [pemesananUuid, setPemesananUUID] = useState("");
  const [hargaAkir, setHargaAkir] = useState(0);
  const [tanggalSelesai, setTanggalSelesai] = useState(new Date());
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const [msg, setMsg] = useState("");

  const { uuid } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    const getKustomSelesaiById = async() => {
      try {
        const response = await axios.get(`http://localhost:5000/kustom-selesai/${uuid}`)

        setNamaPemesan(response.data.pemesanan.nama_pemesan)
        setPemesananUUID(response.data.pemesanan.uuid)
        setHargaAkir(response.data.harga_akhir)
        setTanggalSelesai(new Date(response.data.tanggal_selesai))
        setFile(response.data.image)
        setPreview(response.data.url)
      } catch (error) {
        if(error) {
          setMsg(error.response.data.msg)
          console.log(error)
        } 
      }
    }

    getKustomSelesaiById()
  }, [uuid])

  const updateKustomSelesai = async(event) => {
    event.preventDefault()
    const formData = new FormData();
    
    
    formData.append("harga_akhir", hargaAkir);
    formData.append("tanggal_selesai", tanggalSelesai);
    formData.append("file", file);

    try {
      await axios.patch(`http://localhost:5000/kustom-selesai/${uuid}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log(file)
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
    setFile(image)
    setPreview(URL.createObjectURL(image))
  }


  return (
    <div className="animation">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h3 className="h2">Update Kustom Selesai</h3>
        <p>{msg}</p>
      </div>
      <form className="form p-4" onSubmit={updateKustomSelesai} >
        <div className="form-dashboard">
          <div className="mb-3">
            <h4>Nama Pemesan : {namaPemesan}</h4>
            <h4>UUID Pemesan : {pemesananUuid}</h4>
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
                    <span className="file-cta">
                    {preview ? (
                      <figure className="figure">
                        <img src={preview} alt="Gambar Pilihan" className="figure-img img-fluid rounded" />
                      </figure>
                    ) : ("")}
                    </span>
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

export default FormUpdateKustomSelesai;

import { createContext, useState } from "react";
import apiClient from "../services/apiClien";

export const ManagerContext = createContext();

export default function ManagerContextProvider({ children }) {
  // Url type state
  const [type, setType] = useState("")
  // Hapus tim state
  const [idHapusTim, setIdHapusTim] = useState(null);
  const [openModalHapusTim, setOpenModalHapusTim] = useState(false);
  const [refresh, setRefresh] = useState(false);
  // Hapus pengguna state
  const [openModalHapusPengguna, setOpenModalHapusPengguna] = useState(false);
  const [idHapusPengguna, setIdHapusPengguna] = useState(null);
  const [loading, setLoading] = useState(false);
  // Update Pengguna state
  const [formEditPengguna, setFormEditPengguna] = useState({
    name: "",
    email: "",
    password: "",
    role: "athlete", // Default role ke athlete
    team_id: "", // Tambahkan team_id ke state
  });
  const [idEditPengguna, setIdEditPengguna] = useState(null);
  const [openModalEditPengguna, setOpenModalEditPengguna] = useState(false);
  // Edit jadwal praktek state
  const [openModalEditPraktek, setOpenModalEditPraktek] = useState(false);
  const [idEditJadwalPraktek, setIdJadwalPraktek] = useState(null);
  const [formEditJadwal, setForomEditJadwal] = useState({
    // field umum
    team_id:"",
    date:"",
    location:"",
    // Field latihan
    start_time:"",
    end_time:"",
    // field pertandingan
    opponent_name:"",
    time:""
  })

  const submitHapusTim = async () => {
    try {
      await apiClient.delete(`/manager/teams/${idHapusTim}`);
      alert("Berhasil hapus tim");
      setOpenModalHapusTim(false);
      setIdHapusTim(null);
      setRefresh(true);
    } catch (err) {
      console.log("Error hapus tim", err);
    }
  };
  //   Hapus Tim
  function handleOpenModalHapusTim(id) {
    setOpenModalHapusTim(true);
    setIdHapusTim(id);
  }
  function handleCloseModalHapusTim() {
    setOpenModalHapusTim(false);
    setIdHapusTim(null);
  }

  //   Submit hapus pengguna
  const submitHapusPengguna = async () => {
    try {
      await apiClient.delete(`/manager/user/${idHapusPengguna.id}`);
      alert("Berhasil pengguna");
      setRefresh(true);
      setOpenModalHapusPengguna(false);
      setIdHapusPengguna(null);
    } catch (err) {
      alert("Gagal hapus pengguna", err);
    }
  };

  //   Hapus pengguna
  function handleOpenModalHapusPengguna(id) {
    setOpenModalHapusPengguna(true);
    setIdHapusPengguna(id);
  }
  function closeModalHapusPengguna() {
    setOpenModalHapusPengguna(false);
    setIdHapusPengguna(null);
  }

  // Submit edit pengguna
  const handleSubmitEditPengguna = async (e) => {
    e.preventDefault();
    setLoading(true);
    const id = idEditPengguna.id;
    try {
      await apiClient.put(`/manager/user/${id}`, formEditPengguna);
      alert("Berhasil edit pengguna");
      setIdEditPengguna(null);
      setOpenModalEditPengguna(false);
      setRefresh(true);
    } catch (err) {
      alert("Gagal update pengguna", err);
    } finally {
      setLoading(false);
    }
  };
  // Handle Modal edit pengguna
  function handleOpenModalEditPengguna(id) {
    setOpenModalEditPengguna(true);
    setIdEditPengguna(id);
  }
  function closeModalEditPengguna() {
    setOpenModalEditPengguna(false);
    setIdEditPengguna(null);
  }

  // Submit edit jadwal praktek
  const handleSubmitEditJadwalPraktek = async (e) => {
    e.preventDefault()
    setLoading(true)
    try{
      const id = idEditJadwalPraktek.id.split('-')[1]; // Ambil ID numerik dari string (misal: "practice-5" -> 5)
      const typeJadwal = idEditJadwalPraktek.type

      let payload = {...formEditJadwal}
      let url = ""

      if(typeJadwal === "Latihan"){
        url = `/manager/practices/${id}`
        // Hapus kolom tidak guna
        delete payload.opponent_name
        delete payload.time
      }else if(typeJadwal === "Pertandingan"){
        url = `/manager/matches/${id}`
        delete payload.start_time
        delete payload.end_time
      }else {
        throw new Error("Tipe jadwal tidak valid")
      }

      await apiClient.put(url, payload)

      alert("Berhasil update jadwal")
      setOpenModalEditPraktek(false)
      setIdJadwalPraktek(null)
      setRefresh(true)
      setType("")
    }catch(err){
      const errorMessage = err.response?.data?.message || err.message;
      alert(`Gagal update jadwal praktek: ${errorMessage}`)
    }
  }

  // Open Modal Edit Jadwal Praktek
  function handleOpenModalEditJadwaPraktek(id){
    setOpenModalEditPraktek(true)
    setIdJadwalPraktek(id)
    if (id.type === "Latihan") {
      setType("practices");
    } else if (id.type === "Pertandingan") {
      setType("match");
    }
  }
  // Tutup modal edit jadwal praktek
  function handleCloseModalEditJadwalPraktek(){
    setOpenModalEditPraktek(false)
    setIdJadwalPraktek(null)
    setType("")
  }

  const contextValue = {
    // // Update Jadwal pertandingan
    // setFormEditJadwalPertandingan,
    // formEditJadwalPertandingan,
    // Update jadwal latihan
    handleSubmitEditJadwalPraktek,
    handleOpenModalEditJadwaPraktek,
    handleCloseModalEditJadwalPraktek,
    openModalEditPraktek,
    formEditJadwal,
    setForomEditJadwal,
    idEditJadwalPraktek,
    // context wajib
    loading,
    refresh,
    setRefresh,
    setLoading,
    // Hapus tim
    idHapusTim,
    submitHapusTim,
    handleOpenModalHapusTim,
    handleCloseModalHapusTim,
    openModalHapusTim,
    // hapus pengguna
    handleOpenModalHapusPengguna,
    closeModalHapusPengguna,
    submitHapusPengguna,
    openModalHapusPengguna,
    // Update pengguna
    setFormEditPengguna,
    formEditPengguna,
    setOpenModalEditPengguna,
    openModalEditPengguna,
    handleSubmitEditPengguna,
    handleOpenModalEditPengguna,
    closeModalEditPengguna,
    idEditPengguna,
  };

  return (
    <ManagerContext.Provider value={contextValue}>
      {children}
    </ManagerContext.Provider>
  );
}

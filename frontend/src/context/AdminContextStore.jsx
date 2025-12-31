import { createContext, useEffect, useState } from "react";
import apiClient from "../services/apiClien";

export const AdminContext = createContext()

export default function AdminContextStore({children}){
    const [dataAdmin, setDataAdmin] = useState({
        dataTim: [],
        dataAtlet: [],
        dataCabor: []
    })
    const [loading, setLoading] = useState(false)
    const [formPengguna, setFormPengguna] = useState({
    name: "",
    email: "",
    password: "",
    role: "athlete", // Default role ke athlete
    team_id: "", // Tambahkan team_id ke state
    cabor_id:""
  });
    const [openModal, setOpenModal] = useState({
        type: null,
    })
    const [id, setId] = useState({
        idEdit:null,
        idDelete:null,
        idDeleteAtlet: null
    })
    const [refresh, setRefresh] = useState(false)
    const[formInput, setFormInput] = useState({
        name: '',
        cabor_id: ''
    })

    const fetchDataTim = async () => {
        setLoading(true)
        try{
            const res = await apiClient.get('/admin/dashboard')
            const resCabor = await apiClient.get("/manager/cabor")
            const data = res.data.tim
            const dataCabor = resCabor.data.data.data
            const listAtlet = data.flatMap(tim => 
            (tim.daftar_atlet || []).map(atlet =>({...atlet}))
            )
            setDataAdmin({
                dataTim: data,
                dataAtlet:listAtlet,
                dataCabor: dataCabor
            })
            setRefresh(false)
        }catch(err){
            console.log("Error fetch data tim admin", err);
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDataTim()
    }, [refresh])
    // Fungsi delete tim
    function handleOpenModalDelete(id){
        setOpenModal({type: "delete"})
        setId({idDelete:id})
    }
    function closeModalDelete(){
        setOpenModal({type: null})
        setId({idDelete:null})
    }
     const submitDeleteTim = async () => {
        setLoading(true)
        try{
            await apiClient.delete(`/admin/team/${id.idDelete}`)
            setOpenModal({type: null})
            alert("Berhasil delete tim")
            setId({idDelete: null})
            setRefresh(true)
        }catch(err){
            alert("Gagal hapus tim", err)
        }
    }

    // fungsi input team
    function openModalTeamInput(){
        setOpenModal({type: "input"})
    }
    function closeModalTeamInput(){
        setOpenModal({type: null})
    }
    const submitInputTeam = async (e) => {
        e.preventDefault()
        setLoading(true)
        try{
            await apiClient.post(`/admin/team`, formInput)
            alert("Berhasil input tim")
            setOpenModal({type: null})
            setRefresh(true)
        }catch(err){
            alert("Gagal input team", err)
        }
    }

    //Fungsi input atlet
    function openModalInputAtlet(){
        setOpenModal({type: "inputAtlet"})
    }
    function closeModalInputAtlet(){
        setOpenModal({type: null})
    }
    const handleSubmitAtlet = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await apiClient.post("/register", formPengguna);
      setOpenModal({type: null})
      alert("Pengguna baru berhasil ditambahkan!");
      setRefresh(true)
    } catch (err) {
      alert("Gagal tambah ", err.data ? err.response : err.message);
      console.log(err.data ? err.response : err.message);
    } finally {
      setLoading(false);
    }
  };

//Fungsi hapus atlet
function openModalDeleteAtlet(id){
    setOpenModal({type: 'hapusAtlet'})
    setId({idDeleteAtlet: id})
}
function closeModalDeleteAtlet(){
    setOpenModal({type: null})
    setId({idDeleteAtlet: null})
}
const submitDeleteAtlet = async () => {
    setLoading(true)
    try{
        await apiClient.delete(`/admin/atlet/${id.idDeleteAtlet.id}`)
        alert("Berhasil hapus atlet")
        setOpenModal({type:null})
        setId({idDeleteAtlet:null})
        setRefresh(true)
    }catch(err){
        const errorMessage = err.response ? err.response.data : err.response.message
        alert(`Gagal hapus atlet ${errorMessage}` )
    }finally{
        setLoading(false)
    }
}


    const ctxValue ={
        loading,
        dataAdmin,
        // Handle modal
        handleOpenModalDelete,
        closeModalDelete,
        id,
        openModal,
        submitDeleteTim,
        // Input tim
        formInput,
        setFormInput,
        openModalTeamInput,
        closeModalTeamInput,
        submitInputTeam,
        // Input atlet
        openModalInputAtlet,
        closeModalInputAtlet,
        formPengguna,
        setFormPengguna,
        handleSubmitAtlet,
        // Hapus Atlet
        openModalDeleteAtlet,
        closeModalDeleteAtlet,
        submitDeleteAtlet,
    }

    return (
        <AdminContext.Provider value={ctxValue}>
            {children}
        </AdminContext.Provider>
    )
}
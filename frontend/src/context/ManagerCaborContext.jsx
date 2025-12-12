import { createContext, useEffect, useMemo, useState } from "react";
import apiClient from "../services/apiClien";

export const CaborContext = createContext()

export default function ManagerCaborContext({children}){
    const [dataCabor, setDataCabor] = useState([])
    const [openModalTambahCabor, setOpenModalTambahCabor] = useState(false)
    const [loading, setLoading] = useState(false)
    const [tambahCabor, setTambahCabor] = useState({
        nama_cabor:""
    })
    const [refresh, setRefresh] = useState(true)
    const [id, setId] = useState("")
    const [openModalHapusCabor, setOpenModalHapusCabor] = useState(false)
    const [openModalEditCabor, setOpenModalEditCabor] = useState(false)
    const [selectedTeamFilter, setSelectedTeamFilter] = useState("all")

    const fetchDataCabor = async () => {
       try{
         const res = await apiClient.get('/manager/cabor')
        const data = res.data.data.data
        setDataCabor(data)
        setRefresh(false)
       }catch(err){
        console.log("Gagal fetch data cabor", err)
       }
    }
    useEffect(() => {
        fetchDataCabor()
    },[refresh])

    function handleOpenModalTambahCabor(){
        setOpenModalTambahCabor(true)
    }
    function handleCloseModaTambahCabor(){
        setOpenModalTambahCabor(false)
    }

    const handleSubmitTambahCabor = async (e) => {
        setLoading(true)
        e.preventDefault()
        try{
            await apiClient.post('/manager/cabor', tambahCabor)
            alert("Tambah cabor berhasil")
            setOpenModalTambahCabor(false)
            setRefresh(true)
        
        }catch(err){
            alert("Gagal tambah cabor", err)
        }
    }

    function handleOpenModalHapusCabor(id){
        setOpenModalHapusCabor(true)
        setId(id)
    }

    function handleCloseModalHapusCabor(){
        setOpenModalHapusCabor(false)
        setId("")
    }

    const submitHapusCabor = async () => {
        setLoading(true)
        try{
            await apiClient.delete(`/manager/cabor/${id}`)
            alert("Berhasil hapus cabor")
            setOpenModalHapusCabor(false)
            setId("")
            setRefresh(true)
        }catch(err){
            alert("Gagal hapus cabor", err)
        }
    }

    function handleOpenModalEditCabor(id){
        setOpenModalEditCabor(true)
        setId(id)
    }
    function handleCloseModalEditCabor(){
        setOpenModalEditCabor(false)
        setId("")
    }
    const submitEditCabor = async (e) => {
        setLoading(true)
        e.preventDefault()
        try{
            await apiClient.put(`/manager/cabor/${id}`)
            alert("Berhasil edit cabor")
            setOpenModalEditCabor(false)
            setId("")
            setRefresh(true)
        }catch(err){
            alert("Gagal edit cabor", err)
        }
    }

    // const allTeam = dataCabor.map(tim => {
    //     return tim.team; 
    // }).flat()

    //Tampilkan cabor mana yang memiliki tim dengan ID yang dipilih 
    // const filteredDataCabor = useMemo(() => {
    //     const filterIdCabor = selectedTeamFilter === "all" ? "all" : selectedTeamFilter
    //     if(filterIdCabor === "all"){
    //         return dataCabor
    //     }else{
    //         return dataCabor.filter((cabor) => 
    //             cabor.team.some(team => {
    //                 return team.id == filterIdCabor
    //             })
    //         )
    //     }
    // },[dataCabor, selectedTeamFilter])

    const contextValue = {
        dataCabor,
        loading,
        refresh,
        // Modal tambah cabor
        openModalTambahCabor,
        handleOpenModalTambahCabor,
        handleCloseModaTambahCabor,
        handleSubmitTambahCabor,
        setTambahCabor,
        tambahCabor,
        // Modal hapus cabor
        handleOpenModalHapusCabor,
        handleCloseModalHapusCabor,
        submitHapusCabor,
        openModalHapusCabor,
        // Modal edit cabor
        handleOpenModalEditCabor,
        handleCloseModalEditCabor,
        submitEditCabor,
        openModalEditCabor,
        // Filter cabor
        // allTeam,
        // filteredDataCabor,
        setSelectedTeamFilter
    }

    return(
        <CaborContext.Provider value={contextValue}>
            {children}
        </CaborContext.Provider>
    )
}
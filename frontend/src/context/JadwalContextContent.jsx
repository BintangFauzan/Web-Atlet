import { createContext, useEffect, useState } from "react";
import apiClient from "../services/apiClien";

export const JadwalContext = createContext()

export default function JadwalContextContent({children}){
    const [dataJadwal, setDataJadwal] = useState([])
    const [from, setFrom] = useState(1)
    const [pagination, setPagination] = useState({
        from: 1,
        last_page: 1,
        per_page: 10,
        total: 0
    })
    const [loading, setLoading] = useState(false)

    function handleNextPage(){
        if(from < pagination.last_page){
            setFrom((prevPage) => prevPage + 1)
        }
    }

    function handlePrevPage(){
        if(from > 1){
            setFrom((prevPage) => prevPage -1)
        }
    }

    const fetchDataJadwal = async () => {
        setLoading(true)
        try{
            const res = await apiClient.get(`/manager/jadwal/?page=${from}`)
            const pagination = res.data
            const data = res.data.data
            setDataJadwal(data)
            setPagination({
                from: pagination.from,
                last_page: pagination.last_page,
                per_page: pagination.per_page,
                total: pagination.total
            })
        }catch(err){
            console.log("Error fetch data jadwal", err)
        }finally{
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchDataJadwal()
    }, [from])

    const ctxValue = {
        dataJadwal,
        handleNextPage,
        handlePrevPage,
        pagination: { ...pagination, currentPage: from },
        loading
    }

    return(
        <JadwalContext.Provider value={ctxValue}>
            {children}
        </JadwalContext.Provider>
    )
}
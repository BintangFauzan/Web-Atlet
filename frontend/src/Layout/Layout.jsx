import {Outlet, useNavigate} from "react-router"
import Sidebar from "./Sidebar"
import Button from "../ui/Button"
import { useState } from "react"
import apiClient from "../services/apiClien"

export default function Layout(){
    const userRole = localStorage.getItem("userRole") || "manager"
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const handleLogout = async () => {
    setLoading(true)
    const token = localStorage.getItem("AuthToken")
    try{
      await apiClient.post("/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      localStorage.removeItem("AuthToken")
      localStorage.removeItem("DataUser")
      localStorage.removeItem("IdUser")
      localStorage.removeItem("UserRole")
      
      navigate('/', {replace: true})
    }catch(err){
      console.log("Logout error", err)
       localStorage.removeItem("AuthToken")
      localStorage.removeItem("DataUser")
      localStorage.removeItem("IdUser")
      localStorage.removeItem("UserRole")
      navigate('/', {replace:true})
    }
  }
    return(
        <>
        <div className=" h-screen bg-gray-50">
      {/* Sidebar: Jika Anda ingin menampilkannya lagi, hapus komentar di bawah */}
      {/* <Sidebar role={userRole} /> */}

      {/* Area Konten Utama: Mengambil sisa lebar */}
      <main className=" transition-all duration-300 p-8">
        {/* Header/Navbar di atas area konten (opsional, bisa ditambahkan di sini) */}
        <header className="mb-8 pb-4 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800 capitalize">
            {/* Judul Halaman Dinamis */}
            {userRole} Dashboard
          </h1>
          <div>
            <Button onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </header>
        
        {/* Konten Halaman yang Berubah */}
        <div className="content-area">
          <Outlet />
        </div>
      </main>
    </div>
        </>
    )
}
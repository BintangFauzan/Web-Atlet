import {Outlet} from "react-router"
import Sidebar from "./Sidebar"

export default function Layout(){
    const userRole = localStorage.getItem("userRole") || "manager"
    return(
        <>
        <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar: Lebar tetap di sisi kiri */}
      <Sidebar role={userRole} />

      {/* Area Konten Utama: Mengambil sisa lebar */}
      <main className="flex-1 transition-all duration-300 ml-64 p-8">
        {/* Header/Navbar di atas area konten (opsional, bisa ditambahkan di sini) */}
        <header className="mb-8 pb-4 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800 capitalize">
            {/* Judul Halaman Dinamis */}
            {userRole} Dashboard
          </h1>
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
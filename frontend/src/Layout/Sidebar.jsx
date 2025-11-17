import { Link, useLocation, useNavigate } from "react-router";
import {Home, Users, Calendar, Settings, LogOut, Trello, PlusCircle} from "lucide-react"
import { useState } from "react";
import apiClient from "../services/apiClien";


export default function Sidebar({role}) {
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

   const location = useLocation(); 

    const menuItems = {
      manager: [
        { name: 'Dashboard', path: '/dashboard/manager', icon: Home },
        { name: 'Kelola Tim', path: '/manager/teams', icon: Users },
        { name: 'Jadwal Latihan', path: '/manager/practices', icon: Calendar },
        { name: 'Jadwal Pertandingan', path: '/manager/matches', icon: Trello },
      ],
      coach: [
        { name: 'Dashboard', path: '/dashboard/coach', icon: Home },
        { name: 'Kelola Absensi', path: '/coach/attendance', icon: PlusCircle },
        { name: 'Lihat Jadwal', path: '/coach/schedule', icon: Calendar },
      ],
      athlete: [
        { name: 'Dashboard', path: '/dashboard/athlete', icon: Home },
        { name: 'Jadwal Saya', path: '/athlete/schedule', icon: Calendar },
        { name: 'Riwayat Absensi', path: '/athlete/history', icon: Trello },
      ],
    };

    // 4. Definisikan currentMenu (menggunakan variabel 'role')
    const currentMenu = menuItems[role] || menuItems.athlete;
  return (
    <>
      <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white flex flex-col shadow-lg z-10">
        {/* Logo/Judul Aplikasi */}
        <div className="p-6 text-2xl font-extrabold text-blue-400 border-b border-gray-700">
          Web Atlet
        </div>

        {/* Navigasi Utama */}
        <nav className="flex-1 p-4 space-y-2">
          {currentMenu.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            const IconComponent = item.icon;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-blue-600 font-semibold shadow-md"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                <IconComponent className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer Navigasi (Pengaturan & Logout) */}
        <div className="p-4 border-t border-gray-700 space-y-2">
          <Link
            to="/settings"
            className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-700"
          >
            <Settings className="w-5 h-5 mr-3" />
            Pengaturan
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center p-3 rounded-lg text-red-400 hover:bg-gray-700 transition-colors duration-200"
          >
            <LogOut className="w-5 h-5 mr-3"/>
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

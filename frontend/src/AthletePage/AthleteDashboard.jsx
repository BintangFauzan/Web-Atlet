import { useEffect, useState } from "react";
import moment from "moment";
import { Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Link } from "react-router";
import apiClient from "../services/apiClien";

// Helper untuk mengambil token
const getAuthToken = () => {
  return localStorage.getItem('AuthToken');
};

export default function AthleteDashboard() {
  const [data, setData] = useState({
    team_name: "",
    upcoming_practices: [],
    upcoming_matches: [],
  });
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activePractice, setActivePractice] = useState(null);

  const fetchData = async () => {
      setLoading(true);
      setError(null);
      const token = getAuthToken();

      if (!token) {
        setError("Autentikasi gagal. Silakan login kembali.");
        setLoading(false);
        return;
      }

      try {
        const response = await apiClient.get("/athlete/dashboard");
        const result = response.data;

        setData(result);

        // LOGIKA TAMPILAN: Identifikasi Latihan yang Boleh Check-In
        // Berdasarkan logika backend, kita cari latihan yang dijadwalkan HARI INI.
        const todayString = moment().format('YYYY-MM-DD');
        const practiceForCheckIn = result.upcoming_practices.find(
          // Tampilkan jika jadwalnya hari ini DAN atlet belum check-in
          practice => practice.date.substring(0, 10) === todayString && !practice.has_checked_in
        );
        setActivePractice(practiceForCheckIn);

      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("Gagal mengambil data dashboard. Periksa koneksi Anda.");
        }
        console.error("Error fetching dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    
    fetchData();
  }, []);


  const handleCheckIn = async () => {
    if (!activePractice) return;

    setIsCheckingIn(true);

    try {
      // Gunakan apiClient (Axios) agar konsisten
      const response = await apiClient.post(`/athlete/checkin/${activePractice.id}`);
      const result = response.data;

      alert(result.message); // "Kehadiran berhasil dicatat."
      setActivePractice(null); // Sembunyikan tombol setelah berhasil
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert(`Error: ${err.response.data.message}`);
      } else {
        alert(`Error: Gagal melakukan check-in.`);
      }
    } finally {
      setIsCheckingIn(false);
    }
  };

  if (loading) return <div className="text-center p-10">Memuat Data Dashboard...</div>;
  if (error) return <div className="text-center p-10 text-red-500">Error: {error}</div>;

  return (
    <>
        <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Atlet</h1>
      
      {/* 1. Status Tim */}
      <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
        <p className="text-lg font-semibold text-gray-700">Tim Anda:</p>
        <p className="text-2xl font-extrabold text-blue-600">{data.team_name || "Belum ada tim"}</p>
      </div>

      {/* 2. Opsi Check-In (DYNAMIC VISIBILITY) */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Check-In Hari Ini</h2>
        
        {activePractice ? (
          // LOGIKA TAMPILAN: Tampilkan tombol check-in jika activePractice ADA
          <div className="p-4 bg-yellow-50 border border-yellow-300 rounded-lg flex justify-between items-center">
            <div>
                <p className="font-bold text-lg text-yellow-800">Latihan Siap: {moment(activePractice.date).format('D MMMM')}</p>
                <p className="text-sm text-yellow-700">Pukul {activePractice.start_time.substring(0, 5)} di {activePractice.location}</p>
            </div>
            <button
              onClick={handleCheckIn}
              disabled={isCheckingIn}
              className={`flex items-center px-6 py-3 rounded-full text-white font-bold transition-colors ${
                isCheckingIn ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 shadow-lg'
              }`}
            >
              {isCheckingIn ? 'Memproses...' : (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  CHECK-IN SEKARANG
                </>
              )}
            </button>
          </div>
        ) : (
          // LOGIKA TAMPILAN: Tampilkan pesan jika tidak ada latihan yang aktif
          <div className="p-4 bg-green-50 border border-green-300 rounded-lg text-green-700 flex items-center">
            <XCircle className="w-5 h-5 mr-3" />
            Tidak ada latihan yang aktif untuk Check-In saat ini.
          </div>
        )}
      </div>

      {/* 3. Jadwal Mendatang */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Jadwal Tim Mendatang</h2>
        <div className="divide-y divide-gray-200">
            {[...data.upcoming_practices, ...data.upcoming_matches]
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .map((item) => {
                const isPractice = !!item.start_time; // Cek apakah ini jadwal latihan
                return (
                  <div key={`${isPractice ? 'p' : 'm'}-${item.id}`} className="p-4 hover:bg-gray-50 transition-colors flex justify-between items-center">
                    <div>
                        <p className="text-base font-semibold">
                            {isPractice ? 'Latihan' : `VS ${item.opponent_name}`}
                        </p>
                        <p className="text-sm text-gray-500">
                            {moment(item.date).format('D MMM YYYY')} pukul {(isPractice ? item.start_time : item.time).substring(0, 5)} - {item.location}
                        </p>
                    </div>
                    <span className={`text-xs font-medium px-3 py-1 rounded-full 
                        ${isPractice ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                        {isPractice ? 'Latihan' : 'Pertandingan'}
                    </span>
                </div>);
            })}
            {data.upcoming_practices.length === 0 && data.upcoming_matches.length === 0 && <p className="text-gray-500 py-4">Tidak ada jadwal mendatang.</p>}
        </div>
        
        {/* Link cepat ke riwayat absensi */}
        <div className="mt-4 pt-4 border-t border-gray-200">
            <Link to="/athlete/history" className="text-indigo-600 hover:text-indigo-800 font-medium">
                Lihat Riwayat Absensi Saya →
            </Link>
        </div>
      </div>
    </div>
    </>
  )
}

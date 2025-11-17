import { useEffect, useState } from "react";
import moment from "moment";
import { Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Link } from "react-router";
export default function AthleteDashboard() {
  const [data, setData] = useState({
    team_name: "Tim elang murah",
    user_id: 4,
    upcoming_schedule: [],
  });
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [loading, setLoanding] = useState(false);
  // LOGIKA TAMPILAN 1: Menentukan Latihan yang Aktif untuk Check-In
  const [activePractice, setActivePractice] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoanding(true);
      // Data dummy
      const now = moment();
      const nextHour = now.clone().add(1, "hour").format("HH:mm:ss");
    //   const lastHour = now.clone().subtract()(1, "hour").format("HH:mm:ss");
      const todayDate = now.format("YYYY-MM-DD");

      const dummySchedule = [
        {
          id: 1,
          type: "Latihan",
          date: todayDate,
          time: nextHour, // Waktu Latihan 1 jam dari sekarang
          start_time: nextHour,
          location: "Lapangan Utama",
          can_check_in: true,
        },
        { 
            id: 2, 
            type: 'Pertandingan', 
            date: moment().add(1, 'day').format('YYYY-MM-DD'), 
            time: '16:00:00', 
            opponent_name: 'FC Musuh', 
            location: 'Stadion Utama'
        },
      ];

      setData(prev => ({
        ...prev,
        upcoming_schedule: dummySchedule
      }))

      // LOGIKA TAMPILAN 2: Identifikasi Latihan yang Boleh Check-In
      const practiceForCheckIn = dummySchedule.find(
        sch => sch.type === 'Latihan' && sch.can_check_in
      )
      setActivePractice(practiceForCheckIn)
      setLoanding(false)
    };
    fetchData()
  },[]);

  // LOGIKA TAMPILAN 3: Fungsi Tampilan Check-In (Akan dipanggil saat tombol diklik)
  const handleCheckIn = async () => {
    if(!activePractice) return

    setIsCheckingIn(true)
    // --- TEMPAT LOGIKA API POST /api/athlete/checkin/{practice_id} ---
    
    // Simulasikan delay API
    await new Promise(resolve => setTimeout(resolve, 1500))

    // LOGIKA TAMPILAN 4: Setelah sukses
    alert(`Berhasil check in untuk latihan ID: ${activePractice.id}`)
    setIsCheckingIn(false)
    setActivePractice(null)
  }

  if (loading) return <div className="text-center p-10">Memuat Data</div>
  return (
    <>
        <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Atlet</h1>
      
      {/* 1. Status Tim */}
      <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
        <p className="text-lg font-semibold text-gray-700">Tim Anda:</p>
        <p className="text-2xl font-extrabold text-blue-600">{data.team_name}</p>
      </div>

      {/* 2. Opsi Check-In (DYNAMIC VISIBILITY) */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Check-In Hari Ini</h2>
        
        {activePractice ? (
          // LOGIKA TAMPILAN: Tampilkan tombol check-in jika activePractice ADA
          <div className="p-4 bg-yellow-50 border border-yellow-300 rounded-lg flex justify-between items-center">
            <div>
                <p className="font-bold text-lg text-yellow-800">Latihan Siap: {moment(activePractice.date).format('D MMMM')}</p>
                <p className="text-sm text-yellow-700">Pukul {activePractice.time.substring(0, 5)} di {activePractice.location}</p>
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
            {data.upcoming_schedule.map((item) => (
                <div key={item.id + item.type} className="p-4 hover:bg-gray-50 transition-colors flex justify-between items-center">
                    <div>
                        <p className="text-base font-semibold">
                            {item.type === 'Latihan' ? 'Latihan' : `VS ${item.opponent_name}`}
                        </p>
                        <p className="text-sm text-gray-500">
                            {moment(item.date).format('D MMM YYYY')} pukul {item.time.substring(0, 5)} - {item.location}
                        </p>
                    </div>
                    <span className={`text-xs font-medium px-3 py-1 rounded-full 
                        ${item.type === 'Latihan' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                        {item.type}
                    </span>
                </div>
            ))}
            {data.upcoming_schedule.length === 0 && <p className="text-gray-500 py-4">Tidak ada jadwal mendatang.</p>}
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

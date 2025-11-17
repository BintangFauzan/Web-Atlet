// src/pages/CoachDashboard.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Users, Calendar, Clock, PlusCircle } from 'lucide-react';
import moment from 'moment'; // Anda mungkin perlu menginstal momentjs (npm install moment)

// --- Komponen Pembantu ---

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className={`p-5 rounded-xl shadow-lg flex items-center justify-between ${color} text-white`}>
    <div>
      <p className="text-sm font-medium opacity-80">{title}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
    </div>
    <Icon className="w-8 h-8 opacity-50" />
  </div>
);

const CoachDashboard = () => {
  const [data, setData] = useState({
    team_name: '',
    athlete_count: 0,
    athletes: [],
    upcoming_practices: [],
    upcoming_matches: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fungsionalitas untuk mengambil data dari API: GET /api/coach/dashboard
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Contoh data dummy (sesuai respons API)
        const dummyData = {
          team_name: "Tim Elang Merah",
          athlete_count: 5,
          athletes: [
            { id: 4, name: "Atlet Alpha", email: "atlet1@test.com" },
            { id: 5, name: "Atlet Beta", email: "atlet2@test.com" },
            { id: 6, name: "Atlet Gamma", email: "atlet3@test.com" },
          ],
          upcoming_practices: [
            { id: 1, date: '2025-11-13', start_time: '19:00:00', location: 'Lap. A' },
            { id: 2, date: '2025-11-15', start_time: '18:00:00', location: 'Lap. B' },
          ],
          upcoming_matches: [
            { id: 1, opponent_name: 'FC Musuh', date: '2025-11-20', time: '16:00:00', location: 'Stadion Utama' },
          ],
        };
        
        setData(dummyData);
      } catch (err) {
        setError("Gagal mengambil data dashboard pelatih.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center p-10">Memuat data...</div>;
  if (error) return <div className="text-center p-10 text-red-600">{error}</div>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Tim: {data.team_name}</h1>
      
      {/* 1. Ringkasan (Statistik Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Atlet Tim" 
          value={data.athlete_count} 
          icon={Users} 
          color="bg-purple-600" 
        />
        <StatCard 
          title="Latihan Mendatang" 
          value={data.upcoming_practices.length} 
          icon={Calendar} 
          color="bg-teal-600" 
        />
        <StatCard 
          title="Pertandingan Mendatang" 
          value={data.upcoming_matches.length} 
          icon={Clock} 
          color="bg-orange-600" 
        />
      </div>

      {/* 2. Daftar Atlet & Absensi Cepat */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Daftar Atlet */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Daftar Atlet ({data.athlete_count})</h2>
          <div className="overflow-x-auto h-80">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.athletes.map((athlete) => (
                  <tr key={athlete.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{athlete.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{athlete.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        Lihat Profil
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Latihan yang Membutuhkan Absensi */}
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Latihan Hari Ini/Mendatang</h2>
          <div className="space-y-3">
            {data.upcoming_practices.map((practice) => (
              <div key={practice.id} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="font-semibold text-blue-700">Latihan: {moment(practice.date).format('ddd, D MMM')}</p>
                <p className="text-sm text-gray-600">Pukul: {practice.start_time.substring(0, 5)} - {practice.location}</p>
                <Link 
                  to={`/coach/attendance/${practice.id}`}
                  className="mt-2 inline-flex items-center text-xs text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-full transition-colors"
                >
                  <PlusCircle className="w-4 h-4 mr-1" />
                  Ambil Absensi
                </Link>
              </div>
            ))}
            {data.upcoming_practices.length === 0 && <p className="text-gray-500">Tidak ada latihan dalam waktu dekat.</p>}
          </div>
        </div>
      </div>

      {/* 3. Jadwal Pertandingan */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Jadwal Pertandingan</h2>
        <div className="divide-y divide-gray-200">
          {data.upcoming_matches.map((match) => (
            <div key={match.id} className="p-4 hover:bg-gray-50 transition-colors">
              <p className="text-base font-semibold">VS {match.opponent_name}</p>
              <p className="text-sm text-gray-500">{moment(match.date).format('D MMMM YYYY')} pukul {match.time.substring(0, 5)} - {match.location}</p>
            </div>
          ))}
          {data.upcoming_matches.length === 0 && <p className="text-gray-500 py-4">Tidak ada pertandingan terjadwal.</p>}
        </div>
      </div>
    </div>
  );
};

export default CoachDashboard;
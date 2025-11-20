// src/pages/CoachDashboard.jsx
import { useState, useEffect } from 'react';
import apiClient from '../services/apiClien';
import JadwalPertandingan from './components/JadwalPertandingan';
import Latihan from './components/Latihan';
import DataAtlet from './components/DataAtlet';
import StatistikCard from './components/StatistikCard';
import { Modal } from '../ui/ModalDialog';
import AttendanceModalContent from './components/AttendanceModalContent';

const CoachDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAttendanceModalOpen, setIsAttendanceOpenModalOpen] = useState(false)
  const [selectedPracticeId, setSelectedPracticeId] = useState(null)

  useEffect(() => {
    // Fungsionalitas untuk mengambil data dari API: GET /api/coach/dashboard
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await apiClient.get("/coach/dashboard")
        const data = res.data
        setData(data)
      } catch (err) {
        setError("Gagal mengambil data dashboard pelatih.", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log("Data atlet", data)

  function handleOpenModalAttendance(id){
    setSelectedPracticeId(id)
    setIsAttendanceOpenModalOpen(true)
  }
  function handleCloseModalAttendance(){
    setIsAttendanceOpenModalOpen(false)
    setSelectedPracticeId(null)
  }

  if (loading) return <div className="text-center p-10">Memuat data...</div>;
  if (error) return <div className="text-center p-10 text-red-600">{error}</div>;

  return (
   <>
   <Modal 
    isOpen={isAttendanceModalOpen} 
    onClose={handleCloseModalAttendance}
    className="w-full max-w-2xl p-6" // Menambahkan padding agar konsisten
   >
    <AttendanceModalContent 
      practiceId={selectedPracticeId} 
      onClose={handleCloseModalAttendance} 
    />
   </Modal>
     <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Tim: {data.team_name}</h1>
      
      {/* 1. Ringkasan (Statistik Cards) */}
     <StatistikCard dataCount={data}/>

      {/* 2. Daftar Atlet & Absensi Cepat */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Daftar Atlet */}
        <DataAtlet dataAtlet={data}/>

        {/* Latihan yang Membutuhkan Absensi */}
        <Latihan dataLatihan={data} openModalAttendance={handleOpenModalAttendance}/>
      </div>

      {/* 3. Jadwal Pertandingan */}
     <JadwalPertandingan data={data}/>
    </div>
   </>
  );
};

export default CoachDashboard;
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import apiClient from "../services/apiClien";
import moment from "moment";
import StatCard from "./component/StatCard";
import UserManagementTable from "./component/UserManagementTable";
import TeamManagementTable from "./component/TeamManagementTable";
import ScheduleManagementTable from "./component/ScheduleManagementTable";
import TeamDetailModal from "./component/TeamDetailModal";
import { Users, Trello, Calendar, Zap, UserPlus, Edit, Trash2, Loader2, MapPin } from 'lucide-react';
import { Modal } from "../ui/ModalDialog";
import FormInput from "./component/FormInput";
import FormTambahTim from "./component/FormTambahTim";
import FormTambahJadwal from "./component/FormTambahJadwal";

export default function ManagerDashboard() {
  const [dashboardData, setDashboardData] = useState({
    // ... (State Data Dibiarkan)
    manager_name: '',
    total_teams: 0,
    teams_data: [],
    all_users: [],
    all_schedules: [],
    total_users: 0,
    total_matches: 0,
    total_practices: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // State Tambah Pengguna
  const [modalTambah, setModalTambah] = useState(false)
  // State Tambah Tim
  const [modalTambahTim, setModalTambahTim] = useState(false)
  // State Tambah Jadwal
  const [modalTambahJadwal, setModalTambahJadwal] = useState(false)
  const [refresh, setRefresh] = useState(false)
  
  // STATE UNTUK FILTER
  const [userRoleFilter, setUserRoleFilter] = useState('all');
  const [scheduleTeamFilter, setScheduleTeamFilter] = useState('all');
  
  // STATE UNTUK MODAL DETAIL TIM
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  
  const navigate = useNavigate();

  // REFERENSI UNTUK SCROLLING
  const usersRef = useRef(null);
  const teamsRef = useRef(null);
  const scheduleRef = useRef(null); 

  // Fungsi utilitas dipertahankan di sini
  const getRoleBadge = (role) => {
    switch (role) {
      case 'manager': return 'bg-red-100 text-red-800';
      case 'coach': case 'pelatih': return 'bg-yellow-100 text-yellow-800';
      case 'athlete': case 'atlet': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Logika Fetch Data (Tidak Berubah)
  const fetchDashboardData = async () => {
    // ... (Logika fetch data yang panjang)
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get('/manager/dashboard'); 
      const apiData = response.data;
      
      let allUsers = [];
      let allSchedules = [];

      apiData.teams_data.forEach(team => {
        const teamMembers = team.members.map(member => ({
          ...member, team_name: team.name, team_id: team.id, 
        }));
        allUsers.push(...teamMembers);

        team.practices.forEach(p => {
            allSchedules.push({
                ...p, type: 'Latihan', team_name: team.name, 
                datetime: moment(`${p.date.split('T')[0]} ${p.start_time}`), id: `practice-${p.id}`, 
            });
        });
        
        team.matches.forEach(m => {
             allSchedules.push({
                ...m, type: 'Pertandingan', team_name: team.name, opponent: m.opponent_name,
                datetime: moment(`${m.date.split('T')[0]} ${m.time}`), id: `match-${m.id}`, 
            });
        });
      });
      
      const managerUser = {
          id: 0, name: apiData.manager_name, email: 'manager_email@app.com', role: 'manager', team_name: 'Manajemen',
      };
      if (!allUsers.find(u => u.role === 'manager')) {
          allUsers.unshift(managerUser);
      } else {
          const existingManager = allUsers.find(u => u.role === 'manager');
          if (existingManager) existingManager.name = apiData.manager_name;
      }
      
      allSchedules.sort((a, b) => a.datetime.valueOf() - b.datetime.valueOf());

      setDashboardData({
        ...apiData, all_users: allUsers, all_schedules: allSchedules, total_users: allUsers.length,
        total_matches: allSchedules.filter(s => s.type === 'Pertandingan').length,
        total_practices: allSchedules.filter(s => s.type === 'Latihan').length,
      });
      setRefresh(false)
    } catch (err) {
      console.error("Gagal memuat dashboard:", err);
      setError(`Gagal memuat data dashboard: ${err.message}.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData(); 
  }, [refresh]);
  
  // LOGIKA FILTER (useMemo) - Tidak Berubah
  const filteredUsers = useMemo(() => {
    return dashboardData.all_users.filter(user => userRoleFilter === 'all' ? true : user.role === userRoleFilter);
  }, [dashboardData.all_users, userRoleFilter]);
  
  const filteredSchedules = useMemo(() => {
    return dashboardData.all_schedules.filter(schedule => scheduleTeamFilter === 'all' ? true : schedule.team_name === scheduleTeamFilter);
  }, [dashboardData.all_schedules, scheduleTeamFilter]);


  // FUNGSI UNTUK MODAL (useCallback) - Tidak Berubah
  const handleViewTeamDetails = useCallback((team) => {
    setSelectedTeam(team); 
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedTeam(null);
  }, []);


  // Handler Modal Tambah Pengguna
  function handleOpenModalTambah(){
    setModalTambah(true)
  }
  function handleCloseModalTambah(){
    setModalTambah(false)
  }
  function handleSuccesTambah(){
    setModalTambah(false)
    setRefresh(true)
  }
  // Handle Modal Tambah Tim
  function openModalTambahTim(){
    setModalTambahTim(true)
  }
  function closeModalTim(){
    setModalTambahTim(false)
  }
  function handleSuccesInputTim(){
    setModalTambahTim(false)
    setRefresh(true)
  }
  // Handle Modal Tambah Jadwal
  function openModalTambahJadwal(){
    setModalTambahJadwal(true)
  }
  function closeModalJadwal(){
    setModalTambahJadwal(false)
  }
  function handleSuccesInputJadwal(){
    setModalTambahJadwal(false)
    setRefresh(true)
  }

  if (loading) return <div className="text-center p-10"><Loader2 className="animate-spin w-6 h-6 mx-auto text-blue-600 mb-2" /> Memuat Dashboard Manager...</div>;
  if (error) return <div className="text-center p-10 text-red-600 bg-red-100 border border-red-200 rounded-xl">{error}</div>;

  return (
   <>
   <Modal isOpen={modalTambah} className="max-w-xl p-6" onClose={handleCloseModalTambah}>
    <FormInput onSuccess={handleSuccesTambah} onClose={handleCloseModalTambah}/>
   </Modal>
   {/* Modal Tambah Tim */}
   <Modal isOpen={modalTambahTim} className="max-w-xl p-6" onClose={closeModalTim}>
   <FormTambahTim onSucces={handleSuccesInputTim} onClose={closeModalTim}/>
   </Modal>
   {/* Modal Tambah Jadwal */}
   <Modal className="max-w-xl p-6" isOpen={modalTambahJadwal} onClose={closeModalJadwal}>
    <FormTambahJadwal onSucces={handleSuccesInputJadwal} onClose={closeModalJadwal}/>
   </Modal>
     <div className="space-y-10 p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-gray-800">Selamat datang, {dashboardData.manager_name}!</h1>
      
      {/* STAT CARDS (Sangat Bersih) */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <StatCard title="Total Pengguna" value={dashboardData.total_users} icon={Users} color="bg-purple-600" targetRef={usersRef} />
        <StatCard title="Total Tim Aktif" value={dashboardData.total_teams} icon={Trello} color="bg-teal-600" targetRef={teamsRef} />
        <StatCard title="Total Pertandingan" value={dashboardData.total_matches} icon={Calendar} color="bg-orange-600" targetRef={scheduleRef} />
        <StatCard title="Total Latihan" value={dashboardData.total_practices} icon={Zap} color="bg-indigo-600" targetRef={scheduleRef} />
      </div>

      {/* --- PANGGIL KOMPONEN-KOMPONEN BARU --- */}
      <UserManagementTable
        filteredUsers={filteredUsers}
        userRoleFilter={userRoleFilter}
        setUserRoleFilter={setUserRoleFilter}
        handleAddUser={handleOpenModalTambah}
        getRoleBadge={getRoleBadge}
        usersRef={usersRef}
      />
      
      <TeamManagementTable
        teams={dashboardData.teams_data}
        handleAddTeam={openModalTambahTim}
        handleViewTeamDetails={handleViewTeamDetails}
        teamsRef={teamsRef}
      />
      
      <ScheduleManagementTable
        filteredSchedules={filteredSchedules}
        teamsData={dashboardData.teams_data}
        scheduleTeamFilter={scheduleTeamFilter}
        setScheduleTeamFilter={setScheduleTeamFilter}
        handleAddSchedule={openModalTambahJadwal}
        scheduleRef={scheduleRef}
      />

      {/* Panggil Modal di akhir komponen */}
      <TeamDetailModal 
        teamData={selectedTeam} 
        allUsers={dashboardData.all_users}
        allSchedules={dashboardData.all_schedules}
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
      />
    </div>
   </>
  );
}
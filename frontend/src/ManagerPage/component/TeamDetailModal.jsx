import { Trello, X, User, Calendar, Clock, MapPin, Users } from 'lucide-react';
import moment from 'moment';

export default function TeamDetailModal({ teamData, allUsers, allSchedules, isOpen, onClose }){
    // Guard clause: Jika modal tidak terbuka atau data tim tidak ada, jangan tampilkan apa pun
    if (!isOpen || !teamData) return null;

    // 1. Temukan Pelatih (Coach) dan Atlet (Athletes)
    const coach = allUsers.find(user => 
      user.role === 'coach' && user.team_name === teamData.name
    );
    const athletes = allUsers.filter(user => 
      user.role === 'athlete' && user.team_name === teamData.name
    );

    // 2. Temukan Jadwal Terdekat (Hanya SATU)
    const today = moment();
    const teamSchedules = allSchedules.filter(schedule => 
      schedule.team_name === teamData.name && schedule.datetime.isSameOrAfter(today, 'minute')
    );
    
    // Ambil jadwal terdekat pertama (asumsi data sudah terurut)
    const nextSchedule = teamSchedules.length > 0 ? teamSchedules[0] : null;
    return(
        <>
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 scale-100 max-h-[90vh] overflow-y-auto">
          
          {/* Header Modal */}
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-blue-600 rounded-t-xl">
            <h3 className="text-2xl font-bold text-white flex items-center">
              <Trello className="w-6 h-6 mr-3" /> Detail Tim: {teamData.name}
            </h3>
            <button onClick={onClose} className="text-white hover:text-gray-200 p-2 rounded-full transition">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            
            {/* Bagian Pelatih */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="text-lg font-semibold text-blue-800 flex items-center mb-2">
                <User className="w-5 h-5 mr-2" /> Pelatih Kepala
              </h4>
              <p className="text-gray-700">
                {coach ? coach.name : 'Pelatih belum ditugaskan.'}
              </p>
            </div>

            {/* Bagian Jadwal Terdekat (Hanya Satu) */}
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="text-lg font-semibold text-yellow-800 flex items-center mb-2">
                <Calendar className="w-5 h-5 mr-2" /> Jadwal Terdekat
              </h4>
              {nextSchedule ? (
                <div className="space-y-1">
                  <p className="font-medium text-gray-800">{nextSchedule.type === 'Pertandingan' ? 'Pertandingan' : 'Latihan'}</p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <Clock className="w-4 h-4 mr-1 opacity-70" />
                    {nextSchedule.datetime.format('dddd, DD MMMM YYYY [pukul] HH:mm')}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <MapPin className="w-4 h-4 mr-1 opacity-70" />
                    {nextSchedule.type === 'Pertandingan' ? `Vs ${nextSchedule.opponent} di ${nextSchedule.location}` : `Lokasi: ${nextSchedule.location}`}
                  </p>
                </div>
              ) : (
                <p className="text-gray-700">Tidak ada jadwal mendatang yang tercatat.</p>
              )}
            </div>

            {/* Bagian Daftar Atlet */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-800 flex items-center mb-3">
                <Users className="w-5 h-5 mr-2" /> Daftar Atlet ({athletes.length})
              </h4>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {athletes.length > 0 ? (
                  athletes.map((athlete) => (
                    <div key={athlete.id} className="text-sm bg-white p-2 rounded-md border border-gray-200 shadow-sm hover:bg-gray-100 transition">
                      {athlete.name}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 col-span-3">Tim ini belum memiliki atlet.</p>
                )}
              </div>
            </div>

          </div>
          
          {/* Footer Modal */}
          <div className="p-4 border-t border-gray-100 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
        </>
    )
}
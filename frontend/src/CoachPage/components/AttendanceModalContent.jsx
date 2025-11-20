import { UserCheck, UserX, Clock, Loader2 } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import apiClient from "../../services/apiClien";

// Helper untuk styling badge status (bisa dipindahkan jika perlu)
const getStatusBadge = (status) => {
  switch (status) {
    case "present":
      return "bg-green-100 text-green-800";
    case "late":
      return "bg-yellow-100 text-yellow-800";
    case "absent":
    default:
      return "bg-red-100 text-red-800";
  }
};

export default function AttendanceModalContent({ practiceId, onClose }) {
  // Karena ini hanya tampilan, kita tidak menggunakan state loading, error, dll.
  // Kita langsung gunakan mock data.
  const [updatingId, setUpdatingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [dataAbsen, setDataAbsen] = useState({
    practiceDetails:null,
    attendanceList:[]
  })

  const fetchData = async () => {
    setLoading(true)
    try{
        const res = await apiClient.get(`/coach/attendance/${practiceId}`)
        const data = res.data
        setDataAbsen({
            practiceDetails:data.practice_details,
            attendanceList:data.attendance_status
        })
    }catch(err){
        console.log("Error fetch data", err)
    }finally{
        setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [practiceId])

  console.log("Data absen prakterk", dataAbsen)

  console.log("Id absen", practiceId)

  const handleUpdateStatus = async (atletId, newStatus) => {
    setLoading(true)
    setUpdatingId(atletId)
    try{
      await apiClient.post("/coach/attendance/update", {
        practice_id: dataAbsen.practiceDetails.id,
        athlete_id: atletId,
        status: newStatus
      })
      setDataAbsen(prevState => {
        return{
          ...prevState,
          practiceDetails: prevState.practiceDetails,
          attendanceList: prevState.attendanceList.map((list) => {
            if(list.athlete_id === atletId){
              return{...list, status: newStatus}
            }
            return list
          })
        }
      })
      alert("Data atlet berhasil di update")
    }catch(err){
      alert("Gagal update data atlet", err)
    }finally{
      setLoading(false)
      setUpdatingId(null)
    }
  }

  return (
    <div className="bg-white rounded-xl">
      {/* Header Modal */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Manajemen Absensi</h2>
          <p className="text-md text-gray-600">
            Latihan pada{" "}
            {moment(dataAbsen.practiceDetails?.date).format("dddd, D MMMM YYYY")} di{" "}
            {dataAbsen.practiceDetails?.location}
          </p>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <UserX className="w-6 h-6" />
        </button>
      </div>

      {/* Daftar Atlet */}
      <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
        {dataAbsen.attendanceList?.map((item) => (
          <div
            key={item.athlete_id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
          >
            {/* Nama dan Status */}
            <div className="flex items-center">
              <p className="font-medium text-gray-800 w-48">
                {item.athlete_name}
              </p>
              <span
                className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(
                  item.status
                )}`}
              >
                {item.status === "present"
                  ? "Hadir"
                  : item.status === "late"
                  ? "Terlambat"
                  : "Absen"}
              </span>
            </div>

            {/* Tombol Aksi */}
              {updatingId === item.athlete_id ? (<Loader2/>) : (
                <div className="flex items-center space-x-2">
                  {/* Tombol Hadir */}
              <button disabled={item.status === 'present'} onClick={() => handleUpdateStatus(item.athlete_id, 'present')} className="p-2 rounded-full text-green-600 hover:bg-green-100 disabled:text-gray-300 disabled:hover:bg-transparent" title="Hadir">
                <UserCheck className="w-5 h-5" />
              </button>
              {/* Tombol Terlambat */}
              <button disabled={item.status === 'late'} onClick={() => handleUpdateStatus(item.athlete_id, 'late')} className="p-2 rounded-full text-yellow-600 hover:bg-yellow-100 disabled:text-gray-300 disabled:hover:bg-transparent" title="Terlambat">
                <Clock className="w-5 h-5" />
              </button>
              {/* Tombol Absen */}
              <button disabled={item.status === 'absent'} onClick={() => handleUpdateStatus(item.athlete_id, 'absent')} className="p-2 rounded-full text-red-600 hover:bg-red-100 disabled:text-gray-300 disabled:hover:bg-transparent" title="Absen">
                <UserX className="w-5 h-5" />
              </button>
                </div>
              )}
            </div>
        ))}
      </div>
    </div>
  );
}
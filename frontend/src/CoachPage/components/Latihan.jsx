import { PlusCircle } from "lucide-react";
import moment from "moment";

export default function Latihan({dataLatihan, openModalAttendance}){
    return(
        <>
            <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Latihan Hari Ini/Mendatang</h2>
          <div className="space-y-3">
            {dataLatihan.upcoming_practices.map((practice) => (
              <div key={practice.id} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="font-semibold text-blue-700">Latihan: {moment(practice.date).format('ddd, D MMM')}</p>
                <p className="text-sm text-gray-600">Pukul: {practice.start_time.substring(0, 5)} - {practice.location}</p>
                <button 
                  onClick={() => openModalAttendance(practice.id)}
                  className="mt-2 inline-flex items-center text-xs text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-full transition-colors"
                >
                  <PlusCircle className="w-4 h-4 mr-1" />
                  Ambil Absensi
                </button>
              </div>
            ))}
            {dataLatihan.upcoming_practices.length === 0 && <p className="text-gray-500">Tidak ada latihan dalam waktu dekat.</p>}
          </div>
        </div>
        </>
    )
}
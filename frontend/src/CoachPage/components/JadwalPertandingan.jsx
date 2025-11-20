import moment from "moment";

export default function JadwalPertandingan({data}){
    return(
        <>
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
        </>
    )
}
import { Edit, Trash2, Trello } from "lucide-react";

export default function TeamManagementTable({ teams, handleAddTeam, handleViewTeamDetails, teamsRef }){
    return(
        <>
            <div ref={teamsRef} className="pt-2"> 
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Manajemen Tim ({teams.length})</h2>
            <button
                onClick={handleAddTeam}
                className="flex items-center px-3 py-2 text-sm bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
            >
                <Trello className="w-4 h-4 mr-1" /> Buat Tim Baru
            </button>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                   <tr>
                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Tim</th>
                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pelatih (Coach)</th>
                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jml Anggota</th>
                       <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                   </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {teams.map(team => {
                        const coach = team.members.find(member => member.role === 'coach');
                        const athleteCount = team.members.filter(member => member.role === 'athlete').length;
                        return (
                            <tr key={team.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{team.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{coach ? coach.name : 'Belum Ditugaskan'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{team.members.length} ({athleteCount} Atlet)</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button 
                                        onClick={() => handleViewTeamDetails(team)}
                                        className="text-indigo-600 hover:text-indigo-900 mr-4 p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                                        title="Lihat Detail Tim"
                                    >
                                        <Edit className="w-5 h-5" />
                                    </button>
                                    <button className="text-red-600 hover:text-red-900 p-1" title="Hapus Tim"><Trash2 className="w-5 h-5" /></button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {!teams.length && <div className="p-4 text-center text-gray-500">Tidak ada tim ditemukan.</div>}
        </div>
    </div>
        </>
    )
}
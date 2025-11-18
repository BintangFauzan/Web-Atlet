import { Edit, Trash2, UserPlus } from "lucide-react";

export default function UserManagementTable({ filteredUsers, userRoleFilter, setUserRoleFilter, handleAddUser, getRoleBadge, usersRef }){
    return(
        <>
            <div ref={usersRef} className="pt-2"> 
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Manajemen Pengguna ({filteredUsers.length} Tampil)</h2>
            <div className="flex items-center space-x-3">
                 <select
                    value={userRoleFilter}
                    onChange={(e) => setUserRoleFilter(e.target.value)}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">Semua Peran</option>
                    <option value="coach">Hanya Pelatih</option>
                    <option value="athlete">Hanya Atlet</option>
                    <option value="manager">Hanya Manager</option>
                  </select>
                <button
                  onClick={handleAddUser}
                  className="flex items-center px-3 py-2 text-sm bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
                >
                  <UserPlus className="w-4 h-4 mr-1" /> Tambah Pengguna
                </button>
            </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                   <tr>
                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Peran</th>
                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tim</th>
                       <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                   </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map(user => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-3 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadge(user.role)}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.team_name || 'N/A'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-indigo-600 hover:text-indigo-900 mr-4 p-1"><Edit className="w-5 h-5" /></button>
                                    <button className="text-red-600 hover:text-red-900 p-1"><Trash2 className="w-5 h-5" /></button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="5" className="px-6 py-4 text-center text-gray-500">Tidak ada pengguna yang cocok dengan filter ini.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
        </>
    )
}
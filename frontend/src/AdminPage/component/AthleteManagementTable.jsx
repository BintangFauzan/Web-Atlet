import { Edit, Trash2, UserPlus } from "lucide-react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContextStore";

export default function AthleteManagementTable() {
     const {loading,dataAdmin, openModalInputAtlet, openModalDeleteAtlet} = useContext(AdminContext)
     const listAtlet = dataAdmin.dataAtlet
  return (
    <>
      <div className="pt-2">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Manajemen Pengguna Tampil
          </h2>
          <div className="flex items-center space-x-3">
            <button
                onClick={openModalInputAtlet}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tim
                </th> */}
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {listAtlet.map(atlet => (
                    <tr key={atlet.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{atlet.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{atlet.email}</td>
                        {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{atlet.nama_tim}</td> */}
                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    className="text-indigo-600 hover:text-indigo-900 mr-4 p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                    title="Lihat Detail Tim"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900 p-1"
                    title="Hapus Tim"
                    onClick={() => openModalDeleteAtlet(atlet)}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
                    </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

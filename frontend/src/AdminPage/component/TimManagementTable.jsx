import { Edit, Trash2, Trello } from "lucide-react";
import { AdminContext } from "../../context/AdminContextStore";
import { useContext } from "react";

export default function TimManagementTable() {
  const { loading, dataAdmin, handleOpenModalDelete,openModalTeamInput } = useContext(AdminContext);
  const listTim = dataAdmin.dataTim
  return (
    <>
      <div className="space-y8">
      <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Manajemen Cabor</h2>
            <button
                onClick={openModalTeamInput}
                className="flex items-center px-3 py-2 text-sm bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
            >
                <Trello className="w-4 h-4 mr-1" /> Buat Tim Baru
            </button>
        </div>
       
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Dashboard Tim:{" "}
        </h1>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nama Tim
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pelatih (Coach)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Jml Anggota
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {listTim.map((tim) => (
              <tr key={tim.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {tim.nama_tim}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {tim.pelatih.nama}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {tim.jumlah_atlet}
                </td>
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
                    onClick={() => handleOpenModalDelete(tim.id)}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* {!dataCabor.length && <div className="p-4 text-center text-gray-500">Tidak ada cabor ditemukan.</div>} */}
      </div>
    </>
  );
}

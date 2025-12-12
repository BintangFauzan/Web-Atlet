import { useContext, useState } from "react";
import {CaborContext} from "../../context/ManagerCaborContext"
import { Edit, Trash2, Trello } from "lucide-react";
import { Modal } from "../../ui/ModalDialog";
import Button from "../../ui/Button";
import FormInputCabor from "./FormInputCabor";
import HapusCabor from "./HapusCabor";

export default function CaborManagementTable({caborRef}){
    const {dataCabor, openModalTambahCabor, handleOpenModalTambahCabor,
        openModalHapusCabor,handleOpenModalHapusCabor,handleCloseModalHapusCabor, allTeam,
    } = useContext(CaborContext)
    const [selectedCabor, setSelectedCabor] = useState("")
    console.log("Data cabor", dataCabor)
    console.log("Filter cabor", allTeam)
    console.log("Cabor klik", selectedCabor)

    function handleSelectedCabor(id){
        setSelectedCabor(id)
    }
    return (
        <>
        {/* Modal tambah cabor */}
        <Modal isOpen={openModalTambahCabor}  className="max-w-xl p-6">
        <FormInputCabor/>
      </Modal>
      {/* Modal hapus cabor */}
      <Modal isOpen={openModalHapusCabor} onClose={handleCloseModalHapusCabor} className="max-w-xl p-6">
      <HapusCabor/>
      </Modal>



            <div ref={caborRef} className="pt-2"> 
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Manajemen Tim ({dataCabor.length})</h2>
            <button
                onClick={handleOpenModalTambahCabor}
                className="flex items-center px-3 py-2 text-sm bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
            >
                <Trello className="w-4 h-4 mr-1" /> Buat Cabor Baru
            </button>
        </div>
       
        <div className="bg-white p-6 rounded-xl shadow-lg overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                   <tr>
                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Cabor</th>
                       <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                   </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {dataCabor.map(cabor => {
                        {/* const coach = team.members.find(member => member.role === 'coach');
                        const athleteCount = team.members.filter(member => member.role === 'athlete').length; */}
                        return (
                            <tr key={cabor.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cabor.nama_cabor}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button 
                                        className="text-indigo-600 hover:text-indigo-900 mr-4 p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                                        title="Lihat Detail Tim"
                                    >
                                        <Edit className="w-5 h-5" />
                                    </button>
                                    <button className="text-red-600 hover:text-red-900 p-1" title="Hapus Tim" onClick={() => handleOpenModalHapusCabor(cabor.id)}><Trash2 className="w-5 h-5" /></button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {!dataCabor.length && <div className="p-4 text-center text-gray-500">Tidak ada cabor ditemukan.</div>}
        </div>
    </div>
        </>
    )
}
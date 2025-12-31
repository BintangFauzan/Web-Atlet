import { useContext } from "react"
import { AdminContext } from "../../context/AdminContextStore"
import ManagerCaborContext from "../../context/ManagerCaborContext"

export default function FormComponent(){
    const { formInput,
        setFormInput,
        closeModalTeamInput,
        submitInputTeam, dataAdmin, loading} = useContext(AdminContext)
    const dataCabor = dataAdmin.dataCabor
        
    return(
        <>
            <div className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded-xl">
        <div className="flex justify-between items-center mb-6 border-b pb-2">
          <h2 className="text-2xl font-bold text-gray-800">Tambah Tim Baru</h2>
          <button
            onClick={closeModalTeamInput}
            className="text-gray-500 hover:text-gray-800"
          >
            &times;
          </button>
        </div>

        <form onSubmit={submitInputTeam} className="space-y-6">
          {/* 1. Nama Tim */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nama Tim
            </label>
            <input
              type="text"
              id="name"
              value={formInput.name}
              onChange={(e) => setFormInput({...formInput, name: e.target.value})} // 3. Update state langsung
              required
              placeholder="Masukkan nama tim"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
          </div>
           <div className="mb-4">
            <label
              htmlFor="team_id"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Pilih Cabor
            </label>
            <select
              id="team_id"
              name="team_id"
              value={formInput.cabor_id}
              onChange={(e) => setFormInput({ ...formInput, cabor_id: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            >
              <option value="">Pilih Cabor...</option>
              {dataCabor.map((caborTim) => (
                <option key={caborTim.id} value={caborTim.id}>
                  {caborTim.nama_cabor}
                </option>
              ))}
            </select>
          </div>

          {/* Tombol Submit */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={closeModalTeamInput}
              className="px-4 py-2 text-sm bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md disabled:bg-blue-300"
            >
              {loading ? "Menyimpan..." : "Daftarkan"}
            </button>
          </div>
        </form>
      </div>
        </>
    )
}
import { useContext } from "react"
import { CaborContext } from "../../context/ManagerCaborContext"

export default function FormInputCabor(){
    const{setTambahCabor, tambahCabor, handleSubmitTambahCabor,
        handleCloseModaTambahCabor, loading
    } = useContext(CaborContext)
    return (
        <>
            <div className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded-xl">
          <div className="flex justify-between items-center mb-6 border-b pb-2">
            <h2 className="text-2xl font-bold text-gray-800">
              Tambah Cabor
            </h2>
            <button
              onClick={handleCloseModaTambahCabor}
              className="text-gray-500 hover:text-gray-800"
            >
              &times;
            </button>
          </div>

          <form onSubmit={handleSubmitTambahCabor} className="space-y-6">
            {/* 1. Nama Lengkap */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nama Cabor
              </label>
              <input
                type="text"
                id="name"
                value={tambahCabor.nama_cabor}
                onChange={(e) => setTambahCabor({ ...tambahCabor, nama_cabor: e.target.value })}
                required
                placeholder="Masukkan nama cabor"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              />
            </div>
            
            {/* Tombol Submit */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={handleCloseModaTambahCabor}
                className="px-4 py-2 text-sm bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md disabled:bg-blue-300"
              >
                {loading ? "Menyimpan..." : "Daftarkan Cabor"}
              </button>
            </div>
          </form>
        </div>
        </>
    )
}
import { useContext } from "react"
import { AdminContext } from "../../context/AdminContextStore"

export default function FormAtlet(){
    const { loading,
        closeModalInputAtlet,
        formPengguna,
        setFormPengguna,
        handleSubmitAtlet, dataAdmin} = useContext(AdminContext)
        const listCabor = dataAdmin.dataCabor
        const listTeam = dataAdmin.dataTim
        console.log("form atlet: ", formPengguna);
    return(
        <>
            <div className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded-xl">
          <div className="flex justify-between items-center mb-6 border-b pb-2">
            <h2 className="text-2xl font-bold text-gray-800">
              Tambah Pengguna Baru
            </h2>
            <button
              onClick={closeModalInputAtlet}
              className="text-gray-500 hover:text-gray-800"
            >
              &times;
            </button>
          </div>

          <form onSubmit={handleSubmitAtlet} className="space-y-6">
            {/* 1. Nama Lengkap */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nama Lengkap
              </label>
              <input
                type="text"
                id="name"
                value={formPengguna.name}
                onChange={(e) => setFormPengguna({ ...formPengguna, name: e.target.value })}
                required
                placeholder="Masukkan nama lengkap pengguna"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              />
            </div>

            {/* 2. Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formPengguna.email}
                onChange={(e) => setFormPengguna({ ...formPengguna, email: e.target.value })}
                required
                placeholder="Contoh: user@domain.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              />
            </div>

            {/* 3. Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formPengguna.password}
                onChange={(e) => setFormPengguna({ ...formPengguna, password: e.target.value })}
                required
                placeholder="Minimal 6 karakter"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              />
            </div>

            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Peran (Role)
              </label>
              <select
                id="role"
                value={formPengguna.role}
                onChange={(e) => setFormPengguna({ ...formPengguna, role: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              >
                <option value="athlete">Atlet</option>
                <option value="coach">Pelatih</option>
              </select>
            </div>

            {/* 5. Tim (Hanya Tampil jika role bukan manager) */}
              <div>
                <label
                  htmlFor="team_id"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Tim
                </label>
                <select
                  id="team_id"
                  name="team_id"
                  value={formPengguna.team_id}
                  onChange={(e) =>
                    setFormPengguna({ ...formPengguna, team_id: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                >
                  <option value="">Pilih Tim...</option>
                  {listTeam.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.nama_tim}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="cabor_id"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Plih cabor
                </label>
                <select
                  id="cabor_id"
                  name="cabor_id"
                  value={formPengguna.cabor_id}
                  onChange={(e) =>
                    setFormPengguna({ ...formPengguna, cabor_id: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                >
                  <option value="">Pilih Cabor...</option>
                  {listCabor.map((cabor) => (
                    <option key={cabor.id} value={cabor.id}>
                      {cabor.nama_cabor}
                    </option>
                  ))}
                </select>
              </div>


            {/* Tombol Submit */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={closeModalInputAtlet}
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
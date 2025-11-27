import { useContext, useEffect, useState } from "react";
import apiClient from "../../services/apiClien";
import { ManagerContext } from "../../context/ManagerContext";

export default function FormEditUser({ onSuccess, onClose }) {
  const [loading, setLoading] = useState(false);
  const [dataTeam, setDataTeam] = useState([]);

  const {
    setFormEditPengguna,
    formEditPengguna,
    handleSubmitEditPengguna,
    idEditPengguna,
  } = useContext(ManagerContext);

  console.log("Form edit pengguna", idEditPengguna);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/manager/dashboard"); // Endpoint yang benar untuk data tim manager
      const data = res.data.teams_data;
      setDataTeam(data);
    } catch (err) {
      console.log("Error ambil data team", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    if (idEditPengguna) {
      setFormEditPengguna({
        name: idEditPengguna.name || "",
        email: idEditPengguna.email || "",
        password: idEditPengguna.password || "",
        role: idEditPengguna.role || "",
        team_id: idEditPengguna.team_id || ""
      });
    }
  }, []);

  return (
    <>
      <div className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded-xl">
        <div className="flex justify-between items-center mb-6 border-b pb-2">
          <h2 className="text-2xl font-bold text-gray-800">
            Tambah Pengguna Baru
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmitEditPengguna} className="space-y-6">
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
              value={formEditPengguna.name}
              onChange={(e) =>
                setFormEditPengguna({
                  ...formEditPengguna,
                  name: e.target.value,
                })
              }
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
              value={formEditPengguna.email}
              onChange={(e) =>
                setFormEditPengguna({
                  ...formEditPengguna,
                  email: e.target.value,
                })
              }
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
              value={formEditPengguna.password}
              onChange={(e) =>
                setFormEditPengguna({
                  ...formEditPengguna,
                  password: e.target.value,
                })
              }
              required
              placeholder="Minimal 6 karakter"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
          </div>

          {/* 4. Peran (Role) */}
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Peran (Role)
            </label>
            <select
              id="role"
              value={formEditPengguna.role}
              onChange={(e) =>
                setFormEditPengguna({
                  ...formEditPengguna,
                  role: e.target.value,
                })
              }
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            >
              <option value="athlete">Atlet</option>
              <option value="coach">Pelatih</option>
              {/* Manager biasanya tidak ditambahkan melalui form ini, tetapi jika perlu, tambahkan: */}
              {/* <option value="manager">Manager</option> */}
            </select>
          </div>

          {/* 5. Tim (Hanya Tampil jika role bukan manager) */}
          {formEditPengguna.role !== "manager" && dataTeam.length > 0 && (
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
                value={formEditPengguna.team_id}
                onChange={(e) =>
                  setFormEditPengguna({
                    ...formEditPengguna,
                    team_id: e.target.value,
                  })
                }
                required={formEditPengguna.role !== "manager"}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              >
                <option value="">Pilih Tim...</option>
                {dataTeam.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Tombol Submit */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
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
  );
}

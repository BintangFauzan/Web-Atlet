import { useEffect, useState } from "react";
import apiClient from "../../services/apiClien";

export default function FormInput({ onSuccess, onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "athlete", // Default role ke athlete
    team_id: "", // Tambahkan team_id ke state
  });
  const [loading, setLoading] = useState(false);
  const [dataTeam, setDataTeam] = useState([]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await apiClient.post("/register", form);
      alert("Pengguna baru berhasil ditambahkan!");
      if (onSuccess) onSuccess(); // Panggil onSuccess untuk refresh data di parent
    } catch (err) {
      console.log("Gagal tambah ", err);
    } finally {
      setLoading(false);
    }
  };

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
  }, []);

  console.log("Tambah Pengguna", form)

  return (
    <>
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

          <form onSubmit={handleSubmit} className="space-y-6">
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
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
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
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
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
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
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
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
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
            {form.role !== "manager" && dataTeam.length > 0 && (
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
                  value={form.team_id}
                  onChange={(e) =>
                    setForm({ ...form, team_id: e.target.value })
                  }
                  required={form.role !== "manager"}
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
    </>
  );
}

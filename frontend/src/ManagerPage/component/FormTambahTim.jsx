import { useEffect, useState } from "react";
import apiClient from "../../services/apiClien";

export default function FormTambahTim({ onSucces, onClose }) {
  const [form, setForm] = useState({
    name:"",
    cabor_id:""
  }); 
  const [loading, setLoading] = useState(false);
  const [cabor, setCabor] = useState([])

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      // Kirim seluruh objek 'form' yang sudah berisi name dan cabor_id
      await apiClient.post("/manager/teams", form);
      console.log("Berhasil input team");
      alert("Berhasil tambah tim!");
      if (onSucces) onSucces();
    } catch (err) {
      console.log("Error tambah team", err);
      // Tambahkan notifikasi error untuk pengguna
      alert(`Gagal menambahkan tim: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    setLoading(true)
    try{
      const res = await apiClient.get("/manager/cabor")
      const data = res.data.data.data
      setCabor(data)
    }catch(err){
      console.log("Error ambil data" , err.response ? err.response.data : err.message)
    }finally{
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchData()
  },[])

  return (
    <>
      <div className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded-xl">
        <div className="flex justify-between items-center mb-6 border-b pb-2">
          <h2 className="text-2xl font-bold text-gray-800">Tambah Tim Baru</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})} // 3. Update state langsung
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
              value={form.cabor_id}
              onChange={(e) => setForm({ ...form, cabor_id: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            >
              <option value="">Pilih Cabor...</option>
              {cabor.map((caborTim) => (
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

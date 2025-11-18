import { useState } from "react";
import apiClient from "../../services/apiClien";

export default function FormTambahTim({ onSucces, onClose }) {
  const [name, setName] = useState(""); // 1. State diinisialisasi sebagai string kosong
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      // 2. Kirim data sebagai objek sesuai format API
      await apiClient.post("/manager/teams", { name: name });
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
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nama Tim
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)} // 3. Update state langsung
              required
              placeholder="Masukkan nama tim"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
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

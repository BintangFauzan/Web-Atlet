import { useContext, useEffect, useState } from "react";
import { ManagerContext } from "../../context/ManagerContext";
import apiClient from "../../services/apiClien";
import { Loader2 } from "lucide-react";

export default function FormEditJadwal() {
  const {
    setLoading,
    loading,
    idEditJadwalPraktek,
    handleCloseModalEditJadwalPraktek,
    handleSubmitEditJadwalPraktek,
    setForomEditJadwal,
    formEditJadwal
  } = useContext(ManagerContext);
  const [dataTim, setDataTim] = useState([]);
  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Tambahkan 'await' untuk menunggu hasil dari API
      const res = await apiClient.get("/manager/dashboard");
      const data = res.data.teams_data;
      setDataTim(data);
    } catch (err) {
      console.log("Error fetchdata tim", err);
      alert("Gagal memuat data tim. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
    if(idEditJadwalPraktek){
      setForomEditJadwal({
        team_id: idEditJadwalPraktek.team_id || "",
        date: idEditJadwalPraktek.date || "",
        location: idEditJadwalPraktek.location || "",
        // Latihan
        start_time: idEditJadwalPraktek.start_time || "",
        end_time: idEditJadwalPraktek.end_time || "",
        // Pertandingan
        opponent_name: idEditJadwalPraktek.opponent_name || "",
        time: idEditJadwalPraktek.time || ""
      })
    }
  }, [idEditJadwalPraktek, setForomEditJadwal]);
  console.log("data id edit jadwal", idEditJadwalPraktek);

  let input
  if(idEditJadwalPraktek.type === "Latihan"){
    input =    <div className="mb-4">
              <label
                htmlFor="start_time"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Waktu Mulai
              </label>
              <input
                type="time"
                id="start_time"
                name="start_time"
                value={formEditJadwal.start_time}
                onChange={(e) =>
                  setForomEditJadwal({
                    ...formEditJadwal,
                    start_time: e.target.value,
                  })
                }
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              />
            </div>

            {/* end_time - Menggunakan type="time" sederhana */}
            <div className="mb-4">
              <label
                htmlFor="end_time"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Waktu Selesai
              </label>
              <input
                type="time"
                id="end_time"
                name="end_time"
                value={formEditJadwal.end_time}
                onChange={(e) =>
                  setForomEditJadwal({
                    ...formEditJadwal,
                    end_time: e.target.value,
                  })
                }
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              />
            </div>
  }else if(idEditJadwalPraktek.type === "Pertandingan"){
      input = <>
        <div className="mb-6">
              <label
                htmlFor="nama_lawan"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nama Lawan
              </label>
              <input
                type="text"
                id="nama_lawan"
                name="nama_lawan"
                placeholder="Contoh: Lapangan Hijau A"
                value={formEditJadwal.opponent_name}
                onChange={(e) =>
                  setForomEditJadwal({
                    ...formEditJadwal,
                    opponent_name: e.target.value,
                  })
                }
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="time"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mulai Tanding
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formEditJadwal.time}
                onChange={(e) =>
                  setForomEditJadwal({
                    ...formEditJadwal,
                    time: e.target.value,
                  })
                }
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              />
            </div>
            
      </>
  }
  return (
    <>
      <>
        <div className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded-xl">
          <div className="flex justify-between items-center mb-6 border-b pb-2">
            <h2 className="text-2xl font-bold text-gray-800">
              Tambah Jadwal Latihan
            </h2>
            <button
              onClick={handleCloseModalEditJadwalPraktek}
              className="text-gray-500 hover:text-gray-800"
            >
              &times;
            </button>
          </div>

          <form onSubmit={handleSubmitEditJadwalPraktek}>
            {/* team_id */}
            <div className="mb-4">
              <label
                htmlFor="team_id"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Pilih Tim
              </label>
              <select
                id="team_id"
                name="team_id"
                value={formEditJadwal.team_id}
                onChange={(e) =>
                  setForomEditJadwal({
                    ...formEditJadwal,
                    team_id: e.target.value,
                  })
                }
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              >
                <option value="">Pilih Tim...</option>
                {dataTim.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>

            {/* date - Menggunakan type="date" untuk kalender */}
            <div className="mb-4">
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Tanggal Latihan
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formEditJadwal.date}
                onChange={(e) =>
                  setForomEditJadwal({
                    ...formEditJadwal,
                    date: e.target.value,
                  })
                }
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              />
            </div>

            {/* start_time - Menggunakan type="time" sederhana */}
          {input}

            {/* location */}
            <div className="mb-6">
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Lokasi
              </label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Contoh: Lapangan Hijau A"
                value={formEditJadwal.location}
                onChange={(e) =>
                  setForomEditJadwal({
                    ...formEditJadwal,
                    location: e.target.value,
                  })
                }
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              />
            </div>

            {/* Tombol Submit */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={handleCloseModalEditJadwalPraktek}
                className="px-4 py-2 text-sm bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md disabled:bg-blue-300"
              >
                {loading && <Loader2 className="animate-spin w-4 h-4 mr-2" />}
                {loading ? "Menyimpan..." : "Simpan Jadwal"}
              </button>
            </div>
          </form>
        </div>
      </>
    </>
  );
}

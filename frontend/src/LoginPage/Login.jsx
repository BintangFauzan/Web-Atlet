// src/pages/Login.jsx
import { useState } from "react";
import { Mail, Lock, LogIn } from "lucide-react";
import apiClient from "../services/apiClien";
import { useNavigate, Link } from "react-router";

export default function Login() {
  // Logika State Halaman
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false); // State untuk mengelola tampilan loading/disable button
  const [error, setError] = useState(null); // State untuk menampilkan pesan error dari API
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true);
    setError(null);
    try {
      const res = await apiClient.post("/login", form);
      const token = res.data.token;
      const dataUser = res.data.user;
      const userId = res.data.user.id;
      const role = res.data.user.role;

      localStorage.setItem("AuthToken", token);
       localStorage.setItem("DataUser", JSON.stringify(dataUser)); 
      localStorage.setItem("IdUser", userId);
       localStorage.setItem("UserRole", role); 


      if (role === "manager") {
        navigate("/manager-dashboard");
      } else if (role === "coach") {
        navigate("/coach-dashboard");
      } else if (role === "athlete") {
        navigate("/athlete-dashboard");
      } else {
        setError("Role pengguna tidak ditemukan");
        navigate("/");
      }
    } catch (err) {
      // Ambil pesan error dari response backend jika ada
      if (err.response && err.response.data && err.response.data.message) {
        // Error validasi dari Laravel
        const validationErrors = err.response.data.errors;
        if (validationErrors) {
          const firstError = Object.values(validationErrors)[0][0];
          setError(firstError);
        } else {
          setError(err.response.data.message);
        }
      } else {
        setError("Terjadi kesalahan. Silakan coba lagi.");
      }
      console.log("Error login", err);
    } finally {
      setIsLoading(false);
    }
  };

  console.log("Form" ,form)

  return (
    // Container utama: Center seluruh konten di tengah layar
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl border border-gray-200">
        {/* Header dan Logo */}
        <div className="text-center mb-8">
          <LogIn className="w-10 h-10 mx-auto text-blue-600 mb-3" />
          <h2 className="text-3xl font-extrabold text-gray-900">
            Selamat Datang di Web Atlet
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Silakan masuk untuk melanjutkan
          </p>
        </div>

        {/* Form Login */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Input Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                placeholder="Masukkan alamat email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>

          {/* Input Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                placeholder="Masukkan password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
          </div>

          {/* Area Error */}
          {error && (
            <div
              className="p-3 text-sm text-red-700 bg-red-100 rounded-lg border border-red-200"
              role="alert"
            >
              {error}
            </div>
          )}

          {/* Tombol Submit */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white transition duration-150 ${
                isLoading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              }`}
            >
              {isLoading ? "Memuat..." : "Masuk"}
            </button>
          </div>
        </form>

        {/* Link ke Register */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Belum punya akun?{" "}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Daftar Sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

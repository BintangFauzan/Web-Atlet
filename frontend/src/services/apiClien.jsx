import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem("AuthToken")
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// // Menambahkan interceptor untuk menangani respons dari backend
// apiClient.interceptors.response.use(
//   // Blok ini dijalankan untuk respons dengan status 2xx (sukses)
//   (response) => {
//     const data = response.data;
//     // Periksa jika backend mengirim status 200 OK, namun sebenarnya berisi pesan error
//     // Ini adalah perbaikan untuk masalah di mana backend tidak menggunakan kode status HTTP yang benar
//     if (data && (data.error || data.message)) {
//       // Tolak promise secara manual agar blok .catch di komponen bisa berjalan
//       // Strukturnya dibuat mirip error asli axios agar penanganan error yang ada tetap berfungsi
//       return Promise.reject({ response });
//     }
//     // Jika tidak ada error di body, teruskan respons seperti biasa
//     return response;
//   },
//   // Blok ini dijalankan untuk respons dengan status non-2xx (error)
//   (error) => {
//     // Teruskan error asli dari axios agar tetap ditangani oleh blok .catch
//     return Promise.reject(error);
//   }
// );

export default apiClient
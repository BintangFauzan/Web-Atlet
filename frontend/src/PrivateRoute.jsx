import { useEffect, useState } from "react";
import { Navigate, useLocation, Outlet } from "react-router";
import apiClient from "./services/apiClien";

export default function PrivateRoute() {
  const [authStatus, setAuthStatus] = useState("loading");
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("AuthToken");

    if (!token) {
      setAuthStatus("unauthenticated");
      return;
    }

    apiClient
      .get("/user/current", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then(() => setAuthStatus("authenticated"))
      .catch((err) => {
        console.log("Token validation failed", err);
        localStorage.removeItem("AuthToken");
        localStorage.removeItem("DataUser");
        localStorage.removeItem("IdUser");
        localStorage.removeItem("UserRole");
        setAuthStatus("unauthenticated");
      });
  }, []);

  if (authStatus === "loading") 
    return <div className="text-center p-10">Loading.........</div>;
  
  if (authStatus === "unauthenticated") 
    return <Navigate to="/" replace />;

  // Cek role akses halaman
  const userRole = localStorage.getItem("UserRole"); // Perbaikan: getItem bukan get
  const currentPath = location.pathname.toLowerCase();
  
  const isCoachRoute = currentPath.startsWith("/coach-dashboard");
  const isManagerRoute = currentPath.startsWith("/manager-dashboard");
  const isAthleteRoute = currentPath.startsWith("/athlete-dashboard");

  // Logika pengecekan role
  if (isCoachRoute && userRole !== "coach") {
    return <Navigate to="/" replace />;
  }
  if (isManagerRoute && userRole !== "manager") {
    return <Navigate to="/" replace />;
  }
  if (isAthleteRoute && userRole !== "athlete") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />; // Tambahkan ini untuk merender child routes
}
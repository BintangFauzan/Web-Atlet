import { BrowserRouter as Router, Routes, Route } from "react-router";
import AthleteDashboard from "./AthletePage/AthleteDashboard";
import Layout from "./Layout/Layout";
import CoachDashboard from "./CoachPage/CoachDashboard";
import ManagerDashboard from "./ManagerPage/ManagerDashboard";
import PrivateRoute from "./PrivateRoute";
import Login from "./LoginPage/Login";
import ManagerContextProvider from "./context/ManagerContext";
import ManagerCaborContext from "./context/ManagerCaborContext";
import JadwalContextContent from "./context/JadwalContextContent";
import DashboardAdmin from "./AdminPage/DashboardAdmin";
import AdminContextStore from "./context/AdminContextStore";
function App() {
  return (
    <>
      <Routes>
        {/* Rute Publik */}
        <Route path="/" element={<Login />} />

        {/* Rute Privat yang menggunakan Layout */}
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="/athlete-dashboard" element={<AthleteDashboard />} />
            <Route path="/coach-dashboard" element={<CoachDashboard />} />
            <Route path="/manager-dashboard" element={
              <ManagerContextProvider>
                <ManagerCaborContext>
                 <JadwalContextContent>
                   <ManagerDashboard />
                 </JadwalContextContent>
                </ManagerCaborContext>
              </ManagerContextProvider>
            } />
            <Route path="/admin-dashboard" element={
              <AdminContextStore>
                <DashboardAdmin/>
              </AdminContextStore>
            } />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router";
import AthleteDashboard from "./AthletePage/AthleteDashboard";
import Layout from "./Layout/Layout";
import CoachDashboard from "./CoachPage/CoachDashboard";
import ManagerDashboard from "./ManagerPage/ManagerDashboard";
import PrivateRoute from "./PrivateRoute";
import Login from "./LoginPage/Login";
import ManagerContextProvider from "./context/ManagerContext";
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
                <ManagerDashboard />
              </ManagerContextProvider>
            } />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;

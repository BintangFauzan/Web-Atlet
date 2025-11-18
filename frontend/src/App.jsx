import { BrowserRouter as Router, Routes, Route } from "react-router";
import AthleteDashboard from "./AthletePage/AthleteDashboard";
import Layout from "./Layout/Layout";
import CoachDashboard from "./CoachPage/CoachDashboard";
import ManagerDashboard from "./ManagerPage/ManagerDashboard";
import PrivateRoute from "./PrivateRoute";
import Login from "./LoginPage/Login";
function App() {
  return (
    <>
      <Routes>
      {/* Route Publik */}
      <Route path="/" element={<Login/>}/>
        <Route element={<Layout />}>
          <Route element={<PrivateRoute />}>
            <Route path="/athlete-dashboard" element={<AthleteDashboard />} />
            <Route path="/coach-dashboard" element={<CoachDashboard />} />
            <Route path="/manager-dashboard" element={<ManagerDashboard />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;

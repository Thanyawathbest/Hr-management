import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
// import Dashboard from "./pages/Dashboard";
import ManageEmployees from "./pages/ManageEmployess/View";
import ManageEmployees_add from "./pages/ManageEmployess/Add";

const App = () => {
  
  return (
    <Routes>
      {/* Login page */}
      <Route path="/" element={<Login />} />

      {/* Layout route */}
      <Route path="Home" element={<Home />} >
        <Route path="ManageEmployees" element={<ManageEmployees />} />
        <Route path="ManageEmployees/Add" element={<ManageEmployees_add/>} />
        <Route path="ManageEmployees/edit/:id" element={<ManageEmployees_add/>} />
      </Route>

      
        {/* <Route path="Dashboard" element={<Dashboard />} /> */}
        {/* <Route path="leave" element={<div>การลา</div>} />
        <Route path="attendance" element={<div>การเข้างาน</div>} />
        <Route path="notifications" element={<div>แจ้งเตือน</div>} />
        <Route path="settings" element={<div>ตั้งค่า</div>} /> */}
    </Routes>
  )
}

export default App
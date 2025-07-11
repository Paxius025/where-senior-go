import './styles/style.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./Authentication/Register/RegisterPage.jsx";
import LoginPage from "./Authentication/Login/LoginPage.jsx";  
import DashboardPage from "./Dashboard/DashboardPage.jsx";
import ProfilePage from "./UserProfile/ProfilePage.jsx";
import ManualPage from './Manual/ManualPage.jsx';
import CompanyPage from './Company/CompanyPage.jsx';  
function App() {

  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/manual" element={<ManualPage />} />
            <Route path="/company" element={<CompanyPage />} />
          </Routes>
        </div>
      </BrowserRouter>

    </>
  )
}

export default App

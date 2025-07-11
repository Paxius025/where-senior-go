import './styles/style.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./Authentication/Register/RegisterPage.jsx";
import LoginPage from "./Authentication/Login/LoginPage.jsx";  
import DashboardPage from "./Dashboard/DashboardPage.jsx";
import ProfilePage from "./UserProfile/ProfilePage.jsx";
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
          </Routes>
        </div>
      </BrowserRouter>

    </>
  )
}

export default App

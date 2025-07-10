import './styles/style.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";  
import DashboardPage from "./pages/DashboardPage";

function App() {

  return (
    <>
      <BrowserRouter>
        <div className="App">
          <h1>Welcome to Where Senior Go</h1>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </div>
      </BrowserRouter>

    </>
  )
}

export default App

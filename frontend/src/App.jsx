import "./styles/style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./Authentication/Register/RegisterPage.jsx";
import LoginPage from "./Authentication/Login/LoginPage.jsx";
import DashboardPage from "./Dashboard/DashboardPage.jsx";
import ProfilePage from "./UserProfile/ProfilePage.jsx";
import ManualPage from "./Manual/ManualPage.jsx";
import CompanyPage from "./Company/CompanyPage.jsx";
import ReviewPage from "./Review/ReviewPage.jsx";
import RegisterProfile from "./UserProfile/RegisterProfilePage.jsx";
import CompanyPositionList from './Company/CompanyPositionList.jsx';
import CompanyList from './Company/CompanyList.jsx';

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
            <Route path="/reviews" element={<ReviewPage />} />
            <Route path="/registerProfile" element={<RegisterProfile />} />
            <Route path="/company/:companyId/positions" element={<CompanyPositionList />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;

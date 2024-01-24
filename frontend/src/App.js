import { useState } from "react";
import "./App.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";
import AdminCourse from "./Components/AdminCourse/AdminCourse";
import AdminAssessment from "./Components/AdminAssessment/AdminAssessment";
import AdminReport from "./Components/AdminReport/AdminReport";
import AdminFeedback from "./Components/AdminFeedback/AdminFeedback";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import SelectUser from "./Components/SelectUser/SelectUser";
import AdminLogin from "./Components/AdminLogin/AdminLogin";
const App = () => {
  
  
  return (
    <div>
      <Router>
        <Routes>
        <Route path="/" element={<SelectUser />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />   
        <Route path="/admin-course" element={<AdminCourse />} />   
        <Route path="/admin-assessment" element={<AdminAssessment />} />   
        <Route path="/admin-report" element={<AdminReport />} />   
        <Route path="/admin-feedback" element={<AdminFeedback />} />   
        <Route path="/reset-password" element={<ResetPassword />} />   
        </Routes>
      </Router>
    </div>
  );
};

export default App;

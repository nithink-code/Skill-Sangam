import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./components/Login"
import './App.css'
import TrainerRegister from "./components/TrainerRegister";
import AIAnalysisReport from './components/AiAnalysis';
import TrainerDashboard from './components/Dashboard';
import StudentDashboard from './components/StudentDashboard';
import StudentLogin from './components/studentLogin';

function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/trainer-register" element={<TrainerRegister />} />
      <Route path="/AIAnalysisReport" element={<AIAnalysisReport />} />
      <Route path="/TrainerDashboard" element={<TrainerDashboard/>} />
      <Route path="/StudentDashboard" element={<StudentDashboard/>} />
      <Route path="/StudentLogin" element={<StudentLogin/>}/>
      </Routes>
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App

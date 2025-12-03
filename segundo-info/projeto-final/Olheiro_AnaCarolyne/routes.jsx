import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/index";
import Home from "./pages/Home/Home"; 
import ProtectedRoute from "./components/ProtectedRoute";
import React from "react";
import Dashboard from "./pages/Dashboard/Dashboard";
import PainelMotoristas from "./pages/Motoristas/Profile/Motoristas";



export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

  

        <Route path="/dashboard" element ={<Dashboard />}></Route>
        <Route path="/motoristas" element={<PainelMotoristas />}></Route>
      </Routes>


      
    </BrowserRouter>
  );
}

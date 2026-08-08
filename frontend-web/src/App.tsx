// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import MainLayout from "./components/layout/MainLayout";
import DashboardApprenant from "./pages/apprenant/DashboardApprenant";
import CourseCatalog from "./pages/apprenant/CourseCatalog";
import CourseDetail from "./pages/apprenant/CourseDetail";
import Evaluations from "./pages/apprenant/Evaluations";
import Certifications from "./pages/apprenant/Certifications";
import ProfileCompetences from "./pages/apprenant/ProfileCompetences";
import DashboardAdmin from "./pages/admin/DashboardAdmin"; 
import ContenusEvaluations from "./pages/admin/ContenusEvaluations"; // 👈 Import de ContenusEvaluations

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        {/* Routes imbriquées dans le MainLayout pour l'apprenant */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardApprenant />} />
          <Route path="/catalog" element={<CourseCatalog />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/evaluations" element={<Evaluations />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/profile" element={<ProfileCompetences />} />
        </Route>

        {/* Espace Administrateur */}
        <Route path="/admin" element={<DashboardAdmin />} />
        <Route path="/admin/contents" element={<ContenusEvaluations />} /> {/* 👈 Route ajoutée */}
      </Routes>
    </BrowserRouter>
  );
}
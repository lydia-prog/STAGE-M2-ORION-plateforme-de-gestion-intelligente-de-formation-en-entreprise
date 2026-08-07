import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import MainLayout from "./components/layout/MainLayout";
import DashboardApprenant from "./pages/apprenant/DashboardApprenant";
import CourseCatalog from "./pages/apprenant/CourseCatalog";
import CourseDetail from "./pages/apprenant/CourseDetail"; // <-- Nouvel import

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardApprenant />} />
          <Route path="/catalog" element={<CourseCatalog />} />
          <Route path="/course/:id" element={<CourseDetail />} /> {/* <-- Nouvelle route */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
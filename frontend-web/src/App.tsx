import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";

import MainLayout from "./components/layout/MainLayout";

import DashboardApprenant from "./pages/apprenant/DashboardApprenant";
import CourseCatalog from "./pages/apprenant/CourseCatalog";
import CourseDetail from "./pages/apprenant/CourseDetail";
import Evaluations from "./pages/apprenant/Evaluations";
import Certifications from "./pages/apprenant/Certifications";
import ProfileCompetences from "./pages/apprenant/ProfileCompetences";

import DashboardAdmin from "./pages/admin/AdminDashboard";
import UsersPage from "./pages/admin/UserListPage";
import FormationListPage from "./pages/admin/FormationListPage";
import FormationFormPage from "./pages/admin/FormationFormPage";
import EvaluationsAdminPage from "./pages/admin/EvaluationListPage";
import EvaluationFormPage from "./pages/admin/EvaluationFormPage";
import EvaluationEditPage from "./pages/admin/EvaluationEditPage";
import CertificationsAdminPage from "./pages/admin/CertificationListPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardApprenant />} />
          <Route path="/catalog" element={<CourseCatalog />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/evaluations" element={<Evaluations />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/profile" element={<ProfileCompetences />} />
        </Route>

        <Route path="/admin" element={<DashboardAdmin />} />
        <Route path="/admin/users" element={<UsersPage />} />
        <Route path="/admin/formations" element={<FormationListPage />} />
        <Route path="/admin/formations/nouvelle" element={<FormationFormPage />} />
        <Route path="/admin/formations/:id" element={<FormationFormPage />} />
        <Route path="/admin/evaluations" element={<EvaluationsAdminPage />} />
        <Route path="/admin/evaluations/nouvelle" element={<EvaluationFormPage />} />
        <Route path="/admin/evaluations/:id" element={<EvaluationEditPage />} />
        <Route path="/admin/certifications" element={<CertificationsAdminPage />} />

        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
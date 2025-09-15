import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import DoctorDashboard from './pages/doctor-dashboard';
import PatientManagement from './pages/patient-management';
import PatientRecords from './pages/patient-records';
import DoctorRegistration from './pages/doctor-registration';
import PrescriptionEditor from './pages/prescription-editor';
import DoctorLogin from './pages/doctor-login';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<DoctorDashboard />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/patient-management" element={<PatientManagement />} />
        <Route path="/patient-records" element={<PatientRecords />} />
        <Route path="/doctor-registration" element={<DoctorRegistration />} />
        <Route path="/prescription-editor" element={<PrescriptionEditor />} />
        <Route path="/doctor-login" element={<DoctorLogin />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;

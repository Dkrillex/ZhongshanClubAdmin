import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { MemberManagement } from './pages/MemberManagement';
import { CourseManagement } from './pages/CourseManagement';
import { DrivingRangeManagement } from './pages/DrivingRangeManagement';
import { VehicleManagement } from './pages/VehicleManagement';
import { RestaurantManagement } from './pages/RestaurantManagement';
import { FinanceManagement } from './pages/FinanceManagement';
import { CouponManagement } from './pages/CouponManagement';
import { StaffManagement } from './pages/StaffManagement';
import { Login } from './pages/Login';

// Layout wrapper for protected routes
const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">
        <Header />
        <main className="flex-1 p-8 mt-16 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  // Simple auth state management
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('auth') === 'true';
  });

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('auth');
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />
        } />
        
        {/* Protected Routes */}
        <Route path="/*" element={
          isAuthenticated ? (
            <ProtectedLayout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/members" element={<MemberManagement />} />
                <Route path="/course" element={<CourseManagement />} />
                <Route path="/driving-range" element={<DrivingRangeManagement />} />
                <Route path="/vehicles" element={<VehicleManagement />} />
                <Route path="/restaurant" element={<RestaurantManagement />} />
                <Route path="/finance" element={<FinanceManagement />} />
                <Route path="/staff" element={<StaffManagement />} />
                <Route path="/coupons" element={<CouponManagement />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </ProtectedLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        } />
      </Routes>
    </Router>
  );
}

export default App;

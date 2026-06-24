import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { adminRoutes, managerRoutes, receptionistRoutes, customerRoutes } from './roleRoutes';

// Layouts
import AuthLayout from '../layouts/AuthLayout';
import MainLayout from '../layouts/MainLayout';
import CustomerLayout from '../layouts/CustomerLayout';
import PublicLayout from '../layouts/PublicLayout';

// Public Pages
import HomePage from '../pages/home/HomePage';
import AccommodationsPage from '../pages/public/AccommodationsPage';
import DiningPage from '../pages/public/DiningPage';
import ServicesPage from '../pages/public/ServicesPage';
import OffersPage from '../pages/public/OffersPage';

// Auth Pages
import CustomerLoginPage from '../pages/auth/CustomerLoginPage';
import StaffLoginPage from '../pages/auth/StaffLoginPage';
import RegisterPage from '../pages/auth/RegisterPage';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

const AppRouter = () => {
  const { user, isAuthenticated, loading } = useAuth();

  // Chờ restore session từ localStorage xong mới render
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        background: '#0B1120',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.5rem', color: '#C5A059',
            letterSpacing: '3px', marginBottom: '16px',
          }}>
            AURELIA GRAND
          </div>
          <div style={{
            width: '40px', height: '2px',
            background: 'linear-gradient(90deg, transparent, #C5A059, transparent)',
            margin: '0 auto',
            animation: 'shimmer 1.2s infinite',
          }} />
          <style>{`
            @keyframes shimmer {
              0% { opacity: 0.3; } 50% { opacity: 1; } 100% { opacity: 0.3; }
            }
          `}</style>
        </div>
      </div>
    );
  }

  const getRoleRoutes = () => {
    if (!user) return [];
    switch (user.role) {
      case 'admin': return adminRoutes;
      case 'manager': return managerRoutes;
      case 'receptionist': return receptionistRoutes;
      case 'customer': return customerRoutes;
      default: return [];
    }
  };

  const roleRoutes = getRoleRoutes();

  return (
    <Routes>
      {/* Public Routes - ai cũng vào được */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/cho-o" element={<AccommodationsPage />} />
        <Route path="/am-thuc" element={<DiningPage />} />
        <Route path="/dich-vu-spa" element={<ServicesPage />} />
        <Route path="/uu-dai" element={<OffersPage />} />
      </Route>

      {/* Auth Routes - nếu đã đăng nhập thì redirect dashboard */}
      <Route element={<AuthLayout />}>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <CustomerLoginPage />}
        />
        <Route
          path="/staff/login"
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <StaffLoginPage />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <RegisterPage />}
        />
      </Route>

      {/* Protected Routes */}
      <Route
        element={
          <ProtectedRoute>
            {user?.role === 'customer' ? <CustomerLayout /> : <MainLayout />}
          </ProtectedRoute>
        }
      >
        {roleRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={<route.element />} />
        ))}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;

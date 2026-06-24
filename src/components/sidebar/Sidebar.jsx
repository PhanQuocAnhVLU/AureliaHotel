import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  FaTachometerAlt, FaBed, FaCalendarAlt, FaUsers, 
  FaConciergeBell, FaFileInvoiceDollar, FaUserTie, 
  FaChartBar, FaSignOutAlt 
} from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const getNavItems = () => {
    const role = user?.role;
    
    const items = [
      { path: '/dashboard', label: 'Dashboard', icon: <FaTachometerAlt />, roles: ['admin', 'manager', 'receptionist'] },
      { path: '/rooms', label: 'Quản lý phòng', icon: <FaBed />, roles: ['admin', 'manager', 'receptionist'] },
      { path: '/bookings', label: 'Đặt phòng', icon: <FaCalendarAlt />, roles: ['admin', 'manager', 'receptionist'] },
      { path: '/customers', label: 'Khách hàng', icon: <FaUsers />, roles: ['admin', 'manager', 'receptionist'] },
      { path: '/services', label: 'Dịch vụ', icon: <FaConciergeBell />, roles: ['admin', 'manager'] },
      { path: '/invoices', label: 'Hóa đơn', icon: <FaFileInvoiceDollar />, roles: ['admin', 'manager', 'receptionist'] },
      { path: '/employees', label: 'Nhân viên', icon: <FaUserTie />, roles: ['admin', 'manager'] },
      { path: '/reports', label: 'Báo cáo', icon: <FaChartBar />, roles: ['admin', 'manager'] },
    ];

    return items.filter(item => item.roles.includes(role));
  };

  const navItems = getNavItems();

  return (
    <div className="sidebar bg-dark-custom">
      <div className="sidebar-brand">
        <FaBed className="text-gold me-2" />
        <span className="text-white fw-bold fs-4">LUXURY<span className="text-gold">HOTEL</span></span>
      </div>
      
      <div className="sidebar-user">
        <img src={user?.avatar || 'https://i.pravatar.cc/150'} alt="User" className="avatar rounded-circle me-3" />
        <div>
          <h6 className="mb-0 text-white">{user?.name}</h6>
          <small className="text-gold text-capitalize">{user?.role}</small>
        </div>
      </div>

      <ul className="sidebar-nav">
        {navItems.map((item, index) => (
          <li key={index} className={`nav-item ${location.pathname.startsWith(item.path) ? 'active' : ''}`}>
            <Link to={item.path} className="nav-link">
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="sidebar-footer">
        <button className="btn btn-outline-danger w-100" onClick={logout}>
          <FaSignOutAlt className="me-2" /> Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

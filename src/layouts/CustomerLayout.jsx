import { Outlet, Link } from 'react-router-dom';
import { Container, Navbar, Nav, Dropdown } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { FaUserCircle, FaSignOutAlt, FaBed, FaHotel } from 'react-icons/fa';

const CustomerLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="customer-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-main)' }}>
      {/* Customer Header */}
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm py-3 bg-dark-custom">
        <Container>
          <Navbar.Brand as={Link} to="/dashboard" className="fw-bold d-flex align-items-center">
            <FaHotel className="text-gold me-2" size={24} />
            <span className="text-white fs-4">LUXURY<span className="text-gold">HOTEL</span></span>
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="customer-navbar-nav" />
          
          <Navbar.Collapse id="customer-navbar-nav">
            <Nav className="me-auto ms-4">
              <Nav.Link as={Link} to="/dashboard">Trang chủ</Nav.Link>
              <Nav.Link as={Link} to="/rooms">Đặt phòng</Nav.Link>
              <Nav.Link as={Link} to="/bookings/history">Lịch sử đặt phòng</Nav.Link>
            </Nav>

            <Nav>
              <Dropdown align="end">
                <Dropdown.Toggle variant="link" id="dropdown-user" className="d-flex align-items-center text-decoration-none text-white p-0">
                  <div className="text-end me-2 d-none d-md-block">
                    <div className="fw-medium">{user?.name}</div>
                    <div className="text-gold" style={{ fontSize: '0.8rem' }}>{user?.tier} Member</div>
                  </div>
                  <img 
                    src={user?.avatar || 'https://i.pravatar.cc/150'} 
                    alt="User" 
                    className="rounded-circle border border-gold border-2" 
                    style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu className="shadow border-0 mt-2">
                  <Dropdown.Item as={Link} to="/profile">
                    <FaUserCircle className="me-2 text-muted" /> Hồ sơ cá nhân
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={logout} className="text-danger">
                    <FaSignOutAlt className="me-2" /> Đăng xuất
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '2rem 0' }}>
        <Container>
          <Outlet />
        </Container>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white py-4 mt-auto">
        <Container className="text-center">
          <p className="mb-0 text-muted">&copy; 2026 AURELIA GRAND HOTEL System. All rights reserved.</p>
        </Container>
      </footer>
    </div>
  );
};

export default CustomerLayout;

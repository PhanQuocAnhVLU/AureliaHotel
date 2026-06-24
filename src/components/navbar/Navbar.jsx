import { Navbar as BsNavbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaUserCircle, FaSignOutAlt, FaBell } from 'react-icons/fa';

const Navbar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();

  return (
    <BsNavbar bg="white" expand="lg" className="shadow-sm" style={{ height: 'var(--navbar-height)' }}>
      <Container fluid className="px-4">
        <BsNavbar.Toggle onClick={toggleSidebar} className="me-3 d-lg-none" />
        
        <BsNavbar.Brand className="d-lg-none fw-bold text-navy">
          LUXURY<span className="text-gold">HOTEL</span>
        </BsNavbar.Brand>

        <div className="d-none d-lg-flex flex-grow-1">
          <span className="text-muted">{new Date().toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>

        <Nav className="ms-auto d-flex align-items-center flex-row">
          <Nav.Link href="#notifications" className="me-3 text-navy position-relative">
            <FaBell size={20} />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6rem' }}>
              3
            </span>
          </Nav.Link>
          
          <Dropdown align="end">
            <Dropdown.Toggle variant="link" id="dropdown-user" className="d-flex align-items-center text-decoration-none text-dark p-0">
              <img 
                src={user?.avatar || 'https://i.pravatar.cc/150'} 
                alt="User" 
                className="rounded-circle me-2" 
                style={{ width: '35px', height: '35px', objectFit: 'cover' }}
              />
              <span className="d-none d-md-block fw-medium">{user?.name}</span>
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
      </Container>
    </BsNavbar>
  );
};

export default Navbar;

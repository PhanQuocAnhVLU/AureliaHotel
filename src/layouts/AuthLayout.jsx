import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const AuthLayout = () => {
  return (
    <div className="auth-layout" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.4), rgba(15, 23, 42, 0.6)), url('https://images.unsplash.com/photo-1542314831-c6a4d14b8fc4?w=1920')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      <Container>
        <div className="d-flex justify-content-center">
          <Outlet />
        </div>
      </Container>
    </div>
  );
};

export default AuthLayout;

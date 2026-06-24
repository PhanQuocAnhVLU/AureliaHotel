import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Alert, Card, InputGroup } from 'react-bootstrap';
import { FaEnvelope, FaLock, FaBed, FaUserShield, FaUserTie, FaUser } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

const CustomerLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginCustomer } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const result = loginCustomer(email, password);
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Đã xảy ra lỗi. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-0 shadow-lg" style={{ 
      maxWidth: '450px', 
      width: '100%', 
      backgroundColor: 'rgba(255, 255, 255, 0.92)', 
      backdropFilter: 'blur(12px)',
      borderRadius: 'var(--radius-lg)'
    }}>
      <Card.Body className="p-4 p-md-5">
        <div className="text-center mb-4">
          <FaBed className="text-gold mb-3" size={45} />
          <h2 className="fw-bold mb-2" style={{ letterSpacing: '1px' }}>AURELIA GRAND HOTEL</h2>
          <p className="text-muted small text-uppercase" style={{ letterSpacing: '2px' }}>Boutique Saigon</p>
        </div>



        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <InputGroup>
              <InputGroup.Text className="bg-light border-end-0">
                <FaEnvelope className="text-muted" />
              </InputGroup.Text>
              <Form.Control 
                type="email" 
                placeholder="Nhập email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-start-0 ps-0 bg-light"
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label className="d-flex justify-content-between">
              Mật khẩu
              <a href="#" className="text-muted text-decoration-none small">Quên mật khẩu?</a>
            </Form.Label>
            <InputGroup>
              <InputGroup.Text className="bg-light border-end-0">
                <FaLock className="text-muted" />
              </InputGroup.Text>
              <Form.Control 
                type="password" 
                placeholder="Nhập mật khẩu" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-start-0 ps-0 bg-light"
              />
            </InputGroup>
          </Form.Group>

          <Button 
            variant="gold" 
            type="submit" 
            className="w-100 btn-gold mb-3 py-2"
            disabled={loading}
          >
            {loading ? 'Đang xử lý...' : 'ĐĂNG NHẬP'}
          </Button>
        </Form>

        <div className="text-center mt-4">
          <span className="text-muted">Chưa có tài khoản? </span>
          <Link to="/register" className="text-gold fw-bold">Đăng ký ngay</Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CustomerLoginPage;

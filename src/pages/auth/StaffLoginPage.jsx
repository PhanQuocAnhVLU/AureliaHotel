import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Card, InputGroup } from 'react-bootstrap';
import { FaEnvelope, FaLock, FaUserShield } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

const StaffLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginStaff } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const result = loginStaff(email, password);
      
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
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor: '#0f172a' }}>
      <Card className="border-0 shadow-lg" style={{ maxWidth: '450px', width: '100%', backgroundColor: '#1e293b', color: '#f8fafc' }}>
        <Card.Body className="p-4 p-md-5">
          <div className="text-center mb-4">
            <FaUserShield className="text-gold mb-3" size={50} />
            <h2 className="fw-bold mb-1">CỔNG NHÂN VIÊN</h2>
            <p className="text-muted" style={{ color: '#94a3b8' }}>Hệ thống quản trị nội bộ</p>
          </div>

          {error && <Alert variant="danger" className="bg-danger text-white border-0">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Label className="text-light">Email Nội Bộ</Form.Label>
              <InputGroup>
                <InputGroup.Text className="bg-dark border-secondary text-muted">
                  <FaEnvelope />
                </InputGroup.Text>
                <Form.Control 
                  type="email" 
                  placeholder="name@aureliagrand.vn" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-dark border-secondary text-light ps-0"
                  style={{ boxShadow: 'none' }}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Label className="text-light">Mật Khẩu</Form.Label>
              <InputGroup>
                <InputGroup.Text className="bg-dark border-secondary text-muted">
                  <FaLock />
                </InputGroup.Text>
                <Form.Control 
                  type="password" 
                  placeholder="Nhập mật khẩu" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-dark border-secondary text-light ps-0"
                  style={{ boxShadow: 'none' }}
                />
              </InputGroup>
            </Form.Group>

            <Button 
              variant="gold" 
              type="submit" 
              className="w-100 btn-gold mb-3 py-2 fw-bold"
              disabled={loading}
            >
              {loading ? 'ĐANG XÁC THỰC...' : 'ĐĂNG NHẬP HỆ THỐNG'}
            </Button>
            
            <div className="text-center mt-3">
              <p className="small text-muted mb-0">Liên hệ IT Support nếu quên mật khẩu.</p>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default StaffLoginPage;

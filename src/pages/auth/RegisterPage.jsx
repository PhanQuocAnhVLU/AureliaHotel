import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Alert, Card, InputGroup, Row, Col } from 'react-bootstrap';
import { FaEnvelope, FaLock, FaUser, FaPhone, FaIdCard, FaBed } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { validateEmail, validatePhone, validatePassword } from '../../utils/validators';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    idCard: ''
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!validateEmail(formData.email)) {
      return setError('Email không hợp lệ');
    }
    if (!validatePhone(formData.phone)) {
      return setError('Số điện thoại không hợp lệ (phải là số Việt Nam hợp lệ)');
    }
    if (!validatePassword(formData.password)) {
      return setError('Mật khẩu phải có ít nhất 6 ký tự');
    }
    if (formData.password !== formData.confirmPassword) {
      return setError('Mật khẩu xác nhận không khớp');
    }

    setLoading(true);

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const result = register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        idCard: formData.idCard
      });
      
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
    <Card className="hotel-card border-0 shadow-lg" style={{ maxWidth: '650px', width: '100%', margin: '2rem 0' }}>
      <Card.Body className="p-4 p-md-5">
        <div className="text-center mb-4">
          <FaBed className="text-gold mb-2" size={40} />
          <h2 className="fw-bold">ĐĂNG KÝ THÀNH VIÊN</h2>
          <p className="text-muted">Nhận ngay ưu đãi đặc quyền cho khách hàng thân thiết</p>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Họ và tên</Form.Label>
                <InputGroup>
                  <InputGroup.Text className="bg-light border-end-0">
                    <FaUser className="text-muted" />
                  </InputGroup.Text>
                  <Form.Control 
                    type="text" 
                    name="name"
                    placeholder="Nguyễn Văn A" 
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border-start-0 ps-0 bg-light"
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <InputGroup>
                  <InputGroup.Text className="bg-light border-end-0">
                    <FaEnvelope className="text-muted" />
                  </InputGroup.Text>
                  <Form.Control 
                    type="email" 
                    name="email"
                    placeholder="email@example.com" 
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border-start-0 ps-0 bg-light"
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Số điện thoại</Form.Label>
                <InputGroup>
                  <InputGroup.Text className="bg-light border-end-0">
                    <FaPhone className="text-muted" />
                  </InputGroup.Text>
                  <Form.Control 
                    type="tel" 
                    name="phone"
                    placeholder="0912345678" 
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="border-start-0 ps-0 bg-light"
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>CCCD/CMND (Tùy chọn)</Form.Label>
                <InputGroup>
                  <InputGroup.Text className="bg-light border-end-0">
                    <FaIdCard className="text-muted" />
                  </InputGroup.Text>
                  <Form.Control 
                    type="text" 
                    name="idCard"
                    placeholder="Số CCCD/CMND" 
                    value={formData.idCard}
                    onChange={handleChange}
                    className="border-start-0 ps-0 bg-light"
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Mật khẩu</Form.Label>
                <InputGroup>
                  <InputGroup.Text className="bg-light border-end-0">
                    <FaLock className="text-muted" />
                  </InputGroup.Text>
                  <Form.Control 
                    type="password" 
                    name="password"
                    placeholder="Tối thiểu 6 ký tự" 
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="border-start-0 ps-0 bg-light"
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-4">
                <Form.Label>Xác nhận mật khẩu</Form.Label>
                <InputGroup>
                  <InputGroup.Text className="bg-light border-end-0">
                    <FaLock className="text-muted" />
                  </InputGroup.Text>
                  <Form.Control 
                    type="password" 
                    name="confirmPassword"
                    placeholder="Nhập lại mật khẩu" 
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="border-start-0 ps-0 bg-light"
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <Button 
            variant="gold" 
            type="submit" 
            className="w-100 btn-gold mb-3 py-2"
            disabled={loading}
          >
            {loading ? 'Đang xử lý...' : 'ĐĂNG KÝ'}
          </Button>
        </Form>

        <div className="text-center mt-3">
          <span className="text-muted">Đã có tài khoản? </span>
          <Link to="/login" className="text-gold fw-bold">Đăng nhập</Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default RegisterPage;

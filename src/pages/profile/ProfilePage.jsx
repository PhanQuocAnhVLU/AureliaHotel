import { useState } from 'react';
import { Card, Row, Col, Form, Button, Badge } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaIdCard, FaBirthdayCake, FaSave, FaStar } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();
  
  // Note: In a real app, this would use a mutation to update the user in DB
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    idCard: user?.idCard || '',
    dob: user?.dob || '',
    address: user?.address || ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setLoading(false);
    setSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => setSuccess(false), 3000);
  };

  const getTierBadge = (tier) => {
    if (!tier) return null;
    switch (tier) {
      case 'Platinum': return <Badge bg="dark" className="text-gold border border-gold px-3 py-2 fs-6">Platinum <FaStar className="mb-1" /></Badge>;
      case 'Gold': return <Badge bg="warning" className="text-dark px-3 py-2 fs-6">Gold</Badge>;
      case 'Silver': return <Badge bg="secondary" className="px-3 py-2 fs-6">Silver</Badge>;
      default: return <Badge bg="light" text="dark" className="border px-3 py-2 fs-6">Member</Badge>;
    }
  };

  if (!user) return <div className="p-5 text-center">Đang tải...</div>;

  return (
    <div>
      <h2 className="page-title mb-4">Hồ sơ Cá nhân</h2>

      <Row className="g-4">
        <Col lg={4}>
          <Card className="hotel-card border-0 mb-4 text-center">
            <Card.Body className="p-4 p-md-5">
              <div className="position-relative d-inline-block mb-3">
                <img 
                  src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0D1B2A&color=fff`} 
                  alt={user.name} 
                  className="rounded-circle border" 
                  style={{ width: '150px', height: '150px', objectFit: 'cover', borderColor: 'var(--primary-color) !important', borderWidth: '4px !important' }} 
                />
              </div>
              <h3 className="fw-bold mb-1">{user.name}</h3>
              <p className="text-muted mb-4">{user.email}</p>
              
              {user.role === 'customer' && (
                <div className="mb-4">
                  <div className="mb-2 text-muted small">Hạng thành viên</div>
                  {getTierBadge(user.tier)}
                  {user.isVIP && <Badge bg="danger" className="ms-2 px-3 py-2 fs-6">VIP</Badge>}
                </div>
              )}
              
              {user.role !== 'customer' && (
                <div className="mb-4">
                  <div className="mb-2 text-muted small">Vai trò / Chức vụ</div>
                  <Badge bg="primary" className="px-3 py-2 fs-6 text-uppercase">{user.role}</Badge>
                </div>
              )}

              <Button variant="outline-primary" className="w-100">
                Đổi ảnh đại diện
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          <Card className="hotel-card border-0">
            <Card.Body className="p-4 p-md-5">
              <h5 className="fw-bold mb-4 text-navy border-bottom pb-2">Thông tin Chi tiết</h5>
              
              {success && (
                <div className="alert alert-success" role="alert">
                  Cập nhật hồ sơ thành công!
                </div>
              )}

              <Form onSubmit={handleSubmit}>
                <Row className="g-4 mb-4">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="d-flex align-items-center">
                        <FaUser className="text-muted me-2" /> Họ và tên
                      </Form.Label>
                      <Form.Control 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="d-flex align-items-center">
                        <FaEnvelope className="text-muted me-2" /> Email (Không thể thay đổi)
                      </Form.Label>
                      <Form.Control 
                        type="email" 
                        value={formData.email} 
                        disabled 
                        className="bg-light"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="d-flex align-items-center">
                        <FaPhone className="text-muted me-2" /> Số điện thoại
                      </Form.Label>
                      <Form.Control 
                        type="tel" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="d-flex align-items-center">
                        <FaIdCard className="text-muted me-2" /> CCCD/CMND
                      </Form.Label>
                      <Form.Control 
                        type="text" 
                        name="idCard" 
                        value={formData.idCard} 
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="d-flex align-items-center">
                        <FaBirthdayCake className="text-muted me-2" /> Ngày sinh
                      </Form.Label>
                      <Form.Control 
                        type="date" 
                        name="dob" 
                        value={formData.dob} 
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group>
                      <Form.Label className="d-flex align-items-center">
                        <FaMapMarkerAlt className="text-muted me-2" /> Địa chỉ
                      </Form.Label>
                      <Form.Control 
                        as="textarea" 
                        rows={3} 
                        name="address" 
                        value={formData.address} 
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-flex justify-content-end">
                  <Button variant="gold" type="submit" className="btn-gold px-4 py-2" disabled={loading}>
                    <FaSave className="me-2" /> 
                    {loading ? 'Đang lưu...' : 'Lưu Thay đổi'}
                  </Button>
                </div>
              </Form>
              
              <hr className="my-5" />
              
              <h5 className="fw-bold mb-4 text-danger border-bottom pb-2">Bảo mật</h5>
              
              <Form>
                <Row className="g-4 mb-4">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Mật khẩu hiện tại</Form.Label>
                      <Form.Control type="password" placeholder="Nhập mật khẩu hiện tại" />
                    </Form.Group>
                  </Col>
                  <Col md={12}></Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Mật khẩu mới</Form.Label>
                      <Form.Control type="password" placeholder="Nhập mật khẩu mới" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Xác nhận mật khẩu mới</Form.Label>
                      <Form.Control type="password" placeholder="Nhập lại mật khẩu mới" />
                    </Form.Group>
                  </Col>
                </Row>
                
                <div className="d-flex justify-content-end">
                  <Button variant="outline-danger" className="px-4">
                    Đổi Mật khẩu
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;

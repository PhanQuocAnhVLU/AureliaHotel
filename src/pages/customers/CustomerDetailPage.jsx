import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, Row, Col, Badge, Button, Table } from 'react-bootstrap';
import { FaArrowLeft, FaStar, FaEnvelope, FaPhone, FaMapMarkerAlt, FaIdCard, FaBirthdayCake, FaEdit } from 'react-icons/fa';
import { useApp } from '../../contexts/AppContext';
import { formatCurrency, formatDate } from '../../utils/formatters';

const CustomerDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { customers, bookings } = useApp();
  
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const foundCustomer = customers.find(c => c.id === id);
    if (foundCustomer) {
      setCustomer(foundCustomer);
    } else {
      navigate('/customers');
    }
  }, [id, customers, navigate]);

  const customerBookings = useMemo(() => {
    if (!customer) return [];
    return bookings.filter(b => b.customerId === customer.id)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [customer, bookings]);

  if (!customer) return <div className="p-5 text-center">Đang tải...</div>;

  const getTierBadge = (tier) => {
    switch (tier) {
      case 'Platinum': return <Badge bg="dark" className="text-gold border border-gold fs-6 px-3 py-2">Platinum <FaStar size={12} className="mb-1" /></Badge>;
      case 'Gold': return <Badge bg="warning" className="text-dark fs-6 px-3 py-2">Gold</Badge>;
      case 'Silver': return <Badge bg="secondary" className="fs-6 px-3 py-2">Silver</Badge>;
      default: return <Badge bg="light" text="dark" className="border fs-6 px-3 py-2">Member</Badge>;
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'Confirmed': 'primary',
      'Checked-in': 'warning',
      'Completed': 'success',
      'Cancelled': 'danger'
    };
    return <Badge bg={statusMap[status] || 'secondary'}>{status}</Badge>;
  };

  return (
    <div>
      <div className="d-flex align-items-center mb-4">
        <Button variant="link" as={Link} to="/customers" className="text-decoration-none text-muted p-0 me-3">
          <FaArrowLeft size={20} />
        </Button>
        <h2 className="page-title mb-0">Hồ sơ Khách hàng</h2>
      </div>

      <Row className="g-4">
        <Col lg={4}>
          <Card className="hotel-card border-0 mb-4 text-center">
            <Card.Body className="p-4">
              <div className="position-relative d-inline-block mb-3">
                <img 
                  src={customer.avatar} 
                  alt={customer.name} 
                  className="rounded-circle border" 
                  style={{ width: '150px', height: '150px', objectFit: 'cover', borderColor: 'var(--primary-color) !important', borderWidth: '4px !important' }} 
                />
                {customer.isVIP && (
                  <Badge bg="danger" className="position-absolute bottom-0 start-50 translate-middle-x fs-6 px-3 py-1 rounded-pill">
                    VIP
                  </Badge>
                )}
              </div>
              <h3 className="fw-bold mb-1">{customer.name}</h3>
              <p className="text-muted mb-3">ID: {customer.id}</p>
              
              <div className="mb-4">
                {getTierBadge(customer.tier)}
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Tổng lần lưu trú</span>
                <span className="fw-bold">{customer.totalStays}</span>
              </div>
              <div className="d-flex justify-content-between mb-3 pb-3 border-bottom">
                <span className="text-muted">Tổng chi tiêu</span>
                <span className="fw-bold text-gold fs-5">{formatCurrency(customer.totalSpent)}</span>
              </div>

              <Button variant="outline-primary" className="w-100">
                <FaEdit className="me-2" /> Chỉnh sửa hồ sơ
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          <Card className="hotel-card border-0 mb-4">
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-4 text-navy border-bottom pb-2">Thông tin Liên hệ & Cá nhân</h5>
              
              <Row className="g-4">
                <Col sm={6}>
                  <div className="d-flex align-items-start">
                    <FaEnvelope className="text-muted me-3 mt-1" />
                    <div>
                      <small className="text-muted d-block">Email</small>
                      <span className="fw-medium">{customer.email}</span>
                    </div>
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="d-flex align-items-start">
                    <FaPhone className="text-muted me-3 mt-1" />
                    <div>
                      <small className="text-muted d-block">Số điện thoại</small>
                      <span className="fw-medium">{customer.phone}</span>
                    </div>
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="d-flex align-items-start">
                    <FaIdCard className="text-muted me-3 mt-1" />
                    <div>
                      <small className="text-muted d-block">CCCD/CMND</small>
                      <span className="fw-medium">{customer.idCard || 'Chưa cập nhật'}</span>
                    </div>
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="d-flex align-items-start">
                    <FaBirthdayCake className="text-muted me-3 mt-1" />
                    <div>
                      <small className="text-muted d-block">Ngày sinh</small>
                      <span className="fw-medium">{customer.dob ? formatDate(customer.dob) : 'Chưa cập nhật'}</span>
                    </div>
                  </div>
                </Col>
                <Col sm={12}>
                  <div className="d-flex align-items-start">
                    <FaMapMarkerAlt className="text-muted me-3 mt-1" />
                    <div>
                      <small className="text-muted d-block">Địa chỉ</small>
                      <span className="fw-medium">{customer.address || 'Chưa cập nhật'}</span>
                    </div>
                  </div>
                </Col>
              </Row>

              {customer.notes && (
                <div className="mt-4 p-3 bg-warning bg-opacity-10 border border-warning rounded">
                  <span className="fw-bold d-block mb-1 text-warning">Ghi chú đặc biệt:</span>
                  <span>{customer.notes}</span>
                </div>
              )}
            </Card.Body>
          </Card>

          <Card className="hotel-card border-0">
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-4 text-navy border-bottom pb-2">Lịch sử Đặt phòng</h5>
              
              <div className="table-responsive">
                <Table hover className="align-middle mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th>Mã ĐP</th>
                      <th>Ngày đặt</th>
                      <th>Check-in / Out</th>
                      <th>Tổng tiền</th>
                      <th>Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customerBookings.length > 0 ? customerBookings.map(booking => (
                      <tr key={booking.id}>
                        <td><Link to={`/bookings/${booking.id}`} className="fw-bold text-decoration-none">{booking.id}</Link></td>
                        <td>{formatDate(booking.createdAt)}</td>
                        <td>
                          <div>{formatDate(booking.checkIn)}</div>
                          <small className="text-muted">đến {formatDate(booking.checkOut)}</small>
                        </td>
                        <td className="fw-medium">{formatCurrency(booking.total)}</td>
                        <td>{getStatusBadge(booking.status)}</td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="5" className="text-center py-4 text-muted">
                          Chưa có lịch sử đặt phòng
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CustomerDetailPage;

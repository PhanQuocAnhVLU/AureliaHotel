import { useMemo } from 'react';
import { Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaStar, FaHistory, FaMapMarkerAlt } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import { formatDate, formatCurrency } from '../../utils/formatters';

const CustomerDashboard = () => {
  const { user } = useAuth();
  const { bookings, rooms } = useApp();

  const myBookings = useMemo(() => {
    return bookings.filter(b => b.customerId === user?.id)
      .sort((a, b) => new Date(b.checkIn) - new Date(a.checkIn));
  }, [bookings, user]);

  const upcomingBookings = myBookings.filter(b => ['Confirmed', 'Checked-in'].includes(b.status));
  const pastBookings = myBookings.filter(b => ['Completed', 'Cancelled'].includes(b.status));

  const totalSpent = pastBookings.reduce((sum, b) => b.status === 'Completed' ? sum + b.total : sum, 0);

  const getTierColor = (tier) => {
    switch (tier) {
      case 'Platinum': return '#b5a642';
      case 'Gold': return '#ffd700';
      case 'Silver': return '#c0c0c0';
      default: return '#cd7f32';
    }
  };

  return (
    <div>
      {/* Welcome Section */}
      <Card className="hotel-card border-0 mb-4 bg-dark-custom text-white" style={{ background: `linear-gradient(135deg, var(--bg-dark-card) 0%, var(--secondary-color) 100%)` }}>
        <Card.Body className="p-4 p-md-5">
          <Row className="align-items-center">
            <Col md={8}>
              <h2 className="fw-bold mb-3 text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Xin chào, {user?.name}!</h2>
              <p className="lead mb-4 text-white-50">Chào mừng bạn trở lại với AURELIA GRAND HOTEL. Chúng tôi rất hân hạnh được phục vụ bạn.</p>
              <div className="d-flex flex-wrap gap-3">
                <Button as={Link} to="/rooms" variant="gold" className="btn-gold px-4 py-2">
                  <FaCalendarAlt className="me-2" /> Đặt phòng ngay
                </Button>
                <Button as={Link} to="/profile" variant="outline-light" className="px-4 py-2 border-secondary">
                  Cập nhật hồ sơ
                </Button>
              </div>
            </Col>
            <Col md={4} className="d-none d-md-flex justify-content-end">
              <div className="text-center p-4 rounded-circle" style={{ border: `4px solid ${getTierColor(user?.tier)}`, width: '180px', height: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.05)' }}>
                <FaStar size={40} color={getTierColor(user?.tier)} className="mb-2 mx-auto" />
                <h4 className="fw-bold mb-0" style={{ color: getTierColor(user?.tier) }}>{user?.tier}</h4>
                <small className="text-white-50">Thành viên</small>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Row className="g-4 mb-4">
        <Col md={4}>
          <Card className="hotel-card border-0 h-100 text-center">
            <Card.Body className="p-4">
              <div className="rounded-circle bg-primary bg-opacity-10 text-primary p-3 d-inline-block mb-3">
                <FaCalendarAlt size={24} />
              </div>
              <h3 className="fw-bold mb-1">{myBookings.length}</h3>
              <p className="text-muted mb-0">Tổng số lần đặt phòng</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="hotel-card border-0 h-100 text-center">
            <Card.Body className="p-4">
              <div className="rounded-circle bg-success bg-opacity-10 text-success p-3 d-inline-block mb-3">
                <FaHistory size={24} />
              </div>
              <h3 className="fw-bold mb-1">{pastBookings.length}</h3>
              <p className="text-muted mb-0">Lần lưu trú hoàn tất</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="hotel-card border-0 h-100 text-center">
            <Card.Body className="p-4">
              <div className="rounded-circle bg-gold bg-opacity-10 text-gold p-3 d-inline-block mb-3">
                <FaStar size={24} />
              </div>
              <h3 className="fw-bold mb-1 text-gold">{formatCurrency(totalSpent)}</h3>
              <p className="text-muted mb-0">Tổng chi tiêu</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h4 className="fw-bold mb-4 d-flex align-items-center">
        <FaMapMarkerAlt className="text-gold me-2" /> Đặt phòng sắp tới
      </h4>

      {upcomingBookings.length > 0 ? (
        <Row className="g-4">
          {upcomingBookings.map(booking => {
            const room = rooms.find(r => r.id === booking.roomId);
            return (
              <Col md={6} lg={4} key={booking.id}>
                <Card className="hotel-card border-0 h-100 p-0 overflow-hidden">
                  <div style={{ height: '160px', overflow: 'hidden', position: 'relative' }}>
                    <img 
                      src={room?.images[0]} 
                      alt={room?.type} 
                      className="w-100 h-100" 
                      style={{ objectFit: 'cover' }} 
                      onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800'; }}
                    />
                    <Badge bg={booking.status === 'Confirmed' ? 'primary' : 'warning'} className="position-absolute top-0 end-0 m-3 fs-6">
                      {booking.status}
                    </Badge>
                  </div>
                  <Card.Body>
                    <h5 className="fw-bold mb-1">Phòng {room?.type}</h5>
                    <p className="text-muted small mb-3">Mã ĐP: {booking.id}</p>
                    
                    <div className="d-flex justify-content-between mb-2 pb-2 border-bottom">
                      <span className="text-muted">Nhận phòng:</span>
                      <span className="fw-medium">{formatDate(booking.checkIn)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3 pb-2 border-bottom">
                      <span className="text-muted">Trả phòng:</span>
                      <span className="fw-medium">{formatDate(booking.checkOut)}</span>
                    </div>
                    
                    <Button as={Link} to={`/bookings/${booking.id}`} variant="outline-navy" className="w-100">
                      Xem chi tiết
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      ) : (
        <Card className="hotel-card border-0 bg-light text-center py-5">
          <Card.Body>
            <FaCalendarAlt size={48} className="text-muted mb-3 opacity-50" />
            <h5 className="text-muted">Bạn không có đặt phòng nào sắp tới</h5>
            <Button as={Link} to="/rooms" variant="gold" className="mt-3 btn-gold">
              Khám phá phòng ngay
            </Button>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default CustomerDashboard;

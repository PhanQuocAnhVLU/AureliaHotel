import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, Row, Col, Badge, Button, Table } from 'react-bootstrap';
import { FaArrowLeft, FaPrint, FaEdit, FaTimes, FaCheck, FaUser, FaBed, FaCalendarAlt, FaMoneyBillWave } from 'react-icons/fa';
import { useApp } from '../../contexts/AppContext';
import useBooking from '../../hooks/useBooking';
import { formatDate, formatDateTime, formatCurrency } from '../../utils/formatters';

const BookingDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { bookings, rooms, customers, invoices, updateBooking } = useApp();
  const { cancelBooking } = useBooking();

  const [booking, setBooking] = useState(null);
  const [room, setRoom] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    const foundBooking = bookings.find(b => b.id === id);
    if (foundBooking) {
      setBooking(foundBooking);
      setRoom(rooms.find(r => r.id === foundBooking.roomId));
      setCustomer(customers.find(c => c.id === foundBooking.customerId));
      setInvoice(invoices.find(i => i.bookingId === foundBooking.id));
    } else {
      navigate('/bookings');
    }
  }, [id, bookings, rooms, customers, invoices, navigate]);

  const handleUpdateStatus = (newStatus) => {
    updateBooking({ ...booking, status: newStatus });
  };

  const handleCancel = async () => {
    if (window.confirm('Bạn có chắc chắn muốn hủy đặt phòng này?')) {
      await cancelBooking(booking.id);
    }
  };

  if (!booking || !room || !customer) return <div className="p-5 text-center">Đang tải...</div>;

  const getStatusBadge = (status) => {
    const statusMap = {
      'Confirmed': 'primary',
      'Checked-in': 'warning',
      'Completed': 'success',
      'Cancelled': 'danger'
    };
    return <Badge bg={statusMap[status] || 'secondary'} className="fs-6 px-3 py-2">{status}</Badge>;
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center">
          <Button variant="link" as={Link} to="/bookings" className="text-decoration-none text-muted p-0 me-3">
            <FaArrowLeft size={20} />
          </Button>
          <h2 className="page-title mb-0">Chi tiết Đặt phòng #{booking.id}</h2>
        </div>
        <div>
          {getStatusBadge(booking.status)}
        </div>
      </div>

      <Row className="g-4 mb-4">
        <Col md={12} lg={8}>
          <Card className="hotel-card border-0 mb-4">
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-4 text-navy border-bottom pb-2">Thông tin lưu trú</h5>
              
              <Row className="g-4 mb-4">
                <Col sm={6}>
                  <div className="d-flex">
                    <div className="bg-light p-3 rounded text-muted me-3">
                      <FaCalendarAlt size={20} />
                    </div>
                    <div>
                      <small className="text-muted d-block">Nhận phòng (Check-in)</small>
                      <span className="fw-bold fs-5">{formatDate(booking.checkIn)}</span>
                      <small className="text-muted d-block">14:00</small>
                    </div>
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="d-flex">
                    <div className="bg-light p-3 rounded text-muted me-3">
                      <FaCalendarAlt size={20} />
                    </div>
                    <div>
                      <small className="text-muted d-block">Trả phòng (Check-out)</small>
                      <span className="fw-bold fs-5">{formatDate(booking.checkOut)}</span>
                      <small className="text-muted d-block">12:00</small>
                    </div>
                  </div>
                </Col>
              </Row>

              <Row className="g-4">
                <Col sm={6}>
                  <div className="d-flex">
                    <div className="bg-light p-3 rounded text-muted me-3">
                      <FaBed size={20} />
                    </div>
                    <div>
                      <small className="text-muted d-block">Phòng</small>
                      <span className="fw-bold">{room.type} (Phòng {room.number})</span>
                      <small className="text-muted d-block">{booking.nights} đêm</small>
                    </div>
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="d-flex">
                    <div className="bg-light p-3 rounded text-muted me-3">
                      <FaUser size={20} />
                    </div>
                    <div>
                      <small className="text-muted d-block">Khách</small>
                      <span className="fw-bold">{booking.adults} người lớn, {booking.children} trẻ em</span>
                    </div>
                  </div>
                </Col>
              </Row>

              {booking.notes && (
                <div className="mt-4 p-3 bg-light rounded">
                  <span className="fw-bold d-block mb-1">Ghi chú của khách:</span>
                  <span className="text-muted">{booking.notes}</span>
                </div>
              )}
            </Card.Body>
          </Card>

          <Card className="hotel-card border-0">
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-4 text-navy border-bottom pb-2">Thông tin khách hàng</h5>
              <div className="d-flex align-items-center mb-4">
                <img src={customer.avatar} alt={customer.name} className="avatar-lg me-4" />
                <div>
                  <h4 className="fw-bold mb-1">{customer.name}</h4>
                  <Badge bg="gold" className="text-dark me-2">{customer.tier}</Badge>
                  {customer.isVIP && <Badge bg="danger">VIP</Badge>}
                </div>
              </div>
              <Row>
                <Col sm={6} className="mb-3">
                  <span className="text-muted d-block">Email</span>
                  <span className="fw-medium">{customer.email}</span>
                </Col>
                <Col sm={6} className="mb-3">
                  <span className="text-muted d-block">Số điện thoại</span>
                  <span className="fw-medium">{customer.phone}</span>
                </Col>
                <Col sm={6} className="mb-3">
                  <span className="text-muted d-block">CCCD/CMND</span>
                  <span className="fw-medium">{customer.idCard || 'N/A'}</span>
                </Col>
                <Col sm={6} className="mb-3">
                  <span className="text-muted d-block">Quốc tịch</span>
                  <span className="fw-medium">{customer.nationality}</span>
                </Col>
                <Col sm={12}>
                  <span className="text-muted d-block">Địa chỉ</span>
                  <span className="fw-medium">{customer.address || 'N/A'}</span>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col md={12} lg={4}>
          <Card className="hotel-card border-0 mb-4 bg-light">
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-4 text-navy border-bottom pb-2">Hành động</h5>
              <div className="d-grid gap-2">
                {booking.status === 'Confirmed' && (
                  <Button variant="warning" onClick={() => handleUpdateStatus('Checked-in')}>
                    <FaCheck className="me-2" /> Check-in Khách
                  </Button>
                )}
                
                {booking.status === 'Checked-in' && (
                  <Button variant="success" onClick={() => handleUpdateStatus('Completed')}>
                    <FaCheck className="me-2" /> Check-out Khách
                  </Button>
                )}
                
                {['Confirmed', 'Checked-in'].includes(booking.status) && (
                  <>
                    <Button variant="outline-primary" as={Link} to={`/bookings/${booking.id}/edit`}>
                      <FaEdit className="me-2" /> Chỉnh sửa đặt phòng
                    </Button>
                    <Button variant="outline-danger" onClick={handleCancel}>
                      <FaTimes className="me-2" /> Hủy đặt phòng
                    </Button>
                  </>
                )}
                
                <Button variant="outline-secondary" disabled={!invoice}>
                  <FaPrint className="me-2" /> In hóa đơn
                </Button>
              </div>
            </Card.Body>
          </Card>

          <Card className="hotel-card border-0">
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-4 text-navy border-bottom pb-2">Chi tiết thanh toán</h5>
              
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Tiền phòng ({booking.nights} đêm)</span>
                <span className="fw-medium">{formatCurrency(booking.roomPrice * booking.nights)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Dịch vụ sử dụng</span>
                <span className="fw-medium">{formatCurrency(booking.servicesTotal)}</span>
              </div>
              
              <hr className="my-3" />
              
              <div className="d-flex justify-content-between align-items-center mb-4">
                <span className="fw-bold fs-5">Tổng cộng</span>
                <span className="fw-bold fs-4 text-gold">{formatCurrency(booking.total)}</span>
              </div>
              
              <div>
                <span className="text-muted d-block mb-1">Trạng thái thanh toán</span>
                <Badge bg={booking.paymentStatus === 'Paid' ? 'success' : booking.paymentStatus === 'Partial' ? 'warning' : 'danger'} className="fs-6 px-3 py-2 w-100 text-center">
                  {booking.paymentStatus === 'Paid' ? 'Đã thanh toán đủ' : booking.paymentStatus === 'Partial' ? 'Thanh toán một phần' : 'Chưa thanh toán'}
                </Badge>
              </div>
              
              {booking.paymentMethod && (
                <div className="mt-3 text-center">
                  <span className="text-muted small">Phương thức: {booking.paymentMethod}</span>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BookingDetailPage;

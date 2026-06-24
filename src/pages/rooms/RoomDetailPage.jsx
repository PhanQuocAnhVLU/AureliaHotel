import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Row, Col, Card, Badge, Button, Form, Alert } from 'react-bootstrap';
import { FaStar, FaUser, FaVectorSquare, FaBed, FaCheck, FaCalendarAlt, FaArrowLeft } from 'react-icons/fa';
import { useApp } from '../../contexts/AppContext';
import { useAuth } from '../../contexts/AuthContext';
import useBooking from '../../hooks/useBooking';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { checkRoomAvailability } from '../../utils/algorithms';
import { getTodayString, addDays } from '../../utils/dateUtils';

const RoomDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { rooms, bookings } = useApp();
  const { user } = useAuth();
  const { createBooking, loading, error: bookingError } = useBooking();

  const [room, setRoom] = useState(null);
  const [checkIn, setCheckIn] = useState(getTodayString());
  const [checkOut, setCheckOut] = useState(addDays(getTodayString(), 1));
  const [guests, setGuests] = useState(1);
  const [availabilityMsg, setAvailabilityMsg] = useState(null);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    const foundRoom = rooms.find(r => r.id === id);
    if (foundRoom) {
      setRoom(foundRoom);
    } else {
      navigate('/rooms');
    }
  }, [id, rooms, navigate]);

  const handleCheckAvailability = () => {
    if (!checkIn || !checkOut) {
      setAvailabilityMsg({ type: 'danger', text: 'Vui lòng chọn ngày Check-in và Check-out' });
      setIsAvailable(false);
      return;
    }

    if (new Date(checkIn) >= new Date(checkOut)) {
      setAvailabilityMsg({ type: 'danger', text: 'Ngày Check-out phải sau ngày Check-in' });
      setIsAvailable(false);
      return;
    }

    const { isAvailable, conflicts } = checkRoomAvailability(id, checkIn, checkOut, bookings);
    
    if (isAvailable) {
      setAvailabilityMsg({ type: 'success', text: 'Phòng trống! Bạn có thể đặt phòng này.' });
      setIsAvailable(true);
    } else {
      const conflictMsg = conflicts.map(c => `${formatDate(c.checkIn)} - ${formatDate(c.checkOut)}`).join(', ');
      setAvailabilityMsg({ type: 'danger', text: `Phòng đã được đặt trong khoảng thời gian: ${conflictMsg}` });
      setIsAvailable(false);
    }
  };

  const handleBookRoom = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    
    const result = await createBooking({
      roomId: room.id,
      customerId: user.id,
      customerName: user.name,
      checkIn,
      checkOut,
      nights,
      adults: guests,
      children: 0,
      roomPrice: room.price,
      servicesTotal: 0,
      total: room.price * nights
    });

    if (result.success) {
      navigate('/bookings/history', { state: { message: 'Đặt phòng thành công!' } });
    }
  };

  if (!room) return <div className="p-5 text-center">Đang tải...</div>;

  return (
    <div>
      <Button variant="link" as={Link} to="/rooms" className="text-decoration-none text-muted mb-3 p-0 d-flex align-items-center">
        <FaArrowLeft className="me-2" /> Quay lại danh sách phòng
      </Button>

      <Row className="g-4">
        <Col lg={8}>
          <Card className="hotel-card border-0 mb-4 p-0 overflow-hidden">
            <img 
              src={room.images[0]} 
              alt={`Phòng ${room.number}`} 
              className="w-100" 
              style={{ height: '400px', objectFit: 'cover' }} 
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800'; }} 
            />
          </Card>

          <Card className="hotel-card border-0 mb-4">
            <Card.Body className="p-4 p-md-5">
              <div className="d-flex justify-content-between align-items-start mb-4">
                <div>
                  <Badge bg="dark" className="mb-2 fs-6 px-3 py-2">Phòng {room.number}</Badge>
                  <h2 className="fw-bold text-navy mb-2">{room.type}</h2>
                  <div className="d-flex align-items-center text-warning mb-3">
                    <FaStar className="me-1" />
                    <span className="text-dark fw-medium me-3">{room.rating}</span>
                    <span className="text-muted small">({room.bookings} lượt đặt)</span>
                  </div>
                </div>
                <div className="text-end">
                  <span className="text-muted small d-block">Giá mỗi đêm</span>
                  <span className="price-tag fs-2">{formatCurrency(room.price)}</span>
                </div>
              </div>

              <div className="d-flex flex-wrap gap-4 mb-4 pb-4 border-bottom">
                <div className="d-flex align-items-center">
                  <div className="bg-light p-3 rounded-circle me-3 text-muted">
                    <FaUser size={20} />
                  </div>
                  <div>
                    <span className="d-block text-muted small">Sức chứa</span>
                    <span className="fw-medium">Tối đa {room.capacity} khách</span>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="bg-light p-3 rounded-circle me-3 text-muted">
                    <FaVectorSquare size={20} />
                  </div>
                  <div>
                    <span className="d-block text-muted small">Diện tích</span>
                    <span className="fw-medium">{room.area} m²</span>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="bg-light p-3 rounded-circle me-3 text-muted">
                    <FaBed size={20} />
                  </div>
                  <div>
                    <span className="d-block text-muted small">Giường</span>
                    <span className="fw-medium">{room.bedType}</span>
                  </div>
                </div>
              </div>

              <h5 className="fw-bold mb-3">Mô tả phòng</h5>
              <p className="text-muted mb-4 lh-lg">{room.description}</p>

              <h5 className="fw-bold mb-3">Tiện nghi</h5>
              <Row className="g-3">
                {room.amenities.map((item, index) => (
                  <Col md={6} key={index}>
                    <div className="d-flex align-items-center">
                      <FaCheck className="text-gold me-2" />
                      <span className="text-muted">{item}</span>
                    </div>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="hotel-card border-0 sticky-top" style={{ top: '90px' }}>
            <Card.Body className="p-4">
              <h4 className="fw-bold mb-4 d-flex align-items-center">
                <FaCalendarAlt className="text-gold me-2" /> Đặt phòng
              </h4>

              {bookingError && <Alert variant="danger">{bookingError}</Alert>}

              <Form>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-medium">Ngày nhận phòng (Check-in)</Form.Label>
                  <Form.Control 
                    type="date" 
                    value={checkIn}
                    onChange={(e) => {
                      setCheckIn(e.target.value);
                      setIsAvailable(false);
                      setAvailabilityMsg(null);
                    }}
                    min={getTodayString()}
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label className="fw-medium">Ngày trả phòng (Check-out)</Form.Label>
                  <Form.Control 
                    type="date" 
                    value={checkOut}
                    onChange={(e) => {
                      setCheckOut(e.target.value);
                      setIsAvailable(false);
                      setAvailabilityMsg(null);
                    }}
                    min={checkIn || getTodayString()}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-medium">Số khách</Form.Label>
                  <Form.Select 
                    value={guests} 
                    onChange={(e) => setGuests(Number(e.target.value))}
                  >
                    {[...Array(room.capacity)].map((_, i) => (
                      <option key={i+1} value={i+1}>{i+1} người</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                {availabilityMsg && (
                  <Alert variant={availabilityMsg.type} className="py-2 small">
                    {availabilityMsg.text}
                  </Alert>
                )}

                {!isAvailable ? (
                  <Button 
                    variant="outline-gold" 
                    className="w-100 py-2" 
                    onClick={handleCheckAvailability}
                  >
                    Kiểm tra phòng trống
                  </Button>
                ) : (
                  <>
                    <div className="bg-light p-3 rounded mb-3">
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted">{formatCurrency(room.price)} x {Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))} đêm</span>
                        <span className="fw-medium">{formatCurrency(room.price * Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)))}</span>
                      </div>
                      <hr className="my-2" />
                      <div className="d-flex justify-content-between">
                        <span className="fw-bold">Tổng cộng</span>
                        <span className="fw-bold text-gold fs-5">{formatCurrency(room.price * Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)))}</span>
                      </div>
                    </div>
                    <Button 
                      variant="gold" 
                      className="w-100 py-2 btn-gold" 
                      onClick={handleBookRoom}
                      disabled={loading}
                    >
                      {loading ? 'Đang xử lý...' : (user ? 'XÁC NHẬN ĐẶT PHÒNG' : 'ĐĂNG NHẬP ĐỂ ĐẶT PHÒNG')}
                    </Button>
                  </>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default RoomDetailPage;

import { useMemo } from 'react';
import { Card, Table, Badge, Button, Row, Col } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaEye, FaHistory, FaCalendarAlt, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import useBooking from '../../hooks/useBooking';
import { formatDate } from '../../utils/dateUtils';
import { formatCurrency } from '../../utils/formatters';

const BookingHistoryPage = () => {
  const { user } = useAuth();
  const { bookings, rooms } = useApp();
  const { cancelBooking, loading } = useBooking();
  const location = useLocation();
  const successMessage = location.state?.message;

  const myBookings = useMemo(() => {
    return bookings.filter(b => b.customerId === user?.id)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [bookings, user]);

  const handleCancel = async (bookingId) => {
    if (window.confirm('Bạn có chắc chắn muốn hủy đặt phòng này?')) {
      await cancelBooking(bookingId);
      // In a real app, you might want to refresh data or show a toast here
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
      <h2 className="page-title mb-4">Lịch sử Đặt phòng</h2>

      {successMessage && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <strong>Thành công!</strong> {successMessage}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}

      <Card className="hotel-card border-0">
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table hover className="align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="ps-4">Mã ĐP</th>
                  <th>Phòng</th>
                  <th>Ngày nhận / trả</th>
                  <th>Số lượng</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                  <th className="text-end pe-4">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {myBookings.length > 0 ? myBookings.map(booking => {
                  const room = rooms.find(r => r.id === booking.roomId);
                  return (
                    <tr key={booking.id}>
                      <td className="ps-4 fw-bold">{booking.id}</td>
                      <td>
                        <div className="fw-medium text-navy">{room?.type || booking.roomId}</div>
                        <small className="text-muted">Phòng {room?.number}</small>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <FaCalendarAlt className="text-muted me-2" size={12} />
                          <span>{formatDate(booking.checkIn)}</span>
                        </div>
                        <small className="text-muted ms-3">đến {formatDate(booking.checkOut)}</small>
                      </td>
                      <td>
                        <div>{booking.nights} đêm</div>
                        <small className="text-muted">{booking.adults} NL, {booking.children} TE</small>
                      </td>
                      <td className="fw-medium text-gold">{formatCurrency(booking.total)}</td>
                      <td>{getStatusBadge(booking.status)}</td>
                      <td className="text-end pe-4">
                        <div className="d-flex justify-content-end gap-2">
                          <Button as={Link} to={`/bookings/${booking.id}`} variant="outline-info" size="sm">
                            <FaEye /> Chi tiết
                          </Button>
                          {booking.status === 'Confirmed' && (
                            <Button 
                              variant="outline-danger" 
                              size="sm" 
                              onClick={() => handleCancel(booking.id)}
                              disabled={loading}
                            >
                              <FaTimes /> Hủy
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                }) : (
                  <tr>
                    <td colSpan="7" className="text-center py-5">
                      <div className="text-muted mb-3">
                        <FaHistory size={40} className="opacity-50" />
                      </div>
                      <h5 className="text-muted">Bạn chưa có đặt phòng nào</h5>
                      <Button as={Link} to="/rooms" variant="gold" className="mt-2 btn-gold">
                        Đặt phòng ngay
                      </Button>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default BookingHistoryPage;

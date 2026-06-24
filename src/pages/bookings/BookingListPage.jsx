import { useState, useMemo } from 'react';
import { Card, Table, Button, Badge, Form, InputGroup, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaPlus, FaSearch, FaEye, FaEdit, FaTimes, FaEllipsisV, FaCheck } from 'react-icons/fa';
import { useApp } from '../../contexts/AppContext';
import useBooking from '../../hooks/useBooking';
import { formatDate } from '../../utils/dateUtils';
import { formatCurrency } from '../../utils/formatters';

const BookingListPage = () => {
  const { bookings, updateBooking } = useApp();
  const { cancelBooking } = useBooking();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const processedBookings = useMemo(() => {
    return bookings.filter(booking => {
      const matchSearch = booking.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          booking.roomId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === 'all' || booking.status === statusFilter;
      return matchSearch && matchStatus;
    }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [bookings, searchTerm, statusFilter]);

  const handleUpdateStatus = (booking, newStatus) => {
    updateBooking({ ...booking, status: newStatus });
  };

  const handleCancel = async (bookingId) => {
    if (window.confirm('Bạn có chắc chắn muốn hủy đặt phòng này?')) {
      await cancelBooking(bookingId);
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="page-title mb-0">Quản lý Đặt phòng</h2>
        <Button as={Link} to="/bookings/new" variant="gold" className="btn-gold">
          <FaPlus className="me-2" /> Tạo đặt phòng
        </Button>
      </div>

      <Card className="hotel-card border-0 mb-4 bg-white">
        <Card.Body>
          <div className="d-flex flex-wrap gap-3">
            <div className="flex-grow-1" style={{ minWidth: '250px' }}>
              <InputGroup>
                <InputGroup.Text className="bg-light border-end-0"><FaSearch className="text-muted" /></InputGroup.Text>
                <Form.Control
                  placeholder="Tìm kiếm theo mã ĐP, tên khách, số phòng..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-start-0 ps-0 bg-light"
                />
              </InputGroup>
            </div>
            <div style={{ minWidth: '200px' }}>
              <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="all">Tất cả trạng thái</option>
                <option value="Confirmed">Đã xác nhận</option>
                <option value="Checked-in">Đã Check-in</option>
                <option value="Completed">Đã hoàn thành</option>
                <option value="Cancelled">Đã hủy</option>
              </Form.Select>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Card className="hotel-card border-0">
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table hover className="align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="ps-4">Mã ĐP</th>
                  <th>Khách hàng</th>
                  <th>Phòng</th>
                  <th>Check-in / Out</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                  <th className="text-end pe-4">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {processedBookings.length > 0 ? processedBookings.map(booking => (
                  <tr key={booking.id}>
                    <td className="ps-4 fw-bold text-navy">{booking.id}</td>
                    <td>{booking.customerName}</td>
                    <td>
                      <Badge bg="light" text="dark" className="border border-secondary">
                        {booking.roomId}
                      </Badge>
                    </td>
                    <td>
                      <div>{formatDate(booking.checkIn)}</div>
                      <small className="text-muted">đến {formatDate(booking.checkOut)}</small>
                    </td>
                    <td className="fw-medium text-gold">{formatCurrency(booking.total)}</td>
                    <td>{getStatusBadge(booking.status)}</td>
                    <td className="text-end pe-4">
                      <Dropdown align="end">
                        <Dropdown.Toggle variant="light" size="sm" className="btn-icon">
                          <FaEllipsisV className="text-muted" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="shadow border-0">
                          <Dropdown.Item as={Link} to={`/bookings/${booking.id}`}>
                            <FaEye className="me-2 text-info" /> Xem chi tiết
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          
                          {booking.status === 'Confirmed' && (
                            <Dropdown.Item onClick={() => handleUpdateStatus(booking, 'Checked-in')}>
                              <FaCheck className="me-2 text-warning" /> Check-in
                            </Dropdown.Item>
                          )}
                          
                          {booking.status === 'Checked-in' && (
                            <Dropdown.Item onClick={() => handleUpdateStatus(booking, 'Completed')}>
                              <FaCheck className="me-2 text-success" /> Check-out (Hoàn thành)
                            </Dropdown.Item>
                          )}
                          
                          {['Confirmed', 'Checked-in'].includes(booking.status) && (
                            <>
                              <Dropdown.Item as={Link} to={`/bookings/${booking.id}/edit`}>
                                <FaEdit className="me-2 text-primary" /> Chỉnh sửa
                              </Dropdown.Item>
                              <Dropdown.Item onClick={() => handleCancel(booking.id)} className="text-danger">
                                <FaTimes className="me-2" /> Hủy đặt phòng
                              </Dropdown.Item>
                            </>
                          )}
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="7" className="text-center py-5 text-muted">
                      Không tìm thấy dữ liệu
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
          <div className="p-3 border-top text-muted small">
            Hiển thị {processedBookings.length} đặt phòng
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default BookingListPage;

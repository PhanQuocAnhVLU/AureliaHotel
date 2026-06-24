import { useMemo } from 'react';
import { Row, Col, Card, Table, Badge } from 'react-bootstrap';
import { FaBed, FaMoneyBillWave, FaTools, FaStar } from 'react-icons/fa';
import { useApp } from '../../contexts/AppContext';
import { calculateOccupancy, calculateRevenue, flagMaintenanceRooms } from '../../utils/algorithms';
import { formatCurrency, formatDate } from '../../utils/formatters';
import StatsCard from '../../components/common/StatsCard';

const ManagerDashboard = () => {
  const { rooms, bookings, employees } = useApp();

  const stats = useMemo(() => {
    const occupancy = calculateOccupancy(rooms);
    const todayRevenue = calculateRevenue(bookings, 'today');
    const monthRevenue = calculateRevenue(bookings, 'month');
    
    return {
      todayRevenue: todayRevenue.total,
      monthRevenue: monthRevenue.total,
      occupancyRate: occupancy.rate,
      cleaningRooms: occupancy.cleaning,
      maintenanceRooms: occupancy.maintenance
    };
  }, [rooms, bookings]);

  const maintenanceAlerts = useMemo(() => {
    return flagMaintenanceRooms(rooms).slice(0, 5);
  }, [rooms]);

  const recentBookings = useMemo(() => {
    return [...bookings]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  }, [bookings]);

  return (
    <div>
      <h2 className="page-title mb-4">Dashboard Quản lý</h2>

      <Row className="g-4 mb-4">
        <Col md={6} xl={3}>
          <StatsCard 
            title="Doanh thu hôm nay" 
            value={formatCurrency(stats.todayRevenue)}
            icon={<FaMoneyBillWave />}
            color="success"
          />
        </Col>
        <Col md={6} xl={3}>
          <StatsCard 
            title="Doanh thu tháng này" 
            value={formatCurrency(stats.monthRevenue)}
            icon={<FaMoneyBillWave />}
            color="primary"
          />
        </Col>
        <Col md={6} xl={3}>
          <StatsCard 
            title="Công suất phòng" 
            value={`${stats.occupancyRate}%`}
            icon={<FaBed />}
            color="info"
          />
        </Col>
        <Col md={6} xl={3}>
          <StatsCard 
            title="Phòng dọn/Bảo trì" 
            value={`${stats.cleaningRooms} / ${stats.maintenanceRooms}`}
            icon={<FaTools />}
            color="warning"
          />
        </Col>
      </Row>

      <Row className="g-4">
        <Col lg={7}>
          <Card className="hotel-card border-0 h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0 fw-bold">Đặt phòng gần đây</h5>
              </div>
              <div className="table-responsive">
                <Table hover className="align-middle">
                  <thead>
                    <tr>
                      <th>Mã ĐP</th>
                      <th>Khách hàng</th>
                      <th>Phòng</th>
                      <th>Check-in</th>
                      <th>Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map(booking => (
                      <tr key={booking.id}>
                        <td className="fw-medium text-navy">{booking.id}</td>
                        <td>{booking.customerName}</td>
                        <td>
                          <span className="badge bg-light text-dark border">
                            {booking.roomId}
                          </span>
                        </td>
                        <td>{formatDate(booking.checkIn)}</td>
                        <td>
                          <Badge bg={
                            booking.status === 'Confirmed' ? 'primary' :
                            booking.status === 'Checked-in' ? 'warning' :
                            booking.status === 'Completed' ? 'success' : 'secondary'
                          }>
                            {booking.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={5}>
          <Card className="hotel-card border-0 h-100">
            <Card.Body>
              <h5 className="mb-4 fw-bold">Cảnh báo bảo trì phòng</h5>
              {maintenanceAlerts.length > 0 ? (
                <div className="d-flex flex-column gap-3">
                  {maintenanceAlerts.map(room => (
                    <div key={room.id} className="d-flex align-items-center p-3 border rounded">
                      <div className={`rounded-circle p-2 bg-${room.maintenanceUrgency === 'high' ? 'danger' : 'warning'} bg-opacity-10 text-${room.maintenanceUrgency === 'high' ? 'danger' : 'warning'} me-3`}>
                        <FaTools />
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1 fw-bold">Phòng {room.number} ({room.type})</h6>
                        <small className="text-muted">
                          Chưa bảo trì {room.daysSinceMaintenance} ngày
                        </small>
                      </div>
                      <div className="text-end">
                        <Badge bg={room.rating < 4 ? 'danger' : 'warning'}>
                          <FaStar className="me-1" /> {room.rating}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted text-center my-5">Không có phòng nào cần bảo trì gấp.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ManagerDashboard;

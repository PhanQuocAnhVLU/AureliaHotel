import { useMemo } from 'react';
import { Row, Col, Card, Table, Badge, Button } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt, FaCalendarCheck, FaKey } from 'react-icons/fa';
import { useApp } from '../../contexts/AppContext';
import { getTodayString, formatDate } from '../../utils/dateUtils';
import StatsCard from '../../components/common/StatsCard';

const ReceptionistDashboard = () => {
  const { rooms, bookings } = useApp();
  const today = getTodayString();

  const data = useMemo(() => {
    const todayArrivals = bookings.filter(b => b.checkIn === today && b.status === 'Confirmed');
    const todayDepartures = bookings.filter(b => b.checkOut === today && b.status === 'Checked-in');
    const inHouse = bookings.filter(b => b.status === 'Checked-in');
    
    const availableRooms = rooms.filter(r => r.status === 'Available').length;
    const cleaningRooms = rooms.filter(r => r.status === 'Cleaning').length;

    return {
      arrivals: todayArrivals,
      departures: todayDepartures,
      inHouseCount: inHouse.length,
      availableCount: availableRooms,
      cleaningCount: cleaningRooms
    };
  }, [rooms, bookings, today]);

  return (
    <div>
      <h2 className="page-title mb-4">Dashboard Lễ tân</h2>

      <Row className="g-4 mb-4">
        <Col md={6} xl={3}>
          <StatsCard 
            title="Khách đến hôm nay" 
            value={data.arrivals.length}
            icon={<FaSignInAlt />}
            color="primary"
          />
        </Col>
        <Col md={6} xl={3}>
          <StatsCard 
            title="Khách đi hôm nay" 
            value={data.departures.length}
            icon={<FaSignOutAlt />}
            color="warning"
          />
        </Col>
        <Col md={6} xl={3}>
          <StatsCard 
            title="Phòng đang lưu trú" 
            value={data.inHouseCount}
            icon={<FaCalendarCheck />}
            color="success"
          />
        </Col>
        <Col md={6} xl={3}>
          <StatsCard 
            title="Phòng trống / Đang dọn" 
            value={`${data.availableCount} / ${data.cleaningCount}`}
            icon={<FaKey />}
            color="info"
          />
        </Col>
      </Row>

      <Row className="g-4">
        <Col lg={6}>
          <Card className="hotel-card border-0 h-100">
            <Card.Body>
              <h5 className="mb-4 fw-bold d-flex justify-content-between align-items-center">
                <span>Khách đến dự kiến (Arrivals)</span>
                <Badge bg="primary">{data.arrivals.length}</Badge>
              </h5>
              
              <div className="table-responsive">
                <Table hover className="align-middle">
                  <thead>
                    <tr>
                      <th>Khách hàng</th>
                      <th>Phòng</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.arrivals.length > 0 ? data.arrivals.map(booking => (
                      <tr key={booking.id}>
                        <td>
                          <div className="fw-medium">{booking.customerName}</div>
                          <small className="text-muted">{booking.id}</small>
                        </td>
                        <td><Badge bg="light" text="dark">{booking.roomId}</Badge></td>
                        <td>
                          <Button variant="outline-primary" size="sm">Check-in</Button>
                        </td>
                      </tr>
                    )) : (
                      <tr><td colSpan="3" className="text-center text-muted py-4">Không có khách đến dự kiến</td></tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={6}>
          <Card className="hotel-card border-0 h-100">
            <Card.Body>
              <h5 className="mb-4 fw-bold d-flex justify-content-between align-items-center">
                <span>Khách đi dự kiến (Departures)</span>
                <Badge bg="warning">{data.departures.length}</Badge>
              </h5>
              
              <div className="table-responsive">
                <Table hover className="align-middle">
                  <thead>
                    <tr>
                      <th>Khách hàng</th>
                      <th>Phòng</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.departures.length > 0 ? data.departures.map(booking => (
                      <tr key={booking.id}>
                        <td>
                          <div className="fw-medium">{booking.customerName}</div>
                          <small className="text-muted">{booking.id}</small>
                        </td>
                        <td><Badge bg="light" text="dark">{booking.roomId}</Badge></td>
                        <td>
                          <Button variant="outline-warning" size="sm">Check-out</Button>
                        </td>
                      </tr>
                    )) : (
                      <tr><td colSpan="3" className="text-center text-muted py-4">Không có khách đi dự kiến</td></tr>
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

export default ReceptionistDashboard;

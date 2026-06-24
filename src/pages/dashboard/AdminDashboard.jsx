import { useMemo } from 'react';
import { Row, Col, Card, Badge } from 'react-bootstrap';
import { FaBed, FaUserFriends, FaMoneyBillWave, FaConciergeBell, FaChartLine, FaCalendarCheck } from 'react-icons/fa';
import { useApp } from '../../contexts/AppContext';
import { calculateOccupancy, calculateRevenue, generateMonthlyRevenue } from '../../utils/algorithms';
import { formatCurrency } from '../../utils/formatters';
import StatsCard from '../../components/common/StatsCard';
import RevenueChart from '../../components/charts/RevenueChart';
import OccupancyChart from '../../components/charts/OccupancyChart';
import { useAuth } from '../../contexts/AuthContext';

const AdminDashboard = () => {
  const { rooms, bookings, customers } = useApp();
  const { user } = useAuth();

  const stats = useMemo(() => {
    const occupancy = calculateOccupancy(rooms);
    const revenue = calculateRevenue(bookings, 'month');
    const confirmedBookings = bookings.filter(b => b.status === 'Confirmed').length;

    return {
      totalRevenue: revenue.total,
      occupancyRate: occupancy.rate,
      totalCustomers: customers.length,
      activeRooms: occupancy.occupied + occupancy.booked,
      totalRooms: occupancy.total,
      confirmedBookings,
    };
  }, [rooms, bookings, customers]);

  const monthlyData = useMemo(() => generateMonthlyRevenue(bookings), [bookings]);

  const recentBookings = useMemo(() =>
    [...bookings]
      .sort((a, b) => new Date(b.checkIn) - new Date(a.checkIn))
      .slice(0, 6),
    [bookings]
  );

  const statusColors = {
    Confirmed: { bg: 'rgba(16,185,129,0.12)', color: '#10B981' },
    'Checked-in': { bg: 'rgba(14,165,233,0.12)', color: '#0EA5E9' },
    Completed: { bg: 'rgba(100,116,139,0.12)', color: '#64748B' },
    Cancelled: { bg: 'rgba(239,68,68,0.12)', color: '#EF4444' },
    Pending: { bg: 'rgba(245,158,11,0.12)', color: '#F59E0B' },
  };

  return (
    <div>
      {/* Page Header */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold mb-1" style={{ color: 'var(--text-main)', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem' }}>
            Tổng quan hệ thống
          </h4>
          <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
            Xin chào, <strong style={{ color: 'var(--primary-color)' }}>{user?.name}</strong> — Hệ thống đang hoạt động bình thường.
          </p>
        </div>
        <div
          className="d-flex align-items-center gap-2 px-3 py-2 rounded-pill"
          style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}
        >
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }}></span>
          <span style={{ color: '#10B981', fontSize: '0.82rem', fontWeight: 600 }}>Hệ thống Online</span>
        </div>
      </div>

      {/* Stats Cards */}
      <Row className="g-3 mb-4">
        <Col xs={6} xl={3}>
          <StatsCard
            title="Doanh thu tháng này"
            value={formatCurrency(stats.totalRevenue)}
            icon={<FaMoneyBillWave />}
            color="success"
            trend="up"
            trendValue={12.5}
          />
        </Col>
        <Col xs={6} xl={3}>
          <StatsCard
            title="Công suất phòng"
            value={`${stats.occupancyRate}%`}
            icon={<FaBed />}
            color="primary"
            trend="up"
            trendValue={5.2}
          />
        </Col>
        <Col xs={6} xl={3}>
          <StatsCard
            title="Tổng khách hàng"
            value={stats.totalCustomers}
            icon={<FaUserFriends />}
            color="warning"
            trend="up"
            trendValue={8.4}
          />
        </Col>
        <Col xs={6} xl={3}>
          <StatsCard
            title="Phòng đang sử dụng"
            value={`${stats.activeRooms} / ${stats.totalRooms}`}
            icon={<FaConciergeBell />}
            color="info"
            subtitle="Phòng đang có khách"
          />
        </Col>
      </Row>

      {/* Charts */}
      <Row className="g-3 mb-4">
        <Col lg={8}>
          <Card className="border-0 h-100" style={{ borderRadius: 'var(--radius-lg)', boxShadow: '0 4px 24px rgba(15,23,42,0.07)' }}>
            <Card.Body className="p-4">
              <div className="d-flex align-items-center mb-4">
                <div
                  className="me-3 d-flex align-items-center justify-content-center"
                  style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(197,160,89,0.12)', color: 'var(--primary-color)' }}
                >
                  <FaChartLine />
                </div>
                <div>
                  <h6 className="fw-bold mb-0">Biểu đồ doanh thu</h6>
                  <p className="text-muted mb-0" style={{ fontSize: '0.8rem' }}>12 tháng gần nhất</p>
                </div>
              </div>
              <RevenueChart data={monthlyData} />
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="border-0 h-100" style={{ borderRadius: 'var(--radius-lg)', boxShadow: '0 4px 24px rgba(15,23,42,0.07)' }}>
            <Card.Body className="p-4">
              <div className="d-flex align-items-center mb-4">
                <div
                  className="me-3 d-flex align-items-center justify-content-center"
                  style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(14,165,233,0.12)', color: '#0EA5E9' }}
                >
                  <FaBed />
                </div>
                <div>
                  <h6 className="fw-bold mb-0">Trạng thái phòng</h6>
                  <p className="text-muted mb-0" style={{ fontSize: '0.8rem' }}>Hiện tại</p>
                </div>
              </div>
              <OccupancyChart rooms={rooms} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Bookings Table */}
      <Card className="border-0" style={{ borderRadius: 'var(--radius-lg)', boxShadow: '0 4px 24px rgba(15,23,42,0.07)' }}>
        <Card.Body className="p-4">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div className="d-flex align-items-center">
              <div
                className="me-3 d-flex align-items-center justify-content-center"
                style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(197,160,89,0.12)', color: 'var(--primary-color)' }}
              >
                <FaCalendarCheck />
              </div>
              <div>
                <h6 className="fw-bold mb-0">Đặt phòng gần đây</h6>
                <p className="text-muted mb-0" style={{ fontSize: '0.8rem' }}>6 giao dịch mới nhất</p>
              </div>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(0,0,0,0.06)' }}>
                  <th className="text-muted fw-medium pb-3 ps-0" style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Mã ĐP</th>
                  <th className="text-muted fw-medium pb-3" style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Khách hàng</th>
                  <th className="text-muted fw-medium pb-3" style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Phòng</th>
                  <th className="text-muted fw-medium pb-3" style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Nhận phòng</th>
                  <th className="text-muted fw-medium pb-3" style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tổng tiền</th>
                  <th className="text-muted fw-medium pb-3" style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => {
                  const room = rooms.find(r => r.id === booking.roomId);
                  const customer = customers.find(c => c.id === booking.customerId);
                  const sc = statusColors[booking.status] || { bg: '#f1f5f9', color: '#64748b' };
                  return (
                    <tr key={booking.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                      <td className="ps-0 py-3">
                        <span className="fw-bold text-muted" style={{ fontSize: '0.82rem' }}>#{booking.id}</span>
                      </td>
                      <td className="py-3">
                        <div className="fw-medium">{customer?.name || 'Khách'}</div>
                        <div className="text-muted" style={{ fontSize: '0.78rem' }}>{customer?.email || ''}</div>
                      </td>
                      <td className="py-3">
                        <span className="fw-medium">{room?.number || '—'}</span>
                        <span className="text-muted ms-1" style={{ fontSize: '0.8rem' }}>({room?.type})</span>
                      </td>
                      <td className="py-3 text-muted" style={{ fontSize: '0.85rem' }}>{booking.checkIn}</td>
                      <td className="py-3">
                        <span className="fw-bold" style={{ color: 'var(--primary-color)' }}>{formatCurrency(booking.total)}</span>
                      </td>
                      <td className="py-3">
                        <span
                          className="px-3 py-1 rounded-pill fw-medium"
                          style={{ background: sc.bg, color: sc.color, fontSize: '0.78rem' }}
                        >
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AdminDashboard;

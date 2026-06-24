import { useMemo } from 'react';
import { Row, Col, Card, Table, Badge } from 'react-bootstrap';
import { FaChartBar, FaCalendarAlt, FaDownload, FaMoneyBillWave, FaBed, FaConciergeBell } from 'react-icons/fa';
import { useApp } from '../../contexts/AppContext';
import { generateMonthlyRevenue, calculateRevenue } from '../../utils/algorithms';
import { formatCurrency } from '../../utils/formatters';
import RevenueChart from '../../components/charts/RevenueChart';

const RevenueReportPage = () => {
  const { bookings } = useApp();

  const monthlyData = useMemo(() => generateMonthlyRevenue(bookings), [bookings]);

  const stats = useMemo(() => {
    const month = calculateRevenue(bookings, 'month');
    const year = calculateRevenue(bookings, 'year');
    
    return { month, year };
  }, [bookings]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="page-title mb-0">Báo cáo Doanh thu</h2>
        <button className="btn btn-outline-primary d-flex align-items-center">
          <FaDownload className="me-2" /> Xuất báo cáo PDF
        </button>
      </div>

      <Row className="g-4 mb-4">
        <Col md={4}>
          <Card className="hotel-card border-0 bg-primary text-white h-100">
            <Card.Body className="p-4 position-relative overflow-hidden">
              <FaMoneyBillWave className="position-absolute end-0 bottom-0 text-white opacity-25" style={{ fontSize: '100px', transform: 'translate(20%, 20%)' }} />
              <h5 className="mb-1 text-white-50">Tổng doanh thu năm nay</h5>
              <h2 className="fw-bold mb-3">{formatCurrency(stats.year.total)}</h2>
              <div className="d-flex justify-content-between text-white-50 small">
                <span>Tiền phòng: {formatCurrency(stats.year.roomRevenue)}</span>
                <span>Dịch vụ: {formatCurrency(stats.year.servicesRevenue)}</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="hotel-card border-0 bg-success text-white h-100">
            <Card.Body className="p-4 position-relative overflow-hidden">
              <FaCalendarAlt className="position-absolute end-0 bottom-0 text-white opacity-25" style={{ fontSize: '100px', transform: 'translate(20%, 20%)' }} />
              <h5 className="mb-1 text-white-50">Doanh thu tháng này</h5>
              <h2 className="fw-bold mb-3">{formatCurrency(stats.month.total)}</h2>
              <div className="d-flex align-items-center">
                <Badge bg="white" text="success" className="me-2">↑ 12.5%</Badge>
                <span className="text-white-50 small">so với tháng trước</span>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="hotel-card border-0 bg-info text-white h-100">
            <Card.Body className="p-4 position-relative overflow-hidden">
              <FaChartBar className="position-absolute end-0 bottom-0 text-white opacity-25" style={{ fontSize: '100px', transform: 'translate(20%, 20%)' }} />
              <h5 className="mb-1 text-white-50">Tổng lượt đặt phòng (Năm)</h5>
              <h2 className="fw-bold mb-3">{stats.year.bookingCount} lượt</h2>
              <div className="d-flex align-items-center">
                <Badge bg="white" text="info" className="me-2">↑ 5.2%</Badge>
                <span className="text-white-50 small">so với năm ngoái</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="hotel-card border-0 mb-4">
        <Card.Body className="p-4">
          <h5 className="fw-bold mb-4">Biểu đồ Doanh thu các tháng (Năm nay)</h5>
          <RevenueChart data={monthlyData} />
        </Card.Body>
      </Card>

      <Card className="hotel-card border-0">
        <Card.Body className="p-4">
          <h5 className="fw-bold mb-4">Bảng chi tiết Doanh thu</h5>
          <div className="table-responsive">
            <Table hover className="align-middle border-top">
              <thead className="bg-light">
                <tr>
                  <th>Tháng</th>
                  <th>Số lượt đặt phòng</th>
                  <th className="text-end">Doanh thu Phòng</th>
                  <th className="text-end">Doanh thu Dịch vụ</th>
                  <th className="text-end">Tổng Doanh thu</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((data, idx) => (
                  <tr key={idx}>
                    <td className="fw-bold">{data.month}</td>
                    <td>{data.bookings || '-'}</td>
                    <td className="text-end">{formatCurrency(data.roomRevenue)}</td>
                    <td className="text-end">{formatCurrency(data.serviceRevenue)}</td>
                    <td className="text-end fw-bold text-gold">{formatCurrency(data.total)}</td>
                  </tr>
                ))}
                <tr className="bg-light">
                  <td className="fw-bold">TỔNG CỘNG</td>
                  <td className="fw-bold">{monthlyData.reduce((sum, d) => sum + d.bookings, 0)}</td>
                  <td className="text-end fw-bold">{formatCurrency(monthlyData.reduce((sum, d) => sum + d.roomRevenue, 0))}</td>
                  <td className="text-end fw-bold">{formatCurrency(monthlyData.reduce((sum, d) => sum + d.serviceRevenue, 0))}</td>
                  <td className="text-end fw-bold text-gold fs-5">{formatCurrency(monthlyData.reduce((sum, d) => sum + d.total, 0))}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default RevenueReportPage;

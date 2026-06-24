import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, Row, Col, Badge, Button, Table } from 'react-bootstrap';
import { FaArrowLeft, FaPrint, FaDownload, FaEnvelope } from 'react-icons/fa';
import { useApp } from '../../contexts/AppContext';
import { formatCurrency, formatDate } from '../../utils/formatters';

const InvoiceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { invoices, customers, rooms } = useApp();
  
  const [invoice, setInvoice] = useState(null);
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const foundInvoice = invoices.find(i => i.id === id);
    if (foundInvoice) {
      setInvoice(foundInvoice);
      setCustomer(customers.find(c => c.id === foundInvoice.customerId));
    } else {
      navigate('/invoices');
    }
  }, [id, invoices, customers, navigate]);

  if (!invoice || !customer) return <div className="p-5 text-center">Đang tải...</div>;

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center">
          <Button variant="link" as={Link} to="/invoices" className="text-decoration-none text-muted p-0 me-3">
            <FaArrowLeft size={20} />
          </Button>
          <h2 className="page-title mb-0">Chi tiết Hóa đơn</h2>
        </div>
        <div className="d-flex gap-2">
          <Button variant="outline-primary"><FaEnvelope className="me-2" /> Gửi Email</Button>
          <Button variant="outline-success"><FaDownload className="me-2" /> Tải PDF</Button>
          <Button variant="secondary"><FaPrint className="me-2" /> In Hóa đơn</Button>
        </div>
      </div>

      <Card className="hotel-card border-0 invoice-container" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <Card.Body className="p-5">
          {/* Header */}
          <div className="d-flex justify-content-between border-bottom pb-4 mb-4">
            <div>
              <h2 className="fw-bold text-navy mb-1">LUXURY<span className="text-gold">HOTEL</span></h2>
              <p className="text-muted mb-0">123 Nguyễn Huệ, Quận 1, TP.HCM</p>
              <p className="text-muted mb-0">Hotline: +84 123 456 789</p>
              <p className="text-muted mb-0">Email: info@aureliagrand.vn</p>
            </div>
            <div className="text-end">
              <h1 className="fw-bold text-gold mb-3">HÓA ĐƠN</h1>
              <p className="mb-1"><span className="text-muted me-2">Số HĐ:</span> <strong>{invoice.id}</strong></p>
              <p className="mb-1"><span className="text-muted me-2">Ngày lập:</span> <strong>{formatDate(invoice.issuedAt)}</strong></p>
              <p className="mb-0"><span className="text-muted me-2">Mã Đặt phòng:</span> <strong>{invoice.bookingId}</strong></p>
            </div>
          </div>

          {/* Customer & Booking Info */}
          <Row className="mb-5">
            <Col sm={6}>
              <h6 className="fw-bold text-navy mb-3 text-uppercase">Khách hàng</h6>
              <p className="mb-1 fw-bold">{customer.name}</p>
              <p className="mb-1">{customer.address || 'N/A'}</p>
              <p className="mb-1">{customer.phone}</p>
              <p className="mb-0">{customer.email}</p>
            </Col>
            <Col sm={6} className="text-end">
              <h6 className="fw-bold text-navy mb-3 text-uppercase">Thông tin Lưu trú</h6>
              <p className="mb-1"><span className="text-muted me-2">Loại phòng:</span> <strong>{invoice.roomType} (Phòng {invoice.roomNumber})</strong></p>
              <p className="mb-1"><span className="text-muted me-2">Check-in:</span> <strong>{formatDate(invoice.checkIn)}</strong></p>
              <p className="mb-1"><span className="text-muted me-2">Check-out:</span> <strong>{formatDate(invoice.checkOut)}</strong></p>
              <p className="mb-0"><span className="text-muted me-2">Số đêm:</span> <strong>{invoice.nights} đêm</strong></p>
            </Col>
          </Row>

          {/* Items */}
          <Table className="mb-5 border-top">
            <thead className="bg-light">
              <tr>
                <th>Hạng mục</th>
                <th className="text-center">Số lượng</th>
                <th className="text-end">Đơn giá</th>
                <th className="text-end">Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {/* Room Charge */}
              <tr>
                <td>
                  <div className="fw-bold">Tiền phòng ({invoice.roomType})</div>
                  <small className="text-muted">{formatDate(invoice.checkIn)} - {formatDate(invoice.checkOut)}</small>
                </td>
                <td className="text-center align-middle">{invoice.nights}</td>
                <td className="text-end align-middle">{formatCurrency(invoice.roomCharge / invoice.nights)}</td>
                <td className="text-end align-middle fw-medium">{formatCurrency(invoice.roomCharge)}</td>
              </tr>
              
              {/* Services */}
              {invoice.services && invoice.services.map((service, idx) => (
                <tr key={idx}>
                  <td className="align-middle">Dịch vụ: {service.name}</td>
                  <td className="text-center align-middle">1</td>
                  <td className="text-end align-middle">{formatCurrency(service.amount)}</td>
                  <td className="text-end align-middle fw-medium">{formatCurrency(service.amount)}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Totals */}
          <Row>
            <Col sm={6}>
              <div className="bg-light p-4 rounded mb-4">
                <h6 className="fw-bold mb-3">Thông tin Thanh toán</h6>
                <p className="mb-1"><span className="text-muted">Phương thức:</span> <strong>{invoice.paymentMethod || 'N/A'}</strong></p>
                <p className="mb-0">
                  <span className="text-muted me-2">Trạng thái:</span> 
                  <Badge bg={invoice.status === 'Paid' ? 'success' : invoice.status === 'Partial' ? 'warning' : 'danger'}>
                    {invoice.status === 'Paid' ? 'Đã thanh toán đủ' : invoice.status === 'Partial' ? 'Thanh toán một phần' : 'Chưa thanh toán'}
                  </Badge>
                </p>
              </div>
            </Col>
            <Col sm={6}>
              <Table borderless className="text-end">
                <tbody>
                  <tr>
                    <td className="text-muted">Tổng phụ:</td>
                    <td className="fw-medium">{formatCurrency(invoice.roomCharge + invoice.servicesTotal)}</td>
                  </tr>
                  <tr>
                    <td className="text-muted">Thuế & Phí (10%):</td>
                    <td className="fw-medium">{formatCurrency(invoice.tax)}</td>
                  </tr>
                  {invoice.discount > 0 && (
                    <tr>
                      <td className="text-muted">Chiết khấu:</td>
                      <td className="text-danger fw-medium">-{formatCurrency(invoice.discount)}</td>
                    </tr>
                  )}
                  <tr className="border-top border-dark border-2">
                    <td className="fw-bold pt-3 fs-5">Tổng cộng:</td>
                    <td className="fw-bold text-gold pt-3 fs-4">{formatCurrency(invoice.total)}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>

          {/* Footer */}
          <div className="text-center mt-5 pt-4 border-top text-muted">
            <p className="mb-1">Cảm ơn quý khách đã sử dụng dịch vụ của AURELIA GRAND HOTEL!</p>
            <p className="small mb-0">Hóa đơn này có giá trị xác nhận dịch vụ. Mọi thắc mắc xin liên hệ Lễ tân.</p>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default InvoiceDetailPage;

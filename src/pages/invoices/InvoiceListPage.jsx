import { useState, useMemo } from 'react';
import { Card, Table, Badge, Form, InputGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaSearch, FaEye, FaPrint } from 'react-icons/fa';
import { useApp } from '../../contexts/AppContext';
import { formatCurrency, formatDate } from '../../utils/formatters';

const InvoiceListPage = () => {
  const { invoices } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const processedInvoices = useMemo(() => {
    return invoices.filter(invoice => {
      const matchSearch = invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          invoice.bookingId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === 'all' || invoice.status === statusFilter;
      return matchSearch && matchStatus;
    }).sort((a, b) => new Date(b.issuedAt) - new Date(a.issuedAt));
  }, [invoices, searchTerm, statusFilter]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Paid': return <Badge bg="success">Đã thanh toán</Badge>;
      case 'Partial': return <Badge bg="warning" className="text-dark">Thanh toán một phần</Badge>;
      case 'Unpaid': return <Badge bg="danger">Chưa thanh toán</Badge>;
      default: return <Badge bg="secondary">{status}</Badge>;
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="page-title mb-0">Quản lý Hóa đơn</h2>
      </div>

      <Card className="hotel-card border-0 mb-4 bg-white">
        <Card.Body>
          <div className="d-flex flex-wrap gap-3">
            <div className="flex-grow-1" style={{ minWidth: '250px' }}>
              <InputGroup>
                <InputGroup.Text className="bg-light border-end-0"><FaSearch className="text-muted" /></InputGroup.Text>
                <Form.Control
                  placeholder="Tìm kiếm theo mã HĐ, mã ĐP, tên khách..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-start-0 ps-0 bg-light"
                />
              </InputGroup>
            </div>
            <div style={{ minWidth: '200px' }}>
              <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="all">Tất cả trạng thái</option>
                <option value="Paid">Đã thanh toán</option>
                <option value="Partial">Thanh toán một phần</option>
                <option value="Unpaid">Chưa thanh toán</option>
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
                  <th className="ps-4">Mã HĐ / ĐP</th>
                  <th>Khách hàng</th>
                  <th>Ngày lập</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                  <th className="text-end pe-4">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {processedInvoices.length > 0 ? processedInvoices.map(invoice => (
                  <tr key={invoice.id}>
                    <td className="ps-4">
                      <div className="fw-bold text-navy">{invoice.id}</div>
                      <small className="text-muted">ĐP: {invoice.bookingId}</small>
                    </td>
                    <td>{invoice.customerName}</td>
                    <td>{formatDate(invoice.issuedAt)}</td>
                    <td className="fw-bold text-gold">{formatCurrency(invoice.total)}</td>
                    <td>{getStatusBadge(invoice.status)}</td>
                    <td className="text-end pe-4">
                      <div className="d-flex justify-content-end gap-2">
                        <Button as={Link} to={`/invoices/${invoice.id}`} variant="outline-info" size="sm">
                          <FaEye />
                        </Button>
                        <Button variant="outline-secondary" size="sm">
                          <FaPrint />
                        </Button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="6" className="text-center py-5 text-muted">
                      Không tìm thấy dữ liệu
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
          <div className="p-3 border-top text-muted small">
            Hiển thị {processedInvoices.length} hóa đơn
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default InvoiceListPage;

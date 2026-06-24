import { useState, useMemo } from 'react';
import { Card, Table, Badge, Form, InputGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaSearch, FaEye, FaStar } from 'react-icons/fa';
import { useApp } from '../../contexts/AppContext';
import { formatCurrency } from '../../utils/formatters';

const CustomerListPage = () => {
  const { customers } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState('all');

  const processedCustomers = useMemo(() => {
    return customers.filter(customer => {
      const matchSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          customer.phone.includes(searchTerm) ||
                          customer.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchTier = tierFilter === 'all' || customer.tier === tierFilter;
      return matchSearch && matchTier;
    }).sort((a, b) => b.totalSpent - a.totalSpent);
  }, [customers, searchTerm, tierFilter]);

  const getTierBadge = (tier) => {
    switch (tier) {
      case 'Platinum': return <Badge bg="dark" className="text-gold border border-gold">Platinum <FaStar size={10} className="mb-1" /></Badge>;
      case 'Gold': return <Badge bg="warning" className="text-dark">Gold</Badge>;
      case 'Silver': return <Badge bg="secondary">Silver</Badge>;
      default: return <Badge bg="light" text="dark" className="border">Member</Badge>;
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="page-title mb-0">Quản lý Khách hàng</h2>
      </div>

      <Card className="hotel-card border-0 mb-4 bg-white">
        <Card.Body>
          <div className="d-flex flex-wrap gap-3">
            <div className="flex-grow-1" style={{ minWidth: '250px' }}>
              <InputGroup>
                <InputGroup.Text className="bg-light border-end-0"><FaSearch className="text-muted" /></InputGroup.Text>
                <Form.Control
                  placeholder="Tìm kiếm theo tên, SĐT, email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-start-0 ps-0 bg-light"
                />
              </InputGroup>
            </div>
            <div style={{ minWidth: '200px' }}>
              <Form.Select value={tierFilter} onChange={(e) => setTierFilter(e.target.value)}>
                <option value="all">Tất cả hạng thành viên</option>
                <option value="Platinum">Platinum</option>
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
                <option value="Member">Member</option>
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
                  <th className="ps-4">Khách hàng</th>
                  <th>Liên hệ</th>
                  <th>Hạng thẻ</th>
                  <th>Số lần lưu trú</th>
                  <th>Tổng chi tiêu</th>
                  <th className="text-end pe-4">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {processedCustomers.length > 0 ? processedCustomers.map(customer => (
                  <tr key={customer.id}>
                    <td className="ps-4">
                      <div className="d-flex align-items-center">
                        <img src={customer.avatar} alt={customer.name} className="avatar me-3" />
                        <div>
                          <div className="fw-bold">{customer.name}</div>
                          {customer.isVIP && <Badge bg="danger" style={{ fontSize: '0.6rem' }}>VIP</Badge>}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>{customer.phone}</div>
                      <small className="text-muted">{customer.email}</small>
                    </td>
                    <td>{getTierBadge(customer.tier)}</td>
                    <td className="fw-medium text-center">{customer.totalStays}</td>
                    <td className="fw-bold text-gold">{formatCurrency(customer.totalSpent)}</td>
                    <td className="text-end pe-4">
                      <Button as={Link} to={`/customers/${customer.id}`} variant="outline-primary" size="sm">
                        <FaEye /> Chi tiết
                      </Button>
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
            Hiển thị {processedCustomers.length} khách hàng
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CustomerListPage;

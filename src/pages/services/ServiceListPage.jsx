import { useState } from 'react';
import { Card, Table, Badge, Form, InputGroup, Button, Row, Col } from 'react-bootstrap';
import { FaSearch, FaPlus, FaEdit, FaTrash, FaUtensils, FaSpa, FaSwimmingPool, FaDumbbell, FaTshirt, FaConciergeBell, FaCar } from 'react-icons/fa';
import { useApp } from '../../contexts/AppContext';
import { formatCurrency } from '../../utils/formatters';

const ServiceListPage = () => {
  const { services } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'FaUtensils': return <FaUtensils />;
      case 'FaSpa': return <FaSpa />;
      case 'FaSwimmingPool': return <FaSwimmingPool />;
      case 'FaDumbbell': return <FaDumbbell />;
      case 'FaTshirt': return <FaTshirt />;
      case 'FaBellConcierge': return <FaConciergeBell />;
      case 'FaCar': return <FaCar />;
      default: return <FaConciergeBell />;
    }
  };

  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="page-title mb-0">Quản lý Dịch vụ</h2>
        <Button variant="gold" className="btn-gold">
          <FaPlus className="me-2" /> Thêm dịch vụ
        </Button>
      </div>

      <Card className="hotel-card border-0 mb-4 bg-white">
        <Card.Body>
          <InputGroup style={{ maxWidth: '400px' }}>
            <InputGroup.Text className="bg-light border-end-0"><FaSearch className="text-muted" /></InputGroup.Text>
            <Form.Control
              placeholder="Tìm kiếm dịch vụ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-start-0 ps-0 bg-light"
            />
          </InputGroup>
        </Card.Body>
      </Card>

      <Row className="g-4 mb-4">
        {filteredServices.map(service => (
          <Col md={6} xl={4} key={service.id}>
            <Card className="hotel-card border-0 h-100 p-0 overflow-hidden">
              <div style={{ height: '200px', overflow: 'hidden' }}>
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="w-100 h-100" 
                  style={{ objectFit: 'cover' }} 
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800'; }}
                />
              </div>
              <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="d-flex align-items-center">
                    <div className="bg-light p-2 rounded text-primary me-3 fs-5">
                      {getIcon(service.icon)}
                    </div>
                    <h5 className="fw-bold mb-0 text-navy">{service.name}</h5>
                  </div>
                  <Badge bg={service.available ? 'success' : 'secondary'}>
                    {service.available ? 'Hoạt động' : 'Ngưng phục vụ'}
                  </Badge>
                </div>
                
                <p className="text-muted small mb-4 flex-grow-1">{service.description}</p>
                
                <div className="d-flex justify-content-between align-items-end pt-3 border-top mt-auto">
                  <div>
                    <span className="text-muted small d-block">Giá / {service.unit}</span>
                    <span className="price-tag fs-4">{formatCurrency(service.price)}</span>
                  </div>
                  <div className="d-flex gap-2">
                    <Button variant="outline-primary" size="sm" className="btn-icon">
                      <FaEdit />
                    </Button>
                    <Button variant="outline-danger" size="sm" className="btn-icon">
                      <FaTrash />
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ServiceListPage;

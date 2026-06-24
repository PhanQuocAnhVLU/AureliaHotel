import { useState } from 'react';
import { Card, Table, Form, Button, Modal, Row, Col } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus, FaSave } from 'react-icons/fa';
import { useApp } from '../../contexts/AppContext';

const ServiceManagePage = () => {
  const { services } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentService, setCurrentService] = useState({
    name: '', category: '', price: '', unit: '', description: '', available: true, icon: '', image: ''
  });

  const handleShow = (service = null) => {
    if (service) {
      setCurrentService(service);
      setIsEdit(true);
    } else {
      setCurrentService({
        name: '', category: '', price: '', unit: '', description: '', available: true, icon: 'FaBellConcierge', image: ''
      });
      setIsEdit(false);
    }
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate save logic
    handleClose();
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="page-title mb-0">Quản lý Dịch vụ & Tiện ích</h2>
        <Button variant="gold" className="btn-gold" onClick={() => handleShow()}>
          <FaPlus className="me-2" /> Thêm dịch vụ
        </Button>
      </div>

      <Card className="hotel-card border-0">
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table hover className="align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="ps-4">Mã DV</th>
                  <th>Tên dịch vụ</th>
                  <th>Danh mục</th>
                  <th>Đơn giá</th>
                  <th>Trạng thái</th>
                  <th className="text-end pe-4">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {services.map(service => (
                  <tr key={service.id}>
                    <td className="ps-4 fw-bold">{service.id}</td>
                    <td>{service.name}</td>
                    <td>{service.category}</td>
                    <td className="fw-medium text-gold">{service.price.toLocaleString('vi-VN')} VNĐ / {service.unit}</td>
                    <td>
                      <span className={`badge bg-${service.available ? 'success' : 'secondary'}`}>
                        {service.available ? 'Hoạt động' : 'Ngưng phục vụ'}
                      </span>
                    </td>
                    <td className="text-end pe-4">
                      <Button variant="outline-primary" size="sm" className="me-2 btn-icon" onClick={() => handleShow(service)}>
                        <FaEdit />
                      </Button>
                      <Button variant="outline-danger" size="sm" className="btn-icon">
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? 'Chỉnh sửa Dịch vụ' : 'Thêm Dịch vụ mới'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Tên dịch vụ</Form.Label>
                  <Form.Control type="text" value={currentService.name} onChange={(e) => setCurrentService({...currentService, name: e.target.value})} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Danh mục</Form.Label>
                  <Form.Select value={currentService.category} onChange={(e) => setCurrentService({...currentService, category: e.target.value})}>
                    <option value="Food & Beverage">Food & Beverage</option>
                    <option value="Wellness">Wellness</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Laundry">Laundry</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Đơn giá (VNĐ)</Form.Label>
                  <Form.Control type="number" value={currentService.price} onChange={(e) => setCurrentService({...currentService, price: e.target.value})} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Đơn vị tính (VD: lần, giờ, ngày)</Form.Label>
                  <Form.Control type="text" value={currentService.unit} onChange={(e) => setCurrentService({...currentService, unit: e.target.value})} required />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Hình ảnh (URL)</Form.Label>
                  <Form.Control type="text" value={currentService.image} onChange={(e) => setCurrentService({...currentService, image: e.target.value})} />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Mô tả</Form.Label>
                  <Form.Control as="textarea" rows={3} value={currentService.description} onChange={(e) => setCurrentService({...currentService, description: e.target.value})} />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Check 
                  type="switch"
                  id="available-switch"
                  label="Đang hoạt động"
                  checked={currentService.available}
                  onChange={(e) => setCurrentService({...currentService, available: e.target.checked})}
                />
              </Col>
            </Row>
            <div className="d-flex justify-content-end mt-4">
              <Button variant="secondary" onClick={handleClose} className="me-2">Hủy</Button>
              <Button variant="gold" type="submit" className="btn-gold"><FaSave className="me-2"/> Lưu dịch vụ</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ServiceManagePage;

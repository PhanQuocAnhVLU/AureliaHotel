import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import { useApp } from '../../contexts/AppContext';
import { validateRoomForm } from '../../utils/validators';
import { generateId } from '../../utils/formatters';

const RoomFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { rooms, addRoom, updateRoom } = useApp();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    number: '',
    type: 'Standard',
    floor: 1,
    capacity: 2,
    price: 800000,
    status: 'Available',
    description: '',
    area: 25,
    bedType: 'Double',
    amenities: 'Wi-Fi, TV, Điều hòa, Minibar', // Will parse to array on save
    images: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800' // Single image URL string
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      const room = rooms.find(r => r.id === id);
      if (room) {
        setFormData({
          number: room.number,
          type: room.type,
          floor: room.floor,
          capacity: room.capacity,
          price: room.price,
          status: room.status,
          description: room.description || '',
          area: room.area,
          bedType: room.bedType,
          amenities: Array.isArray(room.amenities) ? room.amenities.join(', ') : room.amenities,
          images: Array.isArray(room.images) ? room.images[0] : room.images
        });
      } else {
        navigate('/rooms/manage');
      }
    }
  }, [id, isEditMode, rooms, navigate]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let parsedValue = value;
    
    if (type === 'number') {
      parsedValue = value === '' ? '' : Number(value);
    }
    
    setFormData(prev => ({ ...prev, [name]: parsedValue }));
    
    // Clear error for field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate
    const validationErrors = validateRoomForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      // Process data before save
      const roomData = {
        ...formData,
        amenities: formData.amenities.split(',').map(item => item.trim()).filter(Boolean),
        images: [formData.images],
        // Preserve existing data for edit, or add defaults for new
        ...(isEditMode 
          ? { id, bookings: rooms.find(r => r.id === id)?.bookings || 0, revenue: rooms.find(r => r.id === id)?.revenue || 0, rating: rooms.find(r => r.id === id)?.rating || 0 } 
          : { id: generateId('R'), bookings: 0, revenue: 0, rating: 5, lastMaintenance: new Date().toISOString().split('T')[0] })
      };

      if (isEditMode) {
        updateRoom(roomData);
      } else {
        addRoom(roomData);
      }

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      navigate('/rooms/manage');
    } catch (err) {
      setErrors({ form: 'Có lỗi xảy ra, vui lòng thử lại.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="d-flex align-items-center mb-4">
        <Button variant="link" as={Link} to="/rooms/manage" className="text-decoration-none text-muted p-0 me-3">
          <FaArrowLeft size={20} />
        </Button>
        <h2 className="page-title mb-0">{isEditMode ? `Chỉnh sửa phòng ${formData.number}` : 'Thêm phòng mới'}</h2>
      </div>

      <Card className="hotel-card border-0">
        <Card.Body className="p-4 p-md-5">
          {errors.form && <Alert variant="danger">{errors.form}</Alert>}

          <Form onSubmit={handleSubmit}>
            <h5 className="fw-bold mb-4 text-navy border-bottom pb-2">Thông tin cơ bản</h5>
            <Row className="g-4 mb-5">
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Số phòng <span className="text-danger">*</span></Form.Label>
                  <Form.Control 
                    type="text" 
                    name="number" 
                    value={formData.number} 
                    onChange={handleChange}
                    isInvalid={!!errors.number}
                  />
                  <Form.Control.Feedback type="invalid">{errors.number}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Tầng</Form.Label>
                  <Form.Control 
                    type="number" 
                    name="floor" 
                    value={formData.floor} 
                    onChange={handleChange}
                    min="1"
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Loại phòng <span className="text-danger">*</span></Form.Label>
                  <Form.Select 
                    name="type" 
                    value={formData.type} 
                    onChange={handleChange}
                  >
                    <option value="Standard">Standard</option>
                    <option value="Deluxe">Deluxe</option>
                    <option value="Executive">Executive</option>
                    <option value="Suite">Suite</option>
                    <option value="Presidential Suite">Presidential Suite</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Trạng thái</Form.Label>
                  <Form.Select 
                    name="status" 
                    value={formData.status} 
                    onChange={handleChange}
                  >
                    <option value="Available">Trống (Available)</option>
                    <option value="Booked">Đã đặt (Booked)</option>
                    <option value="Occupied">Đang ở (Occupied)</option>
                    <option value="Cleaning">Đang dọn (Cleaning)</option>
                    <option value="Maintenance">Bảo trì (Maintenance)</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <h5 className="fw-bold mb-4 text-navy border-bottom pb-2">Chi tiết cấu hình</h5>
            <Row className="g-4 mb-5">
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Giá mỗi đêm (VNĐ) <span className="text-danger">*</span></Form.Label>
                  <Form.Control 
                    type="number" 
                    name="price" 
                    value={formData.price} 
                    onChange={handleChange}
                    isInvalid={!!errors.price}
                    min="0"
                  />
                  <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Sức chứa (người) <span className="text-danger">*</span></Form.Label>
                  <Form.Control 
                    type="number" 
                    name="capacity" 
                    value={formData.capacity} 
                    onChange={handleChange}
                    isInvalid={!!errors.capacity}
                    min="1"
                  />
                  <Form.Control.Feedback type="invalid">{errors.capacity}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Diện tích (m²)</Form.Label>
                  <Form.Control 
                    type="number" 
                    name="area" 
                    value={formData.area} 
                    onChange={handleChange}
                    min="1"
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Loại giường</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="bedType" 
                    value={formData.bedType} 
                    onChange={handleChange}
                    placeholder="VD: King, Double, Twin"
                  />
                </Form.Group>
              </Col>
              
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Tiện nghi (Phân cách bằng dấu phẩy)</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="amenities" 
                    value={formData.amenities} 
                    onChange={handleChange}
                    placeholder="VD: Wi-Fi, TV 4K, Điều hòa"
                  />
                </Form.Group>
              </Col>
              
              <Col md={12}>
                <Form.Group>
                  <Form.Label>URL Hình ảnh chính</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="images" 
                    value={formData.images} 
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                  />
                </Form.Group>
              </Col>
              
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Mô tả phòng</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={4}
                    name="description" 
                    value={formData.description} 
                    onChange={handleChange}
                    placeholder="Nhập mô tả chi tiết về phòng..."
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-end gap-3">
              <Button as={Link} to="/rooms/manage" variant="outline-secondary" className="px-4">
                Hủy
              </Button>
              <Button type="submit" variant="gold" className="btn-gold px-4 d-flex align-items-center" disabled={loading}>
                <FaSave className="me-2" />
                {loading ? 'Đang lưu...' : 'Lưu thông tin'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default RoomFormPage;

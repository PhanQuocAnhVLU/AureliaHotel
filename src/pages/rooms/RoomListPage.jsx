import { useState, useMemo } from 'react';
import { Row, Col, Card, Form, InputGroup, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter, FaStar, FaUser, FaVectorSquare } from 'react-icons/fa';
import { useApp } from '../../contexts/AppContext';
import { searchRooms, filterRooms, sortRooms } from '../../utils/algorithms';
import { formatCurrency } from '../../utils/formatters';

const RoomListPage = () => {
  const { rooms } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    minPrice: '',
    maxPrice: '',
  });
  const [sortBy, setSortBy] = useState('price_asc');

  const processedRooms = useMemo(() => {
    let result = [...rooms];
    
    // 1. Search
    result = searchRooms(result, searchTerm);
    
    // 2. Filter
    result = filterRooms(result, filters);
    
    // 3. Sort
    result = sortRooms(result, sortBy);
    
    return result;
  }, [rooms, searchTerm, filters, sortBy]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="page-title mb-0">Danh sách phòng</h2>
        <span className="text-muted">Tìm thấy {processedRooms.length} phòng</span>
      </div>

      {/* Filter Section */}
      <Card className="hotel-card border-0 mb-4 bg-white">
        <Card.Body>
          <Row className="g-3">
            <Col md={12} lg={4}>
              <InputGroup>
                <InputGroup.Text className="bg-light border-end-0"><FaSearch className="text-muted" /></InputGroup.Text>
                <Form.Control
                  placeholder="Tìm kiếm theo số phòng, loại, mô tả..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-start-0 ps-0 bg-light"
                />
              </InputGroup>
            </Col>
            
            <Col md={6} lg={2}>
              <Form.Select name="type" value={filters.type} onChange={handleFilterChange}>
                <option value="all">Loại phòng</option>
                <option value="Standard">Standard</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Executive">Executive</option>
                <option value="Suite">Suite</option>
                <option value="Presidential Suite">Presidential Suite</option>
              </Form.Select>
            </Col>

            <Col md={6} lg={2}>
              <Form.Select name="status" value={filters.status} onChange={handleFilterChange}>
                <option value="all">Trạng thái</option>
                <option value="Available">Trống</option>
                <option value="Booked">Đã đặt</option>
                <option value="Occupied">Đang ở</option>
                <option value="Cleaning">Đang dọn</option>
                <option value="Maintenance">Bảo trì</option>
              </Form.Select>
            </Col>

            <Col md={6} lg={2}>
              <Form.Control
                type="number"
                name="maxPrice"
                placeholder="Giá tối đa (VNĐ)"
                value={filters.maxPrice}
                onChange={handleFilterChange}
              />
            </Col>

            <Col md={6} lg={2}>
              <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="price_asc">Giá: Thấp đến Cao</option>
                <option value="price_desc">Giá: Cao đến Thấp</option>
                <option value="rating_desc">Đánh giá cao nhất</option>
                <option value="number_asc">Số phòng</option>
              </Form.Select>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Room Grid */}
      <Row className="g-4">
        {processedRooms.length > 0 ? processedRooms.map(room => (
          <Col md={6} xl={4} key={room.id}>
            <Card className="hotel-card border-0 h-100 p-0 overflow-hidden">
              <div className="position-relative">
                <img 
                  src={room.images[0]} 
                  alt={`Room ${room.number}`} 
                  className="room-card-img w-100" 
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800'; }} 
                />
                <Badge 
                  bg={
                    room.status === 'Available' ? 'success' :
                    room.status === 'Booked' ? 'primary' :
                    room.status === 'Occupied' ? 'warning' :
                    room.status === 'Cleaning' ? 'info' : 'danger'
                  } 
                  className="position-absolute top-0 end-0 m-3 px-3 py-2"
                >
                  {room.status === 'Available' ? 'Trống' :
                   room.status === 'Booked' ? 'Đã đặt' :
                   room.status === 'Occupied' ? 'Đang ở' :
                   room.status === 'Cleaning' ? 'Đang dọn' : 'Bảo trì'}
                </Badge>
                <Badge bg="dark" className="position-absolute bottom-0 start-0 m-3 px-3 py-2 bg-opacity-75">
                  Phòng {room.number}
                </Badge>
              </div>
              
              <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className="fw-bold mb-0 text-navy">{room.type}</h5>
                  <div className="d-flex align-items-center text-warning">
                    <FaStar className="me-1" />
                    <span className="text-dark fw-medium">{room.rating}</span>
                  </div>
                </div>
                
                <p className="text-muted small mb-3 flex-grow-1" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {room.description}
                </p>
                
                <div className="d-flex flex-wrap gap-2 mb-3">
                  <Badge bg="light" text="dark" className="border fw-normal">
                    <FaUser className="me-1 text-muted" /> Tối đa {room.capacity}
                  </Badge>
                  <Badge bg="light" text="dark" className="border fw-normal">
                    <FaVectorSquare className="me-1 text-muted" /> {room.area} m²
                  </Badge>
                </div>
                
                <div className="d-flex justify-content-between align-items-end mt-auto pt-3 border-top">
                  <div>
                    <span className="text-muted small d-block">Giá mỗi đêm</span>
                    <span className="price-tag">{formatCurrency(room.price)}</span>
                  </div>
                  <Button 
                    as={Link} 
                    to={`/rooms/${room.id}`} 
                    variant="gold" 
                    className="btn-gold"
                  >
                    Chi tiết
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        )) : (
          <Col xs={12}>
            <Card className="hotel-card border-0 text-center py-5">
              <Card.Body>
                <FaFilter size={48} className="text-muted mb-3 opacity-50" />
                <h5 className="text-muted">Không tìm thấy phòng nào phù hợp với bộ lọc</h5>
                <Button variant="outline-primary" className="mt-3" onClick={() => {
                  setSearchTerm('');
                  setFilters({ type: 'all', status: 'all', minPrice: '', maxPrice: '' });
                }}>
                  Xóa bộ lọc
                </Button>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default RoomListPage;

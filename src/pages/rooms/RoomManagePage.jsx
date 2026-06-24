import { useState, useMemo } from 'react';
import { Card, Table, Button, Badge, Form, InputGroup, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaPlus, FaSearch, FaEdit, FaTrash, FaEllipsisV } from 'react-icons/fa';
import { useApp } from '../../contexts/AppContext';
import { formatCurrency } from '../../utils/formatters';

const RoomManagePage = () => {
  const { rooms, deleteRoom } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const processedRooms = useMemo(() => {
    return rooms.filter(room => {
      const matchSearch = room.number.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          room.type.toLowerCase().includes(searchTerm.toLowerCase());
      const matchType = filterType === 'all' || room.type === filterType;
      return matchSearch && matchType;
    }).sort((a, b) => a.number.localeCompare(b.number, undefined, { numeric: true }));
  }, [rooms, searchTerm, filterType]);

  const handleDelete = (id, number) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa phòng ${number}? Hành động này không thể hoàn tác.`)) {
      deleteRoom(id);
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'Available': { bg: 'success', text: 'Trống' },
      'Booked': { bg: 'primary', text: 'Đã đặt' },
      'Occupied': { bg: 'warning', text: 'Đang ở' },
      'Cleaning': { bg: 'info', text: 'Đang dọn' },
      'Maintenance': { bg: 'danger', text: 'Bảo trì' }
    };
    const mapped = statusMap[status] || { bg: 'secondary', text: status };
    return <Badge bg={mapped.bg}>{mapped.text}</Badge>;
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="page-title mb-0">Quản lý phòng</h2>
        <Button as={Link} to="/rooms/new" variant="gold" className="btn-gold">
          <FaPlus className="me-2" /> Thêm phòng mới
        </Button>
      </div>

      <Card className="hotel-card border-0 mb-4 bg-white">
        <Card.Body>
          <div className="d-flex flex-wrap gap-3">
            <div className="flex-grow-1" style={{ minWidth: '250px' }}>
              <InputGroup>
                <InputGroup.Text className="bg-light border-end-0"><FaSearch className="text-muted" /></InputGroup.Text>
                <Form.Control
                  placeholder="Tìm kiếm theo số phòng, loại phòng..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-start-0 ps-0 bg-light"
                />
              </InputGroup>
            </div>
            <div style={{ minWidth: '200px' }}>
              <Form.Select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value="all">Tất cả loại phòng</option>
                <option value="Standard">Standard</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Executive">Executive</option>
                <option value="Suite">Suite</option>
                <option value="Presidential Suite">Presidential Suite</option>
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
                  <th className="ps-4">Số phòng</th>
                  <th>Loại phòng</th>
                  <th>Giá (VNĐ)</th>
                  <th>Sức chứa</th>
                  <th>Trạng thái</th>
                  <th className="text-end pe-4">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {processedRooms.length > 0 ? processedRooms.map(room => (
                  <tr key={room.id}>
                    <td className="ps-4 fw-bold text-navy">{room.number}</td>
                    <td>{room.type}</td>
                    <td className="fw-medium text-gold">{formatCurrency(room.price)}</td>
                    <td>{room.capacity} người</td>
                    <td>{getStatusBadge(room.status)}</td>
                    <td className="text-end pe-4">
                      <Dropdown align="end">
                        <Dropdown.Toggle variant="light" size="sm" className="btn-icon">
                          <FaEllipsisV className="text-muted" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="shadow border-0">
                          <Dropdown.Item as={Link} to={`/rooms/${room.id}/edit`}>
                            <FaEdit className="me-2 text-primary" /> Chỉnh sửa
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item onClick={() => handleDelete(room.id, room.number)} className="text-danger">
                            <FaTrash className="me-2" /> Xóa
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
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
            Hiển thị {processedRooms.length} phòng
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default RoomManagePage;

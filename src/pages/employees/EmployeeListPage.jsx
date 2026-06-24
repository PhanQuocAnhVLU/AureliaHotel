import { useState, useMemo } from 'react';
import { Card, Table, Badge, Form, InputGroup, Button, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaSearch, FaPlus, FaEdit, FaTrash, FaEllipsisV } from 'react-icons/fa';
import { useApp } from '../../contexts/AppContext';
import { formatCurrency, formatDate } from '../../utils/formatters';

const EmployeeListPage = () => {
  const { employees } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');

  const processedEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          emp.phone.includes(searchTerm);
      const matchDept = deptFilter === 'all' || emp.department === deptFilter;
      return matchSearch && matchDept;
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [employees, searchTerm, deptFilter]);

  const getRoleBadge = (role) => {
    switch (role) {
      case 'admin': return <Badge bg="danger">Admin</Badge>;
      case 'manager': return <Badge bg="primary">Quản lý</Badge>;
      case 'receptionist': return <Badge bg="info">Lễ tân</Badge>;
      default: return <Badge bg="secondary">Nhân viên</Badge>;
    }
  };

  const departments = [...new Set(employees.map(e => e.department))];

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="page-title mb-0">Quản lý Nhân viên</h2>
        <Button variant="gold" className="btn-gold">
          <FaPlus className="me-2" /> Thêm nhân viên
        </Button>
      </div>

      <Card className="hotel-card border-0 mb-4 bg-white">
        <Card.Body>
          <div className="d-flex flex-wrap gap-3">
            <div className="flex-grow-1" style={{ minWidth: '250px' }}>
              <InputGroup>
                <InputGroup.Text className="bg-light border-end-0"><FaSearch className="text-muted" /></InputGroup.Text>
                <Form.Control
                  placeholder="Tìm kiếm theo tên, email, SĐT..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-start-0 ps-0 bg-light"
                />
              </InputGroup>
            </div>
            <div style={{ minWidth: '200px' }}>
              <Form.Select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}>
                <option value="all">Tất cả phòng ban</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
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
                  <th className="ps-4">Nhân viên</th>
                  <th>Phòng ban / Vị trí</th>
                  <th>Liên hệ</th>
                  <th>Ca làm việc</th>
                  <th>Trạng thái</th>
                  <th className="text-end pe-4">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {processedEmployees.length > 0 ? processedEmployees.map(emp => (
                  <tr key={emp.id}>
                    <td className="ps-4">
                      <div className="d-flex align-items-center">
                        <img src={emp.avatar} alt={emp.name} className="avatar me-3" />
                        <div>
                          <div className="fw-bold">{emp.name}</div>
                          {getRoleBadge(emp.role)}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="fw-medium">{emp.department}</div>
                      <small className="text-muted">{emp.position}</small>
                    </td>
                    <td>
                      <div>{emp.phone}</div>
                      <small className="text-muted">{emp.email}</small>
                    </td>
                    <td><Badge bg="light" text="dark" className="border">{emp.shift}</Badge></td>
                    <td>
                      <Badge bg={emp.status === 'Active' ? 'success' : 'danger'}>
                        {emp.status === 'Active' ? 'Đang làm việc' : 'Nghỉ việc'}
                      </Badge>
                    </td>
                    <td className="text-end pe-4">
                      <Dropdown align="end">
                        <Dropdown.Toggle variant="light" size="sm" className="btn-icon">
                          <FaEllipsisV className="text-muted" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="shadow border-0">
                          <Dropdown.Item>
                            <FaEdit className="me-2 text-primary" /> Chỉnh sửa
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item className="text-danger">
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
            Hiển thị {processedEmployees.length} nhân viên
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EmployeeListPage;

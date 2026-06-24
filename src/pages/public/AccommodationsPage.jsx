import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  FaBed, FaExpand, FaUsers, FaEye, FaCalendarAlt
} from 'react-icons/fa';

const rooms = [
  {
    id: 1, nameVi: 'Phòng Deluxe', size: '35m²', guests: 2, view: 'View thành phố',
    price: '2.800.000', badge: 'Phổ biến nhất', badgeColor: '#C5A059',
    img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80',
    desc: 'Phòng Deluxe rộng rãi với thiết kế hiện đại, nội thất cao cấp và cửa sổ rộng nhìn ra thành phố sôi động. Lý tưởng cho cặp đôi hoặc khách công tác.',
    amenities: ['WiFi tốc độ cao', 'Minibar', 'Smart TV 55"', 'Điều hòa', 'Bồn tắm', 'Dịch vụ phòng 24/7'],
  },
  {
    id: 2, nameVi: 'Phòng Premier', size: '45m²', guests: 2, view: 'View hồ bơi',
    price: '3.600.000', badge: 'Lựa chọn mới', badgeColor: '#1E3A5F',
    img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=900&q=80',
    desc: 'Phòng Premier sang trọng với không gian sống rộng rãi, ban công riêng nhìn ra hồ bơi và khu vườn nhiệt đới xanh mát.',
    amenities: ['WiFi tốc độ cao', 'Minibar cao cấp', 'Smart TV 65"', 'Điều hòa', 'Bồn tắm sục', 'Đưa đón sân bay'],
  },
  {
    id: 3, nameVi: 'Suite Hành Pháp', size: '65m²', guests: 3, view: 'View panoramic',
    price: '5.500.000', badge: 'Sang trọng', badgeColor: '#7B3F00',
    img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=900&q=80',
    desc: 'Suite với phòng khách riêng biệt, bàn làm việc cao cấp và tầm nhìn panoramic 180° ôm trọn đường chân trời Sài Gòn.',
    amenities: ['WiFi tốc độ cao', 'Phòng khách riêng', 'Smart TV 75"', 'Điều hòa', 'Jacuzzi', 'Butler riêng'],
  },
  {
    id: 4, nameVi: 'Junior Suite', size: '55m²', guests: 2, view: 'View sông',
    price: '4.200.000', badge: 'Mới khai trương', badgeColor: '#2E7D32',
    img: 'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=900&q=80',
    desc: 'Junior Suite hiện đại với phong cách thiết kế đương đại, phòng ngủ rộng rãi và khu vực ngồi thư giãn nhìn ra dòng sông thơ mộng.',
    amenities: ['WiFi tốc độ cao', 'Minibar', 'Smart TV 65"', 'Điều hòa', 'Bồn tắm đứng', 'Dịch vụ phòng 24/7'],
  },
  {
    id: 5, nameVi: 'Suite Tổng Thống', size: '120m²', guests: 4, view: 'View toàn cảnh',
    price: '12.000.000', badge: 'Đỉnh cao xa hoa', badgeColor: '#B8860B',
    img: 'https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?w=900&q=80',
    desc: 'Presidential Suite với 2 phòng ngủ, phòng ăn, phòng khách riêng và sân thượng tư nhân nhìn ra toàn cảnh Quận 1.',
    amenities: ['WiFi tốc độ cao', '2 Phòng ngủ', 'Smart TV 85"', 'Điều hòa', 'Bể sục riêng', 'Butler & Chef riêng'],
  },
  {
    id: 6, nameVi: 'Phòng Gia Đình', size: '70m²', guests: 4, view: 'View thành phố',
    price: '4.800.000', badge: 'Thích hợp gia đình', badgeColor: '#0277BD',
    img: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=900&q=80',
    desc: 'Phòng Gia Đình rộng rãi với 1 giường đôi lớn và 2 giường đơn, khu vực chơi cho trẻ em và đầy đủ tiện nghi.',
    amenities: ['WiFi tốc độ cao', 'Minibar', 'Smart TV 65"', 'Điều hòa', 'Bồn tắm', 'Khu vui chơi trẻ em'],
  },
];

const AccommodationsPage = () => {
  const [hovered, setHovered] = useState(null);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const handleBook = (e) => {
    e.preventDefault();
    if (isAuthenticated && user?.role === 'customer') navigate('/rooms');
    else if (!isAuthenticated) navigate('/login');
    else navigate('/dashboard');
  };

  const [filterSize, setFilterSize] = useState('all');
  const filters = [
    { key: 'all', label: 'Tất cả' },
    { key: 'small', label: 'Đến 45m²' },
    { key: 'medium', label: '50–70m²' },
    { key: 'large', label: '70m²+' },
  ];

  const filtered = rooms.filter(r => {
    const s = parseInt(r.size);
    if (filterSize === 'small') return s <= 45;
    if (filterSize === 'medium') return s > 45 && s <= 70;
    if (filterSize === 'large') return s > 70;
    return true;
  });

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <div style={{
        backgroundImage: `linear-gradient(rgba(11,17,32,0.55), rgba(11,17,32,0.82)), url('https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1600&q=80')`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        padding: '200px 0 100px', textAlign: 'center', color: '#fff',
      }}>
        <Container>
          <p style={{ letterSpacing: '5px', fontSize: '0.72rem', color: '#C5A059', textTransform: 'uppercase', marginBottom: '14px', fontWeight: 600 }}>
            AURELIA GRAND HOTEL
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.5rem, 6vw, 4.2rem)', fontWeight: 600, marginBottom: '20px', lineHeight: 1.1, color: '#fff' }}>
            Hạng Phòng & Suite
          </h1>
          <div style={{ width: '48px', height: '1px', background: '#C5A059', margin: '0 auto 20px' }} />
          <p style={{ maxWidth: '560px', margin: '0 auto', color: 'rgba(255,255,255,0.65)', fontSize: '0.95rem', lineHeight: 1.9 }}>
            Từ Phòng Deluxe tinh tế đến Presidential Suite huyền thoại — mỗi không gian là một tác phẩm nghệ thuật sống động.
          </p>
        </Container>
      </div>

      {/* ── Filter bar ── */}
      <div style={{ background: '#F7F5F0', borderBottom: '1px solid rgba(0,0,0,0.07)', padding: '0' }}>
        <Container>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0', overflowX: 'auto' }}>
            {filters.map(f => (
              <button key={f.key} onClick={() => setFilterSize(f.key)} style={{
                background: 'none', border: 'none',
                borderBottom: filterSize === f.key ? '2px solid #C5A059' : '2px solid transparent',
                color: filterSize === f.key ? '#C5A059' : '#64748B',
                padding: '18px 28px', fontSize: '0.78rem', letterSpacing: '1.5px',
                fontWeight: 600, textTransform: 'uppercase', cursor: 'pointer',
                whiteSpace: 'nowrap', transition: 'all 0.2s ease',
              }}>
                {f.label}
              </button>
            ))}
          </div>
        </Container>
      </div>

      {/* ── Room Grid ── */}
      <section style={{ padding: '80px 0' }}>
        <Container>
          <Row className="g-4">
            {filtered.map((room) => (
              <Col lg={6} key={room.id}>
                <div
                  onMouseEnter={() => setHovered(room.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    border: `1px solid ${hovered === room.id ? '#C5A059' : 'rgba(0,0,0,0.08)'}`,
                    overflow: 'hidden', transition: 'all 0.35s ease',
                    boxShadow: hovered === room.id ? '0 20px 50px rgba(197,160,89,0.12)' : '0 4px 20px rgba(0,0,0,0.04)',
                    background: '#fff',
                  }}
                >
                  <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
                    <img src={room.img} alt={room.nameVi} style={{
                      width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                      transform: hovered === room.id ? 'scale(1.06)' : 'scale(1)',
                      transition: 'transform 0.65s ease',
                    }} />
                    <div style={{
                      position: 'absolute', top: '16px', left: '16px',
                      background: room.badgeColor, color: '#fff',
                      padding: '4px 12px', fontSize: '0.68rem', letterSpacing: '1.5px',
                      textTransform: 'uppercase', fontWeight: 700,
                    }}>{room.badge}</div>
                    <div style={{
                      position: 'absolute', bottom: 0, right: 0,
                      background: 'rgba(11,17,32,0.88)', backdropFilter: 'blur(8px)',
                      padding: '12px 20px', borderTop: '2px solid #C5A059',
                    }}>
                      <div style={{ color: '#C5A059', fontWeight: 700, fontSize: '1.1rem', fontFamily: "'Cormorant Garamond', serif" }}>{room.price} ₫</div>
                      <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem' }}>/ đêm</div>
                    </div>
                  </div>

                  <div style={{ padding: '28px' }}>
                    <div style={{ display: 'flex', gap: '20px', marginBottom: '14px', flexWrap: 'wrap' }}>
                      {[{ icon: <FaExpand />, text: room.size }, { icon: <FaUsers />, text: `${room.guests} khách` }, { icon: <FaEye />, text: room.view }].map((m, i) => (
                        <span key={i} style={{ color: '#64748B', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <span style={{ color: '#C5A059' }}>{m.icon}</span> {m.text}
                        </span>
                      ))}
                    </div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#0F172A', fontSize: '1.6rem', fontWeight: 600, marginBottom: '10px' }}>{room.nameVi}</h3>
                    <p style={{ color: '#64748B', fontSize: '0.87rem', lineHeight: 1.8, marginBottom: '18px' }}>{room.desc}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '22px' }}>
                      {room.amenities.map((a, i) => (
                        <span key={i} style={{ background: '#F7F5F0', border: '1px solid rgba(197,160,89,0.2)', color: '#64748B', fontSize: '0.73rem', padding: '4px 10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ color: '#C5A059', fontSize: '0.65rem' }}>✦</span> {a}
                        </span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button onClick={handleBook} style={{
                        flex: 1, background: 'linear-gradient(135deg, #C5A059, #A07840)',
                        color: '#fff', padding: '12px 0', border: 'none', fontWeight: 600,
                        fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase',
                        cursor: 'pointer', transition: 'opacity 0.2s', fontFamily: 'inherit',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                      }}>
                        <FaCalendarAlt style={{ fontSize: '0.7rem' }} /> Đặt Phòng
                      </button>
                      <button style={{
                        flex: 1, background: 'transparent', border: '1px solid rgba(197,160,89,0.35)',
                        color: '#C5A059', padding: '12px 0', fontWeight: 600,
                        fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase',
                        cursor: 'pointer', transition: 'all 0.25s', fontFamily: 'inherit',
                      }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#C5A059'; e.currentTarget.style.color = '#fff'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C5A059'; }}
                      >
                        Xem Chi Tiết
                      </button>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ── Policy strip ── */}
      <div style={{ background: '#0F172A', padding: '56px 0', borderTop: '3px solid #C5A059' }}>
        <Container>
          <Row className="text-center g-4">
            {[
              { icon: '🛎️', title: 'Nhận & Trả Phòng', desc: 'Nhận từ 14:00 — Trả trước 12:00' },
              { icon: '🚭', title: 'Cấm Hút Thuốc', desc: 'Toàn bộ khu vực khách sạn' },
              { icon: '💳', title: 'Thanh Toán', desc: 'Visa, Mastercard & VNPay' },
              { icon: '🔒', title: 'Bảo Mật 24/7', desc: 'An ninh và an toàn tuyệt đối' },
            ].map((p, i) => (
              <Col md={3} key={i}>
                <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{p.icon}</div>
                <h6 style={{ color: '#C5A059', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px', fontFamily: 'inherit' }}>{p.title}</h6>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', marginBottom: 0 }}>{p.desc}</p>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default AccommodationsPage;

import { useState } from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import { FaClock, FaSpa, FaSwimmingPool, FaDumbbell, FaCar, FaArrowRight, FaPhone, FaTimes } from 'react-icons/fa';

const spaTreatments = [
  { name: 'Thư Giãn Toàn Thân', duration: '90 phút', price: '1.800.000 ₫', emoji: '💆' },
  { name: 'Massage Đá Nóng', duration: '75 phút', price: '2.200.000 ₫', emoji: '🪨' },
  { name: 'Chăm Sóc Da Mặt Vàng', duration: '60 phút', price: '2.500.000 ₫', emoji: '✨' },
  { name: 'Ngâm Thảo Dược', duration: '45 phút', price: '1.200.000 ₫', emoji: '🌿' },
  { name: 'Massage Bốn Tay', duration: '90 phút', price: '3.200.000 ₫', emoji: '🙌' },
  { name: 'Gói Cặp Đôi Luxury', duration: '120 phút', price: '5.500.000 ₫', emoji: '💑' },
];

const services = [
  {
    icon: <FaSpa />, name: 'Aurelia Spa', type: 'Wellness', tag: 'Spa Đặc Trưng',
    // Ảnh: phòng spa, ánh nến, hoa, khăn, bàn massage
    img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=900&q=80',
    hours: '08:00 – 22:00',
    desc: 'Trung tâm spa 5 tầng với hơn 20 phòng trị liệu, kết hợp phương pháp cổ truyền phương Đông và kỹ thuật hiện đại châu Âu. Phòng muối Himalaya, tắm hơi và hồ ngâm thư giãn.',
  },
  {
    icon: <FaSwimmingPool />, name: 'Hồ Bơi Vô Cực', type: 'Tầng 22', tag: 'Tiện Ích Cao Cấp',
    // Ảnh: infinity pool nhìn ra thành phố hoặc biển, trời xanh
    img: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=900&q=80',
    hours: '06:00 – 22:00',
    desc: 'Hồ bơi vô cực ngoài trời dài 30m với tầm nhìn 180° ra sông Sài Gòn. Khu vực bể nóng, bãi nằm tắm nắng và dịch vụ đồ uống tại chỗ.',
  },
  {
    icon: <FaDumbbell />, name: 'Fitness Center', type: 'Mở 24/7', tag: 'Sức Khỏe',
    // Ảnh: phòng gym hiện đại, máy tập, không gian rộng, ánh sáng tốt
    img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&q=80',
    hours: '05:00 – 23:00',
    desc: 'Phòng tập gym 300m² trang bị thiết bị Technogym mới nhất, studio yoga/pilates, personal trainer chuyên nghiệp và chương trình luyện tập tùy chỉnh.',
  },
  {
    icon: <FaCar />, name: 'Concierge & Đưa Đón', type: 'VIP Service', tag: 'Phục Vụ 24/7',
    // Ảnh: xe limousine sang trọng, cửa xe mở, thảm đỏ
    img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=900&q=80',
    hours: '24/7',
    desc: 'Đội ngũ concierge 5 sao phục vụ 24/7. Xe limousine hạng sang, đặt vé nhà hát, tour thành phố và mọi yêu cầu cá nhân hóa.',
  },
];

const BookModal = ({ show, onHide, serviceName }) => (
  <Modal show={show} onHide={onHide} centered size="sm">
    <div style={{ background: '#0F172A', border: '1px solid rgba(197,160,89,0.3)', borderRadius: '4px', overflow: 'hidden' }}>
      <div style={{ padding: '32px 32px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ color: '#C5A059', fontSize: '0.68rem', letterSpacing: '2.5px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>Đặt Lịch</p>
          <h4 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fff', fontSize: '1.5rem', fontWeight: 600, marginBottom: 0 }}>{serviceName}</h4>
        </div>
        <button onClick={onHide} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', padding: '4px', lineHeight: 1 }}><FaTimes /></button>
      </div>
      <div style={{ padding: '20px 32px 32px' }}>
        <div style={{ width: '40px', height: '1px', background: '#C5A059', marginBottom: '20px' }} />
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.87rem', lineHeight: 1.8, marginBottom: '24px' }}>Để đặt lịch dịch vụ, quý khách vui lòng liên hệ trực tiếp với chúng tôi qua:</p>
        <a href="tel:+84281234567" style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'linear-gradient(135deg, #C5A059, #A07840)', color: '#fff', textDecoration: 'none', padding: '13px 24px', fontSize: '0.82rem', letterSpacing: '1.5px', fontWeight: 600, textTransform: 'uppercase', marginBottom: '10px' }}>
          <FaPhone style={{ fontSize: '0.75rem' }} /> +84 28 1234 5678
        </a>
        <a href="mailto:spa@aureliagrand.vn" style={{ display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid rgba(197,160,89,0.35)', color: '#C5A059', textDecoration: 'none', padding: '13px 24px', fontSize: '0.82rem', letterSpacing: '1.5px', fontWeight: 600, textTransform: 'uppercase' }}>
          spa@aureliagrand.vn
        </a>
      </div>
    </div>
  </Modal>
);

const ServicesPage = () => {
  const [hovered, setHovered] = useState(null);
  const [modalService, setModalService] = useState(null);

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <BookModal show={!!modalService} onHide={() => setModalService(null)} serviceName={modalService} />

      {/* ── Hero — spa/wellness tổng thể ── */}
      <div style={{
        backgroundImage: `linear-gradient(rgba(11,17,32,0.5), rgba(11,17,32,0.85)), url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&q=80')`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        padding: '200px 0 100px', textAlign: 'center', color: '#fff',
      }}>
        <Container>
          <p style={{ letterSpacing: '5px', fontSize: '0.72rem', color: '#C5A059', textTransform: 'uppercase', marginBottom: '14px', fontWeight: 600 }}>THƯ THÁI & TÁI SINH</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.5rem, 6vw, 4.2rem)', fontWeight: 600, marginBottom: '20px', lineHeight: 1.1, color: '#fff' }}>Dịch Vụ & Spa</h1>
          <div style={{ width: '48px', height: '1px', background: '#C5A059', margin: '0 auto 20px' }} />
          <p style={{ maxWidth: '560px', margin: '0 auto', color: 'rgba(255,255,255,0.65)', fontSize: '0.95rem', lineHeight: 1.9 }}>Tái sinh cơ thể và tâm hồn với bộ sưu tập dịch vụ chăm sóc cao cấp.</p>
        </Container>
      </div>

      {/* ── Service cards — mỗi cái ảnh đúng chủ đề ── */}
      <section style={{ padding: '80px 0' }}>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p style={{ color: '#C5A059', fontSize: '0.72rem', letterSpacing: '3.5px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '12px' }}>Tiện Ích Đẳng Cấp</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#0F172A', fontWeight: 600, marginBottom: '16px' }}>Trải Nghiệm Hoàn Hảo</h2>
            <div style={{ width: '48px', height: '1px', background: '#C5A059', margin: '0 auto' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            {services.map((svc, idx) => (
              <div key={idx} onMouseEnter={() => setHovered(idx)} onMouseLeave={() => setHovered(null)}>
                <Row className={`g-0 align-items-stretch ${idx % 2 === 1 ? 'flex-row-reverse' : ''}`}>
                  <Col lg={5} style={{ overflow: 'hidden', minHeight: '340px' }}>
                    <div style={{ height: '100%', minHeight: '340px', overflow: 'hidden', position: 'relative' }}>
                      <img src={svc.img} alt={svc.name} style={{
                        width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                        transform: hovered === idx ? 'scale(1.06)' : 'scale(1)',
                        transition: 'transform 0.7s ease',
                      }} />
                      <div style={{ position: 'absolute', top: '20px', left: '20px', background: '#C5A059', color: '#fff', padding: '5px 14px', fontSize: '0.68rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 700 }}>{svc.tag}</div>
                      <div style={{ position: 'absolute', bottom: '20px', left: '20px', background: 'rgba(11,17,32,0.85)', backdropFilter: 'blur(8px)', padding: '10px 16px', borderLeft: '2px solid #C5A059' }}>
                        <div style={{ color: '#C5A059', fontSize: '0.65rem', letterSpacing: '2px', textTransform: 'uppercase' }}>GIỜ HOẠT ĐỘNG</div>
                        <div style={{ color: '#fff', fontSize: '0.9rem', marginTop: '2px' }}>{svc.hours}</div>
                      </div>
                    </div>
                  </Col>
                  <Col lg={7}>
                    <div style={{
                      padding: '48px 52px', background: hovered === idx ? '#F7F5F0' : '#FDFBF7',
                      height: '100%', borderTop: '1px solid rgba(0,0,0,0.06)',
                      borderRight: '1px solid rgba(0,0,0,0.06)', borderBottom: '1px solid rgba(0,0,0,0.06)',
                      transition: 'background 0.3s ease', display: 'flex', flexDirection: 'column', justifyContent: 'center',
                    }}>
                      <div style={{ color: '#C5A059', fontSize: '2rem', marginBottom: '16px' }}>{svc.icon}</div>
                      <p style={{ color: '#C5A059', fontSize: '0.72rem', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 600 }}>{svc.type}</p>
                      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', color: '#0F172A', fontWeight: 600, marginBottom: '16px' }}>{svc.name}</h3>
                      <div style={{ width: '40px', height: '1px', background: '#C5A059', marginBottom: '20px' }} />
                      <p style={{ color: '#64748B', fontSize: '0.9rem', lineHeight: 1.9, marginBottom: '28px' }}>{svc.desc}</p>
                      <button onClick={() => setModalService(svc.name)} style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                        background: '#0F172A', color: '#fff', border: 'none',
                        padding: '12px 28px', fontSize: '0.78rem', letterSpacing: '1.5px',
                        fontWeight: 600, textTransform: 'uppercase', transition: 'background 0.2s ease',
                        alignSelf: 'flex-start', cursor: 'pointer',
                      }}
                        onMouseEnter={e => e.currentTarget.style.background = '#C5A059'}
                        onMouseLeave={e => e.currentTarget.style.background = '#0F172A'}
                      >
                        Đặt Lịch <FaArrowRight style={{ fontSize: '0.7rem' }} />
                      </button>
                    </div>
                  </Col>
                </Row>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Spa menu ── */}
      <section style={{ background: '#0F172A', padding: '80px 0', borderTop: '3px solid #C5A059' }}>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <p style={{ color: '#C5A059', fontSize: '0.72rem', letterSpacing: '3.5px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '12px' }}>Aurelia Spa</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#fff', fontWeight: 600, marginBottom: '16px' }}>Thực Đơn Trị Liệu</h2>
            <div style={{ width: '48px', height: '1px', background: '#C5A059', margin: '0 auto' }} />
          </div>
          <Row className="g-3">
            {spaTreatments.map((t, i) => (
              <Col md={4} sm={6} key={i}>
                <div style={{ padding: '28px', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', gap: '10px', transition: 'all 0.3s ease', cursor: 'pointer' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#C5A059'; e.currentTarget.style.background = 'rgba(197,160,89,0.05)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.background = 'transparent'; }}
                >
                  <div style={{ fontSize: '1.8rem' }}>{t.emoji}</div>
                  <h5 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fff', fontSize: '1.1rem', fontWeight: 600, marginBottom: '4px' }}>{t.name}</h5>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                    <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <FaClock style={{ color: '#C5A059', fontSize: '0.65rem' }} /> {t.duration}
                    </span>
                    <span style={{ color: '#C5A059', fontWeight: 700, fontSize: '0.95rem', fontFamily: "'Cormorant Garamond', serif" }}>{t.price}</span>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <button onClick={() => setModalService('Aurelia Spa')} style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              background: 'linear-gradient(135deg, #C5A059, #A07840)', color: '#fff', border: 'none',
              padding: '14px 44px', fontSize: '0.78rem', letterSpacing: '2px', fontWeight: 600,
              textTransform: 'uppercase', cursor: 'pointer',
            }}>
              Đặt Lịch Spa <FaArrowRight style={{ fontSize: '0.7rem' }} />
            </button>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default ServicesPage;

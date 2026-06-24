import { useState } from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import { FaClock, FaPhone, FaStar, FaArrowRight, FaChair, FaTimes } from 'react-icons/fa';

const venues = [
  {
    id: 1, name: 'Le Jardin', type: 'Fine Dining · Pháp-Việt', tag: 'Nhà Hàng Chính', tagColor: '#C5A059',
    // Ảnh: bàn ăn fine dining sang trọng, nến, khăn trải bàn trắng
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80',
    hours: '06:30 – 22:30', seats: '120 chỗ', highlight: 'Buffet sáng & À la carte tối', stars: 5,
    features: ['Buffet sáng quốc tế', 'Hầm rượu 300+ nhãn', 'Live music tối thứ 6–7', 'Chef người Pháp'],
    desc: 'Nhà hàng flagship của Aurelia Grand Hotel mang đến trải nghiệm ẩm thực Pháp-Việt tinh tế. Không gian được thiết kế bởi đội ngũ kiến trúc sư nội thất hàng đầu Đông Nam Á, kết hợp ánh sáng ấm áp và chất liệu tự nhiên cao cấp.',
  },
  {
    id: 2, name: 'Saigon Sky Bar', type: 'Rooftop Bar & Lounge', tag: 'Tầng 25', tagColor: '#1E3A5F',
    // Ảnh: rooftop bar về đêm, view thành phố, cocktail
    img: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=900&q=80',
    hours: '17:00 – 02:00', seats: '80 chỗ', highlight: 'Cocktail thủ công & Sushi omakase', stars: 5,
    features: ['Cocktail thủ công', 'Sushi omakase', 'View 360° Saigon', 'Live Jazz hàng đêm'],
    desc: 'Bar trên sân thượng tầng 25 với tầm nhìn 360° ôm trọn đường chân trời Sài Gòn về đêm. Không gian lý tưởng để thưởng thức cocktail thủ công và sushi cao cấp cùng âm nhạc jazz sống.',
  },
  {
    id: 3, name: 'Lotus Brasserie', type: 'All-Day Dining', tag: 'Ăn Uống Cả Ngày', tagColor: '#2E7D32',
    // Ảnh: nhà hàng sáng sủa, buffet đa dạng, không gian rộng
    img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&q=80',
    hours: '06:00 – 23:00', seats: '200 chỗ', highlight: 'Fusion Á-Âu & Đặc sản Việt', stars: 4,
    features: ['Đặc sản Việt Nam', 'Fusion Á-Âu', 'Thực đơn chay', 'Bánh ngọt thủ công'],
    desc: 'Không gian brasserie hiện đại phục vụ cả ngày với thực đơn đa dạng từ món Việt truyền thống đến các món Á-Âu fusion sáng tạo, phù hợp cho bữa sáng, trưa và tối.',
  },
  {
    id: 4, name: 'Cigar & Cognac Lounge', type: 'Lounge Cao Cấp', tag: 'Premium Lounge', tagColor: '#7B3F00',
    // Ảnh: lounge tối, ghế da nâu, ánh sáng ấm, whisky
    img: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=900&q=80',
    hours: '18:00 – 01:00', seats: '40 chỗ', highlight: 'Xì gà Cuba & Rượu mạnh thượng hạng', stars: 5,
    features: ['Xì gà Cuba chính hiệu', 'Whisky & Cognac', 'Thư viện rượu', 'Nhạc jazz thư giãn'],
    desc: 'Không gian lounge sang trọng với ánh sáng ấm áp theo phong cách colonial Anh. Thưởng thức xì gà Cuba chính hiệu cùng Cognac và Whisky thượng hạng từ bộ sưu tập hơn 200 chai.',
  },
];

// Ảnh trải nghiệm đặc biệt — mỗi cái đúng chủ đề
const specialExperiences = [
  {
    title: 'Buffet Sáng',
    desc: 'Hơn 80 món từ Á đến Âu — 06:30 đến 10:30 mỗi ngày',
    // Ảnh: bàn buffet sáng phong phú, bánh mì, trái cây, trứng
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&q=80',
  },
  {
    title: 'Sunday Brunch',
    desc: 'Tiệc brunch sang trọng mỗi Chủ nhật với champagne không giới hạn',
    // Ảnh: brunch đẹp, mimosa, benedict, không khí sáng sủa
    img: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?w=700&q=80',
  },
  {
    title: 'Private Dining',
    desc: 'Phòng ăn riêng tư cho những dịp đặc biệt — 2 đến 20 khách',
    // Ảnh: bàn ăn riêng tư, nến, hoa, trang trí đặc biệt
    img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=700&q=80',
  },
];

const ContactModal = ({ show, onHide, venueName }) => (
  <Modal show={show} onHide={onHide} centered size="sm">
    <div style={{ background: '#0F172A', border: '1px solid rgba(197,160,89,0.3)', borderRadius: '4px', overflow: 'hidden' }}>
      <div style={{ padding: '32px 32px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ color: '#C5A059', fontSize: '0.68rem', letterSpacing: '2.5px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>Đặt Bàn</p>
          <h4 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fff', fontSize: '1.5rem', fontWeight: 600, marginBottom: 0 }}>{venueName}</h4>
        </div>
        <button onClick={onHide} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', padding: '4px', lineHeight: 1 }}><FaTimes /></button>
      </div>
      <div style={{ padding: '20px 32px 32px' }}>
        <div style={{ width: '40px', height: '1px', background: '#C5A059', marginBottom: '20px' }} />
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.87rem', lineHeight: 1.8, marginBottom: '24px' }}>Để đặt bàn, quý khách vui lòng liên hệ trực tiếp với chúng tôi qua:</p>
        <a href="tel:+84281234567" style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'linear-gradient(135deg, #C5A059, #A07840)', color: '#fff', textDecoration: 'none', padding: '13px 24px', fontSize: '0.82rem', letterSpacing: '1.5px', fontWeight: 600, textTransform: 'uppercase', marginBottom: '10px' }}>
          <FaPhone style={{ fontSize: '0.75rem' }} /> +84 28 1234 5678
        </a>
        <a href="mailto:dining@aureliagrand.vn" style={{ display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid rgba(197,160,89,0.35)', color: '#C5A059', textDecoration: 'none', padding: '13px 24px', fontSize: '0.82rem', letterSpacing: '1.5px', fontWeight: 600, textTransform: 'uppercase' }}>
          dining@aureliagrand.vn
        </a>
      </div>
    </div>
  </Modal>
);

const DiningPage = () => {
  const [hovered, setHovered] = useState(null);
  const [active, setActive] = useState(null);
  const [modalVenue, setModalVenue] = useState(null);

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <ContactModal show={!!modalVenue} onHide={() => setModalVenue(null)} venueName={modalVenue} />

      {/* ── Hero — bàn ăn fine dining tổng thể ── */}
      <div style={{
        backgroundImage: `linear-gradient(rgba(11,17,32,0.52), rgba(11,17,32,0.82)), url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80')`,
        backgroundSize: 'cover', backgroundPosition: 'center 40%',
        padding: '200px 0 100px', textAlign: 'center', color: '#fff',
      }}>
        <Container>
          <p style={{ letterSpacing: '5px', fontSize: '0.72rem', color: '#C5A059', textTransform: 'uppercase', marginBottom: '14px', fontWeight: 600 }}>NGHỆ THUẬT ẨM THỰC</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.5rem, 6vw, 4.2rem)', fontWeight: 600, marginBottom: '20px', lineHeight: 1.1, color: '#fff' }}>Nhà Hàng & Bar</h1>
          <div style={{ width: '48px', height: '1px', background: '#C5A059', margin: '0 auto 20px' }} />
          <p style={{ maxWidth: '560px', margin: '0 auto', color: 'rgba(255,255,255,0.65)', fontSize: '0.95rem', lineHeight: 1.9 }}>Bốn điểm ẩm thực đặc sắc — từ fine dining tinh tế đến rooftop bar sôi động.</p>
        </Container>
      </div>

      {/* ── Tab nav ── */}
      <div style={{ background: '#F7F5F0', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <Container>
          <div style={{ display: 'flex', overflowX: 'auto', gap: '0' }}>
            {venues.map(v => (
              <button key={v.id} onClick={() => setActive(active === v.id ? null : v.id)} style={{
                background: 'none', border: 'none',
                borderBottom: active === v.id ? '2px solid #C5A059' : '2px solid transparent',
                color: active === v.id ? '#C5A059' : '#64748B',
                padding: '18px 28px', fontSize: '0.78rem', letterSpacing: '1.5px',
                fontWeight: 600, textTransform: 'uppercase', cursor: 'pointer',
                whiteSpace: 'nowrap', transition: 'all 0.2s ease', fontFamily: 'inherit',
              }}>{v.name}</button>
            ))}
          </div>
        </Container>
      </div>

      {/* ── Venue cards ── */}
      <section style={{ padding: '80px 0' }}>
        <Container>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {venues.filter(v => active === null || v.id === active).map((venue, idx) => (
              <div key={venue.id} onMouseEnter={() => setHovered(venue.id)} onMouseLeave={() => setHovered(null)} style={{ marginBottom: '48px' }}>
                <Row className={`g-0 align-items-stretch ${idx % 2 === 1 ? 'flex-row-reverse' : ''}`}>
                  <Col lg={6} style={{ overflow: 'hidden', minHeight: '420px' }}>
                    <div style={{ height: '100%', minHeight: '420px', overflow: 'hidden', position: 'relative' }}>
                      <img src={venue.img} alt={venue.name} style={{
                        width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                        transform: hovered === venue.id ? 'scale(1.05)' : 'scale(1)',
                        transition: 'transform 0.7s ease',
                      }} />
                      <div style={{ position: 'absolute', top: '20px', left: '20px', background: venue.tagColor, color: '#fff', padding: '5px 14px', fontSize: '0.7rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 700 }}>{venue.tag}</div>
                      <div style={{ position: 'absolute', bottom: '20px', left: '20px', background: 'rgba(11,17,32,0.85)', backdropFilter: 'blur(8px)', padding: '10px 16px', borderLeft: '2px solid #C5A059' }}>
                        <div style={{ color: '#C5A059', fontSize: '0.65rem', letterSpacing: '2px', textTransform: 'uppercase' }}>GIỜ MỞ CỬA</div>
                        <div style={{ color: '#fff', fontSize: '0.9rem', marginTop: '2px' }}>{venue.hours}</div>
                      </div>
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div style={{ background: '#0F172A', height: '100%', padding: '52px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                        {[...Array(venue.stars)].map((_, i) => <FaStar key={i} style={{ color: '#C5A059', fontSize: '0.75rem' }} />)}
                      </div>
                      <p style={{ color: '#C5A059', fontSize: '0.72rem', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 600 }}>{venue.type}</p>
                      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fff', fontSize: '2.4rem', fontWeight: 600, marginBottom: '16px', lineHeight: 1.1 }}>{venue.name}</h2>
                      <div style={{ width: '40px', height: '1px', background: '#C5A059', marginBottom: '20px' }} />
                      <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.88rem', lineHeight: 1.9, marginBottom: '24px' }}>{venue.desc}</p>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '30px' }}>
                        {venue.features.map((f, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.55)', fontSize: '0.82rem' }}>
                            <span style={{ color: '#C5A059', fontSize: '0.55rem' }}>✦</span> {f}
                          </div>
                        ))}
                      </div>
                      <div style={{ display: 'flex', gap: '20px', marginBottom: '28px', flexWrap: 'wrap' }}>
                        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <FaChair style={{ color: '#C5A059' }} /> {venue.seats}
                        </span>
                        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <FaClock style={{ color: '#C5A059' }} /> {venue.hours}
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <button onClick={() => setModalVenue(venue.name)} style={{
                          background: 'linear-gradient(135deg, #C5A059, #A07840)', color: '#fff', border: 'none',
                          padding: '12px 28px', fontSize: '0.78rem', letterSpacing: '1.5px', fontWeight: 600,
                          textTransform: 'uppercase', transition: 'opacity 0.2s', cursor: 'pointer',
                          display: 'inline-flex', alignItems: 'center', gap: '8px',
                        }}>Đặt Bàn <FaArrowRight style={{ fontSize: '0.7rem' }} /></button>
                        <a href="tel:+84281234567" style={{
                          border: '1px solid rgba(197,160,89,0.3)', color: '#C5A059', textDecoration: 'none',
                          padding: '12px 20px', fontSize: '0.78rem', letterSpacing: '1px', fontWeight: 600,
                          textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '6px',
                        }}>
                          <FaPhone style={{ fontSize: '0.7rem' }} /> Liên Hệ
                        </a>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Special experiences — mỗi ảnh đúng chủ đề ── */}
      <div style={{ background: '#F7F5F0', padding: '80px 0', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <Container>
          <div className="text-center" style={{ marginBottom: '48px' }}>
            <p style={{ color: '#C5A059', fontSize: '0.72rem', letterSpacing: '3.5px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '12px' }}>Trải Nghiệm Đặc Biệt</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#0F172A', fontWeight: 600 }}>Ẩm Thực Theo Dịp</h2>
            <div style={{ width: '48px', height: '1px', background: '#C5A059', margin: '16px auto 0' }} />
          </div>
          <Row className="g-4">
            {specialExperiences.map((e, i) => (
              <Col md={4} key={i}>
                <div style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
                  onMouseEnter={evt => evt.currentTarget.querySelector('img').style.transform = 'scale(1.06)'}
                  onMouseLeave={evt => evt.currentTarget.querySelector('img').style.transform = 'scale(1)'}
                >
                  <img src={e.img} alt={e.title} style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block', transition: 'transform 0.6s ease' }} />
                  <div style={{ padding: '24px', background: '#fff', borderTop: '2px solid #C5A059' }}>
                    <h4 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#0F172A', fontSize: '1.25rem', fontWeight: 600, marginBottom: '8px' }}>{e.title}</h4>
                    <p style={{ color: '#64748B', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '14px' }}>{e.desc}</p>
                    <button onClick={() => setModalVenue(e.title)} style={{ background: 'none', border: 'none', color: '#C5A059', fontSize: '0.75rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', padding: 0 }}>
                      Đặt Trước <FaArrowRight style={{ fontSize: '0.65rem' }} />
                    </button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default DiningPage;

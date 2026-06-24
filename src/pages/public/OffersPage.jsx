import { useState } from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import { FaArrowRight, FaCheck, FaCrown, FaPhone, FaTimes } from 'react-icons/fa';

const offers = [
  {
    id: 1, tag: 'Ưu đãi đặc biệt', tagColor: '#C5A059',
    title: 'Gói Tuần Trăng Mật', subtitle: 'Romance Package',
    discount: '-30%', originalPrice: '8.000.000 ₫', salePrice: '5.600.000 ₫',
    validity: '31/12/2026',
    // Ảnh: giường khách sạn trang trí hoa hồng, lãng mạn, nến
    img: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=900&q=80',
    highlight: true,
    desc: 'Kỳ nghỉ tuần trăng mật hoàn hảo tại Aurelia Grand Hotel. Trọn gói bao gồm 2 đêm Suite, bữa sáng đôi tại Le Jardin, trang trí phòng và 1 buổi massage đôi tại Aurelia Spa.',
    includes: ['2 đêm Executive Suite', 'Bữa sáng đôi mỗi ngày', 'Trang trí phòng hoa hồng', 'Massage đôi 90 phút', 'Rượu vang & chocolate', 'Late checkout 14:00'],
  },
  {
    id: 2, tag: 'Đặt sớm', tagColor: '#1E3A5F',
    title: 'Đặt Sớm Giảm Sâu', subtitle: 'Early Bird Offer',
    discount: '-25%', originalPrice: '4.500.000 ₫', salePrice: '3.375.000 ₫',
    validity: '30/11/2026',
    // Ảnh: phòng khách sạn đẹp ban ngày, ánh sáng tự nhiên, gọn gàng
    img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=700&q=80',
    highlight: false,
    desc: 'Đặt phòng trước ít nhất 30 ngày để nhận mức giá ưu đãi tốt nhất. Áp dụng cho tất cả loại phòng từ Deluxe đến Presidential Suite.',
    includes: ['Giảm 25% giá phòng', 'Bữa sáng miễn phí', 'WiFi cao cấp', 'Đổi ngày miễn phí 1 lần', 'Late checkout 13:00'],
  },
  {
    id: 3, tag: 'Cuối tuần', tagColor: '#7B3F00',
    title: 'Nghỉ Dưỡng Cuối Tuần', subtitle: 'Weekend Escape',
    discount: '-20%', originalPrice: '3.800.000 ₫', salePrice: '3.040.000 ₫',
    validity: '31/12/2026',
    // Ảnh: hồ bơi resort, thư giãn, nắng, cocktail bên hồ
    img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=700&q=80',
    highlight: false,
    desc: 'Gói nghỉ dưỡng 2 đêm cuối tuần với nhiều đặc quyền: sử dụng hồ bơi vô cực, phòng gym và tặng kèm 1 buổi chăm sóc da mặt tại spa.',
    includes: ['Phòng Deluxe 2 đêm', 'Bữa sáng buffet', 'Hồ bơi & Gym', 'Chăm sóc da mặt 60ph', 'Minibar miễn phí', 'Welcome drink'],
  },
  {
    id: 4, tag: 'Thành viên VIP', tagColor: '#B8860B',
    title: 'Aurelia Gold Member', subtitle: 'Chương Trình Thành Viên',
    discount: '-15%', originalPrice: null, salePrice: 'Quanh năm',
    validity: 'Thường xuyên',
    // Ảnh: thẻ vàng, VIP lounge, sang trọng
    img: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=700&q=80',
    highlight: false,
    desc: 'Trở thành thành viên Aurelia Gold để nhận ưu đãi 15% mọi dịch vụ quanh năm, tích điểm đổi đêm miễn phí và nhiều quyền lợi độc quyền.',
    includes: ['Giảm 15% mọi dịch vụ', 'Tích điểm đổi đêm', 'Priority check-in', 'Tặng đêm sinh nhật', 'Upgrade phòng miễn phí', 'Concierge riêng'],
  },
  {
    id: 5, tag: 'Doanh nghiệp', tagColor: '#2E7D32',
    title: 'Gói MICE Doanh Nghiệp', subtitle: 'Corporate Package',
    discount: 'Liên hệ', originalPrice: null, salePrice: 'Từ 50 khách',
    validity: 'Quanh năm',
    // Ảnh: phòng hội nghị sang trọng, bàn dài, màn hình, setup chuyên nghiệp
    img: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=700&q=80',
    highlight: false,
    desc: 'Giải pháp tổ chức hội nghị, hội thảo và sự kiện doanh nghiệp chuyên nghiệp. Phòng họp hiện đại từ 20–500 người, đội ngũ event planner tận tâm.',
    includes: ['Phòng họp đầy đủ AV', 'Catering cao cấp', 'Event planner riêng', 'Giá phòng ưu đãi', 'Đưa đón đoàn', 'Gala dinner tùy chỉnh'],
  },
];

const BookModal = ({ show, onHide, offerTitle }) => (
  <Modal show={show} onHide={onHide} centered size="sm">
    <div style={{ background: '#0F172A', border: '1px solid rgba(197,160,89,0.3)', borderRadius: '4px', overflow: 'hidden' }}>
      <div style={{ padding: '32px 32px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ color: '#C5A059', fontSize: '0.68rem', letterSpacing: '2.5px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>Đặt Ngay</p>
          <h4 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fff', fontSize: '1.5rem', fontWeight: 600, marginBottom: 0 }}>{offerTitle}</h4>
        </div>
        <button onClick={onHide} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', padding: '4px', lineHeight: 1 }}><FaTimes /></button>
      </div>
      <div style={{ padding: '20px 32px 32px' }}>
        <div style={{ width: '40px', height: '1px', background: '#C5A059', marginBottom: '20px' }} />
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.87rem', lineHeight: 1.8, marginBottom: '24px' }}>Để đặt gói ưu đãi này, quý khách vui lòng liên hệ với chúng tôi qua:</p>
        <a href="tel:+84281234567" style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'linear-gradient(135deg, #C5A059, #A07840)', color: '#fff', textDecoration: 'none', padding: '13px 24px', fontSize: '0.82rem', letterSpacing: '1.5px', fontWeight: 600, textTransform: 'uppercase', marginBottom: '10px' }}>
          <FaPhone style={{ fontSize: '0.75rem' }} /> +84 28 1234 5678
        </a>
        <a href="mailto:offers@aureliagrand.vn" style={{ display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid rgba(197,160,89,0.35)', color: '#C5A059', textDecoration: 'none', padding: '13px 24px', fontSize: '0.82rem', letterSpacing: '1.5px', fontWeight: 600, textTransform: 'uppercase' }}>
          offers@aureliagrand.vn
        </a>
      </div>
    </div>
  </Modal>
);

const OffersPage = () => {
  const [hovered, setHovered] = useState(null);
  const [modalOffer, setModalOffer] = useState(null);

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <BookModal show={!!modalOffer} onHide={() => setModalOffer(null)} offerTitle={modalOffer} />

      {/* ── Hero — không khí sang trọng, ưu đãi ── */}
      <div style={{
        backgroundImage: `linear-gradient(rgba(11,17,32,0.55), rgba(11,17,32,0.82)), url('https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?w=1600&q=80')`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        padding: '200px 0 100px', textAlign: 'center', color: '#fff',
      }}>
        <Container>
          <p style={{ letterSpacing: '5px', fontSize: '0.72rem', color: '#C5A059', textTransform: 'uppercase', marginBottom: '14px', fontWeight: 600 }}>ƯU ĐÃI ĐẶC BIỆT</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.5rem, 6vw, 4.2rem)', fontWeight: 600, marginBottom: '20px', lineHeight: 1.1, color: '#fff' }}>Gói Nghỉ Dưỡng</h1>
          <div style={{ width: '48px', height: '1px', background: '#C5A059', margin: '0 auto 20px' }} />
          <p style={{ maxWidth: '560px', margin: '0 auto', color: 'rgba(255,255,255,0.65)', fontSize: '0.95rem', lineHeight: 1.9 }}>Những ưu đãi tinh tuyển dành riêng cho kỳ nghỉ trong mơ của bạn.</p>
        </Container>
      </div>

      {/* ── Featured offer — honeymoon lãng mạn ── */}
      {offers.filter(o => o.highlight).map(offer => (
        <section key={offer.id} style={{ background: '#0F172A', padding: '0' }}>
          <Container fluid style={{ padding: 0 }}>
            <Row className="g-0" style={{ minHeight: '540px' }}>
              <Col lg={6} style={{ position: 'relative', minHeight: '400px' }}>
                <img src={offer.img} alt={offer.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: '400px' }} />
                <div style={{ position: 'absolute', top: '24px', left: '24px', background: '#C5A059', color: '#fff', padding: '8px 20px', fontSize: '0.75rem', letterSpacing: '2px', fontWeight: 700, textTransform: 'uppercase' }}>
                  {offer.discount} · ƯU ĐÃI NỔI BẬT
                </div>
              </Col>
              <Col lg={6}>
                <div style={{ padding: '60px 56px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <p style={{ color: '#C5A059', fontSize: '0.72rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 600 }}>{offer.subtitle}</p>
                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fff', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 600, marginBottom: '16px', lineHeight: 1.1 }}>{offer.title}</h2>
                  <div style={{ width: '40px', height: '1px', background: '#C5A059', marginBottom: '20px' }} />
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.9, marginBottom: '24px' }}>{offer.desc}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '28px' }}>
                    {offer.includes.map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.55)', fontSize: '0.82rem' }}>
                        <FaCheck style={{ color: '#C5A059', fontSize: '0.6rem', flexShrink: 0 }} /> {item}
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                    <div>
                      {offer.originalPrice && <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.9rem', textDecoration: 'line-through' }}>{offer.originalPrice}</div>}
                      <div style={{ color: '#C5A059', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 700, lineHeight: 1 }}>{offer.salePrice}</div>
                      <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.72rem' }}>Hiệu lực đến: {offer.validity}</div>
                    </div>
                    <button onClick={() => setModalOffer(offer.title)} style={{
                      background: 'linear-gradient(135deg, #C5A059, #A07840)', color: '#fff', border: 'none',
                      padding: '14px 32px', fontSize: '0.78rem', letterSpacing: '1.5px', fontWeight: 600,
                      textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '8px',
                      transition: 'opacity 0.2s', cursor: 'pointer',
                    }}>
                      Đặt Ngay <FaArrowRight style={{ fontSize: '0.7rem' }} />
                    </button>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      ))}

      {/* ── Other offers grid — mỗi ảnh đúng chủ đề ── */}
      <section style={{ padding: '80px 0', background: '#F7F5F0' }}>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <p style={{ color: '#C5A059', fontSize: '0.72rem', letterSpacing: '3.5px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '12px' }}>Tất Cả Ưu Đãi</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#0F172A', fontWeight: 600, marginBottom: '16px' }}>Gói Đặc Biệt Cho Bạn</h2>
            <div style={{ width: '48px', height: '1px', background: '#C5A059', margin: '0 auto' }} />
          </div>
          <Row className="g-4">
            {offers.filter(o => !o.highlight).map(offer => (
              <Col md={6} lg={3} key={offer.id}>
                <div
                  onMouseEnter={() => setHovered(offer.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    background: '#fff',
                    border: `1px solid ${hovered === offer.id ? '#C5A059' : 'rgba(0,0,0,0.07)'}`,
                    overflow: 'hidden', height: '100%',
                    display: 'flex', flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    boxShadow: hovered === offer.id ? '0 16px 40px rgba(197,160,89,0.12)' : 'none',
                  }}
                >
                  <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                    <img src={offer.img} alt={offer.title} style={{
                      width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                      transform: hovered === offer.id ? 'scale(1.07)' : 'scale(1)',
                      transition: 'transform 0.6s ease',
                    }} />
                    <div style={{ position: 'absolute', top: '12px', right: '12px', background: offer.tagColor, color: '#fff', padding: '4px 10px', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '1px' }}>
                      {offer.discount}
                    </div>
                  </div>
                  <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <p style={{ color: '#C5A059', fontSize: '0.68rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px', fontWeight: 600 }}>{offer.tag}</p>
                    <h4 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#0F172A', fontSize: '1.2rem', fontWeight: 600, marginBottom: '10px', lineHeight: 1.2 }}>{offer.title}</h4>
                    <p style={{ color: '#64748B', fontSize: '0.82rem', lineHeight: 1.7, marginBottom: '16px', flex: 1 }}>{offer.desc.slice(0, 100)}…</p>
                    <div style={{ marginBottom: '16px' }}>
                      {offer.includes.slice(0, 3).map((item, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748B', fontSize: '0.78rem', marginBottom: '4px' }}>
                          <FaCheck style={{ color: '#C5A059', fontSize: '0.55rem', flexShrink: 0 }} /> {item}
                        </div>
                      ))}
                    </div>
                    <div style={{ borderTop: '1px solid rgba(0,0,0,0.07)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontWeight: 700, color: '#C5A059', lineHeight: 1 }}>{offer.salePrice}</div>
                        {offer.originalPrice && <div style={{ color: '#94A3B8', fontSize: '0.72rem', textDecoration: 'line-through' }}>{offer.originalPrice}</div>}
                      </div>
                      <button onClick={() => setModalOffer(offer.title)} style={{
                        background: '#0F172A', color: '#fff', border: 'none',
                        padding: '8px 16px', fontSize: '0.72rem', letterSpacing: '1.5px',
                        fontWeight: 600, textTransform: 'uppercase', transition: 'background 0.2s ease',
                        cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '5px',
                      }}
                        onMouseEnter={e => e.currentTarget.style.background = '#C5A059'}
                        onMouseLeave={e => e.currentTarget.style.background = '#0F172A'}
                      >
                        Xem <FaArrowRight style={{ fontSize: '0.6rem' }} />
                      </button>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ── CTA strip ── */}
      <div style={{ background: '#0F172A', padding: '60px 0', borderTop: '3px solid #C5A059', textAlign: 'center' }}>
        <Container>
          <FaCrown style={{ color: '#C5A059', fontSize: '2rem', marginBottom: '16px' }} />
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fff', fontSize: '2rem', fontWeight: 600, marginBottom: '12px' }}>Cần Tư Vấn Thêm?</h3>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', marginBottom: '28px' }}>Đội ngũ concierge của chúng tôi sẵn sàng tạo gói nghỉ dưỡng riêng cho bạn.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <a href="tel:+84281234567" style={{ background: 'linear-gradient(135deg, #C5A059, #A07840)', color: '#fff', textDecoration: 'none', padding: '14px 36px', fontSize: '0.8rem', letterSpacing: '2px', fontWeight: 600, textTransform: 'uppercase' }}>
              Gọi Ngay
            </a>
            <a href="mailto:info@aureliagrand.vn" style={{ border: '1px solid rgba(197,160,89,0.4)', color: '#C5A059', textDecoration: 'none', padding: '14px 36px', fontSize: '0.8rem', letterSpacing: '2px', fontWeight: 600, textTransform: 'uppercase' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(197,160,89,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
            >
              Gửi Email
            </a>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default OffersPage;

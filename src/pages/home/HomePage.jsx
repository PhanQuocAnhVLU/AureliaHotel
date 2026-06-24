import { useState, useEffect, useCallback, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  FaChevronLeft, FaChevronRight, FaCalendarAlt, FaUserFriends,
  FaSearch, FaBed, FaWifi, FaConciergeBell, FaParking,
  FaSpa, FaUtensils, FaSwimmingPool, FaCar, FaArrowRight,
  FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebookF,
  FaInstagram, FaTripadvisor
} from 'react-icons/fa';

/* ─── Hero slides ───────────────────────────────── */
const slides = [
  { img: '/slide1.jpg', caption: 'Đỉnh Cao Sang Trọng', sub: 'Tại Trái Tim Sài Gòn' },
  { img: '/slide2.jpg', caption: 'Không Gian Nghỉ Dưỡng', sub: 'Theo Phong Cách Châu Âu' },
  { img: '/slide3.jpg', caption: 'Ẩm Thực Đặc Sắc', sub: 'Chef Quốc Tế Danh Tiếng' },
  { img: '/slide4.jpg', caption: 'Spa & Wellness', sub: 'Tái Tạo Năng Lượng Toàn Diện' },
  { img: '/slide5.jpg', caption: 'Tầm Nhìn Toàn Cảnh', sub: 'Sài Gòn Về Đêm' },
];

/* ─── Room data ─────────────────────────────────── */
const rooms = [
  { name: 'Deluxe Room', nameVi: 'Phòng Deluxe', price: '2.800.000', size: '35m²', img: '/room1.jpg', badge: 'Phổ biến' },
  { name: 'Executive Suite', nameVi: 'Suite Hành Pháp', price: '5.500.000', size: '65m²', img: '/room2.jpg', badge: 'Sang trọng' },
  { name: 'Presidential Suite', nameVi: 'Suite Tổng Thống', price: '12.000.000', size: '120m²', img: '/room3.jpg', badge: 'Đỉnh cao' },
];

/* ─── Services ──────────────────────────────────── */
const services = [
  { icon: <FaUtensils />, title: 'Nhà Hàng & Bar', desc: 'Le Jardin, Sky Bar & Lotus Brasserie — ẩm thực Á-Âu đỉnh cao', href: '/am-thuc' },
  { icon: <FaSpa />, title: 'Aurelia Spa', desc: '6 phòng trị liệu — liệu pháp thư giãn truyền thống và hiện đại', href: '/dich-vu-spa' },
  { icon: <FaSwimmingPool />, title: 'Hồ Bơi Tầng Thượng', desc: 'Pool & Jacuzzi với tầm nhìn 360° ôm trọn đường chân trời Sài Gòn', href: '/dich-vu-spa' },
  { icon: <FaCar />, title: 'Đưa Đón Sân Bay', desc: 'Xe sang chuyên nghiệp — đón tiễn 24/7 theo yêu cầu', href: '/dich-vu-spa' },
  { icon: <FaConciergeBell />, title: 'Concierge 24/7', desc: 'Đội ngũ hỗ trợ đa ngôn ngữ sẵn sàng phục vụ mọi lúc', href: '/dich-vu-spa' },
  { icon: <FaBed />, title: 'Phòng Họp & Sự Kiện', desc: '8 phòng hội nghị hiện đại — sức chứa đến 500 khách', href: '/dich-vu-spa' },
];

/* ─── Awards / Certifications ───────────────────── */
const awards = [
  { label: 'Forbes Travel', sub: '5-Star Hotel 2025' },
  { label: 'Condé Nast', sub: 'Top 10 Vietnam Hotels' },
  { label: 'TripAdvisor', sub: "Travelers' Choice Award" },
  { label: 'World Luxury', sub: 'Luxury City Hotel Award' },
];

/* ─── Component ──────────────────────────────────── */
const HomePage = () => {
  const [slide, setSlide] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [guests, setGuests] = useState('2');
  const timerRef = useRef(null);

  const goTo = useCallback((idx) => {
    if (transitioning) return;
    setTransitioning(true);
    setSlide(idx);
    setTimeout(() => setTransitioning(false), 900);
  }, [transitioning]);

  const next = useCallback(() => goTo((slide + 1) % slides.length), [slide, goTo]);
  const prev = useCallback(() => goTo((slide - 1 + slides.length) % slides.length), [slide, goTo]);

  useEffect(() => {
    timerRef.current = setInterval(next, 6000);
    return () => clearInterval(timerRef.current);
  }, [next]);

  /* today for min date */
  const today = new Date().toISOString().split('T')[0];

  /* ─── Shared section heading ─── */
  const SectionHead = ({ eyebrow, title, light = false, center = true }) => (
    <div className={center ? 'text-center' : ''} style={{ marginBottom: '48px' }}>
      <p style={{
        color: '#C5A059',
        fontSize: '0.72rem',
        letterSpacing: '3.5px',
        textTransform: 'uppercase',
        fontWeight: 600,
        marginBottom: '12px',
      }}>{eyebrow}</p>
      <h2 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
        fontWeight: 600,
        color: light ? '#fff' : '#0F172A',
        lineHeight: 1.15,
        marginBottom: '16px',
      }}>{title}</h2>
      <div style={{ width: '48px', height: '1px', background: '#C5A059', margin: center ? '0 auto' : '0' }} />
    </div>
  );

  return (
    <div style={{ position: 'relative', overflowX: 'hidden' }}>

      {/* ══════════════════════════════════════
          HERO SLIDER
      ══════════════════════════════════════ */}
      <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>

        {/* Slides */}
        {slides.map((s, i) => (
          <div
            key={i}
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url('${s.img}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: i === slide ? 1 : 0,
              transition: 'opacity 0.9s ease-in-out',
              zIndex: i === slide ? 1 : 0,
            }}
          />
        ))}

        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.08) 40%, rgba(0,0,0,0.55) 100%)',
        }} />

        {/* Slide caption — bottom-left style like Marriott */}
        <div style={{
          position: 'absolute', bottom: '140px', left: 0, right: 0,
          zIndex: 5, textAlign: 'center',
        }}>
          <p style={{
            color: '#C5A059',
            fontSize: '0.72rem',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            fontWeight: 600,
            marginBottom: '10px',
            animation: 'fadeUp 0.7s ease',
          }}>
            {slides[slide].sub}
          </p>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
            fontWeight: 600,
            color: '#fff',
            lineHeight: 1.1,
            letterSpacing: '1px',
            animation: 'fadeUp 0.7s ease 0.1s both',
          }}>
            {slides[slide].caption}
          </h1>
          <div style={{ width: '50px', height: '1px', background: '#C5A059', margin: '20px auto', animation: 'fadeUp 0.7s ease 0.2s both' }} />
          <p style={{
            color: 'rgba(255,255,255,0.65)',
            fontSize: '0.82rem',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            animation: 'fadeUp 0.7s ease 0.3s both',
          }}>
            AURELIA GRAND HOTEL · QUẬN 1, TP. HỒ CHÍ MINH
          </p>
        </div>

        {/* Prev / Next arrows */}
        {[
          { fn: prev, side: 'left', icon: <FaChevronLeft />, label: 'Prev' },
          { fn: next, side: 'right', icon: <FaChevronRight />, label: 'Next' },
        ].map(({ fn, side, icon, label }) => (
          <button
            key={side}
            onClick={fn}
            aria-label={label}
            style={{
              position: 'absolute',
              [side]: '28px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.25)',
              color: '#fff',
              width: '46px', height: '46px',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              backdropFilter: 'blur(6px)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(197,160,89,0.4)'; e.currentTarget.style.borderColor = '#C5A059'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; }}
          >
            {icon}
          </button>
        ))}

        {/* Slide counter + dots — Sheraton style */}
        <div style={{
          position: 'absolute', bottom: '90px', left: 0, right: 0,
          zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
        }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              style={{
                width: i === slide ? '32px' : '6px',
                height: '2px',
                background: i === slide ? '#C5A059' : 'rgba(255,255,255,0.4)',
                border: 'none', cursor: 'pointer', padding: 0,
                transition: 'all 0.35s ease',
              }}
            />
          ))}
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', letterSpacing: '2px', marginLeft: '8px' }}>
            {String(slide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* ══════════════════════════════════════
          BOOKING BAR  (Sheraton-style dark strip)
      ══════════════════════════════════════ */}
      <div style={{
        background: '#0F172A',
        borderTop: '2px solid #C5A059',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '0',
      }}>
        <Container>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 160px 180px',
            gap: '0',
          }}>
            {/* Check-in */}
            <BookingField
              icon={<FaCalendarAlt />}
              label="NHẬN PHÒNG"
              type="date"
              value={checkin}
              min={today}
              onChange={setCheckin}
            />
            {/* Check-out */}
            <BookingField
              icon={<FaCalendarAlt />}
              label="TRẢ PHÒNG"
              type="date"
              value={checkout}
              min={checkin || today}
              onChange={setCheckout}
            />
            {/* Guests */}
            <div style={{
              borderRight: '1px solid rgba(255,255,255,0.07)',
              padding: '20px 24px',
            }}>
              <p style={{ color: '#C5A059', fontSize: '0.65rem', letterSpacing: '2px', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <FaUserFriends /> SỐ KHÁCH
              </p>
              <select
                value={guests}
                onChange={e => setGuests(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  fontSize: '1rem',
                  fontFamily: "'Cormorant Garamond', serif",
                  outline: 'none',
                  width: '100%',
                  cursor: 'pointer',
                }}
              >
                {[1, 2, 3, 4, 5, 6].map(n => (
                  <option key={n} value={n} style={{ background: '#0F172A' }}>{n} Khách</option>
                ))}
              </select>
            </div>
            {/* CTA */}
            <Link
              to="/cho-o"
              style={{
                background: 'linear-gradient(135deg, #C5A059, #A68341)',
                color: '#fff',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                fontSize: '0.8rem',
                letterSpacing: '2px',
                fontWeight: 600,
                textTransform: 'uppercase',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg, #d4b56a, #C5A059)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(135deg, #C5A059, #A68341)'; }}
            >
              <FaSearch /> TÌM PHÒNG
            </Link>
          </div>
        </Container>
      </div>

      {/* ══════════════════════════════════════
          AWARDS BAR
      ══════════════════════════════════════ */}
      <div style={{ background: '#FDFBF7', borderBottom: '1px solid rgba(0,0,0,0.06)', padding: '20px 0' }}>
        <Container>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0', flexWrap: 'wrap' }}>
            {awards.map((a, i) => (
              <div
                key={i}
                style={{
                  padding: '10px 36px',
                  borderRight: i < awards.length - 1 ? '1px solid rgba(0,0,0,0.1)' : 'none',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '1.5px', color: '#C5A059', textTransform: 'uppercase' }}>{a.label}</div>
                <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '2px' }}>{a.sub}</div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* ══════════════════════════════════════
          ABOUT  (2-col: text + image)
      ══════════════════════════════════════ */}
      <section style={{ padding: '100px 0', background: '#fff' }}>
        <Container>
          <Row className="align-items-center g-5">
            <Col lg={6}>
              <SectionHead
                eyebrow="Chào Mừng Đến Với"
                title={<>AURELIA GRAND HOTEL<br />Boutique Saigon</>}
                center={false}
              />
              <p style={{ color: '#64748B', lineHeight: 1.9, fontSize: '0.95rem', marginBottom: '28px' }}>
                Tọa lạc tại trung tâm Quận 1, AURELIA GRAND HOTEL mang đến trải nghiệm lưu trú 5 sao với sự kết hợp tinh tế giữa kiến trúc cổ điển Pháp và thiết kế nội thất đương đại. Mỗi chi tiết đều phản ánh sự chú trọng đến tính hoàn hảo.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '36px' }}>
                {[
                  { num: '25+', label: 'Tầng nhà' },
                  { num: '180', label: 'Phòng & Suite' },
                  { num: '5★', label: 'Forbes Rated' },
                  { num: '24/7', label: 'Dịch vụ' },
                ].map((s, i) => (
                  <div key={i} style={{ borderLeft: '2px solid #C5A059', paddingLeft: '16px' }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 700, color: '#0F172A', lineHeight: 1 }}>{s.num}</div>
                    <div style={{ fontSize: '0.78rem', color: '#64748B', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '4px' }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <Link
                to="/cho-o"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: '#0F172A',
                  textDecoration: 'none',
                  fontSize: '0.8rem',
                  letterSpacing: '2px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  borderBottom: '1px solid #C5A059',
                  paddingBottom: '4px',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#C5A059'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#0F172A'; }}
              >
                Khám Phá Phòng <FaArrowRight style={{ fontSize: '0.75rem' }} />
              </Link>
            </Col>
            <Col lg={6}>
              <div style={{ position: 'relative' }}>
                <img
                  src="/slide1.jpg"
                  alt="Aurelia Grand Hotel"
                  style={{ width: '100%', height: '480px', objectFit: 'cover', display: 'block' }}
                />
                {/* Decorative gold frame */}
                <div style={{
                  position: 'absolute',
                  top: '-16px', right: '-16px',
                  width: '60%', height: '40%',
                  border: '1px solid #C5A059',
                  zIndex: -1,
                }} />
                {/* Floating stat card */}
                <div style={{
                  position: 'absolute',
                  bottom: '-24px',
                  left: '-24px',
                  background: '#0F172A',
                  padding: '24px 28px',
                  borderLeft: '3px solid #C5A059',
                }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', fontWeight: 700, color: '#C5A059', lineHeight: 1 }}>15+</div>
                  <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: '4px' }}>Năm hoạt động</div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ══════════════════════════════════════
          ROOMS SHOWCASE  (Sheraton card style)
      ══════════════════════════════════════ */}
      <section style={{ padding: '100px 0', background: '#F7F5F0' }}>
        <Container>
          <SectionHead eyebrow="Khám Phá" title="Hạng Phòng Nổi Bật" />
          <Row className="g-0 g-md-4">
            {rooms.map((room, idx) => (
              <Col md={4} key={idx}>
                <div
                  style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', background: '#fff' }}
                  onMouseEnter={e => {
                    e.currentTarget.querySelector('.rimg').style.transform = 'scale(1.07)';
                    e.currentTarget.querySelector('.rover').style.opacity = '1';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.querySelector('.rimg').style.transform = 'scale(1)';
                    e.currentTarget.querySelector('.rover').style.opacity = '0';
                  }}
                >
                  {/* Badge */}
                  <div style={{
                    position: 'absolute', top: '16px', left: '16px', zIndex: 5,
                    background: '#C5A059',
                    color: '#fff',
                    fontSize: '0.65rem',
                    letterSpacing: '1.5px',
                    padding: '4px 10px',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                  }}>
                    {room.badge}
                  </div>

                  {/* Image */}
                  <div style={{ height: '300px', overflow: 'hidden' }}>
                    <img
                      className="rimg"
                      src={room.img}
                      alt={room.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease', display: 'block' }}
                    />
                  </div>

                  {/* Hover overlay */}
                  <div
                    className="rover"
                    style={{
                      position: 'absolute', inset: 0,
                      background: 'rgba(11,17,32,0.35)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      opacity: 0, transition: 'opacity 0.4s ease', zIndex: 4,
                    }}
                  >
                    <Link
                      to="/cho-o"
                      style={{
                        color: '#fff',
                        border: '1px solid rgba(255,255,255,0.6)',
                        padding: '12px 28px',
                        textDecoration: 'none',
                        fontSize: '0.75rem',
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                        background: 'rgba(255,255,255,0.08)',
                        backdropFilter: 'blur(4px)',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      Xem Chi Tiết
                    </Link>
                  </div>

                  {/* Info */}
                  <div style={{ padding: '24px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <p style={{ fontSize: '0.7rem', color: '#C5A059', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>{room.size}</p>
                        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.35rem', fontWeight: 600, color: '#0F172A', marginBottom: 0 }}>
                          {room.nameVi}
                        </h3>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', color: '#C5A059', fontWeight: 700, lineHeight: 1 }}>
                          {room.price} ₫
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#94A3B8', marginTop: '2px' }}>/ đêm</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
          <div className="text-center" style={{ marginTop: '48px' }}>
            <Link
              to="/cho-o"
              style={{
                color: '#0F172A',
                textDecoration: 'none',
                fontSize: '0.8rem',
                letterSpacing: '2.5px',
                fontWeight: 600,
                textTransform: 'uppercase',
                borderBottom: '1px solid #C5A059',
                paddingBottom: '4px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              Xem Tất Cả Phòng <FaArrowRight style={{ fontSize: '0.75rem' }} />
            </Link>
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════
          SERVICES  (dark background, icon grid)
      ══════════════════════════════════════ */}
      <section style={{ padding: '100px 0', background: '#0F172A' }}>
        <Container>
          <SectionHead eyebrow="Tiện Ích & Dịch Vụ" title={<>Trải Nghiệm<br />Đẳng Cấp 5 Sao</>} light />
          <Row className="g-4">
            {services.map((s, i) => (
              <Col md={4} sm={6} key={i}>
                <Link
                  to={s.href}
                  style={{ textDecoration: 'none', display: 'block' }}
                >
                  <div
                    style={{
                      padding: '36px 28px',
                      border: '1px solid rgba(255,255,255,0.06)',
                      height: '100%',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = '#C5A059';
                      e.currentTarget.style.background = 'rgba(197,160,89,0.05)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <div style={{ color: '#C5A059', fontSize: '1.6rem', marginBottom: '20px' }}>{s.icon}</div>
                    <h4 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fff', fontSize: '1.15rem', fontWeight: 600, marginBottom: '10px' }}>
                      {s.title}
                    </h4>
                    <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: 0 }}>{s.desc}</p>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ══════════════════════════════════════
          OFFERS  (Marriott "Special Offers" style)
      ══════════════════════════════════════ */}
      <section style={{ padding: '100px 0', background: '#fff' }}>
        <Container>
          <SectionHead eyebrow="Ưu Đãi Đặc Biệt" title="Khám Phá Gói Nghỉ Dưỡng" />
          <Row className="g-4">
            {[
              { title: 'Gói Tuần Trăng Mật', desc: 'Phòng hạng sang + Champagne + Hoa tươi + Dinner lãng mạn', discount: '15% OFF', img: '/slide2.jpg' },
              { title: 'Đặt Sớm 30%', desc: 'Đặt trước 30 ngày, nhận ngay ưu đãi hấp dẫn kèm bữa sáng miễn phí', discount: '30% OFF', img: '/slide3.jpg' },
              { title: 'Gói Gia Đình', desc: 'Trẻ em dưới 12 tuổi ở miễn phí — kèm voucher hồ bơi & mini bar', discount: 'Kids Free', img: '/slide5.jpg' },
            ].map((offer, i) => (
              <Col md={4} key={i}>
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <div style={{ height: '260px', overflow: 'hidden' }}>
                    <img
                      src={offer.img}
                      alt={offer.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.6s ease' }}
                      onMouseEnter={e => { e.target.style.transform = 'scale(1.06)'; }}
                      onMouseLeave={e => { e.target.style.transform = 'scale(1)'; }}
                    />
                  </div>
                  {/* Discount badge */}
                  <div style={{
                    position: 'absolute', top: '16px', right: '16px',
                    background: '#C5A059',
                    color: '#fff',
                    padding: '6px 14px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '1px',
                  }}>
                    {offer.discount}
                  </div>
                  <div style={{ padding: '24px', border: '1px solid rgba(0,0,0,0.07)', borderTop: 'none' }}>
                    <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem', fontWeight: 600, color: '#0F172A', marginBottom: '8px' }}>
                      {offer.title}
                    </h4>
                    <p style={{ color: '#64748B', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '16px' }}>{offer.desc}</p>
                    <Link
                      to="/uu-dai"
                      style={{
                        color: '#C5A059',
                        textDecoration: 'none',
                        fontSize: '0.75rem',
                        letterSpacing: '1.5px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      Xem Ưu Đãi <FaArrowRight style={{ fontSize: '0.7rem' }} />
                    </Link>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
          <div className="text-center mt-5">
            <Link to="/uu-dai" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: '#0F172A',
              color: '#fff',
              textDecoration: 'none',
              padding: '14px 40px',
              fontSize: '0.8rem',
              letterSpacing: '2px',
              fontWeight: 600,
              textTransform: 'uppercase',
              transition: 'background 0.3s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#C5A059'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#0F172A'; }}
            >
              Tất Cả Ưu Đãi <FaArrowRight style={{ fontSize: '0.75rem' }} />
            </Link>
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════
          CTA  (full-bleed parallax)
      ══════════════════════════════════════ */}
      <section style={{
        padding: '120px 0',
        backgroundImage: 'linear-gradient(rgba(11,17,32,0.72), rgba(11,17,32,0.72)), url(/cta-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        textAlign: 'center',
      }}>
        <Container>
          <p style={{ color: '#C5A059', fontSize: '0.72rem', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '16px' }}>
            Trải Nghiệm Kỳ Nghỉ Trong Mơ
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 600, color: '#fff', marginBottom: '20px', lineHeight: 1.15 }}>
            Đặt Phòng Ngay Hôm Nay
          </h2>
          <div style={{ width: '48px', height: '1px', background: '#C5A059', margin: '0 auto 28px' }} />
          <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '520px', margin: '0 auto 40px', lineHeight: 1.9, fontSize: '0.92rem' }}>
            Liên hệ để nhận ưu đãi đặc biệt dành riêng cho bạn. Đội ngũ concierge của chúng tôi luôn sẵn sàng 24/7.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/cho-o" style={{
              background: 'linear-gradient(135deg, #C5A059, #A68341)',
              color: '#fff', textDecoration: 'none',
              padding: '16px 44px', fontSize: '0.8rem', letterSpacing: '2px', fontWeight: 600, textTransform: 'uppercase',
              transition: 'all 0.3s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(197,160,89,0.35)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
            >
              Đặt Phòng Ngay
            </Link>
            <Link to="/dich-vu-spa" style={{
              border: '1px solid rgba(255,255,255,0.35)',
              color: '#fff', textDecoration: 'none',
              padding: '16px 44px', fontSize: '0.8rem', letterSpacing: '2px', fontWeight: 600, textTransform: 'uppercase',
              transition: 'all 0.3s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#C5A059'; e.currentTarget.style.color = '#C5A059'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; e.currentTarget.style.color = '#fff'; }}
            >
              Xem Dịch Vụ
            </Link>
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════
          FOOTER
      ══════════════════════════════════════ */}
      <footer style={{ background: '#070E1C', color: 'rgba(255,255,255,0.55)', paddingTop: '64px', paddingBottom: '32px' }}>
        <Container>
          <Row className="g-5 mb-5">
            {/* Brand */}
            <Col md={4}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", marginBottom: '20px' }}>
                <div>
                  <span style={{ fontSize: '1.6rem', fontWeight: 700, color: '#fff', letterSpacing: '2px' }}>AURELIA</span>
                  <span style={{ fontSize: '1.6rem', fontWeight: 300, color: '#C5A059', marginLeft: '6px' }}>GRAND</span>
                </div>
                <div style={{ fontSize: '0.6rem', letterSpacing: '4px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginTop: '2px' }}>Hotel & Resort · Saigon</div>
              </div>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.8, maxWidth: '280px', marginBottom: '24px' }}>
                Tọa lạc tại trung tâm Quận 1, TP.HCM — nơi hội tụ của sự sang trọng, hiếu khách và tinh hoa văn hóa.
              </p>
              {/* Social */}
              <div style={{ display: 'flex', gap: '12px' }}>
                {[FaFacebookF, FaInstagram, FaTripadvisor].map((Icon, i) => (
                  <a key={i} href="#" style={{
                    width: '36px', height: '36px', border: '1px solid rgba(255,255,255,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.85rem',
                    transition: 'all 0.2s ease',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#C5A059'; e.currentTarget.style.color = '#C5A059'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </Col>

            {/* Quick links */}
            <Col md={2}>
              <h6 style={{ color: '#fff', fontSize: '0.72rem', letterSpacing: '2.5px', textTransform: 'uppercase', fontWeight: 700, marginBottom: '20px' }}>
                Khám Phá
              </h6>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[['Chỗ Ở', '/cho-o'], ['Ẩm Thực', '/am-thuc'], ['Dịch Vụ & Spa', '/dich-vu-spa'], ['Ưu Đãi', '/uu-dai']].map(([label, href]) => (
                  <Link key={label} to={href} style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#C5A059'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </Col>

            {/* Account */}
            <Col md={2}>
              <h6 style={{ color: '#fff', fontSize: '0.72rem', letterSpacing: '2.5px', textTransform: 'uppercase', fontWeight: 700, marginBottom: '20px' }}>
                Tài Khoản
              </h6>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[['Đăng Nhập', '/login'], ['Đăng Ký', '/register'], ['Lịch Sử Đặt Phòng', '/login']].map(([label, href]) => (
                  <Link key={label} to={href} style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#C5A059'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </Col>

            {/* Contact */}
            <Col md={4}>
              <h6 style={{ color: '#fff', fontSize: '0.72rem', letterSpacing: '2.5px', textTransform: 'uppercase', fontWeight: 700, marginBottom: '20px' }}>
                Liên Hệ
              </h6>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <FaMapMarkerAlt style={{ color: '#C5A059', marginTop: '3px', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.85rem', lineHeight: 1.7 }}>123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh</span>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <FaPhone style={{ color: '#C5A059', flexShrink: 0 }} />
                  <a href="tel:+84281234567" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>+84 28 1234 5678</a>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <FaEnvelope style={{ color: '#C5A059', flexShrink: 0 }} />
                  <a href="mailto:info@aureliagrand.vn" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>info@aureliagrand.vn</a>
                </div>
              </div>
            </Col>
          </Row>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <p style={{ fontSize: '0.78rem', margin: 0 }}>© 2026 AURELIA GRAND HOTEL Boutique Saigon. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '24px' }}>
              {['Chính Sách Bảo Mật', 'Điều Khoản', 'Cookie'].map(t => (
                <a key={t} href="#" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>{t}</a>
              ))}
            </div>
          </div>
        </Container>
      </footer>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(1); }
        select option { background: #0F172A; }
      `}</style>
    </div>
  );
};

/* ── Booking field sub-component ── */
const BookingField = ({ icon, label, type, value, min, onChange }) => (
  <div style={{
    borderRight: '1px solid rgba(255,255,255,0.07)',
    padding: '20px 24px',
  }}>
    <p style={{ color: '#C5A059', fontSize: '0.65rem', letterSpacing: '2px', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
      {icon} {label}
    </p>
    <input
      type={type}
      value={value}
      min={min}
      onChange={e => onChange(e.target.value)}
      style={{
        background: 'transparent',
        border: 'none',
        color: value ? '#fff' : 'rgba(255,255,255,0.35)',
        fontSize: '1rem',
        fontFamily: "'Cormorant Garamond', serif",
        outline: 'none',
        width: '100%',
        cursor: 'pointer',
      }}
    />
  </div>
);

export default HomePage;

import { useState, useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  FaUserCircle, FaSignOutAlt, FaBars, FaTimes, FaChevronDown,
  FaPhone, FaEnvelope, FaSearch
} from 'react-icons/fa';

/* ──────────────────────────────────────────────
   Mega-menu data  (Sheraton style)
─────────────────────────────────────────────── */
const navItems = [
  {
    label: 'CHỖ Ở',
    href: '/cho-o',
    cols: [
      {
        heading: 'Loại phòng',
        links: [
          { label: 'Deluxe Room', sub: 'Từ 2.800.000 ₫', href: '/cho-o' },
          { label: 'Executive Suite', sub: 'Từ 5.500.000 ₫', href: '/cho-o' },
          { label: 'Presidential Suite', sub: 'Từ 12.000.000 ₫', href: '/cho-o' },
          { label: 'Family Room', sub: 'Từ 4.800.000 ₫', href: '/cho-o' },
        ],
      },
      {
        heading: 'Trải nghiệm',
        links: [
          { label: 'Club Lounge Access', href: '/cho-o' },
          { label: 'View Toàn Cảnh', href: '/cho-o' },
          { label: 'Phòng Kết Nối', href: '/cho-o' },
        ],
      },
    ],
    featured: { label: 'Xem tất cả phòng', img: '/room1.jpg', href: '/cho-o' },
  },
  {
    label: 'ẨM THỰC',
    href: '/am-thuc',
    cols: [
      {
        heading: 'Nhà hàng & Bar',
        links: [
          { label: 'Le Jardin', sub: 'Fine Dining Pháp-Việt', href: '/am-thuc' },
          { label: 'Saigon Sky Bar', sub: 'Rooftop · Tầng 25', href: '/am-thuc' },
          { label: 'Lotus Brasserie', sub: 'All-Day Dining', href: '/am-thuc' },
        ],
      },
      {
        heading: 'Trải nghiệm',
        links: [
          { label: 'Buffet Sáng', href: '/am-thuc' },
          { label: 'Sunday Brunch', href: '/am-thuc' },
          { label: 'Private Dining', href: '/am-thuc' },
        ],
      },
    ],
    featured: { label: 'Khám phá ẩm thực', img: '/slide4.jpg', href: '/am-thuc' },
  },
  {
    label: 'DỊCH VỤ & SPA',
    href: '/dich-vu-spa',
    cols: [
      {
        heading: 'Wellness',
        links: [
          { label: 'Aurelia Spa', sub: '6 phòng trị liệu', href: '/dich-vu-spa' },
          { label: 'Fitness Center', sub: 'Mở 24/7', href: '/dich-vu-spa' },
          { label: 'Hồ Bơi Tầng Thượng', sub: 'Pool & Jacuzzi', href: '/dich-vu-spa' },
        ],
      },
      {
        heading: 'Tiện ích',
        links: [
          { label: 'Phòng Họp & Sự Kiện', href: '/dich-vu-spa' },
          { label: 'Business Center', href: '/dich-vu-spa' },
          { label: 'Đưa Đón Sân Bay', href: '/dich-vu-spa' },
        ],
      },
    ],
    featured: { label: 'Xem tất cả dịch vụ', img: '/slide5.jpg', href: '/dich-vu-spa' },
  },
  {
    label: 'ƯU ĐÃI',
    href: '/uu-dai',
    cols: [
      {
        heading: 'Gói đặc biệt',
        links: [
          { label: 'Gói Tuần Trăng Mật', sub: 'Champagne & Hoa', href: '/uu-dai' },
          { label: 'Gói Gia Đình', sub: 'Kids Stay Free', href: '/uu-dai' },
          { label: 'Gói Doanh Nhân', sub: 'Bao gồm bữa sáng', href: '/uu-dai' },
        ],
      },
      {
        heading: 'Giảm giá',
        links: [
          { label: 'Đặt Sớm 30%', href: '/uu-dai' },
          { label: 'Ưu Đãi Cuối Tuần', href: '/uu-dai' },
          { label: 'Long Stay Special', href: '/uu-dai' },
        ],
      },
    ],
    featured: { label: 'Xem tất cả ưu đãi', img: '/cta-bg.jpg', href: '/uu-dai' },
  },
];

/* ──────────────────────────────────────────────
   Component
─────────────────────────────────────────────── */
const PublicNavbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);   // which mega-menu is open
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const navRef = useRef(null);
  const closeTimer = useRef(null);

  /* scroll effect */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* close mega on outside click */
  useEffect(() => {
    const onClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenMenu(null);
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const handleMouseEnter = (label) => {
    clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };
  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 160);
  };

  const navBg = scrolled
    ? 'rgba(11, 17, 32, 0.97)'
    : 'transparent';

  return (
    <>
      {/* ── Top utility bar (visible when not scrolled) ── */}
      <div
        style={{
          background: 'rgba(11,17,32,0.85)',
          borderBottom: '1px solid rgba(197,160,89,0.15)',
          padding: '6px 0',
          transition: 'transform 0.4s ease, opacity 0.4s ease',
          transform: scrolled ? 'translateY(-100%)' : 'translateY(0)',
          opacity: scrolled ? 0 : 1,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          backdropFilter: 'blur(8px)',
        }}
      >
        <Container>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              <a href="tel:+84281234567" style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.78rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', letterSpacing: '0.3px' }}>
                <FaPhone style={{ color: '#C5A059', fontSize: '0.7rem' }} /> +84 28 1234 5678
              </a>
              <a href="mailto:info@aureliagrand.vn" style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.78rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', letterSpacing: '0.3px' }}>
                <FaEnvelope style={{ color: '#C5A059', fontSize: '0.7rem' }} /> info@aureliagrand.vn
              </a>
            </div>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem' }}>Vi | En</span>
              {!isAuthenticated && (
                <Link to="/login" style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.78rem', textDecoration: 'none', letterSpacing: '0.5px' }}>
                  THÀNH VIÊN
                </Link>
              )}
            </div>
          </div>
        </Container>
      </div>

      {/* ── Main Navbar ── */}
      <nav
        ref={navRef}
        style={{
          position: 'fixed',
          top: scrolled ? 0 : '33px',
          left: 0,
          right: 0,
          zIndex: 1050,
          background: navBg,
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
          transition: 'all 0.45s cubic-bezier(0.4,0,0.2,1)',
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.35)' : 'none',
        }}
      >
        <Container>
          <div style={{ display: 'flex', alignItems: 'center', height: scrolled ? '68px' : '80px', transition: 'height 0.4s ease', gap: '0' }}>

            {/* Logo */}
            <Link to="/" style={{ textDecoration: 'none', flexShrink: 0, marginRight: 'auto' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", lineHeight: 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '1px' }}>
                  <span style={{ fontSize: scrolled ? '1.5rem' : '1.75rem', fontWeight: 700, color: '#fff', letterSpacing: '2px', transition: 'font-size 0.4s ease' }}>AURELIA</span>
                  <span style={{ fontSize: scrolled ? '1.5rem' : '1.75rem', fontWeight: 300, color: '#C5A059', marginLeft: '6px', transition: 'font-size 0.4s ease' }}>GRAND</span>
                </div>
                <div style={{ fontSize: '0.6rem', letterSpacing: '4px', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', marginTop: '2px' }}>
                  Hotel &amp; Resort · Saigon
                </div>
              </div>
            </Link>

            {/* Desktop nav links */}
            <div
              className="d-none d-lg-flex"
              style={{ alignItems: 'center', gap: '0', height: '100%' }}
            >
              {navItems.map((item) => (
                <div
                  key={item.label}
                  style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to={item.href}
                    style={{
                      color: openMenu === item.label ? '#C5A059' : '#fff',
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      letterSpacing: '1.5px',
                      textDecoration: 'none',
                      padding: '0 18px',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      borderBottom: openMenu === item.label ? '2px solid #C5A059' : '2px solid transparent',
                      transition: 'all 0.2s ease',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.label}
                    <FaChevronDown style={{ fontSize: '0.55rem', opacity: 0.6, transition: 'transform 0.25s ease', transform: openMenu === item.label ? 'rotate(180deg)' : 'rotate(0)' }} />
                  </Link>

                  {/* Mega Menu */}
                  {openMenu === item.label && (
                    <div
                      style={{
                        position: 'fixed',
                        top: scrolled ? '68px' : '113px',
                        left: 0,
                        right: 0,
                        background: 'rgba(11,17,32,0.98)',
                        backdropFilter: 'blur(20px)',
                        borderTop: '1px solid rgba(197,160,89,0.2)',
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                        animation: 'fadeInDown 0.22s ease forwards',
                        zIndex: 1000,
                      }}
                    >
                      <Container>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 280px', gap: '0', padding: '40px 0' }}>
                          {/* Text columns */}
                          <div style={{ display: 'flex', gap: '60px', paddingRight: '40px', borderRight: '1px solid rgba(255,255,255,0.07)' }}>
                            {item.cols.map((col) => (
                              <div key={col.heading}>
                                <p style={{ color: '#C5A059', fontSize: '0.7rem', letterSpacing: '2.5px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '18px' }}>
                                  {col.heading}
                                </p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                  {col.links.map((lnk) => (
                                    <Link
                                      key={lnk.label}
                                      to={lnk.href}
                                      onClick={() => setOpenMenu(null)}
                                      style={{ textDecoration: 'none', padding: '8px 0', display: 'block', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                                    >
                                      <div style={{ color: '#fff', fontSize: '0.9rem', fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, letterSpacing: '0.5px' }}>
                                        {lnk.label}
                                      </div>
                                      {lnk.sub && (
                                        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', marginTop: '2px' }}>{lnk.sub}</div>
                                      )}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Spacer */}
                          <div />

                          {/* Featured image */}
                          <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '2px' }}>
                            <img
                              src={item.featured.img}
                              alt={item.featured.label}
                              style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block', filter: 'brightness(0.75)' }}
                            />
                            <div style={{
                              position: 'absolute', bottom: 0, left: 0, right: 0,
                              background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)',
                              padding: '20px 16px 16px',
                            }}>
                              <Link
                                to={item.featured.href}
                                onClick={() => setOpenMenu(null)}
                                style={{
                                  color: '#C5A059',
                                  fontSize: '0.75rem',
                                  letterSpacing: '1.5px',
                                  textTransform: 'uppercase',
                                  textDecoration: 'none',
                                  fontWeight: 600,
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                }}
                              >
                                {item.featured.label} →
                              </Link>
                            </div>
                          </div>
                        </div>
                      </Container>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right actions */}
            <div className="d-none d-lg-flex" style={{ alignItems: 'center', gap: '8px', marginLeft: '24px' }}>
              {/* Search */}
              <button
                onClick={() => setSearchOpen(v => !v)}
                style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '8px', opacity: 0.75 }}
                aria-label="Tìm kiếm"
              >
                <FaSearch style={{ fontSize: '0.9rem' }} />
              </button>

              {isAuthenticated ? (
                <div style={{ position: 'relative' }}>
                  <button
                    style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                    onClick={() => navigate('/dashboard')}
                  >
                    <img
                      src={user?.avatar || 'https://i.pravatar.cc/150'}
                      alt="User"
                      style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #C5A059' }}
                    />
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  style={{
                    color: 'rgba(255,255,255,0.75)',
                    fontSize: '0.78rem',
                    letterSpacing: '1px',
                    textDecoration: 'none',
                    padding: '8px 12px',
                  }}
                >
                  ĐĂNG NHẬP
                </Link>
              )}

              <Link
                to="/cho-o"
                style={{
                  background: 'linear-gradient(135deg, #C5A059, #A68341)',
                  color: '#fff',
                  textDecoration: 'none',
                  padding: '10px 22px',
                  fontSize: '0.78rem',
                  letterSpacing: '1.5px',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg, #d4b56a, #C5A059)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(135deg, #C5A059, #A68341)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                ĐẶT CHỖ NGAY
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="d-lg-none"
              onClick={() => setMobileOpen(v => !v)}
              style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.3rem', padding: '8px', marginLeft: '12px' }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </Container>

        {/* Search overlay */}
        {searchOpen && (
          <div style={{ background: 'rgba(11,17,32,0.98)', borderTop: '1px solid rgba(197,160,89,0.2)', padding: '20px 0', animation: 'fadeInDown 0.2s ease' }}>
            <Container>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', maxWidth: '600px', margin: '0 auto' }}>
                <FaSearch style={{ color: '#C5A059', fontSize: '1rem', flexShrink: 0 }} />
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm phòng, dịch vụ, ưu đãi..."
                  style={{
                    flex: 1,
                    background: 'none',
                    border: 'none',
                    borderBottom: '1px solid rgba(197,160,89,0.4)',
                    color: '#fff',
                    fontSize: '1.1rem',
                    padding: '8px 4px',
                    outline: 'none',
                    fontFamily: "'Cormorant Garamond', serif",
                    letterSpacing: '0.5px',
                  }}
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', padding: '4px' }}
                >
                  <FaTimes />
                </button>
              </div>
            </Container>
          </div>
        )}
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(11,17,32,0.98)',
            zIndex: 2000,
            overflow: 'auto',
            padding: '20px 0',
          }}
        >
          <Container>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>AURELIA</span>
                <span style={{ fontSize: '1.5rem', fontWeight: 300, color: '#C5A059' }}> GRAND</span>
              </div>
              <button onClick={() => setMobileOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.4rem' }}>
                <FaTimes />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    color: '#fff',
                    textDecoration: 'none',
                    padding: '18px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.07)',
                    fontSize: '1.2rem',
                    fontFamily: "'Cormorant Garamond', serif",
                    letterSpacing: '1px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  {item.label}
                  <span style={{ color: '#C5A059', fontSize: '1rem' }}>→</span>
                </Link>
              ))}
            </div>
            <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link
                to="/cho-o"
                onClick={() => setMobileOpen(false)}
                style={{
                  background: 'linear-gradient(135deg, #C5A059, #A68341)',
                  color: '#fff',
                  textDecoration: 'none',
                  padding: '16px',
                  textAlign: 'center',
                  fontSize: '0.85rem',
                  letterSpacing: '2px',
                  fontWeight: 600,
                }}
              >
                ĐẶT CHỖ NGAY
              </Link>
              {!isAuthenticated && (
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#fff',
                    textDecoration: 'none',
                    padding: '14px',
                    textAlign: 'center',
                    fontSize: '0.85rem',
                    letterSpacing: '2px',
                  }}
                >
                  ĐĂNG NHẬP
                </Link>
              )}
            </div>
          </Container>
        </div>
      )}

      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

export default PublicNavbar;

import { Card } from 'react-bootstrap';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const colorMap = {
  success: { bg: 'rgba(16, 185, 129, 0.12)', text: '#10B981', border: 'rgba(16, 185, 129, 0.2)' },
  primary: { bg: 'rgba(14, 165, 233, 0.12)', text: '#0EA5E9', border: 'rgba(14, 165, 233, 0.2)' },
  warning: { bg: 'rgba(245, 158, 11, 0.12)', text: '#F59E0B', border: 'rgba(245, 158, 11, 0.2)' },
  info:    { bg: 'rgba(197, 160, 89, 0.12)',  text: '#C5A059', border: 'rgba(197, 160, 89, 0.2)' },
  danger:  { bg: 'rgba(239, 68, 68, 0.12)',   text: '#EF4444', border: 'rgba(239, 68, 68, 0.2)' },
};

const StatsCard = ({ title, value, icon, color = 'primary', trend, trendValue, subtitle }) => {
  const scheme = colorMap[color] || colorMap.primary;

  return (
    <Card
      className="border-0 h-100"
      style={{
        borderRadius: 'var(--radius-lg)',
        background: '#fff',
        boxShadow: '0 4px 24px rgba(15,23,42,0.07)',
        overflow: 'hidden',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(15,23,42,0.13)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(15,23,42,0.07)'; }}
    >
      {/* Top Accent Bar */}
      <div style={{ height: '4px', background: scheme.text, borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0' }} />

      <Card.Body className="p-4">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <p className="text-muted mb-0 fw-medium" style={{ fontSize: '0.85rem', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            {title}
          </p>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: scheme.bg,
              border: `1px solid ${scheme.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              color: scheme.text,
              flexShrink: 0,
            }}
          >
            {icon}
          </div>
        </div>

        <h2 className="fw-bold mb-1" style={{ fontSize: '1.8rem', color: 'var(--text-main)', lineHeight: 1.1 }}>
          {value}
        </h2>

        {subtitle && <p className="text-muted small mb-2">{subtitle}</p>}

        {trend && (
          <div className="d-flex align-items-center mt-2 pt-2" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            <span
              className="d-flex align-items-center gap-1 me-2 px-2 py-1 rounded-pill"
              style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                background: trend === 'up' ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
                color: trend === 'up' ? '#10B981' : '#EF4444',
              }}
            >
              {trend === 'up' ? <FaArrowUp size={10} /> : <FaArrowDown size={10} />}
              {trendValue}%
            </span>
            <span className="text-muted" style={{ fontSize: '0.78rem' }}>so với tháng trước</span>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default StatsCard;

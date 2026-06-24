import { Outlet } from 'react-router-dom';
import PublicNavbar from '../components/navbar/PublicNavbar';

const PublicLayout = () => {
  return (
    <div className="public-layout" style={{ minHeight: '100vh', backgroundColor: 'var(--bg-dark)' }}>
      <PublicNavbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;

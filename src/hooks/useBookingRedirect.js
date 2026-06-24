import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * Hook: trả về hàm navigate thông minh cho các nút CTA công khai.
 * - Đã đăng nhập (customer) → /rooms (trang đặt phòng thật)
 * - Chưa đăng nhập → /login
 */
const useBookingRedirect = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const goBook = (e) => {
    if (e) e.preventDefault();
    if (isAuthenticated && user?.role === 'customer') {
      navigate('/rooms');
    } else if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  const bookingPath = isAuthenticated && user?.role === 'customer'
    ? '/rooms'
    : isAuthenticated ? '/dashboard' : '/login';

  return { goBook, bookingPath };
};

export default useBookingRedirect;

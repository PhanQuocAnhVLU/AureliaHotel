import { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { checkRoomAvailability } from '../utils/algorithms';

export const useBooking = () => {
  const { rooms, bookings, addBooking, updateRoom, updateBooking } = useApp();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createBooking = async (bookingData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));

      const { roomId, checkIn, checkOut } = bookingData;
      
      // 1. Check availability
      const availability = checkRoomAvailability(roomId, checkIn, checkOut, bookings);
      if (!availability.isAvailable) {
        throw new Error('Phòng đã được đặt trong khoảng thời gian này');
      }

      // 2. Create new booking
      const newBooking = {
        ...bookingData,
        id: `B${Date.now()}`,
        status: 'Confirmed',
        createdAt: new Date().toISOString(),
      };

      // 3. Save booking
      addBooking(newBooking);

      // 4. Update room status if checking in today
      const today = new Date().toISOString().split('T')[0];
      if (checkIn === today) {
        const room = rooms.find(r => r.id === roomId);
        if (room) {
          updateRoom({ ...room, status: 'Booked' });
        }
      }

      return { success: true, booking: newBooking };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId) => {
    setLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const booking = bookings.find(b => b.id === bookingId);
      if (!booking) throw new Error('Không tìm thấy đặt phòng');
      
      if (['Completed', 'Cancelled'].includes(booking.status)) {
        throw new Error('Không thể hủy đặt phòng ở trạng thái này');
      }

      updateBooking({ ...booking, status: 'Cancelled' });
      
      // Free up room if needed
      const room = rooms.find(r => r.id === booking.roomId);
      if (room && (room.status === 'Booked' || room.status === 'Occupied')) {
        updateRoom({ ...room, status: 'Available' });
      }

      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    createBooking,
    cancelBooking,
    loading,
    error
  };
};

export default useBooking;

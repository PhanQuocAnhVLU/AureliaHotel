/**
 * HOTEL MANAGEMENT ALGORITHMS
 * All core algorithms for the hotel management system
 */

// ============================================================
// 1. ALGORITHM: CHECK ROOM AVAILABILITY
// Checks if a room is free for a given date range
// ============================================================
export const checkRoomAvailability = (roomId, checkIn, checkOut, bookings) => {
  const newCheckIn = new Date(checkIn);
  const newCheckOut = new Date(checkOut);

  const conflictingBookings = bookings.filter((booking) => {
    if (booking.roomId !== roomId) return false;
    if (['Cancelled', 'Completed'].includes(booking.status)) return false;

    const existingCheckIn = new Date(booking.checkIn);
    const existingCheckOut = new Date(booking.checkOut);

    // Check for date range overlap
    return newCheckIn < existingCheckOut && newCheckOut > existingCheckIn;
  });

  return {
    isAvailable: conflictingBookings.length === 0,
    conflicts: conflictingBookings,
  };
};

// ============================================================
// 2. ALGORITHM: SEARCH ROOMS
// Multi-field search across room properties
// ============================================================
export const searchRooms = (rooms, query) => {
  if (!query || query.trim() === '') return rooms;
  const q = query.toLowerCase().trim();

  return rooms.filter((room) => {
    return (
      room.number.toLowerCase().includes(q) ||
      room.type.toLowerCase().includes(q) ||
      room.status.toLowerCase().includes(q) ||
      room.bedType.toLowerCase().includes(q) ||
      room.description.toLowerCase().includes(q) ||
      String(room.price).includes(q)
    );
  });
};

// ============================================================
// 3. ALGORITHM: FILTER ROOMS
// Multi-criteria filtering
// ============================================================
export const filterRooms = (rooms, filters) => {
  return rooms.filter((room) => {
    // Filter by type
    if (filters.type && filters.type !== 'all') {
      if (room.type !== filters.type) return false;
    }

    // Filter by status
    if (filters.status && filters.status !== 'all') {
      if (room.status !== filters.status) return false;
    }

    // Filter by min price
    if (filters.minPrice && !isNaN(filters.minPrice)) {
      if (room.price < Number(filters.minPrice)) return false;
    }

    // Filter by max price
    if (filters.maxPrice && !isNaN(filters.maxPrice)) {
      if (room.price > Number(filters.maxPrice)) return false;
    }

    // Filter by capacity
    if (filters.capacity && filters.capacity !== 'all') {
      if (room.capacity < Number(filters.capacity)) return false;
    }

    // Filter by floor
    if (filters.floor && filters.floor !== 'all') {
      if (room.floor !== Number(filters.floor)) return false;
    }

    return true;
  });
};

// ============================================================
// 4. ALGORITHM: SORT ROOMS
// Various sorting strategies
// ============================================================
export const sortRooms = (rooms, sortBy) => {
  const sorted = [...rooms];

  switch (sortBy) {
    case 'price_asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price_desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'bookings_desc':
      return sorted.sort((a, b) => b.bookings - a.bookings);
    case 'bookings_asc':
      return sorted.sort((a, b) => a.bookings - b.bookings);
    case 'revenue_desc':
      return sorted.sort((a, b) => b.revenue - a.revenue);
    case 'revenue_asc':
      return sorted.sort((a, b) => a.revenue - b.revenue);
    case 'rating_desc':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'number_asc':
      return sorted.sort((a, b) =>
        a.number.localeCompare(b.number, undefined, { numeric: true })
      );
    default:
      return sorted;
  }
};

// ============================================================
// 5. ALGORITHM: CALCULATE OCCUPANCY RATE
// Occupancy (%) = (Occupied rooms / Total rooms) × 100
// ============================================================
export const calculateOccupancy = (rooms) => {
  if (!rooms || rooms.length === 0) return 0;

  const occupied = rooms.filter((r) => r.status === 'Occupied').length;
  const booked = rooms.filter((r) => r.status === 'Booked').length;
  const total = rooms.length;

  const occupancyRate = ((occupied + booked) / total) * 100;

  return {
    rate: Math.round(occupancyRate * 10) / 10,
    occupied,
    booked,
    available: rooms.filter((r) => r.status === 'Available').length,
    cleaning: rooms.filter((r) => r.status === 'Cleaning').length,
    maintenance: rooms.filter((r) => r.status === 'Maintenance').length,
    total,
  };
};

// ============================================================
// 6. ALGORITHM: CALCULATE REVENUE
// Total Revenue = Room Revenue + Services Revenue
// ============================================================
export const calculateRevenue = (bookings, period = 'all') => {
  const now = new Date();
  let filtered = bookings;

  if (period === 'today') {
    const today = new Date().toISOString().split('T')[0];
    filtered = bookings.filter((b) => b.checkIn === today || b.checkOut === today);
  } else if (period === 'month') {
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    filtered = bookings.filter((b) => {
      const date = new Date(b.checkIn);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    });
  } else if (period === 'year') {
    filtered = bookings.filter((b) => {
      return new Date(b.checkIn).getFullYear() === now.getFullYear();
    });
  }

  const completedOrActive = filtered.filter((b) =>
    ['Completed', 'Checked-in', 'Confirmed'].includes(b.status)
  );

  const roomRevenue = completedOrActive.reduce(
    (sum, b) => sum + b.roomPrice * b.nights,
    0
  );
  const servicesRevenue = completedOrActive.reduce(
    (sum, b) => sum + (b.servicesTotal || 0),
    0
  );

  return {
    roomRevenue,
    servicesRevenue,
    total: roomRevenue + servicesRevenue,
    bookingCount: completedOrActive.length,
  };
};

// ============================================================
// 7. ALGORITHM: CUSTOMER RANKING
// Member: 0-2 stays, Silver: 3-7, Gold: 8-14, Platinum: 15+
// ============================================================
export const rankCustomer = (totalStays) => {
  if (totalStays >= 15) return { tier: 'Platinum', color: '#b5a642', icon: '💎' };
  if (totalStays >= 8) return { tier: 'Gold', color: '#ffd700', icon: '🥇' };
  if (totalStays >= 3) return { tier: 'Silver', color: '#c0c0c0', icon: '🥈' };
  return { tier: 'Member', color: '#cd7f32', icon: '🏅' };
};

// ============================================================
// 8. ALGORITHM: SUGGEST ROOMS
// Suggest rooms based on budget, viewed type, and past bookings
// ============================================================
export const suggestRooms = (rooms, options = {}) => {
  const { budget, preferredType, previousTypes = [], excludeIds = [] } = options;

  let candidates = rooms.filter(
    (r) => r.status === 'Available' && !excludeIds.includes(r.id)
  );

  // Score each room
  const scored = candidates.map((room) => {
    let score = 0;

    // Budget match (higher priority for rooms within budget)
    if (budget) {
      if (room.price <= budget) score += 30;
      if (room.price <= budget * 0.8) score += 10; // Extra for well within budget
    }

    // Type preference (exact match)
    if (preferredType && room.type === preferredType) score += 40;

    // Previous types preference
    if (previousTypes.includes(room.type)) score += 20;

    // Rating score
    score += room.rating * 5;

    // Popularity (bookings)
    score += Math.min(room.bookings / 5, 10);

    return { ...room, score };
  });

  // Sort by score and return top 6
  return scored.sort((a, b) => b.score - a.score).slice(0, 6);
};

// ============================================================
// 9. ALGORITHM: FLAG MAINTENANCE ROOMS
// Auto-flag rooms that need maintenance based on criteria
// ============================================================
export const flagMaintenanceRooms = (rooms) => {
  const SIX_MONTHS_MS = 6 * 30 * 24 * 60 * 60 * 1000;
  const now = new Date();

  return rooms
    .map((room) => {
      const lastMaintDate = new Date(room.lastMaintenance);
      const daysSinceMaintenance = (now - lastMaintDate) / (1000 * 60 * 60 * 24);
      const needsMaintenance =
        daysSinceMaintenance > 180 ||
        room.status === 'Maintenance' ||
        room.rating < 3.5;

      return {
        ...room,
        needsMaintenance,
        daysSinceMaintenance: Math.floor(daysSinceMaintenance),
        maintenanceUrgency:
          daysSinceMaintenance > 365
            ? 'high'
            : daysSinceMaintenance > 180
            ? 'medium'
            : 'low',
      };
    })
    .filter((r) => r.needsMaintenance);
};

// ============================================================
// HELPER: Generate monthly revenue data for charts
// ============================================================
export const generateMonthlyRevenue = (bookings) => {
  const months = [
    'T1', 'T2', 'T3', 'T4', 'T5', 'T6',
    'T7', 'T8', 'T9', 'T10', 'T11', 'T12',
  ];

  const currentYear = new Date().getFullYear();

  return months.map((month, index) => {
    const monthBookings = bookings.filter((b) => {
      const date = new Date(b.checkIn);
      return (
        date.getMonth() === index &&
        date.getFullYear() === currentYear &&
        ['Completed', 'Checked-in', 'Confirmed'].includes(b.status)
      );
    });

    const roomRevenue = monthBookings.reduce(
      (sum, b) => sum + b.roomPrice * b.nights,
      0
    );
    const serviceRevenue = monthBookings.reduce(
      (sum, b) => sum + (b.servicesTotal || 0),
      0
    );

    // Add simulated data for past months without bookings
    const simulatedBase = (index + 1) * 5000000 + Math.random() * 10000000;

    return {
      month,
      roomRevenue: roomRevenue || (index < new Date().getMonth() ? simulatedBase : 0),
      serviceRevenue:
        serviceRevenue ||
        (index < new Date().getMonth() ? simulatedBase * 0.3 : 0),
      total:
        roomRevenue + serviceRevenue ||
        (index < new Date().getMonth() ? simulatedBase * 1.3 : 0),
      bookings: monthBookings.length,
    };
  });
};

// ============================================================
// HELPER: Get room type color
// ============================================================
export const getRoomTypeColor = (type) => {
  const colors = {
    Standard: '#6c757d',
    Deluxe: '#0d6efd',
    Executive: '#6610f2',
    Suite: '#d63384',
    'Presidential Suite': '#fd7e14',
  };
  return colors[type] || '#6c757d';
};

// ============================================================
// HELPER: Get status badge color
// ============================================================
export const getStatusColor = (status) => {
  const colors = {
    Available: 'success',
    Booked: 'primary',
    Occupied: 'warning',
    Cleaning: 'info',
    Maintenance: 'danger',
    Confirmed: 'primary',
    'Checked-in': 'warning',
    'Checked-out': 'secondary',
    Completed: 'success',
    Cancelled: 'danger',
    Paid: 'success',
    Partial: 'warning',
    Unpaid: 'danger',
  };
  return colors[status] || 'secondary';
};

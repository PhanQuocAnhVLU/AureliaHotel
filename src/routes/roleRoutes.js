// Dashboard Pages
import AdminDashboard from '../pages/dashboard/AdminDashboard';
import ManagerDashboard from '../pages/dashboard/ManagerDashboard';
import ReceptionistDashboard from '../pages/dashboard/ReceptionistDashboard';
import CustomerDashboard from '../pages/dashboard/CustomerDashboard';

// Room Pages
import RoomListPage from '../pages/rooms/RoomListPage';
import RoomDetailPage from '../pages/rooms/RoomDetailPage';
import RoomManagePage from '../pages/rooms/RoomManagePage';
import RoomFormPage from '../pages/rooms/RoomFormPage';

// Booking Pages
import BookingListPage from '../pages/bookings/BookingListPage';
import BookingDetailPage from '../pages/bookings/BookingDetailPage';
import BookingFormPage from '../pages/bookings/BookingFormPage';
import BookingHistoryPage from '../pages/bookings/BookingHistoryPage';

// Customer Pages
import CustomerListPage from '../pages/customers/CustomerListPage';
import CustomerDetailPage from '../pages/customers/CustomerDetailPage';

// Service Pages
import ServiceListPage from '../pages/services/ServiceListPage';
import ServiceManagePage from '../pages/services/ServiceManagePage';

// Invoice Pages
import InvoiceListPage from '../pages/invoices/InvoiceListPage';
import InvoiceDetailPage from '../pages/invoices/InvoiceDetailPage';

// Employee Pages
import EmployeeListPage from '../pages/employees/EmployeeListPage';
// import EmployeeFormPage from '../pages/employees/EmployeeFormPage';

// Report Pages
import RevenueReportPage from '../pages/reports/RevenueReportPage';
// import OccupancyReportPage from '../pages/reports/OccupancyReportPage';

// Profile Pages
import ProfilePage from '../pages/profile/ProfilePage';
// import ReviewPage from '../pages/profile/ReviewPage';

export const adminRoutes = [
  { path: '/dashboard', element: AdminDashboard },
  
  { path: '/rooms/manage', element: RoomManagePage },
  { path: '/rooms/new', element: RoomFormPage },
  { path: '/rooms/:id/edit', element: RoomFormPage },
  
  { path: '/bookings', element: BookingListPage },
  { path: '/bookings/:id', element: BookingDetailPage },
  { path: '/bookings/new', element: BookingFormPage },
  { path: '/bookings/:id/edit', element: BookingFormPage },
  
  { path: '/customers', element: CustomerListPage },
  { path: '/customers/:id', element: CustomerDetailPage },
  
  { path: '/services', element: ServiceManagePage },
  
  { path: '/invoices', element: InvoiceListPage },
  { path: '/invoices/:id', element: InvoiceDetailPage },
  
  { path: '/employees', element: EmployeeListPage },
  
  { path: '/reports/revenue', element: RevenueReportPage },
  
  { path: '/profile', element: ProfilePage },
];

export const managerRoutes = [
  { path: '/dashboard', element: ManagerDashboard },
  
  { path: '/rooms/manage', element: RoomManagePage },
  { path: '/rooms/new', element: RoomFormPage },
  { path: '/rooms/:id/edit', element: RoomFormPage },
  
  { path: '/bookings', element: BookingListPage },
  { path: '/bookings/:id', element: BookingDetailPage },
  
  { path: '/customers', element: CustomerListPage },
  { path: '/customers/:id', element: CustomerDetailPage },
  
  { path: '/services', element: ServiceManagePage },
  
  { path: '/invoices', element: InvoiceListPage },
  { path: '/invoices/:id', element: InvoiceDetailPage },
  
  { path: '/employees', element: EmployeeListPage },
  
  { path: '/reports/revenue', element: RevenueReportPage },
  
  { path: '/profile', element: ProfilePage },
];

export const receptionistRoutes = [
  { path: '/dashboard', element: ReceptionistDashboard },
  
  { path: '/rooms', element: RoomListPage },
  { path: '/rooms/:id', element: RoomDetailPage },
  
  { path: '/bookings', element: BookingListPage },
  { path: '/bookings/:id', element: BookingDetailPage },
  { path: '/bookings/new', element: BookingFormPage },
  { path: '/bookings/:id/edit', element: BookingFormPage },
  
  { path: '/customers', element: CustomerListPage },
  { path: '/customers/:id', element: CustomerDetailPage },
  
  { path: '/services', element: ServiceListPage },
  
  { path: '/invoices', element: InvoiceListPage },
  { path: '/invoices/:id', element: InvoiceDetailPage },
  
  { path: '/profile', element: ProfilePage },
];

export const customerRoutes = [
  { path: '/dashboard', element: CustomerDashboard },
  
  { path: '/rooms', element: RoomListPage },
  { path: '/rooms/:id', element: RoomDetailPage },
  
  { path: '/bookings/history', element: BookingHistoryPage },
  { path: '/bookings/:id', element: BookingDetailPage },
  
  { path: '/services', element: ServiceListPage },
  
  { path: '/profile', element: ProfilePage },
];

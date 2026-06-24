import React, { createContext, useContext, useState, useEffect } from 'react';
import roomsData from '../data/rooms.json';
import bookingsData from '../data/bookings.json';
import customersData from '../data/customers.json';
import employeesData from '../data/employees.json';
import servicesData from '../data/services.json';
import invoicesData from '../data/invoices.json';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [services, setServices] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize data from local storage or JSON
  useEffect(() => {
    const initData = (key, defaultData) => {
      try {
        const stored = localStorage.getItem(key);
        if (stored) return JSON.parse(stored);
        
        // If not in localStorage, use default and save to localStorage
        localStorage.setItem(key, JSON.stringify(defaultData));
        return defaultData;
      } catch (e) {
        return defaultData;
      }
    };

    setRooms(initData('hotel_rooms', roomsData));
    setBookings(initData('hotel_bookings', bookingsData));
    setCustomers(initData('hotel_customers', customersData));
    setEmployees(initData('hotel_employees', employeesData));
    setServices(initData('hotel_services', servicesData));
    setInvoices(initData('hotel_invoices', invoicesData));
    
    setLoading(false);
  }, []);

  // Update handlers
  const updateItem = (key, collection, setCollection, item) => {
    const updated = collection.map(i => i.id === item.id ? item : i);
    setCollection(updated);
    localStorage.setItem(key, JSON.stringify(updated));
  };

  const addItem = (key, collection, setCollection, item) => {
    const updated = [...collection, item];
    setCollection(updated);
    localStorage.setItem(key, JSON.stringify(updated));
  };

  const deleteItem = (key, collection, setCollection, id) => {
    const updated = collection.filter(i => i.id !== id);
    setCollection(updated);
    localStorage.setItem(key, JSON.stringify(updated));
  };

  const value = {
    rooms, 
    setRooms: (data) => { setRooms(data); localStorage.setItem('hotel_rooms', JSON.stringify(data)); },
    updateRoom: (item) => updateItem('hotel_rooms', rooms, setRooms, item),
    addRoom: (item) => addItem('hotel_rooms', rooms, setRooms, item),
    deleteRoom: (id) => deleteItem('hotel_rooms', rooms, setRooms, id),
    
    bookings, 
    setBookings: (data) => { setBookings(data); localStorage.setItem('hotel_bookings', JSON.stringify(data)); },
    updateBooking: (item) => updateItem('hotel_bookings', bookings, setBookings, item),
    addBooking: (item) => addItem('hotel_bookings', bookings, setBookings, item),
    
    customers,
    setCustomers: (data) => { setCustomers(data); localStorage.setItem('hotel_customers', JSON.stringify(data)); },
    updateCustomer: (item) => updateItem('hotel_customers', customers, setCustomers, item),
    addCustomer: (item) => addItem('hotel_customers', customers, setCustomers, item),
    
    employees,
    services,
    invoices,
    loading
  };

  return (
    <AppContext.Provider value={value}>
      {!loading && children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};

export default AppContext;

// Validators

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePhone = (phone) => {
  const regex = /^(0[3|5|7|8|9])+([0-9]{8})\b/;
  return regex.test(phone);
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};

export const validateRequired = (value) => {
  return value !== null && value !== undefined && String(value).trim() !== '';
};

export const validateDateRange = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return false;
  return new Date(checkOut) > new Date(checkIn);
};

export const validatePositiveNumber = (value) => {
  return !isNaN(value) && Number(value) > 0;
};

export const validateBookingForm = (data) => {
  const errors = {};
  if (!validateRequired(data.customerId)) errors.customerId = 'Vui lòng chọn khách hàng';
  if (!validateRequired(data.roomId)) errors.roomId = 'Vui lòng chọn phòng';
  if (!validateRequired(data.checkIn)) errors.checkIn = 'Vui lòng nhập ngày check-in';
  if (!validateRequired(data.checkOut)) errors.checkOut = 'Vui lòng nhập ngày check-out';
  if (data.checkIn && data.checkOut && !validateDateRange(data.checkIn, data.checkOut)) {
    errors.checkOut = 'Ngày check-out phải sau ngày check-in';
  }
  return errors;
};

export const validateRoomForm = (data) => {
  const errors = {};
  if (!validateRequired(data.number)) errors.number = 'Số phòng là bắt buộc';
  if (!validateRequired(data.type)) errors.type = 'Loại phòng là bắt buộc';
  if (!validatePositiveNumber(data.price)) errors.price = 'Giá phải là số dương';
  if (!validatePositiveNumber(data.capacity)) errors.capacity = 'Sức chứa phải là số dương';
  return errors;
};

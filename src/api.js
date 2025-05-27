const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://campushub.web.id/api';

export const fetchEvents = async (category) => {
  const endpoint = category ? `/events/${category}` : '/events/all';
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }
  
  return response.json();
};

export const fetchEvent = async (id) => {
  const response = await fetch(`${API_BASE_URL}/events/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch event details');
  }
  
  return response.json();
};

export const login = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }
  
  return data;
};

export const register = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Registration failed');
  }
  
  return data;
};

export const registerForEvent = async (eventId, token) => {
  const response = await fetch(`${API_BASE_URL}/registrations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ event_id: eventId })
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to register for event');
  }
  
  return data;
};

export const fetchUserRegistrations = async (token) => {
  const response = await fetch(`${API_BASE_URL}/registrations`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch registrations');
  }
  
  return response.json();
};

export const registerEventWithToken = async (eventId, token) => {
  const response = await fetch(`${API_BASE_URL}/events/${eventId}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to register for event');
  }
  
  return data;
};

export const fetchUniqueCode = async (eventId, token) => {
  const response = await fetch(`${API_BASE_URL}/events/${eventId}/kode-unik`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch unique code');
  }
  
  return data;
};

export const updatePassword = async (newPassword, token) => {
  const response = await fetch(`${API_BASE_URL}/user/password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ password: newPassword })
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to update password');
  }
  
  return data;
};

export const fetchEventStatus = async (eventId, token) => {
  const response = await fetch(`${API_BASE_URL}/my-events/${eventId}/status`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch event status');
  }
  
  return data;
};

export const fetchUserProfile = async (token) => {
  const response = await fetch(`${API_BASE_URL}/user`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch user profile');
  }
  
  return data;
};

export const updateUserProfile = async (userData, token) => {
  const formData = new FormData();
  
  if (userData.name) formData.append('name', userData.name);
  if (userData.email) formData.append('email', userData.email);
  if (userData.phone) formData.append('phone', userData.phone);
  if (userData.photo) formData.append('photo', userData.photo);
  
  const response = await fetch(`${API_BASE_URL}/user`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to update user profile');
  }
  
  return data;
};
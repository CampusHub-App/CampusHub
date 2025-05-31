const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchEvents = async (category) => {
  const endpoint = category ? `/events?category=${category}` : '/events';
  const response = await fetch(`${API_BASE_URL}${endpoint}`);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message);
  }

  return response.json();
};

export const fetchEvent = async (id) => {
  const response = await fetch(`${API_BASE_URL}/events/${id}`);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message);
  }

  return response.json();
};

export const login = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/auth/login/user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error();
    error.data = data.message;
    throw error;
  }

  return data;
};

export const register = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error();
    error.data = data.message;
    throw error;
  }

  return data;
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
    const error = new Error();
    error.data = data.message;
    throw error;
  }

  return data;
};

export const cancelRegistration = async (eventId, token) => {
  const response = await fetch(`${API_BASE_URL}/my-events/${eventId}/cancel`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await response.json();

  if (!response.ok) {
    const error = new Error();
    error.data = data.message;
    throw error;
  }

  return data;
}

export const deleteAccount = async (token) => {
  const response = await fetch(`${API_BASE_URL}/user`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }

  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error();
    error.data = data.message;
    throw error;
  }
  return data;
};


export const fetchUniqueCode = async (eventId, token) => {
  const response = await fetch(`${API_BASE_URL}/my-events/${eventId}/kode-unik`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error();
    error.data = data.message;
    throw error;
  }

  return data;
};

export const updatePassword = async (newPassword, confirmation, token) => {
  const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ password: newPassword, confirmation: confirmation })
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error();
    error.data = data.message;
    throw error;
  }

  return data;
};

export const fetchMyEvents = async (token) => {

  const response = await fetch(`${API_BASE_URL}/my-events`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await response.json();
  if (!response.ok) {
    const error = new Error();
    error.data = data.message;
    error.status = response.status;
    throw error;
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
    const error = new Error();
    error.data = data.message;
    throw error;
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
    const error = new Error();
    error.data = data.message;
    throw error;
  }

  return data;
};

export const updateUserProfile = async (userData, token) => {

  const event = Object.fromEntries(userData.entries());
  const response = await fetch(`${API_BASE_URL}/user`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: userData
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error();
    error.data = data.message;
    throw error;
  }

  return data;
};

export const loginAdmin = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/auth/login/admin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error();
    error.data = data.message;
    throw error;
  }

  return data;
};

export const createEvent = async (eventData, token) => {
  const response = await fetch(`${API_BASE_URL}/events`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: eventData
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error();
    error.data = data.message;
    throw error;
  }

  return data;
};

export const updateEvent = async (eventId, eventData, token) => {
  const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: eventData
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error();
    error.data = data.message;
    throw error;
  }

  return data;
};

export const fetchEventParticipants = async (eventId, token) => {

  const response = await fetch(`${API_BASE_URL}/my-events/${eventId}/participants`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message);
  }

  return response.json();
};

export const checkInParticipant = async (eventId, uniqueCode, token) => {

  const response = await fetch(`${API_BASE_URL}/my-events/${eventId}/check-in`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ kode: uniqueCode })
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error();
    error.data = data.message;
    throw error;
  }

  return data;
};

export const fetchEventDetails = async (eventId) => {
  const response = await fetch(`${API_BASE_URL}/events/${eventId}`);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message);
  }

  return response.json();
};

export const logout = async (token) => {
  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error();
    error.data = data.message;
    throw error;
  }

  return data;
}

export const deleteEvent = async (eventId, token) => {
  const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error();
    error.data = data.message;
    throw error;
  }

  return data;
}